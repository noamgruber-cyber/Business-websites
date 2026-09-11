import { z } from 'zod';
import { templateConfigs } from './templateConfigs';

export const DAYS = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
] as const;

export const businessCategorySchema = z.enum([
  'barbershop',
  'restaurant',
  'nail_salon',
  'gym',
  'cafe',
  'photography',
]);
export const siteLanguageSchema = z.enum(['he', 'en']);
export const designStyleSchema = z.enum(['auto', 'clean', 'warm', 'bold']);
export const assetRoleSchema = z.enum(['logo', 'cover', 'gallery']);
export const imageMimeSchema = z.enum(['image/jpeg', 'image/png', 'image/webp']);

const nullableLimitedText = (max: number) => z.string().trim().max(max).nullable();
const e164Schema = z.string().trim().regex(/^\+[1-9]\d{7,14}$/, 'Use E.164 format').nullable();
const emailSchema = z.string().trim().max(300).email().nullable();

function socialUrlSchema(domain: 'instagram.com' | 'facebook.com') {
  return z
    .string()
    .trim()
    .max(300)
    .url()
    .refine((value) => {
      const url = new URL(value);
      return (
        url.protocol === 'https:' &&
        !url.username &&
        !url.password &&
        (url.hostname === domain || url.hostname.endsWith(`.${domain}`))
      );
    }, `Use an HTTPS ${domain} URL`)
    .nullable();
}

const hoursValueSchema = z
  .string()
  .regex(/^(?:closed|(?:[01]\d|2[0-3]):[0-5]\d-(?:[01]\d|2[0-3]):[0-5]\d)$/)
  .nullable();

export const hoursSchema = z.strictObject({
  day: z.enum(DAYS),
  value: hoursValueSchema,
});

export const serviceFactDraftSchema = z.strictObject({
  id: z.uuid(),
  name: z.string().trim().max(100),
  description: nullableLimitedText(500),
  priceText: nullableLimitedText(80),
});

export const serviceFactCompleteSchema = serviceFactDraftSchema.extend({
  name: z.string().trim().min(1).max(100),
});

function uniqueValues(values: string[]) {
  return new Set(values).size === values.length;
}

const openingHoursDraftSchema = z
  .array(hoursSchema)
  .max(7)
  .refine((hours) => uniqueValues(hours.map(({ day }) => day)), 'Days must be unique');

const openingHoursCompleteSchema = z
  .array(hoursSchema)
  .length(7)
  .refine(
    (hours) => hours.every(({ day }, index) => day === DAYS[index]),
    'Hours must contain all seven days in declared order',
  );

const businessFactsDraftShape = {
  businessName: z.string().trim().max(100),
  category: businessCategorySchema,
  language: siteLanguageSchema,
  description: z.string().trim().max(2000),
  services: z.array(serviceFactDraftSchema).max(30),
  phone: e164Schema,
  whatsapp: e164Schema,
  email: emailSchema,
  address: nullableLimitedText(300),
  city: nullableLimitedText(300),
  instagramUrl: socialUrlSchema('instagram.com'),
  facebookUrl: socialUrlSchema('facebook.com'),
  openingHours: openingHoursDraftSchema,
};

export const businessFactsDraftSchema = z.strictObject(businessFactsDraftShape);

export const businessFactsCompleteSchema = z
  .strictObject({
    ...businessFactsDraftShape,
    businessName: z.string().trim().min(1).max(100),
    description: z.string().trim().min(20).max(2000),
    services: z.array(serviceFactCompleteSchema).max(30),
    openingHours: openingHoursCompleteSchema,
  })
  .refine(
    ({ phone, whatsapp, email }) => Boolean(phone || whatsapp || email),
    { message: 'At least one public contact method is required', path: ['phone'] },
  );

const intakeDraftShape = {
  schemaVersion: z.literal(1),
  facts: businessFactsDraftSchema,
  style: designStyleSchema,
  imageAssetIds: z
    .array(z.uuid())
    .max(8)
    .refine(uniqueValues, 'Asset IDs must be unique'),
  rightsConfirmed: z.boolean(),
};

export const intakeDraftSchema = z.strictObject(intakeDraftShape);

export const intakeGenerationSchema = z
  .strictObject({ ...intakeDraftShape, facts: businessFactsCompleteSchema })
  .refine(
    ({ imageAssetIds, rightsConfirmed }) => imageAssetIds.length === 0 || rightsConfirmed,
    { message: 'Image rights must be confirmed', path: ['rightsConfirmed'] },
  );

const generatedDraftShape = {
  schemaVersion: z.literal(1),
  templateId: z.string().trim().min(1).max(100),
  layout: z.enum(['split', 'centered', 'gallery_first']),
  tagline: z.string().trim().max(100),
  about: z.string().trim().max(1200),
  heroAssetId: z.uuid().nullable(),
  galleryAssetIds: z
    .array(z.uuid())
    .max(6)
    .refine(uniqueValues, 'Gallery asset IDs must be unique'),
  imageAlts: z
    .array(z.strictObject({ assetId: z.uuid(), text: z.string().trim().max(160) }))
    .max(8)
    .refine((alts) => uniqueValues(alts.map(({ assetId }) => assetId)), 'Alt asset IDs must be unique'),
  sections: z
    .array(z.enum(['about', 'services', 'gallery', 'hours']))
    .max(4)
    .refine(uniqueValues, 'Sections must be unique'),
};

export const generatedDraftSchema = z.strictObject(generatedDraftShape);

export function generatedDraftSchemaFor(input: z.infer<typeof intakeGenerationSchema>) {
  return generatedDraftSchema.superRefine((draft, context) => {
    const template = templateConfigs.find(({ id }) => id === draft.templateId);
    if (!template || template.category !== input.facts.category || template.isPremium) {
      context.addIssue({
        code: 'custom',
        path: ['templateId'],
        message: 'Template is not available for this category',
      });
    }

    const attached = new Set(input.imageAssetIds);
    const usedAssets = [
      ...(draft.heroAssetId ? [draft.heroAssetId] : []),
      ...draft.galleryAssetIds,
      ...draft.imageAlts.map(({ assetId }) => assetId),
    ];
    if (usedAssets.some((assetId) => !attached.has(assetId))) {
      context.addIssue({ code: 'custom', path: ['galleryAssetIds'], message: 'Output references an unattached asset' });
    }

    const sections = new Set(draft.sections);
    if (sections.has('services') && input.facts.services.length === 0) {
      context.addIssue({ code: 'custom', path: ['sections'], message: 'Services section has no source facts' });
    }
    if (sections.has('gallery') && draft.galleryAssetIds.length === 0) {
      context.addIssue({ code: 'custom', path: ['sections'], message: 'Gallery section has no assets' });
    }
    if (sections.has('hours') && input.facts.openingHours.every(({ value }) => value === null)) {
      context.addIssue({ code: 'custom', path: ['sections'], message: 'Hours section has no source facts' });
    }
  });
}

export const siteBlueprintSchema = z.strictObject({
  ...generatedDraftShape,
  facts: businessFactsCompleteSchema,
  logoAssetId: z.uuid().nullable(),
  sourceRevision: z.number().int().nonnegative(),
});

const revisionSchema = z.number().int().nonnegative();
const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).min(3).max(63);

export const createSiteRequestSchema = z.strictObject({
  category: businessCategorySchema,
  language: siteLanguageSchema,
});
export const saveDraftRequestSchema = z.strictObject({
  expectedRevision: revisionSchema,
  intake: intakeDraftSchema,
});
export const reserveAssetRequestSchema = z.strictObject({
  role: assetRoleSchema,
  fileName: z.string().trim().min(1).max(255),
  bytes: z.number().int().positive().max(3 * 1024 * 1024),
  mime: imageMimeSchema,
});
export const generateRequestSchema = z.strictObject({ expectedRevision: revisionSchema });
export const cancelJobRequestSchema = z.strictObject({});
export const createVersionRequestSchema = z.strictObject({
  expectedRevision: revisionSchema,
  baseVersionId: z.uuid(),
  blueprint: siteBlueprintSchema,
});
export const publishRequestSchema = z.strictObject({
  versionId: z.uuid(),
  expectedPublicationRevision: revisionSchema,
  slug: slugSchema,
  contentConfirmed: z.literal(true),
  rollback: z.boolean().optional().default(false),
});
export const unpublishRequestSchema = z.strictObject({ expectedPublicationRevision: revisionSchema });
export const deleteSiteRequestSchema = unpublishRequestSchema;
export const suspendSiteRequestSchema = z.strictObject({ suspended: z.boolean() });

import { describe, expect, it } from 'vitest';
import {
  createVersionRequestSchema,
  generatedDraftSchema,
  generatedDraftSchemaFor,
  intakeDraftSchema,
  intakeGenerationSchema,
  publishRequestSchema,
} from '@/lib/siteSchemas';

const serviceId = '11111111-1111-4111-8111-111111111111';
const imageId = '22222222-2222-4222-8222-222222222222';
const versionId = '33333333-3333-4333-8333-333333333333';

const hours = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
].map((day) => ({ day, value: null }));

function completeIntake() {
  return {
    schemaVersion: 1 as const,
    facts: {
      businessName: 'Cohen Barber',
      category: 'barbershop' as const,
      language: 'en' as const,
      description: 'A neighborhood barbershop for careful haircuts.',
      services: [{ id: serviceId, name: 'Haircut', description: null, priceText: '130' }],
      phone: '+972501234567',
      whatsapp: null,
      email: null,
      address: null,
      city: 'Rehovot',
      instagramUrl: 'https://www.instagram.com/cohenbarber',
      facebookUrl: null,
      openingHours: hours,
    },
    style: 'clean' as const,
    imageAssetIds: [imageId],
    rightsConfirmed: true,
  };
}

function generatedDraft() {
  return {
    schemaVersion: 1 as const,
    templateId: 'barbershop_classic',
    layout: 'split' as const,
    tagline: 'Careful cuts, close to home',
    about: 'A neighborhood barbershop focused on careful haircuts.',
    heroAssetId: imageId,
    galleryAssetIds: [imageId],
    imageAlts: [{ assetId: imageId, text: 'Inside Cohen Barber' }],
    sections: ['about', 'services', 'gallery'] as const,
  };
}

describe('intake schemas', () => {
  it('saves an incomplete draft but does not allow it to enqueue', () => {
    const complete = completeIntake();
    const draft = {
      ...complete,
      facts: {
        ...complete.facts,
        businessName: '',
        description: '',
        phone: null,
      },
      imageAssetIds: [],
      rightsConfirmed: false,
    };

    expect(intakeDraftSchema.safeParse(draft).success).toBe(true);
    expect(intakeGenerationSchema.safeParse(draft).success).toBe(false);
  });

  it('preserves a supplied numeric price as text', () => {
    const result = intakeGenerationSchema.parse(completeIntake());
    expect(result.facts.services[0].priceText).toBe('130');
    expect(
      intakeGenerationSchema.safeParse({
        ...completeIntake(),
        facts: {
          ...completeIntake().facts,
          services: [{ id: serviceId, name: 'Haircut', description: null, priceText: 130 }],
        },
      }).success,
    ).toBe(false);
  });

  it('rejects unsafe contact URLs, malformed phones and overlong copy', () => {
    const unsafe = completeIntake();
    unsafe.facts.instagramUrl = 'https://instagram.com.evil.example/account';
    unsafe.facts.phone = '050-123-4567';
    unsafe.facts.description = 'x'.repeat(2001);
    expect(intakeGenerationSchema.safeParse(unsafe).success).toBe(false);
  });

  it('requires seven unique ordered days and image rights', () => {
    const badHours = completeIntake();
    badHours.facts.openingHours = [...hours].reverse();
    expect(intakeGenerationSchema.safeParse(badHours).success).toBe(false);

    const noRights = completeIntake();
    noRights.rightsConfirmed = false;
    expect(intakeGenerationSchema.safeParse(noRights).success).toBe(false);
  });

  it('rejects unknown ownership fields instead of accepting private data', () => {
    expect(intakeDraftSchema.safeParse({ ...completeIntake(), ownerUid: 'attacker' }).success).toBe(false);
  });
});

describe('generated output schemas', () => {
  it('accepts a category-matched free template and attached assets', () => {
    const input = intakeGenerationSchema.parse(completeIntake());
    expect(generatedDraftSchemaFor(input).safeParse(generatedDraft()).success).toBe(true);
  });

  it('rejects premium, cross-category and unattached output choices', () => {
    const input = intakeGenerationSchema.parse(completeIntake());
    expect(
      generatedDraftSchemaFor(input).safeParse({
        ...generatedDraft(),
        templateId: 'barbershop_bold',
        heroAssetId: versionId,
      }).success,
    ).toBe(false);
  });

  it('rejects duplicate sections and model-invented fields', () => {
    expect(
      generatedDraftSchema.safeParse({
        ...generatedDraft(),
        sections: ['about', 'about'],
        ownerUid: 'attacker',
        rawHtml: '<script>alert(1)</script>',
      }).success,
    ).toBe(false);
  });

  it('rejects manual blueprint edits that add unknown private fields', () => {
    const request = {
      expectedRevision: 2,
      baseVersionId: versionId,
      blueprint: {
        ...generatedDraft(),
        facts: completeIntake().facts,
        logoAssetId: null,
        sourceRevision: 2,
        ownerUid: 'attacker',
      },
    };
    expect(createVersionRequestSchema.safeParse(request).success).toBe(false);
  });
});

describe('publication request schema', () => {
  it('requires exact confirmation, constrained slugs and supports explicit rollback', () => {
    expect(
      publishRequestSchema.parse({
        versionId,
        expectedPublicationRevision: 1,
        slug: 'cohen-barber',
        contentConfirmed: true,
        rollback: true,
      }).rollback,
    ).toBe(true);

    expect(
      publishRequestSchema.safeParse({
        versionId,
        expectedPublicationRevision: 1,
        slug: '../admin',
        contentConfirmed: false,
      }).success,
    ).toBe(false);
  });
});

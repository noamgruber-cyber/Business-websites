import type { BusinessCategory } from './types';

export type SiteLanguage = 'he' | 'en';
export type DesignStyle = 'auto' | 'clean' | 'warm' | 'bold';
export type Day =
  | 'sunday'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday';

export type Hours = { day: Day; value: string | null };
export type ServiceFact = {
  id: string;
  name: string;
  description: string | null;
  priceText: string | null;
};
export type BusinessFacts = {
  businessName: string;
  category: BusinessCategory;
  language: SiteLanguage;
  description: string;
  services: ServiceFact[];
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  address: string | null;
  city: string | null;
  instagramUrl: string | null;
  facebookUrl: string | null;
  openingHours: Hours[];
};
export type IntakeV1 = {
  schemaVersion: 1;
  facts: BusinessFacts;
  style: DesignStyle;
  imageAssetIds: string[];
  rightsConfirmed: boolean;
};
export type AssetRecord = {
  id: string;
  siteId: string;
  ownerUid: string;
  role: 'logo' | 'cover' | 'gallery';
  status: 'reserved' | 'ready' | 'rejected';
  privatePublicId: string | null;
  publicPublicId: string | null;
  sha256: string | null;
  mime: 'image/jpeg' | 'image/png' | 'image/webp' | null;
  bytes: number | null;
  width: number | null;
  height: number | null;
  createdAt: string;
  updatedAt: string;
};
export type SectionId = 'about' | 'services' | 'gallery' | 'hours';
export type GeneratedDraftV1 = {
  schemaVersion: 1;
  templateId: string;
  layout: 'split' | 'centered' | 'gallery_first';
  tagline: string;
  about: string;
  heroAssetId: string | null;
  galleryAssetIds: string[];
  imageAlts: { assetId: string; text: string }[];
  sections: SectionId[];
};
export type SiteBlueprintV1 = GeneratedDraftV1 & {
  facts: BusinessFacts;
  logoAssetId: string | null;
  sourceRevision: number;
};
export type QaIssue = { code: string; path: string; message: string };
export type QaReport = {
  passed: boolean;
  errors: QaIssue[];
  warnings: QaIssue[];
};
export type VersionRecord = {
  id: string;
  siteId: string;
  sourceRevision: number;
  blueprint: SiteBlueprintV1;
  source: 'ai' | 'manual_edit' | 'legacy_import';
  parentVersionId: string | null;
  qa: QaReport;
  rendererVersion: '1';
  promptVersion: string | null;
  model: string | null;
  createdAt: string;
};
export type SiteRecord = {
  id: string;
  ownerUid: string;
  draftRevision: number;
  draft: IntakeV1;
  latestVersionId: string | null;
  publishedVersionId: string | null;
  publicationRevision: number;
  activeJobId: string | null;
  slug: string | null;
  suspended: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
};
export type JobState =
  | 'queued'
  | 'generating'
  | 'validating'
  | 'ready'
  | 'failed'
  | 'cancelled';
export type JobRecord = {
  id: string;
  siteId: string;
  ownerUid: string;
  sourceRevision: number;
  inputSnapshot: IntakeV1;
  state: JobState;
  attempt: number;
  modelCallCount: number;
  nextAttemptAt: string;
  leaseToken: string | null;
  leaseExpiresAt: string | null;
  candidate: GeneratedDraftV1 | null;
  resultVersionId: string | null;
  providerResponseId: string | null;
  usage: {
    inputTokens: number;
    outputTokens: number;
    estimatedCostUsd: number | null;
  };
  errorCode: string | null;
  createdAt: string;
  updatedAt: string;
};
export type ApiErrorCode =
  | 'UNAUTHENTICATED'
  | 'NOT_FOUND'
  | 'INVALID_INPUT'
  | 'REVISION_CONFLICT'
  | 'JOB_ACTIVE'
  | 'IDEMPOTENCY_CONFLICT'
  | 'LIMIT_REACHED'
  | 'SLUG_TAKEN'
  | 'UPLOAD_REJECTED'
  | 'GENERATION_FAILED'
  | 'SERVICE_UNAVAILABLE';
export type ApiResult<T> =
  | { ok: true; data: T; requestId: string }
  | {
      ok: false;
      error: {
        code: ApiErrorCode;
        message: string;
        fieldErrors?: Record<string, string>;
      };
      requestId: string;
    };

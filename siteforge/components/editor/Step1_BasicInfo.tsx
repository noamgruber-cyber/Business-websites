'use client';

import { useEditorStore } from '@/lib/businessStore';
import InputField from '@/components/ui/InputField';
import TextAreaField from '@/components/ui/TextAreaField';
import ImageUploadBox from '@/components/ui/ImageUploadBox';

function generateSlug(name: string, category?: string): string {
  const stripped = name
    .toLowerCase()
    .trim()
    .replace(/[\u0590-\u05FF\u05B0-\u05C7]/g, '') // strip Hebrew characters
    .replace(/[^a-z0-9\s-]/g, '')                  // remove remaining special chars
    .replace(/\s+/g, '-')                           // spaces → dashes
    .replace(/-{2,}/g, '-')                         // collapse multiple dashes
    .replace(/^-|-$/g, '');                         // trim leading/trailing dashes
  if (!stripped) {
    const base = (category ?? 'business').replace(/_/g, '-');
    return `${base}-${Date.now().toString(36)}`;
  }
  return stripped;
}

export default function Step1_BasicInfo() {
  const { businessData, updateBusinessData } = useEditorStore();

  const handleNameChange = (value: string) => {
    updateBusinessData({
      businessName: value,
      slug: generateSlug(value, businessData.category),
    });
  };

  const handleSlugChange = (value: string) => {
    updateBusinessData({ slug: generateSlug(value, businessData.category) });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Basic Information</h2>
        <p className="text-white/40 text-sm">Tell customers who you are</p>
      </div>

      {/* Business Name */}
      <InputField
        label="Business Name"
        value={businessData.businessName}
        onChange={handleNameChange}
        placeholder="e.g. Cohen's Barbershop"
        required
      />

      {/* Tagline */}
      <InputField
        label="Tagline"
        value={businessData.tagline}
        onChange={(v) => updateBusinessData({ tagline: v })}
        placeholder="e.g. Sharp cuts, sharp style"
      />

      {/* Description */}
      <TextAreaField
        label="Description"
        value={businessData.description}
        onChange={(v) => updateBusinessData({ description: v })}
        placeholder="Tell customers what makes you special..."
        maxLength={300}
        rows={4}
      />

      {/* Logo upload */}
      <div>
        <p className="text-sm font-medium text-white/80 mb-1.5">Logo</p>
        <ImageUploadBox
          value={businessData.logoUrl}
          onChange={(url) => updateBusinessData({ logoUrl: url })}
          aspectRatio="1 / 1"
          className="max-w-[140px]"
        />
      </div>

      {/* Slug / URL preview */}
      <div className="space-y-1.5">
        <InputField
          label="Website URL Slug"
          value={businessData.slug}
          onChange={handleSlugChange}
          placeholder="your-business-name"
          helperText={`Your link: siteforge.com/b/${businessData.slug || 'your-business'}`}
        />
      </div>
    </div>
  );
}

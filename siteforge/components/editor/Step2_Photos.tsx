'use client';

import { useEditorStore } from '@/lib/businessStore';
import ImageUploadBox from '@/components/ui/ImageUploadBox';

const MAX_GALLERY = 6;

export default function Step2_Photos() {
  const { businessData, updateBusinessData } = useEditorStore();

  const galleryCount = businessData.galleryPhotos.filter(Boolean).length;

  const handleGalleryChange = (index: number, url: string) => {
    const updated = [...businessData.galleryPhotos];
    updated[index] = url;
    updateBusinessData({ galleryPhotos: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Photos</h2>
        <p className="text-white/40 text-sm">Add a cover photo and gallery images</p>
      </div>

      {/* Cover Photo */}
      <ImageUploadBox
        label="Cover Photo"
        value={businessData.coverPhotoUrl}
        onChange={(url) => updateBusinessData({ coverPhotoUrl: url })}
        aspectRatio="16 / 9"
      />

      {/* Gallery */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-white/80">Gallery Photos</p>
          <span className="text-xs text-white/35 tabular-nums">
            {galleryCount} / {MAX_GALLERY} added
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: MAX_GALLERY }).map((_, i) => (
            <ImageUploadBox
              key={i}
              value={businessData.galleryPhotos[i] ?? ''}
              onChange={(url) => handleGalleryChange(i, url)}
              aspectRatio="1 / 1"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

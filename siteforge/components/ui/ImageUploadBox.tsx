'use client';

import { useRef, useState } from 'react';
import { uploadImage } from '@/lib/uploadImage';

type ImageUploadBoxProps = {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  aspectRatio?: string;
  className?: string;
};

/**
 * Styled image upload box.
 * On file select: uploads to Cloudinary via /api/upload, stores permanent URL.
 * Shows a spinner during upload, and an error message on failure.
 */
export default function ImageUploadBox({
  label,
  value,
  onChange,
  aspectRatio = '1 / 1',
  className = '',
}: ImageUploadBoxProps) {
  const inputRef              = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed.');
      return;
    }
    setError(null);
    setUploading(true);
    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch (err) {
      console.error('[ImageUploadBox]', err);
      setError('Upload failed, please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={className}>
      {label && (
        <p className="text-sm font-medium text-white/80 mb-1.5">{label}</p>
      )}

      <div
        role="button"
        tabIndex={0}
        style={{ aspectRatio }}
        onClick={() => !uploading && inputRef.current?.click()}
        onKeyDown={(e) => e.key === 'Enter' && !uploading && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const file = e.dataTransfer.files[0];
          if (file) handleFile(file);
        }}
        className={`
          relative cursor-pointer rounded-xl overflow-hidden
          border-2 border-dashed flex items-center justify-center
          transition-all duration-200
          ${dragging
            ? 'border-purple-400 bg-purple-500/10 scale-[1.01]'
            : value
              ? 'border-purple-500/40 hover:border-purple-400'
              : 'border-white/15 hover:border-purple-500/50 bg-white/[0.02] hover:bg-purple-500/5'
          }
          ${uploading ? 'cursor-wait' : ''}
        `}
      >
        {/* Uploading spinner */}
        {uploading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 z-10 gap-2">
            <svg className="animate-spin w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="text-white/60 text-xs">Uploading…</span>
          </div>
        )}

        {value ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Uploaded preview"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {!uploading && (
              <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-white text-xs font-semibold">Change Photo</span>
              </div>
            )}
          </>
        ) : (
          !uploading && (
            <div className="flex flex-col items-center gap-2 p-4 text-center select-none">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                <svg className="w-6 h-6 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              {label && <p className="text-sm font-medium text-white/50">{label}</p>}
              <p className="text-xs text-white/25">JPG, PNG or WebP · Click or drag</p>
            </div>
          )
        )}
      </div>

      {/* Upload error */}
      {error && (
        <p className="text-red-400 text-xs mt-1.5">{error}</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = '';
        }}
      />
    </div>
  );
}

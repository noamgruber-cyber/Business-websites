'use client';

import Link from 'next/link';
import { useEditorStore } from '@/lib/businessStore';
import { BusinessCategory, CATEGORY_COLORS } from '@/lib/types';
import { getTemplateConfig } from '@/lib/templateConfigs';

// Re-export-safe label map
const CAT_LABELS: Record<BusinessCategory, string> = {
  barbershop:  '💈 Barbershop',
  restaurant:  '🍕 Restaurant',
  nail_salon:  '💅 Nail Salon',
  gym:         '🏋️ Gym',
  cafe:        '☕ Café',
  photography: '📸 Photography',
};

function fmtHours(value: string): string {
  if (!value || value === 'closed') return 'Closed';
  return value.replace('-', ' – ');
}

export default function LivePreview() {
  const { businessData, currentStep } = useEditorStore();
  const colors = CATEGORY_COLORS[businessData.category] ?? CATEGORY_COLORS.barbershop;
  const templateConfig = getTemplateConfig(businessData.templateId ?? '');

  const displayName = businessData.businessName.trim() || 'Your Business Name';
  const galleryFilled = businessData.galleryPhotos.filter(Boolean);

  // Use template's bgColor if available
  const previewBg = templateConfig?.bgColor ?? colors.bg;

  return (
    <div className="sticky top-24 select-none">
      {/* Header label */}
      <div className="flex items-center gap-2 mb-4">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
        </span>
        <span className="text-sm font-semibold text-white/70">Live Preview</span>
        <span className="ml-auto text-xs text-white/30 bg-white/5 border border-white/10 rounded-full px-2 py-0.5">
          {CAT_LABELS[businessData.category]}
        </span>
      </div>

      {/* Template info bar */}
      {templateConfig && (
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs text-white/30">
            Previewing: <span className="text-white/55 font-medium">{templateConfig.name}</span>
          </span>
          <Link
            href={`/templates/${businessData.category}${businessData.id ? `?id=${businessData.id}` : ''}`}
            className="text-[11px] text-purple-400 hover:text-purple-300 transition-colors font-medium"
          >
            Change Design →
          </Link>
        </div>
      )}

      {/* Outer clipping container */}
      <div
        className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50"
        style={{ height: '500px' }}
      >
        {/* Scaled inner - 1 / 0.62 ≈ 161.3% wide so it fills at scale 0.62 */}
        <div
          style={{
            transform: 'scale(0.62)',
            transformOrigin: 'top left',
            width: 'calc(100% / 0.62)',
          }}
        >
          {/* ── Browser chrome ── */}
          <div style={{ backgroundColor: '#16162a', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Traffic lights */}
            <div style={{ display: 'flex', gap: '5px' }}>
              {['#ff5f57', '#ffbd2e', '#28c840'].map((c) => (
                <span key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, display: 'block', opacity: 0.8 }} />
              ))}
            </div>
            {/* URL bar */}
            <div style={{ flex: 1, maxWidth: 340, margin: '0 auto', background: '#0d0d1f', borderRadius: 6, padding: '4px 10px' }}>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>
                siteforge.com/b/{businessData.slug || 'your-business'}
              </span>
            </div>
          </div>

          {/* ── Website Content ── */}
          <div style={{ background: previewBg, minHeight: 800, fontFamily: 'Inter, system-ui, sans-serif' }}>

            {/* Navbar */}
            <div style={{
              background: 'rgba(0,0,0,0.45)',
              padding: '12px 20px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              borderBottom: `2px solid ${colors.primary}`,
            }}>
              {/* Logo or name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {businessData.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={businessData.logoUrl} alt="logo" style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ width: 28, height: 28, borderRadius: '50%', background: colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>
                    {displayName[0]?.toUpperCase() ?? '?'}
                  </span>
                )}
                <span style={{ color: 'white', fontWeight: 700, fontSize: 15 }}>{displayName}</span>
              </div>
              <div style={{ display: 'flex', gap: 14 }}>
                {['Services', 'About', 'Contact'].map((item) => (
                  <span key={item} style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11 }}>{item}</span>
                ))}
              </div>
            </div>

            {/* Hero section */}
            <div style={{
              position: 'relative',
              minHeight: 180,
              background: businessData.coverPhotoUrl
                ? `url(${businessData.coverPhotoUrl}) center/cover no-repeat`
                : `linear-gradient(135deg, ${colors.bg} 0%, ${colors.primary}55 100%)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', padding: '24px 20px', textAlign: 'center',
            }}>
              {businessData.coverPhotoUrl && (
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)' }} />
              )}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h1 style={{ color: 'white', fontWeight: 900, fontSize: 26, margin: '0 0 6px', lineHeight: 1.2 }}>
                  {displayName}
                </h1>
                {businessData.tagline ? (
                  <p style={{ color: colors.light, fontSize: 14, margin: '0 0 14px', opacity: 0.9 }}>
                    {businessData.tagline}
                  </p>
                ) : (
                  <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, margin: '0 0 14px', fontStyle: 'italic' }}>
                    Your tagline here...
                  </p>
                )}
                <button style={{
                  background: colors.primary, color: 'white', border: 'none',
                  borderRadius: 20, padding: '7px 18px', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                }}>
                  Book Now
                </button>
              </div>
            </div>

            {/* Description (Step 1) */}
            {currentStep === 1 && businessData.description && (
              <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, lineHeight: 1.65, margin: 0 }}>
                  {businessData.description}
                </p>
              </div>
            )}

            {/* Gallery thumbnails (Step 2) */}
            {currentStep === 2 && galleryFilled.length > 0 && (
              <div style={{ padding: '16px 20px' }}>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Gallery</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
                  {galleryFilled.slice(0, 6).map((url, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={i}
                      src={url}
                      alt=""
                      style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: 6 }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Services (Step 3+) */}
            {currentStep >= 3 && businessData.services.length > 0 && (
              <div style={{ padding: '16px 20px' }}>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 700, marginBottom: 10 }}>
                  Our Services
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {businessData.services.slice(0, 6).map((s) => (
                    <div key={s.id} style={{
                      background: 'rgba(255,255,255,0.04)', border: `1px solid ${colors.primary}30`,
                      borderRadius: 8, padding: 10,
                    }}>
                      <p style={{ color: 'white', fontSize: 12, fontWeight: 600, margin: '0 0 2px' }}>
                        {s.name || 'Service name'}
                      </p>
                      {s.price && (
                        <p style={{ color: colors.primary, fontSize: 13, fontWeight: 700, margin: '0 0 2px' }}>
                          {s.price}
                        </p>
                      )}
                      {s.description && (
                        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 10, margin: 0 }}>
                          {s.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact info (Step 4) */}
            {currentStep >= 4 && (businessData.phone || businessData.address || businessData.email) && (
              <div style={{ padding: '0 20px 16px', display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {businessData.phone && (
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11 }}>📞 {businessData.phone}</span>
                )}
                {businessData.email && (
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11 }}>✉️ {businessData.email}</span>
                )}
                {businessData.address && (
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11 }}>
                    📍 {businessData.address}{businessData.city ? `, ${businessData.city}` : ''}
                  </span>
                )}
              </div>
            )}

            {/* Opening hours snippet (Step 4) */}
            {currentStep >= 4 && (
              <div style={{ padding: '0 20px 20px' }}>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: 600, marginBottom: 6 }}>Hours</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px 12px' }}>
                  {(['sunday','monday','tuesday','wednesday','thursday','friday','saturday'] as const).map((day) => (
                    <div key={day} style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                      <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 10, textTransform: 'capitalize' }}>{day.slice(0,3)}</span>
                      <span style={{ color: businessData.openingHours[day] === 'closed' ? 'rgba(255,255,255,0.2)' : colors.light, fontSize: 10 }}>
                        {fmtHours(businessData.openingHours[day])}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

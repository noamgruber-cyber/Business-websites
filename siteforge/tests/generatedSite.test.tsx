import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import GeneratedSite from '@/components/generated/GeneratedSite';
import type { SiteBlueprintV1 } from '@/lib/siteContracts';

const ids = {
  service: '11111111-1111-4111-8111-111111111111',
  hero: '22222222-2222-4222-8222-222222222222',
  gallery: '33333333-3333-4333-8333-333333333333',
};

function blueprint(language: 'he' | 'en', layout: SiteBlueprintV1['layout']): SiteBlueprintV1 {
  return {
    schemaVersion: 1,
    templateId: 'barbershop_classic',
    layout,
    tagline: language === 'he' ? 'תספורת מדויקת ליד הבית' : 'Careful cuts close to home',
    about: language === 'he' ? 'מספרה שכונתית לתספורות מדויקות.' : 'A neighborhood barbershop for careful haircuts.',
    heroAssetId: ids.hero,
    galleryAssetIds: [ids.gallery],
    imageAlts: [
      { assetId: ids.hero, text: 'Shop entrance' },
      { assetId: ids.gallery, text: 'Inside the shop' },
    ],
    sections: ['about', 'services', 'gallery', 'hours'],
    logoAssetId: null,
    sourceRevision: 1,
    facts: {
      businessName: 'Cohen Barber',
      category: 'barbershop',
      language,
      description: 'A neighborhood barbershop for careful haircuts.',
      services: [{ id: ids.service, name: 'Haircut', description: null, priceText: '130 ₪' }],
      phone: '+972501234567',
      whatsapp: null,
      email: null,
      address: '1 Main Street',
      city: 'Rehovot',
      instagramUrl: null,
      facebookUrl: null,
      openingHours: [
        { day: 'sunday', value: '09:00-18:00' },
        { day: 'monday', value: null },
        { day: 'tuesday', value: null },
        { day: 'wednesday', value: null },
        { day: 'thursday', value: null },
        { day: 'friday', value: 'closed' },
        { day: 'saturday', value: null },
      ],
    },
  };
}

describe('GeneratedSite', () => {
  for (const language of ['he', 'en'] as const) {
    for (const layout of ['split', 'centered', 'gallery_first'] as const) {
      it(`renders ${language} ${layout} through the shared static renderer`, () => {
        const html = renderToStaticMarkup(
          <GeneratedSite
            blueprint={blueprint(language, layout)}
            media={{
              [ids.hero]: { url: 'data:image/png;base64,hero' },
              [ids.gallery]: { url: 'data:image/png;base64,gallery' },
            }}
            preview
          />,
        );

        expect(html).toContain(`lang="${language}"`);
        expect(html).toContain(`dir="${language === 'he' ? 'rtl' : 'ltr'}"`);
        expect(html).toContain(`sf-layout-${layout}`);
        expect(html).toContain('130 ₪');
        expect(html).toContain('href="tel:+972501234567"');
        expect(html).not.toContain('WhatsApp</a>');
        expect(html).not.toContain('dangerouslySetInnerHTML');
      });
    }
  }

  it('rejects premium or category-mismatched templates', () => {
    expect(() => renderToStaticMarkup(
      <GeneratedSite blueprint={{ ...blueprint('en', 'split'), templateId: 'barbershop_bold' }} media={{}} />,
    )).toThrow('GENERATED_TEMPLATE_NOT_AVAILABLE');
  });

  it('does not emit actions or broken images for missing facts and media', () => {
    const sparse = blueprint('en', 'split');
    sparse.facts.phone = null;
    sparse.heroAssetId = null;
    sparse.galleryAssetIds = [ids.gallery];
    const html = renderToStaticMarkup(<GeneratedSite blueprint={sparse} media={{}} />);

    expect(html).not.toContain('href="tel:');
    expect(html).not.toContain('<img');
    expect(html).not.toContain('id="gallery"');
  });
});

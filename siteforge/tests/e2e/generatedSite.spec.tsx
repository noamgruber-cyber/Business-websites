import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { renderToStaticMarkup } from 'react-dom/server';
import GeneratedSite from '@/components/generated/GeneratedSite';
import type { SiteBlueprintV1 } from '@/lib/siteContracts';

const css = readFileSync(
  fileURLToPath(new URL('../../components/generated/site.css', import.meta.url)),
  'utf8',
);
const pixel = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';
const widths = [375, 768, 1440];

function fixture(language: 'he' | 'en', layout: SiteBlueprintV1['layout']): SiteBlueprintV1 {
  const days: SiteBlueprintV1['facts']['openingHours'] = [
    { day: 'sunday', value: '09:00-18:00' },
    { day: 'monday', value: '09:00-18:00' },
    { day: 'tuesday', value: '09:00-18:00' },
    { day: 'wednesday', value: '09:00-18:00' },
    { day: 'thursday', value: '09:00-18:00' },
    { day: 'friday', value: 'closed' },
    { day: 'saturday', value: null },
  ];
  return {
    schemaVersion: 1,
    templateId: 'barbershop_classic',
    layout,
    tagline: language === 'he' ? 'תספורת מדויקת ליד הבית' : 'Careful cuts close to home',
    about: language === 'he'
      ? 'מספרה שכונתית שמציגה רק את הפרטים שסיפק בעל העסק.'
      : 'A neighborhood barbershop showing only owner-supplied facts.',
    heroAssetId: '22222222-2222-4222-8222-222222222222',
    galleryAssetIds: [
      '33333333-3333-4333-8333-333333333333',
      '44444444-4444-4444-8444-444444444444',
    ],
    imageAlts: [
      { assetId: '22222222-2222-4222-8222-222222222222', text: 'Shop entrance' },
      { assetId: '33333333-3333-4333-8333-333333333333', text: 'Inside the shop' },
      { assetId: '44444444-4444-4444-8444-444444444444', text: 'Barber station' },
    ],
    sections: ['about', 'services', 'gallery', 'hours'],
    logoAssetId: null,
    sourceRevision: 1,
    facts: {
      businessName: language === 'he' ? 'המספרה של כהן' : 'Cohen Barber',
      category: 'barbershop',
      language,
      description: 'A neighborhood barbershop for careful haircuts.',
      services: [
        {
          id: '11111111-1111-4111-8111-111111111111',
          name: language === 'he' ? 'תספורת' : 'Haircut',
          description: null,
          priceText: '130 ₪',
        },
      ],
      phone: '+972501234567',
      whatsapp: '+972501234567',
      email: 'hello@example.test',
      address: language === 'he' ? 'רחוב הראשי 1' : '1 Main Street',
      city: language === 'he' ? 'רחובות' : 'Rehovot',
      instagramUrl: null,
      facebookUrl: null,
      openingHours: days,
    },
  };
}

for (const language of ['he', 'en'] as const) {
  for (const layout of ['split', 'centered', 'gallery_first'] as const) {
    test(`${language} ${layout} stays accessible and within all target widths`, async ({ page }) => {
      const errors: string[] = [];
      page.on('console', (message) => {
        if (message.type() === 'error') errors.push(message.text());
      });
      page.on('pageerror', (error) => errors.push(error.message));

      const blueprint = fixture(language, layout);
      const markup = renderToStaticMarkup(
        <GeneratedSite
          blueprint={blueprint}
          media={{
            '22222222-2222-4222-8222-222222222222': { url: pixel },
            '33333333-3333-4333-8333-333333333333': { url: pixel },
            '44444444-4444-4444-8444-444444444444': { url: pixel },
          }}
        />,
      );

      for (const width of widths) {
        await page.setViewportSize({ width, height: 1000 });
        await page.setContent(`<style>${css}</style>${markup}`, { waitUntil: 'load' });

        await expect(page.locator('main')).toHaveAttribute('lang', language);
        await expect(page.locator('img')).toHaveCount(3);
        expect(await page.locator('img').evaluateAll((images) => images.every((image) => {
          const htmlImage = image as HTMLImageElement;
          return htmlImage.complete && htmlImage.naturalWidth > 0;
        }))).toBe(true);
        expect(await page.locator('a').evaluateAll((anchors) => anchors.every((anchor) => Boolean(anchor.getAttribute('href'))))).toBe(true);

        const overflow = await page.locator('main, main *').evaluateAll((elements) => {
          const width = document.documentElement.clientWidth;
          return elements
            .map((element) => ({ tag: element.tagName, rect: element.getBoundingClientRect() }))
            .filter(({ rect }) => rect.width > 0 && (rect.left < -1 || rect.right > width + 1))
            .map(({ tag, rect }) => ({ tag, left: rect.left, right: rect.right, width }));
        });
        expect(overflow).toEqual([]);

        const accessibility = await new AxeBuilder({ page }).analyze();
        expect(accessibility.violations).toEqual([]);
      }

      expect(errors).toEqual([]);
    });
  }
}

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import {
  fixtureFilename,
  fixtureLanguages,
  fixtureLayouts,
} from '@/tests/fixtures/generatedSiteFixture';

const widths = [375, 768, 1440];

for (const language of fixtureLanguages) {
  for (const layout of fixtureLayouts) {
    test(`${language} ${layout} stays accessible and within all target widths`, async ({ page }) => {
      const errors: string[] = [];
      page.on('console', (message) => {
        if (message.type() === 'error') errors.push(message.text());
      });
      page.on('pageerror', (error) => errors.push(error.message));

      const html = readFileSync(
        join(process.cwd(), '.playwright-fixtures', fixtureFilename(language, layout)),
        'utf8',
      );

      for (const width of widths) {
        await page.setViewportSize({ width, height: 1000 });
        await page.setContent(html, { waitUntil: 'load' });

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

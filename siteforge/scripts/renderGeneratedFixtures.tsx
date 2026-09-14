import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import GeneratedSite from '@/components/generated/GeneratedSite';
import {
  fixtureFilename,
  fixtureLanguages,
  fixtureLayouts,
  generatedSiteFixture,
  pixel,
} from '@/tests/fixtures/generatedSiteFixture';

const root = process.cwd();
const outputDirectory = join(root, '.playwright-fixtures');
const css = readFileSync(join(root, 'components/generated/site.css'), 'utf8');

mkdirSync(outputDirectory, { recursive: true });

for (const language of fixtureLanguages) {
  for (const layout of fixtureLayouts) {
    const blueprint = generatedSiteFixture(language, layout);
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
    const direction = language === 'he' ? 'rtl' : 'ltr';
    const document = `<!doctype html><html lang="${language}" dir="${direction}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Generated site fixture</title><style>${css}</style></head><body>${markup}</body></html>`;
    writeFileSync(join(outputDirectory, fixtureFilename(language, layout)), document);
  }
}

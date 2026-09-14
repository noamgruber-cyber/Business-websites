import type { CSSProperties } from 'react';
import type { SiteBlueprintV1 } from './siteContracts';
import { getTemplateConfig } from './templateConfigs';

export type GeneratedMedia = Record<string, { url: string }>;

export type GeneratedRecipe = {
  templateId: string;
  layout: SiteBlueprintV1['layout'];
  className: string;
  style: CSSProperties & Record<`--sf-${string}`, string>;
};

function rgb(hex: string): [number, number, number] {
  const value = hex.replace('#', '');
  if (!/^[0-9a-f]{6}$/i.test(value)) return [10, 10, 15];
  return [0, 2, 4].map((offset) => Number.parseInt(value.slice(offset, offset + 2), 16)) as [
    number,
    number,
    number,
  ];
}

function luminance(hex: string): number {
  const channels = rgb(hex).map((channel) => {
    const normalized = channel / 255;
    return normalized <= 0.04045
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrast(first: string, second: string): number {
  const light = Math.max(luminance(first), luminance(second));
  const dark = Math.min(luminance(first), luminance(second));
  return (light + 0.05) / (dark + 0.05);
}

function readableForeground(background: string): '#050505' | '#ffffff' {
  return contrast(background, '#050505') >= contrast(background, '#ffffff') ? '#050505' : '#ffffff';
}

function readableAccent(accent: string, background: string, fallback: '#050505' | '#ffffff') {
  return contrast(accent, background) >= 4.5 ? accent : fallback;
}

export function resolveGeneratedRecipe(blueprint: SiteBlueprintV1): GeneratedRecipe {
  const template = getTemplateConfig(blueprint.templateId);
  if (!template || template.category !== blueprint.facts.category || template.isPremium) {
    throw new Error('GENERATED_TEMPLATE_NOT_AVAILABLE');
  }

  const foreground = readableForeground(template.bgColor);
  const isDark = foreground === '#ffffff';
  const surface = isDark ? '#17171f' : '#ffffff';
  const muted = isDark ? '#cbd5e1' : '#334155';

  return {
    templateId: template.id,
    layout: blueprint.layout,
    className: `sf-site sf-layout-${blueprint.layout}`,
    style: {
      '--sf-bg': template.bgColor,
      '--sf-fg': foreground,
      '--sf-muted': muted,
      '--sf-surface': surface,
      '--sf-accent': template.accentColor,
      '--sf-accent-text': readableAccent(template.accentColor, surface, foreground),
      '--sf-on-accent': readableForeground(template.accentColor),
    },
  };
}

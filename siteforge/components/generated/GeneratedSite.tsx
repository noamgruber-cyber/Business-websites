import type { SiteBlueprintV1, SiteLanguage } from '@/lib/siteContracts';
import { resolveGeneratedRecipe, type GeneratedMedia } from '@/lib/generatedRecipes';

type Props = {
  blueprint: SiteBlueprintV1;
  media: GeneratedMedia;
  preview?: boolean;
};

const labels = {
  en: {
    about: 'About',
    services: 'Services',
    gallery: 'Gallery',
    hours: 'Opening hours',
    contact: 'Contact',
    closed: 'Closed',
    phone: 'Call',
    whatsapp: 'WhatsApp',
    email: 'Email',
    instagram: 'Instagram',
    facebook: 'Facebook',
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  },
  he: {
    about: 'אודות',
    services: 'שירותים',
    gallery: 'גלריה',
    hours: 'שעות פתיחה',
    contact: 'יצירת קשר',
    closed: 'סגור',
    phone: 'התקשרו',
    whatsapp: 'WhatsApp',
    email: 'אימייל',
    instagram: 'Instagram',
    facebook: 'Facebook',
    days: ['יום ראשון', 'יום שני', 'יום שלישי', 'יום רביעי', 'יום חמישי', 'יום שישי', 'שבת'],
  },
} as const;

function safeSocialUrl(value: string | null, domain: 'instagram.com' | 'facebook.com') {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (
      url.protocol !== 'https:' ||
      url.username ||
      url.password ||
      (url.hostname !== domain && !url.hostname.endsWith(`.${domain}`))
    ) {
      return null;
    }
    return url.toString();
  } catch {
    return null;
  }
}

function actionLinks(facts: SiteBlueprintV1['facts'], language: SiteLanguage) {
  const text = labels[language];
  const links: { label: string; href: string }[] = [];
  if (facts.phone) links.push({ label: text.phone, href: `tel:${facts.phone}` });
  if (facts.whatsapp) links.push({ label: text.whatsapp, href: `https://wa.me/${facts.whatsapp.slice(1)}` });
  if (facts.email) links.push({ label: text.email, href: `mailto:${facts.email}` });
  const instagram = safeSocialUrl(facts.instagramUrl, 'instagram.com');
  const facebook = safeSocialUrl(facts.facebookUrl, 'facebook.com');
  if (instagram) links.push({ label: text.instagram, href: instagram });
  if (facebook) links.push({ label: text.facebook, href: facebook });
  return links;
}

export default function GeneratedSite({ blueprint, media, preview = false }: Props) {
  const recipe = resolveGeneratedRecipe(blueprint);
  const { facts } = blueprint;
  const text = labels[facts.language];
  const direction = facts.language === 'he' ? 'rtl' : 'ltr';
  const hero = blueprint.heroAssetId ? media[blueprint.heroAssetId] : undefined;
  const logo = blueprint.logoAssetId ? media[blueprint.logoAssetId] : undefined;
  const gallery = blueprint.galleryAssetIds.flatMap((assetId) => {
    const item = media[assetId];
    if (!item) return [];
    const alt = blueprint.imageAlts.find((candidate) => candidate.assetId === assetId)?.text ?? '';
    return [{ assetId, url: item.url, alt }];
  });
  const sections = new Set(blueprint.sections);
  const links = actionLinks(facts, facts.language);

  return (
    <main
      className={`${recipe.className}${preview ? ' sf-preview' : ''}`}
      style={recipe.style}
      lang={facts.language}
      dir={direction}
      data-template={recipe.templateId}
    >
      <header className={`sf-hero${hero ? '' : ' sf-hero-text-only'}`}>
        <div className="sf-hero-copy">
          {logo && <img className="sf-logo" src={logo.url} alt={facts.businessName} />}
          <h1>{facts.businessName}</h1>
          {blueprint.tagline && <p className="sf-tagline">{blueprint.tagline}</p>}
          {links.length > 0 && (
            <nav className="sf-actions" aria-label={text.contact}>
              {links.slice(0, 3).map((link) => (
                <a key={`${link.label}-${link.href}`} href={link.href}>{link.label}</a>
              ))}
            </nav>
          )}
        </div>
        {hero && <img className="sf-hero-image" src={hero.url} alt={blueprint.imageAlts.find(({ assetId }) => assetId === blueprint.heroAssetId)?.text ?? ''} />}
      </header>

      {sections.has('about') && blueprint.about && (
        <section id="about" className="sf-section sf-reading">
          <h2>{text.about}</h2>
          <p>{blueprint.about}</p>
        </section>
      )}

      {sections.has('services') && facts.services.length > 0 && (
        <section id="services" className="sf-section">
          <h2>{text.services}</h2>
          <div className="sf-card-grid">
            {facts.services.map((service) => (
              <article className="sf-card" key={service.id}>
                <div className="sf-service-title">
                  <h3>{service.name}</h3>
                  {service.priceText && <strong>{service.priceText}</strong>}
                </div>
                {service.description && <p>{service.description}</p>}
              </article>
            ))}
          </div>
        </section>
      )}

      {sections.has('gallery') && gallery.length > 0 && (
        <section id="gallery" className="sf-section">
          <h2>{text.gallery}</h2>
          <div className="sf-gallery">
            {gallery.map((image) => (
              <img key={image.assetId} src={image.url} alt={image.alt} />
            ))}
          </div>
        </section>
      )}

      {sections.has('hours') && facts.openingHours.some(({ value }) => value !== null) && (
        <section id="hours" className="sf-section sf-reading">
          <h2>{text.hours}</h2>
          <dl className="sf-hours">
            {facts.openingHours.map((hours, index) => hours.value && (
              <div key={hours.day}>
                <dt>{text.days[index]}</dt>
                <dd>{hours.value === 'closed' ? text.closed : hours.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <footer id="contact" className="sf-section sf-contact">
        <h2>{text.contact}</h2>
        {(facts.address || facts.city) && (
          <address>{[facts.address, facts.city].filter(Boolean).join(', ')}</address>
        )}
        <nav className="sf-actions" aria-label={text.contact}>
          {links.map((link) => (
            <a key={`${link.label}-${link.href}`} href={link.href}>{link.label}</a>
          ))}
        </nav>
      </footer>
    </main>
  );
}

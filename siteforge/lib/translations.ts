/**
 * SiteForge — Hebrew / English UI translations.
 * Usage: const { lang } = useLanguage(); const text = t[lang];
 */

export const t = {
  he: {
    // ── Navbar ──────────────────────────────────────────────────────────────
    nav: {
      features:  'תכונות',
      templates: 'תבניות',
      pricing:   'מחירים',
      examples:  'דוגמאות',
      cta:       'צור אתר עכשיו ←',
      dashboard: 'הדשבורד שלי ←',
      signIn:    'התחברות ←',
      signOut:   'התנתק',
      langToggle: '🇺🇸 EN',
    },

    // ── Hero ─────────────────────────────────────────────────────────────────
    hero: {
      badge:        'עכשיו בגרסת בטא — תוכנית חינמית לנצח',
      headline1:    'העסק שלך מגיע',
      headline2:    'לאתר מדהים',
      subheadline:  'צור אתר מקצועי לעסק שלך תוך 5 דקות. ללא קוד. ללא מעצבים.',
      primaryCta:   'התחל בחינם ←',
      secondaryCta: 'צפה בדוגמאות',
      proof1:       '✓ חינם לנצח',
      proof2:       '✓ ללא כרטיס אשראי',
      proof3:       '✓ חי תוך 5 דקות',
      mockupServices: ['תספורת', 'גילוח זקן', 'שירות מלא'],
      mockupPrices:   ['₪60', '₪40', '₪90'],
      mockupIcons:    ['✂️', '🪒', '💈'],
      mockupNav:      ['שירותים', 'גלריה', 'קביעת תור'],
      mockupTagline:  'תספורות פרמיום וטיפוח',
      mockupSub:      'מאז 2010 · תל אביב · קבלת לקוחות ללא תור',
      mockupCta:      'קבע תור',
      mockupSection:  'השירותים שלנו',
    },

    // ── How It Works ─────────────────────────────────────────────────────────
    howItWorks: {
      label:    'תהליך פשוט',
      title:    'איך זה',
      titleHighlight: 'עובד',
      subtitle: 'שלושה שלבים מההרשמה ועד אתר חי. אין צורך בידע טכני.',
      steps: [
        {
          title: 'בחר תבנית',
          description: 'עיין בתבניות מקצועיות המותאמות לתעשייה שלך. מספרות ועד מסעדות — יש לנו הכל.',
        },
        {
          title: 'מלא את הפרטים',
          description: 'הוסף שם עסק, לוגו, תמונות, שעות פתיחה ופרטי קשר. העורך שלנו עושה את זה בקלות.',
        },
        {
          title: 'עלה לאוויר מיד',
          description: 'לחץ פרסם והאתר שלך חי עם קישור ברגעים. שתף בוואטסאפ, אינסטגרם או גוגל מפות.',
        },
      ],
    },

    // ── Template Showcase ────────────────────────────────────────────────────
    templates: {
      label:    'תבניות לפי תעשייה',
      title:    'תבניות לכל',
      titleHighlight: 'סוג עסק',
      subtitle: 'עיצובים מקצועיים המותאמים לתעשייה שלך — מוכנים להתאמה אישית בדקות.',
      categories: [
        { name: 'ספרייה', count: '12 תבניות' },
        { name: 'מסעדה', count: '18 תבניות' },
        { name: 'סטודיו ציפורניים', count: '10 תבניות' },
        { name: 'חדר כושר', count: '8 תבניות' },
        { name: 'קפה', count: '14 תבניות' },
        { name: 'צילום', count: '11 תבניות' },
      ],
      previewBtn: 'תצוגה מקדימה',
      seeAll:     'ראה את כל התבניות',
    },

    // ── Testimonials ─────────────────────────────────────────────────────────
    testimonials: {
      label:    'סיפורי לקוחות',
      title:    'אהוב על',
      titleHighlight: 'בעלי עסקים',
      subtitle: 'אלפי עסקים מקומיים כבר השיקו עם SiteForge.',
      items: [
        {
          quote: 'האתר שלי עלה תוך 10 דקות ממש. הלקוחות שלי יכולים עכשיו לקבוע תור אונליין ולמצוא את השעות שלי מיד. SiteForge שינה את המשחק לעסק קטן כמו שלי.',
          name:  'אבי כהן',
          biz:   'ספרייה של כהן, תל אביב',
        },
        {
          quote: 'עברנו מאפס נוכחות אונליין לאתר יפה עם תפריט מלא וטופס צור קשר. ההזמנות שלנו עלו ב-30% מאז השקה. ערך מדהים.',
          name:  'מריה רוסי',
          biz:   'פיצרייה רוסי, חיפה',
        },
        {
          quote: 'התבניות כל כך מקצועיות — לקוחות תמיד משבחים כמה מודרני האתר שלי נראה. לא דמיינתי שאוכל לקבל משהו כזה יפה בלי לשכור מפתח.',
          name:  'דנה לוי',
          biz:   'סטודיו DanaGlow, ירושלים',
        },
      ],
      stats: [
        { value: '5,000+', label: 'אתרים שהושקו' },
        { value: '4.9/5',  label: 'ציון ממוצע' },
        { value: '98%',    label: 'שביעות רצון' },
      ],
    },

    // ── Pricing ──────────────────────────────────────────────────────────────
    pricing: {
      label:          'תמחור',
      title:          'תמחור פשוט,',
      titleHighlight: 'ישיר',
      subtitle:       'אין עמלות נסתרות. אין חיובים מפתיעים. ביטול בכל עת.',
      monthly:        'חודשי',
      yearly:         'שנתי',
      saveLabel:      'חסוך 20%',
      perMonth:       '/חודש',
      mostPopular:    'הכי פופולרי',
      guarantee:      '🔒 החזר כסף תוך 14 יום · ללא חוזים · ביטול בכל עת',
      seeFullPricing: 'ראה פרטי תמחור מלאים',
      plans: {
        starter: {
          tier: 'Starter',
          description: 'מושלם להתחלה',
          cta: 'התחל בחינם',
          features: ['אתר 1', 'כתובת SiteForge', 'תבניות בסיסיות', 'טופס צור קשר', 'SSL', 'מותאם לנייד'],
          disabledFeatures: ['דומיין מותאם אישית', 'הסרת מיתוג SiteForge', 'ניתוח נתונים', 'תמיכה מועדפת'],
        },
        business: {
          tier: 'Business',
          description: 'כל מה שצריך לצמוח',
          cta: 'התחל 14 ימי ניסיון',
          features: ['אתר 1', 'דומיין מותאם אישית', 'כל 6 התבניות', 'הסרת מיתוג SiteForge', 'לוח ניתוחי נתונים', 'תמיכת דוא"ל מועדפת', 'SSL', 'מותאם לנייד'],
          disabledFeatures: [],
        },
        agency: {
          tier: 'Agency',
          description: 'למקצוענים המנהלים לקוחות מרובים',
          cta: 'צור קשר למכירות',
          features: ['10 אתרים', 'דומיין מותאם לכל אתר', 'כל 6 התבניות', 'פתרון White-label', 'תמיכה טלפונית מועדפת', 'מנהל חשבון ייעודי', 'שיתוף פעולה בצוות', 'ניתוחים מתקדמים'],
          disabledFeatures: [],
        },
      },
    },

    // ── Footer ───────────────────────────────────────────────────────────────
    footer: {
      tagline:    'הדרך הקלה ביותר להעלות את העסק שלך לרשת. ללא קוד. ללא סיבוכים.',
      copyright:  '© 2025 SiteForge. כל הזכויות שמורות.',
      madeWith:   'נבנה עם ❤️ לעסקים מקומיים.',
      columns: [
        {
          heading: 'מוצר',
          links: ['תכונות', 'תבניות', 'מחירים', 'עדכונים'],
        },
        {
          heading: 'חברה',
          links: ['אודות', 'בלוג', 'קריירה', 'צור קשר'],
        },
        {
          heading: 'משפטי',
          links: ['מדיניות פרטיות', 'תנאי שימוש', 'מדיניות עוגיות', 'GDPR'],
        },
        {
          heading: 'רשתות חברתיות',
          links: ['Twitter / X', 'Instagram', 'LinkedIn', 'Facebook'],
        },
      ],
    },

    // ── Login page ───────────────────────────────────────────────────────────
    login: {
      title:          'ברוך הבא',
      subtitle:       'התחבר לניהול אתרי העסק שלך',
      googleBtn:      'המשך עם Google',
      signingIn:      'מתחבר…',
      terms:          'בהתחברות, אתה מסכים לתנאי השימוש ומדיניות הפרטיות שלנו.',
      noWebsite:      'אין לך אתר עדיין?',
      createFree:     'צור אחד בחינם',
      error:          'ההתחברות נכשלה. אנא נסה שוב.',
    },

    // ── Create page ──────────────────────────────────────────────────────────
    create: {
      backHome:       'חזרה לדף הבית',
      stepLabel:      'שלב 1 מתוך 5',
      title:          'איזה סוג עסק יש לך?',
      subtitle:       'בחר קטגוריה כדי לראות תבניות מתאימות',
      continueBtn:    'המשך',
      categories: {
        barbershop:  { name: 'ספרייה',              description: 'תספורות, עיצוב ושירותי טיפוח' },
        restaurant:  { name: 'מסעדה',               description: 'תפריט מלא, הזמנות ומשלוחים' },
        nail_salon:  { name: 'סטודיו ציפורניים',    description: 'מניקור, פדיקור ועיצוב ציפורניים' },
        gym:         { name: 'חדר כושר / כושר גופני', description: 'שיעורים, מאמנים ומנויים' },
        cafe:        { name: 'קפה',                  description: 'קפה, מאפים ואווירה נעימה' },
        photography: { name: 'צילום',                description: 'פורטרטים, אירועים וסטודיו' },
      },
    },

    // ── Dashboard ────────────────────────────────────────────────────────────
    dashboard: {
      title:          'האתרים שלך',
      loading:        'טוען…',
      empty:          'אין אתרים עדיין — צור את הראשון שלך!',
      published:      'אתרים פורסמו',
      publishedSingle:'אתר פורסם',
      newWebsite:     'אתר חדש',
      signOut:        'התנתק',
      editBtn:        'עריכה',
      viewBtn:        'צפה באתר ←',
      liveLabel:      'פעיל',
      draftLabel:     'טיוטה',
      publishedOn:    'פורסם',
      deleteTitle:    'למחוק את האתר?',
      deleteBody:     'יוסר לצמיתות. לא ניתן לבטל פעולה זו.',
      cancelBtn:      'ביטול',
      deleteBtn:      'מחק',
      deletingBtn:    'מוחק…',
      emptyTitle:     'בנה את האתר הראשון שלך',
      emptyDesc:      'בחר תבנית, מלא פרטי עסק, ועלה לאוויר בדקות.',
      emptyCreate:    '⚡ צור את האתר שלי',
    },

    // ── Editor nav ───────────────────────────────────────────────────────────
    editor: {
      backHome:       'חזרה',
      stepOf:         'שלב',
      of:             'מתוך',
      back:           'חזרה',
      next:           'הבא',
      reviewPublish:  'סקירה ופרסום',
      preview:        'תצוגה מקדימה',
      closePreview:   'סגור תצוגה מקדימה',
    },

    // ── Examples page ────────────────────────────────────────────────────────
    examples: {
      title:       'דוגמאות חיות',
      subtitle:    'ראה מה עסקים אמיתיים בנו עם SiteForge',
      allFilter:   'הכל',
      useThis:     'השתמש בזה ←',
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ENGLISH
  // ═══════════════════════════════════════════════════════════════════════════

  en: {
    // ── Navbar ──────────────────────────────────────────────────────────────
    nav: {
      features:  'Features',
      templates: 'Templates',
      pricing:   'Pricing',
      examples:  'Examples',
      cta:       'Get Started →',
      dashboard: 'My Dashboard →',
      signIn:    'Sign In →',
      signOut:   'Sign out',
      langToggle: '🇮🇱 עב',
    },

    // ── Hero ─────────────────────────────────────────────────────────────────
    hero: {
      badge:        'Now in public beta — free forever plan available',
      headline1:    'Your Business Deserves',
      headline2:    'a Beautiful Website',
      subheadline:  'Create a stunning website for your business in under 5 minutes. No coding. No designers. Just pick a template and go.',
      primaryCta:   'Get Started Free →',
      secondaryCta: 'View Examples',
      proof1:       '✓ Free forever plan',
      proof2:       '✓ No credit card required',
      proof3:       '✓ Live in 5 minutes',
      mockupServices: ['Haircut', 'Beard Trim', 'Full Service'],
      mockupPrices:   ['₪60', '₪40', '₪90'],
      mockupIcons:    ['✂️', '🪒', '💈'],
      mockupNav:      ['Services', 'Gallery', 'Book Now'],
      mockupTagline:  'Premium Cuts & Grooming',
      mockupSub:      'Est. 2010 · Tel Aviv · Walk-ins Welcome',
      mockupCta:      'Book an Appointment',
      mockupSection:  'Our Services',
    },

    // ── How It Works ─────────────────────────────────────────────────────────
    howItWorks: {
      label:    'Simple Process',
      title:    'How It',
      titleHighlight: 'Works',
      subtitle: 'Three steps from signup to a live website. No technical knowledge required.',
      steps: [
        {
          title: 'Choose a Template',
          description: 'Browse professionally designed templates tailored to your industry. From barbershops to restaurants — we have you covered.',
        },
        {
          title: 'Fill In Your Details',
          description: 'Add your business name, logo, photos, opening hours, and contact info. Our smart editor makes it effortless.',
        },
        {
          title: 'Go Live Instantly',
          description: 'Hit publish and your website is live with a shareable link in seconds. Share it on WhatsApp, Instagram, or Google Maps.',
        },
      ],
    },

    // ── Template Showcase ────────────────────────────────────────────────────
    templates: {
      label:    'Industry Templates',
      title:    'Templates For',
      titleHighlight: 'Every Business',
      subtitle: 'Professional designs tailored to your industry — ready to customize in minutes.',
      categories: [
        { name: 'Barbershop', count: '12 templates' },
        { name: 'Restaurant', count: '18 templates' },
        { name: 'Nail Salon', count: '10 templates' },
        { name: 'Gym & Fitness', count: '8 templates' },
        { name: 'Café', count: '14 templates' },
        { name: 'Photography', count: '11 templates' },
      ],
      previewBtn: 'Preview',
      seeAll:     'See All Templates',
    },

    // ── Testimonials ─────────────────────────────────────────────────────────
    testimonials: {
      label:    'Customer Stories',
      title:    'Loved by',
      titleHighlight: 'Business Owners',
      subtitle: 'Thousands of local businesses have already launched with SiteForge.',
      items: [
        {
          quote: "I had my website up in literally 10 minutes. My customers can now book online and find my hours instantly. SiteForge is a game-changer for a small business like mine.",
          name:  'Avi Cohen',
          biz:   "Cohen's Barbershop, Tel Aviv",
        },
        {
          quote: "We went from zero online presence to a beautiful website with a full menu and contact form. Our orders have increased by 30% since launching. Incredible value.",
          name:  'Maria Rossi',
          biz:   "Rossi's Pizzeria, Haifa",
        },
        {
          quote: "The templates are so professional — clients always compliment how modern my website looks. I never imagined I could have something this beautiful without hiring a developer.",
          name:  'Dana Levi',
          biz:   'DanaGlow Nail Studio, Jerusalem',
        },
      ],
      stats: [
        { value: '5,000+', label: 'Websites launched' },
        { value: '4.9/5',  label: 'Average rating' },
        { value: '98%',    label: 'Customer satisfaction' },
      ],
    },

    // ── Pricing ──────────────────────────────────────────────────────────────
    pricing: {
      label:          'Pricing',
      title:          'Simple,',
      titleHighlight: 'Honest Pricing',
      subtitle:       'No hidden fees. No surprise charges. Cancel anytime.',
      monthly:        'Monthly',
      yearly:         'Yearly',
      saveLabel:      'Save 20%',
      perMonth:       '/month',
      mostPopular:    'Most Popular',
      guarantee:      '🔒 14-day money-back guarantee · No contracts · Cancel anytime',
      seeFullPricing: 'See Full Pricing Details',
      plans: {
        starter: {
          tier: 'Starter',
          description: 'Perfect for getting started',
          cta: 'Get Started Free',
          features: ['1 website', 'SiteForge subdomain', 'Basic templates', 'Contact form', 'SSL certificate', 'Mobile responsive'],
          disabledFeatures: ['Custom domain', 'Remove branding', 'Analytics', 'Priority support'],
        },
        business: {
          tier: 'Business',
          description: 'Everything you need to grow',
          cta: 'Start 14-Day Free Trial',
          features: ['1 website', 'Custom domain', 'All 6 templates', 'Remove SiteForge branding', 'Analytics dashboard', 'Priority email support', 'SSL certificate', 'Mobile responsive'],
          disabledFeatures: [],
        },
        agency: {
          tier: 'Agency',
          description: 'For professionals managing multiple clients',
          cta: 'Contact Sales',
          features: ['10 websites', 'Custom domain per site', 'All 6 templates', 'White-label solution', 'Priority phone support', 'Dedicated account manager', 'Team collaboration', 'Advanced analytics'],
          disabledFeatures: [],
        },
      },
    },

    // ── Footer ───────────────────────────────────────────────────────────────
    footer: {
      tagline:    'The easiest way to get your business online. No code. No complexity.',
      copyright:  '© 2025 SiteForge. All rights reserved.',
      madeWith:   'Built with ❤️ for local businesses everywhere.',
      columns: [
        {
          heading: 'Product',
          links: ['Features', 'Templates', 'Pricing', 'Changelog'],
        },
        {
          heading: 'Company',
          links: ['About', 'Blog', 'Careers', 'Contact'],
        },
        {
          heading: 'Legal',
          links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'],
        },
        {
          heading: 'Social',
          links: ['Twitter / X', 'Instagram', 'LinkedIn', 'Facebook'],
        },
      ],
    },

    // ── Login page ───────────────────────────────────────────────────────────
    login: {
      title:          'Welcome back',
      subtitle:       'Sign in to manage your business websites',
      googleBtn:      'Continue with Google',
      signingIn:      'Signing in…',
      terms:          'By signing in, you agree to our Terms of Service and Privacy Policy.',
      noWebsite:      "Don't have a website yet?",
      createFree:     'Create one free',
      error:          'Sign in failed. Please try again.',
    },

    // ── Create page ──────────────────────────────────────────────────────────
    create: {
      backHome:       'Back to home',
      stepLabel:      'Step 1 of 5',
      title:          'What type of business do you have?',
      subtitle:       'Choose your category to see matching templates',
      continueBtn:    'Continue',
      categories: {
        barbershop:  { name: 'Barbershop',    description: 'Haircuts, styling & grooming' },
        restaurant:  { name: 'Restaurant',    description: 'Full menu, reservations & delivery' },
        nail_salon:  { name: 'Nail Salon',    description: 'Manicure, pedicure & nail art' },
        gym:         { name: 'Gym / Fitness', description: 'Classes, trainers & memberships' },
        cafe:        { name: 'Café',          description: 'Coffee, pastries & cozy atmosphere' },
        photography: { name: 'Photography',   description: 'Portraits, events & studios' },
      },
    },

    // ── Dashboard ────────────────────────────────────────────────────────────
    dashboard: {
      title:          'Your Websites',
      loading:        'Loading…',
      empty:          'No websites yet — create your first one!',
      published:      'websites published',
      publishedSingle:'website published',
      newWebsite:     'New Website',
      signOut:        'Sign out',
      editBtn:        'Edit',
      viewBtn:        'View Site →',
      liveLabel:      'Live',
      draftLabel:     'Draft',
      publishedOn:    'Published',
      deleteTitle:    'Delete website?',
      deleteBody:     'will be permanently removed. This cannot be undone.',
      cancelBtn:      'Cancel',
      deleteBtn:      'Delete',
      deletingBtn:    'Deleting…',
      emptyTitle:     'Build your first website',
      emptyDesc:      'Choose a template, fill in your business details, and go live in minutes.',
      emptyCreate:    '⚡ Create My Website',
    },

    // ── Editor nav ───────────────────────────────────────────────────────────
    editor: {
      backHome:       'Back to home',
      stepOf:         'Step',
      of:             'of',
      back:           'Back',
      next:           'Next',
      reviewPublish:  'Review & Publish',
      preview:        'Preview',
      closePreview:   'Close Preview',
    },

    // ── Examples page ────────────────────────────────────────────────────────
    examples: {
      title:       'Live Examples',
      subtitle:    'See what real businesses built with SiteForge',
      allFilter:   'All',
      useThis:     'Use This →',
    },
  },
} as const;

export type Translations = typeof t;
export type LangText = typeof t['en'];

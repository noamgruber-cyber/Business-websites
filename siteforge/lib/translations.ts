/**
 * SiteForge — Hebrew / English UI translations.
 * Usage: const { lang } = useLanguage(); const text = t[lang];
 */

export const t = {
  he: {
    // ── Navbar ──────────────────────────────────────────────────────────────
    nav: {
      features:    'תכונות',
      howItWorks:  'איך זה עובד',
      templates:   'תבניות',
      pricing:     'מחירים',
      examples:    'דוגמאות',
      blog:        'בלוג',
      about:       'אודות',
      contact:     'צור קשר',
      more:        'עוד',
      cta:         'צור אתר עכשיו ←',
      dashboard:   'הדשבורד שלי ←',
      signIn:      'התחברות ←',
      signOut:     'התנתק',
      langToggle:  '🇺🇸 EN',
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
          links: [
            { label: 'תכונות', href: '/#how-it-works' },
            { label: 'איך זה עובד', href: '/how-it-works' },
            { label: 'תבניות', href: '/#templates' },
            { label: 'מחירים', href: '/pricing' },
            { label: 'בלוג', href: '/blog' },
          ],
        },
        {
          heading: 'חברה',
          links: [
            { label: 'דוגמאות', href: '/examples' },
            { label: 'בלוג', href: '/blog' },
            { label: 'קריירה', href: '#' },
            { label: 'צור קשר', href: '#' },
          ],
        },
        {
          heading: 'משפטי',
          links: [
            { label: 'מדיניות פרטיות', href: '#' },
            { label: 'תנאי שימוש', href: '#' },
            { label: 'מדיניות עוגיות', href: '#' },
            { label: 'GDPR', href: '#' },
          ],
        },
        {
          heading: 'רשתות חברתיות',
          links: [
            { label: 'Twitter / X', href: '#' },
            { label: 'Instagram', href: '#' },
            { label: 'LinkedIn', href: '#' },
            { label: 'Facebook', href: '#' },
          ],
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

    // ── About page ───────────────────────────────────────────────────────────
    about: {
      badge:        '👋 הסיפור שלנו',
      headline:     'בנינו את SiteForge כי עסקים קטנים מגיעים ליותר',
      subheadline:  'כל ספרייה, מסעדה וסטודיו ציפורניים מגיע לנוכחות מקוונת יפה — לא רק אלה שיכולים להרשות לעצמם מעצב אתרים.',
      storyTitle:   'למה בנינו את זה',
      p1: 'ראינו שוב ושוב את אותו הדבר. עסקים מקומיים מדהימים — ספרייה משפחתית פתוחה 20 שנה, מסעדה עם האוכל הכי טוב בשכונה, סטודיו ציפורניים עם מוניטין של 5 כוכבים — ללא נוכחות מקוונת בכלל. כשאלנו למה, התשובה הייתה תמיד אותה: "זה יקר מדי" או "אני לא מבין טכנולוגיה."',
      p2: 'הבנו שבוני אתרים קיימים לא מיועדים עבורם. הם מסובכים, באנגלית, דורשים מנוי חודשי, ולא מבינים מה ספרייה ישראלית באמת צריכה באתר שלה. אז בנינו משהו שכן.',
      p3: 'SiteForge קיים מסיבה אחת: לוודא שכל עסק קטן בישראל — לא משנה כמה קטן, לא משנה כמה בעל העסק מבין טכנולוגיה — יכול לקבל אתר מקצועי ויפה. בחינם. בעברית. תוך 5 דקות.',
      pullQuote:    'כל עסק מגיע להימצא ברשת.',
      valuesTitle:  'על מה אנחנו עומדים',
      values: [
        { icon: '🇮🇱', title: 'נבנה לישראל', desc: 'אנחנו לא מוצר גלובלי גנרי. אנחנו נבנינו ספציפית לעסקים קטנים בישראל — עברית ראשונה, מחירים ישראלים, תרבות עסקית ישראלית.' },
        { icon: '⚡', title: 'פשטות מעל הכל', desc: 'כל תכונה שאנחנו מוסיפים עוברת מבחן אחד: האם בעל ספרייה בן 60 יכול להשתמש בזה ללא עזרה? אם לא, אנחנו מפשטים.' },
        { icon: '💚', title: 'חינם ראשון, תמיד', desc: 'אנחנו מאמינים שהכניסה לרשת לא צריכה לעלות כסף. התוכנית החינמית אינה טריק לגרום לך לשדרג — זה אתר אמיתי ועובד, חינם לנצח.' },
        { icon: '🔒', title: 'הנתונים שלך, העסק שלך', desc: 'אנחנו לא מוכרים את הנתונים שלך. אנחנו לא מציגים מודעות. הלקוחות שלך מגיעים לאתר שלך — לא לשוק שבו מתחרים יכולים לפרסם לצידך.' },
      ],
      teamTitle:    'האנשים מאחורי SiteForge',
      team: [
        { nameHe: 'נועם לוי', nameEn: 'Noam Levi', role: 'מייסד ומנכ"ל', bio: 'מהנדס תוכנה לשעבר שנמאס לו לראות את המסעדה של משפחתו נאבקת ללא אתר. בנה את הגרסה הראשונה של SiteForge בסוף שבוע.', fact: '☕ פועל על 4 קפה ביום', initials: 'נ.ל', color: 'from-purple-500 to-blue-600' },
        { nameHe: 'מיכל אברהם', nameEn: 'Michal Avraham', role: 'ראש עיצוב', bio: 'מעצבת UI/UX עם 8 שנות ניסיון בבניית מוצרים שאנשים אמיתיים באמת משתמשים בהם. אובססיבית לגרום לכל פיקסל להיות מושלם.', fact: '💅 בודקת כל תבנית סטודיו ציפורניים אישית', initials: 'מ.א', color: 'from-pink-500 to-rose-600' },
        { nameHe: 'יונתן כץ', nameEn: 'Yonatan Katz', role: 'ראש צמיחה', bio: 'בילה 5 שנים בסיוע לעסקים קטנים בתל אביב לגדל את בסיס הלקוחות שלהם. עכשיו עוזר להם להגיע לרשת קודם.', fact: '🍕 אכל בכל מסעדה ב-SiteForge', initials: 'י.כ', color: 'from-amber-500 to-orange-600' },
      ],
      statsTitle:   'SiteForge היום',
      stats: [
        { value: '500+', label: 'עסקים ב-SiteForge' },
        { value: '6',    label: 'קטגוריות תבניות' },
        { value: '₪0',  label: 'עלות ממוצעת להתחיל' },
        { value: '4.9★', label: 'דירוג ממוצע משתמשים' },
      ],
      pressTitle:   'כפי שהופיע ב',
      pressItems:   ['TheMarker', 'Calcalist', 'Geektime', 'Walla Tech', 'Ynet'],
      pressCaption: 'אנחנו רק מתחילים 🚀',
      ctaHeadline:  'רוצה להיות חלק מהסיפור?',
      ctaSubline:   'הצטרף למאות בעלי עסקים ישראלים שכבר מקוונים.',
      ctaBtn:       'צור את האתר החינמי שלך →',
      ctaContact:   'או צור איתנו קשר →',
    },

    // ── Contact page ─────────────────────────────────────────────────────────
    contact: {
      badge:          '💬 צור קשר',
      headline:       'נשמח לשמוע ממך',
      subheadline:    'בין אם יש לך שאלה, בקשה לתכונה, או סתם רצון להגיד שלום — אנחנו קוראים כל הודעה.',
      optionCards: [
        { icon: '💬', title: 'שוחח איתנו', desc: 'לשאלות כלליות על SiteForge', action: 'שלח הודעה ↓', time: 'בדרך כלל תוך 24 שעות' },
        { icon: '📱', title: 'תמיכת WhatsApp', desc: 'לעזרה דחופה עם האתר שלך', action: 'פתח WhatsApp →', time: 'בדרך כלל תוך 2 שעות' },
        { icon: '🤝', title: 'שותפויות ועיתונות', desc: 'לסוכנויות, שותפויות ומדיה', action: 'שלח אימייל →', time: 'תוך 1-2 ימי עסקים' },
      ],
      formTitle:      'שלח לנו הודעה',
      namePlaceholder: 'שם מלא',
      emailPlaceholder: 'כתובת אימייל',
      subjectLabel:   'נושא',
      subjectOptions: ['שאלה כללית', 'בעיה טכנית', 'בקשת תכונה', 'שותפות עסקית', 'פנייה מהעיתונות', 'אחר'],
      messagePlaceholder: 'ההודעה שלך...',
      submitBtn:      'שלח הודעה →',
      sending:        'שולח…',
      successTitle:   'ההודעה נשלחה! ✓',
      successMsg:     'תודה {name}! נחזור אליך בכתובת {email} תוך 24 שעות.',
      successReset:   'שלח הודעה נוספת',
      locationTitle:  'מצא אותנו',
      address:        'תל אביב, ישראל 🇮🇱',
      hours:          'א׳–ה׳: 09:00–18:00',
      email:          'hello@siteforge.co.il',
    },

    // ── Footer ───────────────────────────────────────────────────────────────
    footerNew: {
      newsletter: {
        heading: 'הישאר מעודכן 📬',
        desc:    'טיפים לצמיחת העסק שלך ברשת. ללא ספאם, לעולם.',
        placeholder: 'האימייל שלך',
        btn:     'הירשם',
        success: '✓ נרשמת!',
      },
      tagline:    'הדרך הקלה ביותר לעסקים קטנים ישראלים להגיע לרשת.',
      madeIn:     '🇮🇱 נוצר בישראל',
      copyright:  '© 2025 SiteForge Ltd. כל הזכויות שמורות.',
      builtWith:  'נבנה עם ❤️ בתל אביב',
      columns: [
        {
          heading: 'מוצר',
          links: [
            { label: 'תכונות', href: '/#how-it-works' },
            { label: 'איך זה עובד', href: '/how-it-works' },
            { label: 'תבניות', href: '/#templates' },
            { label: 'מחירים', href: '/pricing' },
            { label: 'דוגמאות', href: '/examples' },
            { label: 'יומן שינויים', href: '#' },
          ],
        },
        {
          heading: 'משאבים',
          links: [
            { label: 'בלוג', href: '/blog' },
            { label: 'מרכז עזרה', href: '#' },
            { label: 'מדריכי וידאו', href: '#' },
            { label: 'מסמכי API', href: '#' },
            { label: 'דף סטטוס', href: '#' },
          ],
        },
        {
          heading: 'חברה',
          links: [
            { label: 'אודות', href: '/about' },
            { label: 'קריירה', href: '#', badge: 'מגייסים! 🔥' },
            { label: 'עיתונות', href: '#' },
            { label: 'צור קשר', href: '/contact' },
            { label: 'שותפים', href: '#' },
          ],
        },
        {
          heading: 'משפטי',
          links: [
            { label: 'מדיניות פרטיות', href: '#' },
            { label: 'תנאי שימוש', href: '#' },
            { label: 'מדיניות עוגיות', href: '#' },
            { label: 'GDPR', href: '#' },
          ],
        },
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ENGLISH
  // ═══════════════════════════════════════════════════════════════════════════

  en: {
    // ── Navbar ──────────────────────────────────────────────────────────────
    nav: {
      features:   'Features',
      howItWorks: 'How It Works',
      templates:  'Templates',
      pricing:    'Pricing',
      examples:   'Examples',
      blog:       'Blog',
      about:      'About',
      contact:    'Contact',
      more:       'More',
      cta:        'Get Started →',
      dashboard:  'My Dashboard →',
      signIn:     'Sign In →',
      signOut:    'Sign out',
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
          links: [
            { label: 'Features', href: '/#how-it-works' },
            { label: 'How It Works', href: '/how-it-works' },
            { label: 'Templates', href: '/#templates' },
            { label: 'Pricing', href: '/pricing' },
            { label: 'Blog', href: '/blog' },
          ],
        },
        {
          heading: 'Company',
          links: [
            { label: 'Examples', href: '/examples' },
            { label: 'Blog', href: '/blog' },
            { label: 'Careers', href: '#' },
            { label: 'Contact', href: '#' },
          ],
        },
        {
          heading: 'Legal',
          links: [
            { label: 'Privacy Policy', href: '#' },
            { label: 'Terms of Service', href: '#' },
            { label: 'Cookie Policy', href: '#' },
            { label: 'GDPR', href: '#' },
          ],
        },
        {
          heading: 'Social',
          links: [
            { label: 'Twitter / X', href: '#' },
            { label: 'Instagram', href: '#' },
            { label: 'LinkedIn', href: '#' },
            { label: 'Facebook', href: '#' },
          ],
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

    // ── About page ───────────────────────────────────────────────────────────
    about: {
      badge:        '👋 Our Story',
      headline:     'We Built SiteForge Because Small Businesses Deserve Better',
      subheadline:  "Every barbershop, restaurant, and nail salon deserves a beautiful online presence — not just the ones that can afford a web designer.",
      storyTitle:   'Why We Built This',
      p1: "We kept seeing the same thing over and over. Amazing local businesses — a family barbershop that's been open for 20 years, a restaurant with the best food in the neighborhood, a nail salon with a 5-star reputation — with no online presence at all. When we asked why, the answer was always the same: 'It's too expensive' or 'I don't understand technology.'",
      p2: "We realized that existing website builders weren't designed for them. They're complicated, in English, require monthly subscriptions, and don't understand what an Israeli barbershop actually needs on its website. So we built something that does.",
      p3: "SiteForge exists for one reason: to make sure that every small business in Israel — no matter how small, no matter how tech-savvy the owner — can have a professional, beautiful website. For free. In Hebrew. In 5 minutes.",
      pullQuote:    'Every business deserves to be found online.',
      valuesTitle:  'What We Stand For',
      values: [
        { icon: '🇮🇱', title: 'Built for Israel', desc: "We're not a generic global product. We're built specifically for Israeli small businesses — Hebrew first, Israeli prices, Israeli business culture." },
        { icon: '⚡', title: 'Simplicity Above All', desc: "Every feature we add goes through one test: can a 60-year-old barbershop owner use this without any help? If not, we simplify it." },
        { icon: '💚', title: 'Free First, Always', desc: "We believe getting online shouldn't cost money. The free plan isn't a trick to get you to upgrade — it's a real, working website, forever free." },
        { icon: '🔒', title: 'Your Data, Your Business', desc: "We never sell your data. We never show ads. Your customers come to YOUR website — not a marketplace where competitors can advertise next to you." },
      ],
      teamTitle:    'The People Behind SiteForge',
      team: [
        { nameHe: 'נועם לוי', nameEn: 'Noam Levi', role: 'Founder & CEO', bio: "Former software engineer who got tired of watching his family's restaurant struggle without a website. Built the first version of SiteForge in a weekend.", fact: '☕ Runs on 4 coffees a day', initials: 'NL', color: 'from-purple-500 to-blue-600' },
        { nameHe: 'מיכל אברהם', nameEn: 'Michal Avraham', role: 'Head of Design', bio: 'UI/UX designer with 8 years of experience building products that real people actually use. Obsessed with making every pixel perfect.', fact: '💅 Tests every nail salon template personally', initials: 'MA', color: 'from-pink-500 to-rose-600' },
        { nameHe: 'יונתן כץ', nameEn: 'Yonatan Katz', role: 'Head of Growth', bio: 'Spent 5 years helping small businesses in Tel Aviv grow their customer base. Now helping them get online first.', fact: '🍕 Has eaten at every restaurant on SiteForge', initials: 'YK', color: 'from-amber-500 to-orange-600' },
      ],
      statsTitle:   'SiteForge Today',
      stats: [
        { value: '500+', label: 'Businesses on SiteForge' },
        { value: '6',    label: 'Template categories' },
        { value: '₪0',  label: 'Average cost to get started' },
        { value: '4.9★', label: 'Average user rating' },
      ],
      pressTitle:   'As Featured In',
      pressItems:   ['TheMarker', 'Calcalist', 'Geektime', 'Walla Tech', 'Ynet'],
      pressCaption: "We're just getting started 🚀",
      ctaHeadline:  'Want to be part of the story?',
      ctaSubline:   'Join hundreds of Israeli business owners who are already online.',
      ctaBtn:       'Create Your Free Website →',
      ctaContact:   'Or reach out to us →',
    },

    // ── Contact page ─────────────────────────────────────────────────────────
    contact: {
      badge:          '💬 Get In Touch',
      headline:       "We'd Love to Hear From You",
      subheadline:    'Whether you have a question, a feature request, or just want to say hi — we read every message.',
      optionCards: [
        { icon: '💬', title: 'Chat With Us', desc: 'For general questions about SiteForge', action: 'Send a Message ↓', time: 'Usually within 24 hours' },
        { icon: '📱', title: 'WhatsApp Support', desc: 'For urgent help with your website', action: 'Open WhatsApp →', time: 'Usually within 2 hours' },
        { icon: '🤝', title: 'Partnerships & Press', desc: 'For agencies, partnerships, and media', action: 'Email Us →', time: 'Within 1-2 business days' },
      ],
      formTitle:      'Send Us a Message',
      namePlaceholder: 'Full Name',
      emailPlaceholder: 'Email Address',
      subjectLabel:   'Subject',
      subjectOptions: ['General Question', 'Technical Issue', 'Feature Request', 'Business Partnership', 'Press Inquiry', 'Other'],
      messagePlaceholder: 'Your message...',
      submitBtn:      'Send Message →',
      sending:        'Sending…',
      successTitle:   'Message Sent! ✓',
      successMsg:     "Thanks {name}! We'll get back to you at {email} within 24 hours.",
      successReset:   'Send another message',
      locationTitle:  'Find Us',
      address:        'Tel Aviv, Israel 🇮🇱',
      hours:          'Sun–Thu: 9:00–18:00',
      email:          'hello@siteforge.co.il',
    },

    // ── Footer (new complete structure) ──────────────────────────────────────
    footerNew: {
      newsletter: {
        heading: 'Stay in the loop 📬',
        desc:    'Get tips for growing your business online. No spam, ever.',
        placeholder: 'Your email',
        btn:     'Subscribe',
        success: '✓ You\'re in!',
      },
      tagline:    'The easiest way for Israeli small businesses to get online.',
      madeIn:     '🇮🇱 Made in Israel',
      copyright:  '© 2025 SiteForge Ltd. All rights reserved.',
      builtWith:  'Built with ❤️ in Tel Aviv',
      columns: [
        {
          heading: 'מוצר / Product',
          links: [
            { label: 'Features', href: '/#how-it-works' },
            { label: 'How It Works', href: '/how-it-works' },
            { label: 'Templates', href: '/#templates' },
            { label: 'Pricing', href: '/pricing' },
            { label: 'Examples', href: '/examples' },
            { label: 'Changelog', href: '#' },
          ],
        },
        {
          heading: 'משאבים / Resources',
          links: [
            { label: 'Blog', href: '/blog' },
            { label: 'Help Center', href: '#' },
            { label: 'Video Tutorials', href: '#' },
            { label: 'API Docs', href: '#' },
            { label: 'Status Page', href: '#' },
          ],
        },
        {
          heading: 'חברה / Company',
          links: [
            { label: 'About', href: '/about' },
            { label: 'Careers', href: '#', badge: "We're hiring! 🔥" },
            { label: 'Press', href: '#' },
            { label: 'Contact', href: '/contact' },
            { label: 'Partners', href: '#' },
          ],
        },
        {
          heading: 'משפטי / Legal',
          links: [
            { label: 'Privacy Policy', href: '#' },
            { label: 'Terms of Service', href: '#' },
            { label: 'Cookie Policy', href: '#' },
            { label: 'GDPR', href: '#' },
          ],
        },
      ],
    },
  },
} as const;

export type Translations = typeof t;
export type LangText = typeof t['en'];

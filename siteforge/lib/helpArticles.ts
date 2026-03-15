export type HelpArticle = {
  slug: string;
  title: string;
  titleHe: string;
  content: string;
  contentHe: string;
  category: 'getting-started' | 'editor' | 'templates' | 'account' | 'billing' | 'technical';
  helpful: number;
  views: number;
};

export const CATEGORY_META: Record<
  HelpArticle['category'],
  { icon: string; label: string; labelHe: string }
> = {
  'getting-started': { icon: '🚀', label: 'Getting Started', labelHe: 'מתחילים' },
  'editor':          { icon: '✏️', label: 'Editor',          labelHe: 'עורך' },
  'templates':       { icon: '🎨', label: 'Templates',       labelHe: 'תבניות' },
  'account':         { icon: '👤', label: 'Account',         labelHe: 'חשבון' },
  'billing':         { icon: '💳', label: 'Billing',         labelHe: 'תשלום' },
  'technical':       { icon: '🔧', label: 'Technical',       labelHe: 'טכני' },
};

export const helpArticles: HelpArticle[] = [
  // ── Getting Started ──────────────────────────────────────────────────────────
  {
    slug: 'create-your-first-website',
    title: 'How to Create Your First Website',
    titleHe: 'כיצד ליצור את האתר הראשון שלך',
    category: 'getting-started',
    helpful: 312,
    views: 4820,
    content: `
<h2>Getting Started with SiteForge</h2>
<p>Creating your first business website with SiteForge takes less than 5 minutes. You don't need any technical knowledge — just follow these steps.</p>

<h2>Step 1: Sign In</h2>
<p>Click the <strong>Sign In</strong> button in the top right corner. We use Google Sign-In, so you just need your Google account — no separate password to remember.</p>

<div class="tip">💡 <strong>Tip:</strong> Use the same Google account you use for Gmail — it's the easiest way to keep everything connected.</div>

<h2>Step 2: Choose Your Business Category</h2>
<p>After signing in, click <strong>Get Started Free</strong>. You'll see 6 business categories:</p>
<ul>
  <li>💈 <strong>Barbershop</strong> — for hair salons and grooming services</li>
  <li>🍕 <strong>Restaurant</strong> — for restaurants, diners, and takeout</li>
  <li>💅 <strong>Nail Salon</strong> — for nail studios and beauty salons</li>
  <li>🏋️ <strong>Gym / Fitness</strong> — for gyms, yoga studios, and trainers</li>
  <li>☕ <strong>Café</strong> — for coffee shops and bakeries</li>
  <li>📸 <strong>Photography</strong> — for photographers and studios</li>
</ul>
<p>Select the one that best matches your business and click <strong>Continue</strong>.</p>

<h2>Step 3: Fill in Your Business Details</h2>
<p>The editor walks you through 5 steps:</p>
<ol>
  <li><strong>Basic Info</strong> — your business name, tagline, and description</li>
  <li><strong>Photos</strong> — your cover photo, logo, and gallery images</li>
  <li><strong>Services & Prices</strong> — what you offer and how much it costs</li>
  <li><strong>Opening Hours & Contact</strong> — when you're open, your phone, WhatsApp, and address</li>
  <li><strong>Review & Publish</strong> — preview your site and go live</li>
</ol>

<h2>Step 4: Preview Your Website</h2>
<p>Before publishing, you can preview exactly how your website will look on mobile and desktop. Click the <strong>Preview</strong> button at any time to see the live preview.</p>

<h2>Step 5: Publish</h2>
<p>When you're happy with how it looks, click <strong>Publish Website</strong>. Your site will be live at <code>siteforge.com/b/your-business-name</code> within seconds.</p>

<div class="tip">💡 <strong>Tip:</strong> After publishing, share your link in your WhatsApp status — it's the fastest way to reach all your existing customers at once.</div>
    `,
    contentHe: `
<h2>מתחילים עם SiteForge</h2>
<p>יצירת אתר עסקי ראשון עם SiteForge לוקחת פחות מ-5 דקות. אינך צריך שום ידע טכני — פשוט עקוב אחר השלבים הבאים.</p>

<h2>שלב 1: כניסה לחשבון</h2>
<p>לחץ על הכפתור <strong>התחברות</strong> בפינה הימנית העליונה. אנחנו משתמשים בכניסה עם Google, אז אתה זקוק רק לחשבון Google שלך — אין צורך לזכור סיסמה נפרדת.</p>

<h2>שלב 2: בחר קטגוריית עסק</h2>
<p>לאחר הכניסה, לחץ על <strong>צור אתר חינם</strong>. תראה 6 קטגוריות עסקיות. בחר את זו שמתאימה ביותר לעסק שלך ולחץ <strong>המשך</strong>.</p>

<h2>שלב 3: מלא פרטי עסק</h2>
<p>העורך מוביל אותך דרך 5 שלבים: פרטים בסיסיים, תמונות, שירותים ומחירים, שעות פעילות ויצירת קשר, וסקירה ופרסום.</p>

<h2>שלב 4: פרסם</h2>
<p>כשאתה מרוצה מהמראה, לחץ <strong>פרסם אתר</strong>. האתר שלך יהיה חי תוך שניות.</p>
    `,
  },

  {
    slug: 'what-is-siteforge',
    title: 'What is SiteForge and How Does It Work?',
    titleHe: 'מה זה SiteForge ואיך זה עובד?',
    category: 'getting-started',
    helpful: 198,
    views: 3210,
    content: `
<h2>What is SiteForge?</h2>
<p>SiteForge is a website builder specifically designed for small businesses in Israel. We built it because existing website builders are too complicated, too expensive, and not designed with Israeli businesses in mind.</p>

<h2>Who is it for?</h2>
<p>SiteForge is perfect for:</p>
<ul>
  <li>Barbershops and hair salons</li>
  <li>Restaurants and cafés</li>
  <li>Nail salons and beauty studios</li>
  <li>Gyms and fitness studios</li>
  <li>Photographers and studios</li>
  <li>Any local business that needs a professional online presence</li>
</ul>

<h2>How Does It Work?</h2>
<p>SiteForge uses pre-designed templates for each business category. You fill in your specific details — name, photos, services, prices, hours — and we generate a beautiful, professional website that's ready to share.</p>

<h2>What Do You Get for Free?</h2>
<p>The free plan includes everything you need to get online:</p>
<ul>
  <li>✓ A professional website with your own URL</li>
  <li>✓ Full mobile-responsive design</li>
  <li>✓ Your services and prices listed</li>
  <li>✓ Opening hours and contact information</li>
  <li>✓ WhatsApp and Instagram integration</li>
  <li>✓ No ads on your website</li>
</ul>

<div class="tip">💡 <strong>Good to know:</strong> The free plan is genuinely free — no credit card required and no time limit. You can upgrade later for additional features.</div>
    `,
    contentHe: `
<h2>מה זה SiteForge?</h2>
<p>SiteForge הוא בונה אתרים שתוכנן במיוחד לעסקים קטנים בישראל. בנינו אותו כי בוני אתרים קיימים מסובכים מדי, יקרים מדי ולא מיועדים לעסקים ישראלים.</p>

<h2>למי זה מיועד?</h2>
<p>SiteForge מושלם לספריות, מסעדות, סטודיו ציפורניים, חדרי כושר, צלמים — כל עסק מקומי שצריך נוכחות מקצועית ברשת.</p>

<h2>מה מקבלים בחינם?</h2>
<p>התוכנית החינמית כוללת: אתר מקצועי עם URL משלך, עיצוב מותאם מובייל, שירותים ומחירים, שעות פעילות ויצירת קשר, ואינטגרציה עם WhatsApp ואינסטגרם.</p>
    `,
  },

  // ── Editor ───────────────────────────────────────────────────────────────────
  {
    slug: 'add-services-and-prices',
    title: 'How to Add Your Services and Prices',
    titleHe: 'כיצד להוסיף שירותים ומחירים',
    category: 'editor',
    helpful: 267,
    views: 3890,
    content: `
<h2>Adding Services in Step 3</h2>
<p>Services and prices are one of the most important parts of your website — they tell potential customers exactly what you offer and how much it costs.</p>

<h2>How to Add a Service</h2>
<ol>
  <li>In the editor, navigate to <strong>Step 3: Services & Prices</strong></li>
  <li>Click the <strong>+ Add Service</strong> button</li>
  <li>Fill in the service name (e.g., "Haircut")</li>
  <li>Add the price (e.g., "₪60")</li>
  <li>Optionally add a short description (e.g., "Includes wash and dry")</li>
  <li>Click <strong>Save</strong></li>
</ol>

<h2>Editing an Existing Service</h2>
<p>Click on any service card to edit it inline. Changes are saved automatically as you type.</p>

<h2>Removing a Service</h2>
<p>Click the <strong>×</strong> button on any service card to remove it. Don't worry — you'll see a confirmation before it's deleted.</p>

<h2>Best Practices</h2>
<ul>
  <li><strong>Be specific with names</strong> — "Men's Haircut" is better than just "Haircut"</li>
  <li><strong>Include clear prices</strong> — customers decide faster when they see prices upfront</li>
  <li><strong>Add descriptions</strong> — a one-line description can explain what's included</li>
  <li><strong>List your most popular services first</strong> — they'll appear at the top</li>
</ul>

<div class="tip">💡 <strong>Tip:</strong> Aim for 4–8 services. Too many options can overwhelm customers. Focus on your most popular offerings.</div>
    `,
    contentHe: `
<h2>הוספת שירותים בשלב 3</h2>
<p>שירותים ומחירים הם אחד החלקים החשובים ביותר באתר שלך — הם מספרים ללקוחות פוטנציאלים בדיוק מה אתה מציע וכמה זה עולה.</p>

<h2>כיצד להוסיף שירות</h2>
<ol>
  <li>בעורך, נווט ל<strong>שלב 3: שירותים ומחירים</strong></li>
  <li>לחץ על הכפתור <strong>+ הוסף שירות</strong></li>
  <li>מלא את שם השירות, מחיר ותיאור אופציונלי</li>
  <li>לחץ <strong>שמור</strong></li>
</ol>

<h2>עצות לשיטות עבודה</h2>
<p>היה ספציפי עם השמות, כלול מחירים ברורים והוסף תיאורים קצרים. כוון ל-4–8 שירותים — יותר מדי אפשרויות יכולות להציף לקוחות.</p>
    `,
  },

  {
    slug: 'upload-photos',
    title: 'How to Upload Photos to Your Website',
    titleHe: 'כיצד להעלות תמונות לאתר שלך',
    category: 'editor',
    helpful: 224,
    views: 3470,
    content: `
<h2>Photos Make a Huge Difference</h2>
<p>Websites with great photos get significantly more engagement than those without. Here's how to set up photos in SiteForge.</p>

<h2>Cover Photo</h2>
<p>The cover photo is the large hero image at the top of your website. It's the first thing visitors see.</p>
<ul>
  <li><strong>Recommended size:</strong> at least 1280×720 pixels (landscape)</li>
  <li><strong>Best content:</strong> your shop front, your workspace, or your best work</li>
  <li><strong>File types:</strong> JPG, PNG, WebP (max 5MB)</li>
</ul>

<h2>Logo</h2>
<p>Upload your business logo if you have one. It appears in the navigation bar and footer.</p>
<ul>
  <li><strong>Recommended size:</strong> square, at least 200×200 pixels</li>
  <li><strong>Background:</strong> transparent PNG works best</li>
</ul>

<h2>Gallery Photos</h2>
<p>You can upload up to 6 gallery photos. These showcase your work, products, or space.</p>
<ul>
  <li>For barbershops: before/after haircut photos</li>
  <li>For restaurants: photos of your dishes</li>
  <li>For nail salons: nail art portfolio</li>
  <li>For gyms: equipment and classes</li>
</ul>

<h2>Tips for Great Photos</h2>
<ul>
  <li>Take photos in natural light (near a window)</li>
  <li>Clean your space before photographing</li>
  <li>Use your phone's portrait mode for close-up shots</li>
  <li>Horizontal (landscape) photos look better on websites</li>
</ul>

<div class="tip">💡 <strong>No professional photos?</strong> That's OK — a well-lit photo from your phone looks great on most devices. You can always update photos later.</div>
    `,
    contentHe: `
<h2>תמונות עושות הבדל עצום</h2>
<p>אתרים עם תמונות טובות מקבלים מעורבות גבוהה בהרבה. הנה כיצד להגדיר תמונות ב-SiteForge.</p>

<h2>תמונת כריכה</h2>
<p>תמונת הכריכה היא תמונת הגיבור הגדולה בחלק העליון של האתר. גודל מומלץ: לפחות 1280×720 פיקסלים (לרוחב). סוגי קבצים: JPG, PNG, WebP (מקסימום 5MB).</p>

<h2>לוגו</h2>
<p>העלה את הלוגו של העסק שלך אם יש לך כזה. PNG עם רקע שקוף עובד הכי טוב.</p>

<h2>גלריית תמונות</h2>
<p>ניתן להעלות עד 6 תמונות לגלריה. תמונות אופקיות נראות טוב יותר באתרים.</p>
    `,
  },

  {
    slug: 'edit-opening-hours',
    title: 'How to Set and Edit Your Opening Hours',
    titleHe: 'כיצד להגדיר ולערוך שעות פעילות',
    category: 'editor',
    helpful: 183,
    views: 2760,
    content: `
<h2>Setting Opening Hours</h2>
<p>Opening hours appear prominently on your website and help customers know when to visit or call.</p>

<h2>How to Set Hours</h2>
<ol>
  <li>In the editor, go to <strong>Step 4: Contact & Hours</strong></li>
  <li>For each day, enter your opening and closing time</li>
  <li>Format: <code>09:00-18:00</code> (24-hour format works best)</li>
  <li>For days you're closed, type <code>closed</code> or leave it empty</li>
</ol>

<h2>Days of the Week</h2>
<p>SiteForge supports all 7 days. In Israel, most businesses are closed on Saturday (Shabbat) — just type "closed" for Saturday and it will show in red on your site.</p>

<h2>Example Hours</h2>
<ul>
  <li>Sunday: 09:00-19:00</li>
  <li>Monday: 09:00-19:00</li>
  <li>Tuesday: 09:00-19:00</li>
  <li>Wednesday: 09:00-19:00</li>
  <li>Thursday: 09:00-19:00</li>
  <li>Friday: 09:00-14:00</li>
  <li>Saturday: closed</li>
</ul>

<h2>Holiday Hours</h2>
<p>For special holidays or irregular hours, update your opening hours in the editor and republish. Changes go live immediately.</p>

<div class="tip">💡 <strong>Tip:</strong> Accurate hours reduce "wasted trips" — customers who arrive to find you closed won't come back. Keep your hours up to date.</div>
    `,
    contentHe: `
<h2>הגדרת שעות פעילות</h2>
<p>שעות הפעילות מוצגות באופן בולט באתר שלך ועוזרות ללקוחות לדעת מתי לבקר או להתקשר.</p>

<h2>כיצד להגדיר שעות</h2>
<ol>
  <li>בעורך, עבור ל<strong>שלב 4: יצירת קשר ושעות</strong></li>
  <li>לכל יום, הזן שעת פתיחה וסגירה</li>
  <li>פורמט: <code>09:00-18:00</code></li>
  <li>לימים שאתה סגור, הקלד <code>closed</code> או השאר ריק</li>
</ol>

<p>לשבת, הקלד "closed" והיא תוצג באדום באתר שלך.</p>
    `,
  },

  // ── Templates ────────────────────────────────────────────────────────────────
  {
    slug: 'choose-the-right-template',
    title: 'Which Template Should I Choose?',
    titleHe: 'איזו תבנית עלי לבחור?',
    category: 'templates',
    helpful: 241,
    views: 4100,
    content: `
<h2>Choosing the Right Template</h2>
<p>SiteForge has 6 templates, each designed specifically for a business type. Here's a guide to choosing the right one.</p>

<h2>💈 Barbershop</h2>
<p><strong>Best for:</strong> Barbershops, hair salons, men's grooming, unisex salons</p>
<p><strong>Design style:</strong> Dark, bold, masculine — black background with gold accents</p>
<p><strong>Key sections:</strong> Services & prices, photo gallery, booking via WhatsApp, opening hours</p>

<h2>🍕 Restaurant</h2>
<p><strong>Best for:</strong> Restaurants, diners, fast food, delivery services, food trucks</p>
<p><strong>Design style:</strong> Warm, appetizing — dark background with red accents</p>
<p><strong>Key sections:</strong> Full menu with categories, gallery, table reservation via WhatsApp/phone</p>

<h2>💅 Nail Salon</h2>
<p><strong>Best for:</strong> Nail studios, manicure/pedicure salons, beauty studios</p>
<p><strong>Design style:</strong> Elegant, feminine — light pink and white with rose accents</p>
<p><strong>Key sections:</strong> Services & prices, gallery portfolio, booking via WhatsApp or phone</p>

<h2>🏋️ Gym / Fitness</h2>
<p><strong>Best for:</strong> Gyms, fitness centers, yoga studios, personal trainers, CrossFit boxes</p>
<p><strong>Design style:</strong> Bold, energetic — dark background with orange accents</p>
<p><strong>Key sections:</strong> Class schedule, services, gallery, join/contact via WhatsApp</p>

<h2>☕ Café</h2>
<p><strong>Best for:</strong> Coffee shops, bakeries, tea rooms, breakfast spots</p>
<p><strong>Design style:</strong> Warm, cozy — dark brown background with caramel accents</p>
<p><strong>Key sections:</strong> Menu items, gallery, Instagram integration, location & hours</p>

<h2>📸 Photography</h2>
<p><strong>Best for:</strong> Photographers, photo studios, videographers, creative professionals</p>
<p><strong>Design style:</strong> Minimal, clean — pure black background, full-width portfolio</p>
<p><strong>Key sections:</strong> Portfolio gallery, packages & pricing, contact info</p>

<div class="tip">💡 <strong>Not sure?</strong> Pick the closest category. The content is what matters most — you can always change templates later.</div>
    `,
    contentHe: `
<h2>בחירת התבנית הנכונה</h2>
<p>ל-SiteForge יש 6 תבניות, כל אחת מיועדת לסוג עסק ספציפי. הנה מדריך לבחירת הנכונה.</p>

<p>💈 <strong>ספרייה:</strong> עיצוב כהה ועוצמתי עם גוונים זהובים<br/>
🍕 <strong>מסעדה:</strong> עיצוב חמים עם הדגשים אדומים<br/>
💅 <strong>סטודיו ציפורניים:</strong> עיצוב אלגנטי ונשי עם ורוד ולבן<br/>
🏋️ <strong>חדר כושר:</strong> עיצוב נועז ואנרגטי עם כתום<br/>
☕ <strong>קפה:</strong> עיצוב חמים ונוח עם חום וקרמל<br/>
📸 <strong>צילום:</strong> עיצוב מינימליסטי ונקי עם שחור</p>
    `,
  },

  {
    slug: 'change-template',
    title: 'Can I Change My Template After Publishing?',
    titleHe: 'האם אוכל לשנות את התבנית לאחר הפרסום?',
    category: 'templates',
    helpful: 156,
    views: 2340,
    content: `
<h2>Yes, You Can Change Templates</h2>
<p>You can change your template at any time, even after publishing. Here's what you need to know.</p>

<h2>How to Change Your Template</h2>
<ol>
  <li>Go to your <strong>Dashboard</strong></li>
  <li>Click <strong>Edit</strong> on your website</li>
  <li>In the editor, you can choose a different template from the category selection</li>
  <li>Note: changing the business <em>category</em> will change your template</li>
  <li>Click through the editor steps and update any content</li>
  <li>Click <strong>Publish</strong> to apply the changes</li>
</ol>

<h2>What Data is Preserved?</h2>
<p>When you change templates, the following data carries over:</p>
<ul>
  <li>✓ Business name and description</li>
  <li>✓ Contact information (phone, WhatsApp, email, address)</li>
  <li>✓ Opening hours</li>
  <li>✓ Photos</li>
</ul>

<h2>What Changes?</h2>
<ul>
  <li>The visual design and color scheme</li>
  <li>The layout of sections on the page</li>
  <li>Category-specific content (e.g., "menu" vs "services")</li>
</ul>

<div class="tip">💡 <strong>Tip:</strong> Your website URL (slug) stays the same when you change templates — so any links you've already shared will still work.</div>
    `,
    contentHe: `
<h2>כן, ניתן לשנות תבניות</h2>
<p>ניתן לשנות את התבנית שלך בכל עת, גם לאחר הפרסום.</p>

<h2>מה נשמר?</h2>
<p>שם העסק, פרטי יצירת קשר, שעות פעילות ותמונות נשמרים. העיצוב החזותי ופריסת הקטעים משתנים.</p>

<p>כתובת ה-URL שלך (slug) נשארת זהה כאשר אתה משנה תבניות — כך קישורים שכבר שיתפת יפעלו עדיין.</p>
    `,
  },

  // ── Account ───────────────────────────────────────────────────────────────────
  {
    slug: 'sign-in-with-google',
    title: 'How to Sign In with Google',
    titleHe: 'כיצד להתחבר עם Google',
    category: 'account',
    helpful: 175,
    views: 2880,
    content: `
<h2>Google Sign-In on SiteForge</h2>
<p>SiteForge uses Google Sign-In exclusively — we don't have separate usernames and passwords. This is simpler, more secure, and means you never forget your password.</p>

<h2>How to Sign In</h2>
<ol>
  <li>Click <strong>Sign In</strong> in the top right corner of the page</li>
  <li>Click the <strong>Continue with Google</strong> button</li>
  <li>A Google sign-in popup will appear</li>
  <li>Choose your Google account or enter your email</li>
  <li>Google will verify your identity</li>
  <li>You'll be redirected to your dashboard</li>
</ol>

<h2>Troubleshooting</h2>
<h3>The popup doesn't open</h3>
<p>Your browser might be blocking popups. Look for a popup blocker icon in your address bar and allow popups for siteforge.com.</p>

<h3>I get an error message</h3>
<p>Try these steps:</p>
<ul>
  <li>Clear your browser cache and cookies</li>
  <li>Try a different browser (Chrome works best)</li>
  <li>Disable browser extensions temporarily</li>
  <li>Check that you're not blocking third-party cookies</li>
</ul>

<h3>I signed in but can't see my websites</h3>
<p>Make sure you're signed in with the same Google account you used when you first created your websites.</p>

<div class="tip">💡 <strong>Tip:</strong> Your session stays active for 30 days. You won't need to sign in again unless you explicitly sign out.</div>
    `,
    contentHe: `
<h2>כניסה עם Google ב-SiteForge</h2>
<p>SiteForge משתמש בכניסה עם Google בלבד — אין לנו שמות משתמש וסיסמאות נפרדים. זה פשוט יותר, מאובטח יותר, ואומר שאינך שוכח את הסיסמה שלך לעולם.</p>

<h2>כיצד להתחבר</h2>
<ol>
  <li>לחץ על <strong>התחברות</strong> בפינה הימנית העליונה</li>
  <li>לחץ על <strong>המשך עם Google</strong></li>
  <li>בחר את חשבון Google שלך</li>
  <li>תועבר לדשבורד שלך</li>
</ol>
    `,
  },

  {
    slug: 'delete-your-website',
    title: 'How to Delete Your Website',
    titleHe: 'כיצד למחוק את האתר שלך',
    category: 'account',
    helpful: 98,
    views: 1650,
    content: `
<h2>Deleting Your Website</h2>
<p>You can delete any website from your dashboard at any time. Please note: this action is permanent and cannot be undone.</p>

<h2>How to Delete</h2>
<ol>
  <li>Go to your <strong>Dashboard</strong></li>
  <li>Find the website you want to delete</li>
  <li>Click the <strong>trash icon (🗑️)</strong> on the bottom right of the website card</li>
  <li>A confirmation popup will appear</li>
  <li>Click <strong>Delete</strong> to confirm</li>
</ol>

<h2>What Happens After Deletion?</h2>
<ul>
  <li>The website and all its content are permanently removed</li>
  <li>The URL (e.g., siteforge.com/b/your-business) will no longer work</li>
  <li>Analytics data for that website is also deleted</li>
  <li>The action cannot be reversed</li>
</ul>

<h2>Before You Delete</h2>
<p>Consider these alternatives if you just want to make changes:</p>
<ul>
  <li>If you want to update content: click <strong>Edit</strong> instead</li>
  <li>If you want to temporarily hide your site: we're working on a "pause" feature</li>
  <li>If you want to start fresh with a different category: edit the website and change the category</li>
</ul>

<div class="tip">💡 <strong>Warning:</strong> If you've shared your website link widely (WhatsApp status, Instagram bio, Google Maps), make sure to update those links before or after deleting your site.</div>
    `,
    contentHe: `
<h2>מחיקת האתר שלך</h2>
<p>ניתן למחוק כל אתר מהדשבורד שלך בכל עת. שים לב: פעולה זו היא קבועה ולא ניתן לבטל אותה.</p>

<h2>כיצד למחוק</h2>
<ol>
  <li>עבור ל<strong>דשבורד</strong></li>
  <li>מצא את האתר שאתה רוצה למחוק</li>
  <li>לחץ על <strong>סמל הפח (🗑️)</strong></li>
  <li>חלון אישור יופיע</li>
  <li>לחץ <strong>מחק</strong> לאישור</li>
</ol>
    `,
  },

  // ── Billing ───────────────────────────────────────────────────────────────────
  {
    slug: 'free-plan-limits',
    title: "What's Included in the Free Plan?",
    titleHe: 'מה כלול בתוכנית החינמית?',
    category: 'billing',
    helpful: 289,
    views: 5130,
    content: `
<h2>The Free Plan — Everything You Need to Get Started</h2>
<p>SiteForge's free plan is designed to give you a fully functional business website at no cost. Here's exactly what you get.</p>

<h2>What's Included for Free</h2>
<ul>
  <li>✅ 1 published website</li>
  <li>✅ Your own URL (siteforge.com/b/your-name)</li>
  <li>✅ Full mobile-responsive design</li>
  <li>✅ All 6 business categories & templates</li>
  <li>✅ Services & prices section</li>
  <li>✅ Photo gallery (up to 6 photos)</li>
  <li>✅ Opening hours display</li>
  <li>✅ WhatsApp integration</li>
  <li>✅ Instagram & Facebook links</li>
  <li>✅ Phone & email contact</li>
  <li>✅ Basic analytics (page views)</li>
  <li>✅ No ads on your website</li>
</ul>

<h2>Free Plan Limitations</h2>
<ul>
  <li>📊 Limited analytics (views only, no detailed click tracking on free)</li>
  <li>🌐 Uses SiteForge subdomain (siteforge.com/b/...)</li>
  <li>📸 Gallery limited to 6 photos</li>
  <li>1 website per account</li>
</ul>

<h2>What Happens When Limits Are Reached?</h2>
<p>The free plan will continue to work normally. We'll notify you when paid plans become available with expanded features — but your free website will always remain free and functional.</p>

<div class="tip">💡 <strong>Note:</strong> Paid plans with custom domains, unlimited photos, and advanced analytics are coming soon. Free plan users will be notified first.</div>
    `,
    contentHe: `
<h2>התוכנית החינמית — כל מה שצריך להתחיל</h2>
<p>התוכנית החינמית של SiteForge נועדה לתת לך אתר עסקי מלא ופועל ללא עלות.</p>

<h2>מה כלול בחינם</h2>
<ul>
  <li>✅ אתר מפורסם אחד</li>
  <li>✅ URL משלך</li>
  <li>✅ עיצוב מותאם מובייל</li>
  <li>✅ כל 6 קטגוריות ותבניות העסקים</li>
  <li>✅ שירותים ומחירים, גלריית תמונות, שעות פעילות</li>
  <li>✅ אינטגרציה עם WhatsApp, אינסטגרם ופייסבוק</li>
  <li>✅ ללא פרסומות באתר שלך</li>
</ul>
    `,
  },

  {
    slug: 'upgrade-to-business',
    title: 'How to Upgrade to the Business Plan',
    titleHe: 'כיצד לשדרג לתוכנית Business',
    category: 'billing',
    helpful: 134,
    views: 2210,
    content: `
<h2>Paid Plans — Coming Soon</h2>
<p>We're currently in public beta and all features are free. We're working hard on our paid Business plan which will include additional features for power users.</p>

<h2>What the Business Plan Will Include</h2>
<ul>
  <li>🌐 Custom domain (yourname.co.il)</li>
  <li>📸 Unlimited photo gallery</li>
  <li>📊 Advanced analytics with click tracking</li>
  <li>🏢 Multiple websites per account</li>
  <li>⚡ Priority support</li>
  <li>🎨 Premium template designs</li>
</ul>

<h2>Pricing</h2>
<p>We plan to offer the Business plan at a price that's accessible to Israeli small businesses — significantly less than hiring a web designer or using international website builders.</p>

<h2>How to Get Notified</h2>
<p>When the Business plan launches, all existing users will be the first to know. Make sure your email is up to date in your Google account settings.</p>

<div class="tip">💡 <strong>Good news:</strong> Early users who joined during our beta period will receive a significant discount when paid plans launch. Your loyalty matters to us.</div>
    `,
    contentHe: `
<h2>תוכניות בתשלום — בקרוב</h2>
<p>אנחנו כרגע בגרסת בטא ציבורית וכל התכונות חינמיות. אנחנו עובדים קשה על תוכנית Business בתשלום שתכלול תכונות נוספות.</p>

<h2>מה תוכנית Business תכלול</h2>
<ul>
  <li>🌐 דומיין מותאם אישית</li>
  <li>📸 גלריית תמונות ללא הגבלה</li>
  <li>📊 אנליטיקה מתקדמת</li>
  <li>🏢 מספר אתרים לכל חשבון</li>
  <li>⚡ תמיכה בעדיפות</li>
</ul>
    `,
  },

  // ── Technical ─────────────────────────────────────────────────────────────────
  {
    slug: 'share-your-website-link',
    title: 'How to Share Your Website Link',
    titleHe: 'כיצד לשתף את קישור האתר שלך',
    category: 'technical',
    helpful: 302,
    views: 4670,
    content: `
<h2>Your Website URL</h2>
<p>Once your website is published, it has a permanent URL in the format: <code>siteforge.com/b/your-business-name</code>. You can find this URL on your dashboard under each website card.</p>

<h2>Method 1: WhatsApp Status</h2>
<p>This is the most effective way to reach all your existing customers at once.</p>
<ol>
  <li>Copy your website link from the dashboard</li>
  <li>Open WhatsApp → tap <strong>Status</strong></li>
  <li>Tap the pencil icon to write a status</li>
  <li>Paste your link and add a message like "Check out our new website! 🎉"</li>
  <li>Post the status — all your contacts will see it for 24 hours</li>
</ol>

<h2>Method 2: Instagram Bio</h2>
<ol>
  <li>Open Instagram → go to your profile</li>
  <li>Tap <strong>Edit Profile</strong></li>
  <li>In the <strong>Website</strong> field, paste your SiteForge link</li>
  <li>Save changes</li>
</ol>
<p>Now when people check your Instagram profile, they can click directly to your website.</p>

<h2>Method 3: Google Maps</h2>
<p>If your business is on Google Maps, you can add your website URL to your business listing.</p>
<ol>
  <li>Open Google Maps and find your business</li>
  <li>Click <strong>Claim this business</strong> or <strong>Edit profile</strong></li>
  <li>Add your website URL in the relevant field</li>
</ol>

<h2>Method 4: WhatsApp Business Profile</h2>
<p>If you use WhatsApp Business, add your website link to your business profile so it appears when customers chat with you.</p>

<h2>Method 5: Share Directly</h2>
<p>Simply copy the link and paste it anywhere — in messages, emails, Facebook posts, or anywhere you communicate with customers.</p>

<div class="tip">💡 <strong>Pro tip:</strong> Add your website link to your email signature and business card. Every interaction becomes an opportunity for a customer to find you online.</div>
    `,
    contentHe: `
<h2>כתובת ה-URL שלך</h2>
<p>לאחר פרסום האתר, יש לו URL קבוע בפורמט: <code>siteforge.com/b/שם-העסק-שלך</code>. ניתן למצוא URL זה בדשבורד שלך.</p>

<h2>שיטה 1: סטטוס WhatsApp</h2>
<p>זוהי הדרך היעילה ביותר להגיע לכל הלקוחות הקיימים שלך בבת אחת.</p>
<ol>
  <li>העתק את קישור האתר מהדשבורד</li>
  <li>פתח WhatsApp ← הקש <strong>סטטוס</strong></li>
  <li>הדבק את הקישור והוסף הודעה</li>
  <li>פרסם — כל אנשי הקשר שלך יראו את הסטטוס במשך 24 שעות</li>
</ol>

<h2>שיטה 2: ביוגרפיה של אינסטגרם</h2>
<p>עבור לפרופיל שלך ← ערוך פרופיל ← שדה אתר אינטרנט. הדבק את קישור SiteForge שלך ושמור.</p>
    `,
  },
];

export function getArticleBySlug(slug: string): HelpArticle | undefined {
  return helpArticles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: HelpArticle['category']): HelpArticle[] {
  return helpArticles.filter((a) => a.category === category);
}

export function getRelatedArticles(slug: string, category: HelpArticle['category'], limit = 3): HelpArticle[] {
  return helpArticles
    .filter((a) => a.category === category && a.slug !== slug)
    .slice(0, limit);
}

export function getPopularArticles(limit = 4): HelpArticle[] {
  return [...helpArticles]
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}

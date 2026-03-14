/**
 * SiteForge Blog Posts — Static content for SEO.
 * All posts hardcoded as TypeScript objects (no CMS needed).
 */

export type BlogPost = {
  slug: string;
  title: string;
  titleHe: string;
  excerpt: string;
  excerptHe: string;
  content: string;        // HTML string
  contentHe: string;
  category: 'Guide' | 'Tips' | 'Research' | 'Strategy';
  readTime: number;       // minutes
  publishedAt: string;    // ISO date
  coverImage: string;     // picsum URL
  tags: string[];
};

export const blogPosts: BlogPost[] = [
  // ─── POST 1 ────────────────────────────────────────────────────────────────
  {
    slug: 'how-to-get-your-barbershop-online',
    title: 'How to Get Your Barbershop Online in 2025',
    titleHe: 'איך להעלות את הספרייה שלך לאינטרנט ב-2025',
    excerpt: 'A step-by-step guide for barbershop owners who want more customers through online presence.',
    excerptHe: 'מדריך שלב אחר שלב לבעלי ספריות שרוצים יותר לקוחות דרך נוכחות מקוונת.',
    category: 'Guide',
    readTime: 5,
    publishedAt: '2025-02-10',
    coverImage: 'https://picsum.photos/seed/barbershop/1200/600',
    tags: ['barbershop', 'website', 'guide'],
    contentHe: `<p>עם יותר מ-90% מהצרכנים שמחפשים עסקים מקומיים באינטרנט לפני שהם מגיעים, ספרייה ללא אתר פשוט מחמיצה לקוחות פוטנציאליים.</p>`,
    content: `
<h2>Why Your Barbershop Needs a Website Now</h2>
<p>Over <strong>87% of consumers search online before visiting a local business</strong>. If a potential customer searches "barbershop near me" and can't find you, they'll book at your competitor. A website is no longer optional — it's your digital storefront, open 24/7.</p>
<p>The good news? Getting online in 2025 is faster and cheaper than ever. You don't need a web designer or any technical knowledge. Read on to learn exactly what your barbershop website needs and how to build it yourself.</p>

<h2>What Your Barbershop Website Must Include</h2>
<p>Not every barbershop website is equal. Many barbers launch a site and wonder why it doesn't bring in customers. The secret is including the right content:</p>
<ul>
  <li><strong>Services & Prices</strong> — List every service with a clear price. "Haircut ₪60, Beard Trim ₪40, Full Package ₪90." Customers want to know before they book.</li>
  <li><strong>A WhatsApp Booking Button</strong> — Israeli customers hate contact forms. Add a direct WhatsApp link so they can message you instantly. Most bookings happen on WhatsApp anyway.</li>
  <li><strong>Opening Hours</strong> — Updated and visible on the homepage. Nothing frustrates a customer more than showing up when you're closed.</li>
  <li><strong>Gallery Photos</strong> — Show 6–12 photos of your work. Haircuts, fades, beard trims — real work builds trust faster than any sales copy.</li>
  <li><strong>Your Address & Phone</strong> — Make it easy to find you. Include a Google Maps link.</li>
</ul>

<h2>How to Take Good Barbershop Photos</h2>
<p>You don't need a professional photographer. Here's how to take great photos with your phone:</p>
<ul>
  <li>Shoot near a window in natural daylight — avoid harsh overhead lighting.</li>
  <li>Use the portrait mode on your phone to blur the background.</li>
  <li>Take before/after shots for maximum impact.</li>
  <li>Clean your workspace before shooting — tidy chairs and mirrors matter.</li>
  <li>Shoot from multiple angles: front, side, 3/4 view.</li>
</ul>
<p>Aim for at least 8 good photos before launching your site. You can always add more later.</p>

<h2>How to Build Your Website Without a Developer</h2>
<p>Traditional web design is expensive (₪3,000–₪15,000) and slow (4–8 weeks). Today there's a better way.</p>
<p>SiteForge is built specifically for small businesses in Israel. You choose a barbershop template, fill in your details — name, services, prices, photos — and publish. The whole process takes under 10 minutes and costs nothing to start.</p>
<p>Your website looks professional on every device — phone, tablet, and desktop — without any extra work.</p>

<h2>How to Promote Your Website</h2>
<p>Once your site is live, share it everywhere:</p>
<ul>
  <li><strong>Instagram bio</strong> — Change your bio link to your website URL immediately.</li>
  <li><strong>WhatsApp Status</strong> — Post your website link with a photo of your best work.</li>
  <li><strong>Google Maps</strong> — Add your website to your Google Business Profile.</li>
  <li><strong>Existing customers</strong> — Message your regulars directly and ask them to check out your new site.</li>
</ul>
<p>A website doesn't replace word-of-mouth — it amplifies it. When someone recommends you, a quick Google search should confirm exactly how good you are.</p>

<h2>Bottom Line</h2>
<p>Getting your barbershop online in 2025 is a 10-minute task, not a month-long project. Pick a template, add your services and photos, and publish. Every day your barbershop isn't online is a day you're sending customers to someone else.</p>
`,
  },

  // ─── POST 2 ────────────────────────────────────────────────────────────────
  {
    slug: 'restaurant-website-must-haves',
    title: '7 Things Every Restaurant Website Must Have',
    titleHe: '7 דברים שכל אתר מסעדה חייב להכיל',
    excerpt: 'Is your restaurant website missing these essential elements? Check your site against this list.',
    excerptHe: 'האם אתר המסעדה שלך חסר את האלמנטים האלה? בדוק את האתר שלך מול הרשימה הזו.',
    category: 'Tips',
    readTime: 4,
    publishedAt: '2025-02-18',
    coverImage: 'https://picsum.photos/seed/restaurant/1200/600',
    tags: ['restaurant', 'website', 'tips'],
    contentHe: `<p>אתר מסעדה הוא לא רק כרטיס ביקור — הוא הכלי הכי חזק שיש לך להמרת מבקרים ללקוחות.</p>`,
    content: `
<h2>Is Your Restaurant Website Actually Working for You?</h2>
<p>Most restaurant websites look fine but fail to convert visitors into customers. The difference between a website that fills tables and one that doesn't comes down to a handful of specific elements. Here are the 7 non-negotiables every restaurant website must have in 2025.</p>

<h2>1. An Online Menu With Prices</h2>
<p>This is the single most important element. <strong>85% of diners check the menu online before choosing a restaurant.</strong> Don't just upload a PDF — build a proper menu page with categories, dish descriptions, and clear prices. Update it whenever your menu changes. A menu that says "prices may vary" is a red flag.</p>

<h2>2. Opening Hours — Always Up to Date</h2>
<p>Nothing loses a customer faster than showing up to a closed restaurant because your website still shows old hours. Display your hours prominently on the homepage — not buried in a contact page. Update them immediately for holidays, Shabbat, or special events.</p>

<h2>3. Location + Google Maps Link</h2>
<p>Include your full address and a direct link to Google Maps. Better yet, embed a live map on your contact page. Make it one tap from your website to directions. Customers will thank you.</p>

<h2>4. Phone & WhatsApp for Reservations</h2>
<p>Offer both options. Some customers prefer to call; most prefer to message on WhatsApp. A direct WhatsApp link with a pre-filled message ("Hi, I'd like to make a reservation for…") removes friction and gets you more bookings. Make these buttons large and impossible to miss on mobile.</p>

<h2>5. High-Quality Food & Atmosphere Photos</h2>
<p>People eat with their eyes first — online, even more so. Invest in at least one session of decent food photography. Show your signature dishes in good light. Include photos of your dining room, outdoor seating, or any unique ambiance elements. Authentic phone photos are better than no photos at all.</p>

<h2>6. Social Media Links</h2>
<p>Link to your Instagram, Facebook, and TikTok prominently. Social proof is powerful — if you have 5,000 Instagram followers, show it. Potential customers will browse your feed before making a reservation.</p>

<h2>7. Mobile-Friendly Design</h2>
<p>Over <strong>70% of restaurant website traffic comes from mobile phones</strong>. If your website is hard to navigate on a small screen — small text, broken layouts, buttons that are hard to tap — customers will leave. Test your website on your phone before launching.</p>

<h2>The Bottom Line</h2>
<p>A restaurant website isn't just a digital business card. It's a table-filling machine — if you build it right. Include these 7 elements and you'll have a website that actually converts visitors into diners. SiteForge's restaurant template includes all of these out of the box, so you can focus on cooking, not coding.</p>
`,
  },

  // ─── POST 3 ────────────────────────────────────────────────────────────────
  {
    slug: 'small-business-website-cost-israel',
    title: 'How Much Does a Business Website Cost in Israel? (2025)',
    titleHe: 'כמה עולה אתר לעסק בישראל? (2025)',
    excerpt: 'We compared all the options — from hiring a designer to DIY builders. Here\'s the honest breakdown.',
    excerptHe: 'השוונו את כל האפשרויות — מהשכרת מעצב ועד בנאי DIY. הנה הפירוט הכנה.',
    category: 'Research',
    readTime: 6,
    publishedAt: '2025-02-25',
    coverImage: 'https://picsum.photos/seed/money123/1200/600',
    tags: ['cost', 'israel', 'comparison'],
    contentHe: `<p>אחת השאלות הכי נפוצות מבעלי עסקים קטנים בישראל: "כמה יעלה לי אתר?" התשובה תלויה בדרך שתבחר.</p>`,
    content: `
<h2>The Real Cost of a Business Website in Israel</h2>
<p>One of the most common questions we hear from small business owners: <em>"How much does a website actually cost?"</em> The answer ranges from ₪0 to ₪50,000+ depending on which path you take. Let's break down every option honestly.</p>

<h2>Option 1: Hire a Freelance Web Designer</h2>
<p>A freelance web designer in Israel typically charges <strong>₪3,000–₪15,000</strong> for a small business website. This gets you a custom design, but comes with significant downsides:</p>
<ul>
  <li>4–8 week delivery time</li>
  <li>Ongoing maintenance fees (₪200–₪800/month)</li>
  <li>Need to call the developer for every small change (hours, prices, new photos)</li>
  <li>You're dependent on one person — what happens if they're busy or move on?</li>
</ul>
<p><strong>Total first-year cost: ₪5,000–₪25,000</strong></p>

<h2>Option 2: Wix or Squarespace</h2>
<p>International platforms like Wix and Squarespace offer subscription-based website builders. They work well but come with drawbacks for Israeli businesses:</p>
<ul>
  <li>Interface primarily in English (Hebrew support is limited)</li>
  <li>Not designed for the Israeli market or local business needs</li>
  <li>Monthly cost: $13–$36 USD (~₪50–₪140/month)</li>
  <li>Learning curve — still requires several hours to set up properly</li>
</ul>
<p><strong>Total first-year cost: ₪600–₪1,700</strong></p>

<h2>Option 3: WordPress</h2>
<p>WordPress powers 43% of websites globally, but it's not designed for non-technical users:</p>
<ul>
  <li>Requires hosting (₪50–₪200/month)</li>
  <li>Needs plugins for every feature (security, SEO, contact forms)</li>
  <li>Regular updates required or site gets hacked</li>
  <li>Learning curve: 20–40 hours minimum</li>
</ul>
<p><strong>Total first-year cost: ₪1,000–₪4,000 + significant time</strong></p>

<h2>Option 4: SiteForge</h2>
<p>SiteForge was built specifically for small businesses in Israel. You choose an industry template, fill in your details, and publish — no technical knowledge required.</p>

<table style="width:100%;border-collapse:collapse;margin:16px 0">
  <thead>
    <tr style="border-bottom:2px solid rgba(139,92,246,0.3)">
      <th style="text-align:left;padding:8px 12px;color:#a78bfa">Feature</th>
      <th style="text-align:center;padding:8px 12px;color:#6b7280">Designer</th>
      <th style="text-align:center;padding:8px 12px;color:#6b7280">Wix</th>
      <th style="text-align:center;padding:8px 12px;color:#a78bfa">SiteForge</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid rgba(255,255,255,0.05)">
      <td style="padding:8px 12px">Setup time</td>
      <td style="text-align:center;padding:8px 12px">4–8 weeks</td>
      <td style="text-align:center;padding:8px 12px">2–5 hours</td>
      <td style="text-align:center;padding:8px 12px;color:#34d399">5 minutes</td>
    </tr>
    <tr style="border-bottom:1px solid rgba(255,255,255,0.05)">
      <td style="padding:8px 12px">First-year cost</td>
      <td style="text-align:center;padding:8px 12px">₪5,000+</td>
      <td style="text-align:center;padding:8px 12px">₪600+</td>
      <td style="text-align:center;padding:8px 12px;color:#34d399">₪0</td>
    </tr>
    <tr style="border-bottom:1px solid rgba(255,255,255,0.05)">
      <td style="padding:8px 12px">Hebrew support</td>
      <td style="text-align:center;padding:8px 12px">✓</td>
      <td style="text-align:center;padding:8px 12px">Partial</td>
      <td style="text-align:center;padding:8px 12px;color:#34d399">✓ Full RTL</td>
    </tr>
    <tr>
      <td style="padding:8px 12px">Edit yourself</td>
      <td style="text-align:center;padding:8px 12px">✗</td>
      <td style="text-align:center;padding:8px 12px">✓</td>
      <td style="text-align:center;padding:8px 12px;color:#34d399">✓</td>
    </tr>
  </tbody>
</table>

<h2>Our Recommendation</h2>
<p>For most small businesses — barbershops, restaurants, salons, cafes — <strong>SiteForge is the best value</strong>. You get a professional, mobile-responsive website live in minutes for free. If you grow and need advanced features like a custom domain, the Business plan is ₪39/month — still a fraction of any other option.</p>
<p>The only reason to hire a designer is if you need something highly custom — a complex e-commerce store, a booking system with payments, or a brand identity refresh. For a local business website, it's overkill.</p>
`,
  },

  // ─── POST 4 ────────────────────────────────────────────────────────────────
  {
    slug: 'nail-salon-instagram-vs-website',
    title: 'Instagram vs Website: What Does Your Nail Salon Really Need?',
    titleHe: 'אינסטגרם מול אתר: מה הסטודיו לציפורניים שלך באמת צריך?',
    excerpt: 'Many nail salons rely only on Instagram. Here\'s why having your own website changes the game.',
    excerptHe: 'מספריות רבות מסתמכות רק על אינסטגרם. הנה למה שיש לך אתר משנה את המשחק.',
    category: 'Strategy',
    readTime: 4,
    publishedAt: '2025-03-03',
    coverImage: 'https://picsum.photos/seed/nailsalon/1200/600',
    tags: ['nail salon', 'instagram', 'strategy'],
    contentHe: `<p>אינסטגרם מצוין לתצוגת עבודות, אבל הוא לא מספיק לבדו לעסק מקצועי.</p>`,
    content: `
<h2>The Instagram Trap for Nail Salons</h2>
<p>Walk into any nail salon today and ask the owner where they get customers. The answer is almost always: <em>"Instagram."</em> And it works — until it doesn't. Relying solely on Instagram for your nail salon's online presence is riskier than most owners realize.</p>

<h2>The Problem With Instagram-Only</h2>
<p>Instagram is a powerful tool, but it has serious limitations for a business:</p>
<ul>
  <li><strong>The algorithm controls your reach.</strong> Instagram decides who sees your posts. One algorithm change and your bookings can drop overnight — and it's happened to thousands of businesses.</li>
  <li><strong>You can't be found on Google.</strong> When someone searches "nail salon in [your city]", Instagram profiles rarely appear in the results. You're invisible to anyone who doesn't already follow you.</li>
  <li><strong>No services or prices page.</strong> You can put prices in your bio or stories, but it's buried and hard to find. Customers have to DM you just to ask "how much is a gel manicure?"</li>
  <li><strong>No booking link.</strong> The single link in your bio can only go to one place. You're competing with your own content for that space.</li>
  <li><strong>You don't own it.</strong> Instagram could change its rules, disable your account, or shut down tomorrow. Your followers are theirs, not yours.</li>
</ul>

<h2>What a Website Adds</h2>
<p>A dedicated website solves every one of these problems:</p>
<ul>
  <li><strong>Google visibility.</strong> A website with your services and location helps you appear in "nail salon near me" searches. That's free organic traffic every single day.</li>
  <li><strong>A full services menu.</strong> List every service with a description and price. Customers make up their mind before contacting you — and they arrive already sold.</li>
  <li><strong>WhatsApp booking button.</strong> One tap to message you directly. No forms, no email — just instant contact in the way Israeli customers prefer.</li>
  <li><strong>Professionalism.</strong> When a potential customer Googles your salon name and finds a polished website alongside your Instagram, you immediately look more credible than competitors who have only social media.</li>
</ul>

<h2>You Need Both — And Here's How to Connect Them</h2>
<p>Instagram and your website are strongest when they work together:</p>
<ol>
  <li>Put your website link in your Instagram bio. Change it from a linktree to your direct website URL.</li>
  <li>When you post a new design on Instagram, add the caption: "Full price list on our website → link in bio"</li>
  <li>Use Instagram for showcasing work; use your website for converting visitors into bookings.</li>
  <li>Add your Instagram feed or handle to your website so visitors can follow you there too.</li>
</ol>

<h2>How Long Does It Take?</h2>
<p>Building a nail salon website with SiteForge takes about 10 minutes. Choose the nail salon template, add your services with prices, upload a few photos of your work, add your WhatsApp number — and you're live. You spend more time choosing what to post on Instagram than it takes to build your website.</p>

<h2>The Bottom Line</h2>
<p>Instagram is great for discovery. Your website is where customers decide to book. You need both working together. The nail salons winning in 2025 are the ones that treat their website as seriously as their social media.</p>
`,
  },

  // ─── POST 5 ────────────────────────────────────────────────────────────────
  {
    slug: 'how-to-take-good-photos-for-your-business-website',
    title: 'How to Take Great Photos for Your Business Website (With Just Your Phone)',
    titleHe: 'איך לצלם תמונות מעולות לאתר העסק שלך (רק עם הטלפון)',
    excerpt: 'Professional-looking photos don\'t require a photographer. Here\'s how to do it yourself.',
    excerptHe: 'תמונות שנראות מקצועיות לא דורשות צלם. הנה איך לעשות זאת בעצמך.',
    category: 'Tips',
    readTime: 5,
    publishedAt: '2025-03-10',
    coverImage: 'https://picsum.photos/seed/phonephoto/1200/600',
    tags: ['photography', 'tips', 'phone'],
    contentHe: `<p>תמונות טובות הן ההבדל בין אתר שנראה מקצועי לכזה שנראה חובבני — וניתן לצלם אותן עם הטלפון שלך.</p>`,
    content: `
<h2>Why Photos Make or Break Your Business Website</h2>
<p>Visitors form an opinion about your business within <strong>50 milliseconds</strong> of landing on your website. Before they read a single word, they've already judged you based on your photos. Good photos build instant trust. Bad photos — or no photos — send customers to a competitor.</p>
<p>The good news: you don't need to hire a photographer. A modern smartphone camera is more than capable of producing website-quality photos if you know what you're doing.</p>

<h2>The #1 Rule: Light Is Everything</h2>
<p>Professional photos aren't about the camera — they're about light. Here's how to get great lighting for free:</p>
<ul>
  <li><strong>Natural light is your best friend.</strong> Position your subject near a window. Side lighting from a window creates beautiful, flattering shadows.</li>
  <li><strong>Avoid overhead fluorescent lighting.</strong> It creates harsh shadows and unflattering yellow casts.</li>
  <li><strong>Shoot on cloudy days</strong> for portraits and detail shots — overcast skies act like a giant softbox.</li>
  <li><strong>Golden hour</strong> (1 hour after sunrise or before sunset) gives everything a warm, professional glow.</li>
</ul>

<h2>Background: Keep It Clean</h2>
<p>A cluttered background kills an otherwise great photo. Before you shoot:</p>
<ul>
  <li>Remove anything that doesn't belong in the frame — bottles, bags, random objects.</li>
  <li>Use a plain wall, a simple backdrop, or a relevant environment (your workspace, storefront).</li>
  <li>Use portrait mode on your phone to blur the background and make your subject pop.</li>
</ul>

<h2>What to Shoot for Different Businesses</h2>
<p><strong>Barbershops & Salons:</strong> Before/after shots are your most powerful content. Shoot from the front and both sides. Include close-ups of detailed work (fades, beard lines, nail art). Photograph your clean workspace — it signals professionalism.</p>
<p><strong>Restaurants & Cafes:</strong> Shoot food from above (flat lay) for dishes, or at table height with bokeh background for drinks. Include atmosphere shots — the dining room during golden hour, the counter, the team. Real people eating = social proof.</p>
<p><strong>Gyms & Studios:</strong> Action shots — people working out, classes in motion. Also shoot the equipment, the space, and the exterior. Make it look like a place people want to be.</p>

<h2>Editing Apps That Make a Difference</h2>
<p>Simple editing can transform a good phone photo into a great one:</p>
<ul>
  <li><strong>Snapseed</strong> (free) — The best all-around editing app. Use "HDR Scape" for architecture, "Portrait" for people shots.</li>
  <li><strong>VSCO</strong> (free + paid) — Beautiful film-style filters that give photos a cohesive look. A2 and C1 presets work well for most businesses.</li>
  <li><strong>Lightroom Mobile</strong> (free) — Best for precise color correction. Raise shadows, bring highlights down, add a touch of clarity.</li>
</ul>
<p>Rule of editing: subtle improvements only. Over-edited photos look fake and reduce trust.</p>

<h2>How Many Photos Do You Need?</h2>
<ul>
  <li><strong>Cover photo:</strong> 1 hero image (your best, most striking shot)</li>
  <li><strong>Gallery:</strong> 6–12 photos minimum</li>
  <li><strong>Service photos:</strong> 1–2 per service if possible</li>
  <li><strong>Team/about:</strong> 1–3 photos of you and your team</li>
</ul>
<p>Total: aim for 15–20 strong photos before launching. You can always add more. The worst thing is launching with no photos at all.</p>

<h2>The Bottom Line</h2>
<p>A half-hour photo session in good natural light, with a clean background and simple editing, will give you everything you need for a stunning business website. No professional photographer required. Your phone is ready — all you need is to plan the shoot and take it seriously.</p>
`,
  },

  // ─── POST 6 ────────────────────────────────────────────────────────────────
  {
    slug: 'why-your-business-needs-a-whatsapp-link-on-your-website',
    title: 'Why Every Israeli Business Website Needs a WhatsApp Button',
    titleHe: 'למה כל אתר עסקי ישראלי צריך כפתור וואטסאפ',
    excerpt: 'Israeli customers prefer WhatsApp over phone calls and contact forms. Here\'s how to use that.',
    excerptHe: 'לקוחות ישראלים מעדיפים וואטסאפ על פני שיחות טלפון וטפסי יצירת קשר. הנה איך להשתמש בזה.',
    category: 'Strategy',
    readTime: 3,
    publishedAt: '2025-03-14',
    coverImage: 'https://picsum.photos/seed/whatsapp99/1200/600',
    tags: ['whatsapp', 'israel', 'conversion'],
    contentHe: `<p>ישראל היא אחת המדינות עם השימוש הגבוה ביותר בוואטסאפ בעולם. אם אתה לא מציע ללקוחות שלך לפנות אליך דרך וואטסאפ, אתה מפסיד פניות.</p>`,
    content: `
<h2>WhatsApp Is the Default Communication Channel in Israel</h2>
<p>Israel has one of the highest WhatsApp penetration rates in the world. <strong>Over 87% of Israelis use WhatsApp daily</strong> — it's not just a messaging app here, it's the primary way people communicate, both personally and with businesses.</p>
<p>Yet most small business websites still rely on contact forms that nobody fills out, or phone numbers that nobody calls. The fix is simple: add a WhatsApp button to your website.</p>

<h2>Why Customers Prefer WhatsApp Over Everything Else</h2>
<ul>
  <li><strong>It's instant.</strong> Customers don't want to wait on hold or wait 2 days for an email reply. WhatsApp feels like texting a friend.</li>
  <li><strong>No account required.</strong> Unlike email forms or booking apps, everyone already has WhatsApp. Zero friction.</li>
  <li><strong>They can send photos.</strong> A customer can send you a photo of a haircut they want, a dish they saw, or a nail design — all in one message.</li>
  <li><strong>Conversations are saved.</strong> Both sides have a record of what was discussed and agreed.</li>
  <li><strong>Psychological comfort.</strong> Many Israeli customers feel more comfortable messaging than calling — especially for price inquiries or bookings.</li>
</ul>

<h2>How to Create Your WhatsApp Business Link</h2>
<p>Creating a WhatsApp link is free and takes 30 seconds:</p>
<p>The format is: <code>https://wa.me/972XXXXXXXXX</code></p>
<p>Replace <code>XXXXXXXXX</code> with your phone number without the leading 0. So if your number is <strong>054-123-4567</strong>, your link is:</p>
<p><code>https://wa.me/972541234567</code></p>

<h2>Add a Pre-Filled Message</h2>
<p>Make it even easier with a pre-written message so customers don't stare at a blank screen:</p>
<p><code>https://wa.me/972541234567?text=Hi%2C%20I'd%20like%20to%20book%20an%20appointment</code></p>
<p>When the customer taps your button, WhatsApp opens with that message pre-filled. One more tap to send. Conversion rate goes up dramatically.</p>

<h2>Where to Put Your WhatsApp Button</h2>
<ul>
  <li><strong>Top of homepage</strong> — visible immediately without scrolling</li>
  <li><strong>Floating button</strong> on every page (bottom right corner) — always accessible</li>
  <li><strong>Services page</strong> — below each service with a pre-filled message about that specific service</li>
  <li><strong>Contact page</strong> — as the primary contact method</li>
</ul>

<h2>SiteForge Does This Automatically</h2>
<p>Every SiteForge website template automatically generates a WhatsApp contact button from your phone number. You don't need to write any code or figure out URL encoding. Add your WhatsApp number in the editor, and your website gets a working "Message Us on WhatsApp" button immediately.</p>

<h2>The Bottom Line</h2>
<p>A WhatsApp button is the single highest-ROI addition you can make to your business website. It meets customers exactly where they are, removes friction from the booking process, and converts website visitors into real conversations. If your website doesn't have one, add it today.</p>
`,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(currentSlug: string, category: string, limit = 2): BlogPost[] {
  return blogPosts
    .filter((p) => p.slug !== currentSlug && p.category === category)
    .slice(0, limit);
}

export const CATEGORY_COLORS: Record<string, string> = {
  Guide:    'bg-blue-500/20 text-blue-300 border border-blue-500/30',
  Tips:     'bg-green-500/20 text-green-300 border border-green-500/30',
  Research: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
  Strategy: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
};

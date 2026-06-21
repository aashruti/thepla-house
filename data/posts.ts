export type Block =
  | { type: "lead"; text: string }
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "ul"; items: string[] };

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  cat: string; // filter id
  category: string; // display label
  date: string; // display
  datePublished: string; // ISO for JSON-LD
  read: string;
  subject: string;
  alt: string;
  body: Block[];
  // ---- per-post SEO overrides ----
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
}

export const BLOG_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "health", label: "Health" },
  { id: "recipes", label: "Recipes" },
  { id: "culture", label: "Food culture" },
  { id: "seasonal", label: "Seasonal" },
  { id: "local", label: "Neighbourhood" },
];

export const POSTS: Post[] = [
  {
    slug: "why-we-never-use-maida",
    title: "Why we'll never use maida",
    excerpt: "The case for 100% whole wheat — and what refined flour really does to your everyday roti.",
    cat: "health",
    category: "Health",
    date: "May 2026",
    datePublished: "2026-05-01",
    read: "6 min read",
    subject: "Whole-wheat atta, a rolling pin and fresh theplas on a wooden board, warm light",
    alt: "Whole-wheat atta and rolling pin",
    seoTitle: "Why we'll never use maida — the whole-wheat thepla difference",
    seoDescription:
      "Maida vs whole-wheat atta: what refined flour strips out, why 100% whole wheat matters, and why every Thepla House thepla in Mumbai is made without maida or palm oil.",
    keywords: ["maida vs whole wheat", "whole wheat thepla", "no maida food Mumbai", "whole-wheat atta benefits", "healthy thepla", "Gujarati food whole wheat"],
    body: [
      { type: "lead", text: "Ask anyone what makes a roti feel light and fluffy at a restaurant, and the honest answer is often the same: maida. Refined white flour is cheap, soft and forgiving. It's also stripped of the bran and germ — the parts of the wheat that actually do you good." },
      { type: "p", text: "At Thepla House by Tejal's Kitchen, we made a decision in 2018 that we've never gone back on: 100% whole-wheat atta, no maida, ever. It isn't the easy choice in a commercial kitchen, but it's the only one that's true to how we cook at home in Mumbai." },
      { type: "h2", text: "What exactly is maida?" },
      { type: "p", text: "Maida is wheat that's been milled and refined until only the starchy endosperm is left. The fibre-rich bran and the nutrient-dense germ are removed, then the flour is bleached to a bright, uniform white. The result is soft and stretchy — perfect for fluffy naans and bakery items — but nutritionally hollow." },
      { type: "h2", text: "What you lose with maida" },
      { type: "p", text: "Milling wheat into maida removes most of its fibre, along with much of the iron, B-vitamins and slow-release energy. What's left digests fast and spikes blood sugar quickly — the opposite of the steady, satisfying meal home food is meant to be." },
      { type: "ul", items: ["Up to 75% of the wheat's fibre is removed", "Iron, magnesium and B-vitamins are stripped with the bran and germ", "Faster digestion means quicker sugar spikes and crashes", "Less of the nutty, wheaty flavour real atta gives"] },
      { type: "quote", text: "If we wouldn't make it that way at home, we won't make it that way for you." },
      { type: "h2", text: "Why whole wheat wins" },
      { type: "p", text: "Whole-wheat atta keeps the whole grain intact — fibre, minerals and a deeper, nuttier flavour. It's what gives a methi thepla its body and its keeping quality, and it's why our food sits lighter even when you go back for seconds. Paired with sunflower oil instead of palm oil and zero preservatives, a whole-wheat thepla becomes genuine ghar ka khana, not junk dressed up as comfort food." },
      { type: "ul", items: ["More fibre and slow-release energy that keeps you full", "Naturally retains iron and B-vitamins", "A fuller, more home-style flavour and better keeping quality", "Travels and stores far better — which is why our travel packs last 7+ days"] },
      { type: "p", text: "It's a small, stubborn choice — and it's the whole point of \"Junk the Junk Food.\" Every thepla, rotli and farsan we serve across our Mumbai kitchens starts with whole-wheat atta, because real home food has nothing to hide." },
    ],
  },
  {
    slug: "methi-thepla-7-day-freshness",
    title: "Methi thepla: the science of 7-day freshness",
    excerpt: "How a humble flatbread travels halfway across the world and still tastes just-made.",
    cat: "health",
    category: "Health",
    date: "Apr 2026",
    datePublished: "2026-04-20",
    read: "5 min read",
    subject: "Vacuum-sealed methi thepla pack beside fresh theplas",
    alt: "Methi thepla freshness",
    seoTitle: "How methi thepla stays fresh for 7 days — without preservatives",
    seoDescription:
      "The science behind methi thepla that travels: low moisture, whole-wheat atta, sunflower oil and vacuum packing. Buy travel packs to carry with you across India or abroad.",
    keywords: ["methi thepla travel packs", "vacuum-packed thepla", "send thepla abroad", "thepla shelf life", "methi thepla Mumbai", "thepla for travel"],
    body: [
      { type: "lead", text: "A good methi thepla is built to travel. Rolled thin, cooked dry and packed with care, it can stay fresh for 7 days or more — with no preservatives at all. The secret isn't chemistry from a lab; it's technique from a home kitchen." },
      { type: "h2", text: "Freshness starts with moisture" },
      { type: "p", text: "Spoilage needs water. A thepla destined to travel is rolled thinner and cooked a little longer and drier than a thepla for the table, so very little moisture is left for mould or bacteria to use. Fresh fenugreek (methi) is folded right into the dough, where its natural oils season and gently protect the bread." },
      { type: "h2", text: "Why whole wheat and sunflower oil matter here" },
      { type: "p", text: "Whole-wheat atta holds its structure for days where maida would turn stale and crumbly. Sunflower oil — never palm — stays clean and doesn't go rancid the way cheaper fats can. Together they're the reason a Thepla House methi thepla keeps its taste and texture long after it leaves the tawa." },
      { type: "ul", items: ["Low moisture: rolled thin and cooked dry", "100% whole-wheat atta that doesn't go crumbly", "Sunflower oil that resists rancidity — no palm oil", "Vacuum packing that locks out air and humidity", "Zero preservatives, ever"] },
      { type: "h2", text: "A taste of home, anywhere" },
      { type: "p", text: "That keeping quality is why our vacuum-packed methi thepla travel packs have become a quiet favourite — students heading to hostels, families travelling, and Gujaratis carrying a taste of home abroad. They're made to travel — pick them up at any kitchen and they stay as good as the morning they were made, days into your journey." },
      { type: "quote", text: "The best preservative was never a chemical. It's care, whole wheat and a tight seal." },
      { type: "p", text: "Order travel packs from any Thepla House kitchen in Mumbai — and send a little home wherever you're going." },
    ],
  },
  {
    slug: "beginners-guide-gujarati-thali",
    title: "A beginner's guide to the Gujarati thali",
    excerpt: "Dal, kadhi, shaak, rotli and a sweet — how the perfect home-style plate comes together.",
    cat: "culture",
    category: "Food culture",
    date: "Apr 2026",
    datePublished: "2026-04-05",
    read: "7 min read",
    subject: "A full Gujarati thali, top-down on brass",
    alt: "Gujarati thali guide",
    seoTitle: "Gujarati thali, explained — what's on the plate and how to eat it",
    seoDescription:
      "A beginner's guide to the Gujarati thali: dal, kadhi, shaak, rotli, rice, farsan and sweets — the sweet-savoury balance, plus Jain and vegan thali options in Mumbai.",
    keywords: ["Gujarati thali", "what is in a Gujarati thali", "Gujarati thali Mumbai", "Jain thali", "vegan thali", "home-style thali"],
    body: [
      { type: "lead", text: "A Gujarati thali is a whole meal in miniature — sweet, salty, spicy and tangy, all on one brass plate. To a first-timer it can look like a dozen little bowls with no instructions. Here's how the pieces fit together." },
      { type: "h2", text: "The building blocks" },
      { type: "p", text: "Every home-style Gujarati thali is built around a few familiar roles. Once you know them, any thali makes sense." },
      { type: "ul", items: ["Dal — a lightly sweet-and-sour lentil soup, the comforting centre", "Kadhi — silky yoghurt-and-gram-flour curry, tempered with spices", "Shaak — two or three seasonal vegetable dishes, dry and gravied", "Rotli & thepla — soft whole-wheat flatbreads to scoop everything up", "Rice & khichdi — to round off the meal", "Farsan — dhokla, khandvi or a fried snack for crunch", "A sweet — sukhdi, mohanthal or shrikhand, often eaten alongside, not just after"] },
      { type: "h2", text: "The sweet-and-savoury balance" },
      { type: "p", text: "Gujarati cooking is famous for a gentle touch of sweetness — a little jaggery in the dal, a sweet note in the shaak. It isn't dessert; it's balance. The sweetness rounds off the heat and the tang so the whole plate feels harmonious rather than one-note." },
      { type: "h2", text: "How to actually eat it" },
      { type: "p", text: "There's no wrong way, but locals tend to start with a little of everything, tear off some rotli, and mix dal with rice towards the end. Servers traditionally keep refilling the bowls, so pace yourself — a thali is meant to be lingered over." },
      { type: "h2", text: "Jain and vegan thalis" },
      { type: "p", text: "At Thepla House we serve full Jain thalis (no onion, garlic or root vegetables) and vegan thalis (dairy swapped for oil), each clearly tagged. So whether you eat satvik, plant-based or everything, the home-style Gujarati thali is built for you." },
      { type: "quote", text: "A thali isn't a dish. It's a whole afternoon, served on one plate." },
    ],
  },
  {
    slug: "jain-cooking-explained",
    title: "Jain cooking, explained",
    excerpt: "No onion, no garlic, no root vegetables — and still endlessly flavourful. Here's how.",
    cat: "culture",
    category: "Food culture",
    date: "Mar 2026",
    datePublished: "2026-03-18",
    read: "6 min read",
    subject: "Jain thali with labelled bowls",
    alt: "Jain cooking",
    seoTitle: "Jain food, explained — no onion, no garlic, endless flavour",
    seoDescription:
      "What makes food Jain, why root vegetables are left out, and how Jain cooking builds deep flavour without onion or garlic. Order clearly-tagged Jain thalis in Mumbai.",
    keywords: ["Jain food", "Jain thali Mumbai", "no onion no garlic food", "Jain Gujarati food", "satvik food", "Jain catering Mumbai"],
    body: [
      { type: "lead", text: "Jain cooking leaves out onion, garlic and anything that grows underground — and proves that flavour was never hiding there in the first place. For many first-timers, that sounds like cooking with one hand tied behind your back. It isn't." },
      { type: "h2", text: "What makes food Jain" },
      { type: "p", text: "Jain dietary principles are rooted in ahimsa — non-violence. Uprooting a whole plant to eat its root ends the plant's life and disturbs the many tiny organisms in the soil, so root and bulb vegetables are avoided." },
      { type: "ul", items: ["No onion or garlic", "No potato, carrot, beetroot, radish or other roots", "No ginger in its fresh root form (dry ginger is often used)", "Care taken to avoid harm to even the smallest living things"] },
      { type: "h2", text: "Where the flavour comes from instead" },
      { type: "p", text: "Take away onion and garlic and you lean harder on everything else — and the food gets more interesting, not less. Asafoetida (hing) brings a savoury, almost garlicky depth. Tomato, yoghurt and a careful hand with whole spices build body. Roasting, tempering (vaghaar) and fresh herbs do the rest." },
      { type: "ul", items: ["Asafoetida (hing) for savoury depth", "Tomato and yoghurt for richness and tang", "Whole-spice tempering — cumin, mustard, curry leaves", "Fresh coriander, green chilli and lemon to finish"] },
      { type: "h2", text: "Jain food at Thepla House" },
      { type: "p", text: "We cook full Jain menus every day — Jain thalis, Jain farsan and Jain sweets — all 100% vegetarian, whole wheat and free of palm oil and preservatives. They're clearly tagged on every menu, and our kitchens handle full Jain catering for poojas, festivals and functions across Mumbai." },
      { type: "quote", text: "Constraints don't dull a kitchen. They sharpen it." },
    ],
  },
  {
    slug: "5-ways-leftover-theplas",
    title: "5 ways to use leftover theplas",
    excerpt: "Rolls, chaat, croutons and more — quick ideas so nothing goes to waste.",
    cat: "recipes",
    category: "Recipes",
    date: "Mar 2026",
    datePublished: "2026-03-02",
    read: "5 min read",
    subject: "Thepla rolls and chaat made from leftovers",
    alt: "Leftover thepla ideas",
    seoTitle: "5 easy leftover thepla recipes — rolls, chaat & more",
    seoDescription:
      "Five quick ways to use leftover theplas: veggie rolls, thepla chaat, crispy croutons, a thepla pizza and a chai-time snack. Simple home recipes, zero waste.",
    keywords: ["leftover thepla recipes", "thepla roll recipe", "thepla chaat", "what to do with leftover thepla", "easy thepla snacks", "quick Gujarati recipes"],
    body: [
      { type: "lead", text: "A few theplas left from yesterday? Good — that's where some of the best quick meals begin. Because a whole-wheat thepla keeps its texture, it reinvents itself beautifully. Here are five ideas, each five minutes or less." },
      { type: "h2", text: "1. The lunchbox roll" },
      { type: "p", text: "Warm a thepla, spread a thin layer of chundo or green chutney, add grated carrot, cucumber and a little cheese or leftover sabzi, and roll it tight. Wrap in foil — it holds for hours, which makes it a perfect tiffin or travel snack." },
      { type: "h2", text: "2. Thepla chaat" },
      { type: "p", text: "Tear theplas into bite-size pieces, top with chopped onion (skip for Jain), tomato, sev, a spoon of yoghurt, tamarind and green chutney, and a pinch of chaat masala. Two-minute chaat with built-in crunch." },
      { type: "h2", text: "3. Crispy thepla croutons" },
      { type: "p", text: "Cut theplas into small squares and toast them dry in a pan until crisp. Scatter over soup, dal or a salad for a nutty, whole-wheat crunch — far better than store-bought croutons." },
      { type: "h2", text: "4. Quick thepla pizza" },
      { type: "p", text: "Use a thepla as the base: a smear of tomato chutney, leftover veg, a little cheese, and 3 minutes under a lid on a low flame until it melts. A weeknight favourite for kids." },
      { type: "h2", text: "5. Thepla and chai" },
      { type: "p", text: "Sometimes the best idea is the simplest. A warm thepla with a smear of white butter and a cup of masala chai is the most honest snack there is." },
      { type: "ul", items: ["Keep theplas in an airtight box — whole wheat stays soft", "Warm on a dry tawa, not the microwave, to revive the texture", "A jar of chundo or green chutney turns any thepla into a meal"] },
      { type: "quote", text: "Good home food doesn't get thrown away. It gets reinvented." },
    ],
  },
  {
    slug: "undhiyu-winter-on-a-plate",
    title: "Undhiyu: winter on a plate",
    excerpt: "The Surti classic that brings the whole market into one earthen pot.",
    cat: "seasonal",
    category: "Seasonal",
    date: "Feb 2026",
    datePublished: "2026-02-14",
    read: "6 min read",
    subject: "Earthen pot of undhiyu with winter vegetables",
    alt: "Undhiyu",
    seoTitle: "Undhiyu: the Surti winter classic, explained",
    seoDescription:
      "What goes into undhiyu — surti papdi, purple yam, baby potato and muthiya, slow-cooked Surti style. The story of Gujarat's great winter dish, made fresh in Mumbai in season.",
    keywords: ["undhiyu", "Surti undhiyu", "what is undhiyu", "winter Gujarati food", "undhiyu Mumbai", "seasonal Gujarati dishes"],
    body: [
      { type: "lead", text: "Undhiyu is what a Gujarati winter tastes like — surti papdi, purple yam, baby potatoes, sweet potato and muthiya, slow-cooked together until everything melts into everything else. It only happens once a year, and that's exactly why it's special." },
      { type: "h2", text: "A dish named after how it's cooked" },
      { type: "p", text: "The name comes from \"undhu\" — upside down. Traditionally undhiyu was cooked in earthen pots buried upside down in a fire pit, the slow underground heat coaxing flavour out of every vegetable. Most kitchens now use a pot on the stove, but the principle is the same: low, slow and unhurried." },
      { type: "h2", text: "What goes in" },
      { type: "p", text: "Undhiyu is a celebration of the winter market, when Gujarat's vegetables are at their sweetest." },
      { type: "ul", items: ["Surti papdi (the prized winter beans)", "Purple yam (ratalu) and sweet potato", "Baby potatoes and small brinjals", "Muthiya — soft fenugreek-and-flour dumplings", "A green masala of coriander, coconut, green chilli and ginger"] },
      { type: "h2", text: "Why it's worth the wait" },
      { type: "p", text: "Because it's seasonal, undhiyu carries a sense of occasion — it appears around Uttarayan (the kite festival) and disappears with the cold. It's naturally vegan, deeply satisfying, and best eaten with hot puris. At Thepla House we cook it fresh, Surti style, only while the winter vegetables are in their prime." },
      { type: "quote", text: "Some dishes you can have any day. Undhiyu makes you wait — and rewards you for it." },
    ],
  },
  {
    slug: "sunflower-vs-palm-oil",
    title: "Sunflower vs palm oil: why it matters",
    excerpt: "The quiet ingredient that decides how good — and how honest — your food really is.",
    cat: "health",
    category: "Health",
    date: "Feb 2026",
    datePublished: "2026-02-01",
    read: "5 min read",
    subject: "Bottle of sunflower oil beside fresh ingredients",
    alt: "Sunflower oil",
    seoTitle: "Sunflower oil vs palm oil — why we cook with sunflower only",
    seoDescription:
      "Why Thepla House cooks every dish in sunflower oil and never palm oil — the difference for your health, your food's taste, and the planet. No palm oil, no preservatives.",
    keywords: ["sunflower oil vs palm oil", "no palm oil food", "healthy cooking oil", "palm oil free Mumbai", "sunflower oil cooking", "clean Gujarati food"],
    body: [
      { type: "lead", text: "Oil is the ingredient nobody talks about — and the one that quietly decides how a dish sits with you afterwards. We cook with sunflower oil only, never palm. Here's why that one choice matters more than it looks." },
      { type: "h2", text: "Why palm oil is everywhere" },
      { type: "p", text: "Palm oil is cheap, shelf-stable and almost flavourless, which is why it hides inside so much packaged and restaurant food. But it's high in saturated fat, and the way it's produced is linked to large-scale deforestation. It's the easy, invisible shortcut — and shortcuts are exactly what we set out to avoid." },
      { type: "h2", text: "What sunflower oil does differently" },
      { type: "p", text: "Sunflower oil is lighter, higher in unsaturated fats, and has a clean, neutral taste that lets the food speak for itself. It's why our theplas and farsan feel lighter, even when fried, and why nothing we make leaves a heavy aftertaste." },
      { type: "ul", items: ["Lower in saturated fat than palm oil", "A clean, neutral flavour that doesn't mask the food", "No deforestation footprint", "Lighter on the stomach — real home food, not heavy junk"] },
      { type: "h2", text: "One small, stubborn standard" },
      { type: "p", text: "Sunflower oil costs more than palm. We pay it anyway — alongside whole-wheat atta and a no-preservatives rule — because honest home food is the whole promise. It's a quiet decision you'll never see on the plate, but you'll feel it after the meal." },
      { type: "quote", text: "Junk the Junk Food isn't a slogan about taste. It's about what we refuse to put in." },
    ],
  },
  {
    slug: "best-thepla-kandivali-west",
    title: "Where to find the best thepla in Kandivali West",
    excerpt: "Fresh, home-style Gujarati theplas to dine in, take away or order — right in Kandivali West.",
    cat: "local",
    category: "Neighbourhood",
    date: "Jun 2026",
    datePublished: "2026-06-10",
    read: "5 min read",
    subject: "Stack of fresh green methi theplas on a brass plate, Kandivali dine-in",
    alt: "Best thepla in Kandivali West",
    seoTitle: "Best Thepla in Kandivali West — Gujarati Dine-In | Thepla House",
    seoDescription:
      "Looking for the best thepla in Kandivali West? Thepla House by Tejal's Kitchen — 100% vegetarian Gujarati dine-in near Mahavir Nagar. Methi theplas, thalis, farsan. Open 8am–10:30pm.",
    keywords: ["best thepla Kandivali", "thepla Kandivali West", "Gujarati restaurant Kandivali", "thepla dine-in Kandivali", "Gujarati food Mahavir Nagar", "thepla near me Kandivali"],
    body: [
      { type: "lead", text: "If you're in Kandivali West and craving real, home-style Gujarati food, you don't have to settle for the usual. Thepla House by Tejal's Kitchen is a 100% vegetarian dine-in outlet serving fresh methi theplas, full thalis and farsan — a short walk from Mahavir Nagar and the MHADA Colony." },
      { type: "h2", text: "What makes our thepla different" },
      { type: "p", text: "Every thepla is made the way Tejal Shah has made it since 2018: 100% whole-wheat atta, fresh fenugreek, sunflower oil and absolutely no maida, no palm oil and no preservatives. It's ghar ka khana, cooked fresh through the day — not reheated, not cut with shortcuts." },
      { type: "ul", items: ["100% whole-wheat methi, plain, garlic and palak theplas", "Full Gujarati thalis, mini thalis, and Jain & vegan thalis", "Farsan — dhokla, khandvi, patra, handvo, sabudana khichdi", "Sweets — mohanthal, sukhdi, basundi, shrikhand", "Jain and vegan options clearly tagged on every dish"] },
      { type: "h2", text: "Dine in, take away, or order" },
      { type: "p", text: "Our Kandivali West outlet keeps the longest hours of any Thepla House — open daily from 8am to 10:30pm. Drop in for a thepla-and-chai breakfast, sit down for a thali lunch with family, grab farsan on the way home, or order delivery on Swiggy, Zomato and WhatsApp." },
      { type: "h2", text: "Find us in Kandivali West" },
      { type: "p", text: "Thepla House Kandivali is at Shop No 1 & 2, Shreenath Enclave, Hemukalani Cross Road No. 3, Hemu Colony, Irani Wadi, Kandivali West — easy to reach from Kandivali East, Charkop, Borivali and Malad. Whether it's a quick bite or a full family meal, this is home-style Gujarati food done honestly." },
      { type: "quote", text: "The best thepla isn't the fanciest one. It's the one made like home — whole wheat, fresh, no shortcuts." },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export const FEATURED_POST = POSTS[0];
export const REST_POSTS = POSTS.slice(1);

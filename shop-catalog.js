/* Divine Intentions 33 — Shop catalog
   ------------------------------------------------------------------
   The shop pages (index.html#shop) are drawn from this file.

   SOURCE OF TRUTH: the Shopify store (shopdivineintentions33.myshopify.com).
   Every "shopify" item below mirrors an ACTIVE Shopify product — same handle,
   same price, same product page. Checkout always happens on Shopify.
   Synced from Shopify: 2026-11-06 (money bowl price updated same evening).

   Items marked  source: 'site'  are not purchasable on Shopify yet; they
   keep the order link they already had on the website.

   To change which collection something appears in, edit its  in: [...]  list.
   To add a product: copy one entry, change the handle, title, price, etc.

   OPTIONAL LIVE SYNC: paste a Shopify *Storefront API* public access token
   into storefrontToken and prices / sold-out status refresh automatically
   from Shopify every time the page loads (see SHOP-SETUP.md).
   ------------------------------------------------------------------ */
window.DI_SHOP = {
  store: 'https://shopdivineintentions33.myshopify.com',
  storefrontToken: '',
  syncedOn: 'November 6, 2026',

  /* ── Collections, in the order they appear ───────────────────────── */
  collections: [
    {
      key: 'baths', title: 'Spiritual Baths & Cleansing', short: 'Baths & Cleansing',
      desc: 'Botanical ritual baths and cleansers to release what is heavy and welcome renewal.',
      img: 'images/products/sour-bath-poster-600.webp',
      shopifyCollection: 'sacred-ritual-baths'
    },
    {
      key: 'oils', title: 'Sacred Oils & Spiritual Protection', short: 'Oils & Protection',
      desc: 'Hand-blended anointing oils and protection salts for prayer, altar work, and boundaries.',
      img: 'images/products/divine-armour-protection-salt-600.webp',
      shopifyCollection: 'sacred-oils'
    },
    {
      key: 'prosperity', title: 'Manifestation & Prosperity', short: 'Manifestation & Prosperity',
      desc: 'Money bowls, wealth oils, and abundance tools for opening the way to what is yours.',
      img: 'images/products/golden-harvest-styled-600.webp',
      shopifyCollection: 'prosperity-abundance'
    },
    {
      key: 'candles', title: 'Sacred Intention Candles', short: 'Intention Candles',
      desc: 'Hand-poured soy candles layered with crystals, herbs, and a prayer for your intention.',
      img: 'images/products/open-roads-candle.webp',
      shopifyCollection: 'sacred-candles'
    },
    {
      key: 'tools', title: 'Divination & Sacred Tools', short: 'Divination & Tools',
      desc: 'Gemstone pendulums and Tree of Life pieces to support your intuition and practice.',
      img: 'images/products/amethyst-pendulum.webp',
      href: 'crystals.html#pendulum'          /* lives on the Crystals & Tools page */
    },
    {
      key: 'adornments', title: 'Sacred Adornments', short: 'Sacred Adornments',
      desc: 'Handmade intention waistbeads and gemstone bracelets to wear your prayer.',
      img: 'images/waistbeads/red-collection-600.webp',
      shopifyCollection: 'waistbeads'
    },
    {
      key: 'books', title: 'Books, Workbooks & Self-Discovery', short: 'Books & Workbooks',
      desc: 'Poetry, guided journals, and digital guides for returning to yourself.',
      img: 'https://cdn.shopify.com/s/files/1/0773/1648/9306/files/called-by-fire-crowned-by-spirit-cover.webp?v=1792842786&width=600',
      shopifyCollection: 'books-spiritual-guidance'
    },
    {
      key: 'services', title: 'Spiritual Services & Experiences', short: 'Services & Experiences',
      desc: 'Private readings, mediumship, cord cutting, and sacred ceremonies with Madame Divine.',
      img: 'https://cdn.shopify.com/s/files/1/0773/1648/9306/files/PrivateTarotReadingwithCelestialElegance-2_9d6592a1-26d8-4f4d-ab70-3b16a8e3279c.png?v=1792989156&width=600',
      shopifyCollection: 'readings-services',
      note: 'Readings and ceremonies are booked and paid securely in the Shopify store, where you choose your appointment time.'
    }
  ],

  /* Extra tiles shown inside a collection, pointing to a page that already
     has its own ordering (e.g. the crystal bracelets on crystals.html). */
  tiles: [
    { in: 'adornments', title: 'Gemstone Bracelets', desc: 'Stretch and drawstring bracelets in amethyst, tiger’s eye, jasper and more.',
      img: 'images/products/seven-chakra-bracelet.webp', href: 'crystals.html#bracelet', cta: 'Browse Bracelets' },
    { in: 'adornments', title: 'Waistbead Sizing & Care', desc: 'How permanent tie-on strands fit, how to tie them, and how to care for them.',
      img: 'images/waistbeads/white-collection-600.webp', href: '#waistbeads', cta: 'Read the Guide', route: true },
    { in: 'books', title: 'About the Book', desc: 'Read more about Called by Fire, Crowned by Spirit and where else to find it.',
      img: 'https://cdn.shopify.com/s/files/1/0773/1648/9306/files/called-by-fire-crowned-by-spirit-cover.webp?v=1792842786&width=600',
      href: '#book', cta: 'Learn More', route: true }
  ],

  /* ── Products ─────────────────────────────────────────────────────
     stock: number = tracked in Shopify;  null = not tracked (services, digital)
     price: lowest price; from: true when variants differ in price          */
  products: [
    /* Spiritual Baths & Cleansing */
    { handle: 'sour-bath-cleansing-ritual-kit', title: 'Sour Bath — Cleansing Ritual Kit', in: ['baths'], type: 'Ritual Bath',
      price: 56.96, stock: 10, img: 'images/products/sour-bath-poster-600.webp',
      desc: 'Release · Reset · Renew. A botanical cleansing bath for clearing heavy energy and setting fresh boundaries.' },
    { handle: 'sweet-bath-botanical-ritual-kit', title: 'Sweet Bath — Botanical Ritual Kit', in: ['baths'], type: 'Ritual Bath',
      price: 68.29, stock: 10, img: 'images/products/sweet-bath-poster-600.webp',
      desc: 'A sweetening botanical bath for attraction, self-love, and welcoming abundance into your life.' },
    { handle: 'the-sacred-balance-duo-sweet-sour-ritual-bath-bundle', title: 'The Sacred Balance Duo — Sweet + Sour', in: ['baths'], type: 'Bundle',
      price: 103.30, stock: 10, img: 'images/products/sacred-balance-duo-poster-600.webp', featured: true,
      desc: 'Both ritual bath kits together: cleanse first with the Sour Bath, then call in sweetness.' },
    { handle: 'divine-indigo-universal-juju-cleanser', title: 'Divine Indigo — Universal Juju Cleanser', in: ['baths', 'oils'], type: 'Cleanser',
      price: 103.30, stock: 4, img: 'images/products/divine-indigo-juju-cleanser-600.webp',
      desc: '64 fl oz concentrated cleanser for home and sacred-space ritual. Protect your peace, cleanse your space.' },

    /* Sacred Oils & Spiritual Protection */
    { handle: 'divine-armour-healing-duo', title: 'Divine Armour & Healing Duo', in: ['oils'], type: 'Bundle',
      price: 34.30, stock: 10, featured: true,
      img: 'https://cdn.shopify.com/s/files/1/0773/1648/9306/files/divine-armour-healing-duo.jpg?v=1793000703&width=600',
      desc: 'Divine Armour Protection Salt paired with Divine Healing Anointing Oil, with ritual instructions and prayer.' },
    { handle: 'divine-armour-protection-salt', title: 'Divine Armour Protection Salt', in: ['oils'], type: 'Protection Salt',
      price: 17.31, stock: 10, img: 'images/products/divine-armour-protection-salt-600.webp',
      desc: 'For protection-focused prayer, cleansing intentions, and symbolic boundary setting. 3 oz.' },
    { handle: 'divine-anointing-oil', title: 'Divine Anointing Oil', in: ['oils'], type: 'Ritual Oil',
      price: 17.31, stock: 10, img: 'https://cdn.shopify.com/s/files/1/0773/1648/9306/files/IMG_7393.jpg?v=1792999278&width=600',
      desc: 'Rosemary-infused jojoba oil for anointing, altar practice, blessing, and spiritual reflection.' },
    { handle: 'river-of-riches-wealth-oil', title: 'River of Riches Wealth Oil', in: ['oils', 'prosperity'], type: 'Ritual Oil',
      price: 34.64, stock: 7, img: 'https://cdn.shopify.com/s/files/1/0773/1648/9306/files/IMG_8982.jpg?v=1792999274&width=600',
      desc: 'For abundance work and money drawing. Anoint candles, wallets, petitions, and your hands. 0.5 oz.' },
    { source: 'site', title: 'Beloved Self-Love & Attraction Oil', in: ['oils'], type: 'Ritual Oil',
      price: 36.36, img: 'images/products/beloved-oil.webp', url: 'https://tr.ee/01jNLXg6ZY',
      desc: 'Fall in love with yourself first. Use on candles, petitions, or your body to magnetize love and self-worth.' },

    /* Manifestation & Prosperity */
    { handle: 'the-golden-harvest-prosperity-money-bowl-ritual-kit-1', title: 'The Golden Harvest — Prosperity Money Bowl Ritual Kit', in: ['prosperity'], type: 'Ritual Kit',
      price: 91.85, stock: 4, featured: true,
      img: 'images/products/golden-harvest-styled-600.webp',
      desc: 'Plant with intention, nurture with faith, harvest in abundance. A complete money bowl ritual set.' },
    { handle: 'prosperity-intention-candle', title: 'Prosperity Intention Candle', in: ['prosperity', 'candles'], type: 'Candle',
      price: 45.63, stock: 1, img: 'https://cdn.shopify.com/s/files/1/0773/1648/9306/files/prosperity-intention-candle.png?v=1792998889&width=600',
      desc: 'A hand-dressed candle for intentions of abundance, gratitude, and opportunity.' },
    { handle: 'seven-pentacles-of-wealth-digital-activation-kit', title: 'Seven Pentacles of Wealth — Digital Activation Kit', in: ['prosperity', 'books'], type: 'Digital Guide',
      price: 11.76, stock: null, img: 'https://cdn.shopify.com/s/files/1/0773/1648/9306/files/SevenPentaclesWealthActivationKit_f074b85c-0096-408d-8ae9-4b812c4e2c21.png?v=1793006348&width=600',
      desc: 'A digital ritual guide for prosperity-focused prayer and practice with the Seven Pentacles. Instant download.' },

    /* Sacred Intention Candles */
    { source: 'site', title: 'Open Roads Intentional Candle', in: ['candles', 'prosperity'], type: 'Candle',
      price: 45.63, img: 'images/products/open-roads-candle.webp', url: 'https://tr.ee/01jNLXg6ZY',
      desc: 'Madame Divine’s signature candle to remove blockages and open every door meant for you. 15–17 oz soy.' },
    { source: 'site', title: 'Money Candle', in: ['candles'], type: 'Candle', price: 44, icon: '💰', url: 'https://tr.ee/01jNLXg6ZY',
      desc: 'Pyrite · Citrine · Cinnamon · Basil · Bay. To draw financial abundance and open the flow of wealth.' },
    { source: 'site', title: 'Love Candle', in: ['candles'], type: 'Candle', price: 44, icon: '💕', url: 'https://tr.ee/01jNLXg6ZY',
      desc: 'Rose Quartz · Rhodonite · Rose · Lavender · Jasmine. For self-love and calling in reciprocal love.' },
    { source: 'site', title: 'Court Candle', in: ['candles'], type: 'Candle', price: 44, icon: '⚖️', url: 'https://tr.ee/01jNLXg6ZY',
      desc: 'Calendula · Clear Quartz · Oregano · Licorice Root. For legal matters, disputes, and fair outcomes.' },
    { source: 'site', title: 'Fertility Candle', in: ['candles'], type: 'Candle', price: 44, icon: '🌱', url: 'https://tr.ee/01jNLXg6ZY',
      desc: 'Moonstone · Green Aventurine · Red Raspberry Leaf · Mugwort. Honoring the sacred creative force.' },
    { source: 'site', title: 'Road Opener Candle', in: ['candles'], type: 'Candle', price: 44, icon: '🛣️', url: 'https://tr.ee/01jNLXg6ZY',
      desc: 'Citrine · Tiger’s Eye · Open Roads blend. To clear obstacles and create movement.' },
    { source: 'site', title: 'Protection Candle', in: ['candles'], type: 'Candle', price: 44, icon: '🛡️', url: 'https://tr.ee/01jNLXg6ZY',
      desc: 'Black Tourmaline · Obsidian · Rue · Rosemary. To seal your energy and shield your home.' },
    { source: 'site', title: 'Aura Candle', in: ['candles'], type: 'Candle', price: 44, icon: '✨', url: 'https://tr.ee/01jNLXg6ZY',
      desc: 'Selenite · Amethyst · Frankincense · Lavender. To cleanse and brighten your auric field.' },
    { source: 'site', title: 'Evil Eye Candle', in: ['candles'], type: 'Candle', price: 44, icon: '🧿', url: 'https://tr.ee/01jNLXg6ZY',
      desc: 'Blue Kyanite · Black Obsidian · Rue · Hyssop. To deflect envy and restore natural protection.' },
    { source: 'site', title: 'Custom Intention Candle', in: ['candles'], type: 'Candle', price: 66, icon: '🕯️', url: 'https://instagram.com/unforgettable_emz', cta: 'DM to Create',
      desc: 'A candle created with you around your own intention. Message Madame Divine to begin.' },

    /* Sacred Adornments — handmade waistbeads (choose your strand on Shopify) */
    { handle: 'red-waistbeads-collection', title: 'The Red Collection — Waistbeads', in: ['adornments'], type: 'Waistbeads', price: 15, from: true, stock: 10, img: 'images/waistbeads/red-collection-600.webp',
      desc: 'Passion · Confidence · Radiance · Power. Seven strands, including Red Garnet and Carnelian.' },
    { handle: 'blue-waistbeads-collection', title: 'The Blue Collection — Waistbeads', in: ['adornments'], type: 'Waistbeads', price: 15, from: true, stock: 11, img: 'images/waistbeads/blue-collection-600.webp',
      desc: 'Flow · Healing · Feminine Energy. Including Yemaya Inspired and Kyanite & Blue Aventurine.' },
    { handle: 'green-waistbeads-collection', title: 'The Green Collection — Waistbeads', in: ['adornments'], type: 'Waistbeads', price: 15, from: true, stock: 7, img: 'images/waistbeads/green-collection-600.webp',
      desc: 'Abundance · Healing · Protection · Growth. Gemstone protection strands and Spring Mix.' },
    { handle: 'white-waistbeads-collection', title: 'The White Collection — Waistbeads', in: ['adornments'], type: 'Waistbeads', price: 15, from: true, stock: 8, img: 'images/waistbeads/white-collection-600.webp',
      desc: 'Radiance · Elevation · Purity. The Golden Veil, Heaven’s Glow, and Celestial Veil.' },
    { handle: 'brown-bronze-waistbeads-collection', title: 'The Brown / Bronze Collection — Waistbeads', in: ['adornments'], type: 'Waistbeads', price: 15, from: true, stock: 10, img: 'images/waistbeads/brown-bronze-collection-600.webp',
      desc: 'Grounding · Abundance · Earth Energy. Including The Tiger’s Crown in honey tiger’s eye.' },
    { handle: 'pink-waistbeads-collection', title: 'The Pink Collection — Waistbeads', in: ['adornments'], type: 'Waistbeads', price: 15, from: true, stock: 5, img: 'images/waistbeads/pink-collection-600.webp',
      desc: 'Self-Love · Attraction. Including Sacred Heart in rose quartz.' },
    { handle: 'purple-waistbeads-collection', title: 'The Purple Collection — Waistbeads', in: ['adornments'], type: 'Waistbeads', price: 15, stock: 4, img: 'images/waistbeads/purple-collection-600.webp',
      desc: 'Aura Enhancement. Mystic Crown, Enchanted Aura, and Irresistible Aura.' },
    { handle: 'yellow-waistbeads-collection', title: 'The Yellow Collection — Waistbeads', in: ['adornments'], type: 'Waistbeads', price: 15, stock: 6, img: 'images/waistbeads/yellow-collection-600.webp',
      desc: 'Joy · Radiance. Sunny Bliss, Pink Aura, Cinnamon, and Aura Yellow.' },
    { handle: 'orange-waistbeads-collection', title: 'The Orange Collection — Waistbeads', in: ['adornments'], type: 'Waistbeads', price: 15, stock: 5, img: 'images/waistbeads/orange-collection-600.webp',
      desc: 'Energy · Confidence. Solar Glow and Ember Essence.' },
    { handle: 'black-waistbeads-collection', title: 'The Black Collection — Waistbeads', in: ['adornments'], type: 'Waistbeads', price: 15, stock: 3, img: 'images/waistbeads/black-collection-600.webp',
      desc: 'Protection · Grounding · Power. Blk Sphinx with gold accents and All Black Matte.' },
    { handle: 'fusion-waistbeads-collection', title: 'The Fusion Collection — Waistbeads', in: ['adornments'], type: 'Waistbeads', price: 8, from: true, stock: 18, img: 'images/waistbeads/fusion-collection-600.webp',
      desc: 'Versatility · Expression · Culture. Including Juneteenth, Euphoria, and B&W.' },

    /* Books, Workbooks & Self-Discovery */
    { handle: 'called-by-fire-crowned-by-spirit', title: 'Called by Fire, Crowned by Spirit — Signed Author Edition', in: ['books'], type: 'Book',
      price: 34.88, priceNote: 'shipping included', stock: 4, featured: true,
      img: 'https://cdn.shopify.com/s/files/1/0773/1648/9306/files/called-by-fire-crowned-by-spirit-cover.webp?v=1792842786&width=600',
      desc: 'Original poetry by Emile Maria Rivera — Madame Divine — personally signed.' },
    { handle: '30-days-of-returning-to-yourself-digital-guided-journal', title: '30 Days of Returning to Yourself', in: ['books'], type: 'Guided Journal',
      price: 19.88, stock: null, img: 'https://cdn.shopify.com/s/files/1/0773/1648/9306/files/DivineIntentions_ReturningtoYourself_1.png?v=1793686323&width=600',
      desc: 'A 30-day digital guided journal for self-love, healing, and sacred boundaries. Instant download.' },
    { handle: 'my-sacred-boundaries-digital-guided-workbook', title: 'My Sacred Boundaries', in: ['books'], type: 'Workbook',
      price: 16.79, stock: null, img: 'https://cdn.shopify.com/s/files/1/0773/1648/9306/files/30DaysofReturningtoYourselfBook_ece49d8e-1f26-4028-91d9-5bf7e781e41b.png?v=1793687278&width=600',
      desc: 'A digital guided workbook for protecting your peace and honoring your standards. Instant download.' },

    /* Spiritual Services & Experiences (booked on Shopify) */
    { handle: 'private-reading-session-15-minutes', title: 'Private Reading — 15 Minutes', in: ['services'], type: 'Private Reading', service: true,
      price: 36.36, img: 'https://cdn.shopify.com/s/files/1/0773/1648/9306/files/Elegant15-minutetarotreading.png?v=1792988757&width=600',
      desc: 'A focused private virtual session for one concise question or area of your life.' },
    { handle: 'private-reading-session-30-minutes', title: 'Private Reading — 30 Minutes', in: ['services'], type: 'Private Reading', service: true,
      price: 73.43, img: 'https://cdn.shopify.com/s/files/1/0773/1648/9306/files/DivineIntentionsPrivateTarotReading-1_7cc75603-ef59-4aa5-9e24-bd47fad30a51.png?v=1792989099&width=600',
      desc: 'Time to explore your questions through psychic, tarot, and intuitive guidance.' },
    { handle: 'private-reading-session-1-hour', title: 'Private Reading — 60 Minutes', in: ['services'], type: 'Private Reading', service: true, featured: true,
      price: 114.63, img: 'https://cdn.shopify.com/s/files/1/0773/1648/9306/files/PrivateTarotReadingwithCelestialElegance-2_9d6592a1-26d8-4f4d-ab70-3b16a8e3279c.png?v=1792989156&width=600',
      desc: 'A full, in-depth one-on-one reading with Madame Divine, delivered privately.' },
    { handle: 'mediumship-reading-45-minutes', title: 'Private Mediumship — 45 Minutes', in: ['services'], type: 'Private Reading', service: true,
      price: 228.94, img: 'https://cdn.shopify.com/s/files/1/0773/1648/9306/files/Ivoryandgoldmediumshipreading-3.png?v=1792988915&width=600',
      desc: 'A private mediumship session centered on meaningful reflection and connection.' },
    { handle: 'cord-cutting-ritual-with-madame-divine', title: 'Cord Cutting Ritual — Release, Sever & Reclaim', in: ['services'], type: 'Ceremony', service: true, featured: true,
      price: 193.93, img: 'https://cdn.shopify.com/s/files/1/0773/1648/9306/files/Cord_Cutting_Ritual__Divine_Intentions.png?v=1793809549&width=600',
      desc: 'A guided intake, a 20-minute consultation, and an approximately one-hour ceremony. Tuesdays.',
      more: { href: 'cord-cutting.html', label: 'About the ritual' } },
    { handle: 'custom-honey-jar', title: 'Private Honey Jar Ceremony', in: ['services'], type: 'Ceremony', service: true,
      price: 206.29, img: 'https://cdn.shopify.com/s/files/1/0773/1648/9306/files/custom-honey-jar.png?v=1792998895&width=600',
      desc: 'A private sweetening ceremony centered on your own growth and aligned intentions. Begins with an intake.',
      more: { href: 'honey-jar.html', label: 'Start with the intake' } },
    { handle: 'shadow-work-reading', title: 'LIVE Shadow Work Reading', in: ['services'], type: 'Live Reading', service: true,
      price: 56.96, img: 'https://cdn.shopify.com/s/files/1/0773/1648/9306/files/CD664BA5-8959-4F9E-9CA4-C25E64A062B8.png?v=1793219465&width=600',
      desc: 'A reflective reading exploring patterns and opportunities for growth, during a live stream.' },
    { handle: 'twin-flame-reading', title: 'LIVE Twin Flame Reading', in: ['services'], type: 'Live Reading', service: true,
      price: 56.96, img: 'https://cdn.shopify.com/s/files/1/0773/1648/9306/files/771DF050-2DB0-496B-A64F-52CF7014E41D.png?v=1793219140&width=600',
      desc: 'Explores the spiritual dynamics of an intense, magnetic connection, during a live stream.' },
    { handle: 'full-general-reading', title: 'LIVE General Intuitive Reading', in: ['services'], type: 'Live Reading', service: true,
      price: 62.11, img: 'https://cdn.shopify.com/s/files/1/0773/1648/9306/files/2CD86E74-A551-4944-AD85-F56BC9797673.png?v=1793218862&width=600',
      desc: 'An open, comprehensive reading of the messages spirit brings forward for you.' },
    { handle: 'one-topic-full-reading', title: 'LIVE One Topic Full Reading', in: ['services'], type: 'Live Reading', service: true,
      price: 51.81, img: 'https://cdn.shopify.com/s/files/1/0773/1648/9306/files/53A06B4B-6E07-4754-81A7-098509DEA00E.png?v=1793221446&width=600',
      desc: 'Go deep into one specific area of your life.' },
    { handle: 'big-juicy-reading', title: 'LIVE Big Juicy Reading — She Spills All the Tea!', in: ['services'], type: 'Live Reading', service: true,
      price: 46.08, img: 'https://cdn.shopify.com/s/files/1/0773/1648/9306/files/C26EB075-E5F5-464C-82EF-EF6C125BDB02.png?v=1793220053&width=600',
      desc: 'Madame Divine’s original fan-favorite reading. You wanted the tea — this is the whole pot.' },
    { handle: 'spirit-led-3-card-reading', title: 'LIVE Spirit-Led 3-Card Reading', in: ['services'], type: 'Live Reading', service: true,
      price: 15.76, img: 'https://cdn.shopify.com/s/files/1/0773/1648/9306/files/0BF83293-31F5-48D1-A4A8-096EBBDAD770.png?v=1793218007&width=600',
      desc: 'A concise three-card reading for guidance and reflection, during a live stream.' },
    { handle: 'timeline-reading', title: 'LIVE Timeline Reading — When Will It Happen?', in: ['services'], type: 'Live Reading', service: true,
      price: 12.67, img: 'https://cdn.shopify.com/s/files/1/0773/1648/9306/files/49B10410-8E0D-4D21-8C05-3E56BA755E11.png?v=1793218599&width=600',
      desc: 'One specific question about the timing of an event or situation.' },
    { handle: 'soul-blueprint-reading', title: 'Soul Blueprint Report', in: ['services'], type: 'Digital Reading', service: true,
      price: 82.70, img: 'https://cdn.shopify.com/s/files/1/0773/1648/9306/files/5DC70BEB-3B66-463F-BA88-67BDAB861081.png?v=1793220330&width=600',
      desc: 'A personalized report — a map of your soul, thoughtfully prepared by Madame Divine.' },
    { handle: 'astro-dice-reading', title: 'Astro Dice Reading', in: ['services'], type: 'Digital Reading', service: true,
      price: 36.36, img: 'https://cdn.shopify.com/s/files/1/0773/1648/9306/files/divine-intentions-33-astro-dice-reading.png?v=1793217310&width=600',
      desc: 'A personalized digital reading on what is happening, how you feel, and where it lives in your life.' },
    { handle: '15-minute-private-reading-digital-gift-voucher', title: 'Gift Voucher — 15-Minute Private Reading', in: ['services'], type: 'Gift Voucher', service: true,
      price: 36.36, img: 'https://cdn.shopify.com/s/files/1/0773/1648/9306/files/Luxuryclarityreadinggiftvoucher-1.png?v=1792994276&width=600',
      desc: 'Give the gift of clarity — a digital voucher for a private reading.' },
    { handle: '30-minute-private-reading-digital-gift-voucher', title: 'Gift Voucher — 30-Minute Private Reading', in: ['services'], type: 'Gift Voucher', service: true,
      price: 73.43, img: 'https://cdn.shopify.com/s/files/1/0773/1648/9306/files/Divine_Clarity_Gift_Voucher-2.png?v=1792994571&width=600',
      desc: 'Give the gift of clarity — a digital voucher for a private reading.' },
    { handle: '30-minute-private-reading-digital-gift-voucher-copy', title: 'Gift Voucher — 60-Minute Private Reading', in: ['services'], type: 'Gift Voucher', service: true,
      price: 114.63, img: 'https://cdn.shopify.com/s/files/1/0773/1648/9306/files/DivineIntentions33ClarityGiftVoucher-4.png?v=1792995255&width=600',
      desc: 'Give the gift of clarity — a digital voucher for a private reading.' },
    { handle: '60-minute-private-reading-digital-gift-voucher-copy', title: 'Gift Voucher — 45-Minute Mediumship', in: ['services'], type: 'Gift Voucher', service: true,
      price: 228.94, img: 'https://cdn.shopify.com/s/files/1/0773/1648/9306/files/DivineIntentions33GiftVoucher-3.png?v=1792995632&width=600',
      desc: 'Give the gift of meaningful reflection — a digital voucher for private mediumship.' }
  ]
};

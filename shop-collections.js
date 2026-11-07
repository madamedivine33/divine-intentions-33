/* Divine Intentions 33 — Sacred Collections shop
   Draws index.html#shop from window.DI_SHOP (shop-catalog.js).

   Routes (handled together with site-nav.js):
     #shop             → collection landing ("Explore the Sacred Collections")
     #shop/all         → every offering, filterable by collection
     #shop/<key>       → one collection, e.g. #shop/baths, #shop/services
   Checkout always happens on Shopify; this page only links to it. */
(function () {
  'use strict';

  var D = window.DI_SHOP;
  var root = document.getElementById('diShop');
  if (!D || !root) return;

  var COLS = D.collections;
  var byKey = {};
  COLS.forEach(function (c) { byKey[c.key] = c; });
  var state = { view: null, chip: 'all', avail: false, sort: 'featured' };

  /* ── helpers ── */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }
  function money(n) {
    var whole = Math.round(n * 100) % 100 === 0;
    return '$' + (whole ? String(Math.round(n)) : n.toFixed(2));
  }
  function urlOf(p) { return p.url || (D.store + '/products/' + p.handle); }
  function inCol(key) { return D.products.filter(function (p) { return p.in.indexOf(key) !== -1; }); }
  function tilesFor(key) { return (D.tiles || []).filter(function (t) { return key === 'all' || t.in === key; }); }

  // Taíno-inspired sun: a spiral centre inside a ringed disc, with rays
  function sun(cls) {
    var rays = '';
    for (var i = 0; i < 12; i++) {
      var a = i * Math.PI / 6, long = i % 2 === 0;
      var r1 = 19.5, r2 = long ? 27 : 24;
      var x1 = 32 + r1 * Math.cos(a), y1 = 32 + r1 * Math.sin(a), x2 = 32 + r2 * Math.cos(a), y2 = 32 + r2 * Math.sin(a);
      rays += '<line x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '"/>';
      if (long) rays += '<circle cx="' + (32 + 30 * Math.cos(a)).toFixed(1) + '" cy="' + (32 + 30 * Math.sin(a)).toFixed(1) + '" r="1.4" fill="currentColor" stroke="none"/>';
    }
    return '<svg class="' + (cls || '') + '" viewBox="0 0 64 64" aria-hidden="true" focusable="false"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">' +
      '<circle cx="32" cy="32" r="15"/><circle cx="32" cy="32" r="11.5" stroke-width="1" opacity=".6"/>' +
      '<path d="M32 32c0-1.4 1.6-2 2.6-1 1.6 1.5.4 4.4-2 4.6-3.2.3-5.2-3-4.2-5.8 1.2-3.6 6-4.8 8.8-2.4 3 2.6 2.4 7.6-1 9.6"/>' +
      rays + '</g></svg>';
  }
  var ARROW = '<svg viewBox="0 0 14 10" aria-hidden="true" focusable="false"><path d="M1 5h11M8 1l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>';

  function availability(p) {
    if (p.source === 'site') return { cls: 'req', text: 'Order by request', now: true };
    if (p.soldOut || p.stock === 0) return { cls: 'out', text: 'Sold out', now: false };
    if (p.service) return { cls: 'svc', text: p.type === 'Gift Voucher' ? 'Digital gift voucher' : 'Booking open', now: true };
    if (p.stock == null) return { cls: 'svc', text: 'Digital download', now: true };
    if (p.stock <= 3) return { cls: 'low', text: 'Only ' + p.stock + ' left', now: true };
    return { cls: '', text: 'In stock', now: true };
  }
  function ctaLabel(p, av) {
    if (p.cta) return p.cta;
    if (p.source === 'site') return 'Request to Order';
    if (!av.now) return 'View Details';
    if (p.type === 'Gift Voucher') return 'Buy Gift';
    if (p.service) return 'Book Now';
    if (p.type === 'Waistbeads') return 'Choose Strand';
    return 'Shop Now';
  }

  /* ── cards ── */
  function productCard(p) {
    var av = availability(p), url = urlOf(p), label = ctaLabel(p, av);
    var ext = ' target="_blank" rel="noopener"';
    var badge = !av.now ? '<span class="dis-badge out">Sold out</span>'
      : p.featured ? '<span class="dis-badge feat">Featured</span>'
      : av.cls === 'low' ? '<span class="dis-badge">Limited</span>' : '';
    var media = p.img
      ? '<img src="' + esc(p.img) + '" alt="" loading="lazy" decoding="async" width="600" height="750">'
      : '<span class="dis-card-emblem">' + sun() + '<span class="e" aria-hidden="true">' + esc(p.icon || '✦') + '</span></span>';
    var price = (p.from ? '<span class="from">From</span>' : '') + money(p.price) + (p.priceNote ? '<small>' + esc(p.priceNote) + '</small>' : '');
    var more = p.more ? '<a class="dis-more" href="' + esc(p.more.href) + '">' + esc(p.more.label) + '</a>' : '';
    return '<li><article class="dis-card' + (av.now ? '' : ' is-out') + '">' +
      '<a class="dis-card-img" href="' + esc(url) + '"' + ext + ' tabindex="-1" aria-hidden="true">' + badge + media + '</a>' +
      '<div class="dis-card-body">' +
        '<span class="dis-type">' + esc(p.type) + '</span>' +
        '<h3 class="dis-name"><a href="' + esc(url) + '"' + ext + '>' + esc(p.title) + '</a></h3>' +
        (p.desc ? '<p class="dis-desc">' + esc(p.desc) + '</p>' : '') +
        '<div class="dis-meta"><span class="dis-price">' + price + '</span><span class="dis-avail ' + av.cls + '">' + esc(av.text) + '</span></div>' +
        '<div class="dis-actions"><a class="dis-btn' + (av.now ? '' : ' dis-btn-ghost') + '" href="' + esc(url) + '"' + ext +
          ' aria-label="' + esc(label + ': ' + p.title) + '">' + esc(label) + '</a>' + more + '</div>' +
      '</div></article></li>';
  }
  function tileCard(t) {
    var route = t.route ? ' data-route' : '';
    return '<li><article class="dis-card dis-tile">' +
      '<a class="dis-card-img" href="' + esc(t.href) + '"' + route + ' tabindex="-1" aria-hidden="true"><img src="' + esc(t.img) + '" alt="" loading="lazy" decoding="async" width="600" height="750"></a>' +
      '<div class="dis-card-body"><span class="dis-type">Also in the Botánica</span><h3 class="dis-name"><a href="' + esc(t.href) + '"' + route + '>' + esc(t.title) + '</a></h3>' +
      '<p class="dis-desc">' + esc(t.desc) + '</p>' +
      '<div class="dis-actions"><a class="dis-btn dis-btn-ghost" href="' + esc(t.href) + '"' + route + '>' + esc(t.cta) + '</a></div></div></article></li>';
  }

  /* ── views ── */
  function head(label, title, sub, crumbs, actions) {
    return '<header class="dis-head">' +
      (crumbs ? '<nav class="dis-crumb" aria-label="Breadcrumb">' + crumbs + '</nav>' : '<span class="section-label">' + label + '</span>') +
      '<h2 class="section-title" tabindex="-1">' + title + '</h2>' +
      '<div class="dis-orn">' + sun() + '</div>' +
      '<p class="section-sub">' + sub + '</p>' + (actions || '') + '</header>';
  }

  function renderLanding() {
    var cards = COLS.map(function (c) {
      var n = inCol(c.key).length;
      if (!c.href && n === 0) return '';                       // only collections with offerings
      var href = c.href || ('#shop/' + c.key);
      var route = c.href ? '' : ' data-route';
      var count = c.href ? 'Crystals &amp; Tools' : n + (n === 1 ? ' offering' : ' offerings');
      return '<li><a class="dis-col" href="' + esc(href) + '"' + route + '>' +
        '<span class="dis-col-img"><img src="' + esc(c.img) + '" alt="" loading="lazy" decoding="async" width="600" height="450"><span class="dis-col-count">' + count + '</span></span>' +
        '<span class="dis-col-body">' + sun('dis-col-mark') +
          '<span class="dis-col-title">' + esc(c.title) + '</span>' +
          '<span class="dis-col-desc">' + esc(c.desc) + '</span>' +
          '<span class="dis-col-cta">Explore Collection ' + ARROW + '</span>' +
        '</span></a></li>';
    }).join('');
    root.innerHTML =
      head('Divine Intentions Botánica', 'Explore the Sacred Collections',
        'Intentional offerings for cleansing, protection, prosperity, self-discovery, and spiritual alignment.', null,
        '<div class="dis-head-actions"><a class="dis-btn dis-btn-ghost" href="#shop/all" data-route>Shop All Offerings</a></div>') +
      '<ul class="dis-collections">' + cards + '</ul>' +
      '<div class="dis-shopall"><a class="dis-btn" href="#shop/all" data-route>Shop All ' + ARROW + '</a></div>';
  }

  function switcher(current) {
    var links = [{ key: 'all', short: 'Shop All' }].concat(COLS).map(function (c) {
      if (c.key !== 'all' && !c.href && inCol(c.key).length === 0) return '';
      var href = c.href || ('#shop/' + c.key);
      return '<a href="' + esc(href) + '"' + (c.href ? '' : ' data-route') + (c.key === current ? ' aria-current="page"' : '') + '>' + esc(c.short) + '</a>';
    }).join('');
    return '<nav class="dis-switch" aria-label="Collections">' + links + '</nav>';
  }

  function renderList(key) {
    var isAll = key === 'all', c = byKey[key];
    var items = isAll ? D.products.slice() : inCol(key);
    var crumbs = '<a href="#shop" data-route>Shop</a><span aria-hidden="true">✦</span><span>' + (isAll ? 'All Offerings' : esc(c.short)) + '</span>';
    var title = isAll ? 'All Offerings' : esc(c.title);
    var sub = isAll ? 'Everything in the Botánica, in one place. Filter by collection or sort to find your offering.' : esc(c.desc);

    // filter chips: collections on Shop All, product types inside a collection
    var chips = [];
    if (isAll) {
      COLS.forEach(function (col) { var n = inCol(col.key).length; if (n) chips.push({ id: col.key, label: col.short, n: n }); });
    } else {
      var seen = {};
      items.forEach(function (p) { seen[p.type] = (seen[p.type] || 0) + 1; });
      Object.keys(seen).forEach(function (t) { chips.push({ id: t, label: t, n: seen[t] }); });
    }
    if (chips.map(function (x) { return x.id; }).indexOf(state.chip) === -1) state.chip = 'all';

    var chipHtml = chips.length > 1 ? '<div class="dis-chips" role="group" aria-label="Filter">' +
      '<button type="button" class="dis-chip" data-chip="all" aria-pressed="' + (state.chip === 'all') + '">All<span class="n">' + items.length + '</span></button>' +
      chips.map(function (x) {
        return '<button type="button" class="dis-chip" data-chip="' + esc(x.id) + '" aria-pressed="' + (state.chip === x.id) + '">' + esc(x.label) + '<span class="n">' + x.n + '</span></button>';
      }).join('') + '</div>' : '<div></div>';

    var hasStock = items.some(function (p) { return !availability(p).now; });
    var controls = '<div class="dis-controls">' +
      (hasStock ? '<label class="dis-check"><input type="checkbox" data-avail' + (state.avail ? ' checked' : '') + '> Available now</label>' : '') +
      '<label class="dis-sort">Sort <select data-sort>' +
        [['featured', 'Featured'], ['price-asc', 'Price: low to high'], ['price-desc', 'Price: high to low'], ['name', 'Name A–Z']].map(function (o) {
          return '<option value="' + o[0] + '"' + (state.sort === o[0] ? ' selected' : '') + '>' + o[1] + '</option>';
        }).join('') + '</select></label></div>';

    // apply filter + sort
    var shown = items.filter(function (p) {
      if (state.chip !== 'all' && (isAll ? p.in.indexOf(state.chip) === -1 : p.type !== state.chip)) return false;
      if (state.avail && !availability(p).now) return false;
      return true;
    });
    var order = D.products.indexOf.bind(D.products);
    shown.sort(function (a, b) {
      var ao = availability(a).now ? 0 : 1, bo = availability(b).now ? 0 : 1;
      if (ao !== bo) return ao - bo;                                   // sold-out items always last
      if (state.sort === 'price-asc') return a.price - b.price;
      if (state.sort === 'price-desc') return b.price - a.price;
      if (state.sort === 'name') return a.title.localeCompare(b.title);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || order(a) - order(b);
    });

    var tiles = state.chip === 'all' && !state.avail ? tilesFor(isAll ? '__none' : key) : [];
    var grid = shown.length
      ? '<ul class="dis-grid">' + shown.map(productCard).join('') + tiles.map(tileCard).join('') + '</ul>'
      : '<div class="dis-empty">Nothing matches those filters right now.<br><button type="button" class="dis-btn dis-btn-ghost" data-reset>Show everything</button></div>';

    root.innerHTML = head('', title, sub, crumbs) + switcher(key) +
      (c && c.note ? '<p class="dis-note">' + esc(c.note) + '</p>' : '') +
      '<div class="dis-toolbar">' + chipHtml + controls + '</div>' +
      '<p class="dis-count" aria-live="polite">' + shown.length + (shown.length === 1 ? ' offering' : ' offerings') + '</p>' +
      grid +
      '<div class="dis-back"><a class="dis-btn dis-btn-ghost" href="#shop" data-route>← All Collections</a></div>';
  }

  function toggleStatic(isLanding) {
    var page = document.getElementById('shop');
    page.querySelectorAll('[data-show]').forEach(function (el) {
      el.hidden = el.getAttribute('data-show') !== (isLanding ? 'landing' : 'list');
    });
  }

  function show(key, focus) {
    key = key || '';
    var c = byKey[key];
    if (c && c.href) { location.href = c.href; return; }            // e.g. tools live on crystals.html
    if (key && key !== 'all' && !c) key = '';
    if (state.view !== key) state.chip = 'all';
    state.view = key;
    if (key) renderList(key); else renderLanding();
    toggleStatic(!key);
    if (focus) { var h = root.querySelector('h2'); if (h) h.focus({ preventScroll: true }); }
  }

  /* ── events ── */
  root.addEventListener('click', function (e) {
    var chip = e.target.closest('[data-chip]');
    if (chip) { state.chip = chip.getAttribute('data-chip'); renderList(state.view); var b = root.querySelector('[data-chip="' + state.chip + '"]'); if (b) b.focus(); return; }
    if (e.target.closest('[data-reset]')) { state.chip = 'all'; state.avail = false; renderList(state.view); }
  });
  root.addEventListener('change', function (e) {
    if (e.target.matches('[data-sort]')) { state.sort = e.target.value; renderList(state.view); var s = root.querySelector('[data-sort]'); if (s) s.focus(); }
    if (e.target.matches('[data-avail]')) { state.avail = e.target.checked; renderList(state.view); var a = root.querySelector('[data-avail]'); if (a) a.focus(); }
  });

  // site-nav.js announces every in-page route change
  document.addEventListener('di:route', function (e) {
    var parts = e.detail || [];
    if (parts[0] === 'shop') show(parts[1], e.detail.user);
  });

  show('', false);

  /* ── Optional live sync with Shopify (prices + sold-out status) ── */
  if (D.storefrontToken) {
    var handles = D.products.filter(function (p) { return p.handle; });
    fetch(D.store + '/api/2024-10/graphql.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': D.storefrontToken },
      body: JSON.stringify({ query: '{ products(first: 100) { nodes { handle availableForSale priceRange { minVariantPrice { amount } } } } }' })
    }).then(function (r) { return r.json(); }).then(function (json) {
      var live = {};
      ((json.data && json.data.products && json.data.products.nodes) || []).forEach(function (n) { live[n.handle] = n; });
      handles.forEach(function (p) {
        var n = live[p.handle];
        if (!n) return;
        p.price = parseFloat(n.priceRange.minVariantPrice.amount);
        p.soldOut = !n.availableForSale;
      });
      show(state.view, false);
    }).catch(function () { /* keep the saved catalog if Shopify can't be reached */ });
  }
})();

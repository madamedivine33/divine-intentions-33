/* Soul Tribe Reviews — Divine Intentions 33 by Madame Divine
   Shared by index.html (Reviews page + homepage feature) and leave-a-review/.

   Mount points (add any of these to a page):
     <div data-st-review-form></div>      the "Leave a Review" form
     <div data-st-review-gallery></div>   the approved-review gallery with filters
     <div data-st-review-featured data-st-more="#reviews"></div>  homepage selection

   Only reviews Madame Divine has approved (and the customer allowed to be public)
   are ever shown. Nothing here invents, edits, or re-rates a review. */
(function () {
  'use strict';

  var CFG = window.DI_REVIEWS_CONFIG || {};
  var ENDPOINT = (CFG.endpoint || '').trim();

  var CATEGORIES = [
    { group: 'Services', items: [
      ['spiritual-reading', 'Spiritual Reading'],
      ['cord-cutting', 'Cord Cutting Ritual'],
      ['other-service', 'Another Service']
    ] },
    { group: 'Products', items: [
      ['spiritual-bath', 'Spiritual Bath'],
      ['spiritual-oil', 'Spiritual Oil'],
      ['waistbeads', 'Waistbeads'],
      ['workbook', 'Workbook'],
      ['pendulum', 'Pendulum'],
      ['other-product', 'Another Product']
    ] }
  ];

  var ERRORS = {
    invalid_name: 'Please add the name you’d like shown (up to 60 characters).',
    invalid_rating: 'Please choose a star rating.',
    invalid_category: 'Please choose what you’re reviewing.',
    invalid_item: 'Please keep the product or service name under 80 characters.',
    invalid_text: 'Please write at least a sentence about your experience (up to 2,500 characters).',
    too_many_links: 'Please remove the web links from your review.',
    invalid_email: 'That email address doesn’t look quite right. It’s optional, so you can also leave it blank.',
    invalid_permission: 'Please choose whether your review may be shared publicly.',
    invalid_photo: 'That photo couldn’t be used. Please choose a JPG, PNG, or WebP image.',
    too_large: 'That photo is too large. Please choose a smaller one.',
    verification_failed: 'We couldn’t confirm you’re human. Please try the check again.',
    busy: 'We’re receiving a lot of reviews right now. Please try again in a few minutes.',
    network: 'Your review couldn’t be sent. Please check your connection and try again. Your words are still here.',
    server_error: 'Something went wrong on our side. Please try again in a moment. Your words are still here.'
  };

  var SUN = '<svg class="st-sun" viewBox="0 0 64 64" aria-hidden="true" focusable="false">' +
    '<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">' +
    '<circle cx="32" cy="32" r="11"/><path d="M32 27.5a4.5 4.5 0 1 1-4.5 4.5 2.3 2.3 0 0 1 2.3-2.3"/>' +
    '<path d="M32 6v8M32 50v8M6 32h8M50 32h8M13.6 13.6l5.6 5.6M44.8 44.8l5.6 5.6M50.4 13.6l-5.6 5.6M19.2 44.8l-5.6 5.6"/>' +
    '<path d="M29 6.5l3-3 3 3M29 57.5l3 3 3-3M6.5 29l-3 3 3 3M57.5 29l3 3-3 3"/></g></svg>';

  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === 'text') n.textContent = attrs[k];
      else if (k === 'html') n.innerHTML = attrs[k];
      else n.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }

  function starsText(n) { return '★★★★★'.slice(0, n) + '☆☆☆☆☆'.slice(0, 5 - n); }

  function formatDate(iso) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(iso || '')) return '';
    var p = iso.split('-');
    var d = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }

  /* ───────────────────────── Approved reviews feed ───────────────────────── */

  var feedPromise = null;
  function loadApproved() {
    if (!ENDPOINT) return Promise.resolve({ configured: false, reviews: [] });
    if (!feedPromise) {
      var url = ENDPOINT + (ENDPOINT.indexOf('?') < 0 ? '?' : '&') + 'action=reviews';
      feedPromise = fetch(url, { method: 'GET', credentials: 'omit', cache: 'no-store' })
        .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
        .then(function (j) {
          if (!j || j.ok !== true || !Array.isArray(j.reviews)) throw new Error('bad feed');
          var reviews = j.reviews.filter(function (r) {
            return r && typeof r.text === 'string' && r.rating >= 1 && r.rating <= 5;
          });
          return { configured: true, reviews: reviews };
        });
      feedPromise.catch(function () { feedPromise = null; });
    }
    return feedPromise;
  }

  /* ───────────────────────── Review card ───────────────────────── */

  function card(r, opts) {
    opts = opts || {};
    var stars = el('p', { class: 'st-card-stars', 'aria-label': 'Rated ' + r.rating + ' out of 5 stars' });
    stars.appendChild(el('span', { 'aria-hidden': 'true', text: starsText(r.rating) }));

    var meta = el('p', { class: 'st-card-cat' });
    meta.appendChild(el('span', { class: 'st-chip st-chip-' + (r.type === 'Product' ? 'product' : 'service'), text: r.category }));
    if (r.item) meta.appendChild(el('span', { class: 'st-card-item', text: r.item }));

    var quote = el('blockquote', { class: 'st-card-text' });
    String(r.text).split(/\n{2,}/).forEach(function (para) {
      var p = el('p');
      para.split('\n').forEach(function (line, i) { if (i) p.appendChild(el('br')); p.appendChild(document.createTextNode(line)); });
      quote.appendChild(p);
    });

    var body = el('div', { class: 'st-card-body' }, [stars, meta, quote]);

    var foot = el('footer', { class: 'st-card-foot' }, [
      el('p', { class: 'st-card-name', text: '— ' + r.name }),
      r.date ? el('time', { class: 'st-card-date', datetime: r.date, text: formatDate(r.date) }) : null
    ]);
    body.appendChild(foot);

    var article = el('article', { class: 'st-card' + (opts.compact ? ' st-card-compact' : ''), 'data-type': r.type === 'Product' ? 'product' : 'service' });
    if (r.photo && /^(https:\/\/|http:\/\/(localhost|127\.0\.0\.1)[:/])/.test(r.photo)) { // https only (local testing aside)
      var img = el('img', { src: r.photo, alt: 'Photo shared by ' + r.name, loading: 'lazy', decoding: 'async', referrerpolicy: 'no-referrer' });
      img.addEventListener('error', function () { fig.remove(); });
      var fig = el('figure', { class: 'st-card-photo' }, [img]);
      article.appendChild(fig);
    }
    article.appendChild(body);

    // Long reviews fold to keep the gallery calm; the full words are one tap away.
    if (!opts.compact && r.text.length > 420) {
      quote.classList.add('st-clamped');
      var more = el('button', { type: 'button', class: 'st-more', 'aria-expanded': 'false', text: 'Read the full review' });
      more.addEventListener('click', function () {
        var open = quote.classList.toggle('st-clamped') === false;
        more.setAttribute('aria-expanded', open ? 'true' : 'false');
        more.textContent = open ? 'Show less' : 'Read the full review';
      });
      quote.after(more);
    }
    if (opts.compact) quote.classList.add('st-clamped-short');
    return article;
  }

  /* ───────────────────────── Gallery ───────────────────────── */

  function mountGallery(root) {
    root.classList.add('st-gallery-wrap');
    var status = el('p', { class: 'st-status', role: 'status', text: 'Gathering Soul Tribe reviews…' });
    root.appendChild(status);

    loadApproved().then(function (res) {
      root.innerHTML = '';
      if (!res.reviews.length) {
        root.appendChild(el('div', { class: 'st-empty' }, [
          el('span', { class: 'st-empty-sun', html: SUN }),
          el('p', { class: 'st-empty-title', text: res.configured ? 'The first stories are still being written.' : 'Soul Tribe Reviews are opening soon.' }),
          el('p', { class: 'st-empty-text', text: 'Approved reviews from our community will appear here. If you’ve worked with Madame Divine or welcomed one of her creations into your space, your words could be the first.' })
        ]));
        return;
      }
      var reviews = res.reviews;
      var total = reviews.length;
      var avg = reviews.reduce(function (s, r) { return s + r.rating; }, 0) / total;

      var summary = el('p', { class: 'st-summary' });
      summary.appendChild(el('span', { class: 'st-summary-stars', 'aria-hidden': 'true', text: starsText(Math.round(avg)) }));
      summary.appendChild(el('span', { text: avg.toFixed(1) + ' average from ' + total + (total === 1 ? ' review' : ' reviews') }));
      root.appendChild(summary);

      var counts = { all: total, service: 0, product: 0 };
      reviews.forEach(function (r) { counts[r.type === 'Product' ? 'product' : 'service']++; });

      var filters = el('div', { class: 'st-filters', role: 'group', 'aria-label': 'Show reviews for' });
      var grid = el('div', { class: 'st-grid' });
      var live = el('p', { class: 'st-sr', role: 'status' });
      [['all', 'All'], ['service', 'Services'], ['product', 'Products']].forEach(function (f) {
        var b = el('button', { type: 'button', class: 'st-filter', 'data-filter': f[0], 'aria-pressed': f[0] === 'all' ? 'true' : 'false' });
        b.appendChild(el('span', { text: f[1] }));
        b.appendChild(el('span', { class: 'st-count', text: String(counts[f[0]]) }));
        if (!counts[f[0]]) b.disabled = true;
        b.addEventListener('click', function () { applyFilter(f[0]); });
        filters.appendChild(b);
      });
      root.appendChild(filters);
      root.appendChild(live);
      root.appendChild(grid);

      reviews.forEach(function (r) { grid.appendChild(card(r)); });

      function applyFilter(which) {
        filters.querySelectorAll('.st-filter').forEach(function (b) {
          b.setAttribute('aria-pressed', b.getAttribute('data-filter') === which ? 'true' : 'false');
        });
        var shown = 0;
        grid.querySelectorAll('.st-card').forEach(function (c) {
          var on = which === 'all' || c.getAttribute('data-type') === which;
          c.hidden = !on; if (on) shown++;
        });
        live.textContent = 'Showing ' + shown + (shown === 1 ? ' review' : ' reviews');
      }
    }).catch(function () {
      root.innerHTML = '';
      root.appendChild(el('p', { class: 'st-status', text: 'Reviews couldn’t load just now. Please refresh the page in a moment.' }));
    });
  }

  /* ───────────────────────── Homepage feature ───────────────────────── */

  function mountFeatured(root) {
    var section = root.closest('[data-st-featured-section]') || root;
    section.hidden = true; // stays hidden unless there are real approved reviews
    loadApproved().then(function (res) {
      var picks = res.reviews.filter(function (r) { return r.rating >= 4; }).slice(0, 3);
      if (!picks.length) return;
      var grid = el('div', { class: 'st-grid st-grid-featured' });
      picks.forEach(function (r) { grid.appendChild(card(r, { compact: true })); });
      root.innerHTML = '';
      root.appendChild(grid);
      var more = root.getAttribute('data-st-more') || '#reviews';
      var a = el('a', { class: 'st-btn st-btn-outline', href: more, text: 'Read More Soul Tribe Reviews' });
      if (more.charAt(0) === '#') a.setAttribute('data-route', '');
      root.appendChild(el('p', { class: 'st-featured-more' }, [a]));
      section.hidden = false;
    }).catch(function () { /* keep hidden */ });
  }

  /* ───────────────────────── Form ───────────────────────── */

  var formCount = 0;

  function mountForm(root) {
    var n = ++formCount, id = function (s) { return 'st' + n + '-' + s; };
    root.classList.add('st-form-wrap');

    if (!ENDPOINT) {
      root.appendChild(el('div', { class: 'st-closed' }, [
        el('span', { class: 'st-empty-sun', html: SUN }),
        el('p', { class: 'st-empty-title', text: 'Our review book opens very soon.' }),
        el('p', { class: 'st-empty-text', text: 'Thank you for wanting to share your experience. Please check back shortly — Madame Divine would love to hear from you.' })
      ]));
      return;
    }

    var opts = '<option value="">Choose one…</option>' + CATEGORIES.map(function (g) {
      return '<optgroup label="' + g.group + '">' + g.items.map(function (i) {
        return '<option value="' + i[0] + '">' + i[1] + '</option>';
      }).join('') + '</optgroup>';
    }).join('');

    var starInputs = [1, 2, 3, 4, 5].map(function (v) {
      return '<input type="radio" class="st-star-input" name="rating" id="' + id('r' + v) + '" value="' + v + '" required>' +
        '<label class="st-star" for="' + id('r' + v) + '"><span class="st-sr">' + v + (v === 1 ? ' star' : ' stars') + '</span>' +
        '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2.6l2.9 6 6.6.8-4.9 4.6 1.3 6.5L12 17.3l-5.9 3.2 1.3-6.5L2.5 9.4l6.6-.8z"/></svg></label>';
    }).join('');

    root.innerHTML =
      '<form class="st-form" novalidate>' +
        '<div class="st-field">' +
          '<label for="' + id('name') + '">Your name or preferred display name</label>' +
          '<input id="' + id('name') + '" name="name" type="text" maxlength="60" autocomplete="nickname" required placeholder="e.g. Maria R. or Sunflower Soul">' +
          '<p class="st-hint">This is how your review will be signed. First name or initials are perfect.</p>' +
        '</div>' +
        '<fieldset class="st-field st-rating">' +
          '<legend>Your rating</legend>' +
          '<div class="st-stars">' + starInputs + '</div>' +
          '<p class="st-rating-label" id="' + id('ratingLabel') + '" aria-live="polite"></p>' +
        '</fieldset>' +
        '<div class="st-row">' +
          '<div class="st-field">' +
            '<label for="' + id('category') + '">What are you reviewing?</label>' +
            '<select id="' + id('category') + '" name="category" required>' + opts + '</select>' +
          '</div>' +
          '<div class="st-field">' +
            '<label for="' + id('item') + '">Product or service name <span class="st-opt">(optional)</span></label>' +
            '<input id="' + id('item') + '" name="item" type="text" maxlength="80" placeholder="e.g. Sweet Bath, 30-minute reading">' +
          '</div>' +
        '</div>' +
        '<div class="st-field">' +
          '<label for="' + id('text') + '">Your review</label>' +
          '<textarea id="' + id('text') + '" name="text" rows="6" maxlength="2500" required placeholder="In your own words, how was your experience?"></textarea>' +
          '<p class="st-hint st-privacy">✦ Share only what you’re comfortable with. There’s no need to include private details of your reading, ritual, or personal situation.</p>' +
          '<p class="st-hint st-counter" id="' + id('count') + '" aria-live="polite"></p>' +
        '</div>' +
        '<div class="st-field">' +
          '<span class="st-label" id="' + id('photoLabel') + '">Add a photo <span class="st-opt">(optional)</span></span>' +
          '<div class="st-photo">' +
            '<input id="' + id('photo') + '" class="st-photo-input" name="photo" type="file" accept="image/jpeg,image/png,image/webp" aria-labelledby="' + id('photoLabel') + '">' +
            '<label class="st-photo-pick" for="' + id('photo') + '">Choose a photo</label>' +
            '<div class="st-photo-preview" hidden><img alt="Your selected photo"><button type="button" class="st-photo-remove">Remove photo</button></div>' +
          '</div>' +
          '<p class="st-hint">JPG, PNG, or WebP. Location data is removed from your photo before it’s sent.</p>' +
        '</div>' +
        '<div class="st-field">' +
          '<label for="' + id('email') + '">Email <span class="st-opt">(optional · private, never shown)</span></label>' +
          '<input id="' + id('email') + '" name="email" type="email" maxlength="120" autocomplete="email" placeholder="Only if you’d like Madame Divine to be able to reply">' +
        '</div>' +
        '<fieldset class="st-field st-consent">' +
          '<legend>May we share your review?</legend>' +
          '<label class="st-choice"><input type="radio" name="isPublic" value="yes" required> <span>Yes — you may display my review publicly on the Divine Intentions 33 website.</span></label>' +
          '<label class="st-choice"><input type="radio" name="isPublic" value="no"> <span>No — keep it private, just for Madame Divine.</span></label>' +
        '</fieldset>' +
        '<div class="st-hp" aria-hidden="true"><label>Leave this empty<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>' +
        (CFG.turnstileSiteKey ? '<div class="st-field st-turnstile"></div>' : '') +
        '<p class="st-error" role="alert" hidden></p>' +
        '<button type="submit" class="st-btn st-btn-gold st-submit">Share My Experience</button>' +
        '<p class="st-hint st-center">Every review is read by Madame Divine before it appears on the website. No account needed.</p>' +
      '</form>' +
      '<div class="st-thanks" tabindex="-1" hidden>' +
        '<span class="st-empty-sun">' + SUN + '</span>' +
        '<p class="st-empty-title">Thank you for sharing your light.</p>' +
        '<p class="st-empty-text st-thanks-text"></p>' +
      '</div>';

    var form = root.querySelector('form');
    var started = Date.now();
    var photoData = null;
    var errorBox = form.querySelector('.st-error');
    var submit = form.querySelector('.st-submit');
    var turnstileToken = '';

    // Star feedback
    var ratingWords = ['', 'Not what I hoped', 'Fair', 'Good', 'Wonderful', 'Divine'];
    form.querySelectorAll('.st-star-input').forEach(function (r) {
      r.addEventListener('change', function () { form.querySelector('#' + id('ratingLabel')).textContent = ratingWords[Number(r.value)]; });
    });

    // Character counter
    var ta = form.querySelector('textarea'), counter = form.querySelector('#' + id('count'));
    ta.addEventListener('input', function () {
      var left = 2500 - ta.value.length;
      counter.textContent = left < 300 ? left + ' characters left' : '';
    });

    // Photo: shrink on the device (also strips location/EXIF data) before sending
    var fileInput = form.querySelector('.st-photo-input');
    var preview = form.querySelector('.st-photo-preview');
    var pick = form.querySelector('.st-photo-pick');
    fileInput.addEventListener('change', function () {
      var f = fileInput.files && fileInput.files[0];
      photoData = null; preview.hidden = true; pick.hidden = false;
      hideError();
      if (!f) return;
      if (!/^image\/(jpeg|png|webp)$/.test(f.type)) { fileInput.value = ''; return showError(ERRORS.invalid_photo); }
      if (f.size > 25 * 1024 * 1024) { fileInput.value = ''; return showError(ERRORS.too_large); }
      pick.textContent = 'Preparing photo…';
      shrinkImage(f).then(function (dataUrl) {
        photoData = dataUrl;
        preview.querySelector('img').src = dataUrl;
        preview.hidden = false; pick.hidden = true;
      }).catch(function () {
        fileInput.value = ''; showError(ERRORS.invalid_photo);
      }).then(function () { pick.textContent = 'Choose a photo'; });
    });
    preview.querySelector('.st-photo-remove').addEventListener('click', function () {
      photoData = null; fileInput.value = ''; preview.hidden = true; pick.hidden = false; pick.focus();
    });

    // Optional Cloudflare Turnstile
    if (CFG.turnstileSiteKey) {
      loadTurnstile().then(function (ts) {
        ts.render(form.querySelector('.st-turnstile'), {
          sitekey: CFG.turnstileSiteKey, theme: 'light',
          callback: function (t) { turnstileToken = t; },
          'expired-callback': function () { turnstileToken = ''; }
        });
      }).catch(function () {});
    }

    function showError(msg, focusEl) {
      errorBox.textContent = msg; errorBox.hidden = false;
      if (focusEl) focusEl.focus();
    }
    function hideError() { errorBox.hidden = true; errorBox.textContent = ''; }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      hideError();
      var fd = new FormData(form);
      var name = String(fd.get('name') || '').trim();
      var rating = Number(fd.get('rating') || 0);
      var category = String(fd.get('category') || '');
      var text = String(fd.get('text') || '').trim();
      var email = String(fd.get('email') || '').trim();
      var pub = fd.get('isPublic');

      if (!name) return showError(ERRORS.invalid_name, form.querySelector('#' + id('name')));
      if (!rating) return showError(ERRORS.invalid_rating, form.querySelector('.st-star-input'));
      if (!category) return showError(ERRORS.invalid_category, form.querySelector('#' + id('category')));
      if (text.length < 10) return showError(ERRORS.invalid_text, ta);
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return showError(ERRORS.invalid_email, form.querySelector('#' + id('email')));
      if (!pub) return showError(ERRORS.invalid_permission, form.querySelector('input[name="isPublic"]'));
      if (CFG.turnstileSiteKey && !turnstileToken) return showError('Please complete the quick “I’m human” check above the button.');

      var payload = {
        name: name, rating: rating, category: category, item: String(fd.get('item') || '').trim(),
        text: text, email: email, isPublic: pub === 'yes', photo: photoData,
        website: String(fd.get('website') || ''), elapsed: Date.now() - started,
        turnstileToken: turnstileToken
      };

      submit.disabled = true; submit.textContent = 'Sending…';
      // text/plain keeps this a "simple" request, which Google Apps Script accepts from any site
      fetch(ENDPOINT, { method: 'POST', credentials: 'omit', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload) })
        .then(function (r) { return r.json(); })
        .catch(function () { return { ok: false, error: 'network' }; })
        .then(function (res) {
          if (res && res.ok === true) {
            form.hidden = true;
            var thanks = root.querySelector('.st-thanks');
            thanks.querySelector('.st-thanks-text').textContent = payload.isPublic
              ? 'Your review has been received. Madame Divine reads every review personally, and once it’s approved it will join the Soul Tribe Reviews. 🌻'
              : 'Your private feedback has been received and will be read personally by Madame Divine. It will not be published. 🌻';
            thanks.hidden = false; thanks.focus();
            thanks.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
          }
          submit.disabled = false; submit.textContent = 'Share My Experience';
          if (window.turnstile && CFG.turnstileSiteKey) { try { window.turnstile.reset(); turnstileToken = ''; } catch (e2) {} }
          showError(ERRORS[res && res.error] || ERRORS.server_error);
        });
    });
  }

  function shrinkImage(file) {
    var MAX = 1600;
    return new Promise(function (resolve, reject) {
      var url = URL.createObjectURL(file);
      var img = new Image();
      img.onload = function () {
        try {
          var scale = Math.min(1, MAX / Math.max(img.naturalWidth, img.naturalHeight));
          var w = Math.round(img.naturalWidth * scale), h = Math.round(img.naturalHeight * scale);
          if (!w || !h) throw new Error('empty');
          var c = document.createElement('canvas'); c.width = w; c.height = h;
          var ctx = c.getContext('2d');
          ctx.fillStyle = '#FFFCF4'; ctx.fillRect(0, 0, w, h); // transparent PNGs get an ivory backing
          ctx.drawImage(img, 0, 0, w, h);
          var q = 0.86, out = c.toDataURL('image/jpeg', q);
          while (out.length > 2.6 * 1024 * 1024 && q > 0.5) { q -= 0.12; out = c.toDataURL('image/jpeg', q); }
          URL.revokeObjectURL(url);
          resolve(out);
        } catch (err) { URL.revokeObjectURL(url); reject(err); }
      };
      img.onerror = function () { URL.revokeObjectURL(url); reject(new Error('decode')); };
      img.src = url;
    });
  }

  var tsPromise = null;
  function loadTurnstile() {
    if (!tsPromise) tsPromise = new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      s.async = true; s.onload = function () { resolve(window.turnstile); }; s.onerror = reject;
      document.head.appendChild(s);
    });
    return tsPromise;
  }

  function init() {
    document.querySelectorAll('[data-st-review-form]').forEach(mountForm);
    document.querySelectorAll('[data-st-review-gallery]').forEach(mountGallery);
    document.querySelectorAll('[data-st-review-featured]').forEach(mountFeatured);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();

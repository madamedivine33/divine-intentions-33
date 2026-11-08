/* Divine Intentions 33 — site header & navigation behaviour.
   Shared by index.html and crystals.html.

   In-site links use hash routes of the form  #page[/tab][/elementId]
   e.g. #services/private/svc-mediumship  or  #connect/email-signup.
   On index.html they switch pages with the existing showPage(); on other
   pages they are plain links to index.html#route. */
(function () {
  'use strict';

  /* Reading choice route: keep the two checkout experiences distinct. */
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) return;
    var action = e.target.closest && e.target.closest('a, button');
    if (!action) return;
    var label = (action.textContent || '').replace(/\\s+/g, ' ').trim().toLowerCase();
    if (label !== 'book a reading' && label !== 'book reading') return;
    if (action.closest('[data-reading-choice-exempt]')) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    window.location.assign('choose-your-reading.html');
  }, true);

  var header = document.getElementById('diHeader');
  if (!header) return;

  var desktopMQ = window.matchMedia('(min-width: 961px)');
  var hoverMQ = window.matchMedia('(hover: hover) and (pointer: fine)');

  // Which top-level tab owns each index.html page
  var GROUP = {
    home: 'home', about: 'about',
    services: 'services',
    shop: 'shop', waistbeads: 'shop', herbals: 'shop', book: 'shop',
    connect: 'connect', reviews: 'reviews', sisterhood: 'connect'
  };

  function setCurrent(page) {
    var group = GROUP[page] || header.getAttribute('data-current') || '';
    header.querySelectorAll('[data-group]').forEach(function (el) {
      if (el.getAttribute('data-group') === group) el.setAttribute('aria-current', 'page');
      else el.removeAttribute('aria-current');
    });
  }

  /* ── Desktop dropdowns (disclosure pattern) ── */
  var triggers = Array.prototype.slice.call(header.querySelectorAll('.di-tab-toggle[aria-controls]'));
  var closeTimer = null;

  function panelOf(btn) { return document.getElementById(btn.getAttribute('aria-controls')); }
  function linksOf(btn) { return Array.prototype.slice.call(panelOf(btn).querySelectorAll('a')); }

  function openPanel(btn) {
    triggers.forEach(function (b) { if (b !== btn) closePanel(b); });
    btn.setAttribute('aria-expanded', 'true');
    panelOf(btn).hidden = false;
  }
  function closePanel(btn) {
    btn.setAttribute('aria-expanded', 'false');
    panelOf(btn).hidden = true;
  }
  function closeAllPanels() { triggers.forEach(closePanel); }

  triggers.forEach(function (btn) {
    var li = btn.closest('li');
    var tabLink = li.querySelector('a.di-tab');
    var panel = panelOf(btn);

    btn.addEventListener('click', function () {
      // A click right after hover-opening should keep the menu open, not close it
      if (btn._hoverOpened && Date.now() - btn._hoverOpened < 1500) { btn._hoverOpened = 0; openPanel(btn); return; }
      btn._hoverOpened = 0;
      if (btn.getAttribute('aria-expanded') === 'true') closePanel(btn); else openPanel(btn);
    });

    btn.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault(); openPanel(btn); linksOf(btn)[0].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault(); openPanel(btn); var l = linksOf(btn); l[l.length - 1].focus();
      }
    });

    // ArrowDown on the page link also opens its menu
    if (tabLink) tabLink.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); openPanel(btn); linksOf(btn)[0].focus(); }
    });

    panel.addEventListener('keydown', function (e) {
      var links = linksOf(btn), i = links.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); links[(i + 1) % links.length].focus(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); links[(i - 1 + links.length) % links.length].focus(); }
      else if (e.key === 'Home') { e.preventDefault(); links[0].focus(); }
      else if (e.key === 'End') { e.preventDefault(); links[links.length - 1].focus(); }
    });

    // Hover opens on devices with a real mouse
    li.addEventListener('mouseenter', function () {
      if (!hoverMQ.matches || !desktopMQ.matches) return;
      clearTimeout(closeTimer);
      if (btn.getAttribute('aria-expanded') !== 'true') { openPanel(btn); btn._hoverOpened = Date.now(); }
    });
    li.addEventListener('mouseleave', function () {
      if (!hoverMQ.matches || !desktopMQ.matches) return;
      closeTimer = setTimeout(function () { closePanel(btn); }, 180);
    });

    // Close when keyboard focus leaves the tab and its panel
    li.addEventListener('focusout', function (e) {
      if (!li.contains(e.relatedTarget)) closePanel(btn);
    });
  });

  /* ── Phone / tablet drawer ── */
  var menuBtn = header.querySelector('.di-menu-btn');
  var drawer = document.getElementById('mobileNav');

  function setDrawer(open) {
    if (!menuBtn || !drawer) return;
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    drawer.hidden = !open;
  }
  if (menuBtn) menuBtn.addEventListener('click', function () { setDrawer(drawer.hidden); });

  header.querySelectorAll('.di-drawer-toggle').forEach(function (t) {
    t.addEventListener('click', function () {
      var sub = document.getElementById(t.getAttribute('aria-controls'));
      var open = t.getAttribute('aria-expanded') !== 'true';
      t.setAttribute('aria-expanded', open ? 'true' : 'false');
      sub.hidden = !open;
    });
  });

  // Older code on the page calls toggleMobileMenu() / adds .open to #mobileNav
  window.toggleMobileMenu = function () { setDrawer(drawer.hidden); };

  /* ── Global dismissal ── */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var openBtn = triggers.filter(function (b) { return b.getAttribute('aria-expanded') === 'true'; })[0];
    if (openBtn) { closePanel(openBtn); openBtn.focus(); }
    if (drawer && !drawer.hidden) { setDrawer(false); menuBtn.focus(); }
  });
  document.addEventListener('click', function (e) {
    if (!header.contains(e.target)) { closeAllPanels(); setDrawer(false); }
  });
  desktopMQ.addEventListener && desktopMQ.addEventListener('change', function () { closeAllPanels(); setDrawer(false); });

  /* ── Routing on index.html ── */
  var hasPages = typeof window.showPage === 'function' && document.getElementById('page-home');

  if (hasPages) {
    var originalShowPage = window.showPage;
    window.showPage = function (pageId) {
      originalShowPage(pageId);
      setCurrent(pageId);
      closeAllPanels();
      setDrawer(false);
    };
  }

  function activateTab(id) {
    var panel = document.getElementById('tab-' + id);
    if (!panel || !panel.classList.contains('tab-content')) return false;
    document.querySelectorAll('.tab-content').forEach(function (t) { t.classList.remove('active'); });
    document.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
    panel.classList.add('active');
    var b = document.getElementById('tabBtn-' + id);
    if (b) b.classList.add('active');
    return true;
  }

  function route(hash, smooth) {
    var parts = (hash || '').replace(/^#/, '').split('/').filter(Boolean);
    var page = parts[0];
    if (!page || !document.getElementById('page-' + page)) return false;
    window.showPage(page);
    var targetId = null;
    if (parts[1] && !activateTab(parts[1])) targetId = parts[1];
    if (parts[2]) targetId = parts[2];
    if (targetId) {
      setTimeout(function () {
        var el = document.getElementById(targetId);
        if (!el) return;
        // Ignore the page's fade-in slide (translateY) so the card lands just below the header
        var shift = 0;
        try { shift = new DOMMatrixReadOnly(getComputedStyle(el).transform).m42 || 0; } catch (err) {}
        var top = el.getBoundingClientRect().top + window.pageYOffset - shift - header.offsetHeight - 16;
        window.scrollTo({ top: Math.max(0, top), behavior: smooth ? 'smooth' : 'auto' });
      }, 60);
    }
    return true;
  }

  if (hasPages) {
    // In-site links: route without a full page jump, and update the address bar
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[data-route]');
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
      var hash = a.getAttribute('href');
      if (route(hash, true)) {
        e.preventDefault();
        if (location.hash !== hash) history.pushState(null, '', hash);
      }
    });
    window.addEventListener('popstate', function () { route(location.hash, false) || window.showPage('home'); });
    window.addEventListener('hashchange', function () { route(location.hash, true); });
    if (location.hash && location.hash.length > 1) route(location.hash, false);
    else setCurrent('home');
  } else {
    // Other pages: links go to index.html#route; just close menus after a choice
    header.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { closeAllPanels(); setDrawer(false); });
    });
    setCurrent(null);
  }
})();

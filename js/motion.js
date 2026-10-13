/* Obsidian Guitars: motion and interaction layer (vanilla, no dependencies).
   - scroll-linked transforms (hero guitar, model hero, photo parallax): sets --p, rAF-throttled
   - reveal-on-scroll for below-the-fold content (IntersectionObserver)
   - model switcher (tablist with arrow keys, prev/next, swipe)
   - pinned scroll story (sticky visual follows the text panels)
   - finish toggle on model pages
   Everything degrades: without this file all content is visible and stacked.
   With prefers-reduced-motion: reduce, no scroll transforms, no reveal hiding, instant swaps. */
(function () {
  'use strict';
  var doc = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

  /* ---------- scroll-linked progress (--p) ---------- */
  function initScrollFx() {
    if (reduce) return;
    var els = $all('[data-scrollfx]');
    if (!els.length) return;
    var active = new Set(els), ticking = false;
    if (hasIO) {
      active = new Set();
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) active.add(e.target); else active.delete(e.target); });
        request();
      }, { rootMargin: '10% 0px 10% 0px' });
      els.forEach(function (el) { io.observe(el); });
    }
    function update() {
      ticking = false;
      var vh = window.innerHeight;
      active.forEach(function (el) {
        var r = el.getBoundingClientRect(), p;
        if (el.getAttribute('data-scrollfx') === 'out') p = clamp(-r.top / Math.max(r.height * 0.9, 1), 0, 1);
        else p = clamp((vh - r.top) / (vh + r.height), 0, 1);
        el.style.setProperty('--p', p.toFixed(4));
      });
    }
    function request() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request, { passive: true });
    request();
  }

  /* ---------- reveal on scroll ---------- */
  var REVEAL = [
    'main .section-head', 'main .lineup-head > *', '.story-intro', 'main .two-col > *', 'main .split-4-6 > *', 'main .split-6-4 > *',
    'main .process-list > li', 'main .ruled > li', 'main .tiers > div', 'main .gal figure', 'main .post-card',
    'main .builders > .builder', 'main .faq-group', 'main .media-grid > *', 'main .cta-band .wrap > *',
    'main .lineup-list > li', 'main .model-hero-body > *', 'main article.post > *', 'main .photo-split > *',
    'footer.site .waitlist > *', 'footer.site .footer-grid > *'
  ].join(',');
  function initReveal() {
    if (reduce || !hasIO) return;
    var vh = window.innerHeight;
    var picked = [];
    $all(REVEAL).forEach(function (el) {
      if (el.closest('#configure, .switcher.is-enhanced, .story-grid, .hero-cine, [hidden]')) return;
      if (picked.some(function (p) { return p.contains(el); })) return;
      if (el.getBoundingClientRect().top < vh * 0.92) return; // already on screen: leave it alone
      picked.push(el);
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    picked.forEach(function (el) {
      var sibs = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
      el.style.setProperty('--d', Math.min(sibs, 5) * 0.07 + 's');
      el.classList.add('reveal');
      io.observe(el);
    });
  }

  /* ---------- model switcher ---------- */
  var ARROW_L = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';
  var ARROW_R = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>';
  function initSwitcher(root) {
    var list = root.querySelector('.lineup-list');
    if (!list) return;
    var items = $all('.lineup-item', list);
    if (items.length < 2) return;
    var current = 0, label = root.getAttribute('data-label') || 'Models';

    var bar = document.createElement('div');
    bar.className = 'switcher-bar';
    var tabs = document.createElement('div');
    tabs.className = 'switcher-tabs';
    tabs.setAttribute('role', 'tablist');
    tabs.setAttribute('aria-label', label);
    var btns = items.map(function (it, i) {
      var slug = it.getAttribute('data-slug') || String(i);
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'switcher-tab';
      b.id = 'tab-' + slug;
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-controls', it.id);
      b.innerHTML = '<span class="n">0' + (i + 1) + '</span><span class="t">' + (it.getAttribute('data-name') || slug) + '</span>';
      it.setAttribute('role', 'tabpanel');
      it.setAttribute('aria-labelledby', b.id);
      b.addEventListener('click', function () { go(i); });
      tabs.appendChild(b);
      return b;
    });
    var nav = document.createElement('div');
    nav.className = 'switcher-nav';
    nav.innerHTML = '<span class="count" aria-hidden="true"></span>' +
      '<button type="button" class="icon-btn" data-dir="-1" aria-label="Previous model">' + ARROW_L + '</button>' +
      '<button type="button" class="icon-btn" data-dir="1" aria-label="Next model">' + ARROW_R + '</button>';
    var count = nav.querySelector('.count');
    $all('.icon-btn', nav).forEach(function (b) {
      b.addEventListener('click', function () { step(+b.getAttribute('data-dir')); });
    });
    bar.appendChild(tabs);
    bar.appendChild(nav);
    root.insertBefore(bar, list);
    var hint = document.createElement('p');
    hint.className = 'switcher-hint';
    hint.setAttribute('aria-hidden', 'true');
    hint.textContent = 'Swipe the guitar to see the next model';
    list.parentNode.insertBefore(hint, list.nextSibling);
    list.setAttribute('role', 'presentation');

    tabs.addEventListener('keydown', function (e) {
      var k = e.key, n = items.length, to = null;
      if (k === 'ArrowRight' || k === 'ArrowDown') to = (current + 1) % n;
      else if (k === 'ArrowLeft' || k === 'ArrowUp') to = (current - 1 + n) % n;
      else if (k === 'Home') to = 0;
      else if (k === 'End') to = n - 1;
      if (to === null) return;
      e.preventDefault();
      go(to, true);
    });

    function render(dir) {
      items.forEach(function (it, i) {
        var on = i === current;
        btns[i].setAttribute('aria-selected', on ? 'true' : 'false');
        btns[i].tabIndex = on ? 0 : -1;
        if (on) {
          if (dir && !reduce) {
            it.classList.remove('swept');
            it.style.setProperty('--x', (dir * 14) + '%');
            it.style.setProperty('--r', (dir * 2) + 'deg');
            void it.offsetWidth; // commit the start position before activating
          }
          it.classList.add('is-active');
          it.removeAttribute('aria-hidden');
          if (dir && !reduce) requestAnimationFrame(function () { it.classList.add('swept'); });
        } else if (it.classList.contains('is-active')) {
          it.style.setProperty('--x', (-(dir || 1) * 14) + '%');
          it.style.setProperty('--r', (-(dir || 1) * 2) + 'deg');
          it.classList.remove('is-active', 'swept');
          it.setAttribute('aria-hidden', 'true');
        } else {
          it.setAttribute('aria-hidden', 'true');
        }
      });
      count.innerHTML = '<b>0' + (current + 1) + '</b> / 0' + items.length;
    }
    function go(i, focus) {
      if (i === current) { if (focus) btns[i].focus(); return; }
      var n = items.length;
      var dir = ((i - current + n) % n) <= n / 2 ? 1 : -1;
      current = i;
      render(dir);
      if (focus) btns[i].focus();
    }
    function step(d) { go((current + d + items.length) % items.length); }

    /* swipe / drag on the stage */
    var sx = null, sy = 0, st = 0;
    list.addEventListener('pointerdown', function (e) {
      if (!e.target.closest('.lineup-stage')) return;
      sx = e.clientX; sy = e.clientY; st = Date.now();
    });
    list.addEventListener('pointerup', function (e) {
      if (sx === null) return;
      var dx = e.clientX - sx, dy = e.clientY - sy;
      sx = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2 && Date.now() - st < 1200) step(dx < 0 ? 1 : -1);
    });
    list.addEventListener('pointercancel', function () { sx = null; });
    list.addEventListener('dragstart', function (e) { if (e.target.closest('.lineup-stage')) e.preventDefault(); });

    var start = 0;
    items.forEach(function (it, i) { if (location.hash && '#' + it.id === location.hash) start = i; });
    current = start;
    root.classList.add('is-enhanced');
    render(0);
    if (!reduce) items[current].classList.add('swept');
  }

  /* ---------- pinned story ---------- */
  function initStory(story) {
    var panels = $all('.story-panel', story);
    var layers = $all('.story-stage .story-layer', story);
    var rail = $all('.story-rail li', story);
    if (!panels.length || !layers.length) return;
    function set(i) {
      panels.forEach(function (p, j) { p.classList.toggle('is-on', j === i); });
      layers.forEach(function (l, j) { l.classList.toggle('is-on', j === i); });
      rail.forEach(function (l, j) { l.classList.toggle('is-on', j === i); });
    }
    set(0);
    if (!hasIO) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) set(panels.indexOf(e.target)); });
    }, { rootMargin: '-45% 0px -45% 0px' });
    panels.forEach(function (p) { io.observe(p); });
  }

  /* ---------- finish toggle (model pages) ---------- */
  function initFinish(box) {
    var stage = document.querySelector(box.getAttribute('data-target'));
    if (!stage) return;
    var btns = $all('button', box);
    var imgs = { std: stage.querySelector('img:not(.alt)'), alt: stage.querySelector('img.alt') };
    if (!imgs.alt) return;
    function pick(which) {
      btns.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-finish') === which ? 'true' : 'false'); });
      stage.classList.toggle('show-alt', which === 'alt');
      imgs.std.setAttribute('aria-hidden', which === 'alt' ? 'true' : 'false');
      imgs.alt.setAttribute('aria-hidden', which === 'alt' ? 'false' : 'true');
    }
    btns.forEach(function (b) { b.addEventListener('click', function () { pick(b.getAttribute('data-finish')); }); });
    box.hidden = false;
    pick('std');
  }

  function init() {
    $all('.switcher').forEach(initSwitcher);
    $all('.story').forEach(initStory);
    $all('[data-finish-toggle]').forEach(initFinish);
    initScrollFx();
    initReveal();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

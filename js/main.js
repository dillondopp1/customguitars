/* Obsidian Guitars: site script (no dependencies) */

/* =====================================================================
   FORM CONFIGURATION: the ONE place the owner sets up form delivery.
   See README.md, "Pre-launch checklist > Forms".

   provider:
     'netlify'   - site is deployed on Netlify. Forms are detected at deploy
                   time from the data-netlify="true" attribute. Nothing else to set.
     'formspree' - site is hosted anywhere else. Create a form at formspree.io
                   and paste its endpoint below.
     'auto'      - try Netlify first; if that fails (e.g. not on Netlify),
                   fall back to the Formspree endpoint below.
   ===================================================================== */
var OBSIDIAN_FORMS = {
  provider: 'auto',
  // REPLACE: your Formspree endpoint, e.g. 'https://formspree.io/f/abcdwxyz'
  formspreeEndpoint: 'https://formspree.io/f/YOUR_FORM_ID'
};

(function () {
  'use strict';

  var MODEL_SLUGS = ['andesite', 'tephra', 'basalt', 'scoria', 'rhyolite'];

  function formspreeConfigured() {
    return OBSIDIAN_FORMS.formspreeEndpoint &&
      OBSIDIAN_FORMS.formspreeEndpoint.indexOf('YOUR_FORM_ID') === -1;
  }

  function postNetlify(form) {
    var data = new FormData(form);
    var body = new URLSearchParams();
    data.forEach(function (v, k) { body.append(k, v); });
    return fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString()
    }).then(function (r) {
      if (!r.ok) throw new Error('Netlify form POST failed: ' + r.status);
      // Only trust a 2xx that really came from Netlify. Some static servers answer
      // any POST with 200 and the homepage, which would silently lose the lead.
      var server = (r.headers.get('server') || '').toLowerCase();
      if (!r.headers.get('x-nf-request-id') && server.indexOf('netlify') === -1) {
        throw new Error('POST was not handled by Netlify Forms (site is not on Netlify?)');
      }
      return r;
    });
  }

  function postFormspree(form) {
    if (!formspreeConfigured()) {
      return Promise.reject(new Error('Formspree endpoint not configured (js/main.js, OBSIDIAN_FORMS).'));
    }
    return fetch(OBSIDIAN_FORMS.formspreeEndpoint, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    }).then(function (r) {
      if (!r.ok) throw new Error('Formspree POST failed: ' + r.status);
      return r;
    });
  }

  function submitForm(form) {
    var p = OBSIDIAN_FORMS.provider;
    if (p === 'netlify') return postNetlify(form);
    if (p === 'formspree') return postFormspree(form);
    return postNetlify(form).catch(function (err) {
      if (window.console) console.warn(err.message + '. Trying Formspree fallback.');
      return postFormspree(form);
    });
  }

  function setupForm(form) {
    var wrap = form.closest('.form-wrap') || form.parentElement;
    var ok = wrap.querySelector('.form-success');
    var bad = wrap.querySelector('.form-error');
    var btn = form.querySelector('[type="submit"]');
    var btnLabel = btn ? btn.textContent : '';

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (bad) bad.hidden = true;
      var trap = form.querySelector('[name="bot-field"]');
      if (trap && trap.value) return; // honeypot filled: silently drop
      if (typeof form.reportValidity === 'function' && !form.reportValidity()) return;

      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
      submitForm(form).then(function () {
        form.hidden = true;
        if (ok) { ok.hidden = false; ok.focus(); }
      }).catch(function (err) {
        if (window.console) console.error(err);
        if (bad) { bad.hidden = false; bad.focus(); }
      }).then(function () {
        if (btn) { btn.disabled = false; btn.textContent = btnLabel; }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    /* header shadow on scroll */
    var header = document.querySelector('header.site');
    var onScroll = function () {
      if (header) header.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* mobile menu */
    var toggle = document.querySelector('.menu-toggle');
    var links = document.getElementById('primary-nav');
    if (toggle && links) {
      var setOpen = function (open) {
        links.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        document.body.classList.toggle('nav-open', open);
      };
      toggle.addEventListener('click', function () {
        setOpen(toggle.getAttribute('aria-expanded') !== 'true');
      });
      links.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () { setOpen(false); });
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
          setOpen(false);
          toggle.focus();
        }
      });
    }

    /* FAQ accordions */
    document.querySelectorAll('.faq-q').forEach(function (btn) {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', open ? 'false' : 'true');
        if (panel) panel.hidden = open;
      });
    });

    /* Custom Shop: pre-select ?model= */
    var modelSelect = document.getElementById('model');
    if (modelSelect && window.URLSearchParams) {
      var wanted = (new URLSearchParams(window.location.search).get('model') || '').toLowerCase();
      if (MODEL_SLUGS.indexOf(wanted) !== -1) modelSelect.value = wanted;
    }

    /* forms */
    document.querySelectorAll('form[data-obsidian-form]').forEach(setupForm);

    /* footer year */
    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  });
})();

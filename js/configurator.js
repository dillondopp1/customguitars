/* Obsidian Guitars: Custom Shop configurator (no dependencies) */
(function () {
  'use strict';

  // Prices must match the #pricing table in custom-shop.html.
  // `price` is the list base price; `founders` is the Founders' Run base price
  // (instruments Nos. 1-25 only). Upgrades are charged at list either way.

  // Mahogany neck on a bolt-on model; price to confirm before launch (README, "Business facts to confirm").
  var NECK_MAHOGANY_PRICE = 150;

  // Neck woods. The first entry for each model is its standard (default) neck.
  var NECKS = {
    maple: { name: 'Roasted maple' },
    mahogany: { name: 'Mahogany' }
  };
  var BOLT_ON_NECKS = [{ id: 'maple', price: 0 }, { id: 'mahogany', price: NECK_MAHOGANY_PRICE }];
  var SET_NECKS = [{ id: 'mahogany', price: 0 }, { id: 'maple', price: 0 }];

  var MODELS = {
    andesite: {
      name: 'The Andesite', shape: 'T-style', price: 4600, founders: 3900,
      strings: [6],
      bodies: ['Swamp ash', 'Alder'],
      boards: ['maple', 'ebony'],
      pickups: ['Two single-coils', 'Bridge single-coil, neck humbucker'],
      bridges: ['Three brass saddles, through-body', 'Six steel saddles, through-body'],
      necks: BOLT_ON_NECKS, joint: 'bolt-on',
      multiscale: 'none',
      defaults: { finish: 'natural', hardware: 'nickel', board: 'maple' }
    },
    tephra: {
      name: 'The Tephra', shape: 'S-style superstrat', price: 4800, founders: 4100,
      strings: [6, 7, 8],
      bodies: ['Swamp ash', 'Alder'],
      boards: ['ebony', 'maple'],
      pickups: ['Humbucker / single / single, coil split'],
      bridges: ['Two-point tremolo', 'Hardtail'],
      necks: BOLT_ON_NECKS, joint: 'bolt-on',
      multiscale: 'option',
      defaults: { finish: 'teal', hardware: 'nickel', board: 'ebony' }
    },
    rhyolite: {
      name: 'The Rhyolite', shape: 'Offset, chambered', price: 5200, founders: 4400,
      strings: [6],
      bodies: ['Chambered alder', 'Chambered korina'],
      boards: ['maple', 'ebony'],
      pickups: ['Two P-90s', 'Two humbuckers', 'Three single-coils'],
      bridges: ['Hardtail', 'Vintage-style vibrato'],
      necks: BOLT_ON_NECKS, joint: 'bolt-on',
      multiscale: 'none',
      defaults: { finish: 'cherry', hardware: 'nickel', board: 'maple' }
    },
    basalt: {
      name: 'The Basalt', shape: 'Single-cut', price: 5900, founders: 5000,
      strings: [6],
      bodies: ['Mahogany back, carved maple top'],
      boards: ['ebony'],
      pickups: ['Two humbuckers, open', 'Two humbuckers, covered'],
      bridges: ['Tune-o-matic-style bridge, stop tailpiece'],
      necks: SET_NECKS, joint: 'set',
      multiscale: 'none',
      defaults: { finish: 'amber', hardware: 'gold', board: 'ebony' }
    },
    scoria: {
      name: 'The Scoria', shape: 'Headless multiscale', price: 6400, founders: 5400,
      strings: [6, 7, 8],
      bodies: ['Chambered swamp ash', 'Chambered korina'],
      boards: ['ebony', 'maple'],
      pickups: ['Two humbuckers, coil split'],
      bridges: ['Headless bridge'],
      necks: BOLT_ON_NECKS, joint: 'bolt-on',
      multiscale: 'standard',
      defaults: { finish: 'charcoal', hardware: 'black', board: 'ebony' }
    }
  };
  var MODEL_ORDER = ['andesite', 'tephra', 'rhyolite', 'basalt', 'scoria'];

  var STRINGS = { 6: 0, 7: 350, 8: 600 };

  var GRADES = [
    { id: 'select', name: 'Select', desc: 'Straight-grained, matched body and neck', price: 0, figure: 0.35 },
    { id: 'master', name: 'Master', desc: 'Figured top, flame or quilt', price: 650, figure: 1 },
    { id: 'reserve', name: 'Reserve', desc: 'One bookmatched board you choose with us on video', price: 1500, figure: 1.3 }
  ];

  var FINISHES = [
    { id: 'satin-black', name: 'Satin Black', opaque: true, sheen: 0.06, stops: ['#2a2a2e', '#151517', '#0a0a0b', '#030303'] },
    { id: 'gloss-black', name: 'Gloss Black', opaque: true, sheen: 0.34, stops: ['#2a2a2e', '#151517', '#0a0a0b', '#030303'] },
    { id: 'bone', name: 'Bone White', opaque: true, sheen: 0.3, stops: ['#f4efe4', '#e2dac8', '#b9ae97', '#6f6656'] },
    { id: 'oxblood', name: 'Oxblood', opaque: true, sheen: 0.3, stops: ['#7a2a2a', '#5a1c1c', '#3a1010', '#1a0606'] },
    { id: 'natural', name: 'Natural', sheen: 0.22, stops: ['#f0c98a', '#d49c58', '#9a6430', '#3b220e'] },
    { id: 'amber', name: 'Ember Amber Burst', sheen: 0.22, stops: ['#f4b860', '#c7701f', '#4a1d07', '#0d0503'] },
    { id: 'cherry', name: 'Cherry Burst', sheen: 0.22, stops: ['#e2683a', '#a62b1c', '#3d0c08', '#0c0302'] },
    { id: 'teal', name: 'Glacier Teal Burst', sheen: 0.22, stops: ['#6fb3b4', '#2c7480', '#123c48', '#06141a'] },
    { id: 'sage', name: 'Sage Burst', sheen: 0.24, stops: ['#a6b49a', '#7f8f74', '#4c5846', '#1f241c'] },
    { id: 'violet', name: 'Violet Burst', sheen: 0.22, stops: ['#9c7bb8', '#5a3a7c', '#24143a', '#08040e'] },
    { id: 'charcoal', name: 'Charcoal Burst', sheen: 0.22, stops: ['#3e3e45', '#17171a', '#0b0b0d', '#020202'] }
  ];
  var TRANSLUCENT_PRICE = 450;

  var COATS = [
    { id: 'poly', name: 'Polyurethane', price: 0 },
    { id: 'nitro', name: 'Nitrocellulose lacquer', price: 600 }
  ];

  var BOARDS = {
    ebony: { name: 'Ebony', stops: ['#2a211b', '#16110e', '#0b0807'] },
    maple: { name: 'Roasted maple', stops: ['#c48a4f', '#9a612f', '#6a3f1b'] }
  };

  var HARDWARE = [
    { id: 'nickel', name: 'Nickel', price: 0, stops: ['#f4f4f4', '#b9b9bc', '#5d5d62', '#dcdcde'] },
    { id: 'black', name: 'Black', price: 0, stops: ['#5a5a5e', '#26262a', '#0c0c0e', '#3c3c40'] },
    { id: 'gold', name: 'Gold', price: 250, stops: ['#f6e3ad', '#c9a35c', '#7a5a24', '#e8cf8c'] },
    { id: 'aged', name: 'Aged nickel', price: 250, stops: ['#e4dccb', '#a9a08c', '#5a5446', '#cfc6b2'] }
  ];

  var INLAYS = [
    { id: 'pearl', name: 'Pearl shards', price: 0, stops: ['#fbf7ee', '#cfe3e6', '#e9d7f0', '#f7efe0'] },
    { id: 'abalone', name: 'Abalone shards', price: 300, stops: ['#7fe0c8', '#2f8fb0', '#6a4fb3', '#a8e6a0'] },
    { id: 'brass', name: 'Brass shards', price: 300, stops: ['#f6e3ad', '#c9a35c', '#8a6428', '#e8cf8c'] }
  ];

  var MULTISCALE_PRICE = 450;
  var BRIDGE_UPGRADE_PRICE = 350;
  var DEPOSIT_RATE = 0.3;

  var root, preview, state, touched = {}, svgCache = {}, currentModelShown = null;

  function byId(list, id) {
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }
  function neckOption(m, id) {
    for (var i = 0; i < m.necks.length; i++) if (m.necks[i].id === id) return m.necks[i];
    return null;
  }
  function money(n) { return '$' + n.toLocaleString('en-US'); }
  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (attrs[k] === false || attrs[k] == null) return;
      e.setAttribute(k, attrs[k] === true ? '' : attrs[k]);
    });
    if (html != null) e.innerHTML = html;
    return e;
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function swatchBg(stops) {
    return 'radial-gradient(circle at 40% 40%,' + stops[0] + ',' + stops[1] + ' 55%,' + stops[stops.length - 1] + ')';
  }

  /* ---------- state ---------- */

  function defaultState(slug) {
    var m = MODELS[slug];
    return {
      model: slug,
      strings: 6,
      body: 0,
      grade: 'master',
      finish: m.defaults.finish,
      coat: 'poly',
      board: m.defaults.board,
      neck: m.necks[0].id,
      hardware: m.defaults.hardware,
      bridge: 0,
      pickups: 0,
      inlay: 'pearl',
      multiscale: false,
      bridgeUpgrade: false
    };
  }

  function normalize(s) {
    var m = MODELS[s.model];
    if (m.strings.indexOf(s.strings) === -1) s.strings = 6;
    if (!(s.body >= 0 && s.body < m.bodies.length)) s.body = 0;
    if (m.boards.indexOf(s.board) === -1) s.board = m.boards[0];
    if (!neckOption(m, s.neck)) s.neck = m.necks[0].id;
    if (!(s.bridge >= 0 && s.bridge < m.bridges.length)) s.bridge = 0;
    if (!(s.pickups >= 0 && s.pickups < m.pickups.length)) s.pickups = 0;
    if (!byId(GRADES, s.grade)) s.grade = 'master';
    if (!byId(FINISHES, s.finish)) s.finish = m.defaults.finish;
    if (!byId(COATS, s.coat)) s.coat = 'poly';
    if (!byId(HARDWARE, s.hardware)) s.hardware = m.defaults.hardware;
    if (!byId(INLAYS, s.inlay)) s.inlay = 'pearl';
    if (m.multiscale !== 'option') s.multiscale = false;
    if (s.model === 'scoria') s.bridgeUpgrade = false;
    return s;
  }

  var PARAMS = {
    model: 'model', strings: 'strings', body: 'body', grade: 'grade', finish: 'finish', coat: 'coat',
    board: 'board', neck: 'neck', hardware: 'hw', bridge: 'bridge', pickups: 'pu', inlay: 'inlay',
    multiscale: 'ms', bridgeUpgrade: 'bu'
  };
  var NUMERIC = { strings: 1, body: 1, bridge: 1, pickups: 1 };
  var BOOLEAN = { multiscale: 1, bridgeUpgrade: 1 };

  function stateFromUrl() {
    if (!window.URLSearchParams) return null;
    var q = new URLSearchParams(window.location.search);
    var slug = (q.get('model') || '').toLowerCase();
    if (!MODELS[slug]) return null;
    var s = defaultState(slug);
    Object.keys(PARAMS).forEach(function (k) {
      if (k === 'model' || !q.has(PARAMS[k])) return;
      var v = q.get(PARAMS[k]);
      if (NUMERIC[k]) s[k] = parseInt(v, 10);
      else if (BOOLEAN[k]) s[k] = v === '1';
      else s[k] = v;
      touched[k] = true;
    });
    return normalize(s);
  }

  function shareUrl() {
    var q = new URLSearchParams();
    Object.keys(PARAMS).forEach(function (k) {
      var v = state[k];
      if (BOOLEAN[k]) { if (v) q.set(PARAMS[k], '1'); return; }
      q.set(PARAMS[k], String(v));
    });
    return window.location.origin + window.location.pathname + '?' + q.toString() + '#configure';
  }

  /* ---------- pricing ---------- */

  function lineItems() {
    var m = MODELS[state.model];
    var items = [{ label: m.name + ' base', price: m.price, base: true }];
    if (STRINGS[state.strings]) items.push({ label: state.strings + '-string', price: STRINGS[state.strings] });
    var nk = neckOption(m, state.neck);
    if (nk.price) items.push({ label: NECKS[nk.id].name + ' neck', price: nk.price });
    var g = byId(GRADES, state.grade);
    if (g.price) items.push({ label: g.name + ' wood grade', price: g.price });
    var f = byId(FINISHES, state.finish);
    if (!f.opaque) items.push({ label: 'Translucent / burst finish', price: TRANSLUCENT_PRICE });
    var c = byId(COATS, state.coat);
    if (c.price) items.push({ label: c.name, price: c.price });
    var h = byId(HARDWARE, state.hardware);
    if (h.price) items.push({ label: h.name + ' hardware', price: h.price });
    var i = byId(INLAYS, state.inlay);
    if (i.price) items.push({ label: i.name, price: i.price });
    if (state.multiscale) items.push({ label: 'Multiscale', price: MULTISCALE_PRICE });
    if (state.bridgeUpgrade) items.push({ label: 'Premium bridge upgrade', price: BRIDGE_UPGRADE_PRICE });
    return items;
  }
  function total() {
    return lineItems().reduce(function (sum, it) { return sum + it.price; }, 0);
  }
  // Founders' Run price: the same build with the Founders' base price instead of list.
  function foundersTotal() {
    var m = MODELS[state.model];
    return total() - (m.price - m.founders);
  }

  function specLines() {
    var m = MODELS[state.model];
    var g = byId(GRADES, state.grade), f = byId(FINISHES, state.finish), c = byId(COATS, state.coat);
    return [
      ['Model', m.name + ' (' + m.shape + ')'],
      ['Strings', state.strings + '-string'],
      ['Body', m.bodies[state.body]],
      ['Neck wood', NECKS[state.neck].name + (m.joint === 'set' ? ', glued-in set neck' : ', bolt-on')],
      ['Wood grade', g.name + ': ' + g.desc],
      ['Finish', f.name + (f.opaque ? ' (solid color)' : ' (translucent)') + ', ' + c.name.toLowerCase()],
      ['Fretboard', BOARDS[state.board].name + (state.board === 'maple' && state.neck === 'mahogany' ? ' (separate board on the mahogany neck)' : '')],
      ['Hardware', byId(HARDWARE, state.hardware).name],
      ['Bridge', m.bridges[state.bridge] + (state.bridgeUpgrade ? ', premium upgrade' : '')],
      ['Pickups', m.pickups[state.pickups]],
      ['Inlays', byId(INLAYS, state.inlay).name],
      ['Scale', m.multiscale === 'standard' ? 'Multiscale (standard)' : (state.multiscale ? 'Multiscale' : 'Standard')]
    ];
  }

  /* ---------- the guitar illustration ---------- */

  function prefixIds(text) {
    return text
      .replace(/\bid="([\w-]+)"/g, 'id="cfg-$1"')
      .replace(/url\(#([\w-]+)\)/g, 'url(#cfg-$1)');
  }

  function loadSvg(slug) {
    if (svgCache[slug]) return Promise.resolve(svgCache[slug]);
    return fetch('assets/render-' + slug + '.svg').then(function (r) {
      if (!r.ok) throw new Error('render ' + r.status);
      return r.text();
    }).then(function (text) {
      svgCache[slug] = prefixIds(text);
      return svgCache[slug];
    });
  }

  function setStops(svg, gradId, colors) {
    var g = svg.querySelector('#cfg-' + gradId);
    if (!g) return;
    var stops = g.querySelectorAll('stop');
    for (var i = 0; i < stops.length && i < colors.length; i++) stops[i].setAttribute('stop-color', colors[i]);
  }

  function describe() {
    var m = MODELS[state.model], f = byId(FINISHES, state.finish);
    return 'Your configured ' + m.name.replace('The ', 'Obsidian ') + ' in ' + f.name + ' with ' +
      BOARDS[state.board].name.toLowerCase() + ' fretboard, ' + byId(HARDWARE, state.hardware).name.toLowerCase() +
      ' hardware and ' + byId(INLAYS, state.inlay).name.toLowerCase();
  }

  function paint() {
    var svg = preview.querySelector('svg');
    if (!svg) {
      var img = preview.querySelector('img');
      if (img) img.alt = describe();
      return;
    }
    var f = byId(FINISHES, state.finish);
    var g = byId(GRADES, state.grade);
    var hw = byId(HARDWARE, state.hardware).stops;
    setStops(svg, 'burst', f.stops);
    setStops(svg, 'board', BOARDS[state.board].stops);
    setStops(svg, 'metal', hw);
    setStops(svg, 'knob', hw);
    setStops(svg, 'pearl', byId(INLAYS, state.inlay).stops);
    var sheen = svg.querySelector('#cfg-sheen stop');
    if (sheen) sheen.setAttribute('stop-opacity', String(f.sheen));
    svg.querySelectorAll('[filter="url(#cfg-figure)"], [filter="url(#cfg-figurelight)"]').forEach(function (p) {
      if (!p.hasAttribute('data-o')) p.setAttribute('data-o', p.getAttribute('opacity') || '1');
      var o = parseFloat(p.getAttribute('data-o'));
      p.setAttribute('opacity', f.opaque ? '0' : String(Math.min(1, o * g.figure)));
    });
    var label = describe();
    svg.setAttribute('aria-label', label);
    var t = svg.querySelector('title');
    if (t) t.textContent = label;
  }

  function showModel() {
    var slug = state.model;
    if (currentModelShown === slug) { paint(); return; }
    currentModelShown = slug;
    preview.classList.add('loading');
    loadSvg(slug).then(function (text) {
      if (state.model !== slug) return;
      var doc = new DOMParser().parseFromString(text, 'image/svg+xml');
      var svg = doc.documentElement;
      if (!svg || svg.nodeName.toLowerCase() !== 'svg') throw new Error('bad svg');
      preview.innerHTML = '';
      preview.appendChild(document.importNode(svg, true));
      preview.classList.remove('static');
      paint();
    }).catch(function () {
      // Static fallback (e.g. opened from disk): show the stock render without live colors.
      if (state.model !== slug) return;
      preview.innerHTML = '';
      preview.appendChild(el('img', { src: 'assets/render-' + slug + '.svg', alt: describe(), width: 1600, height: 800 }));
      preview.classList.add('static');
    }).then(function () { preview.classList.remove('loading'); });
  }

  /* ---------- controls ---------- */

  function group(key, legend, hint) {
    var fs = el('fieldset', { class: 'cfg-group', 'data-group': key });
    fs.appendChild(el('legend', null, esc(legend)));
    if (hint) fs.appendChild(el('p', { class: 'cfg-hint' }, hint));
    var opts = el('div', { class: 'cfg-opts' });
    fs.appendChild(opts);
    return { fs: fs, opts: opts };
  }

  function choice(name, value, checked, label, sub, price, opts) {
    opts = opts || {};
    var id = 'cfg-' + name + '-' + String(value).replace(/\W/g, '');
    var wrap = el('label', { class: 'cfg-choice' + (opts.swatch ? ' swatch' : '') + (opts.card ? ' card' : '') + (opts.disabled ? ' disabled' : ''), for: id });
    var input = el('input', {
      type: opts.type || 'radio', name: 'cfg-' + name, id: id, value: value,
      checked: !!checked, disabled: !!opts.disabled
    });
    wrap.appendChild(input);
    var body = el('span', { class: 'cfg-choice-body' });
    if (opts.swatch) body.appendChild(el('span', { class: 'chip', 'aria-hidden': 'true', style: 'background:' + opts.swatch }));
    var text = el('span', { class: 'cfg-choice-text' });
    text.appendChild(el('span', { class: 'cfg-choice-name' }, esc(label)));
    if (sub) text.appendChild(el('span', { class: 'cfg-choice-sub' }, esc(sub)));
    body.appendChild(text);
    body.appendChild(el('span', { class: 'cfg-choice-price' }, price ? '+' + money(price) : (opts.included === false ? '' : 'Included')));
    wrap.appendChild(body);
    return wrap;
  }

  function build() {
    var m = MODELS[state.model];
    var form = root.querySelector('#cfg-options');
    form.innerHTML = '';
    var n = 0;
    function add(g) { n++; g.fs.querySelector('legend').insertAdjacentHTML('afterbegin', '<span class="cfg-step">' + n + '</span>'); form.appendChild(g.fs); }

    var g = group('model', 'Model');
    MODEL_ORDER.forEach(function (slug) {
      var mm = MODELS[slug];
      g.opts.appendChild(choice('model', slug, state.model === slug, mm.name.replace('The ', ''), mm.shape, 0,
        { card: true, included: false }));
      g.opts.lastChild.querySelector('.cfg-choice-price').textContent = 'From ' + money(mm.price);
    });
    add(g);

    g = group('strings', 'Strings', m.strings.length === 1 ? m.name + ' is built as a 6-string.' : null);
    [6, 7, 8].forEach(function (s) {
      var ok = m.strings.indexOf(s) !== -1;
      g.opts.appendChild(choice('strings', s, state.strings === s, s + '-string', ok ? null : 'Tephra or Scoria only', STRINGS[s], { disabled: !ok }));
    });
    add(g);

    g = group('body', 'Body wood');
    m.bodies.forEach(function (b, i) { g.opts.appendChild(choice('body', i, state.body === i, b, null, 0)); });
    add(g);

    g = group('neck', 'Neck wood', m.joint === 'set' ?
      'Mahogany is standard on the Basalt&rsquo;s glued-in set neck. Either wood is made to your profile spec.' :
      'Roasted maple is standard on the ' + esc(m.name.replace('The ', '')) + '. Either wood is made to your profile spec.');
    m.necks.forEach(function (nk) { g.opts.appendChild(choice('neck', nk.id, state.neck === nk.id, NECKS[nk.id].name, nk === m.necks[0] ? 'Standard' : null, nk.price)); });
    add(g);

    g = group('grade', 'Wood grade');
    GRADES.forEach(function (gr) { g.opts.appendChild(choice('grade', gr.id, state.grade === gr.id, gr.name, gr.desc, gr.price)); });
    g.fs.appendChild(el('p', { class: 'cfg-figure-note', id: 'cfg-figure-note', hidden: true },
      'A figured top only shows through a translucent finish. Under a solid color, Select grade looks the same.'));
    add(g);

    g = group('finish', 'Finish color', 'Solid colors are included. Translucent colors and bursts let the wood figure show through (+' + money(TRANSLUCENT_PRICE) + ').');
    FINISHES.forEach(function (f) {
      g.opts.appendChild(choice('finish', f.id, state.finish === f.id, f.name, f.opaque ? 'Solid' : 'Translucent',
        f.opaque ? 0 : TRANSLUCENT_PRICE, { swatch: swatchBg(f.stops) }));
    });
    add(g);

    g = group('coat', 'Finish coat');
    COATS.forEach(function (c) {
      g.opts.appendChild(choice('coat', c.id, state.coat === c.id, c.name, c.id === 'nitro' ? 'Thin, ages with you' : 'Tough, stays as built', c.price));
    });
    add(g);

    g = group('board', 'Fretboard', m.boards.length === 1 ? m.name + ' is built with an ebony board.' : null);
    m.boards.forEach(function (b) {
      g.opts.appendChild(choice('board', b, state.board === b, BOARDS[b].name, null, 0, { swatch: swatchBg(BOARDS[b].stops) }));
    });
    if (m.boards.indexOf('maple') !== -1) {
      g.fs.appendChild(el('p', { class: 'cfg-figure-note', id: 'cfg-board-note', hidden: true },
        'A mahogany neck takes a separate fretboard, so a roasted-maple board is glued on as its own piece.'));
    }
    add(g);

    g = group('hardware', 'Hardware');
    HARDWARE.forEach(function (h) {
      g.opts.appendChild(choice('hardware', h.id, state.hardware === h.id, h.name, null, h.price, { swatch: swatchBg(h.stops) }));
    });
    add(g);

    g = group('inlay', 'Inlays');
    INLAYS.forEach(function (i) {
      g.opts.appendChild(choice('inlay', i.id, state.inlay === i.id, i.name, null, i.price, { swatch: swatchBg(i.stops) }));
    });
    add(g);

    g = group('pickups', 'Pickups', 'Exact pickups are chosen with you on the spec call, from independent boutique winders.');
    m.pickups.forEach(function (p, i) { g.opts.appendChild(choice('pickups', i, state.pickups === i, p, null, 0)); });
    add(g);

    g = group('bridge', 'Bridge');
    m.bridges.forEach(function (b, i) { g.opts.appendChild(choice('bridge', i, state.bridge === i, b, null, 0)); });
    if (state.model !== 'scoria') {
      g.opts.appendChild(choice('bridgeUpgrade', '1', state.bridgeUpgrade, 'Premium bridge upgrade', 'Upgraded tremolo or fixed bridge', BRIDGE_UPGRADE_PRICE, { type: 'checkbox' }));
    }
    add(g);

    if (m.multiscale !== 'none') {
      g = group('multiscale', 'Scale length');
      if (m.multiscale === 'standard') {
        g.opts.appendChild(el('p', { class: 'cfg-hint' }, 'Multiscale fanned frets are standard on the Scoria.'));
      } else {
        g.opts.appendChild(choice('multiscale', '1', state.multiscale, 'Multiscale fanned frets', 'Tighter low strings, slinkier highs', MULTISCALE_PRICE, { type: 'checkbox' }));
      }
      add(g);
    }
  }

  function update() {
    var items = lineItems();
    var t = total();
    root.querySelector('#cfg-total').textContent = money(t);
    root.querySelector('#cfg-deposit').textContent = money(Math.round(t * DEPOSIT_RATE));
    var ft = foundersTotal();
    var fEl = root.querySelector('#cfg-founders-total');
    if (fEl) fEl.textContent = money(ft);
    var fDep = root.querySelector('#cfg-founders-deposit');
    if (fDep) fDep.textContent = money(Math.round(ft * DEPOSIT_RATE));
    root.querySelector('#cfg-badge-total').textContent = money(t);
    var note = root.querySelector('#cfg-figure-note');
    if (note) note.hidden = !(byId(FINISHES, state.finish).opaque && state.grade !== 'select');
    var boardNote = root.querySelector('#cfg-board-note');
    if (boardNote) boardNote.hidden = !(state.neck === 'mahogany' && state.board === 'maple');
    var list = root.querySelector('#cfg-lines');
    list.innerHTML = items.map(function (it) {
      return '<li><span>' + esc(it.label) + '</span><span>' + (it.base ? money(it.price) : '+' + money(it.price)) + '</span></li>';
    }).join('');
    root.querySelector('#cfg-model-name').textContent = MODELS[state.model].name;
    root.querySelector('#cfg-finish-name').textContent = byId(FINISHES, state.finish).name;
    if (window.history && history.replaceState) {
      history.replaceState(null, '', shareUrl().replace(window.location.origin, '').replace(/#configure$/, window.location.hash || ''));
    }
  }

  function onChange(e) {
    var t = e.target;
    if (!t.name || t.name.indexOf('cfg-') !== 0) return;
    var key = t.name.slice(4);
    touched[key] = true;
    if (key === 'model') {
      var next = defaultState(t.value);
      ['strings', 'body', 'grade', 'finish', 'coat', 'board', 'neck', 'hardware', 'inlay', 'multiscale', 'bridgeUpgrade'].forEach(function (k) {
        if (touched[k]) next[k] = state[k];
      });
      state = normalize(next);
      build();
      showModel();
      update();
      var first = root.querySelector('input[name="cfg-model"]:checked');
      if (first) first.focus();
      return;
    }
    if (t.type === 'checkbox') state[key] = t.checked;
    else state[key] = NUMERIC[key] ? parseInt(t.value, 10) : t.value;
    normalize(state);
    paint();
    update();
  }

  /* ---------- hand-off to the request form ---------- */

  function budgetIndex(t) {
    if (t < 5500) return 0;
    if (t <= 6500) return 1;
    if (t <= 8000) return 2;
    return 3;
  }

  function sendToForm() {
    var form = document.querySelector('form[name="custom-build"]');
    if (!form) return;
    var t = total();
    var spec = specLines();
    var text = 'Configured build, estimated ' + money(t) + '\n' +
      'Founders\' Run price (Nos. 1\u201325): ' + money(foundersTotal()) + '\n' +
      spec.map(function (l) { return l[0] + ': ' + l[1]; }).join('\n') + '\n' +
      'Price lines: ' + lineItems().map(function (it) { return it.label + ' ' + money(it.price); }).join('; ') + '\n' +
      'Link: ' + shareUrl();

    var set = function (sel, fn) { var x = form.querySelector(sel); if (x) fn(x); };
    set('[name="configuration"]', function (x) { x.value = text; });
    set('#model', function (x) { x.value = state.model; });
    set('#strings', function (x) { x.selectedIndex = [6, 7, 8].indexOf(state.strings); });
    set('#grade', function (x) { x.selectedIndex = ['select', 'master', 'reserve'].indexOf(state.grade); });
    set('#budget', function (x) { x.selectedIndex = budgetIndex(t); });
    set('#finish', function (x) { x.value = byId(FINISHES, state.finish).name + ', ' + byId(COATS, state.coat).name.toLowerCase(); });

    var box = document.getElementById('cfg-form-summary');
    if (box) {
      box.querySelector('[data-cfg-total]').textContent = money(t);
      box.querySelector('ul').innerHTML = spec.map(function (l) {
        return '<li><span>' + esc(l[0]) + '</span><span>' + esc(l[1]) + '</span></li>';
      }).join('') + '<li><span>Founders&rsquo; Run price (Nos. 1&ndash;25)</span><span>' + money(foundersTotal()) + '</span></li>';
      box.hidden = false;
    }
    var target = document.getElementById('request');
    if (target) target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    var name = document.getElementById('name');
    if (name) setTimeout(function () { name.focus({ preventScroll: true }); }, 400);
  }

  function copyLink(btn) {
    var url = shareUrl();
    var done = function () {
      var label = btn.textContent;
      btn.textContent = 'Link copied';
      setTimeout(function () { btn.textContent = label; }, 1800);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(done, function () { window.prompt('Copy this link:', url); });
    } else {
      window.prompt('Copy this link:', url);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    root = document.getElementById('configure');
    if (!root) return;
    preview = root.querySelector('#cfg-preview');
    state = stateFromUrl() || defaultState('tephra');
    root.hidden = false;
    build();
    showModel();
    update();
    root.querySelector('#cfg-options').addEventListener('change', onChange);
    root.querySelector('#cfg-send').addEventListener('click', sendToForm);
    root.querySelector('#cfg-copy').addEventListener('click', function (e) { copyLink(e.currentTarget); });
    var edit = document.getElementById('cfg-edit');
    if (edit) edit.addEventListener('click', function () {
      root.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

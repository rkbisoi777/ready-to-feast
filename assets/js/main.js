/* Ready to Feast: flavour cards + custom 6-pack box builder */
(function () {
  'use strict';

  // Optional: set to your checkout / WhatsApp / form URL. The box contents are
  // appended as a `box` query parameter, e.g. ?box=tandoori,pesto,...
  // Leave empty to show an on-page order summary instead.
  var ORDER_URL = '';

  var BOX_SIZE = 6;
  var STORAGE_KEY = 'rtf-box';

  var FLAVOURS = [
    {
      id: 'tandoori',
      name: 'Classic Smoke Tandoori',
      tag: 'Smoky',
      profile: 'Bold, smoky and intensely aromatic. Freshly ground spices, mustard oil and smoked paprika.',
      pairing: 'Mint yogurt dip, onion rings, toasted naan or quinoa.',
      heat: 2
    },
    {
      id: 'onion',
      name: 'Caramelised Onion',
      tag: 'Umami',
      profile: 'Rich, savoury and subtly sweet. Slow-cooked onions and black pepper for a steakhouse feel.',
      pairing: 'Roasted garlic mash, sautéed veggies or a sourdough sandwich.',
      heat: 1
    },
    {
      id: 'garlic',
      name: 'Butter Garlic',
      tag: 'Creamy',
      profile: 'Creamy, comforting and full of roasted garlic and herbs, balanced with fresh parsley.',
      pairing: 'Whole-wheat pasta, steamed broccoli or warm rice bowls.',
      heat: 0
    },
    {
      id: 'pesto',
      name: 'Pesto',
      tag: 'Herby',
      profile: 'Earthy, aromatic and fresh. Crushed basil, toasted pine nuts, olive oil and sharp parmesan notes.',
      pairing: 'Cherry tomatoes, zucchini noodles or a Mediterranean salad.',
      heat: 0
    },
    {
      id: 'thecha',
      name: 'Maharashtrian Thecha',
      tag: 'Fiery',
      profile: 'Spicy, nutty and fiery. Coarse green chillies, roasted garlic and a hint of roasted peanuts.',
      pairing: 'Bhakri, multigrain roti or a cool cucumber salad.',
      heat: 3
    },
    {
      id: 'andhra',
      name: 'Andhra Style 65',
      tag: 'Tangy',
      profile: 'Tangy, spicy and zesty. Curry leaves, crushed red chillies and mustard seeds.',
      pairing: 'Steamed basmati, curd rice or plain as a protein starter.',
      heat: 3
    },
    {
      id: 'dahi',
      name: 'Dahi n Kaali Mirch',
      tag: 'Peppery',
      profile: 'Smooth, velvety and subtly pungent. Thick yogurt, cracked black peppercorns and green cardamom.',
      pairing: 'Roomali roti, jasmine rice or salad wraps.',
      heat: 1
    }
  ];

  var byId = {};
  FLAVOURS.forEach(function (f) { byId[f.id] = f; });

  // ---------- state ----------
  var box = load();

  function load() {
    try {
      var raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return Array.isArray(raw) ? raw.filter(function (id) { return byId[id]; }).slice(0, BOX_SIZE) : [];
    } catch (e) { return []; }
  }
  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(box)); } catch (e) { /* ignore */ }
  }
  function countOf(id) {
    return box.filter(function (x) { return x === id; }).length;
  }

  // ---------- helpers ----------
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function heatLabel(n) {
    return ['Mild', 'Gentle heat', 'Medium heat', 'Hot'][n];
  }

  // ---------- render cards ----------
  var grid = $('[data-flavour-grid]');
  grid.innerHTML = FLAVOURS.map(function (f) {
    var chillies = '';
    for (var i = 0; i < 3; i++) chillies += '<span class="chilli' + (i < f.heat ? ' on' : '') + '"></span>';
    return (
      '<article class="flavour-card flavour--' + f.id + '" data-id="' + f.id + '">' +
        '<div class="flavour-pack" aria-hidden="true"><div class="pack pack--' + f.id + '"><span>' + esc(f.name) + '</span></div></div>' +
        '<div class="flavour-body">' +
          '<div class="flavour-meta"><span class="flavour-tag">' + esc(f.tag) + '</span>' +
          '<span class="heat" title="' + heatLabel(f.heat) + '"><span class="sr-only">' + heatLabel(f.heat) + '</span>' + chillies + '</span></div>' +
          '<h3>' + esc(f.name) + '</h3>' +
          '<p class="flavour-profile">' + esc(f.profile) + '</p>' +
          '<p class="flavour-pair"><strong>Best paired with:</strong> ' + esc(f.pairing) + '</p>' +
          '<div class="flavour-actions">' +
            '<div class="qty" data-qty>' +
              '<button type="button" class="qty-btn" data-remove="' + f.id + '" aria-label="Remove one ' + esc(f.name) + '">&minus;</button>' +
              '<span class="qty-num" data-qty-num aria-live="polite">0</span>' +
              '<button type="button" class="qty-btn" data-add="' + f.id + '" aria-label="Add one ' + esc(f.name) + '">+</button>' +
            '</div>' +
            '<button type="button" class="btn btn-primary btn-sm add-btn" data-add="' + f.id + '">Add to box</button>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }).join('');

  // ---------- render box ----------
  var slotsEl = $('[data-box-slots]');
  var statusEl = $('[data-box-status]');
  var progressEl = $('[data-box-progress]');
  var checkoutBtn = $('[data-checkout]');
  var autofillBtn = $('[data-autofill]');
  var bar = $('[data-box-bar]');
  var barText = $('[data-box-bar-text]');

  function render() {
    var html = '';
    for (var i = 0; i < BOX_SIZE; i++) {
      var id = box[i];
      if (id) {
        html += '<li class="slot slot--filled flavour--' + id + '"><span class="slot-dot"></span>' +
          '<span class="slot-name">' + esc(byId[id].name) + '</span>' +
          '<button type="button" class="slot-remove" data-slot="' + i + '" aria-label="Remove ' + esc(byId[id].name) + ' from slot ' + (i + 1) + '">&times;</button></li>';
      } else {
        html += '<li class="slot slot--empty"><span class="slot-dot"></span><span class="slot-name">Slot ' + (i + 1) + ': empty</span></li>';
      }
    }
    slotsEl.innerHTML = html;

    var n = box.length;
    var full = n >= BOX_SIZE;
    statusEl.textContent = full
      ? 'Box full. Ready to feast!'
      : n + ' of ' + BOX_SIZE + ' slots filled. ' + (BOX_SIZE - n) + ' to go.';
    progressEl.style.width = (n / BOX_SIZE * 100) + '%';
    checkoutBtn.disabled = !full;
    autofillBtn.hidden = full;

    $all('[data-box-count]').forEach(function (el) { el.textContent = n; });
    barText.textContent = n + ' of ' + BOX_SIZE + ' in your box';
    bar.hidden = n === 0;

    $all('.flavour-card').forEach(function (card) {
      var id = card.getAttribute('data-id');
      var c = countOf(id);
      card.classList.toggle('in-box', c > 0);
      $('[data-qty-num]', card).textContent = c;
      $all('[data-add]', card).forEach(function (b) { b.disabled = full; });
      $('[data-remove]', card).disabled = c === 0;
      $('.add-btn', card).textContent = full ? 'Box full' : (c > 0 ? 'Add another' : 'Add to box');
    });
    save();
  }

  function add(id) {
    if (box.length >= BOX_SIZE || !byId[id]) return;
    box.push(id);
    render();
    bump();
  }
  function removeOne(id) {
    var i = box.lastIndexOf(id);
    if (i > -1) { box.splice(i, 1); render(); }
  }
  function bump() {
    $all('.box-toggle, .box-bar').forEach(function (el) {
      el.classList.remove('bump');
      void el.offsetWidth;
      el.classList.add('bump');
    });
  }

  // ---------- events ----------
  document.addEventListener('click', function (e) {
    var t = e.target.closest('button, a');
    if (!t) return;

    if (t.hasAttribute('data-add')) add(t.getAttribute('data-add'));
    else if (t.hasAttribute('data-remove')) removeOne(t.getAttribute('data-remove'));
    else if (t.hasAttribute('data-slot')) { box.splice(+t.getAttribute('data-slot'), 1); render(); }
    else if (t.hasAttribute('data-clear')) { box = []; render(); }
    else if (t.hasAttribute('data-autofill')) {
      while (box.length < BOX_SIZE) box.push(FLAVOURS[Math.floor(Math.random() * FLAVOURS.length)].id);
      render(); bump();
    }
    else if (t.hasAttribute('data-checkout')) checkout();
    else if (t.hasAttribute('data-open-box') || t.classList.contains('box-toggle')) {
      if (t.tagName === 'A') e.preventDefault();
      openBox();
    }
    else if (t.classList.contains('box-close')) closeBox();
  });

  // ---------- box panel (drawer on small screens) ----------
  var panel = $('#box-panel');
  var boxToggle = $('.box-toggle');
  var mq = window.matchMedia('(max-width: 960px)');

  function openBox() {
    if (mq.matches) {
      panel.classList.add('open');
      document.body.classList.add('no-scroll');
      boxToggle.setAttribute('aria-expanded', 'true');
      var close = $('.box-close', panel);
      if (close) close.focus();
    } else {
      document.getElementById('flavours').scrollIntoView({ behavior: 'smooth' });
      panel.classList.add('flash');
      setTimeout(function () { panel.classList.remove('flash'); }, 900);
    }
  }
  function closeBox() {
    panel.classList.remove('open');
    document.body.classList.remove('no-scroll');
    boxToggle.setAttribute('aria-expanded', 'false');
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeBox(); closeNav(); }
  });
  panel.addEventListener('click', function (e) { if (e.target === panel) closeBox(); });

  // ---------- checkout ----------
  var dialog = $('[data-order-dialog]');
  function checkout() {
    if (box.length < BOX_SIZE) return;
    if (ORDER_URL) {
      var sep = ORDER_URL.indexOf('?') > -1 ? '&' : '?';
      window.location.href = ORDER_URL + sep + 'box=' + encodeURIComponent(box.join(','));
      return;
    }
    var counts = {};
    box.forEach(function (id) { counts[id] = (counts[id] || 0) + 1; });
    $('[data-order-summary]').innerHTML = Object.keys(counts).map(function (id) {
      return '<li class="flavour--' + id + '"><span class="slot-dot"></span>' + esc(byId[id].name) + '<strong>&times; ' + counts[id] + '</strong></li>';
    }).join('');
    closeBox();
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else alert('Your box: ' + box.map(function (id) { return byId[id].name; }).join(', '));
  }
  dialog.addEventListener('close', function () {
    if (dialog.returnValue === 'edit') openBox();
  });

  // ---------- mobile nav ----------
  var navToggle = $('.nav-toggle');
  var nav = $('#main-nav');
  function closeNav() {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
  navToggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  $all('a', nav).forEach(function (a) { a.addEventListener('click', closeNav); });

  // ---------- header shadow on scroll ----------
  var header = $('.site-header');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- reveal on scroll ----------
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var el = en.target;
          el.classList.add('visible');
          io.unobserve(el);
          setTimeout(function () { el.classList.remove('reveal', 'visible'); }, 700);
        }
      });
    }, { threshold: 0.12 });
    $all('.section-head, .feature, .flavour-card, .info-card, .step, .review, .faq-list details').forEach(function (el) {
      el.classList.add('reveal');
      io.observe(el);
    });
  }

  render();
})();

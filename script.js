(function () {
  var root = document.documentElement;

  // ----- Theme toggle (remembers the choice when storage is available) -----
  var toggle = document.querySelector('.theme-toggle');
  function currentTheme() {
    if (root.dataset.theme) return root.dataset.theme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  // ----- Mobile menu -----
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.getElementById('nav-links');
  function setMenu(open) {
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    navLinks.classList.toggle('open', open);
  }
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      setMenu(navToggle.getAttribute('aria-expanded') !== 'true');
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
  }

  // ----- Footer year -----
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // ----- ThutoVest screenshot tabs -----
  var shot = document.getElementById('shot');
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.shot-tabs [role="tab"]'));
  function selectTab(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    });
    if (focus) tab.focus();
    var base = tab.getAttribute('data-src');
    shot.classList.add('swap');
    var img = new Image();
    img.onload = img.onerror = function () {
      shot.src = base + '.webp';
      shot.srcset = base + '-sm.webp 800w, ' + base + '.webp 1600w';
      shot.alt = tab.getAttribute('data-alt');
      shot.classList.remove('swap');
    };
    img.src = base + '.webp';
  }
  if (shot && tabs.length) {
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { selectTab(tab, false); });
      tab.addEventListener('keydown', function (e) {
        var next = null;
        if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
        if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
        if (next) { e.preventDefault(); selectTab(next, true); }
      });
    });
  }

  // ----- Reveal sections as they scroll into view -----
  if ('IntersectionObserver' in window) {
    var items = document.querySelectorAll('.section-title, .project, .skill-card, .timeline li, .about-grid, .contact-card');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { el.classList.add('reveal'); io.observe(el); });
  }
})();

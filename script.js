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

// Rochford Strategies — slider and tabs
(function () {
  // Home page slider: left/right arrows, dots, keyboard and auto-advance.
  var slider = document.querySelector('.slider');
  if (slider) {
    var slides = slider.querySelectorAll('.slide');
    var dotsWrap = slider.querySelector('.slider-dots');
    var current = 0;
    var timer;

    slides.forEach(function (_, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Show slide ' + (i + 1));
      b.addEventListener('click', function () { go(i); restart(); });
      dotsWrap.appendChild(b);
    });
    var dots = dotsWrap.querySelectorAll('button');

    function go(i) {
      current = (i + slides.length) % slides.length;
      slides.forEach(function (s, j) {
        s.classList.toggle('active', j === current);
        s.setAttribute('aria-hidden', j === current ? 'false' : 'true');
      });
      dots.forEach(function (d, j) { d.classList.toggle('active', j === current); });
    }
    function restart() {
      clearInterval(timer);
      timer = setInterval(function () { go(current + 1); }, 7000);
    }

    slider.querySelector('.prev').addEventListener('click', function () { go(current - 1); restart(); });
    slider.querySelector('.next').addEventListener('click', function () { go(current + 1); restart(); });
    slider.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { go(current - 1); restart(); }
      if (e.key === 'ArrowRight') { go(current + 1); restart(); }
    });
    go(0);
    restart();
  }

  // Tabbed content (Insights & Information, Consulting).
  document.querySelectorAll('[data-tabs]').forEach(function (group) {
    var tabs = group.querySelectorAll('[role="tab"]');
    function select(tab) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        var n = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = tabs[(i + 1) % tabs.length];
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = tabs[(i - 1 + tabs.length) % tabs.length];
        if (n) { e.preventDefault(); select(n); n.focus(); }
      });
    });
    select(tabs[0]);
  });

  // Contact form: no destination yet, so just acknowledge locally.
  var form = document.querySelector('.form');
  if (form) {
    form.addEventListener('submit', function (e) { e.preventDefault(); });
  }
})();

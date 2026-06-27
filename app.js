/* Carlos Cabrera — resume interactions (vanilla, no deps) */
(function () {
  'use strict';

  // current year in footer
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  // scroll-reveal
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // count-up stats
  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = (el.textContent.indexOf('+') > -1) ? '+' : '';
    var start = 0, dur = 900, t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      el.textContent = Math.round(start + (target - start) * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var nums = document.querySelectorAll('.num[data-count]');
  if ('IntersectionObserver' in window) {
    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); io2.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    nums.forEach(function (el) { io2.observe(el); });
  }

  // --- i18n: EN/ES language toggle ---
  var ROLES = {
    en: ['Information Security Specialist','Cyber Incident Response Specialist','Threat Hunter','Incident Responder'],
    es: ['Especialista en Seguridad de la Información','Especialista en Respuesta a Incidentes','Caza de Amenazas','Respondedor de Incidentes']
  };
  var TITLE = {
    en: 'Carlos Cabrera — Information Security Specialist',
    es: 'Carlos Cabrera — Especialista en Seguridad de la Información'
  };
  var lang = 'en';
  try {
    lang = localStorage.getItem('lang') ||
      ((navigator.language || '').toLowerCase().indexOf('es') === 0 ? 'es' : 'en');
  } catch (e) {}

  function setLang(l) {
    lang = (l === 'es') ? 'es' : 'en';
    document.documentElement.lang = lang;
    document.title = TITLE[lang];
    try { localStorage.setItem('lang', lang); } catch (e) {}
    var btns = document.querySelectorAll('.langtoggle [data-setlang]');
    for (var k = 0; k < btns.length; k++) {
      btns[k].setAttribute('aria-pressed', btns[k].getAttribute('data-setlang') === lang ? 'true' : 'false');
    }
  }

  var tbtns = document.querySelectorAll('.langtoggle [data-setlang]');
  for (var b = 0; b < tbtns.length; b++) {
    tbtns[b].addEventListener('click', function () { setLang(this.getAttribute('data-setlang')); });
  }
  setLang(lang);

  // rotating role subtitle (localized — reads current language each tick)
  var roleEl = document.getElementById('role');
  if (roleEl) {
    var i = 0;
    roleEl.textContent = ROLES[lang][0];
    setInterval(function () {
      var list = ROLES[lang];
      i = (i + 1) % list.length;
      roleEl.style.opacity = 0;
      setTimeout(function () { roleEl.textContent = list[i]; roleEl.style.opacity = 1; }, 280);
    }, 3200);
    roleEl.style.transition = 'opacity .28s ease';
  }
})();

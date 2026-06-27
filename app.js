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

  // rotating role subtitle
  var roleEl = document.getElementById('role');
  if (roleEl) {
    var roles = [
      'Information Security Specialist',
      'Cyber Incident Response Specialist',
      'Malware Analysis Instructor',
      'Threat Hunter',
      'Incident Responder'
    ];
    var i = 0;
    setInterval(function () {
      i = (i + 1) % roles.length;
      roleEl.style.opacity = 0;
      setTimeout(function () { roleEl.textContent = roles[i]; roleEl.style.opacity = 1; }, 280);
    }, 3200);
    roleEl.style.transition = 'opacity .28s ease';
  }
})();

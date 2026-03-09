// ==========================================================================
// homepage-animations.js — V2 Module Animations
// Counter animation (Notables) + Intersection Observer entrances
// ==========================================================================

(function () {
  'use strict';

  // --- Easing function (ease-out cubic) ---
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  // --- Count-up animation for a single element ---
  function animateCounter(el, targetValue, duration, delay) {
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';

    setTimeout(() => {
      const start = performance.now();

      function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(progress);
        const current = Math.round(eased * targetValue);

        el.textContent = prefix + current + suffix;

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      }

      requestAnimationFrame(tick);
    }, delay);
  }

  // --- Initialize Notables (Module 2) ---
  function initNotables() {
    const section = document.querySelector('.hero-notables');
    if (!section) return;

    const items = section.querySelectorAll('.notable-item');
    if (!items.length) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          items.forEach((item, i) => {
            const staggerDelay = i * 100;

            // Fade in the item
            setTimeout(() => {
              item.classList.add('visible');
            }, staggerDelay);

            // Count-up animation (skip if reduced motion)
            if (!prefersReducedMotion) {
              const statEl = item.querySelector('.notable-stat');
              const target = parseInt(statEl.dataset.target, 10);

              // Only animate numeric values (not #1)
              if (!isNaN(target) && target > 1) {
                animateCounter(statEl, target, 800, staggerDelay);
              }
            }
          });

          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    observer.observe(section);
  }

  // --- Initialize section entrance animations (Modules 1 & 3) ---
  function initSectionEntrances() {
    const sections = document.querySelectorAll('.brand-marquee, .discipline-ticker');
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    sections.forEach(section => observer.observe(section));
  }

  // --- Public init function (called after renderWork completes) ---
  window.initHomepageAnimations = function () {
    initNotables();
    initSectionEntrances();
  };
})();

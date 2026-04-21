/* ============================================================
   Open Agency — main.js
   Vanilla, no dependencies. Kept lean.
   Responsibilities:
     1. Hero "dissolve" animation (prefers-reduced-motion safe)
     2. Intersection-based reveal
     3. Active-section highlight in nav
   ============================================================ */

(() => {
  'use strict';

  /* ---------- Reveal on scroll ---------- */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ('IntersectionObserver' in window && !prefersReduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '-10% 0px', threshold: 0.01 });

    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
  }

  /* ---------- Hero dissolve animation ----------
     A simple SVG-based effect: a portrait silhouette whose
     right half dissolves into a grid of pixels as the user
     scrolls. No frame loop — driven by scroll position.      */
  const dissolveMask = document.getElementById('dissolveMask');
  if (dissolveMask && !prefersReduced) {
    const cells = Array.from(dissolveMask.querySelectorAll('rect'));
    // pre-compute a shuffled order so dissolution is scattered, not uniform.
    const order = cells.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    const update = () => {
      // Progress: 0 when the hero top is at viewport top; 1 when hero fully scrolled.
      const hero = document.querySelector('.hero-visual');
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress from 0 (hero at top of viewport) to 1 (hero mostly scrolled)
      const raw = 1 - (rect.bottom / (vh + rect.height));
      const progress = Math.max(0, Math.min(1, raw * 1.4));
      const cut = Math.floor(progress * cells.length);
      for (let i = 0; i < cells.length; i++) {
        const o = order[i];
        cells[o].setAttribute('fill-opacity', i < cut ? '0' : '1');
      }
    };
    update();
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => { update(); ticking = false; });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ---------- Active nav link on scroll ---------- */
  const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
  if (navLinks.length && 'IntersectionObserver' in window) {
    const sectionIds = Array.from(navLinks)
      .map((a) => a.getAttribute('href').slice(1))
      .filter(Boolean);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const linkFor = (id) =>
      Array.from(navLinks).find((a) => a.getAttribute('href') === `#${id}`);

    const setActive = (id) => {
      navLinks.forEach((a) => {
        const on = a.getAttribute('href') === `#${id}`;
        if (on) a.style.color = 'var(--accent)';
        else a.style.color = '';
      });
    };

    const sio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

    sections.forEach((s) => sio.observe(s));
  }

  /* ---------- Auto-stamp "last updated" year ---------- */
  const yearEl = document.getElementById('auto-year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();

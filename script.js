/* =============================================
   MERI PÉREZ — UGC PORTFOLIO
   script.js
   ============================================= */

(function () {
  'use strict';

  /* ---- NAV + FLOATING CTA SCROLL STATE ---- */
  const nav = document.getElementById('nav');
  const floatingCTA = document.querySelector('.floating-cta');

  function onScroll() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
    if (floatingCTA) floatingCTA.classList.toggle('visible', window.scrollY > window.innerHeight * 0.5);
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- MOBILE MENU ---- */
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.getElementById('mobileMenu');
  let menuOpen = false;

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      menuOpen = !menuOpen;
      toggle.setAttribute('aria-expanded', menuOpen);
      mobileMenu.classList.toggle('open', menuOpen);
      document.body.style.overflow = menuOpen ? 'hidden' : '';
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        menuOpen = false;
        toggle.setAttribute('aria-expanded', false);
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- PORTFOLIO FILTER ---- */
  const filtros = document.querySelectorAll('.filtro');
  const portfolioSectors = document.querySelectorAll('.portfolio-sector');

  filtros.forEach(btn => {
    btn.addEventListener('click', () => {
      filtros.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      portfolioSectors.forEach(sector => {
        if (filter === 'all') {
          sector.classList.remove('hidden');
        } else {
          const match = sector.dataset.sector === filter;
          sector.classList.toggle('hidden', !match);
        }
      });
    });
  });

  /* ---- VIDEO HOVER PLAY/PAUSE (portfolio) ---- */
  document.querySelectorAll('.portfolio-item').forEach(item => {
    const video = item.querySelector('video');
    if (!video) return;

    item.addEventListener('mouseenter', () => {
      video.play().catch(() => {});
    });
    item.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });
  });

  /* ---- LIGHTBOX ---- */
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lightboxVideo = lightbox.querySelector('video');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    function openLightbox(src) {
      lightboxVideo.querySelector('source').src = src;
      lightboxVideo.load();
      lightboxVideo.play().catch(() => {});
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
      lightboxVideo.pause();
      lightboxVideo.querySelector('source').src = '';
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('.portfolio-item').forEach(item => {
      item.addEventListener('click', () => {
        const videoEl = item.querySelector('video source');
        if (videoEl) openLightbox(videoEl.src);
      });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  /* ---- FADE-IN SCROLL ANIMATIONS ---- */
  const fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    fadeEls.forEach(el => fadeObserver.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  /* ---- INIT ---- */
  onScroll();

})();

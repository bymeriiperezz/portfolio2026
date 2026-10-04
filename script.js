/* =============================================
   MERI PÉREZ — UGC PORTFOLIO
   script.js
   ============================================= */

(function () {
  'use strict';

  /* ---- NAV SCROLL STATE ---- */
  const nav = document.getElementById('nav');
  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
    floatingCTA.classList.toggle('visible', window.scrollY > window.innerHeight * 0.5);
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- MOBILE MENU ---- */
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.getElementById('mobileMenu');
  let menuOpen = false;

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

  /* ---- FLOATING CTA ---- */
  const floatingCTA = document.querySelector('.floating-cta');

  /* ---- PORTFOLIO FILTER ---- */
  const filtros = document.querySelectorAll('.filtro');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filtros.forEach(btn => {
    btn.addEventListener('click', () => {
      filtros.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      portfolioItems.forEach(item => {
        const match = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('hidden', !match);
      });
    });
  });

  /* ---- LAZY VIDEO LOADING (Intersection Observer) ---- */
  const lazyVideos = document.querySelectorAll('.portfolio-video-wrap video[preload="none"]');

  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const video = entry.target;
          video.load();
          videoObserver.unobserve(video);
        }
      });
    }, { rootMargin: '200px' });

    lazyVideos.forEach(v => videoObserver.observe(v));
  } else {
    // Fallback: load all
    lazyVideos.forEach(v => v.load());
  }

  /* ---- VIDEO HOVER PLAY/PAUSE (portfolio) ---- */
  portfolioItems.forEach(item => {
    const video = item.querySelector('video');
    if (!video) return;

    item.addEventListener('mouseenter', () => {
      if (video.readyState >= 2) {
        video.play().catch(() => {});
      } else {
        video.load();
        video.addEventListener('canplay', () => video.play().catch(() => {}), { once: true });
      }
    });
    item.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });
  });

  /* ---- LIGHTBOX ---- */
  const lightbox = document.getElementById('lightbox');
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

  portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
      const videoEl = item.querySelector('video source');
      if (videoEl) openLightbox(videoEl.src);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });

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

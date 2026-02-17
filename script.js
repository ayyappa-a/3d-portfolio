// ==========================================
// HIGH-END EDITORIAL PORTFOLIO
// Performance-First JavaScript
// ==========================================

// ==========================================
// SMOOTH SCROLL & NAVIGATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {

  // Mobile Navigation Toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
    });

    // Close menu when clicking nav links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.textContent = '☰';
      });
    });
  }

  // Smooth scroll for anchor links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================
  // SCROLL-BASED ANIMATIONS
  // ==========================================

  // Intersection Observer for fade-in animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Unobserve after animation to improve performance
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with fade-in class
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(el => observer.observe(el));

  // ==========================================
  // NAVBAR BACKGROUND ON SCROLL
  // ==========================================
  const nav = document.getElementById('nav');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Add background when scrolled past hero
    if (currentScrollY > 100) {
      nav.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
      nav.style.background = 'rgba(0, 0, 0, 0.8)';
    }

    lastScrollY = currentScrollY;
  }, { passive: true });

  // ==========================================
  // PARALLAX EFFECT (SUBTLE)
  // ==========================================
  const heroContent = document.querySelector('.hero-content');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const parallaxSpeed = 0.5;

    if (heroContent && scrolled < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
  }, { passive: true });

  // ==========================================
  // PROJECT CARD INTERACTIONS
  // ==========================================
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });

  // ==========================================
  // PERFORMANCE: REDUCE MOTION FOR ACCESSIBILITY
  // ==========================================
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--transition-fast', '0ms');
    document.documentElement.style.setProperty('--transition-base', '0ms');
    document.documentElement.style.setProperty('--transition-slow', '0ms');
  }

  // ==========================================
  // SPLINE 3D IFRAME OPTIMIZATION
  // ==========================================
  const splineContainer = document.querySelector('.spline-container');
  const splineIframe = document.querySelector('.spline-container iframe');

  if (splineIframe && splineContainer) {
    // Add loading attribute for performance
    splineIframe.setAttribute('loading', 'lazy');

    // Adjust Spline opacity based on scroll position
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const heroHeight = window.innerHeight;

      if (scrolled > heroHeight * 0.5) {
        // Fade out when scrolling past hero
        const opacity = Math.max(0, 0.8 - (scrolled / heroHeight));
        splineContainer.style.opacity = opacity;
      } else {
        // Restore opacity when scrolling back to hero
        splineContainer.style.opacity = 0.8;
      }
    }, { passive: true });
  }

  // ==========================================
  // CONSOLE SIGNATURE
  // ==========================================
  console.log('%c Built with intention by Ayyappa Annamdevula', 'color: #C4B5A0; font-size: 14px; font-family: monospace;');
  console.log('%c AI-Powered Development × Creative Technology', 'color: #666; font-size: 12px; font-family: monospace;');

});

// ==========================================
// UTILITY: DEBOUNCE FOR PERFORMANCE
// ==========================================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ==========================================
// RESIZE HANDLER (DEBOUNCED)
// ==========================================
const handleResize = debounce(() => {
  // Recalculate any layout-dependent values if needed
  console.log('Window resized');
}, 250);

window.addEventListener('resize', handleResize);

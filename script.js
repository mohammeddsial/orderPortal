// ==================== GSAP ANIMATIONS & INTERACTIONS ====================
// Wait for DOM and GSAP to be ready
window.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger plugin
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
  
      // ----- HERO ENTRANCE ANIMATIONS -----
      // Mockup group (mac + iphone) fade & slide up
      gsap.from('.mockup-group', { duration: 1.2, y: 80, opacity: 0, ease: 'power3.out', delay: 0.2 });
      // Hero title & subtitle
      gsap.from('.hero-title', { duration: 0.9, y: 40, opacity: 0, ease: 'back.out(1.2)', delay: 0.3 });
      gsap.from('.hero-sub', { duration: 0.8, y: 30, opacity: 0, delay: 0.45 });
      // CTA buttons and rating
      gsap.from('.hero-ctas', { duration: 0.8, y: 30, opacity: 0, delay: 0.6, stagger: 0.1 });
      gsap.from('.hero-rating', { duration: 0.6, scale: 0.9, opacity: 0, delay: 0.8 });
      // Stat cards - elastic entrance
      gsap.from('.card-orders', { duration: 0.8, scale: 0.5, rotation: -25, opacity: 0, ease: 'elastic.out(1, 0.5)', delay: 0.5 });
      gsap.from('.card-process', { duration: 0.8, scale: 0.5, rotation: 45, opacity: 0, ease: 'elastic.out(1, 0.5)', delay: 0.7 });
      // Devices
      gsap.from('.macbook-wrap', { duration: 0.9, x: -60, opacity: 0, ease: 'power2.out', delay: 0.25 });
      gsap.from('.iphone-wrap', { duration: 0.9, x: 60, opacity: 0, ease: 'power2.out', delay: 0.35 });
  
      // ----- FLOATING ANIMATIONS (continuous) -----
      gsap.to('.card-orders', { y: -12, duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.card-process', { y: -12, duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.3 });
      gsap.to('.future-notif, .test-notif', { y: -8, duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.o-notif', { y: -5, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: 0.3 });
  
      // ----- SCROLL-TRIGGERED REVEALS -----
      // Stats bar counting effect
      const statNumbers = document.querySelectorAll('.stat-number');
      statNumbers.forEach(stat => {
        const finalVal = stat.innerText;
        // Extract numeric part
        let numeric = parseFloat(finalVal);
        if (isNaN(numeric)) numeric = 0;
        gsap.from(stat, {
          scrollTrigger: { trigger: stat, start: 'top 85%', toggleActions: 'play none none none' },
          innerText: 0,
          duration: 1.8,
          snap: { innerText: 1 },
          ease: 'power2.out',
          onUpdate: function() {
            const current = Math.floor(this.targets()[0].innerText);
            if (finalVal.includes('+')) stat.innerText = current + '+';
            else if (finalVal.includes('×')) stat.innerText = current + '×';
            else stat.innerText = current;
          }
        });
      });
  
      // Feature items, process steps, app demo, score section
      const revealElements = [
        '.feature-item', '.process-step', '.app-demo-grid', '.score-inner',
        '.future-inner', '.test-left', '.review-card', '.faq-item', '.final-left'
      ];
      revealElements.forEach(selector => {
        gsap.utils.toArray(selector).forEach(el => {
          gsap.from(el, {
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
          });
        });
      });
  
      // Features grid columns staggered
      gsap.utils.toArray('.features-grid .feature-col, .feature-col-center').forEach(col => {
        gsap.from(col, {
          scrollTrigger: { trigger: col, start: 'top 85%' },
          y: 50,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15
        });
      });
  
      // Images in app demo with subtle scale
      gsap.utils.toArray('.app-demo-img-top, .app-demo-img-dark, .app-demo-img-pink').forEach(img => {
        gsap.from(img, {
          scrollTrigger: { trigger: img, start: 'top 85%' },
          scale: 0.95,
          opacity: 0,
          duration: 0.8,
          ease: 'back.out(1)'
        });
      });
  
      // Score section badges slide in
      gsap.from('.score-notif', {
        scrollTrigger: { trigger: '.score-img-wrap', start: 'top 80%' },
        x: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
      });
  
      // Marquee animation is already CSS, we add a subtle parallax on scroll? Not needed.
      // But ensure GSAP does not conflict.
    }
  
    // ----- FAQ TOGGLE (preserved from original) -----
    window.toggleFaq = function(btn) {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    };
  
    // ----- MOBILE NAV TOGGLE (preserved) -----
    window.toggleNav = function(btn) {
      const menu = document.getElementById('mobileMenu');
      const isOpen = menu.classList.contains('open');
      menu.classList.toggle('open');
      const spans = btn.querySelectorAll('span');
      if (!isOpen) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    };
  
    window.closeMobileNav = function() {
      const menu = document.getElementById('mobileMenu');
      const btn = document.querySelector('.nav-hamburger');
      menu.classList.remove('open');
      if (btn) btn.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    };
  });
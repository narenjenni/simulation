// ===== Mobile nav =====
const toggle = document.getElementById('nav-toggle');
const menu = document.getElementById('nav-menu');
const body = document.body;

if (toggle && menu){
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    
    // Prevent body scroll when menu is open
    if (isOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
  });
}

// Close on link click (mobile)
document.querySelectorAll('.nav-link').forEach(a => {
  a.addEventListener('click', () => {
    if (menu.classList.contains('open')){
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded','false');
      body.style.overflow = ''; // Re-enable scrolling
    }
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (menu.classList.contains('open') && 
      !menu.contains(e.target) && 
      !toggle.contains(e.target)) {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded','false');
    body.style.overflow = '';
  }
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menu.classList.contains('open')) {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded','false');
    body.style.overflow = '';
  }
});

// ===== Intersection Observer animations =====
function ioReveal(containerSelector, itemSelector){
  const containers = document.querySelectorAll(containerSelector);
  
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // Skip animations for users who prefer reduced motion
    containers.forEach(container => {
      container.querySelectorAll(itemSelector).forEach(el => {
        el.classList.add('in-view');
      });
    });
    return;
  }
  
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px' // Trigger when element is 50px from bottom of viewport
  };
  
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry => {
      if (entry.isIntersecting){
        // Add delay between each item animation
        entry.target.querySelectorAll(itemSelector).forEach((el, i)=>{
          // Calculate delay based on index (stagger effect)
          const delay = Math.min(i * 100, 600); // Max delay of 600ms
          setTimeout(() => {
            el.classList.add('in-view');
          }, delay);
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  containers.forEach(c => {
    // Only observe if not already in view
    if (c.getBoundingClientRect().top < window.innerHeight * 0.8) {
      c.querySelectorAll(itemSelector).forEach(el => {
        el.classList.add('in-view');
      });
    } else {
      observer.observe(c);
    }
  });
}

// Initialize animations with improved settings
document.addEventListener('DOMContentLoaded', function() {
  // Wait a bit for the page to load completely
  setTimeout(() => {
    ioReveal('[data-io=".card"]', '.card');
    ioReveal('[data-io=".facility"]', '.facility');
    ioReveal('.timeline', '.tl-item');
    ioReveal('.testimonials', '.testimonial');
    ioReveal('.accordion', '.acc-item');
  }, 300);
});

// Re-run animations when user resizes window (to fix any layout issues)
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.querySelectorAll('.card, .facility, .tl-item, .testimonial, .acc-item').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight && 
          !el.classList.contains('in-view')) {
        el.classList.add('in-view');
      }
    });
  }, 250);
});

// ===== Contact form (client-side only demo) =====
const form = document.getElementById('form-kontak');
if (form){
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const status = document.getElementById('form-status');
    const fields = ['nama','email','pesan'];
    let valid = true;
    fields.forEach(id=>{
      const el = document.getElementById(id);
      const error = el.nextElementSibling;
      if (!el.value.trim()){
        error.textContent = 'Wajib diisi';
        valid = false;
      } else {
        // simple email check
        if (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)){
          error.textContent = 'Email tidak valid';
          valid = false;
        } else {
          error.textContent = '';
        }
      }
    });
    if (!valid){
      status.textContent = '';
      return;
    }
    // Demo: just clear and show message
    status.textContent = 'Terima kasih! Pesanmu sudah terkirim.';
    form.reset();
  });
}

// ===== Navbar style on scroll =====
const nav = document.querySelector('.navbar');
let lastY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY || window.pageYOffset;
  nav.style.boxShadow = y > 10 ? '0 8px 24px rgba(2,18,34,.08)' : 'none';
  lastY = y;
});

// ===== Floating CTA bounce subtle =====
const fcta = document.querySelector('.floating-cta');
if (fcta){
  let t = 0;
  setInterval(()=>{
    t = (t + 1) % 120;
    fcta.style.transform = `translateY(${t<60?0:-1}px)`;
  }, 1000);
}

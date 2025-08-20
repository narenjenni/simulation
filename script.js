// Navigation toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');   // pakai open
        navToggle.classList.toggle('open'); // opsional untuk animasi icon
        if (navMenu.classList.contains('open')) {
            animateMenuItems();
        }
    });
}

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
            navMenu.classList.remove('open');
            navToggle.classList.remove('open');
        }
    });
});

// ===== Intersection Observer animations =====
function ioReveal(containerSelector, itemSelector){
  const containers = document.querySelectorAll(containerSelector);
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.querySelectorAll(itemSelector).forEach((el, i)=>{
          el.style.transitionDelay = `${i * 60}ms`;
          el.classList.add('in-view');
        });
        observer.unobserve(entry.target);
      }
    });
  },{threshold:0.12});
  containers.forEach(c=>observer.observe(c));
}
ioReveal('[data-io=".card"]', '.card');
ioReveal('[data-io=".facility"]', '.facility');
ioReveal('.timeline', '.tl-item');
ioReveal('.testimonials', '.testimonial');
ioReveal('.accordion', '.acc-item');

// ===== Smooth scroll for on-page anchors =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const id = anchor.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({top, behavior:'smooth'});
  });
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

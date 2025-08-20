// Navigation toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Tambahkan animasi untuk menu mobile
        if (navMenu.classList.contains('active')) {
            animateMenuItems();
        }
    });
}

// Animasi untuk item menu mobile
function animateMenuItems() {
    const menuItems = document.querySelectorAll('.nav-link');
    menuItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(30px)';
        
        setTimeout(() => {
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Scroll animations for mobile
function animateOnScroll() {
    const elements = document.querySelectorAll('.jurusan-card, .fasilitas-card, .section-title, .section-subtitle');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('visible');
        }
    });
}

// Initialize elements for animation
document.querySelectorAll('.jurusan-card, .fasilitas-card').forEach(element => {
    element.classList.remove('visible');
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);
// Trigger once on load
window.addEventListener('load', animateOnScroll);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Untuk mobile, tutup menu setelah klik
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// PPDB button animation
const ppdbButton = document.querySelector('.btn-ppdb-large');
if (ppdbButton) {
    ppdbButton.addEventListener('mouseenter', () => {
        ppdbButton.style.transform = 'translateY(-5px)';
    });
    
    ppdbButton.addEventListener('mouseleave', () => {
        ppdbButton.style.transform = 'translateY(0)';
    });
}

// Card hover effects untuk desktop saja
if (window.innerWidth > 768) {
    const cards = document.querySelectorAll('.jurusan-card, .fasilitas-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Floating cards animation
const floatingCards = document.querySelectorAll('.floating-card');
floatingCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 2}s`;
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        }
    }
});

// Optimasi untuk perangkat mobile
function optimizeForMobile() {
    // Kurangi animasi jika perangkat memiliki preferensi reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('*').forEach(el => {
            el.style.animationDuration = '0.01ms';
            el.style.animationIterationCount = '1';
        });
    }
    
    // Optimasi untuk layar sentuh
    document.querySelectorAll('button, a, input, select').forEach(el => {
        el.style.tapHighlightColor = 'transparent';
    });
}

// Jalankan optimasi saat halaman dimuat
window.addEventListener('load', optimizeForMobile);

// Handle orientation change
window.addEventListener('orientationchange', function() {
    // Beri waktu untuk orientasi berubah
    setTimeout(function() {
        // Perbarui animasi
        animateOnScroll();
    }, 300);
});
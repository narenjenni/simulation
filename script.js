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

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.jurusan-card, .fasilitas-card, .section-title, .section-subtitle');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize elements for animation
document.querySelectorAll('.jurusan-card, .fasilitas-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px)';
    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
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

// PPDB Form Handling
const pendaftaranForm = document.getElementById('pendaftaran-form');
const modal = document.getElementById('confirmation-modal');
const closeModal = document.querySelector('.close-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');

if (pendaftaranForm) {
    pendaftaranForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Ambil nilai dari form
        const nama = document.getElementById('nama').value;
        const email = document.getElementById('email').value;
        const telepon = document.getElementById('telepon').value;
        const jurusan = document.getElementById('jurusan-daftar').value;
        const pesan = document.getElementById('pesan').value;
        
        // Kirim data (dalam implementasi nyata, ini akan dikirim ke server)
        console.log('Data Pendaftaran:', { nama, email, telepon, jurusan, pesan });
        
        // Tampilkan modal konfirmasi
        modal.style.display = 'flex';
        
        // Reset form
        pendaftaranForm.reset();
        
        // Dalam implementasi nyata, kirim email menggunakan service seperti EmailJS
        // sendEmail(nama, email, telepon, jurusan, pesan);
    });
}

// Tutup modal
if (closeModal) {
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
}

if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
}

// Tutup modal saat klik di luar konten modal
window.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Fungsi untuk mengirim email (contoh menggunakan EmailJS)
function sendEmail(nama, email, telepon, jurusan, pesan) {
    // Ini adalah contoh implementasi dengan EmailJS
    // Anda perlu mendaftar di EmailJS dan mengganti parameter berikut
    emailjs.send("service_id", "template_id", {
        from_name: nama,
        from_email: email,
        phone: telepon,
        program: jurusan,
        message: pesan,
        to_email: "narenskii@gmail.com"
    })
    .then(function(response) {
        console.log('Email terkirim!', response.status, response.text);
    }, function(error) {
        console.log('Gagal mengirim email:', error);
    });
}

// Search functionality
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

if (searchBtn) {
    searchBtn.addEventListener('click', function() {
        performSearch();
    });
}

if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

function performSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm === '') {
        alert('Masukkan kata kunci pencarian');
        return;
    }
    
    // Cari di konten halaman
    const elementsToSearch = document.querySelectorAll('h1, h2, h3, p, li, a:not(.nav-link)');
    let found = false;
    
    elementsToSearch.forEach(element => {
        const text = element.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            found = true;
            // Highlight hasil pencarian
            const originalHtml = element.innerHTML;
            const regex = new RegExp(searchTerm, 'gi');
            element.innerHTML = originalHtml.replace(regex, match => 
                `<span class="search-highlight">${match}</span>`
            );
            
            // Scroll ke element
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Tambahkan efek highlight
            element.classList.add('search-result');
            setTimeout(() => {
                element.classList.remove('search-result');
            }, 2000);
        }
    });
    
    if (!found) {
        alert('Tidak ditemukan hasil untuk: ' + searchTerm);
    }
}

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

// Tambahkan style untuk highlight pencarian
const style = document.createElement('style');
style.textContent = `
    .search-highlight {
        background-color: yellow;
        color: black;
        padding: 2px 4px;
        border-radius: 3px;
    }
    
    .search-result {
        animation: highlight 2s ease;
    }
    
    @keyframes highlight {
        0% { background-color: yellow; }
        100% { background-color: transparent; }
    }
`;
document.head.appendChild(style);
// Toggle Mobile Menu
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                }
            }
        });
    });
    
    // Search Functionality
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    
    searchBtn.addEventListener('click', function() {
        performSearch();
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    function performSearch() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            alert(`Pencarian untuk: ${searchTerm}\nFitur pencarian akan dikembangkan lebih lanjut.`);
            searchInput.value = '';
        }
    }
    
    // Form Submission
    const registrationForm = document.getElementById('registrationForm');
    
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            nama: document.getElementById('nama').value,
            email: document.getElementById('email').value,
            telepon: document.getElementById('telepon').value,
            asalSekolah: document.getElementById('asalSekolah').value,
            jurusan: document.getElementById('jurusan').value
        };
        
        // Simulate email sending (in a real application, you would use a server-side script)
        simulateEmailSending(formData);
    });
    
    function simulateEmailSending(formData) {
        // Show loading state
        const submitBtn = registrationForm.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Mengirim...';
        submitBtn.disabled = true;
        
        // Simulate network request
        setTimeout(() => {
            // In a real application, you would use fetch or XMLHttpRequest to send data to your server
            console.log('Data pendaftaran:', formData);
            alert(`Terima kasih ${formData.nama}! Data pendaftaran Anda telah dikirim. Kami akan menghubungi Anda melalui email di ${formData.email} untuk informasi lebih lanjut.`);
            
            // Reset form
            registrationForm.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
    
    // Add animations on scroll
    const animatedElements = document.querySelectorAll('.program-card, .about-content, .ppdb-content, .contact-content');
    
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('fade-in');
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Add animation delays to program cards
    const programCards = document.querySelectorAll('.program-card');
    programCards.forEach((card, index) => {
        card.classList.add(`delay-${index}`);
    });
});

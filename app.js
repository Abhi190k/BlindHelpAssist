// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 80; // Adjust this value based on your navbar height
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 150) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
});

// Mobile menu handling
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', () => {
        navbarCollapse.classList.toggle('show');
    });
}
// Close mobile menu when clicking outside
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navbarCollapse.classList.remove('show');
    });
});

// Contact Form Handling
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formMessage = document.getElementById('formMessage');
    const submitButton = this.querySelector('button[type="submit"]');
    
    // Disable submit button while processing
    submitButton.disabled = true;
    
    try {
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        const response = await fetch('http://localhost:3001/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            formMessage.textContent = 'Thank you! Your message has been sent successfully.';
            formMessage.className = 'alert alert-success mt-3';
            this.reset();
        } else {
            throw new Error(data.error || 'Failed to send message');
        }
    } catch (error) {
        formMessage.textContent = error.message;
        formMessage.className = 'alert alert-danger mt-3';
    } finally {
        submitButton.disabled = false;
    }
});

// Add parallax effect to floating dots
window.addEventListener('mousemove', (e) => {
    const dots = document.querySelectorAll('.floating-dots span');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    dots.forEach((dot, index) => {
        const speed = (index + 1) * 0.2;
        const x = (mouseX - 0.5) * speed * 50;
        const y = (mouseY - 0.5) * speed * 50;
        dot.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.querySelectorAll('.feature-card, .hero-image, .about-image, .floating-card').forEach(el => {
    observer.observe(el);
});
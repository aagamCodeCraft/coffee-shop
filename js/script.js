// DOM Elements
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');
const aboutNewsletterForm = document.getElementById('aboutNewsletterForm');
const scrollTopBtn = document.createElement('div');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileNav();
    initializeForms();
    initializeScrollToTop();
    initializeAnimations();
});

// Mobile Navigation
function initializeMobileNav() {
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Change icon based on menu state
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('#main-nav') && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Add active class to current nav item
    const currentLocation = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        if (item.getAttribute('href') === currentLocation) {
            item.classList.add('active');
        }
    });
}

// Form Handling
function initializeForms() {
    // Contact Form
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: this.elements['name'].value,
                email: this.elements['email'].value,
                message: this.elements['message'].value
            };

            // Display loading spinner
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="loader"></span> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission delay
            setTimeout(() => {
                // Success message (in a real app, you'd handle the response from your server)
                console.log('Form submitted with data:', formData);
                
                // Display success message
                const formMessage = document.getElementById('form-message');
                if (formMessage) {
                    formMessage.textContent = 'Your message has been sent successfully! We\'ll get back to you soon.';
                    formMessage.classList.add('success');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        formMessage.classList.remove('success');
                        formMessage.textContent = '';
                    }, 5000);
                }
                
                // Restore button text
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Newsletter Form (Footer)
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            // Display loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="loader"></span>';
            submitBtn.disabled = true;
            
            // Simulate form submission delay
            setTimeout(() => {
                console.log('Newsletter subscription for:', email);
                
                // Create and show success message
                const formStatus = document.createElement('div');
                formStatus.classList.add('form-status', 'success');
                formStatus.textContent = 'Thank you for subscribing to our newsletter!';
                
                newsletterForm.insertAdjacentElement('afterend', formStatus);
                
                // Reset form
                newsletterForm.reset();
                
                // Restore button text
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    formStatus.remove();
                }, 5000);
            }, 1000);
        });
    }

    // About page Newsletter Form
    if (aboutNewsletterForm) {
        aboutNewsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            // Display loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="loader"></span> Subscribing...';
            submitBtn.disabled = true;
            
            // Simulate form submission delay
            setTimeout(() => {
                console.log('About page newsletter subscription for:', email);
                
                // Create and show success message
                const formStatus = document.createElement('div');
                formStatus.classList.add('form-status', 'success');
                formStatus.textContent = 'Thank you for subscribing to our newsletter!';
                formStatus.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                formStatus.style.margin = '20px auto 0';
                formStatus.style.maxWidth = '500px';
                
                aboutNewsletterForm.insertAdjacentElement('afterend', formStatus);
                
                // Reset form
                aboutNewsletterForm.reset();
                
                // Restore button text
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    formStatus.remove();
                }, 5000);
            }, 1000);
        });
    }
}

// Scroll to Top Button
function initializeScrollToTop() {
    // Create the button
    scrollTopBtn.classList.add('scroll-top');
    scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide the button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });
    
    // Scroll to top when button is clicked
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Animations
function initializeAnimations() {
    // Add fade-in animation to menu items
    const menuItems = document.querySelectorAll('.menu-item');
    if (menuItems.length > 0) {
        menuItems.forEach((item, index) => {
            item.style.opacity = '0';
            
            // Delay each item's animation
            setTimeout(() => {
                item.classList.add('fade-in');
            }, 100 * index);
        });
    }
    
    // Animate sections on scroll
    const sections = document.querySelectorAll('.section');
    
    if (sections.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15
        });
        
        sections.forEach(section => {
            section.style.opacity = '0';
            observer.observe(section);
        });
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
        
        // Scroll to the target section
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
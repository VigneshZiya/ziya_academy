// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Sticky header on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Active nav link based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= (sectionTop - 300)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Smooth scrolling for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Testimonial slider functionality
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const totalTestimonials = testimonials.length;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'block' : 'none';
    });
}

// Initialize first testimonial
showTestimonial(currentTestimonial);

// Auto-rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
}, 5000);

// Animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .feature-item, .testimonial-card');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize elements with hidden state
document.querySelectorAll('.service-card, .feature-item, .testimonial-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease';
});

// Scroll to top button functionality
const scrollToTopBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('active');
    } else {
        scrollToTopBtn.classList.remove('active');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Courses Page Functionality =====

// Tab functionality for courses
function initCourseTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if (tabBtns.length > 0 && tabPanes.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and panes
                tabBtns.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));

                // Add active class to clicked button
                btn.classList.add('active');

                // Show corresponding pane
                const tabId = btn.getAttribute('data-tab');
                const targetPane = document.getElementById(tabId);
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    }
}

// Initialize course page components when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Check if we're on the courses page
    if (document.querySelector('.courses-hero')) {
        initCourseTabs();

        // Add animation to course cards
        const courseCards = document.querySelectorAll('.course-card');
        courseCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.6s ease ' + (index * 0.1) + 's';

            // Intersection Observer for card animations
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            observer.observe(card);
        });
    }
});

// Make sure the School Coaching tab is active by default
window.addEventListener('load', function () {
    if (document.querySelector('.courses-hero')) {
        const defaultTab = document.querySelector('.tab-btn[data-tab="school"]');
        if (defaultTab) {
            defaultTab.click();
        }
    }
});

// ===== Internship Page Functionality =====

// Initialize internship page components when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Only run if we're on the internships page
    if (document.querySelector('.internships-hero')) {
        initInternshipForm();
        animateTrainingCards();
    }
});

// Form submission handling for internship application
function initInternshipForm() {
    const form = document.getElementById('internshipApplication');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const formData = new FormData(form);
            const formValues = Object.fromEntries(formData.entries());

            // Validate form
            if (validateInternshipForm(formValues)) {
                // In a real implementation, you would send the data to your server here
                // For demo purposes, we'll show a success message
                showApplicationSuccess(formValues);

                // Reset form
                form.reset();
            }
        });
    }
}

// Form validation
function validateInternshipForm(formData) {
    // Check required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.course) {
        showAlert('Please fill in all required fields', 'error');
        return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showAlert('Please enter a valid email address', 'error');
        return false;
    }

    // Validate phone number (basic validation)
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(formData.phone)) {
        showAlert('Please enter a valid phone number', 'error');
        return false;
    }

    return true;
}

// Show success message
function showApplicationSuccess(formData) {
    const programNames = {
        'mern': 'MERN Stack',
        'flutter': 'Flutter',
        'python': 'Python Django',
        'uiux': 'UI/UX Design',
        'php': 'PHP Laravel',
        'testing': 'Software Testing',
        'marketing': 'Digital Marketing',
        'react': 'React JS'
    };

    const successMessage = `
    <div class="alert alert-success">
      <h3>Application Submitted Successfully!</h3>
      <p>Thank you, ${formData.name}! We've received your application for the ${programNames[formData.course]} internship.</p>
      <p>We'll contact you at ${formData.email} or ${formData.phone} within 3 business days.</p>
    </div>
  `;

    // Insert success message before the form
    const formContainer = document.querySelector('.internship-form');
    formContainer.insertAdjacentHTML('afterbegin', successMessage);

    // Scroll to show the message
    formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Show alert message
function showAlert(message, type = 'error') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;

    // Insert alert before the form
    const form = document.getElementById('internshipApplication');
    form.parentNode.insertBefore(alertDiv, form);

    // Remove alert after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Animate training cards on scroll
function animateTrainingCards() {
    const trainingCards = document.querySelectorAll('.training-card');

    trainingCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(card);
    });
}

// Add alert styles to your CSS if not already present
const alertStyles = document.createElement('style');
alertStyles.textContent = `
  .alert {
    padding: 15px;
    margin-bottom: 20px;
    border-radius: var(--border-radius);
    font-size: 1rem;
  }
  .alert-success {
    background-color: rgba(141, 198, 63, 0.2);
    border-left: 4px solid var(--accent-green);
    color: var(--text-dark);
  }
  .alert-error {
    background-color: rgba(239, 68, 68, 0.2);
    border-left: 4px solid #ef4444;
    color: var(--text-dark);
  }
`;
document.head.appendChild(alertStyles);

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);
// SPACEGATOR BAND WEBSITE - JAVASCRIPT 

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  lastScroll = currentScroll;
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));

    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
  });
}

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe sections for animations
document.querySelectorAll('.section').forEach(section => {
  observer.observe(section);
});

// Observe show cards
document.querySelectorAll('.show-card').forEach(card => {
  observer.observe(card);
});

// Observe platform cards
document.querySelectorAll('.platform-card').forEach(card => {
  observer.observe(card);
});

// Form validation and submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const formData = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value,
      newsletter: document.getElementById('newsletter').checked
    };

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill in all required fields.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // In a real implementation, you would send this data to a server
    // For now, we'll just log it and show a success message
    console.log('Form submitted:', formData);

    // Show success message
    alert('Thank you for your message! We\'ll get back to you soon.');

    // Reset form
    contactForm.reset();
  });
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroImage = document.querySelector('.hero-image');

  if (heroImage) {
    heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Add hover effect to show cards
document.querySelectorAll('.show-card').forEach(card => {
  card.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-10px)';
  });

  card.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0)';
  });
});

// Add dynamic gradient animation
const hero = document.querySelector('.hero');
if (hero) {
  let hue = 0;
  setInterval(() => {
    hue = (hue + 1) % 360;
    hero.style.filter = `hue-rotate(${hue * 0.1}deg)`;
  }, 100);
}

// Lazy load images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img').forEach(img => {
    imageObserver.observe(img);
  });
}

// Add typing effect to hero subtitle (optional enhancement)
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
  const text = heroSubtitle.textContent;
  heroSubtitle.textContent = '';
  let i = 0;

  const typeWriter = () => {
    if (i < text.length) {
      heroSubtitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  };

  // Start typing effect after a short delay
  setTimeout(typeWriter, 500);
}

// Console message for developers
console.log('%c🐊 Space Gator 🐊', 'font-size: 24px; font-weight: bold; color: #7c3aed;');
console.log('%cSo come on down to the moon swamp - the water\'s fine!', 'font-size: 14px; color: #a78bfa;');

// CAROUSEL FUNCTIONALITY
const track = document.querySelector('.carousel-track');
const slides = Array.from(track ? track.children : []);
const nextButton = document.querySelector('.carousel-button--right');
const prevButton = document.querySelector('.carousel-button--left');
const dotsNav = document.querySelector('.carousel-nav');
const dots = Array.from(dotsNav ? dotsNav.children : []);

if (track && slides.length > 0) {
  const slideWidth = slides[0].getBoundingClientRect().width;

  // Arrange the slides next to one another
  const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
  };
  slides.forEach(setSlidePosition);

  const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
  };

  const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
  };

  // Remove arrow hiding logic since we want continuous scrolling
  prevButton.classList.remove('is-hidden');
  nextButton.classList.remove('is-hidden');

  // Click Left
  prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling || slides[slides.length - 1];
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling || dots[dots.length - 1];

    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
    resetAutoRotate();
  });

  // Click Right
  nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling || slides[0];
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling || dots[0];

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    resetAutoRotate();
  });

  // Click Nav Indicators
  dotsNav.addEventListener('click', e => {
    const targetDot = e.target.closest('button');

    if (!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    resetAutoRotate();
  });

  // Auto Rotate functionality
  let autoRotateInterval;
  let isHovering = false;

  const startAutoRotate = () => {
    autoRotateInterval = setInterval(() => {
      const currentSlide = track.querySelector('.current-slide');
      const nextSlide = currentSlide.nextElementSibling || slides[0]; // Loop back to start
      const currentDot = dotsNav.querySelector('.current-slide');
      const nextDot = currentDot.nextElementSibling || dots[0];
      const nextIndex = slides.findIndex(slide => slide === nextSlide);

      moveToSlide(track, currentSlide, nextSlide);
      updateDots(currentDot, nextDot);
      hideShowArrows(slides, prevButton, nextButton, nextIndex);
    }, 6000); // Rotate every 6 seconds
  };

  const resetAutoRotate = () => {
    clearInterval(autoRotateInterval);
    if (!isHovering) {
      startAutoRotate();
    }
  };

  // Start auto-rotation
  startAutoRotate();

  // Pause on hover
  const carouselContainer = document.querySelector('.carousel-container');
  carouselContainer.addEventListener('mouseenter', () => {
    isHovering = true;
    clearInterval(autoRotateInterval);
  });

  carouselContainer.addEventListener('mouseleave', () => {
    isHovering = false;
    startAutoRotate();
  });

  // Handle window resize to adjust slide positions
  window.addEventListener('resize', () => {
    const newSlideWidth = slides[0].getBoundingClientRect().width;
    slides.forEach((slide, index) => {
      slide.style.left = newSlideWidth * index + 'px';
    });

    // Re-center current slide
    const currentSlide = track.querySelector('.current-slide');
    track.style.transform = 'translateX(-' + currentSlide.style.left + ')';
  });
}


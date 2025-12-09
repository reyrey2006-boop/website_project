// ============================================
// Mobile Menu Toggle
// ============================================
document.querySelector('.hamburger')?.addEventListener('click', function() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
});

// ============================================
// Filter Functionality for Destinations
// ============================================
const filterButtons = document.querySelectorAll(".filter-buttons button");
const destinationCards = document.querySelectorAll(".dest-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");

    destinationCards.forEach(card => {
      const category = card.getAttribute("data-category");

      if (filter === "all" || category === filter) {
        card.style.display = "block";   // show card
      } else {
        card.style.display = "none";    // hide card
      }
    });
  });
});


// ============================================
// Gallery filter functionality
// ============================================
document.querySelectorAll('.gallery-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.gallery-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filter = this.dataset.filter;
        document.querySelectorAll('.gallery-item').forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// ============================================
// Lightbox functionality for gallery
// ============================================
let currentImageIndex = 0;
let allImages = [];

document.querySelectorAll('.view-btn').forEach((btn, index) => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        allImages = document.querySelectorAll('.gallery-item');
        currentImageIndex = index;
        openLightbox(this.dataset.src);
    });
});

function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    img.src = src;
    lightbox.classList.add('show');
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('show');
}

function nextImage() {
    const visibleImages = Array.from(document.querySelectorAll('.gallery-item')).filter(item => item.style.display !== 'none');
    const currentImage = visibleImages[currentImageIndex];
    if (currentImage && currentImage.nextElementSibling) {
        const nextBtn = currentImage.nextElementSibling.querySelector('.view-btn');
        if (nextBtn) {
            currentImageIndex++;
            openLightbox(nextBtn.dataset.src);
        }
    }
}

function prevImage() {
    const visibleImages = Array.from(document.querySelectorAll('.gallery-item')).filter(item => item.style.display !== 'none');
    const currentImage = visibleImages[currentImageIndex];
    if (currentImage && currentImage.previousElementSibling) {
        const prevBtn = currentImage.previousElementSibling.querySelector('.view-btn');
        if (prevBtn) {
            currentImageIndex--;
            openLightbox(prevBtn.dataset.src);
        }
    }
}

// ============================================
// Close lightbox on outside click
// ============================================
document.getElementById('lightbox')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeLightbox();
    }
});

// ============================================
// Contact Form Submission
// ============================================
// CONTACT FORM SCRIPT
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");

    if (!contactForm) return;

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent page reload

        // Validate required fields
        const requiredFields = ["name", "email", "phone", "destination", "dates", "guests", "budget", "message"];
        for (let field of requiredFields) {
            const input = document.getElementById(field);
            if (!input || input.value.trim() === "") {
                showMessage("Please fill out all required fields.", "error");
                return;
            }
        }

        // Display success message
        showMessage("Your booking request has been submitted! We will contact you soon.", "success");

        // Reset form
        contactForm.reset();
    });
});

// MESSAGE POPUP FUNCTION
function showMessage(text, type = "success") {
    let messageBox = document.createElement("div");
    messageBox.className = `form-message ${type}`;
    messageBox.textContent = text;

    // Style directly so you don't need new CSS
    messageBox.style.position = "fixed";
    messageBox.style.bottom = "30px";
    messageBox.style.right = "30px";
    messageBox.style.padding = "15px 20px";
    messageBox.style.borderRadius = "10px";
    messageBox.style.fontSize = "16px";
    messageBox.style.color = "#fff";
    messageBox.style.zIndex = "9999";
    messageBox.style.boxShadow = "0 4px 15px rgba(0,0,0,0.15)";
    messageBox.style.opacity = "0";
    messageBox.style.transition = "opacity 0.4s ease";

    // Colors
    if (type === "success") {
        messageBox.style.background = "#28a745";
    } else {
        messageBox.style.background = "#dc3545";
    }

    document.body.appendChild(messageBox);

    // Fade in
    setTimeout(() => {
        messageBox.style.opacity = "1";
    }, 100);

    // Auto remove after 3 seconds
    setTimeout(() => {
        messageBox.style.opacity = "0";
        setTimeout(() => messageBox.remove(), 400);
    }, 3000);
}

const filtersection = document.querySelectorAll(".filter-buttons button");
const destinationgrid = document.querySelectorAll(".dest-card");

filtersection.forEach(button => {
  button.addEventListener("click", () => {
    filtersection.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    destinationCards.forEach(card => {
      const category = card.getAttribute("data-category");

      if (filter === "all" || category === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// ============================================
// Search Functionality
// ============================================
const searchInput = document.getElementById("searchInput")
const searchBtn = document.getElementById("searchBtn")

if (searchInput && searchBtn) {
  // Destination data for search
  const destinations = [
    { name: "Dahican Beach", url: "learn-more/learn-more-dahican-beach.html" },
    { name: "Subangan museum", url: "learn-more/learn-more-subangan-museum.html" },
    { name: "Saga Flying Club", url: "learn-more/learn-more-saga-flying-club.html" },
    { name: "Sleeping Dinosaur", url: "learn-more/learn-more-sleeping-dinosaur.html" },
    { name: "blue bless", url: "learn-more/learn-more-blue-bless.html" },
    { name: "pujada island", url: "learn-more/learn-more-pujada-island.html" },
  ]

  // Search function
  function performSearch(query) {
    if (!query.trim()) {
      alert("Please enter a destination name to search.")
      return
    }

    const matchedDestination = destinations.find((dest) => dest.name.toLowerCase().includes(query.toLowerCase()))

    if (matchedDestination) {
      window.location.href = matchedDestination.url
    } else {
      alert("Destination not found. Please try another search.")
    }
  }

  // Search button click
  searchBtn.addEventListener("click", () => {
    const query = searchInput.value
    performSearch(query)
  })

  // Search on Enter key
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const query = searchInput.value
      performSearch(query)
    }
  })

  // Clear search input on focus
  searchInput.addEventListener("focus", () => {
    searchInput.value = ""
  })
}

// ============================================
// Smooth scroll for navigation links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================
// Update active nav link based on scroll position
// ============================================
window.addEventListener('scroll', function() {
    let current = '';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Set active to current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelector(`a[href="${currentPage}"]`)?.classList.add('active');
});

// ============================================
// Set initial active link
// ============================================
window.addEventListener('load', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const activeLink = document.querySelector(`a[href="${currentPage}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
});

// ============================================
// Scroll-triggered fade-zoom-in animations
// ============================================
(function() {
    // Add animate-on-scroll class to sections
    const sectionsToAnimate = [
        '.hero',
        '.featured',
        '.why-choose',
        '.cta',
        '.contact-info',
        '.contact-form-section',
        '.gallery-section',
        '.destinations-all',
        '.team-section',
        '.top-video-wrapper',
        '.page-header',
        '.about-mission',
        '.stats-section',
        '.footer',
        '.feel-hero',
        '.values-section',
        '.stat-cards',
        '.booking-section',
        '.about-content',
        '.header-content',
        '.profile-section',
        '.dashboard-section',
        '.destinations-section',
        '.destination-cards',
        '.filter-section',
        '.gallery-items',
        '.destination-grid',


    ];
    
    sectionsToAnimate.forEach(selector => {
        const section = document.querySelector(selector);
        if (section) {
            section.classList.add('animate-on-scroll');
        }
    });
    
    // Use IntersectionObserver to trigger animations when sections come into view
    try {
        const io = new IntersectionObserver(entries =>  {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
                    entry.target.classList.add('visible');
                    // Optional: stop observing after visible (remove if you want re-trigger on scroll up)
                    // io.unobserve(entry.target);
                }
            });
        }, { threshold: [0.1] });
        
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            io.observe(el);
        });
    } catch (e) {
        // Fallback: no animations if IntersectionObserver not supported
    }
})();


// ============================================
// Pause hero/top video when not visible or when navigating away
// ============================================
(function() {
    const heroVideo = document.querySelector('.top-video-wrapper .hero-video') || document.querySelector('.hero-video');
    const videoWrapper = document.querySelector('.top-video-wrapper');
    if (!heroVideo) return;

    // Helper to toggle visual paused state
    function setVisualPaused(paused) {
        try {
            if (!videoWrapper) return;
            if (paused) videoWrapper.classList.add('video-paused'); else videoWrapper.classList.remove('video-paused');
        } catch (e) {}
    }

    // When the video can play, reveal it with transition
    heroVideo.addEventListener('canplay', () => {
        try { if (videoWrapper) videoWrapper.classList.add('loaded'); } catch (e) {}
    });

    // Pause when page is hidden (user switches tab)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            try { heroVideo.pause(); setVisualPaused(true); } catch (e) {}
        } else {
            // do not auto-play on tab show unless video is in view
            try { if (videoWrapper && videoWrapper.classList.contains('in-view')) heroVideo.play().catch(()=>{}); } catch(e){}
        }
    });

    // Pause on unload/navigation
    window.addEventListener('beforeunload', () => {
        try { heroVideo.pause(); setVisualPaused(true); } catch (e) {}
    });

    // Pause immediately when user clicks links to navigate
    document.querySelectorAll('a[href]').forEach(a => {
        try {
            const href = a.getAttribute('href');
            if (!href || href.startsWith('#')) return;
            a.addEventListener('click', () => { try { heroVideo.pause(); setVisualPaused(true); } catch (e) {} }, {passive: true});
        } catch (e) {}
    });

    // Toggle visual state on native pause/play events
    heroVideo.addEventListener('pause', () => setVisualPaused(true));
    heroVideo.addEventListener('play', () => {
        setVisualPaused(false);
        try { delete heroVideo.dataset.pausedByScroll; } catch (e) {}
    });

    // Use IntersectionObserver to pause when video is scrolled out of view, and play when visible
    try {
        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const inView = entry.isIntersecting && entry.intersectionRatio > 0.25;
                if (videoWrapper) {
                    if (inView) videoWrapper.classList.add('in-view'); else videoWrapper.classList.remove('in-view');
                }
                // If video leaves view, pause and mark it as paused by scroll so it won't auto-resume when scrolled back.
                if (!inView) {
                    try { heroVideo.pause(); setVisualPaused(true); heroVideo.dataset.pausedByScroll = 'true'; if (videoWrapper) videoWrapper.classList.add('paused-by-scroll'); } catch (e) {}
                }
                // Do NOT auto-play when scrolling back into view. User must manually resume.
            });
        }, { threshold: [0.25] });

        io.observe(videoWrapper || heroVideo);
    } catch (e) {
        // Fallback: on scroll, pause when not in viewport and mark as paused-by-scroll; do not auto-play on return
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                try {
                    const el = videoWrapper || heroVideo;
                    const rect = el.getBoundingClientRect();
                    const inView = rect.bottom > 0 && rect.top < window.innerHeight;
                    if (!inView) { try { heroVideo.pause(); setVisualPaused(true); heroVideo.dataset.pausedByScroll = 'true'; if (videoWrapper) videoWrapper.classList.add('paused-by-scroll'); } catch(e){} }
                    // do not auto-play when back in view
                } catch (err) {}
            }, 100);
        }, {passive: true});
    }

    // Play overlay button behaviour: find button and resume video on click when paused-by-scroll
    try {
        const playBtn = document.querySelector('.top-video-wrapper .video-play-overlay');
        if (playBtn) {
            playBtn.addEventListener('click', (e) => {
                e.preventDefault();
                try {
                    heroVideo.play().then(() => {
                        setVisualPaused(false);
                        try { delete heroVideo.dataset.pausedByScroll; } catch (err) {}
                        if (videoWrapper) videoWrapper.classList.remove('paused-by-scroll');
                    }).catch(()=>{});
                } catch (err) {}
            });
        }
    } catch (e) {}
})();

const modal = document.getElementById("successModal");
const closeBtn = modal.querySelector(".close-modal");
const gotItBtn = modal.querySelector(".btn", ".btn-LM");

// Open modal function
function openModal() {
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");
  modal.querySelector(".btn").focus(); // set initial focus
  document.addEventListener("keydown", handleKeydown);
}

// Close modal function
function closeModal() {
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  document.removeEventListener("keydown", handleKeydown);
}

// Handle Escape key to close modal
function handleKeydown(e) {
  if (e.key === "Escape") {
    closeModal();
  }
}

// Close modal when clicking outside content
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Close modal on buttons
closeBtn.addEventListener("click", closeModal);
gotItBtn.addEventListener("click", closeModal);




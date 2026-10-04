// State & Data
const STATE = {
  selectedService: ''
};

// Tarot Cards Data
const TAROT_CARDS = [
  { name: 'The Star', meaning: 'Hope, inspiration, and spiritual guidance shining on your path.' },
  { name: 'The Sun', meaning: 'Joy, success, and positive energy bringing warmth to your endeavors.' },
  { name: 'The Moon', meaning: 'Intuition, dreams, and navigating through the subconscious realms.' },
  { name: 'Wheel of Fortune', meaning: 'Cycles, change, and destiny turning in your favor.' },
  { name: 'The Magician', meaning: 'Manifestation, power, and utilizing your resources to achieve goals.' }
];

// Reviews Data
const REVIEWS = [
  { text: "Dr. Singh's reading was profoundly accurate. The guidance I received helped me navigate a very difficult career transition.", author: "A. Sharma", stars: "★★★★★" },
  { text: "A truly mystical and empowering experience. I felt completely understood, and the Akashic session brought me immense peace.", author: "M. K.", stars: "★★★★★" },
  { text: "The most authentic tarot reading I've ever had. Highly recommend the Gold Clarity session for anyone seeking deep answers.", author: "R. Verma", stars: "★★★★★" }
];

// Configuration for Availability (Mock Backend)
const CONFIG = {
  workingHours: { start: 10, end: 19 }, // 10 AM to 7 PM
  unavailableDates: ['2026-12-25', '2026-01-01'], // Example holidays
  bookedSlots: {
      // Mock some booked slots for demonstration
      // 'YYYY-MM-DD': ['11:00 AM', '02:00 PM']
  }
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initPickACard();
  initCarousel();
  initBookingSystem();
  initWhatsAppLinks();
});

// Navbar Scroll Effect & Mobile Menu
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
      } else {
          navbar.classList.remove('scrolled');
      }
  });

  if (hamburger) {
      hamburger.addEventListener('click', () => {
          navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
          navLinks.style.flexDirection = 'column';
          navLinks.style.position = 'absolute';
          navLinks.style.top = '100%';
          navLinks.style.left = '0';
          navLinks.style.width = '100%';
          navLinks.style.background = 'var(--color-bg-secondary)';
          navLinks.style.padding = '20px 0';
      });
  }
}

// Pick a Card Functionality
function initPickACard() {
  const container = document.getElementById('tarotCardsContainer');
  if (!container) return;

  TAROT_CARDS.forEach((card, index) => {
      const cardEl = document.createElement('div');
      cardEl.className = 'tarot-card';
      
      cardEl.innerHTML = `
          <div class="tarot-card-face tarot-card-back"></div>
          <div class="tarot-card-face tarot-card-front">
              <div class="card-title">${card.name}</div>
              <div class="card-meaning">${card.meaning}</div>
          </div>
      `;
      
      cardEl.addEventListener('click', () => {
          // Flip only this card
          document.querySelectorAll('.tarot-card').forEach(c => c.classList.remove('flipped'));
          cardEl.classList.add('flipped');
      });
      
      container.appendChild(cardEl);
  });
}

// Reviews Carousel
function initCarousel() {
  const track = document.getElementById('carouselTrack');
  const nav = document.getElementById('carouselNav');
  if (!track || !nav) return;

  let currentSlide = 0;

  REVIEWS.forEach((review, index) => {
      // Create Slide
      const slide = document.createElement('div');
      slide.className = 'review-card';
      slide.innerHTML = `
          <div class="review-stars">${review.stars}</div>
          <div class="review-quote">"${review.text}"</div>
          <div class="review-author">- ${review.author}</div>
      `;
      track.appendChild(slide);

      // Create Dot
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => goToSlide(index));
      nav.appendChild(dot);
  });

  function goToSlide(index) {
      currentSlide = index;
      track.style.transform = `translateX(-${index * 100}%)`;
      
      // Update dots
      document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
          dot.classList.toggle('active', i === index);
      });
  }

  // Auto scroll
  setInterval(() => {
      let next = (currentSlide + 1) % REVIEWS.length;
      goToSlide(next);
  }, 6000);
}

// Global function to pre-select service from buttons
window.selectService = function(serviceName) {
  const select = document.getElementById('serviceSelect');
  if (select) {
      select.value = serviceName;
  }
};

// Booking System Logic
function initBookingSystem() {
  const dateInput = document.getElementById('bookingDate');
  const timeSlotsContainer = document.getElementById('timeSlotsContainer');
  const selectedTimeInput = document.getElementById('selectedTime');
  const bookingForm = document.getElementById('bookingForm');

  if (!dateInput || !bookingForm) return;

  // Set min date to today
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;

  dateInput.addEventListener('change', (e) => {
      const selectedDate = e.target.value;
      generateTimeSlots(selectedDate);
  });

  function generateTimeSlots(dateStr) {
      timeSlotsContainer.innerHTML = '';
      selectedTimeInput.value = '';

      if (CONFIG.unavailableDates.includes(dateStr)) {
          timeSlotsContainer.innerHTML = '<p class="disclaimer" style="grid-column: 1/-1;">Dr. Singh is unavailable on this date. Please select another.</p>';
          return;
      }

      const bookedForDate = CONFIG.bookedSlots[dateStr] || [];
      
      // Generate slots from start to end (e.g., 10 AM to 7 PM)
      let hasAvailable = false;

      for (let hour = CONFIG.workingHours.start; hour <= CONFIG.workingHours.end; hour++) {
          const ampm = hour >= 12 ? 'PM' : 'AM';
          let displayHour = hour % 12;
          displayHour = displayHour ? displayHour : 12; // the hour '0' should be '12'
          const timeStr = `${displayHour}:00 ${ampm}`;

          const slot = document.createElement('div');
          slot.className = 'time-slot';
          slot.textContent = timeStr;

          // Check if it's in the past for today
          const now = new Date();
          const isToday = dateStr === today;
          const isPast = isToday && hour <= now.getHours();

          if (bookedForDate.includes(timeStr) || isPast) {
              slot.classList.add('unavailable');
          } else {
              hasAvailable = true;
              slot.addEventListener('click', () => {
                  // Deselect others
                  document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
                  slot.classList.add('selected');
                  selectedTimeInput.value = timeStr;
              });
          }

          timeSlotsContainer.appendChild(slot);
      }

      if (!hasAvailable) {
          timeSlotsContainer.innerHTML = '<p class="disclaimer" style="grid-column: 1/-1;">No available slots for this date.</p>';
      }
  }

  // Handle Form Submission
  bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const service = document.getElementById('serviceSelect').value;
      const date = document.getElementById('bookingDate').value;
      const time = document.getElementById('selectedTime').value;
      const name = document.getElementById('customerName').value;
      const mobile = document.getElementById('customerMobile').value;
      const message = document.getElementById('customerMessage').value;

      if (!time) {
          alert('Please select a time slot.');
          return;
      }

      // Format WhatsApp Message
      const waMessage = `Hello ${DOCTOR_NAME}, I would like to book a consultation.

Name: ${name}
Mobile: ${mobile}
Consultation: ${service}
Date: ${date}
Time: ${time}
Message: ${message || 'N/A'}

Please confirm my appointment.`;

      // Redirect to WhatsApp
      const encodedMessage = encodeURIComponent(waMessage);
      const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;
      
      window.open(waUrl, '_blank');
  });
}

// WhatsApp General Links (Floating & Footer)
function initWhatsAppLinks() {
  const waLinks = document.querySelectorAll('.whatsapp-link');
  const defaultMsg = encodeURIComponent(`Hello ${DOCTOR_NAME}, I would like to enquire about a tarot/spiritual guidance consultation.`);
  
  waLinks.forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${defaultMsg}`, '_blank');
      });
  });
}

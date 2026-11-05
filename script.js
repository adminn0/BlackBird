document.addEventListener('DOMContentLoaded', () => {
  // -----------------------------------------------------------------
  // 1. Mobile Menü Toggle
  // -----------------------------------------------------------------
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // -----------------------------------------------------------------
  // 2. Buchungsformular mit EmailJS
  // -----------------------------------------------------------------
  const bookingForm = document.getElementById('booking-form');
  const formFeedback = document.getElementById('form-feedback');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;

      // Button während des Sendens sperren
      submitBtn.disabled = true;
      submitBtn.textContent = "Wird gesendet...";

      // Ausgewähltes Equipment zu einer kommagetrennten Liste zusammenfassen
      const selectedEquipment = Array.from(
        bookingForm.querySelectorAll('input[name="equipment"]:checked')
      ).map(cb => cb.value).join(', ') || 'Kein Equipment angegeben';

      // Parameter-Objekt für das EmailJS Template
      const templateParams = {
        vorname: document.getElementById('vorname').value,
        nachname: document.getElementById('nachname').value,
        email: document.getElementById('email').value,
        telefon: document.getElementById('telefon').value || 'Nicht angegeben',
        anlass: document.getElementById('anlass').value,
        datum: document.getElementById('datum').value,
        equipment: selectedEquipment,
        beschreibung: document.getElementById('beschreibung').value,
        anmerkungen: document.getElementById('anmerkungen').value || 'Keine'
      };

      // EmailJS Sendeaufruf
      emailjs.send('service_ryhzq3d', 'template_zqvhibc', templateParams)
        .then(() => {
          formFeedback.textContent = "Vielen Dank! Deine Anfrage wurde erfolgreich übermittelt. Wir melden uns in Kürze.";
          formFeedback.className = "success";
          formFeedback.style.display = "block";
          bookingForm.reset();
        })
        .catch((error) => {
          console.error("EmailJS Fehler:", error);
          formFeedback.textContent = "Fehler beim Senden der Anfrage. Bitte versuche es erneut oder kontaktiere uns direkt.";
          formFeedback.className = "error";
          formFeedback.style.display = "block";
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;

          // Feedback nach 7 Sekunden ausblenden
          setTimeout(() => {
            formFeedback.style.display = "none";
          }, 7000);
        });
    });
  }
});

  // -----------------------------------------------------------------
  // 3. Automated Hero Slideshow (nur auf Homepage)
  // -----------------------------------------------------------------
  const slides = document.querySelectorAll('.slide');
  if (slides.length > 0) {
    let currentSlide = 0;
    const slideInterval = 5000; // 5 Sekunden pro Bild

    function nextSlide() {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, slideInterval);
  }

  // -----------------------------------------------------------------
  // 4. Buchungsformular Handling
  // -----------------------------------------------------------------
// -----------------------------------------------------------------
// Buchungsformular mit EmailJS (sendForm-Methode)
// -----------------------------------------------------------------
const bookingForm = document.getElementById('booking-form');
const formFeedback = document.getElementById('form-feedback');

if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = bookingForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;

    submitBtn.disabled = true;
    submitBtn.textContent = "Wird gesendet...";

    // Liest alle Felder mit name="" Attributen automatisch aus
    // Ersetze 'DEINE_SERVICE_ID' und 'DEINE_TEMPLATE_ID' mit deinen echten IDs
    emailjs.sendForm('DEINE_SERVICE_ID', 'DEINE_TEMPLATE_ID', bookingForm)
      .then(() => {
        formFeedback.textContent = "Vielen Dank! Deine Anfrage wurde erfolgreich übermittelt. Wir melden uns in Kürze.";
        formFeedback.className = "success";
        formFeedback.style.display = "block";
        bookingForm.reset();
      })
      .catch((error) => {
        console.error("EmailJS Fehler:", error);
        formFeedback.textContent = "Fehler beim Senden der Anfrage. Bitte versuche es erneut.";
        formFeedback.className = "error";
        formFeedback.style.display = "block";
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;

        setTimeout(() => {
          formFeedback.style.display = "none";
        }, 7000);
      });
  });
}


// -----------------------------------------------------------------
  // 5. "Mehr lesen" Toggle für Bandmitglieder-Biografien
  // -----------------------------------------------------------------
  const readMoreButtons = document.querySelectorAll('.read-more-btn');

  readMoreButtons.forEach(button => {
    button.addEventListener('click', () => {
      const cardInfo = button.closest('.member-info');
      const moreText = cardInfo.querySelector('.more-text');

      if (moreText) {
        moreText.classList.toggle('show');

        if (moreText.classList.contains('show')) {
          button.textContent = 'Weniger anzeigen';
        } else {
          button.textContent = 'Mehr lesen';
        }
      }
    });
  });


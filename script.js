/* =========================================================
   BrightPath Coaching Centre — script.js
   ========================================================= */

(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -------------------------------------------------------
     CONFIG — edit these before going live
     ------------------------------------------------------- */
  var CONTACT_CONFIG = {
    // Replace with the real 10-digit phone number (no spaces), e.g. "919812345678"
    phoneDisplay: '98XXXXXX21',
    phoneTel: '', // e.g. '+919812345678' — left blank until the real number is available
    whatsappNumber: '', // e.g. '919812345678' (country code, no + or spaces)
    whatsappMessage: 'Hi, I would like to know more about admissions at BrightPath Coaching Centre.'
  };

  // Where the admission form should send data. Leave null to keep the
  // frontend-only demo behaviour (simulated success after validation).
  var FORM_ENDPOINT = null; // e.g. 'https://formspree.io/f/xxxxxxx'

  /* -------------------------------------------------------
     MOBILE NAVIGATION
     ------------------------------------------------------- */
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobile-menu');

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('hidden', '');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
  }

  function openMobileMenu() {
    mobileMenu.removeAttribute('hidden');
    // Force reflow so the transition runs
    void mobileMenu.offsetWidth;
    mobileMenu.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close menu');
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = hamburger.getAttribute('aria-expanded') === 'true';
      if (isOpen) { closeMobileMenu(); } else { openMobileMenu(); }
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeMobileMenu(); }
    });
  }

  /* -------------------------------------------------------
     CHALK-WRITE TEXT REVEAL (hero + section headings)
     ------------------------------------------------------- */
  function writeChalkElement(el) {
    if (prefersReducedMotion) {
      el.classList.add('is-written');
      return;
    }
    var delay = parseInt(el.getAttribute('data-delay') || '0', 10);
    setTimeout(function () {
      el.classList.add('is-written');
      // Trigger any paired underline right after
      var underline = el.parentElement ? el.parentElement.querySelector('[data-underline]') : null;
      if (underline) {
        setTimeout(function () { underline.classList.add('is-drawn'); }, 300);
      }
    }, delay);
  }

  // Hero elements animate immediately on load
  document.querySelectorAll('.hero [data-write]').forEach(writeChalkElement);

  // Section headings animate when scrolled into view
  var chalkObserver = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        writeChalkElement(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('.section [data-write]').forEach(function (el) {
    chalkObserver.observe(el);
  });

  /* -------------------------------------------------------
     SCROLL REVEAL for cards / generic elements
     ------------------------------------------------------- */
  var revealTargets = document.querySelectorAll(
    '[data-reveal], .board-card, .teacher-card, .course-card, .meta-card, .why-card, .testimonial-card'
  );

  if (prefersReducedMotion) {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(function (el) { revealObserver.observe(el); });
  }

  /* -------------------------------------------------------
     TYPEWRITER for the About paragraph
     ------------------------------------------------------- */
  var typewriterEl = document.querySelector('[data-typewriter]');
  if (typewriterEl) {
    var fullText = typewriterEl.textContent;

    if (prefersReducedMotion) {
      typewriterEl.textContent = fullText;
    } else {
      typewriterEl.textContent = '';
      var typed = false;

      var twObserver = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !typed) {
            typed = true;
            var i = 0;
            var step = function () {
              typewriterEl.textContent = fullText.slice(0, i);
              i++;
              if (i <= fullText.length) {
                requestAnimationFrame(function () {
                  setTimeout(step, 14);
                });
              }
            };
            step();
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      twObserver.observe(typewriterEl);
    }
  }

  /* -------------------------------------------------------
     CONTACT: Call Now / WhatsApp links
     ------------------------------------------------------- */
  var callBtn = document.getElementById('call-now-btn');
  var whatsappBtn = document.getElementById('whatsapp-btn');
  var phoneDisplay = document.getElementById('contact-phone-display');

  if (phoneDisplay) { phoneDisplay.textContent = CONTACT_CONFIG.phoneDisplay; }

  if (callBtn) {
    if (CONTACT_CONFIG.phoneTel) {
      callBtn.setAttribute('href', 'tel:' + CONTACT_CONFIG.phoneTel);
    } else {
      callBtn.addEventListener('click', function (e) {
        e.preventDefault();
        alert('The phone number will be added here before launch. Please check back soon.');
      });
    }
  }

  if (whatsappBtn) {
    if (CONTACT_CONFIG.whatsappNumber) {
      var waUrl = 'https://wa.me/' + CONTACT_CONFIG.whatsappNumber +
        '?text=' + encodeURIComponent(CONTACT_CONFIG.whatsappMessage);
      whatsappBtn.setAttribute('href', waUrl);
    } else {
      whatsappBtn.addEventListener('click', function (e) {
        e.preventDefault();
        alert('WhatsApp contact will be enabled here before launch. Please check back soon.');
      });
    }
  }

  /* -------------------------------------------------------
     ADMISSION FORM: validation + submission
     ------------------------------------------------------- */
  var form = document.getElementById('admission-form');
  var submitBtn = document.getElementById('submit-btn');
  var statusBox = document.getElementById('form-status');
  var isSubmitting = false;

  function setFieldError(fieldEl, message) {
    var errorEl = form.querySelector('[data-error-for="' + fieldEl.id + '"]');
    if (errorEl) { errorEl.textContent = message || ''; }
    fieldEl.classList.toggle('invalid', Boolean(message));
    if (message) {
      fieldEl.setAttribute('aria-invalid', 'true');
    } else {
      fieldEl.removeAttribute('aria-invalid');
    }
  }

  function validateForm() {
    var valid = true;
    var requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(function (field) {
      var value = (field.value || '').trim();
      if (!value) {
        setFieldError(field, 'This field is required.');
        valid = false;
      } else if (field.id === 'phone-number' && !/^[0-9+\-\s]{7,15}$/.test(value)) {
        setFieldError(field, 'Enter a valid phone number.');
        valid = false;
      } else {
        setFieldError(field, '');
      }
    });

    return valid;
  }

  form.querySelectorAll('input, select, textarea').forEach(function (field) {
    field.addEventListener('blur', function () {
      if (field.hasAttribute('required')) {
        var value = (field.value || '').trim();
        if (!value) {
          setFieldError(field, 'This field is required.');
        } else if (field.id === 'phone-number' && !/^[0-9+\-\s]{7,15}$/.test(value)) {
          setFieldError(field, 'Enter a valid phone number.');
        } else {
          setFieldError(field, '');
        }
      }
    });
  });

  function showStatus(message, type) {
    statusBox.textContent = message;
    statusBox.className = 'form-status ' + type;
    statusBox.removeAttribute('hidden');
  }

  function setLoading(loading) {
    isSubmitting = loading;
    submitBtn.disabled = loading;
    submitBtn.classList.toggle('loading', loading);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (isSubmitting) { return; }

    if (!validateForm()) {
      showStatus('Please fix the highlighted fields and try again.', 'error');
      return;
    }

    setLoading(true);
    statusBox.setAttribute('hidden', '');

    var formData = new FormData(form);
    var payload = Object.fromEntries(formData.entries());

    var submission = FORM_ENDPOINT
      ? fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).then(function (res) {
          if (!res.ok) { throw new Error('Request failed'); }
        })
      // No backend connected yet: simulate a network delay so the loading
      // state and success flow can be reviewed end-to-end.
      : new Promise(function (resolve) { setTimeout(resolve, 900); });

    submission
      .then(function () {
        setLoading(false);
        showStatus('Thank you! Your admission enquiry has been received. BrightPath Coaching Centre will contact you soon.', 'success');
        form.reset();
      })
      .catch(function () {
        setLoading(false);
        showStatus('Something went wrong while sending your enquiry. Please try again or call us directly.', 'error');
      });
  });

  /* -------------------------------------------------------
     Hero video fallback: hide video element on error, CSS
     background already provides a dark fallback.
     ------------------------------------------------------- */
  var heroVideo = document.querySelector('.hero-video');
  if (heroVideo) {
    heroVideo.addEventListener('error', function () {
      heroVideo.style.display = 'none';
    });
  }

})();

/**
 * ====================================================================
 * NAYA HAIR & BEAUTY STUDIO — SCRIPTS D'INTERACTION & SCROLL NARRATIF
 * Abomey-Calavi, Bénin | Master Prompt Afro Luxe Experience
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  init3DHero();
  initMobileNav();
  initStickySubnav();
  initTypewriterEffect();
  initLookbookFilters();
  initLightboxModal();
  initWhatsAppBookingButtons();
  initQuickBookingForm();
  highlightTodayHours();
  initScrollAnimations();
  initInteractiveScrollEffects();
});

/**
 * 1. Initialisation de la scène Three.js du Héros
 */
function init3DHero() {
  const container = document.getElementById('hero3dCanvasContainer');
  if (container && typeof window.NayaHero3D !== 'undefined') {
    window.hero3DInstance = new window.NayaHero3D('hero3dCanvasContainer');
  }
}

/**
 * 2. Navigation Mobile Accessible
 */
function initMobileNav() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (!toggleBtn || !mobileNav) return;

  function toggleMenu(open) {
    const isExpanded = open !== undefined ? open : toggleBtn.getAttribute('aria-expanded') !== 'true';
    toggleBtn.setAttribute('aria-expanded', isExpanded);
    mobileNav.classList.toggle('is-open', isExpanded);
    mobileNav.setAttribute('aria-hidden', !isExpanded);
    document.body.style.overflow = isExpanded ? 'hidden' : '';
  }

  toggleBtn.addEventListener('click', () => toggleMenu());

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggleBtn.getAttribute('aria-expanded') === 'true') {
      toggleMenu(false);
      toggleBtn.focus();
    }
  });
}

/**
 * 3. Sous-barre collante au scroll (Inspirée de la vidéo Apple iPhone Duo)
 */
function initStickySubnav() {
  const subnav = document.querySelector('.sticky-subnav');
  const heroSection = document.querySelector('.hero-3d-section');

  if (!subnav || !heroSection) return;

  window.addEventListener('scroll', () => {
    const heroRect = heroSection.getBoundingClientRect();
    // Afficher la sous-barre dès que le hero commence à sortir de l'écran
    if (heroRect.bottom < 120) {
      subnav.style.display = 'block';
      subnav.style.opacity = '1';
    } else {
      subnav.style.display = 'none';
      subnav.style.opacity = '0';
    }
  }, { passive: true });
}

/**
 * 4. Machine à écrire discrète (Style B)
 * Phrases courtes qui se révèlent lettre par lettre
 */
function initTypewriterEffect() {
  const typewriterEl = document.getElementById('heroTypewriterText');
  if (!typewriterEl) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const phrases = [
    "L'art des tresses.",
    "La beauté des détails.",
    "Le soin de vos cheveux.",
    "Un style qui vous ressemble."
  ];

  if (reducedMotion) {
    typewriterEl.textContent = phrases[0];
    return;
  }

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause à la fin de la phrase
      isDeleting = true;
      typingSpeed = 2200;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  // Lancement après apparition du héros
  setTimeout(type, 1100);
}

/**
 * 5. Filtres de la Galerie Lookbook
 */
function initLookbookFilters() {
  const filterBtns = document.querySelectorAll('.lookbook-filter-btn');
  const galleryItems = document.querySelectorAll('.lookbook-item');

  if (!filterBtns.length || !galleryItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.getAttribute('data-filter');

      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      galleryItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (selected === 'all' || itemCat === selected || itemCat.includes(selected)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/**
 * 6. Lightbox Modal Accessible pour la Galerie
 */
function initLightboxModal() {
  const modal = document.getElementById('galleryLightboxModal');
  const modalImg = document.getElementById('lightboxImage');
  const modalCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxCloseBtn');
  let lastActiveTrigger = null;

  if (!modal || !modalImg || !closeBtn) return;
  const waLink = document.getElementById('lightboxWhatsAppLink');

  document.querySelectorAll('.lookbook-item').forEach(item => {
    function openItem() {
      const img = item.querySelector('img');
      const title = item.querySelector('.lookbook-item-title')?.textContent || '';
      const tag = item.querySelector('.lookbook-item-tag')?.textContent || '';

      if (img) {
        lastActiveTrigger = item;
        modalImg.src = img.src;
        modalImg.alt = img.alt || title;
        if (modalCaption) {
          modalCaption.textContent = `${title} — ${tag}`;
        }
        if (waLink) {
          const customMsg = `Bonjour NAYA STUDIO, je souhaite réserver ou me renseigner sur le modèle vu dans votre lookbook : ${title} (${tag}).`;
          waLink.href = `https://wa.me/${SALON_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(customMsg)}`;
        }
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        closeBtn.focus();
        document.body.style.overflow = 'hidden';
      }
    }

    item.addEventListener('click', openItem);
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openItem();
      }
    });
  });

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastActiveTrigger) {
      lastActiveTrigger.focus();
    }
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
}

/**
 * 7. Boutons WhatsApp pour chaque prestation
 */
function initWhatsAppBookingButtons() {
  const waButtons = document.querySelectorAll('.js-whatsapp-service');
  const waNumber = SALON_CONFIG.contact.whatsappNumber; // '2290146347988'

  waButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = btn.getAttribute('data-service-name') || 'vos soins capillaires';
      const message = `Bonjour, je souhaite avoir des informations sur la prestation ${serviceName}. J'aimerais connaître le tarif exact et les disponibilités.`;
      
      const whatsappUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  });
}

/**
 * 8. Formulaire rapide de rendez-vous WhatsApp
 */
function initQuickBookingForm() {
  const form = document.getElementById('nayaBookingForm');
  if (!form) return;

  const waNumber = SALON_CONFIG.contact.whatsappNumber;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const clientName = document.getElementById('clientName')?.value.trim() || 'Une cliente';
    const serviceChoice = document.getElementById('serviceChoice')?.value || 'Coiffure';
    const preferredDate = document.getElementById('preferredDate')?.value.trim() || 'Dès que possible';
    const clientNote = document.getElementById('clientNote')?.value.trim();

    let message = `Bonjour NAYA HAIR & BEAUTY STUDIO, je m'appelle ${clientName}.\n`;
    message += `Je souhaite avoir des informations et réserver la prestation : ${serviceChoice}.\n`;
    message += `Créneau souhaité : ${preferredDate}.\n`;
    if (clientNote) {
      message += `Précision : ${clientNote}\n`;
    }
    message += `J'aimerais connaître le tarif exact et les disponibilités. Merci !`;

    const whatsappUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    const alertBox = document.getElementById('formConfirmationAlert');
    if (alertBox) {
      alertBox.style.display = 'block';
      alertBox.innerHTML = `
        <strong>Votre message WhatsApp a été préparé avec succès !</strong><br>
        La discussion s'ouvre sur WhatsApp au <strong>${SALON_CONFIG.contact.whatsappDisplay}</strong> avec votre demande complète.
      `;
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
}

/**
 * 9. Surlignage du jour d'ouverture actuel
 */
function highlightTodayHours() {
  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const todayIndex = new Date().getDay();
  const todayName = days[todayIndex];

  document.querySelectorAll('.hours-table tr').forEach(row => {
    const dayCell = row.querySelector('td:first-child');
    if (dayCell && dayCell.textContent.trim().toLowerCase().startsWith(todayName.toLowerCase())) {
      row.classList.add('today');
      dayCell.innerHTML += ' <span style="font-size:0.75em; text-transform:uppercase; font-weight:800; color:var(--color-copper);">(Aujourd\'hui)</span>';
    }
  });
}

/**
 * 10. Révélation douce au défilement (IntersectionObserver)
 */
function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

/**
 * 11. Interactions vivantes au défilement (Parallaxe et profondeur subtile sur les visuels)
 */
function initInteractiveScrollEffects() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  const heroCard = document.querySelector('.hero-visual-card');
  const featureImgs = document.querySelectorAll('.showcase-feature-wrap img, .main-stacked-media img, .nail-care-card img');

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.scrollY;

        // Parallaxe subtile sur la carte héroïque
        if (heroCard && scrolled < window.innerHeight) {
          const heroOffsetY = scrolled * 0.12;
          heroCard.style.transform = `translateY(${heroOffsetY}px)`;
        }

        // Effet de profondeur légère sur les visuels clés
        featureImgs.forEach(img => {
          const rect = img.getBoundingClientRect();
          const viewH = window.innerHeight;
          if (rect.top < viewH && rect.bottom > 0) {
            const progress = (viewH - rect.top) / (viewH + rect.height);
            const moveY = (progress - 0.5) * 16;
            img.style.transform = `translateY(${moveY}px) scale(1.02)`;
            img.style.transition = 'transform 0.2s ease-out';
          }
        });

        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

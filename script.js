// footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// clone desktop nav into mobile menu (once) -------------------------------------------------
const navLinks = document.querySelector('.nav-links');
const mobileMenu = document.getElementById('mobileMenu');

if (navLinks && mobileMenu) {
  // avoid cloning multiple times (if script runs twice)
  if (!mobileMenu.querySelector('.nav-links-mobile')) {
    const ulClone = document.createElement('ul');
    ulClone.className = 'nav-links-mobile';
    ulClone.innerHTML = navLinks.innerHTML;

    // add mobile-cta class to any .btn-cta links so they look good on mobile
    ulClone.querySelectorAll('.btn-cta').forEach(a => {
      a.classList.add('mobile-cta');
    });

    mobileMenu.appendChild(ulClone);
  }
}

// mobile toggle ---------------------------------------------------------------------------
const hamburger = document.getElementById('hamburger');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const shown = mobileMenu.classList.toggle('show');
    hamburger.setAttribute('aria-expanded', shown ? 'true' : 'false');
    mobileMenu.setAttribute('aria-hidden', shown ? 'false' : 'true');
  });

  // close when clicking a link in mobile menu
  mobileMenu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      mobileMenu.classList.remove('show');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
    }
  });
}

// lightbox for project cards ----------------------------------------------------------------
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(src, title){
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = src || '';
  lightboxImg.alt = title || '';
  if (lightboxTitle) lightboxTitle.textContent = title || '';
  lightbox.classList.add('show');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(){
  if (!lightbox) return;
  lightbox.classList.remove('show');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lightboxImg) lightboxImg.src = '';
  if (lightboxTitle) lightboxTitle.textContent = '';
}

document.querySelectorAll('.project').forEach(card => {
  card.addEventListener('click', () => openLightbox(card.dataset.src || card.querySelector('img').src, card.dataset.title || ''));
  card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') openLightbox(card.dataset.src || card.querySelector('img').src, card.dataset.title || ''); });
});

if (lightbox) {
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
}
if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

// ---------- Sticky navbar on scroll ----------
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---------- Section reveal animation ----------
const sections = document.querySelectorAll("section");

function revealSections() {
  const triggerPoint = window.innerHeight * 0.85;

  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < triggerPoint) {
      section.classList.add("visible");
    }
  });
}

// ✅ Contact form - EmailJS integration
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const statusMsg = document.getElementById('statusMsg');
  statusMsg.textContent = "Sending message...";

  emailjs.sendForm('service_angy4rp', 'template_i1n7hrj', this)
    .then(() => {
      statusMsg.textContent = "✅ Message sent successfully!";
      statusMsg.style.color = "green";
      this.reset();
    })
    .catch((error) => {
      console.error('EmailJS Error:', error);
      statusMsg.textContent = "❌ Failed to send message. Please try again later.";
      statusMsg.style.color = "red";
    });
});


window.addEventListener("scroll", revealSections);
window.addEventListener("load", revealSections);

function setEmailLink(el) {
  const isMobile = window.innerWidth <= 700;

  if (isMobile) {
    el.href = "mailto:Vrandavandevelopers55@gmail.com?subject=Inquiry%20about%20project&body=Hello%20Vrandavan%20Developer,";
    el.removeAttribute('target');
  } else {
    el.href = "https://mail.google.com/mail/?view=cm&fs=1&to=Vrandavandevelopers55@gmail.com&su=Inquiry%20about%20project&body=Hello%20Vrandavan%20Developer,";
    el.target = "_blank";
  }
}

// Apply to both links
const emailLinks = [document.getElementById('emailLinkFooter'), document.getElementById('emailLink')];

emailLinks.forEach(link => {
  if (link) setEmailLink(link);
});

// Optional: update on resize
window.addEventListener('resize', () => {
  emailLinks.forEach(link => {
    if (link) setEmailLink(link);
  });
});

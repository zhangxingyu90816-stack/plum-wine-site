const ageGate = document.getElementById('ageGate');
const enterSiteBtn = document.getElementById('enterSiteBtn');
const leaveSiteBtn = document.getElementById('leaveSiteBtn');
const ageConfirmed = localStorage.getItem('meijianAgeConfirmed');

if (ageGate && ageConfirmed === 'true') {
  ageGate.style.display = 'none';
}

enterSiteBtn?.addEventListener('click', () => {
  localStorage.setItem('meijianAgeConfirmed', 'true');
  if (ageGate) {
    ageGate.classList.add('age-gate--closing');
    window.setTimeout(() => {
      ageGate.style.display = 'none';
    }, 320);
  }
});

leaveSiteBtn?.addEventListener('click', () => {
  window.location.href = 'https://www.google.com';
});

function submitInquiry(event) {
  event.preventDefault();
  const msg = document.getElementById('formMsg');
  if (msg) {
    msg.textContent = '查詢已提交，我們會盡快與你聯絡。';
  }
  event.target.reset();
  return false;
}
window.submitInquiry = submitInquiry;

/* Inject only the small enhancement rules needed for animation. */
const enhancementStyles = document.createElement('style');
enhancementStyles.textContent = `
  .age-gate { transition: opacity .32s ease, visibility .32s ease; }
  .age-gate--closing { opacity: 0; visibility: hidden; }

  .site-header {
    transition: box-shadow .28s ease, background-color .28s ease, transform .28s ease;
  }
  .site-header.is-scrolled {
    background: rgba(246, 241, 234, .97);
    box-shadow: 0 10px 28px rgba(22, 14, 9, .08);
  }

  .reveal {
    opacity: 0;
    transform: translate3d(0, 34px, 0);
    transition-property: opacity, transform;
    transition-duration: .78s;
    transition-timing-function: cubic-bezier(.22, 1, .36, 1);
    will-change: opacity, transform;
  }
  .reveal.is-visible {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  .product-card,
  .wine-card,
  .culture-grid figure,
  .wine-scenes figure,
  .share-card {
    transition: transform .32s cubic-bezier(.22, 1, .36, 1),
                box-shadow .32s ease;
  }
  .product-card:hover,
  .wine-card:hover,
  .culture-grid figure:hover,
  .wine-scenes figure:hover,
  .share-card:hover {
    transform: translateY(-8px);
  }

  .hero-visual img,
  .ingredient-main img,
  .section-visual img {
    transition: transform .6s cubic-bezier(.22, 1, .36, 1);
  }
  .hero-visual:hover img,
  .ingredient-main:hover img,
  .section-visual:hover img {
    transform: scale(1.018);
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: .01ms !important;
      animation-iteration-count: 1 !important;
      scroll-behavior: auto !important;
      transition-duration: .01ms !important;
    }
    .reveal { opacity: 1 !important; transform: none !important; }
  }
`;
document.head.appendChild(enhancementStyles);

const revealItems = Array.from(document.querySelectorAll('.reveal'));

/* Add a subtle stagger within each section. */
document.querySelectorAll('section').forEach((section) => {
  const sectionItems = Array.from(section.querySelectorAll('.reveal'));
  sectionItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 90, 270)}ms`;
  });
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -8% 0px'
  });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const siteHeader = document.querySelector('.site-header');
const updateHeader = () => {
  siteHeader?.classList.toggle('is-scrolled', window.scrollY > 18);
};
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

/* Smooth anchor navigation with sticky-header offset. */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    const headerHeight = siteHeader?.offsetHeight || 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 14;
    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  });
});

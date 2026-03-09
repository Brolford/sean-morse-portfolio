// ==========================================================================
// redesign.js — Sean Morse Portfolio V2
// Routing, rendering, animations. Replaces app.js + homepage-animations.js.
// ==========================================================================

// --- Data Loading ---

let projects = [];

async function loadData() {
  const projRes = await fetch('/data/projects.json');
  const projData = await projRes.json();
  projects = projData.items || projData;
}

// --- Helpers ---

function getPlaceholderClass(id) {
  const map = {
    'liquid-iv': 'placeholder-liquid-iv',
    'leisure-project': 'placeholder-leisure-project',
    'alecs-ice-cream': 'placeholder-alecs-ice-cream',
    'v8-campbells': 'placeholder-v8-campbells',
    'elenita-mezcal': 'placeholder-elenita-mezcal',
    'over-easy': 'placeholder-over-easy',
    'mimio': 'placeholder-mimio',
    'picture-day': 'placeholder-picture-day',
    'dream-pops': 'placeholder-dream-pops',
    'gimme': 'placeholder-gimme',
    'gig-car-share': 'placeholder-gig-car-share',
    'licensing-artwork': 'placeholder-licensing-artwork',
    'child-aid': 'placeholder-child-aid',
    'power-of-sport': 'placeholder-power-of-sport',
    'lorem-ipsum': 'placeholder-lorem-ipsum',
    'smartypants': 'placeholder-smartypants',
  };
  return map[id] || 'placeholder-default';
}

function placeholderBlock(projectId, alt = '', extraClass = '') {
  const cls = getPlaceholderClass(projectId);
  return `<div class="placeholder-gradient ${cls} ${extraClass}" role="img" aria-label="${alt}"></div>`;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// --- Featured project config (order & styling per brief) ---

const FEATURED_ORDER = [
  { id: 'liquid-iv',      bgClass: 'card-bg-liquid',   textClass: 'card-text-dark' },
  { id: 'alecs-ice-cream', bgClass: 'card-bg-alecs',   textClass: 'card-text-dark' },
  { id: 'over-easy',      bgClass: 'card-bg-overeasy', textClass: 'card-text-dark' },
  { id: 'elenita-mezcal', bgClass: 'card-bg-elenita',  textClass: 'card-text-light' },
  { id: 'leisure-project', bgClass: 'card-bg-leisure',  textClass: 'card-text-dark' },
  { id: 'v8-campbells',   bgClass: 'card-bg-v8',       textClass: 'card-text-light' },
];

// Brand names for marquee
const BRAND_NAMES = [
  'Liquid I.V.', 'V8', "Alec's Ice Cream", 'Over Easy', 'Elenita Mezcal',
  'Leisure Project', 'Mimio', 'SmartyPants', 'Gimme', 'Joolies',
  'Dream Pops', 'Picture Day',
];

// Discipline items for ticker
const DISCIPLINES = [
  'Brand Development', 'Packaging Design', 'Brand Strategy', 'Art Direction',
  'Visual Identity', 'Brand Architecture', 'Structural Packaging', 'Campaign Design',
  'Brand Evolution', 'Retail Shelf Design',
];

// --- Router ---

const app = document.getElementById('app');

function getRoute() {
  return window.location.hash || '#/';
}

function navigate(hash) {
  window.location.hash = hash;
}

function router() {
  const route = getRoute();
  const match = route.match(/^#\/work\/(.+)$/);

  // Fade out
  app.classList.remove('active');

  setTimeout(() => {
    window.scrollTo(0, 0);

    if (route === '#/' || route === '#') {
      document.title = 'Sean Morse — Design Director';
      renderWork();
    } else if (match) {
      const p = projects.find(pr => pr.id === match[1]);
      document.title = p ? `${p.title} — Sean Morse` : 'Sean Morse — Design Director';
      renderCaseStudy(match[1]);
    } else if (route === '#/archive') {
      document.title = 'Archive — Sean Morse';
      renderArchive();
    } else if (route === '#/about') {
      document.title = 'About — Sean Morse';
      renderAbout();
    } else {
      document.title = 'Sean Morse — Design Director';
      renderWork();
    }

    // Update nav active states
    updateNav(route);

    // Fade in
    requestAnimationFrame(() => {
      app.classList.add('active');
      setTimeout(() => {
        initScrollAnimations();
      }, 50);
    });
  }, 200);
}

function updateNav(route) {
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.remove('active');
  });

  if (route === '#/' || route === '#' || route.startsWith('#/work/')) {
    document.querySelector('[data-nav="work"]')?.classList.add('active');
  } else if (route === '#/archive') {
    document.querySelector('[data-nav="archive"]')?.classList.add('active');
  } else if (route === '#/about') {
    document.querySelector('[data-nav="about"]')?.classList.add('active');
  }
}


// ==========================================================================
// VIEWS
// ==========================================================================

// --- Marquee HTML builder (duplicated content for seamless loop) ---

function buildMarqueeRow(items, separator) {
  const content = items.map(name =>
    `<span class="brand-marquee-item">${escapeHtml(name)}</span><span class="brand-marquee-sep"> ${separator} </span>`
  ).join('');
  // Duplicate for seamless loop
  return content + content;
}

function buildTickerRow(items, separator) {
  const content = items.map(name =>
    `<span class="discipline-ticker-item">${escapeHtml(name)}</span><span class="discipline-ticker-sep">${separator}</span>`
  ).join('');
  return content + content;
}

// --- Work (Home) Page ---

function renderWork() {
  // Build featured project cards
  const featuredCards = FEATURED_ORDER.map(config => {
    const project = projects.find(p => p.id === config.id);
    if (!project) return '';

    const descriptor = project.tagline || project.summary || '';

    return `
      <article class="featured-card ${config.bgClass} ${config.textClass}" data-slug="${project.id}">
        <div class="featured-card-content">
          <div class="featured-card-category">${escapeHtml(project.category)}</div>
          <div class="featured-card-title">${escapeHtml(project.title)}</div>
          <div class="featured-card-year">${escapeHtml(project.year)}</div>
          ${descriptor ? `<div class="featured-card-desc">${escapeHtml(descriptor)}</div>` : ''}
        </div>
      </article>
    `;
  }).join('');

  app.innerHTML = `
    <!-- Hero -->
    <section class="hero" id="hero-section">
      <div class="hero-inner">
        <div class="hero-text">
          <div class="hero-overline">
            <span class="hero-overline-line"></span>
            <span class="hero-el hero-overline-text">Design Director — Portland, OR</span>
          </div>

          <h1 class="hero-headline">
            <span class="hero-el">Strategic Design</span><br>
            <span class="hero-el">Meets Visible</span><br>
            <span class="hero-el"><span class="accent">Impact.</span></span>
          </h1>

          <p class="hero-el hero-sub">Brand development and packaging design for CPG brands that take their craft seriously.</p>

          <a href="#/work" class="hero-el hero-cta" id="hero-cta-link">See the work &rarr;</a>
        </div>

        <div class="hero-card-wrap">
          <div class="hero-card hero-card-el" id="hero-card" data-slug="liquid-iv">
            <span class="hero-card-label">Liquid I.V.</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Bar -->
    <section class="stats-bar" id="stats-section">
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-number" data-target="10" data-suffix="+">10+</div>
          <div class="stat-label">Years CPG Design Leadership</div>
        </div>
        <div class="stat-item">
          <div class="stat-number" data-target="320" data-prefix="$" data-suffix="M+">$320M+</div>
          <div class="stat-label">Brand Revenue Influenced</div>
        </div>
        <div class="stat-item">
          <div class="stat-number" data-target="1" data-prefix="#">#1</div>
          <div class="stat-label">Dieline Award &mdash; Dairy Category</div>
        </div>
        <div class="stat-item">
          <div class="stat-number" data-target="15" data-suffix="+">15+</div>
          <div class="stat-label">Brands Launched or Evolved</div>
        </div>
      </div>
    </section>

    <!-- Brand Marquee -->
    <section class="brand-marquee" aria-hidden="true">
      <div class="brand-marquee-row">
        <div class="brand-marquee-track">
          ${buildMarqueeRow(BRAND_NAMES, '&mdash;')}
        </div>
      </div>
      <div class="brand-marquee-row">
        <div class="brand-marquee-track">
          ${buildMarqueeRow(BRAND_NAMES, '&mdash;')}
        </div>
      </div>
    </section>

    <!-- Featured Projects -->
    <section class="featured-section container">
      <div class="featured-section-label">Selected Work</div>
      <div class="featured-grid">
        ${featuredCards}
      </div>
    </section>

    <!-- Discipline Ticker -->
    <section class="discipline-ticker" aria-hidden="true">
      <div class="discipline-ticker-row">
        <div class="discipline-ticker-track">
          ${buildTickerRow(DISCIPLINES, '&middot;')}
        </div>
      </div>
    </section>

    <!-- Work CTA -->
    <section class="work-cta">
      <div class="work-cta-inner">
        <h2 class="work-cta-headline">Sean partners with brands that take their craft seriously.</h2>
        <a href="#" class="work-cta-btn" id="work-contact-trigger">Get in touch</a>
      </div>
    </section>

    ${renderFooter()}
  `;

  // --- Event handlers ---

  // Hero CTA scrolls to featured projects
  const heroCta = document.getElementById('hero-cta-link');
  if (heroCta) {
    heroCta.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('.featured-section')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Hero card navigates to project
  const heroCard = document.getElementById('hero-card');
  if (heroCard) {
    heroCard.addEventListener('click', () => {
      navigate(`#/work/${heroCard.dataset.slug}`);
    });
  }

  // Work CTA opens contact modal
  const workTrigger = document.getElementById('work-contact-trigger');
  if (workTrigger) {
    workTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      openContactModal();
    });
  }

  // Featured card click handlers
  app.querySelectorAll('.featured-card').forEach(card => {
    card.addEventListener('click', () => {
      navigate(`#/work/${card.dataset.slug}`);
    });
  });

  // --- Trigger hero entrance animation ---
  initHeroEntrance();
}


// --- Case Study ---

function renderCaseStudy(slug) {
  const project = projects.find(p => p.id === slug);
  if (!project) {
    renderWork();
    return;
  }

  const sectionsHtml = project.sections.length > 0 ? `
    <div class="accordion-sections">
      ${project.sections.map(s => `
        <div class="accordion-item">
          <button class="accordion-trigger">
            <span>${escapeHtml(s.title)}</span>
            <span class="accordion-icon">+</span>
          </button>
          <div class="accordion-body">
            <p>${escapeHtml(s.body)}</p>
          </div>
        </div>
      `).join('')}
    </div>
  ` : '';

  const creditsHtml = project.credits.map(c =>
    `<div class="credit-line"><span class="credit-name">${escapeHtml(c.name)}</span> <span class="credit-role">— ${escapeHtml(c.role)}</span></div>`
  ).join('');

  const awardsHtml = project.awards.map(a =>
    `<div class="award-badge">${escapeHtml(a)}</div>`
  ).join('');

  const galleryHtml = project.images.map((img, i) => {
    const alt = escapeHtml(project.title + ' project image ' + (i + 1));
    if (i === 0) {
      return `<div class="case-gallery-item full-bleed container">${placeholderBlock(project.id, alt)}</div>`;
    } else if (i === 1 && project.images.length > 2) {
      const alt2 = escapeHtml(project.title + ' project image 3');
      return `<div class="case-gallery-item two-up container">${placeholderBlock(project.id, alt)}${placeholderBlock(project.id, alt2)}</div>`;
    } else if (i === 2 && project.images.length > 2) {
      return '';
    } else if (i === project.images.length - 1 && i > 0) {
      return `<div class="case-gallery-item centered">${placeholderBlock(project.id, alt)}</div>`;
    } else {
      return `<div class="case-gallery-item full-bleed container">${placeholderBlock(project.id, alt)}</div>`;
    }
  }).filter(Boolean).join('');

  app.innerHTML = `
    <div class="case-hero">
      ${placeholderBlock(project.id, escapeHtml(project.title + ' hero image'))}
    </div>

    <header class="case-header">
      <span class="label">${escapeHtml(project.category)}</span>
      <h1 class="case-title">${escapeHtml(project.title)}</h1>
      <span class="case-year">${escapeHtml(project.year)}</span>
    </header>

    <div class="case-content container">
      <div class="case-main">
        ${project.tagline ? `<p class="case-tagline">${escapeHtml(project.tagline)}</p>` : ''}
        <div class="case-body">
          <p>${escapeHtml(project.body)}</p>
        </div>
        ${sectionsHtml}
      </div>

      <aside class="case-sidebar">
        <div class="sidebar-block">
          <div class="sidebar-label">Client</div>
          <div class="sidebar-value">${escapeHtml(project.client)}</div>
        </div>
        <div class="sidebar-block">
          <div class="sidebar-label">Agency</div>
          <div class="sidebar-value">${escapeHtml(project.agency)}</div>
        </div>
        <div class="sidebar-block">
          <div class="sidebar-label">Services</div>
          <div class="sidebar-value">${escapeHtml(project.services)}</div>
        </div>
        <hr>
        <div class="sidebar-block">
          <div class="sidebar-label">Credits</div>
          ${creditsHtml}
        </div>
        ${awardsHtml ? `<div class="sidebar-block">${awardsHtml}</div>` : ''}
      </aside>
    </div>

    <section class="case-gallery">${galleryHtml}</section>

    <div class="back-cta container">
      <a href="#/">&larr; Back to Work</a>
    </div>

    ${renderFooter()}
  `;

  // Accordion handlers
  app.querySelectorAll('.accordion-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.parentElement.classList.toggle('open');
    });
  });
}


// --- Archive ---

function renderArchive() {
  // Show all projects except lorem-ipsum placeholder, ordered by year descending
  const archiveProjects = projects
    .filter(p => p.id !== 'lorem-ipsum')
    .sort((a, b) => parseInt(b.year) - parseInt(a.year));

  const rows = archiveProjects.map(p => `
    <li class="archive-row" data-slug="${p.id}">
      <span class="archive-row-name">${escapeHtml(p.title)}</span>
      <span class="archive-row-category">${escapeHtml(p.category)}</span>
      <span class="archive-row-year">${escapeHtml(p.year)}</span>
    </li>
  `).join('');

  app.innerHTML = `
    <section class="archive-section">
      <h1 class="archive-title">Archive</h1>
      <ul class="archive-list">
        ${rows}
      </ul>
    </section>

    ${renderFooter()}
  `;

  // Click handlers
  app.querySelectorAll('.archive-row').forEach(row => {
    row.addEventListener('click', () => {
      navigate(`#/work/${row.dataset.slug}`);
    });
  });
}


// --- About ---

function renderAbout() {
  app.innerHTML = `
    <section class="about-section">
      <h1 class="about-headline">Designing brands that move people.</h1>

      <div class="about-bio">
        <p>Sean Morse is a Design Director and brand strategist with over a decade of experience in CPG brand development. Based in Portland, Oregon, he spent seven years at Hatch Design SF leading award-winning work for brands including Liquid I.V., Alec's Ice Cream, V8, and Over Easy. He is co-founder of Picture Day, a mental wellness tea brand built on the belief that design can nurture positive change. His philosophy: strategy and craft are not separate disciplines.</p>
      </div>

      <aside class="about-aside">
        <p>Picture Day is a tea brand Sean co-founded with Nick Adam, centered on mental wellness and optimism. It reflects their shared belief that design can nurture positive change — making every day a picture day.</p>
      </aside>

      <div class="about-stats">
        <div class="about-stat-item">
          <span class="about-stat-number">10+</span>
          <span class="about-stat-label">Years CPG Design Leadership</span>
        </div>
        <div class="about-stat-item">
          <span class="about-stat-number">$320M+</span>
          <span class="about-stat-label">Brand Revenue Influenced</span>
        </div>
        <div class="about-stat-item">
          <span class="about-stat-number">#1</span>
          <span class="about-stat-label">Dieline Award — Dairy Category</span>
        </div>
        <div class="about-stat-item">
          <span class="about-stat-number">15+</span>
          <span class="about-stat-label">Brands Launched or Evolved</span>
        </div>
      </div>

      <a href="#" class="about-cta about-contact-trigger">Have a project in mind? &rarr;</a>
    </section>

    ${renderFooter()}
  `;

  // Contact trigger
  const trigger = app.querySelector('.about-contact-trigger');
  if (trigger) {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openContactModal();
    });
  }
}


// --- Footer ---

function renderFooter() {
  const year = new Date().getFullYear();
  return `
    <footer class="footer">
      <div class="footer-inner">
        <span class="footer-left">&copy; Sean Morse ${year}</span>
        <span class="footer-right">
          <a href="mailto:hello@sfxm.space">hello@sfxm.space</a>
          <span class="footer-dot">&middot;</span>
          <a href="https://www.linkedin.com/in/seanfxmorse/" target="_blank" rel="noopener">LinkedIn</a>
          <span class="footer-dot">&middot;</span>
          <a href="https://dribbble.com/seanfxmorse" target="_blank" rel="noopener">Dribbble</a>
        </span>
      </div>
    </footer>
  `;
}


// ==========================================================================
// ANIMATIONS
// ==========================================================================

// --- Hero entrance (staggered on load) ---

function initHeroEntrance() {
  const hero = document.getElementById('hero-section');
  if (!hero) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    // Show everything immediately
    hero.querySelectorAll('.hero-el, .hero-card-el').forEach(el => {
      el.classList.add('visible');
    });
    hero.classList.add('loaded');
    return;
  }

  const heroEls = hero.querySelectorAll('.hero-el');
  const delays = [0, 100, 180, 260, 360, 480];

  heroEls.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, delays[i] || 0);
  });

  // Hero card entrance
  const heroCard = hero.querySelector('.hero-card-el');
  if (heroCard) {
    setTimeout(() => {
      heroCard.classList.add('visible');
      // Enable hover after entrance animation completes
      setTimeout(() => {
        heroCard.classList.add('ready');
      }, 600);
    }, 200);
  }

  // Trigger overline line draw
  setTimeout(() => {
    hero.classList.add('loaded');
  }, 100);
}


// --- Count-up animation ---

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function animateCounter(el, targetValue, duration, delay) {
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';

  setTimeout(() => {
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = Math.round(eased * targetValue);

      el.textContent = prefix + current + suffix;

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, delay);
}


// --- Scroll-triggered animations (IntersectionObserver) ---

function initScrollAnimations() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Stats bar count-up
  const statsSection = document.getElementById('stats-section');
  if (statsSection) {
    const statItems = statsSection.querySelectorAll('.stat-item');
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          statItems.forEach((item, i) => {
            const staggerDelay = i * 100;

            setTimeout(() => {
              item.classList.add('visible');
            }, staggerDelay);

            if (!prefersReduced) {
              const numEl = item.querySelector('.stat-number');
              const target = parseInt(numEl.dataset.target, 10);
              if (!isNaN(target) && target > 1) {
                animateCounter(numEl, target, 800, staggerDelay);
              }
            }
          });

          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    statsObserver.observe(statsSection);
  }

  // Featured project cards — staggered entrance
  const featuredCards = app.querySelectorAll('.featured-card');
  if (featuredCards.length) {
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = Array.from(featuredCards).indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, idx * 80);
          cardObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    featuredCards.forEach(card => cardObserver.observe(card));
  }

  // Brand marquee + discipline ticker entrance
  const entranceSections = document.querySelectorAll('.brand-marquee, .discipline-ticker');
  if (entranceSections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          sectionObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    entranceSections.forEach(section => sectionObserver.observe(section));
  }

  // Case study gallery items
  const galleryItems = app.querySelectorAll('.case-gallery-item');
  if (galleryItems.length) {
    const galleryObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          galleryObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    galleryItems.forEach(item => galleryObserver.observe(item));
  }
}


// ==========================================================================
// NAV, MOBILE NAV, CONTACT MODAL
// ==========================================================================

// --- Nav scroll effect ---

function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 80) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}

// --- Mobile nav ---

function initMobileNav() {
  const hamburger = document.querySelector('.nav-hamburger');
  const overlay = document.querySelector('.mobile-nav-overlay');

  if (!hamburger || !overlay) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    overlay.classList.toggle('open');
    document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
  });

  overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// --- Contact modal ---

function openContactModal() {
  const overlay = document.getElementById('contact-overlay');
  const form = document.getElementById('contact-form');

  if (!overlay || !form) return;

  // Reset form state
  form.reset();
  form.style.display = '';
  const title = form.parentElement.querySelector('.contact-modal-title');
  const sub = form.parentElement.querySelector('.contact-modal-sub');
  const submitBtn = form.querySelector('.contact-submit');
  if (title) title.textContent = 'Get in touch.';
  if (sub) sub.textContent = 'Have a project in mind? Fill this out and Sean will be in touch.';
  if (submitBtn) { submitBtn.textContent = 'Send Message'; submitBtn.disabled = false; }

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeContactModal() {
  const overlay = document.getElementById('contact-overlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function initContactModal() {
  const overlay = document.getElementById('contact-overlay');
  const backdrop = document.getElementById('contact-backdrop');
  const closeBtn = document.getElementById('contact-close');
  const form = document.getElementById('contact-form');
  const navContact = document.getElementById('nav-contact');
  const mobileContactTriggers = document.querySelectorAll('.mobile-contact-trigger');

  if (!overlay || !form) return;

  navContact?.addEventListener('click', (e) => {
    e.preventDefault();
    openContactModal();
  });

  mobileContactTriggers.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      // Close mobile nav if open
      document.querySelector('.nav-hamburger')?.classList.remove('open');
      document.querySelector('.mobile-nav-overlay')?.classList.remove('open');
      document.body.style.overflow = '';
      setTimeout(openContactModal, 200);
    });
  });

  backdrop?.addEventListener('click', closeContactModal);
  closeBtn?.addEventListener('click', closeContactModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeContactModal();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('.contact-submit');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    const name = document.getElementById('contact-name').value.trim();
    const projectType = document.getElementById('contact-project-type').value;
    const data = {
      name,
      email: document.getElementById('contact-email').value.trim(),
      company: document.getElementById('contact-company').value.trim(),
      project_type: projectType,
      message: document.getElementById('contact-message').value.trim(),
      _subject: `New ${projectType} inquiry from ${name}`,
    };

    try {
      const res = await fetch('https://formsubmit.co/ajax/hello@sfxm.space', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        form.style.display = 'none';
        const title = form.parentElement.querySelector('.contact-modal-title');
        const sub = form.parentElement.querySelector('.contact-modal-sub');
        if (title) title.textContent = 'Message sent.';
        if (sub) sub.textContent = 'Sean will get back to you soon.';
      } else {
        submitBtn.textContent = 'Something went wrong — try again';
        submitBtn.disabled = false;
      }
    } catch {
      submitBtn.textContent = 'Something went wrong — try again';
      submitBtn.disabled = false;
    }
  });
}


// ==========================================================================
// INIT
// ==========================================================================

window.addEventListener('hashchange', router);

document.addEventListener('DOMContentLoaded', async () => {
  await loadData();
  initNavScroll();
  initMobileNav();
  initContactModal();
  router();
});

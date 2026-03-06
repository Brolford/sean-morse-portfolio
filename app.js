// ============================================================================
// app.js — Routing, View Rendering, Animations
// ============================================================================

import { projects, spotlights } from './projects.js';

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
  };
  return map[id] || 'placeholder-default';
}

function imageOrPlaceholder(src, alt, projectId, extraClass = '') {
  const placeholderCls = getPlaceholderClass(projectId);
  // Try real image; fall back to gradient placeholder
  return `<img
    src="${src}"
    alt="${alt}"
    class="${extraClass}"
    onerror="this.style.display='none';this.nextElementSibling.style.display='block';"
  /><div
    class="placeholder-gradient ${placeholderCls} ${extraClass}"
    style="display:none;"
    role="img"
    aria-label="${alt}"
  ></div>`;
}

// For cases where we know images won't exist yet, show placeholder directly
function placeholderBlock(projectId, alt = '', extraClass = '') {
  const placeholderCls = getPlaceholderClass(projectId);
  return `<div class="placeholder-gradient ${placeholderCls} ${extraClass}" role="img" aria-label="${alt}"></div>`;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// --- Router ---

const app = document.getElementById('app');

function getRoute() {
  const hash = window.location.hash || '#/';
  return hash;
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
      // Initialize animations and spotlights after render
      setTimeout(() => {
        initAnimations();
        initSpotlights();
      }, 50);
    });
  }, 200);
}

function updateNav(route) {
  document.querySelectorAll('.nav-left a, .nav-right a').forEach(a => {
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

// --- Views ---

function renderSpotlightHtml(spotlight) {
  const project = projects.find(p => p.id === spotlight.projectId);
  if (!project) return '';
  const placeholderCls = getPlaceholderClass(spotlight.projectId);

  const slides = spotlight.images.map((img, i) => `
    <div class="spotlight-slide ${i === 0 ? 'active' : ''}" data-duration="${img.duration}">
      <img
        src="${img.src}"
        alt="${escapeHtml(project.title)} spotlight ${i + 1}"
        onerror="this.style.display='none';this.nextElementSibling.style.display='block';"
      />
      <div class="placeholder-gradient ${placeholderCls}" style="display:none;"></div>
    </div>
  `).join('');

  return `
    <section class="spotlight" data-project="${spotlight.projectId}">
      <div class="spotlight-slides">
        ${slides}
      </div>
      <div class="spotlight-overlay">
        <a href="#/work/${spotlight.projectId}" class="spotlight-link">
          <span class="spotlight-category label">${escapeHtml(project.category)}</span>
          <span class="spotlight-title">${escapeHtml(project.title)}</span>
          <span class="spotlight-tagline">${escapeHtml(project.tagline || project.summary)}</span>
        </a>
      </div>
      <div class="spotlight-progress">
        ${spotlight.images.map((_, i) => `<div class="spotlight-dot ${i === 0 ? 'active' : ''}"></div>`).join('')}
      </div>
    </section>
  `;
}

function renderWork() {
  const featured = projects.filter(p => p.featured);
  // Split featured into groups around spotlights
  const splitAt = 4; // First 4 cards, then break
  const group1 = featured.slice(0, splitAt);
  const group2 = featured.slice(splitAt);

  const spotlight1 = spotlights.find(s => s.position === 1);
  const spotlight2 = spotlights.find(s => s.position === 2);

  function renderCardGroup(cards, startIndex) {
    return cards.map((p, i) => `
      <article class="project-card" data-slug="${p.id}" data-delay="${startIndex + i}">
        <div class="project-card-image-wrap">
          ${placeholderBlock(p.id, escapeHtml(p.title + ' — ' + p.category))}
          <div class="project-card-overlay">
            <span class="label">${escapeHtml(p.category)}</span>
          </div>
        </div>
        <div class="project-card-info">
          <div class="project-card-title">${escapeHtml(p.title)}</div>
          <div class="project-card-year">${escapeHtml(p.year)}</div>
        </div>
      </article>
    `).join('');
  }

  app.innerHTML = `
    <section class="hero container">
      <h1 class="display-xl hero-title">Strategic Design<br>Meets Visible Impact.</h1>
      <p class="label hero-subtitle">Brand Development & Packaging Design</p>
    </section>

    ${spotlight1 ? renderSpotlightHtml(spotlight1) : ''}

    <section class="container">
      <div class="project-grid">
        ${renderCardGroup(group1, 0)}
      </div>
    </section>

    ${spotlight2 ? renderSpotlightHtml(spotlight2) : ''}

    ${group2.length > 0 ? `
      <section class="container">
        <div class="project-grid">
          ${renderCardGroup(group2, splitAt)}
        </div>
      </section>
    ` : ''}

    <section class="work-cta container">
      <h2 class="display-md">Have a project in mind?</h2>
      <p class="work-cta-sub">Sean partners with brands that take their craft seriously.</p>
      <a href="#" class="work-cta-btn" id="work-contact-trigger">Get in touch</a>
    </section>

    ${renderFooter()}
  `;

  // Work page CTA → open contact modal
  const workTrigger = app.querySelector('#work-contact-trigger');
  if (workTrigger) {
    workTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('contact-overlay').classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  // Card click handlers
  app.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      navigate(`#/work/${card.dataset.slug}`);
    });
  });

  // Spotlight click handlers
  app.querySelectorAll('.spotlight').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target.closest('.spotlight-link')) return; // let link handle it
      navigate(`#/work/${el.dataset.project}`);
    });
  });
}

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

  // Build gallery with alternating layouts
  const galleryHtml = project.images.map((img, i) => {
    // Alternate: full-bleed, two-up pair, centered
    const alt = escapeHtml(project.title + ' project image ' + (i + 1));
    if (i === 0) {
      return `<div class="case-gallery-item full-bleed container">
        ${placeholderBlock(project.id, alt)}
      </div>`;
    } else if (i === 1 && project.images.length > 2) {
      const alt2 = escapeHtml(project.title + ' project image 3');
      return `<div class="case-gallery-item two-up container">
        ${placeholderBlock(project.id, alt)}
        ${placeholderBlock(project.id, alt2)}
      </div>`;
    } else if (i === 2 && project.images.length > 2) {
      return '';
    } else if (i === project.images.length - 1 && i > 0) {
      return `<div class="case-gallery-item centered">
        ${placeholderBlock(project.id, alt)}
      </div>`;
    } else {
      return `<div class="case-gallery-item full-bleed container">
        ${placeholderBlock(project.id, alt)}
      </div>`;
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
        <div class="case-body body-text">
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

    <section class="case-gallery">
      ${galleryHtml}
    </section>

    <div class="back-cta container">
      <a href="#/">&larr; Back to Work</a>
    </div>

    ${renderFooter()}
  `;

  // Accordion handlers
  app.querySelectorAll('.accordion-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      item.classList.toggle('open');
    });
  });
}

function renderArchive() {
  const archived = projects.filter(p => !p.featured);

  app.innerHTML = `
    <section class="hero container">
      <h1 class="display-lg">Archive</h1>
    </section>

    <section class="container">
      <div class="archive-grid">
        ${archived.map((p, i) => `
          <article class="archive-card" data-slug="${p.id}" data-delay="${i}">
            <div class="archive-card-image-wrap">
              ${placeholderBlock(p.id, escapeHtml(p.title))}
              <div class="archive-card-overlay">
                <span>${escapeHtml(p.title)}</span>
              </div>
            </div>
          </article>
        `).join('')}
      </div>
    </section>

    ${renderFooter()}
  `;

  app.querySelectorAll('.archive-card').forEach(card => {
    card.addEventListener('click', () => {
      navigate(`#/work/${card.dataset.slug}`);
    });
  });
}

function renderAbout() {
  app.innerHTML = `
    <section class="about-layout">
      <div class="about-text">
        <h1 class="display-lg about-name">Sean Morse</h1>
        <p class="about-role">Brand Development &<br>Packaging Design</p>

        <div class="about-bio body-text">
          <p>Sean is a Design Director based in Portland, Oregon, whose decade-plus journey in design traverses diverse industry landscapes. He thrives at the intersection of strategic insight and visual craftsmanship, elevating brands while inspiring the teams he collaborates with.</p>

          <p>With a particular affinity for CPG, Sean spent over seven years at Hatch SF translating complex strategies into compelling design narratives. There, he orchestrated award-winning work for brands including V8, Liquid IV, Alec's Ice Cream, SmartyPants, Gimme, Joolies, Dream Pops, Elenita, and countless others, helping each find its distinct voice in their respective markets.</p>

          <p>Beyond his agency work, Sean selectively pursues freelance projects that spark his curiosity. Most recently, he partnered with Leisure Project, a breakthrough hydration beverage, providing comprehensive brand development from foundation to final packaging. The brand has since experienced remarkable growth in a highly competitive sector.</p>

          <p>Sean's entrepreneurial spirit led him to co-found Picture Day alongside business partner Nick Adam. This tea brand is centered on mental wellness and optimism, reflecting its belief in design's power to nurture positive change.</p>

          <p>When not immersed in the design world, Sean can be found traversing mountain trails, carving down snowy slopes, or contemplating his next creative venture over a crispy IPA. In his most cherished daydream, he's exploring the West's hidden corners alongside Tank, the French Bulldog he hopes to one day adopt, forever in search of the unexpected and the authentic.</p>
        </div>
      </div>

      <div class="about-photo-wrap">
        <!-- Replace with Sean's clay portrait photo from sfxm.space/about -->
        <div class="placeholder-gradient placeholder-about" role="img" aria-label="Sean Morse portrait"></div>
      </div>
    </section>

    <section class="about-contact container">
      <h2 class="display-md">Let's work together.</h2>
      <a href="#" class="contact-link about-contact-trigger">Get in touch</a>
    </section>

    ${renderFooter()}
  `;

  const aboutTrigger = app.querySelector('.about-contact-trigger');
  if (aboutTrigger) {
    aboutTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('contact-overlay').classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }
}

function renderFooter() {
  const year = new Date().getFullYear();
  return `
    <footer class="footer">
      <div class="footer-inner container">
        <span>&copy; Sean Morse ${year}</span>
        <span class="footer-sep">|</span>
        <a href="mailto:hello@sfxm.space">hello@sfxm.space</a>
        <span class="footer-sep">|</span>
        <a href="https://www.linkedin.com/in/seanfxmorse/" target="_blank" rel="noopener">LinkedIn</a>
        <span class="footer-sep">|</span>
        <a href="https://dribbble.com/seanfxmorse" target="_blank" rel="noopener">Dribbble</a>
      </div>
    </footer>
  `;
}

// --- Spotlight Slideshows ---

const spotlightTimers = [];

function initSpotlights() {
  // Clear any previous timers
  spotlightTimers.forEach(id => clearTimeout(id));
  spotlightTimers.length = 0;

  document.querySelectorAll('.spotlight').forEach(el => {
    const slides = el.querySelectorAll('.spotlight-slide');
    const dots = el.querySelectorAll('.spotlight-dot');
    if (slides.length < 2) return;

    let current = 0;

    function advance() {
      const duration = parseInt(slides[current].dataset.duration) || 2000;

      const timerId = setTimeout(() => {
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
        advance();
      }, duration);

      spotlightTimers.push(timerId);
    }

    advance();
  });
}

// --- Scroll Animations (IntersectionObserver) ---

function initAnimations() {
  // Staggered card entrance
  const cards = app.querySelectorAll('.project-card, .archive-card');
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0) * 100;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => cardObserver.observe(card));

  // Gallery image fade-up on scroll
  const galleryItems = app.querySelectorAll('.case-gallery-item');
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

// --- Nav Scroll Effect ---

function initNavScroll() {
  const nav = document.querySelector('.nav');
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

// --- Mobile Nav ---

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

// --- Contact Modal ---

function initContactModal() {
  const overlay = document.getElementById('contact-overlay');
  const backdrop = document.getElementById('contact-backdrop');
  const closeBtn = document.getElementById('contact-close');
  const form = document.getElementById('contact-form');
  const navContact = document.getElementById('nav-contact');
  const mobileContactTriggers = document.querySelectorAll('.mobile-contact-trigger');

  function openModal() {
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

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  navContact.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  });

  mobileContactTriggers.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      // Close mobile nav if open
      document.querySelector('.nav-hamburger')?.classList.remove('open');
      document.querySelector('.mobile-nav-overlay')?.classList.remove('open');
      document.body.style.overflow = '';
      setTimeout(openModal, 200);
    });
  });

  backdrop.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
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

// --- Init ---

window.addEventListener('hashchange', router);

document.addEventListener('DOMContentLoaded', () => {
  initNavScroll();
  initMobileNav();
  initContactModal();
  router();
});

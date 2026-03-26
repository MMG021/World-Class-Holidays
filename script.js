/* ═══════════════════════════════════════════════════
   WORLD CLASS HOLIDAYS — Interactions & Animations
═══════════════════════════════════════════════════ */

/* ── Nav scroll behaviour ──────────────────────── */
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ── Mobile burger ─────────────────────────────── */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  // close on link click
  mobileMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => mobileMenu.classList.remove('open'))
  );
}

/* ── Parallax hero background ──────────────────── */
const heroBg = document.getElementById('heroBg');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroBg.style.transform = `translateY(${y * 0.35}px)`;
  }, { passive: true });
}

/* ── Scroll reveal (Intersection Observer) ─────── */
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => observer.observe(el));
}

/* ── Counter animation ─────────────────────────── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start = performance.now();
  const ease = t => 1 - Math.pow(1 - t, 3); // ease-out cubic

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    el.textContent = Math.floor(ease(progress) * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

const counterEls = document.querySelectorAll('.stats__num');
if (counterEls.length) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counterEls.forEach(el => counterObserver.observe(el));
}

/* ── Newsletter form ───────────────────────────── */
function handleNewsletter(e) {
  e.preventDefault();
  const input = e.target.querySelector('input');
  const btn = e.target.querySelector('button');
  const email = input.value;
  btn.textContent = 'Subscribed ✓';
  btn.style.background = '#1D6344';
  input.value = '';
  input.placeholder = 'Thank you! We\'ll be in touch.';
  input.disabled = true;
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Subscribe';
    btn.style.background = '';
    input.placeholder = 'Your email address';
    input.disabled = false;
    btn.disabled = false;
  }, 4000);
}

/* ── Testimonial dots (mobile scroll) ─────────── */
const dots = document.querySelectorAll('.testi__dot');
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    dots.forEach(d => d.classList.remove('active'));
    dot.classList.add('active');
  });
});

/* ── Date input polish ─────────────────────────── */
const depDate = document.getElementById('depDate');
if (depDate) {
  depDate.addEventListener('focus', () => {
    const today = new Date();
    depDate.type = 'date';
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    depDate.min = `${yyyy}-${mm}-${dd}`;
  });
  depDate.addEventListener('blur', () => {
    if (!depDate.value) depDate.type = 'text';
  });
}

/* ── Smooth page transitions ───────────────────── */
document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');
  // only local .html links, not anchors
  if (href && href.endsWith('.html') && !href.startsWith('http')) {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.35s ease';
      setTimeout(() => { window.location.href = href; }, 350);
    });
  }
});
window.addEventListener('pageshow', () => {
  document.body.style.opacity = '1';
  document.body.style.transition = 'opacity 0.5s ease';
});
document.body.style.opacity = '1';
document.body.style.transition = 'opacity 0.5s ease';

// Header scroll
const hdr = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  hdr.classList.toggle('scrolled', window.scrollY > 20);
});
// Mobile nav
const burger = document.getElementById('hamburger');
const nav = document.getElementById('main-nav');
if (burger) burger.addEventListener('click', () => nav.classList.toggle('open'));
// Fade in observer
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));



document.addEventListener("DOMContentLoaded", () => {
  const revealTargets = document.querySelectorAll(
    '.problem-card, .step-card, .outcome-item, .team-card, .insight-card, .service-card'
  );

  revealTargets.forEach((el, index) => {
    el.classList.add('reveal', 'card-hover');
    el.style.transitionDelay = `${index * 0.06}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(el => observer.observe(el));
});

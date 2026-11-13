document.documentElement.classList.add('js');

// Menu plein écran
const burger = document.querySelector('.burger');
const menu = document.getElementById('menu');

function setMenu(open) {
  menu.hidden = !open;
  document.body.classList.toggle('menu-open', open);
  document.body.classList.toggle('no-scroll', open);
  burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? 'Cerrar el menú' : 'Abrir el menú');
}
burger.addEventListener('click', () => setMenu(menu.hidden));
menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) setMenu(false); });

// Les sections apparaissent au défilement
const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add('is-visible'));
}

// Bouton permanent « Reservar »
const cta = document.querySelector('.cta-fixed');
if (cta && 'IntersectionObserver' in window) {
  const watched = ['.hero', '#clases', '#contacto']
    .map((sel) => document.querySelector(sel))
    .filter(Boolean);
  const visible = new Set();

  const update = () => cta.classList.toggle('is-shown', visible.size === 0);

  const watcher = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) visible.add(entry.target);
      else visible.delete(entry.target);
    });
    update();
  });
  watched.forEach((el) => watcher.observe(el));
}

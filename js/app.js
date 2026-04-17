// clock
function tick() {
  const d = new Date();
  const t = new Date(d.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
  document.getElementById('clock').textContent =
    [t.getHours(), t.getMinutes(), t.getSeconds()]
      .map(n => String(n).padStart(2, '0')).join(':');
}
tick(); setInterval(tick, 1000);

// language
const root = document.documentElement;
const indicator = document.querySelector('.lang-indicator');
const buttons = document.querySelectorAll('.lang-btn');

function detectLang() {
  const l = navigator.language.toLowerCase();
  return l.startsWith('ja') ? 'JA' : 'EN';
}

const saved = localStorage.getItem('lang') || detectLang();
setLang(saved, false);

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.dataset.lang === root.getAttribute('data-lang')) return;
    playWipe(() => setLang(btn.dataset.lang, true));
  });
});

function setLang(lang, animate) {
  root.setAttribute('data-lang', lang);
  localStorage.setItem('lang', lang);
  buttons.forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
  moveIndicator();
}

function moveIndicator() {
  const active = document.querySelector('.lang-btn.active');
  const rect = active.getBoundingClientRect();
  const parent = active.parentElement.getBoundingClientRect();
  indicator.style.width = rect.width + 'px';
  indicator.style.transform = `translateX(${rect.left - parent.left}px)`;
}

window.addEventListener('load', moveIndicator);
window.addEventListener('resize', moveIndicator);

const wipe = document.createElement('div');
wipe.className = 'page-wipe';
document.body.appendChild(wipe);

function playWipe(cb) {
  wipe.classList.add('active');
  setTimeout(() => cb(), 350);
  setTimeout(() => wipe.classList.remove('active'), 700);
}
// skill bars — animate when visible
const fills = document.querySelectorAll('.skill-fill');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.dataset.pct + '%';
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
fills.forEach(f => io.observe(f));
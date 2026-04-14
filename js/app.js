document.addEventListener('DOMContentLoaded', function () {
  const langBtns = document.querySelectorAll('.lang-btn');
  const savedLang = localStorage.getItem('siteLanguage') || 'EN';

  langBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === savedLang);
  });

  applyLanguage(savedLang);

  langBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const newLang = this.dataset.lang;

      langBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      localStorage.setItem('siteLanguage', newLang);
      applyLanguage(newLang);
    });
  });
});

const skillBars = document.querySelectorAll('.skill-bar');

skillBars.forEach(skillBar => {
  const level = skillBar.getAttribute('level');
  const filledBar = skillBar.querySelector('.skill-bar-filled');
  filledBar.style.width = `${level}%`;
});

function updateTime() {
  const now = new Date();
  const tokyoTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Tokyo" }));

  const hours = tokyoTime.getHours().toString().padStart(2, '0');
  const minutes = tokyoTime.getMinutes().toString().padStart(2, '0');
  const seconds = tokyoTime.getSeconds().toString().padStart(2, '0');

  document.getElementById('time').textContent = `${hours}:${minutes}:${seconds}`;
}

updateTime();
setInterval(updateTime, 1000);

function applyLanguage(lang) {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  document.querySelectorAll('[data-lang]').forEach(element => {
    const langs = element.getAttribute('data-lang').split('|');

    if (langs.includes(lang)) {
      element.classList.remove('hidden-lang');
    } else {
      element.classList.add('hidden-lang');
    }

    if (element.querySelector('.JA-text, .en-text')) {
      const JAText = element.querySelector('.JA-text');
      const enText = element.querySelector('.en-text');

      if (lang === 'JA' && JAText) {
        JAText.style.display = 'inline';
        if (enText) enText.style.display = 'none';
      } else {
        if (JAText) JAText.style.display = 'none';
        if (enText) enText.style.display = 'inline';
      }
    }
  });
}

const container = document.querySelector('.scroll-container');
const scrollRight = document.querySelector('.scrollRight');
const scrollLeft = document.querySelector('.scrollLeft');

scrollLeft.addEventListener('click', function () {
  container.scrollBy({ left: -300, behavior: 'smooth' });
});

scrollRight.addEventListener('click', function () {
  container.scrollBy({ left: 300, behavior: 'smooth' });
});
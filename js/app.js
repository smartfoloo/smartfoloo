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

function showTime() {
  var date = new Date();
  var h = date.getHours(); // 0 - 23
  var m = date.getMinutes(); // 0 - 59
  var s = date.getSeconds(); // 0 - 59
  var session = "AM";

  if (h == 0) {
    h = 12;
  }

  if (h > 12) {
    h = h - 12;
    session = "PM";
  }

  h = (h < 10) ? "0" + h : h;
  m = (m < 10) ? "0" + m : m;
  s = (s < 10) ? "0" + s : s;

  var time = h + ":" + m + ":" + s + " " + session;
  document.getElementById("MyClockDisplay").innerText = time;
  document.getElementById("MyClockDisplay").textContent = time;

  setTimeout(showTime, 1000);

}
showTime();

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

    if (element.querySelector('.jp-text, .en-text')) {
      const jpText = element.querySelector('.jp-text');
      const enText = element.querySelector('.en-text');

      if (lang === 'JP' && jpText) {
        jpText.style.display = 'inline';
        if (enText) enText.style.display = 'none';
      } else {
        if (jpText) jpText.style.display = 'none';
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
const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const themeLabel = document.querySelector('.theme-label');
const savedTheme = localStorage.getItem('zzh-theme');

if (savedTheme === 'dark') root.setAttribute('data-theme', 'dark');

function updateThemeLabel() {
  const dark = root.getAttribute('data-theme') === 'dark';
  themeLabel.textContent = dark ? '日间' : '夜间';
  themeToggle.setAttribute('aria-label', dark ? '切换到日间主题' : '切换到夜间主题');
}

themeToggle.addEventListener('click', () => {
  const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', nextTheme);
  localStorage.setItem('zzh-theme', nextTheme);
  updateThemeLabel();
});
updateThemeLabel();

document.querySelector('#year').textContent = new Date().getFullYear();

const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
const lightboxCaption = document.querySelector('#lightbox-caption');

document.querySelectorAll('.gallery-item').forEach((item) => {
  item.addEventListener('click', () => {
    lightboxImage.src = item.dataset.image;
    lightboxImage.alt = item.querySelector('img').alt;
    lightboxCaption.textContent = item.dataset.caption;
    lightbox.showModal();
  });
});

document.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});

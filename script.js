const html = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('lirael-theme');

if (savedTheme) html.setAttribute('data-theme', savedTheme);
themeToggle.querySelector('span').textContent = html.getAttribute('data-theme') === 'dark' ? '☾' : '☼';
themeToggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('lirael-theme', next);
  themeToggle.querySelector('span').textContent = next === 'dark' ? '☾' : '☼';
});

document.querySelector('#year').textContent = new Date().getFullYear();

const dialog = document.querySelector('#project-dialog');
document.querySelector('#open-project').addEventListener('click', () => dialog.showModal());
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });

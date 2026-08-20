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
const reelImage = document.querySelector('#reel-image');
const reelCounter = document.querySelector('#reel-counter');
const progressBar = document.querySelector('#reel-progress-bar');
const reelImages = [
  '实物展示/全景正面.jpg', '实物展示/全景侧面.jpg', '实物展示/传动展示.jpg',
  '实物展示/分离展示.jpg', '实物展示/喂食部件后面.jpg', '实物展示/喂食器侧面.jpg',
  '实物展示/喂食装置.jpg', '实物展示/细节展示.jpg'
];
let reelIndex = 0;
let reelStartedAt = 0;
const reelDuration = 2600;

function setReelImage(index) {
  reelIndex = index % reelImages.length;
  reelImage.style.opacity = '.25';
  window.setTimeout(() => { reelImage.src = reelImages[reelIndex]; reelImage.style.opacity = '1'; }, 100);
  reelCounter.textContent = `${String(reelIndex + 1).padStart(2, '0')} / ${String(reelImages.length).padStart(2, '0')}`;
  reelStartedAt = performance.now();
}

function reelFrame(now) {
  if (!dialog.open) return;
  const progress = Math.min((now - reelStartedAt) / reelDuration, 1);
  progressBar.style.width = `${progress * 100}%`;
  if (progress >= 1) setReelImage(reelIndex + 1);
  window.requestAnimationFrame(reelFrame);
}

document.querySelector('#open-project').addEventListener('click', () => {
  dialog.showModal();
  setReelImage(0);
  window.requestAnimationFrame(reelFrame);
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => { progressBar.style.width = '0'; });

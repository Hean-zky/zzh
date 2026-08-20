const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const themeLabel = document.querySelector('.theme-label');
const savedTheme = localStorage.getItem('lirael-theme');
if (savedTheme === 'dark') root.setAttribute('data-theme', 'dark');
function updateTheme() { const dark = root.getAttribute('data-theme') === 'dark'; themeLabel.textContent = dark ? '日间' : '夜间'; themeToggle.setAttribute('aria-label', dark ? '切换到日间主题' : '切换到夜间主题'); }
themeToggle.addEventListener('click', () => { const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'; root.setAttribute('data-theme', next); localStorage.setItem('lirael-theme', next); updateTheme(); });
updateTheme();
document.querySelector('#year').textContent = new Date().getFullYear();

const dialog = document.querySelector('#project-dialog');
const reelImage = document.querySelector('#reel-image');
const reelCounter = document.querySelector('#reel-counter');
const progressBar = document.querySelector('#reel-progress-bar');
const reelImages = ['实物展示/全景正面.jpg','实物展示/全景侧面.jpg','实物展示/传动展示.jpg','实物展示/分离展示.jpg','实物展示/喂食部件后面.jpg','实物展示/喂食器侧面.jpg','实物展示/喂食装置.jpg','实物展示/细节展示.jpg'];
let reelIndex = 0;
let reelTimer;
let reelStartedAt;
const reelDuration = 2600;

function showReelImage(index) { reelIndex = index % reelImages.length; reelImage.style.opacity = '0.25'; window.setTimeout(() => { reelImage.src = reelImages[reelIndex]; reelImage.style.opacity = '1'; }, 120); reelCounter.textContent = `${String(reelIndex + 1).padStart(2, '0')} / ${String(reelImages.length).padStart(2, '0')}`; reelStartedAt = performance.now(); }
function animateReel(now) { if (!dialog.open) return; const progress = Math.min((now - reelStartedAt) / reelDuration, 1); progressBar.style.width = `${progress * 100}%`; if (progress >= 1) showReelImage(reelIndex + 1); window.requestAnimationFrame(animateReel); }
function startReel() { window.clearInterval(reelTimer); showReelImage(0); reelStartedAt = performance.now(); window.requestAnimationFrame(animateReel); reelTimer = window.setInterval(() => {}, reelDuration); }

document.querySelector('#open-project').addEventListener('click', () => { dialog.showModal(); startReel(); });
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => { window.clearInterval(reelTimer); progressBar.style.width = '0'; });
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });

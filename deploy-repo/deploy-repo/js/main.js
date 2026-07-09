const FILES = [
  'render-01.png', 'render-02.png', 'render-03.png', 'render-04.png',
  'render-05.png', 'render-06.png', 'render-07.png', 'render-08.png',
  'render-09.png', 'render-10.png', 'render-11.jpeg', 'render-12.jpeg',
  'render-13.jpeg', 'render-14.jpeg', 'render-15.png', 'render-16.png',
  'render-17.png', 'render-18.png', 'render-19.png', 'render-20.png',
  'render-21.png', 'render-22.jpeg', 'render-23.jpeg', 'render-24.jpeg',
  'render-25.jpeg', 'render-26.jpeg', 'render-27.png', 'render-28.jpeg',
];

const LAYOUT_PATTERN = ['hero', 'tall', '', 'wide', '', 'tall', '', 'wide', '', 'hero'];

const PROJECTS = FILES.map((file, i) => ({
  file,
  layout: LAYOUT_PATTERN[i % LAYOUT_PATTERN.length],
}));

const gallery = document.querySelector('.gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('.lightbox__img');
const lightboxIndex = lightbox.querySelector('.lightbox__index');
const btnClose = lightbox.querySelector('.lightbox__close');
const btnPrev = lightbox.querySelector('.lightbox__nav--prev');
const btnNext = lightbox.querySelector('.lightbox__nav--next');

let currentIndex = 0;

function buildGallery() {
  PROJECTS.forEach((project, i) => {
    const item = document.createElement('article');
    const layoutClass = project.layout ? ` gallery__item--${project.layout}` : '';
    item.className = `gallery__item${layoutClass}`;
    item.dataset.index = i;

    item.innerHTML = `
      <img src="assets/images/${project.file}" alt="Proyecto arquitectónico ${i + 1}" loading="lazy">
    `;

    item.addEventListener('click', () => openLightbox(i));
    gallery.appendChild(item);
  });
}

function openLightbox(index) {
  currentIndex = index;
  updateLightbox();
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function updateLightbox() {
  const project = PROJECTS[currentIndex];
  lightboxImg.src = `assets/images/${project.file}`;
  lightboxImg.alt = `Proyecto arquitectónico ${currentIndex + 1}`;
  lightboxIndex.textContent = String(currentIndex + 1).padStart(2, '0');
}

function navigate(direction) {
  currentIndex = (currentIndex + direction + PROJECTS.length) % PROJECTS.length;
  updateLightbox();
}

btnClose.addEventListener('click', closeLightbox);
btnPrev.addEventListener('click', () => navigate(-1));
btnNext.addEventListener('click', () => navigate(1));

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('is-open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') navigate(-1);
  if (e.key === 'ArrowRight') navigate(1);
});

buildGallery();

const PROJECTS = [
  { file: 'render-01.png', layout: 'hero' },
  { file: 'render-02.png', layout: 'tall' },
  { file: 'render-03.png', layout: '' },
  { file: 'render-04.png', layout: 'wide' },
  { file: 'render-05.png', layout: '' },
  { file: 'render-06.png', layout: 'tall' },
  { file: 'render-07.png', layout: '' },
  { file: 'render-08.png', layout: 'wide' },
  { file: 'render-09.png', layout: '' },
  { file: 'render-10.png', layout: 'hero' },
  { file: 'render-11.png', layout: '' },
  { file: 'render-12.png', layout: 'tall' },
  { file: 'render-13.png', layout: '' },
  { file: 'render-14.png', layout: 'wide' },
  { file: 'render-15.png', layout: '' },
  { file: 'render-16.jpeg', layout: 'tall' },
  { file: 'render-17.jpeg', layout: '' },
  { file: 'render-18.jpeg', layout: '' },
  { file: 'render-19.jpeg', layout: 'wide' },
  { file: 'render-20.jpeg', layout: '' },
  { file: 'render-21.jpeg', layout: '' },
];

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

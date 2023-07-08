import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';

console.log(galleryItems);
console.log(SimpleLightbox);

const galleryList = document.querySelector('.gallery');
let currentInstance = null;

const createGalleryItem = ({ preview, original, description }) => {
  return `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>
  `;
};
galleryList.addEventListener('click', (event) => {
  event.preventDefault();

  const clickedImage = event.target.closest('.gallery__image');
  if (!clickedImage) {
    return;
  }

  const largeImageUrl = clickedImage.dataset.source;
  const instance = new SimpleLightbox('.gallery a', {
    elements: [{ src: largeImageUrl }],
  });

  currentInstance = instance;
  instance.show();

  window.addEventListener('keydown', onEscKeydown);
});

function onEscKeydown(event) {
  if (event.key === 'Escape') {
    currentInstance.close();
    currentInstance = null;
    window.removeEventListener('keydown', onEscKeydown);
  }
}

const galleryMarkup = galleryItems.map(createGalleryItem).join('');
galleryList.insertAdjacentHTML('beforeend', galleryMarkup);

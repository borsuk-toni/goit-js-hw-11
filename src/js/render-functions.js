import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector('.gallery');

let lightbox = new SimpleLightbox('.gallery a', {
                captionsData: 'alt',
                captionDelay: 250,
            });

export function galleryMarkup(el) {
    const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = el;
    return `<li class="item"> <a class="gallery-item" href="${largeImageURL}">
                            <img class="gallery-image"
                            src="${webformatURL}"
                            alt="${tags}"/>
                        </a>
                        <ul class="descr">
                        <li class="descr-item"><p class="descr-title">Likes<span class="descr-value">${likes}</span></p></li>
                        <li class="descr-item"><p class="descr-title">Views<span class="descr-value"> ${views}</span></p></li>
                        <li class="descr-item"><p class="descr-title">Comments<span class="descr-value"> ${comments}</span></p></li>
                        <li class="descr-item"><p class="descr-title">Downloads<span class="descr-value"> ${downloads}</span></p></li>
                        </ul>
                        </li>`;
}

export function createGallery(elems) {
    const markup = elems.hits
        .map(el => {
            return galleryMarkup(el);
        })
        .join('');
    
    gallery.innerHTML = markup;

    lightbox.refresh();
}
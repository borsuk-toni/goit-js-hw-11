import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

loader.style.display = 'none';

form.addEventListener('submit', e => {
    e.preventDefault();
    const name = e.target.elements.input.value;

    createGallery(name);
    form.reset();
});

function createGallery(searchValue) {

    const params = {
        key: '42343629-db0a88f68e5938b107ae69266',
        q: `${searchValue.trim()}`
            .split(' ')
            .map(value => {
                return value.toLowerCase().trim();
            })
            .join('+'),
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
    };
    const url = `https://pixabay.com/api/?key=${params.key}&q=${params.q}&image-type=${params.image_type}&orientation=${params.orientation}&safesearch=${params.safesearch}`;

    loader.style.display = 'block';

    return fetch(url)
        .then(res => res.json())
        .then(result => {
            if (result.hits.length === 0) {
                loader.style.display = 'none';
                gallery.innerHTML = '';
                iziToast.error({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                });
            } else {
                loader.style.display = 'none';
                const markup = result.hits
                    .map(image => {
                        return `<li class="item"> <a class="gallery-item" href="${image.largeImageURL}">
                            <img class="gallery-image"
                            src="${image.webformatURL}"
                            alt="${image.tags}"/>
                        </a>
                        <ul class="descr">
                        <li class="descr-item"><p class="descr-title">Likes<span class="descr-value">${image.likes}</span></p></li>
                        <li class="descr-item"><p class="descr-title">Views<span class="descr-value"> ${image.views}</span></p></li>
                        <li class="descr-item"><p class="descr-title">Comments<span class="descr-value"> ${image.comments}</span></p></li>
                        <li class="descr-item"><p class="descr-title">Downloads<span class="descr-value"> ${image.downloads}</span></p></li>
                        </ul>
                        </li>`;
                    })
                    .join('');
                gallery.innerHTML = markup;
            }
            const lightbox = new SimpleLightbox('.gallery a', {
                captionsData: 'alt',
                captionDelay: 250,
            });
            lightbox.refresh();
        })
        .catch(error => {
            console.log(error);
        });
}




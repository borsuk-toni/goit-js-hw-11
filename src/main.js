import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { createGallery } from "./js/render-functions.js";
import { getImages } from "./js/pixabay-api.js";

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

loader.style.display = 'none';

form.addEventListener('submit', e => {
    e.preventDefault();

    gallery.innerHTML = '';

    const input = e.target.elements.input.value.trim();

    if (input === '') {
        iziToast.warning({
            message: 'Please enter a valid request!',
            position: "topRight",
        });
        return;
    }

    loader.style.display = 'block';

    getImages(input)
        .then(data => {
            if (data.hits.length === 0) {
                iziToast.error({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: "topRight",
                });
            } else {
                createGallery(data);
            }
        })
        .catch(error => {
            iziToast.error({
                message: 'Unable to get images',
                title: error,
                position: "topRight",
                });
        })
        .finally(() => {
            loader.style.display = 'none';
        });
    
    e.target.reset();
});

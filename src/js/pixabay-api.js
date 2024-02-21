export function getImages(searchValue) {
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

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .catch(error => {
            iziToast.error({
                message: 'Unable to get images',
                title: error,
                position: "topRight",
                });
        });
}

const accessKey = "BxzsLkkcx-jlK6zfPM_mA2baONy2k1NY9rTdvhkFghs";
const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchResult = document.getElementById('search-result');
const showMore = document.getElementById('show-more');

let keyWord = "";
let page = 1;

async function searchImages() {
    keyWord = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyWord}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    // Insert new images at the top
    results.map((result) => {
        const image = document.createElement('img');
        image.src = result.urls.small;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searchResult.insertBefore(imageLink, searchResult.firstChild);
    });

    showMore.style.display = 'block';
}

searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    page = 1;

    searchImages();
});

showMore.addEventListener('click', function (e) {
    e.preventDefault();  // Prevent default form submission behavior
    page++;
    searchImages();
});

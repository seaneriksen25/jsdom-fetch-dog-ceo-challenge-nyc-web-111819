console.log('%c HI', 'color: firebrick')
document.addEventListener('DOMContentLoaded', function(){
    getImages()

})

let breeds = []

function getImages(){
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    fetch(imgUrl)
        .then(response => response.json())
        .then(images => {
            images.message.forEach(image => addImages(image))
        })
}

function addImages(dogPicUrl){
    let dogPicDiv = document.getElementById("dog-image-container")
    let dogPic = document.createElement('img')
    dogPic.id = "dog-img"
    dogPic.src = dogPicUrl
    dogPicDiv.appendChild(dogPic)
    
}

function loadBreeds(){
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch(breedUrl)
    .then(response => response.json())
    .then(results => {
        breeds = Object.keys(results.message)
        updateBreedList(breeds)
        addBreedSelectListener()
    })
}

function updateBreedList(breeds) {
    let ul = document.querySelector('#dog-breeds');
    removeChildren(ul);
    breeds.forEach(breed => addBreed(breed));
}

function removeChildren(element) {
    let child = element.lastElementChild;
    while (child) {
        element.removeChild(child);
        child = element.lastElementChild;
    }
}

function selectBreedsStartingWith(letter) {
    updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
}

function addBreedSelectListener() {
    let breedDropdown = document.querySelector('#breed-dropdown');
    breedDropdown.addEventListener('change', function (event) {
        selectBreedsStartingWith(event.target.value);
    });
}

function addBreed(breed) {
    let ul = document.querySelector('#dog-breeds');
    let li = document.createElement('li');
    li.innerText = breed;
    li.style.cursor = 'pointer';
    ul.appendChild(li);
    li.addEventListener('click', updateColor);
}

function updateColor(event) {
    event.target.style.color = 'palevioletred';
}
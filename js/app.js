'use strict'

var imgArray = [];
var attempts = 25;
var userAttempts = 0;

var firstImageIndex;
var SecondImageIndex;
var thirdImgIndex;
var container = document.getElementById('images');
var firstImage = document.createElement('img');
firstImage.id = 'firstImage';
var SecondImage = document.createElement('img');
SecondImage.id = 'SecondImage';
var thirdImg = document.createElement('img');
thirdImg.id = 'thirdImg';
var resultList = document.getElementById('resultList');
var form = document.getElementById('form');


// creating th constructor
function Product(imgName) {
    this.name = imgName;
    this.src = '../img/' + imgName + '.jpg';
    this.shown = 0;
    this.vote = 0;
    imgArray.push(this);
}



new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep');
new Product('tauntaun');
new Product('unicorn');
new Product('usb');
new Product('water-can');
new Product('wine-glass');


ThreeRandom();
render();

form = addEventListener('submit', submitted);
container.addEventListener('click', userClick);

function submitted(event) {
    console.log(event.target.userAttempts.value);
    event.preventDefault();
    userAttempts = event.target.userAttempts.value;
    console.log(document.getElementById('userAttempts'));
    attempts = userAttempts;
}

function userClick(event) {
    attempts--;
    if (attempts > 0) {
        if (event.target.id === firstImage.id) {
            imgArray[firstImageIndex].vote++;
            ThreeRandom();
            render();
        } else if (event.target.id === SecondImage.id) {
            imgArray[SecondImageIndex].vote++;
            ThreeRandom();
            render();
        } else if (event.target.id === thirdImg.id) {
            imgArray[thirdImgIndex].vote++;
            ThreeRandom();
            render();
        }
        else {
            attempts++;
        }
    } else {
        var results;
        for (var i = 0; i < imgArray.length; i++) {
            results = document.createElement('li');
            results.textContent = imgArray[i].name + ' got ' + imgArray[i].vote + ' votes.' + 'And was shown ' + imgArray[i].shown + ' times.';
            resultList.appendChild(results);
        }
        container.removeEventListener('click', userClick);
    }
}

function ThreeRandom() {
    firstImageIndex = randomIndex();
    do {
        SecondImageIndex = randomIndex();
        thirdImgIndex = randomIndex();
    } while (firstImageIndex === SecondImageIndex || firstImageIndex === thirdImgIndex || SecondImageIndex === thirdImgIndex)
    imgArray[firstImageIndex].shown++
    imgArray[SecondImageIndex].shown++
    imgArray[thirdImgIndex].shown++
}

function render() {
    firstImage.src = imgArray[firstImageIndex].src;
    container.appendChild(firstImage);
    SecondImage.src = imgArray[SecondImageIndex].src;
    container.appendChild(SecondImage);
    thirdImg.src = imgArray[thirdImgIndex].src;
    container.appendChild(thirdImg);
}


function randomIndex() {
    return Math.floor(Math.random() * imgArray.length);
}
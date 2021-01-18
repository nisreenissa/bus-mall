'use strict'

var imgArray = [];
var imgNames = [];
var imgShown = [];
var imgVotes = [];
var attempts = 25;
var userAttempts = 0;

var firstImageIndex;
var secondImageIndex;
var  thirdImageIndex;
var indices=[firstImageIndex,secondImageIndex,thirdImageIndex];
var container  = document.getElementById('images');

var firstImg = document.createElement('img');
firstImg.id = 'firstImg';
var secondImg = document.createElement('img');
secondImg.id = 'secondImg';
var thirdImg = document.createElement('img');
thirdImg.id = 'thirdImg';

var firstImgTitle = document.createElement('h1');
var secondImgTitle = document.createElement('h1');
var thirdImgTitle = document.createElement('h1');


// var resultList = document.getElementById('resultList');
var form = document.getElementById('form');
var button = document.getElementById('resultButton');

var ctx = document.getElementById('myChart').getContext('2d');

//creating the constructor 
function Product(imgName) {
    this.name = imgName;
    this.src = 'img/' + imgName + '.jpg';
    this.shown = 0;
    this.vote = 0;
    imgArray.push(this);
    imgNames.push(this.name);
    imgShown.push(this.shown);
    imgVotes.push(this.vote);

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

form.addEventListener('submit', submitter);
container .addEventListener('click', userClick);
button.addEventListener('click', result, { once: true });

function submitter(event) {
    event.preventDefault();
    userAttempts = event.target.userAttempts.value;
    attempts = userAttempts;
}

function userClick(event) {
    attempts--;
    if (attempts > 0) {
        ThreeRandom();
        if (event.target.id === firstImg.id) {
            imgArray[firstImageIndex].vote++;
            render();
        } else if (event.target.id === secondImg.id) {
            imgArray[secondImageIndex].vote++;
            render();
        } else if (event.target.id === thirdImg.id) {
            imgArray[thirdImageIndex].vote++;
            render();
        }
        else {
            attempts++;
        }
    } else {
        container .removeEventListener('click', userClick);
        button.removeAttribute('disabled');
    }
}

//rendering the chart instead of list 
function result() {
    renderChart();
    // var results;
    // for (var i = 0; i < imgArray.length; i++) {
    //     results = document.createElement('li');
    //     results.textContent = imgArray[i].name.toUpperCase() + ' got ' + imgArray[i].vote + ' votes out of ' + imgArray[i].shown + ' times it was displayed.';
    //     resultList.appendChild(results);
    // }
}

function ThreeRandom() {
    firstImageIndex = randomIndex();
    do {
        secondImageIndex = randomIndex();
        thirdImageIndex = randomIndex();
    } while (firstImageIndex === secondImageIndex || firstImageIndex === thirdImageIndex || secondImageIndex === thirdImageIndex)
    imgArray[firstImageIndex].shown++
    imgArray[secondImageIndex].shown++
    imgArray[thirdImageIndex].shown++

    for (var i = 0; i < imgArray.length; i++) {
        imgShown[i] = imgArray[i].shown;
    }
    indices = [firstImageIndex, secondImageIndex, thirdImageIndex];
}

function render() {
    firstImgTitle.textContent = imgArray[firstImageIndex].name;
    container .appendChild(firstImgTitle);
    secondImgTitle.textContent = imgArray[secondImageIndex].name;
    container .appendChild(secondImgTitle);
    thirdImgTitle.textContent = imgArray[thirdImageIndex].name;
    container .appendChild(thirdImgTitle);
    firstImg.src = imgArray[firstImageIndex].src;
    container .appendChild(firstImg);
    secondImg.src = imgArray[secondImageIndex].src;
    container .appendChild(secondImg);
    thirdImg.src = imgArray[thirdImageIndex].src;
    container .appendChild(thirdImg);
}

function randomIndex() {
    return Math.floor(Math.random() * imgArray.length);
}

function renderChart() {
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: imgNames,
            datasets: [
                {
                    label: "seen",
                    backgroundColor: "yellow",
                    data: imgShown
                }, {
                    label: "Voted",
                    backgroundColor: "red",
                    data: imgVotes
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: 'Voted Results',
                position: 'bottom',
            },
            data: {
                precision: 0
            }
        }
    });
}

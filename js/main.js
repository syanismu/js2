import  {closeCarouselToast} from "./galleryAnimation.js";

// Initializing Variables
var ul = document.getElementById("carousel");
let thumbnails = document.getElementsByClassName("thumbnail");
let leftArrow = document.getElementById("left-arrow")
let rightArrow = document.getElementById("right-arrow")
let heroImg = document.getElementById("hero-image");
let heroDate = document.getElementById("hero-date");
let heroCaption = document.getElementById("hero-caption");

// Initializing Photo objects for each image
const photo1 = new Photo("brazil-large", "brazil-small", "Watching the sunset at the Itatiaia National Park in Brazil was breathtaking!", "July 17");
const photo2 = new Photo("edinburgh-large", "edinburgh-small", "A charming house in Princes Street Gardens, Edinburgh.", "May 7");
const photo3 = new Photo("egypt-large", "egypt-small", "The Great Pyramids of Giza are truly spectacular.", "Oct 17");
const photo4 = new Photo("japan-large", "japan-small", "The cherry blossoms in bloom in Hiroshima.", "Apr 4");
const photo5 = new Photo("newzealand-large", "newzealand-small", "Every Lord of the Rings fan has to visit The Shire set in New Zealand.", "June 8");
const photo6 = new Photo("norway-large", "norway-small", "The view at Steinsdalsfossen in Norway.", "Sept 16");
const photo7 = new Photo("switzerland-large", "switzerland-small", "Glacier river in Blatten, Switzerland.", "Mar 15");
const photo8 = new Photo("zhangjiajie-large", "zhangjiajie-small", "The Avatar movie was filmed here in ZhangJiaJie, China.", "Aug 31");

// Initializing Array of photo objects
let photos = [photo1,photo2,photo3,photo4,photo5,photo6,photo7,photo8];

// Initializing Thumbnails
for (let j = 0; j < photos.length; j++) {
    var li = document.createElement("li");
    var img = document.createElement("img");
    li.appendChild(img);
    img.setAttribute("class", "thumbnail");
    // img.setAttribute("id", j+1);
    img.src = "./images/" + photos[j].thumbImg + ".jpg";
    ul.appendChild(li);
}

// Functions
function Photo(mainImg, thumbImg, caption, date) {
    //Create Photo Objects
    this.mainImg = mainImg;
    this.thumbImg = thumbImg;
    this.caption = caption;
    this.date = date;
}

function setImages(photos) {
    //Sets up thumbnail images in carousel
    for (var p = 0; p < photos.length; p++){
        thumbnails[p].src = "./images/" + photos[p].thumbImg + ".jpg"
    }

    for (let n = 0; n < 3; n++) {
        thumbnails[n].style.display = "block";
        var li = document.querySelectorAll("li");
        li[n].style.border = "1px solid #2E2D2C;";
    }

    for (let m = 3; m < photos.length; m++) {
        thumbnails[m].style.display = "none";
        var li = document.querySelectorAll("li");
        li[m].style.border = "0px";
    }
}

function mouseOverLeftArrow() {
    //Hover over left arrow to change colour and make cursor pointer
    leftArrow.style.cursor = "pointer";
    leftArrow.style.color = "#4C7E3E";
}

function mouseOverRightArrow() {
    //Hover over right arrow to change colour and make cursor pointer
    rightArrow.style.cursor = "pointer";
    rightArrow.style.color = "#4C7E3E";
}

function mouseOutArrow() {
    //When you stop hovering over arrows, turn colour back to black
    leftArrow.style.color = "black";
    rightArrow.style.color = "black";
}

function clickLeftArrow(photos) {
    //On click on left arrow, shift Photos array left
    let first = photos.pop();
    photos.unshift(first);
    setImages(photos);
    comapreHeroImgToThumbnail();
}

function clickRightArrow(photos) {
    //On click on right arrow, shift Photos array right
    let first = photos[0];
    let last = first;
    photos.shift();
    photos.push(last);
    setImages(photos);
    comapreHeroImgToThumbnail();
}

function turnThumbnailsGray() {
    //Turn all thumbnails gray
    for (var i = 0; i < thumbnails.length; i++) {
        thumbnails[i].style.filter = "grayscale(1)";
    }
}

function comapreHeroImgToThumbnail() {
    for (let k = 0; k < photos.length; k++) {
        let thumbnailSrc = thumbnails[k].src;
        let splitThumbSrcString = thumbnailSrc.split("/");
        let lastThumbString = splitThumbSrcString.pop();
        let splitLastThumbString = lastThumbString.split("-");
        let plainThumbSrc = splitLastThumbString.shift();
        let heroImgSrc = heroImg.src;
        let splitHeroImgString = heroImgSrc.split("/");
        let lastHeroString = splitHeroImgString.pop();
        let splitLastHeroString = lastHeroString.split("-");
        let plainHeroSrc = splitLastHeroString.shift();

        if (plainHeroSrc == plainThumbSrc) {
            thumbnails[k].style.filter = "grayscale(0)";
        }

        else {
            thumbnails[k].style.filter = "grayscale(1)";
        }
    }
}

//Checks to see if a thumbnail image has been selected and applies changes
for (var i = 0; i < thumbnails.length; i++) {
    //Event listener for click on thumbnail image
    thumbnails[i].addEventListener("click", function(event) {
    let clickedImg = event.currentTarget;
    let imgSrc = clickedImg.src;
    turnThumbnailsGray();
    clickedImg.style.filter = "grayscale(0)";
    let splitSrcString = imgSrc.split("/");
    let imgSrcString = splitSrcString.pop();
    closeCarouselToast();

    for (let k = 0; k < photos.length; k++) {
        let photosSrc = photos[k].thumbImg + ".jpg";
        let mainPhotoSrc = photos[k].mainImg + ".jpg";

        if (imgSrcString == photosSrc){
            heroImg.src = "./images/" + mainPhotoSrc;
            heroDate.innerHTML = photos[k].date;
            heroCaption.innerHTML = photos[k].caption;
            break;
        }
    }
  })
}

//Call Function
setImages(photos);

// Event Handlers 
leftArrow.onmouseover = function () { mouseOverLeftArrow() };
rightArrow.onmouseover = function () { mouseOverRightArrow() };
leftArrow.onmouseout = function () { mouseOutArrow() };
rightArrow.onmouseout = function () { mouseOutArrow() };
leftArrow.onclick = function() { clickLeftArrow(photos) };
rightArrow.onclick = function() { clickRightArrow(photos) };

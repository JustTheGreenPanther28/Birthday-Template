const imageInput = document.getElementById("imageInput");
const profile = document.getElementById("profileImage");
let images = ["image/birthdayImg.png","image/birthdayImg1.png","image/birthdayImg2.png","image/birthdayImg3.png","image/birthdayImg4.png","image/birthdayImg5.png"];

let selected = false;
let x = 0, y = 0;
let scale = 1.1;

imageInput.addEventListener("change", function () {

    scale = 1.1;
    x = 0;
    y = 0;

    document.getElementById('title').textContent = "";
    const selectedFile = this.files[0];

    if (!selectedFile) {
        return;
    }
    selected = true;
    const imageURL = URL.createObjectURL(selectedFile);

    profile.src = imageURL;
});

const nameInput = document.getElementById("nameinput");
const name = document.getElementById("name");
nameInput.addEventListener("input", () => {
    name.textContent = nameInput.value;
});

const fit = document.getElementById("fit");
const fill = document.getElementById("fill");

fit.addEventListener("click", () => {
    profile.style.objectFit = "contain";
    x = 0;
    y = 0;
    scale = 1.1;
    profile.style.transform = `translate(0px, 0px) scale(1.1)`;
});

fill.addEventListener("click", () => {
    profile.style.objectFit = "cover";
    x = 0;
    y = 0;
    scale = 1.1;
    profile.style.transform = `translate(0px, 0px) scale(1.1)`;
});

const zoomIn = document.getElementById("zoomIn");
const zoomOut = document.getElementById("zoomOut");

zoomIn.addEventListener("click", () => {
    if (!selected) return;
    scale += 0.1;

    profile.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
});

zoomOut.addEventListener("click", () => {
    if (!selected) return;
    if (scale <= 1.1) {
        return;
    }
    scale -= 0.1;

    profile.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
});

const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");
const topBtn = document.getElementById("top");
const bottomBtn = document.getElementById("bottom");

function pan(dx, dy) {
    if (!selected) return;
    x += dx;
    y += dy;
    profile.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
}

leftBtn.addEventListener("click", () => {
    pan(-5, 0);
});

rightBtn.addEventListener("click", () => {
    pan(5, 0);
});

topBtn.addEventListener("click",()=>{
    pan(0,-5);
});

bottomBtn.addEventListener("click",()=>{
    pan(0,5);
});

let i = 0;

const previous = document.getElementById("prev");
const next = document.getElementById("next");

previous.addEventListener("click", () => {
    i = (i - 1 + images.length) % images.length;
    updatePoster();
});

next.addEventListener("click", () => {
    i = (i + 1) % images.length;
    updatePoster();
});

function updatePoster() {
    poster.style.backgroundImage = `url("${images[i]}")`;
}


const downloadBtn = document.getElementById("downloadBtn");
const poster = document.querySelector(".poster");

downloadBtn.addEventListener("click", function () {
    domtoimage.toPng(poster).then(dataUrl => {
        const link = document.createElement("a");
        link.download = "Birthday_Poster.png";
        link.href = dataUrl;
        link.click();
    });
});
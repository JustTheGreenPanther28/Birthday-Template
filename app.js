const imageInput = document.getElementById("imageInput");
const profile = document.getElementById("profileImage");
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
});

fill.addEventListener("click", () => {
    profile.style.objectFit = "cover";
})

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

leftBtn.addEventListener("click", () => {
    if (!selected) return;
    x += 5;
    profile.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
})


rightBtn.addEventListener("click", () => {
    if (!selected) return;
    x -= 5;
    profile.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
});

topBtn.addEventListener("click", () => {
    if (!selected) return;
    y += 5;
    profile.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
});

bottomBtn.addEventListener("click", () => {
    if (!selected) return;
    y -= 5;
    profile.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
});


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

let images = ["image/birthdayImg.png","image/birthdayImg1.png","image/birthdayImg2.png"];
let i=0;

const previous = document.getElementById("prev");
const next = document.getElementById("next");

previous.addEventListener("click",()=>{
    if(i==-1){
        i=images.length-1;
    }
    poster.style.backgroundImage = `url("${images[i]}")`;
    i--;
})

next.addEventListener("click",()=>{
    if(i==images.length){
        i=0;
    }
    poster.style.backgroundImage = `url(${images[i]})`;
    i++;
})
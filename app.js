const imageInput = document.getElementById("imageInput");
const profile = document.getElementById("profileImage");
let selected = false;

imageInput.addEventListener("change", function () {

    document.getElementById('title').textContent="";
    const selectedFile = this.files[0];

    if (!selectedFile) {
        return;
    }
    selected=true;
    const imageURL = URL.createObjectURL(selectedFile);

    profile.src = imageURL;
});

const nameInput = document.getElementById("nameinput");
const name = document.getElementById("name");
nameInput.addEventListener("input",()=>{
     name.textContent=nameInput.value;
     if(name.value==""){
        name.textContent="______";
     }
});

const fit = document.getElementById("fit");
const fill = document.getElementById("fill");

fit.addEventListener("click",()=>{
    profile.style.objectFit = "contain";
});

fill.addEventListener("click",()=>{
    profile.style.objectFit = "cover";
})

const zoomIn = document.getElementById("zoomIn");
const zoomOut = document.getElementById("zoomOut");
let scale=1;

zoomIn.addEventListener("click",()=>{
    if(!selected) return;
    scale += 0.1;

    profile.style.transform=`scale(${scale})`;
});

zoomOut.addEventListener("click",()=>{
    if(!selected) return;
    if(scale<=1.1){
        return;
    }
    scale -= 0.1;

    profile.style.transform=`scale(${scale})`;
});




const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");
const topBtn = document.getElementById("top");
const bottomBtn = document.getElementById("bottom");


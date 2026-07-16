const poster = document.getElementById("poster");
const themeSelect = document.getElementById("themeSelect");
themeSelect.addEventListener("change", () => {
    poster.dataset.theme = themeSelect.value;
});

const imageInput = document.getElementById("imageInput");
const profile = document.getElementById("profileImage");
const photoMask = document.getElementById("photoMask");
const photoPlaceholder = document.getElementById("photoPlaceholder");

let selected = false;
let x = 0, y = 0;
let scale = 1.1;

function applyTransform() {
    profile.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;
}

imageInput.addEventListener("change", function () {
    scale = 1.1; x = 0; y = 0;
    const selectedFile = this.files[0];
    if (!selectedFile) return;
    selected = true;
    profile.src = URL.createObjectURL(selectedFile);
    profile.style.display = "block";
    photoPlaceholder.style.display = "none";
    applyTransform();
});

const nameInput = document.getElementById("nameInput");
const nameDisplay = document.getElementById("nameDisplay");
nameInput.addEventListener("input", () => {
    nameDisplay.textContent = nameInput.value || "Their name";
});

const ageInput = document.getElementById("ageInput");
const ageDisplay = document.getElementById("ageDisplay");
const ageDisplayVintage = document.getElementById("ageDisplayVintage");
ageInput.addEventListener("input", () => {
    const val = ageInput.value || "21";
    ageDisplay.textContent = val;
    ageDisplayVintage.textContent = val;
});

const messageInput = document.getElementById("messageInput");
const messageDisplay = document.getElementById("messageDisplay");
messageInput.addEventListener("input", () => {
    messageDisplay.textContent = messageInput.value || "Wishing you the best day ever";
});

document.getElementById("fit").addEventListener("click", () => {
    profile.style.objectFit = "contain"; x = 0; y = 0; scale = 1.1; applyTransform();
});
document.getElementById("fill").addEventListener("click", () => {
    profile.style.objectFit = "cover"; x = 0; y = 0; scale = 1.1; applyTransform();
});
document.getElementById("zoomIn").addEventListener("click", () => {
    if (!selected) return; scale += 0.1; applyTransform();
});
document.getElementById("zoomOut").addEventListener("click", () => {
    if (!selected || scale <= 1.1) return; scale -= 0.1; applyTransform();
});

function pan(dx, dy) {
    if (!selected) return;
    x += dx; y += dy;
    applyTransform();
}

let isDragging = false;
profile.addEventListener('mousedown', () => {
    if (!selected) return;
    isDragging = true;
    photoMask.classList.add('dragging');
});
document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    pan(e.movementX, e.movementY);
});
document.addEventListener('mouseup', () => {
    isDragging = false;
    photoMask.classList.remove('dragging');
});
profile.addEventListener('dragstart', (e) => e.preventDefault());

document.getElementById("downloadBtn").addEventListener("click", function () {
    domtoimage.toPng(poster).then(dataUrl => {
        const link = document.createElement("a");
        link.download = "Birthday_Poster.png";
        link.href = dataUrl;
        link.click();
    });
});
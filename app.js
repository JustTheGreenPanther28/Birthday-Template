let optionsSelect = document.getElementById("options");

let selected = false;
let x = 0;
let y = 0;
let scale = 1.1;
let currentFile = null;
let currentName = "";
let currentAge = "";
let isDragging = false;

let iframe = document.getElementById("template");
function getDoc() {
    if (iframe.contentDocument) {
        return iframe.contentDocument;
    } else {
        return iframe.contentWindow.document;
    }
}

function getProfileImg() {
    var doc = getDoc();
    if (!doc) {
        return null;
    }

    var mask = doc.querySelector(".photo-mask");
    if (!mask) {
        return null;
    }

    var img = mask.querySelector("#profileImage");

    if (!img) {
        img = doc.createElement("img");
        img.id = "profileImage";
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";
        img.style.cursor = "move";
        img.style.transformOrigin = "center center";
        mask.appendChild(img);
    }

    return img;
}

function applyTransform() {
    var img = getProfileImg();
    if (!img) {
        return;
    }
    img.style.transform = "translate(" + x + "px, " + y + "px) scale(" + scale + ")";
}

function applyName() {
    var doc = getDoc();
    if (!doc) {
        return;
    }
    var nameEl = doc.querySelector(".name");
    if (!nameEl) {
        nameEl = doc.getElementById("name");
    }
    if (nameEl) {
        nameEl.textContent = currentName;
    }
}

function applyAge() {
    var doc = getDoc();
    if (!doc) {
        return;
    }

    var badge = doc.querySelector(".sticker");
    if (!badge) {
        badge = doc.querySelector(".age-badge");
    }
    if (badge) {
        var numSpan = badge.querySelector("span:first-child");
        if (numSpan) {
            numSpan.textContent = currentAge;
        }
    }

    var ageLine = doc.querySelector(".age-line span");
    if (ageLine) {
        ageLine.textContent = currentAge;
    }
}

function refreshTemplate() {
    var img = getProfileImg();
    if (img && currentFile) {
        img.src = URL.createObjectURL(currentFile);
        selected = true;
        applyTransform();
    }
    applyName();
    applyAge();
}

iframe.addEventListener("load", function () {
    refreshTemplate();
});

let imageInput = document.getElementById("imageInput");
let nameInput = document.getElementById("nameinput");
let ageInput = document.getElementById("ageinput");
imageInput.addEventListener("change", function () {
    scale = 1.1;
    x = 0;
    y = 0;

    var selectedFile = this.files[0];
    if (!selectedFile) {
        return;
    }

    currentFile = selectedFile;

    var titleEl = document.getElementById("title");
    if (titleEl) {
        titleEl.textContent = "";
    }

    refreshTemplate();
});

let nameError = document.getElementById("nameError");
let ageError = document.getElementById("ageError");

function validateName(value) {
    if (value.length > 25) {
        nameError.textContent = "Name cannot exceed 25 characters.";
        return false;
    }
    nameError.textContent = "";
    return true;
}

function validateAge(value) {
    if (value.trim() === "") {
        ageError.textContent = "Age cannot be empty.";
        return false;
    }
    var num = Number(value);
    if (!Number.isInteger(num)) {
        ageError.textContent = "Age must be a whole number.";
        return false;
    }
    if (num <= 0) {
        ageError.textContent = "Age must be greater than 0.";
        return false;
    }
    if (num > 120) {
        ageError.textContent = "Please enter a realistic age (max 120).";
        return false;
    }
    ageError.textContent = "";
    return true;
}

nameInput.addEventListener("input", function () {
    
    if (validateName(nameInput.value)) {
        currentName = nameInput.value;
        applyName();
    }
    else{
        nameInput.value = nameInput.value.slice(0, 25);
    }
});

ageInput.addEventListener("input", function () {
    if (validateAge(ageInput.value)) {
        currentAge = ageInput.value;
        applyAge();
    } else {
        currentAge = "";
    }
});


optionsSelect.addEventListener("change", function (e) {
    if (e.target.value) {
        iframe.src = e.target.value;
    }
});

let fitBtn = document.getElementById("fit");
let fillBtn = document.getElementById("fill");
fitBtn.addEventListener("click", function () {
    var img = getProfileImg();
    if (!img) {
        return;
    }
    img.style.objectFit = "contain";
    x = 0;
    y = 0;
    scale = 1.1;
    applyTransform();
});

fillBtn.addEventListener("click", function () {
    var img = getProfileImg();
    if (!img) {
        return;
    }
    img.style.objectFit = "cover";
    x = 0;
    y = 0;
    scale = 1.1;
    applyTransform();
});
let zoomInBtn = document.getElementById("zoomIn");
let zoomOutBtn = document.getElementById("zoomOut");
zoomInBtn.addEventListener("click", function () {
    if (!selected) {
        return;
    }
    scale = scale + 0.1;
    applyTransform();
});

zoomOutBtn.addEventListener("click", function () {
    if (!selected) {
        return;
    }
    if (scale <= 1.1) {
        return;
    }
    scale = scale - 0.1;
    applyTransform();
});

const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");
const topBtn = document.getElementById("top");
const bottomBtn = document.getElementById("bottom");

leftBtn.addEventListener("click", () => {
    pan(-5, 0);
});

rightBtn.addEventListener("click", () => {
    pan(5, 0);
});

topBtn.addEventListener("click", () => {
    pan(0, -5);
});

bottomBtn.addEventListener("click", () => {
    pan(0, 5);
});

function pan(dx, dy) {
    if (!selected) {
        return;
    }
    x = x + dx;
    y = y + dy;
    applyTransform();
}

iframe.addEventListener("load", function () {
    var img = getProfileImg();
    if (!img) {
        return;
    }

    img.addEventListener("mousedown", function (e) {
        if (!selected) {
            return;
        }
        e.preventDefault();
        isDragging = true;
        document.body.style.cursor = "move";
    });

    var doc = getDoc();

    doc.addEventListener("mousemove", function (e) {
        if (!isDragging) {
            return;
        }
        pan(e.movementX, e.movementY);
    });

    doc.addEventListener("mouseup", function () {
        isDragging = false;
        document.body.style.cursor = "auto";
    });
});

document.addEventListener("mouseup", function () {
    isDragging = false;
    document.body.style.cursor = "auto";
});

let downloadBtn = document.getElementById("downloadBtn");
downloadBtn.addEventListener("click", function () {
    var doc = getDoc();
    if (!doc) {
        return;
    }

    var poster = doc.querySelector(".poster");
    if (!poster) {
        return;
    }

    domtoimage.toPng(poster).then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = "Birthday_Poster.png";
        link.href = dataUrl;
        link.click();
    });
});
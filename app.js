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

nameInput.addEventListener("input", function () {
    if (nameInput.value.length > 20) {
        nameInput.value = nameInput.value.substring(0, 15) + "...";
    }
    currentName = nameInput.value;
    applyName();
});

ageInput.addEventListener("input", function () {
    if(ageInput.value>200){
        return;
    }
    currentAge = ageInput.value;
    applyAge();
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
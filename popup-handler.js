const infoPopup = document.getElementById("info-popup");

function openInfoPopUp(title, txt) {
    infoPopup.children[0].innerHTML = title;
    infoPopup.children[2].innerHTML = txt;
    infoPopup.classList.add("open");
}

function closeInfoPopUp() {
    infoPopup.classList.remove("open");
}

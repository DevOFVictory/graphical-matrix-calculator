// Sign Changer
var customSignFactor = 1;
const signChanger = document.querySelector('.sign-changer');
signChanger.addEventListener('click', () => {
    if (signChanger.classList.contains('positive')) {
        signChanger.classList.remove('positive');
        signChanger.classList.add('negative');
        signChanger.classList.remove('fa-circle-plus');
        signChanger.classList.add('fa-circle-minus');
        customSignFactor = -1;
    }else {
        signChanger.classList.remove('negative');
        signChanger.classList.add('positive');
        signChanger.classList.add('fa-circle-plus');
        signChanger.classList.remove('fa-circle-minus');
        customSignFactor = 1;
    }
});
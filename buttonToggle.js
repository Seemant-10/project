const langArea = document.getElementById('lang-area');
const containerLang = document.getElementById('container-lang');
const languageToggle = document.getElementById('language-toggle');
const closeIcon = document.getElementById('close-icon');

function handleClickOutside(event) {
    if (!langArea.contains(event.target) && event.target != langArea) {
        containerLang.style.display = 'none';
    }
}
languageToggle.addEventListener('click', function (event) {
    event.stopPropagation();
    containerLang.style.display = containerLang.style.display === 'block' ? 'none' : 'block';
});

closeIcon.addEventListener('click', function (event) {
    event.stopPropagation();
    containerLang.style.display = 'none';
});
document.addEventListener('click', handleClickOutside);

// event listener for hamburger
const leftArea = document.querySelector(".left");
const hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", () => {
    if (window.innerWidth <= 1240) {
        if (leftArea.style.left === "-150%") {
            leftArea.style.left = "0";
            leftArea.style.boxShadow = "20px 20px 50px rgb(0, 0, 0)"; 
        } else {
            leftArea.style.left = "-150%";
            leftArea.style.boxShadow = "none"
        }
    }
});
window.addEventListener("resize", () => {
    if (window.innerWidth > 1240) {
        leftArea.style.left = "";
    } else {
        leftArea.style.left = "-100%";
    }
});
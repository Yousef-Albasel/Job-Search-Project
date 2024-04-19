const dropMenuButton = document.querySelector(".header .drop-menu i");
const navigationBar = document.querySelector(".header nav.container ul");

let isMenuOpen = false;

dropMenuButton.addEventListener("click", () => {
    navigationBar.classList.toggle("show-menu"); 
});

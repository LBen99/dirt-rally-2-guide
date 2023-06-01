const btn = document.getElementById("menu-icon");
const menu = document.getElementById("mobile-menu");
const menuLinks = document.getElementById("mobile-links");

btn.addEventListener("click", function() {
    btn.classList.toggle("open");
    btn.classList.toggle("closed");
    menu.classList.toggle("closed");
    menu.classList.toggle("open");
    menuLinks.classList.toggle("closed");
    menuLinks.classList.toggle("open");
});
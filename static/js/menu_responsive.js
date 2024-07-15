"use strict";

let nav = document.querySelector(".menu");
let itemsNav = document.querySelectorAll("li.item-nav");

document.querySelector(".btn-menuResponsive").addEventListener("click", toggleMenu);

function toggleMenu() {
    nav.classList.toggle("show");
    for (let i of itemsNav) {
        i.addEventListener("click", function () {
            nav.classList.remove("show");
        });
    }
}

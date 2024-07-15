"use strict";

let verMas = document.querySelectorAll('.ver-mas');


verMas.forEach((boton) => {
    boton.addEventListener('click', () => {
        let contenido = boton.parentElement.nextElementSibling;
        let arrow = boton.querySelector('.arrow');
        
        contenido.classList.toggle('oculto');
        arrow.classList.toggle('rotate');
    });
});


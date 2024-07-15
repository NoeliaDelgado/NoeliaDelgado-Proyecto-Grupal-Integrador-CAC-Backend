# Proyecto-Grupal-Integrador-CAC


## Comisión 24167- Grupo 22 

### Integrantes:
* Delgado, Noelia  
* Delgado, Silvina  
* Torres, María Ángeles  
* Vielma, Michelle  


## Descripción General del proyecto
Este proyecto consistió en la creación de la página web de una clínica médica que denominamos CAC Medical, la cual fue diseñada de forma tal que el acceso a la información sea agradable práctico y sencillo para el usuario. Para lograr este objetivo se utilizaron los lenguajes HTML, CCS y JavaScript.

## Descripción específica
La web está conformada por 5 páginas:  
1. Inicio (home)  
2. Quienes Somos  
3. Especialidades  
4. Cobertura  
5. Contacto  

Además, contiene un aside que redirige a una 6ta página, la cual contiene un formulario para solicitar turnos.
Cada página cuenta con un archivo individual HTML y, cada uno se encuentra linkeado a una única hoja de estilos (estilo.css), la cual se realizó utilizando el principio de Mobile First. De este modo, el diseño se enfocó en pequeños dispositivos y luego, se aplicaron los cambios necesarios para que el sitio web sea compatible con pantallas más grandes (breakpoints en 480 y 992px), logrando así un diseño responsive.
Por último, se introdujeron flyers, logos e íconos creados por miembros del equipo, así como también imágenes generadas con IA para simular los médicos de la clínica.

## Consideraciones 
Se utilizó el validador https://validator.w3.org, el cual mostró un error en la línea 78 de la página turnos.html lo cual se debe a que la ruta de la imagen está vacía (src=""). Esto está contemplado ya que, en el archivo form.js existe una función a partir de la cual se generan rutas de forma aleatoria para las distintas imágenes del captcha.






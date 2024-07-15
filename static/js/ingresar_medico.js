"use strict"

function guardar() {
    let nombre_ingresado = document.getElementById("nombre").value 
    let foto_ingresada = document.getElementById("foto").value 
    let especialidad_ingresada = document.getElementById("especialidad").value
    let descripcion_ingresada = document.getElementById("descripcion").value 

    let datos = {
        nombre: nombre_ingresado,
        foto: foto_ingresada,
        id_especialidad:especialidad_ingresada,
        descripcion:descripcion_ingresada
    }

    console.log(datos);

    let url = "https://silvinadelgado.pythonanywhere.com/registro";
    //let url = "https://paginadeventas.pythonanywhere.com/registro"
    var options = {
        body: JSON.stringify(datos),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    }
    fetch(url, options)
        .then(function () {
            console.log("creado")
            alert("Creado")
            // Devuelve el href (URL) de la página actual
    
            window.location.href = "/especialidades";
        })
        .catch(err => {
            //this.errored = true
            alert("Error al grabar" )
            console.error(err);
        })
}
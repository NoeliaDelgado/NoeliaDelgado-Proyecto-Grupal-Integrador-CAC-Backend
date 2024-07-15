"use strict"

function modificar() {
    let id = document.getElementById("id").value
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

    let url = "http://localhost:5000/update/" + id;
    // let url = "https://paginadeventas.pythonanywhere.com/update/"+id aca pongo mi url de python anywhere
    
    let options = {
        body: JSON.stringify(datos),
        method: 'PUT',
        
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow'
    }
    fetch(url, options)
        .then(function () {
            console.log("Modificado")
            alert("Registro modificado")
            window.location.href = "/especialidades";
        })
        .catch(err => {
            this.error = true
            console.error(err);
            alert("Error al Modificar")
        })      
}
document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);

    const id = params.get('id');
    const nombre = params.get('nombre');
    const foto = params.get('foto');
    const especialidad = params.get('especialidad');
    const descripcion = params.get('descripcion');

    document.getElementById('id').value = id;
    document.getElementById('nombre').value = nombre;
    document.getElementById('foto').value = foto;
    document.getElementById('especialidad').value = especialidad;
    document.getElementById('descripcion').value = descripcion;


    // Asegúrate de que el campo "id" existe en el formulario
    if (document.getElementById('id')) {
        document.getElementById('id').value = id;
    }
});
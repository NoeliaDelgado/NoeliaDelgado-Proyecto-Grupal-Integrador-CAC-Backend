function eliminar(id) {
    let url ="https://silvinadelgado.pythonanywhere.com/borrar/" + id;     
    var options = {
        method: 'DELETE',
        
    }
    fetch(url, options)
        .then(res => res.text()) // or res.json()
        .then(res => {
            alert("Eliminado correctamente")
            location.reload();
        })
}
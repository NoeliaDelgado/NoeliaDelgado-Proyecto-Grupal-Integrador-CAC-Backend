function eliminar(id) {
    let url ="http://localhost:5000/borrar/" + id;     
   // let url = 'https://paginadeventas.pythonanywhere.com/borrar/'+id;
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
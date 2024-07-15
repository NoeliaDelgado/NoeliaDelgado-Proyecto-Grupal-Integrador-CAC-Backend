document.addEventListener('DOMContentLoaded', function () {
    fetch('/medicos')
        .then(response => response.json())
        .then(data => {
            const especialidadesSelect = document.getElementById('especialidad');
            const medicosTableBody = document.getElementById('medicos-table-body');
            const especialidadesDict = {};

            // Añadir especialidades al select
            if (especialidadesSelect) {
                data.especialidades.forEach(especialidad => {
                    const option = document.createElement('option');
                    option.value = especialidad.id_especialidad;
                    option.textContent = especialidad.especialidad;
                    especialidadesSelect.appendChild(option);
                    especialidadesDict[especialidad.id_especialidad] = especialidad.especialidad;
                });
            }
            if (medicosTableBody) {
                // Añadir médicos a la tabla
                data.medicos.forEach(medico => {
                    const row = document.createElement('tr');
                    // Obtener el nombre de la especialidad usando el diccionario
                    const especialidadNombre = especialidadesDict[medico.id_especialidad];
                    row.innerHTML = `
        <td>${medico.id}</td>
        <td>${medico.nombre}</td>
        <td><img src="${medico.foto}" alt=""></td>
        <td>${especialidadNombre}</td>
        <td>${medico.descripcion}</td>
        <td><a class="boton-modificar" href="/editar_medico?id=${encodeURIComponent(medico.id)}&nombre=${encodeURIComponent(medico.nombre)}&foto=${encodeURIComponent(medico.foto)}&especialidad=${encodeURIComponent(medico.id_especialidad)}&descripcion=${encodeURIComponent(medico.descripcion)}">Editar</a></td>
        <td><button class="boton-borrar" type="button" onclick="eliminar(${medico.id})">Eliminar</button></td>
`;

                    medicosTableBody.appendChild(row);
                });

            }

        });
});


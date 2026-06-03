const BASE_URL_CARRERAS = 'http://localhost:8082/carreras';

function crearCarrera() {
    const carrera = {
        nombre: document.getElementById('nombreCarrera').value,
        ubicacion: document.getElementById('ubicacionCarrera').value,
        fechaEjecucion: document.getElementById('fechaCarrera').value,
        nivelDificultad: parseInt(document.getElementById('dificultadCarrera').value),
        paraQuien: document.getElementById('publicoCarrera').value,
        categoriaId: parseInt(document.getElementById('categoriaCarrera').value)
    };

    fetch(`${BASE_URL_CARRERAS}/crear`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carrera)
    })
    .then(response => {
        if (!response.ok) return manejarError(response);
        return response.json();
    })
    .then(data => mostrarMensajeCarreras('mensajeCarrera', 'Carrera creada exitosamente', 'success'))
    .catch(error => mostrarMensajeCarreras('mensajeCarrera', error.message, 'danger'));
}

function modificarUbicacion() {
    const id = document.getElementById('idCarreraModificar').value;
    const ubicacion = document.getElementById('nuevaUbicacion').value;
    fetch(`${BASE_URL_CARRERAS}/${id}/ubicacion?ubicacion=${encodeURIComponent(ubicacion)}`, { method: 'PATCH' })
    .then(response => {
        if (!response.ok) return manejarError(response);
        return response.json();
    })
    .then(data => mostrarMensajeCarreras('mensajeUbicacion', 'Ubicación modificada', 'success'))
    .catch(error => mostrarMensajeCarreras('mensajeUbicacion', error.message, 'danger'));
}

function modificarFecha() {
    const id = document.getElementById('idCarreraModificar').value;
    const fecha = document.getElementById('nuevaFecha').value;
    fetch(`${BASE_URL_CARRERAS}/${id}/fecha?fecha=${encodeURIComponent(fecha)}`, { method: 'PATCH' })
    .then(response => {
        if (!response.ok) return manejarError(response);
        return response.json();
    })
    .then(data => mostrarMensajeCarreras('mensajeFecha', 'Fecha modificada', 'success'))
    .catch(error => mostrarMensajeCarreras('mensajeFecha', error.message, 'danger'));
}

function consultarCarreraPorId() {
    const id = document.getElementById('idConsultarCarrera').value;
    fetch(`${BASE_URL_CARRERAS}/${id}`)
    .then(response => {
        if (!response.ok) return manejarError(response);
        return response.json();
    })
    .then(data => mostrarTablaCarreras([data], 'resultadoCarreras'))
    .catch(error => mostrarMensajeCarreras('resultadoCarreras', error.message, 'danger'));
}

function consultarAtletasInscritos() {
    const id = document.getElementById('idConsultarInscritos').value;
    fetch(`${BASE_URL_CARRERAS}/${id}/atletas`)
    .then(response => {
        if (!response.ok) return manejarError(response);
        return response.json();
    })
    .then(data => mostrarTablaCarreras(data, 'resultadoInscritos'))
    .catch(error => mostrarMensajeCarreras('resultadoInscritos', error.message, 'danger'));
}

function eliminarCarrera() {
    const id = document.getElementById('idEliminarCarrera').value;
    fetch(`${BASE_URL_CARRERAS}/${id}/eliminar`, { method: 'DELETE' })
    .then(response => {
        if (!response.ok) return manejarError(response);
        mostrarMensajeCarreras('mensajeEliminarCarrera', 'Carrera eliminada', 'success');
    })
    .catch(error => mostrarMensajeCarreras('mensajeEliminarCarrera', error.message, 'danger'));
}

function manejarError(response) {
    return response.text().then(text => {
        try { const err = JSON.parse(text); throw new Error(err.error || JSON.stringify(err)); }
        catch { throw new Error('Error en el servidor'); }
    });
}

function mostrarMensajeCarreras(elementId, mensaje, tipo) {
    document.getElementById(elementId).innerHTML = `<div class="alert alert-${tipo}">${mensaje}</div>`;
}

function mostrarTablaCarreras(carreras, elementId) {
    if (!carreras || carreras.length === 0) {
        mostrarMensajeCarreras(elementId, 'No se encontraron carreras', 'warning');
        return;
    }
    let tabla = `<table class="table table-striped table-bordered"><thead class="table-dark"><tr>
        <th>ID</th><th>Nombre</th><th>Ubicación</th><th>Fecha</th><th>Dificultad</th><th>Para quién</th><th>ID Categoría</th>
    </tr></thead><tbody>`;
    carreras.forEach(c => {
        tabla += `<tr><td>${c.id}</td><td>${c.nombre}</td><td>${c.ubicacion}</td><td>${c.fechaEjecucion}</td><td>${c.nivelDificultad}</td><td>${c.paraQuien}</td><td>${c.categoriaId}</td></tr>`;
    });
    tabla += `</tbody></table>`;
    document.getElementById(elementId).innerHTML = tabla;
}
const BASE_URL ='http://localhost:8083/categoria'
const BASE_URL_CATEGORIAS = 'http://localhost:8083/categorias';

function crearCategoria() {
    const categoria = {
        nombre: document.getElementById('nombreCategoria').value,
        tipo: document.getElementById('tipoCategoria').value,
        descripcion: document.getElementById('descripcionCategoria').value,
        recomendacion: document.getElementById('recomendacionCategoria').value
    };

    fetch(`${BASE_URL_CATEGORIAS}/crear`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoria)
    })
    .then(response => {
        if (!response.ok) return manejarError(response);
        return response.json();
    })
    .then(data => {
        mostrarMensajeCategorias('mensajeCategoria', 'Categoría creada exitosamente', 'success');
        consultarTodasCategorias(); // Refresca la tabla automáticamente
    })
    .catch(error => mostrarMensajeCategorias('mensajeCategoria', error.message, 'danger'));
}

function modificarDescripcion() {
    const id = document.getElementById('idCategoriaModificar').value;
    const descripcion = document.getElementById('nuevaDescripcion').value;
    
    fetch(`${BASE_URL_CATEGORIAS}/${id}/descripcion?descripcion=${encodeURIComponent(descripcion)}`, { method: 'PATCH' })
    .then(response => { if (!response.ok) return manejarError(response); return response.json(); })
    .then(data => { mostrarMensajeCategorias('mensajeModDesc', 'Descripción actualizada', 'success'); consultarTodasCategorias(); })
    .catch(error => mostrarMensajeCategorias('mensajeModDesc', error.message, 'danger'));
}

function modificarRecomendacion() {
    const id = document.getElementById('idCategoriaModificar').value;
    const recomendacion = document.getElementById('nuevaRecomendacion').value;
    
    fetch(`${BASE_URL_CATEGORIAS}/${id}/recomendacion?recomendacion=${encodeURIComponent(recomendacion)}`, { method: 'PATCH' })
    .then(response => { if (!response.ok) return manejarError(response); return response.json(); })
    .then(data => { mostrarMensajeCategorias('mensajeModRec', 'Recomendación actualizada', 'success'); consultarTodasCategorias(); })
    .catch(error => mostrarMensajeCategorias('mensajeModRec', error.message, 'danger'));
}

function consultarTodasCategorias() {
    fetch(`${BASE_URL_CATEGORIAS}/todas`)
    .then(response => { if (!response.ok) return manejarError(response); return response.json(); })
    .then(data => mostrarTablaCategorias(data, 'tablaCategorias'))
    .catch(error => mostrarMensajeCategorias('tablaCategorias', error.message, 'danger'));
}

function eliminarCategoria() {
    const id = document.getElementById('idEliminarCategoria').value;
    fetch(`${BASE_URL_CATEGORIAS}/${id}`, { method: 'DELETE' })
    .then(response => {
        if (!response.ok) return manejarError(response);
        mostrarMensajeCategorias('mensajeEliminarCat', 'Categoría eliminada', 'success');
        consultarTodasCategorias();
    })
    .catch(error => mostrarMensajeCategorias('mensajeEliminarCat', error.message, 'danger'));
}

// Funciones auxiliares
function manejarError(response) {
    return response.text().then(text => {
        try { const err = JSON.parse(text); throw new Error(err.error || JSON.stringify(err)); } 
        catch { throw new Error('Error en el servidor'); }
    });
}

function mostrarMensajeCategorias(elementId, mensaje, tipo) {
    document.getElementById(elementId).innerHTML = `<div class="alert alert-${tipo}">${mensaje}</div>`;
}

function mostrarTablaCategorias(categorias, elementId) {
    if (!categorias || categorias.length === 0) {
        mostrarMensajeCategorias(elementId, 'No hay categorías registradas', 'warning');
        return;
    }
    let tabla = `<table class="table table-striped table-bordered"><thead class="table-dark"><tr>
        <th>ID</th><th>Nombre</th><th>Tipo</th><th>Descripción</th><th>Recomendación</th>
    </tr></thead><tbody>`;
    categorias.forEach(c => {
        tabla += `<tr><td>${c.id}</td><td>${c.nombre}</td><td>${c.tipo}</td><td>${c.descripcion}</td><td>${c.recomendacion}</td></tr>`;
    });
    tabla += `</tbody></table>`;
    document.getElementById(elementId).innerHTML = tabla;
}

// Cargar categorías automáticamente al abrir la página de categorías
window.onload = consultarTodasCategorias;
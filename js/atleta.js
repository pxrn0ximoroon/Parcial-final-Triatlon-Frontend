const BASE_URL = 'http://localhost:8081/atleta';

let enviando = false;

function crearAtleta() {
    if (enviando) return;
    enviando = true;

    const atleta = {
        nombre: document.getElementById('nombre').value,
        identificacion: document.getElementById('identificacion').value,
        email: document.getElementById('email').value,
        edad: parseInt(document.getElementById('edad').value),
        genero: document.getElementById('genero').value,
        especialidad: document.getElementById('especialidad').value,
        modalidadCross: document.getElementById('modalidadCross').checked
    };

    const fotoInput = document.getElementById('foto');
    const file = fotoInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onloadend = function(e) {
            // Se quitó el split(',')[1] porque es mejor manejar el Base64 completo 
            // y así garantizar que la imagen se pueda mostrar después fácilmente.
            atleta.foto = e.target.result; 
            enviarAtleta(atleta);
            enviando = false;
        };
        reader.readAsDataURL(file);
    } else {
        enviarAtleta(atleta);
        enviando = false;
    }
}

function manejarError(response) {
    return response.text().then(text => {
        try {
            const err = JSON.parse(text);
            throw new Error(err.error || JSON.stringify(err));
        } catch {
            throw new Error('Error en el servidor');
        }
    });
}

function enviarAtleta(atleta) {
    fetch(`${BASE_URL}/crear`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(atleta)
    })
    .then(response => {
        if (!response.ok) return manejarError(response);
        return response.json();
    })
    .then(data => {
        mostrarMensaje('mensaje', 'Atleta registrado exitosamente', 'success');
    })
    .catch(error => {
        mostrarMensaje('mensaje', error.message, 'danger');
    });
}

function modificarNombre() {
    const id = document.getElementById('idAtleta').value;
    const nombre = document.getElementById('nuevoNombre').value;
    // CORRECCIÓN: encodeURIComponent para evitar errores con espacios
    fetch(`${BASE_URL}/${id}/nombre?nombre=${encodeURIComponent(nombre)}`, { method: 'PUT' })
    .then(response => {
        if (!response.ok) return manejarError(response);
        return response.json();
    })
    .then(data => {
        mostrarMensaje('mensajeNombre', 'Nombre modificado exitosamente', 'success');
    })
    .catch(error => {
        mostrarMensaje('mensajeNombre', error.message, 'danger');
    });
}

function modificarIdentificacion() {
    const id = document.getElementById('idAtleta').value;
    const identificacion = document.getElementById('nuevaIdentificacion').value;
    fetch(`${BASE_URL}/${id}/identificacion?identificacion=${encodeURIComponent(identificacion)}`, { method: 'PUT' })
    .then(response => {
        if (!response.ok) return manejarError(response);
        return response.json();
    })
    .then(data => {
        mostrarMensaje('mensajeIdentificacion', 'Identificación modificada exitosamente', 'success');
    })
    .catch(error => {
        mostrarMensaje('mensajeIdentificacion', error.message, 'danger');
    });
}

function modificarCategoria() {
    const id = document.getElementById('idAtleta').value;
    const categoria = document.getElementById('nuevaCategoria').value;
    fetch(`${BASE_URL}/${id}/categoria?categoria=${encodeURIComponent(categoria)}`, { method: 'PUT' })
    .then(response => {
        if (!response.ok) return manejarError(response);
        return response.json();
    })
    .then(data => {
        mostrarMensaje('mensajeCategoria', 'Categoría modificada exitosamente', 'success');
    })
    .catch(error => {
        mostrarMensaje('mensajeCategoria', error.message, 'danger');
    });
}

function modificarEspecialidad() {
    const id = document.getElementById('idAtleta').value;
    const especialidad = document.getElementById('nuevaEspecialidad').value;
    fetch(`${BASE_URL}/${id}/especialidad?especialidad=${encodeURIComponent(especialidad)}`, { method: 'PUT' })
    .then(response => {
        if (!response.ok) return manejarError(response);
        return response.json();
    })
    .then(data => {
        mostrarMensaje('mensajeEspecialidad', 'Especialidad modificada exitosamente', 'success');
    })
    .catch(error => {
        mostrarMensaje('mensajeEspecialidad', error.message, 'danger');
    });
}

function modificarCross() {
    const id = document.getElementById('idAtleta').value;
    const modalidadCross = document.getElementById('nuevoCross').checked;
    fetch(`${BASE_URL}/${id}/cross?modalidadCross=${modalidadCross}`, { method: 'PUT' })
    .then(response => {
        if (!response.ok) return manejarError(response);
        return response.json();
    })
    .then(data => {
        mostrarMensaje('mensajeCross', 'Modalidad Cross modificada exitosamente', 'success');
    })
    .catch(error => {
        mostrarMensaje('mensajeCross', error.message, 'danger');
    });
}

function consultarPorIdentificacion() {
    const identificacion = document.getElementById('buscarIdentificacion').value;
    fetch(`${BASE_URL}/identificacion/${encodeURIComponent(identificacion)}`)
    .then(response => {
        if (!response.ok) return manejarError(response);
        return response.json();
    })
    .then(data => {
        mostrarTabla([data], 'resultado');
    })
    .catch(error => {
        mostrarMensaje('resultado', error.message, 'danger');
    });
}

function consultarPorGenero() {
    const genero = document.getElementById('buscarGenero').value;
    fetch(`${BASE_URL}/genero/${encodeURIComponent(genero)}`)
    .then(response => {
        if (!response.ok) return manejarError(response);
        return response.json();
    })
    .then(data => {
        mostrarTabla(data, 'resultado');
    })
    .catch(error => {
        mostrarMensaje('resultado', error.message, 'danger');
    });
}

function consultarPorCategoria() {
    const categoria = document.getElementById('buscarCategoria').value;
    fetch(`${BASE_URL}/categoria/${encodeURIComponent(categoria)}`)
    .then(response => {
        if (!response.ok) return manejarError(response);
        return response.json();
    })
    .then(data => {
        mostrarTabla(data, 'resultado');
    })
    .catch(error => {
        mostrarMensaje('resultado', error.message, 'danger');
    });
}

function consultarPorEspecialidad() {
    const especialidad = document.getElementById('buscarEspecialidad').value;
    fetch(`${BASE_URL}/especialidad/${encodeURIComponent(especialidad)}`)
    .then(response => {
        if (!response.ok) return manejarError(response);
        return response.json();
    })
    .then(data => {
        mostrarTabla(data, 'resultado');
    })
    .catch(error => {
        mostrarMensaje('resultado', error.message, 'danger');
    });
}

function consultarPorCross() {
    const cross = document.getElementById('buscarCross').value;
    fetch(`${BASE_URL}/cross/${encodeURIComponent(cross)}`)
    .then(response => {
        if (!response.ok) return manejarError(response);
        return response.json();
    })
    .then(data => {
        mostrarTabla(data, 'resultado');
    })
    .catch(error => {
        mostrarMensaje('resultado', error.message, 'danger');
    });
}

function eliminarAtleta() {
    const identificacion = document.getElementById('idEliminar').value;
    fetch(`${BASE_URL}/identificacion/${encodeURIComponent(identificacion)}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) return manejarError(response);
        mostrarMensaje('mensaje', 'Atleta eliminado exitosamente', 'success');
    })
    .catch(error => {
        mostrarMensaje('mensaje', error.message, 'danger');
    });
}

function mostrarMensaje(elementId, mensaje, tipo) {
    document.getElementById(elementId).innerHTML = `
        <div class="alert alert-${tipo}">${mensaje}</div>
    `;
}

function mostrarTabla(atletas, elementId) {
    if (!atletas || atletas.length === 0) {
        mostrarMensaje(elementId, 'No se encontraron atletas', 'warning');
        return;
    }

    let tabla = `
        <table class="table table-striped table-hover table-bordered">
            <thead class="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Identificación</th>
                    <th>Email</th>
                    <th>Edad</th>
                    <th>Género</th>
                    <th>Categoría</th>
                    <th>Especialidad</th>
                    <th>Cross</th>
                    <th>Foto</th>
                </tr>
            </thead>
            <tbody>
    `;

    atletas.forEach(atleta => {
        // CORRECCIÓN DE FOTO: Verifica si el BackEnd envía el Base64 con o sin prefijo.
        // Si no viene el prefijo, se lo agrega para que la etiqueta <img> pueda renderizarla.
        let imgSrc = '';
        if (atleta.fotoBase64) {
            if (atleta.fotoBase64.startsWith('data:image')) {
                imgSrc = atleta.fotoBase64;
            } else {
                imgSrc = `data:image/jpeg;base64,${atleta.fotoBase64}`;
            }
        }

        tabla += `
            <tr>
                <td>${atleta.id}</td>
                <td>${atleta.nombre}</td>
                <td>${atleta.identificacion}</td>
                <td>${atleta.email}</td>
                <td>${atleta.edad}</td>
                <td>${atleta.genero}</td>
                <td>${atleta.categoria}</td>
                <td>${atleta.especialidad}</td>
                <td>${atleta.modalidadCross ? 'Sí' : 'No'}</td>
                <td>${imgSrc ? 
                    `<img src="${imgSrc}" class="foto-atleta" style="max-width: 50px; max-height: 50px; border-radius: 5px;">` 
                    : 'Sin foto'}</td>
            </tr>
        `;
    });

    tabla += `</tbody></table>`;
    document.getElementById(elementId).innerHTML = tabla;
}

// Carrusel de especialidad
const carrusel = document.getElementById('carruselEspecialidad');
if (carrusel) {
    carrusel.addEventListener('slid.bs.carousel', function() {
        const activo = carrusel.querySelector('.carousel-item.active');
        const especialidad = activo.dataset.especialidad;
        const nombre = activo.querySelector('h5').textContent;
        document.getElementById('especialidad').value = especialidad;
        document.getElementById('especialidadSeleccionada').textContent = nombre + ' seleccionado';
    });
}
// REGLAS DE VALIDACIÓN (expresiones regulares) 
// El nombre de cada regla es el mismo id del campo en el HTML
const reglas = {
    cedula: {
        regex: /^\d{10}$/,
        mensaje: 'La cédula debe tener exactamente 10 dígitos.'
    },
    apellidos: {
        regex: /^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$/,
        mensaje: 'Los apellidos solo deben contener letras y espacios.'
    },
    nombres: {
        regex: /^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$/,
        mensaje: 'Los nombres solo deben contener letras y espacios.'
    },
    direccion: {
        regex: /^[a-zA-Z0-9ÁÉÍÓÚáéíóúñÑ#.,\- ]{5,100}$/,
        mensaje: 'Ingrese una dirección válida (mínimo 5 caracteres).'
    },
    telefono: {
        regex: /^(09\d{8}|0[2-7]\d{7})$/,
        mensaje: 'Teléfono inválido: celular (09XXXXXXXX) o convencional (0XXXXXXXX).'
    },
    correo: {
        regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        mensaje: 'Ingrese un correo electrónico válido.'
    },
    facultad: {
        regex: /^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$/,
        mensaje: 'La facultad solo debe contener letras y espacios.'
    },
    nivel: {
        regex: /^([1-9]|10)$/,
        mensaje: 'Seleccione un nivel.'
    },
    paralelo: {
        regex: /^[A-F]$/,
        mensaje: 'Seleccione un paralelo.'
    }
};

// Leer los estudiantes guardados en localStorage (están en formato JSON)
const CLAVE_STORAGE = 'registroEstudiantes';
let estudiantes = JSON.parse(localStorage.getItem(CLAVE_STORAGE)) || [];

const formulario = document.getElementById('formulario-estudiante');
const cuerpoTabla = document.getElementById('cuerpo-tabla');

// Prueba el valor del campo con su RegEx y muestra u oculta el mensaje de error
function validarCampo(campo) {
    const valor = document.getElementById(campo).value.trim();
    const spanError = document.getElementById('error-' + campo);

    if (!reglas[campo].regex.test(valor)) {
        spanError.textContent = reglas[campo].mensaje;
        return false;
    }
    spanError.textContent = '';
    return true;
}

//  MOSTRAR LOS ESTUDIANTES EN LA TABLA 
function renderizar() {
    cuerpoTabla.innerHTML = '';

    if (estudiantes.length === 0) {
        cuerpoTabla.innerHTML = '<tr><td colspan="9" style="text-align:center;">No hay estudiantes registrados.</td></tr>';
        return;
    }

    estudiantes.forEach(est => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${est.cedula}</td>
            <td>${est.apellidos}</td>
            <td>${est.nombres}</td>
            <td>${est.direccion}</td>
            <td>${est.telefono}</td>
            <td>${est.correo}</td>
            <td>${est.facultad}</td>
            <td>${est.nivel}</td>
            <td>${est.paralelo}</td>
        `;
        cuerpoTabla.appendChild(fila);
    });
}

//  REGISTRAR UN ESTUDIANTE 
formulario.addEventListener('submit', (evento) => {
    evento.preventDefault(); // Evitar que la página se recargue

    // Validar todos los campos
    let esValido = true;
    Object.keys(reglas).forEach(campo => {
        if (!validarCampo(campo)) esValido = false;
    });
    if (!esValido) return;

    // Armar el objeto del estudiante con los valores de los campos
    const nuevoEstudiante = {};
    Object.keys(reglas).forEach(campo => {
        nuevoEstudiante[campo] = document.getElementById(campo).value.trim();
    });

    // Agregarlo al arreglo y guardar todo en localStorage convertido a JSON
    estudiantes.push(nuevoEstudiante);
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(estudiantes));

    renderizar();
    formulario.reset();
    alert('¡Estudiante registrado correctamente!');
});

//INICIALIZACIÓN 
renderizar();
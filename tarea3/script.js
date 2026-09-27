// Referencias a los elementos del formulario
const form = document.getElementById("form-cliente");

const campoCedula = document.getElementById("cedula");
const campoNombre = document.getElementById("nombre");
const campoDireccion = document.getElementById("direccion");
const campoTelefono = document.getElementById("telefono");
const campoCorreo = document.getElementById("correo");

const errorCedula = document.getElementById("error-cedula");
const errorNombre = document.getElementById("error-nombre");
const errorDireccion = document.getElementById("error-direccion");
const errorTelefono = document.getElementById("error-telefono");
const errorCorreo = document.getElementById("error-correo");

const mensajeExito = document.getElementById("mensaje-exito");
const cuerpoTabla = document.getElementById("cuerpo-tabla");


// Restringir a solo números mientras se escribe (cédula y teléfono)

function permitirSoloNumeros(input) {
    input.addEventListener("input", () => {
        input.value = input.value.replace(/\D/g, ""); // \D = todo lo que NO sea dígito
    });
}
permitirSoloNumeros(campoCedula);
permitirSoloNumeros(campoTelefono);


// Funciones de validación individuales.
// Cada una regresa true/false y muestra u oculta su mensaje de error.


function validarCedula() {
    const valor = campoCedula.value.trim();
    const regex = /^\d{10}$/; // exactamente 10 dígitos
    if (valor === "") {
        return mostrarError(campoCedula, errorCedula, "La cédula es obligatoria.");
    }
    if (!regex.test(valor)) {
        return mostrarError(campoCedula, errorCedula, "La cédula debe tener exactamente 10 dígitos.");
    }
    return ocultarError(campoCedula, errorCedula);
}

function validarNombre() {
    const valor = campoNombre.value.trim();
    // Solo letras (con tildes y ñ) y espacios. Nada de números o símbolos.
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/;
    if (valor === "") {
        return mostrarError(campoNombre, errorNombre, "El nombre es obligatorio.");
    }
    if (valor.length > 30) {
        return mostrarError(campoNombre, errorNombre, "El nombre no puede superar los 30 caracteres.");
    }
    if (!regex.test(valor)) {
        return mostrarError(campoNombre, errorNombre, "El nombre solo puede contener letras y espacios.");
    }
    return ocultarError(campoNombre, errorNombre);
}

function validarDireccion() {
    const valor = campoDireccion.value.trim();
    if (valor === "") {
        return mostrarError(campoDireccion, errorDireccion, "La dirección es obligatoria.");
    }
    if (valor.length > 50) {
        return mostrarError(campoDireccion, errorDireccion, "La dirección no puede superar los 50 caracteres.");
    }
    return ocultarError(campoDireccion, errorDireccion);
}

function validarTelefono() {
    const valor = campoTelefono.value.trim();
    const regex = /^\d{10}$/; // exactamente 10 dígitos
    if (valor === "") {
        return mostrarError(campoTelefono, errorTelefono, "El teléfono es obligatorio.");
    }
    if (!regex.test(valor)) {
        return mostrarError(campoTelefono, errorTelefono, "El teléfono debe tener exactamente 10 dígitos.");
    }
    return ocultarError(campoTelefono, errorTelefono);
}

function validarCorreo() {
    const valor = campoCorreo.value.trim();
    // Patrón básico: texto@texto.dominio
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (valor === "") {
        return mostrarError(campoCorreo, errorCorreo, "El correo electrónico es obligatorio.");
    }
    if (!regex.test(valor)) {
        return mostrarError(campoCorreo, errorCorreo, "Ingrese un correo electrónico válido.");
    }
    return ocultarError(campoCorreo, errorCorreo);
}


// Utilidades para mostrar/ocultar el estado de error de un campo

function mostrarError(input, spanError, mensaje) {
    input.classList.add("campo-invalido");
    spanError.textContent = mensaje;
    return false;
}

function ocultarError(input, spanError) {
    input.classList.remove("campo-invalido");
    spanError.textContent = "";
    return true;
}


// Validación en tiempo real: revisa el campo cuando el usuario sale de él

campoCedula.addEventListener("blur", validarCedula);
campoNombre.addEventListener("blur", validarNombre);
campoDireccion.addEventListener("blur", validarDireccion);
campoTelefono.addEventListener("blur", validarTelefono);
campoCorreo.addEventListener("blur", validarCorreo);


// Envío del formulario

form.addEventListener("submit", (evento) => {
    evento.preventDefault(); // evita que la página se recargue


    // Se ejecutan TODAS las validaciones (sin cortocircuito) para que
    // se muestren todos los errores pendientes a la vez.
    const cedulaValida = validarCedula();
    const nombreValido = validarNombre();
    const direccionValida = validarDireccion();
    const telefonoValido = validarTelefono();
    const correoValido = validarCorreo();

    const formularioValido =
        cedulaValida && nombreValido && direccionValida && telefonoValido && correoValido;

    if (!formularioValido) {
        mensajeExito.style.display = "none";
        return; // detiene el registro si hay algún error
    }

  // Si todo es válido, se agrega el cliente a la tabla
    agregarClienteATabla({
        cedula: campoCedula.value.trim(),
        nombre: campoNombre.value.trim(),
        direccion: campoDireccion.value.trim(),
        telefono: campoTelefono.value.trim(),
        correo: campoCorreo.value.trim(),
    });

    mensajeExito.style.display = "block";
    form.reset();

    // Oculta el mensaje de éxito después de unos segundos
    setTimeout(() => {
        mensajeExito.style.display = "none";
    }, 3000);
});


// Agrega una fila nueva a la tabla de clientes registrados

function agregarClienteATabla(cliente) {
    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td>${cliente.cedula}</td>
        <td>${cliente.nombre}</td>
        <td>${cliente.direccion}</td>
        <td>${cliente.telefono}</td>
        <td>${cliente.correo}</td>
    `;
    cuerpoTabla.appendChild(fila);
}
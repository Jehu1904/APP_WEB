// Referencias a los elementos de la página
const inputNum1 = document.getElementById("num1");
const inputNum2 = document.getElementById("num2");
const btnCalcular = document.getElementById("btnCalcular");
const tabla = document.getElementById("tabla");
const cuerpo = document.getElementById("resultados");
const mensajeError = document.getElementById("error");

btnCalcular.addEventListener("click", ejecutarBucle);

function ejecutarBucle() {
  const a = parseFloat(inputNum1.value);
  const b = parseFloat(inputNum2.value);

  mensajeError.textContent = "";
  cuerpo.innerHTML = "";

  // Validación: ambos campos deben tener un número
  if (isNaN(a) || isNaN(b)) {
    tabla.classList.add("oculto");
    mensajeError.textContent = "Ingresa los 2 números para continuar.";
    return;
  }

  // Bucle de 5 iteraciones
  for (let i = 1; i <= 5; i++) {
    let operacion = "";
    let resultado = "";

    if (i === 1) {
      operacion = `${a} + ${b}`;
      resultado = a + b;
    } else if (i === 2) {
      operacion = `${a} - ${b}`;
      resultado = a - b;
    } else if (i === 3) {
      operacion = `${a} × ${b}`;
      resultado = a * b;
    } else if (i === 4) {
      operacion = `${a} ÷ ${b}`;
      resultado = b === 0 ? "No se puede dividir para 0" : a / b;
    } else if (i === 5) {
      operacion = `${a} % ${b}`;
      resultado = b === 0 ? "No se puede calcular módulo con 0" : a % b;
    }

    const fila = document.createElement("tr");
    fila.innerHTML = `<td>${i}</td><td>${operacion}</td><td>${resultado}</td>`;
    cuerpo.appendChild(fila);
  }

  tabla.classList.remove("oculto");
}
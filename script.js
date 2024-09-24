const timeElement = document.getElementById("time");
const metaAlcanzada = document.getElementById("time");
let fechaActual = new Date();
let limitDate = new Date('01/01/2025');
let tiempoRestante = limitDate - fechaActual;
let tiempoTotal = tiempoRestante;
console.log(tiempoTotal);
const msMes = 2592000000; // Cálculo: (1000 * 60 * 60 * 24 * 30)
const msDia = 86400000;   // Cálculo: (1000 * 60 * 60 * 24)
const msHora = 3600000;   // Cálculo: (1000 * 60 * 60)
const msMinuto = 60000;   // Cálculo: (1000 * 60)
const msSegundo = 1000;   // Mil milisegundos por segundo
let meses;
let dias;
let horas;
let minutos;
let segundos;
tRestante();
timeElement.innerText = meses + " " + dias + " " + horas + " " + minutos + " " + segundos;
arrancarContador();
function arrancarContador() {
    let contador = setInterval(() => {
        if (segundos == 0 && minutos != 0) {
            minutos--;
            segundos = 60;
        } else if ((minutos == 0 && segundos == 0) && horas != 0) {
            horas--;
            minutos = 59;
            segundos = 60;
        } else if ((horas == 0 && minutos == 0 && segundos == 0) && dias != 0) {
            dias--;
            horas = 23;
            minutos = 59;
            segundos = 60;
        } else if ((dias == 0 && horas == 0 && minutos == 0 && segundos == 0) && meses != 0) {
            meses--;
            dias = 29;
            horas = 23;
            minutos = 59;
            segundos = 60;
        } else if(meses <= 0 && dias <= 0 && horas <= 0 && minutos <= 0 && segundos <= 0) {
            clearInterval(contador);
            meses = 0;
            dias = 0;
            horas = 0;
            minutos = 0;
            segundos = 1;
        }
        segundos--;
        timeElement.innerText = meses + " " + dias + " " + horas + " " + minutos + " " + segundos;
    }, 1000)
}

function tRestante() {
    meses = Math.floor(tiempoRestante / msMes);
    tiempoRestante %= msMes;

    dias = Math.floor(tiempoRestante / msDia);
    tiempoRestante %= msDia;

    horas = Math.floor(tiempoRestante / msHora);
    tiempoRestante %= msHora;

    minutos = Math.floor(tiempoRestante / msMinuto);
    tiempoRestante %= msMinuto;

    segundos = Math.floor(tiempoRestante / msSegundo);
}
/*etTimeout(() => {
    clearInterval(contador);
    metaAlcanzada.innerText = "Fecha Alcanzada";
}, tiempoTotal);*/
let inputFecha = document.createElement("input");
inputFecha.setAttribute("id", "name", "type");
inputFecha.type = "date";
inputFecha.id = "datePicker";
inputFecha.name = "datePicker";
document.body.appendChild(inputFecha);

inputFecha.addEventListener("change", () => {
    limitDate = new Date(inputFecha.value);
    console.log(limitDate);
    console.log(fechaActual);
    tiempoRestante = limitDate - fechaActual;
    tiempoTotal = tiempoRestante;
    console.log(tiempoTotal);
    tRestante();
    arrancarContador();
});
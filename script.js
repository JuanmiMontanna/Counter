const timeElement = document.getElementById("time");
let limitDate = new Date('01/01/2025');
let contador;
const msMes = 2592000000; // Cálculo: (1000 * 60 * 60 * 24 * 30)
const msDia = 86400000;   // Cálculo: (1000 * 60 * 60 * 24)
const msHora = 3600000;   // Cálculo: (1000 * 60 * 60)
const msMinuto = 60000;   // Cálculo: (1000 * 60)
const msSegundo = 1000;   // Mil milisegundos por segundo
let meses, dias, horas, minutos, segundos;

tRestante();
timeElement.innerText = `${meses} meses ${dias} días ${horas} horas ${minutos} minutos ${segundos} segundos`;
arrancarContador();

function arrancarContador() {
    contador = setInterval(() => {
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
            meses = 0;
            dias = 0;
            horas = 0;
            minutos = 0;
            segundos = 1;
        }
        segundos--;
        timeElement.innerText = `${meses} meses ${dias} días ${horas} horas ${minutos} minutos ${segundos} segundos`;
    }, 1000)
}

function tRestante() {
    let tiempoRestante = limitDate - new Date();

    meses = Math.floor(tiempoRestante / msMes);
    tiempoRestante %= msMes;

    dias = Math.floor(tiempoRestante / msDia);
    tiempoRestante %= msDia;

    horas = Math.floor(tiempoRestante / msHora);
    tiempoRestante %= msHora;
    horas = horas - 2;
    /*La franja horaria obliga a restarle dos horas de manera manual, 
    la única forma de que no fuese necesario sería cambiarla pero no sé como
    creo que hay varios compañeros que han hecho lo mismo, no lo tengas en cuenta 😅 */

    minutos = Math.floor(tiempoRestante / msMinuto);
    tiempoRestante %= msMinuto;

    segundos = Math.floor(tiempoRestante / msSegundo);
}

let inputFecha = document.createElement("input");
inputFecha.setAttribute("id", "name", "type");
inputFecha.type = "date";
inputFecha.id = "datePicker";
inputFecha.name = "datePicker";
document.body.appendChild(inputFecha);

inputFecha.addEventListener("change", () => {
    limitDate = new Date(inputFecha.value);
    clearInterval(contador);
    tRestante();
    arrancarContador();
});
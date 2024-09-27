const timeElement = document.getElementById("time");
let limitDate = new Date('01/01/2025');
let totalTime;
let counter;
const monthMs = 2592000000; // Calculation: (1000 * 60 * 60 * 24 * 30)
const dayMs = 86400000;   // Calculation: (1000 * 60 * 60 * 24)
const hourMs = 3600000;   // Calculation: (1000 * 60 * 60)
const MinuteMs = 60000;   // Calculation: (1000 * 60)
const SecondMs = 1000;   // One thousand milliseconds per second
let months, days, hours, minutes, seconds;


tRemaining();
updateTimeElement();
startCounter();

function startCounter() {
    counter = setInterval(() => {
        if (seconds == 0 && minutes != 0) {
            minutes--;
            seconds = 60;
        } else if ((minutes == 0 && seconds == 0) && hours != 0) {
            hours--;
            minutes = 59;
            seconds = 60;
        } else if ((hours == 0 && minutes == 0 && seconds == 0) && days != 0) {
            days--;
            hours = 23;
            minutes = 59;
            seconds = 60;
        } else if ((days == 0 && hours == 0 && minutes == 0 && seconds == 0) && months != 0) {
            months--;
            days = 29;
            hours = 23;
            minutes = 59;
            seconds = 60;
        } else if(months <= 0 && days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
            months = 0;
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 1;
        }
        seconds--;
        updateTimeElement();
    }, 1000)
}

function 
tRemaining() {
    let timeRemaining = limitDate - new Date();
    totalTime = timeRemaining;

    months = Math.floor(timeRemaining / monthMs);
    timeRemaining %= monthMs;

    days = Math.floor(timeRemaining / dayMs);
    timeRemaining %= dayMs;

    hours = Math.floor(timeRemaining / hourMs);
    timeRemaining %= hourMs;
    if (hours >= 2) {
        hours = hours - 2;
    } else {
        hours = 0;
    }
    /*The time zone requires two hours to be subtracted manually, 
    the only way to make it not necessary would be to change it but I don't know how.
    I think there are several mates who have done the same, don't take it into account 😅 */

    minutes = Math.floor(timeRemaining / MinuteMs);
    timeRemaining %= MinuteMs;

    seconds = Math.floor(timeRemaining / SecondMs);
}

function updateTimeElement() {
    // Change text color depending of the remaining time
    if (totalTime >= monthMs) { 
        timeElement.style.color = "green";  // More than a month
    } else if (totalTime < dayMs*7) { 
        timeElement.style.color = "red";    // Less than seven days
    } else { 
        timeElement.style.color = "orange"; // More than seven days but less than a month
    }
    totalTime = totalTime - 1000;
    // Update counter text
    timeElement.innerText = `${months} months ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
}

let inputFecha = document.createElement("input");
inputFecha.setAttribute("id", "name", "type");
inputFecha.type = "date";
inputFecha.id = "datePicker";
inputFecha.name = "datePicker";
document.body.appendChild(inputFecha);

inputFecha.addEventListener("change", () => {
    limitDate = new Date(inputFecha.value);
    clearInterval(counter);
    tRemaining();
    startCounter();
});
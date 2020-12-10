import css from "./css/styles.css";

const colors = [
    '#FFFFFF',
    '#2196F3',
    '#4CAF50',
    '#FF9800',
    '#009688',
    '#795548',
  ];

const btnStartRef = document.querySelector('[data-action="start"]')
const btnStopRef = document.querySelector('[data-action="stop"]')
const bodyRef = document.querySelector('body')

btnStartRef.addEventListener('click', changeBackgroundColor)
btnStopRef.addEventListener('click', stopChangeBackgroundColor)

let timer = null

function changeBackgroundColor() {

    if (timer === null) {
        timer = setInterval(()=> {
            bodyRef.style.background = colors[randomIntegerFromInterval(0, colors.length)]
        }, 1000)
    
        btnStartRef.disabled = "true"
    }
} 

function stopChangeBackgroundColor() {
    clearInterval(timer)
    timer = null
    btnStartRef.removeAttribute('disabled')
}

const randomIntegerFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
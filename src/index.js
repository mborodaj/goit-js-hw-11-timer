import css from "./css/styles.css";

const refs = {
  days: document.querySelector('[data-value="days"]'),
  hours: document.querySelector('[data-value="hours"]'),
  mins: document.querySelector('[data-value="mins"]'),
  secs: document.querySelector('[data-value="secs"]'),
  input: document.querySelector('input[type="date"]'),
  startBtn: document.getElementById("startBtn"),
  stopBtn: document.getElementById("stopBtn"),
  inputForm: document.querySelector(".date-input"),
  resetBtn: document.getElementById("resetBtn"),
};

let interval;
let dueDate;

function setTimer(time) {
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  );
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

  return { days, hours, mins, secs };
}

function reset(...arr) {
  return arr.map((el) => (el.textContent = "00"));
}

function pad(value) {
  return String(value).padStart(2, "0");
}

class CountdownTimer {
  constructor(date, refs) {
    this.date = date;
    this.refs = refs;
  }

  count() {
    let count = setTimer(this.date - Date.now());
    this.refs.days.textContent = count.days;
    this.refs.hours.textContent = count.hours;
    this.refs.mins.textContent = count.mins;
    this.refs.secs.textContent = count.secs;
  }

  start() {
    interval = setInterval(() => {
      this.count();
    }, 1000);
  }

  stop() {
    clearInterval(interval);
  }

  reset() {
    clearInterval(interval);
    const { days, hours, mins, secs } = this.refs;
    reset(days, hours, mins, secs);
  }
}

let time;

function createConstructor() {
  dueDate = new Date(refs.inputForm.value);
  time = new CountdownTimer(dueDate, refs);
}

refs.startBtn.addEventListener("click", () => {
  if (refs.inputForm.value !== "") {
    // dueDate = new Date(refs.inputForm.value);
    // time = new CountdownTimer(dueDate, refs);
    createConstructor();
    time.start();
    refs.startBtn.disabled = "true";
    refs.startBtn.classList.add("active-btn");
  } else {
    alert("Please choose due date!");
  }
});

refs.stopBtn.addEventListener("click", () => {
  createConstructor();
  time.stop();
  refs.startBtn.removeAttribute("disabled");
  refs.startBtn.classList.remove("active-btn");
});

refs.resetBtn.addEventListener("click", () => {
  createConstructor();
  time.reset();
  refs.startBtn.removeAttribute("disabled");
  refs.startBtn.classList.remove("active-btn");
});

import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect () {
    // https://codepen.io/abracadabra80/pen/ZEqrjQX

    const digits = document.querySelectorAll(".digits");
    const timeDisplay = document.querySelector(".time");
    const btnStart = document.querySelector("#start");
    const btnReset = document.querySelector("#reset");
    const minuteInput = document.querySelector("#minutes");
    const secondInput = document.querySelector("#seconds");
    const progressRing = document.querySelector(".progress-ring");
    const circle = document.querySelector(".progress-ring__circle");
    const circumference = circle.getTotalLength();

    let timerStatus = "init";
    let totalSeconds = 0;
    let minutesInSeconds = 0;
    let secondsInSeconds = 0;
    let intervalId;

    setTimerValues();

    digits.forEach((digit) => {
      digit.addEventListener("click", function (e) {
        digits.forEach((otherItem) => {
          otherItem.classList.remove("active");
        });
        digit.classList.toggle("active");
      });
      digit.addEventListener("input", (e) => {
        if (isNaN(e.target.value)) {
          e.target.value = "00";
          setTimerValues();
          return;
        }
        const value = e.target.value;
        const newValue = value.slice(-2);
        e.target.value = newValue;
        setTimerValues();
      });
    });

    btnStart.addEventListener("click", function (e) {
      if (
        minutesInSeconds === 0 &&
        secondsInSeconds === 0
      ) {
        return;
      }
      btnReset.removeAttribute("disabled");
      switch (timerStatus) {
        case "init":
          e.target.classList.add("running");
          e.target.textContent = "Пауза";
          timerStatus = "running";
          startTimer();
          break;
        case "running":
          e.target.classList.remove("running");
          e.target.classList.add("paused");
          e.target.textContent = "Продолжить";
          timerStatus = "paused";
          pauseTimer();
          break;
        case "paused":
          e.target.classList.remove("paused");
          e.target.classList.add("running");
          e.target.textContent = "Пауза";
          timerStatus = "running";
          startTimer();
          break;
        default:
          break;
      }
    });

    btnReset.addEventListener("click", function (e) {
      if (e.target.hasAttribute("disabled")) {
        return;
      }
      resetTimer();
      setTimerValues();
    });

    function setTimerValues() {
      minutesInSeconds = 0;
      secondsInSeconds = 0;
      totalSeconds = 0;

      if (minuteInput.value !== "") {
        minutesInSeconds = +minuteInput.value * 60;
      } else {
        minutesInSeconds = 0;
      }

      if (secondInput.value !== "") {
        secondsInSeconds = +secondInput.value;
      } else {
        secondsInSeconds = 0;
      }
      console.log('minutesInSeconds', minutesInSeconds);
      totalSeconds = minutesInSeconds + secondsInSeconds;
    }

    function startTimer() {
      intervalId = setInterval(updateProgress, 1000);
      timeDisplay.classList.add("running");
      setTimeout(() => {
        progressRing.classList.add("active");
      }, 1000);
    }

    function pauseTimer() {
      clearInterval(intervalId);
    }

    function resetTimer() {
      clearInterval(intervalId);
      minuteInput.value = "05";
      secondInput.value = "";
      minutesInSeconds = 0;
      secondsInSeconds = 0;
      totalSeconds = 0;
      timerStatus = "init";
      btnStart.textContent = "Старт";
      btnStart.classList.remove("running");
      btnReset.setAttribute("disabled", true);
      timeDisplay.classList.remove("running");
      progressRing.classList.remove("active");
    }

    function updateProgress() {
      if (totalSeconds === 0) {
        resetTimer();
        setTimerValues();
        const timerWrap = document.querySelector(".timer .wrap")
        timerWrap.classList.add("end");
        setTimeout(() => { timerWrap.classList.remove("end");}, 5000);
      } else {
        totalSeconds--;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds - (minutes * 60);
        let minuteString = minutes.toString().padStart(2, "0");
        let secondString = seconds.toString().padStart(2, "0");
        minuteInput.value = minuteString;
        secondInput.value = secondString;

        const progress =
          totalSeconds / (minutesInSeconds + secondsInSeconds);
        const offset = circumference * (1 - progress);

        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = offset;
      }
    }
  }
}
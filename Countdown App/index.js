let displayBox;
let btns;
let ssBtn;
let interval;
let time = [0, 0, 0, 0, 0, 0];
let timeStr = ["00", "00", "00"];
let ding = new Audio("./stop.wav");

const setDisplay = () => {
  displayBox.innerHTML = `${time[5]}${time[4]} <span>h</span> : ${time[3]}${time[2]} <span>m</span> : ${time[1]}${time[0]} <span>s</span>`;
};

const setTime = () => {
  time[0] = timeStr[0][1];
  time[1] = timeStr[0][0];
  time[2] = timeStr[1][1];
  time[3] = timeStr[1][0];
  time[4] = timeStr[2][1];
  time[5] = timeStr[2][0];

  setDisplay();
};

const toTimeStr = () => {
  timeStr[0] = `${time[1]}${time[0]}`;
  timeStr[1] = `${time[3]}${time[2]}`;
  timeStr[2] = `${time[5]}${time[4]}`;
};

const addTime = (num) => {
  for (let i = 5; i > 0; i--) {
    time[i] = time[i - 1];
  }
  time[0] = num;
  setDisplay();
};

const start = () => {
  btns.forEach((el) => {
    if (el.getAttribute("id") != "btnStart") {
      el.onclick = null;
      el.classList.add("inactive");
      el.classList.remove("active");
      ssBtn.innerText = "stop";
      ssBtn.onclick = stop;
    }
  });

  ding.pause();
  ding.currentTime = 0;

  toTimeStr();
  interval = setInterval(() => {
    if (timeStr[0] > 1) {
      n = timeStr[0] - 1;
      if (n < 10) n = `0${n}`;
      timeStr[0] = `${n}`;
    } else if (timeStr[1] > 0) {
      n = timeStr[1] - 1;
      if (n < 10) n = `0${n}`;

      timeStr[0] = `60`;
      timeStr[1] = `${n}`;
    } else if (timeStr[2] > 0) {
      n = timeStr[2] - 1;
      if (n < 10) n = `0${n}`;

      timeStr[1] = `60`;
      timeStr[2] = `${n}`;

      n = timeStr[1] - 1;
      if (n < 10) n = `0${n}`;

      timeStr[0] = `60`;
      timeStr[1] = `${n}`;
    } else {
      timeStr[0] = `00`;
      stop();
    }
    setTime();
  }, 1000);
};

const stop = () => {
  clearInterval(interval);
  btns.forEach((el, index) => {
    if (el.getAttribute("id") != "btnStart") {
      el.onclick = () => {
        addTime(index);
      };
      el.classList.remove("inactive");
      el.classList.add("active");
      ssBtn.innerText = "start";
      ssBtn.onclick = start;
    }
  });
  if (timeStr[0] == "00" && timeStr[1] == "00" && timeStr[2] == "00")
    ding.play();
  if ("vibrate" in navigator) {
    navigator.vibrate(1000);
  }
};

window.onload = () => {
  displayBox = document.getElementById("display");
  btns = document.querySelectorAll(".btn");
  ssBtn = document.querySelector("#btnStart");
  setDisplay();
};

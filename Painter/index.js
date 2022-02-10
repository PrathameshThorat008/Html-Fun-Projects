let canvas;
let ctx;

function setSize() {
  let width = window.innerWidth;

  if (width > 500) width = 450;
  else width *= 0.9;

  canvas.width = width;
  canvas.height = canvas.width;
}

function getMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}

const start = (e) => {
  var pos = getMousePos(e);

  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
};

const move = (e) => {
  if (!(e.buttons == 1)) return;

  var pos = getMousePos(e);

  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
};

const end = (e) => {
  ctx.closePath();
};

const Tstart = (e) => {
  ctx.beginPath();

  ctx.moveTo(e.touches[0].clientX, e.touches[0].clientY);
};

const Tmove = (e) => {
  ctx.lineTo(e.touches[0].clientX, e.touches[0].clientY);
  ctx.stroke();
};

const Tend = (e) => {
  ctx.closePath();
};

window.onload = () => {
  canvas = document.getElementById("box");
  ctx = canvas.getContext("2d");

  document.getElementById("width").onchange = (e) => {
    ctx.lineWidth = e.target.value;
  };
  document.getElementById("color").onchange = (e) => {
    ctx.strokeStyle = e.target.value;
  };
  document.getElementById("clear").onclick = (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  window.onresize = setSize;

  setSize();

  canvas.addEventListener("mousedown", start);
  canvas.addEventListener("mousemove", move);
  canvas.addEventListener("mouseup", end);

  canvas.addEventListener("touchstart", Tstart);
  canvas.addEventListener("touchmove", Tmove);
  canvas.addEventListener("touchend", Tend);
};

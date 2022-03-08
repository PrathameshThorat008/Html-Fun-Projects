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
  let pos = getMousePos(e.touches[0]);
  ctx.beginPath();

  ctx.moveTo(pos.x, pos.y);
};

const Tmove = (e) => {
  let pos = getMousePos(e.touches[0]);

  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
};

const Tend = (e) => {
  ctx.closePath();
};

const toHex = (val) => {
  let [a, b] = [val[0], val[1]];

  return parseInt(val, 16);
};

window.onload = () => {
  // alert("Best for PC");
  let bg = "#ffffff";
  canvas = document.getElementById("box");
  ctx = canvas.getContext("2d");

  document.getElementById("width").onchange = (e) => {
    ctx.lineWidth = e.target.value;
  };
  document.getElementById("color").onchange = (e) => {
    ctx.strokeStyle = e.target.value;
  };
  document.getElementById("bgcolor").onchange = (e) => {
    bg = e.target.value;
    canvas.style.backgroundColor = bg;
  };
  document.getElementById("clear").onclick = (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  document.getElementById("download").onclick = (e) => {
    let a = document.createElement("canvas");
    a.width = canvas.width;
    a.height = canvas.height;

    let actx = a.getContext("2d");

    actx.fillStyle = bg;
    actx.fillRect(0, 0, a.width, a.height);

    n = ctx.getImageData(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < n.data.length; i += 4) {
      if (n.data[i + 3] > 0) continue;

      n.data[i] = toHex(bg[1] + bg[2]);
      n.data[i + 1] = toHex(bg[3] + bg[4]);
      n.data[i + 2] = toHex(bg[5] + bg[6]);
      n.data[i + 3] = 255;
    }

    actx.putImageData(n, 0, 0);

    actx.canvas.toBlob((blob) => {
      let url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "image.jpg");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, "image/jpeg");
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

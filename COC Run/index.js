let canvas; // canvas variable
let ctx; // convas context variable
let ratio = 16 / 9; // aspect ratio for canvas
let jumpNow = 0;
let isJumping = 0;
let isGameRunning = 2;

// initilizing every object element with empty object
[sky, ground, goblin, obj] = Array(4)
  .fill({})
  .map((e) => (e = {}));

// seting canvas size
function setCanvasSize() {
  let width = (window.innerWidth * 0.9) / ratio;
  width += 10;

  if (width < window.innerHeight) {
    canvas.width = width * ratio + 20;
    canvas.height = canvas.width / ratio;
  } else if (width > window.innerHeight) {
    canvas.height = window.innerHeight * 0.9;
    canvas.width = canvas.height * ratio;
  }

  sky.width = canvas.width;
  sky.height = canvas.height * 0.75;
  sky.top = 0;

  ground.width = canvas.width;
  ground.height = canvas.height * 0.25;
  ground.top = sky.height;

  goblin.height = canvas.height * 0.25;
  goblin.width = goblin.height;
  goblin.top = sky.height - goblin.height;
  goblin.dir = 1;

  obj.height = canvas.height * 0.25;
  obj.width = obj.height;
  obj.top = sky.height - obj.height;
}

// loading images
function loadImages() {
  let objs = [
    "obj/archer.png",
    "obj/barberian.png",
    "obj/giant.png",
    "obj/hogrider.png",
    "obj/pekka.png",
    "obj/vulkery.png",
    "obj/wizard.png",
  ];
  goblin.img = [];
  obj.img = [];

  sky.img = new Image();
  sky.img.src = "./jungle.jpg";

  for (let i = 0; i < objs.length; i++) {
    obj.img[i] = new Image();
    obj.img[i].src = objs[i];
  }

  goblin.img[0] = new Image();
  goblin.img[0].src = "./goblinLeft.png";

  goblin.img[1] = new Image();
  goblin.img[1].src = "./goblinRight.png";
}

// rendering background of canvas
function drawBgc() {
  ctx.drawImage(sky.img, 0, sky.top, sky.width, sky.height);
  ctx.fillStyle = "#e0a96d";
  ctx.fillRect(0, ground.top, ground.width, ground.height);
}

// jumping for goblin
function jumpgoblin() {
  isJumping = 1;
  let step = canvas.height * 0.005;
  let maxTop = obj.height - 50;

  if (goblin.top > sky.height - goblin.height) {
    jumpNow = -1;
  }
  if (goblin.top <= maxTop) jumpNow = 1;

  if (jumpNow == 1) step = Math.abs(step);
  if (jumpNow == -1) step *= -1;

  if (goblin.top >= sky.height - goblin.height && jumpNow == 1) {
    goblin.top = sky.height - goblin.height;
    isJumping = 0;
    jumpNow = 0;
    return;
  }

  if (jumpNow != 2) {
    goblin.top += step;

    window.requestAnimationFrame(jumpgoblin);
  }
}

// get random
function random(a, b) {
  return Math.floor(Math.random() * (b - a)) + a;
}

// rendering obstacle
function drawObstacle() {
  let step = canvas.width * 0.003;

  if (obj.left < -obj.width - 100) {
    obj.curr = random(0, 6);
    obj.left = sky.width;
  }

  ctx.drawImage(obj.img[obj.curr], obj.left, obj.top, obj.width, obj.height);

  obj.left -= step;
}

function isGameOver() {
  let is = 1;
  let x = Math.abs(goblin.left - obj.left);
  let y = Math.abs(goblin.top - obj.top);

  if (x < goblin.width - 30 && y < obj.height - 30) is = 0;

  return is;
}

// game loops
function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (isGameRunning == 1) {
    drawBgc();

    if (goblin.left < 0) goblin.left = 0;
    else if (goblin.left > sky.width - goblin.width)
      goblin.left = sky.width - goblin.width;

    ctx.drawImage(
      goblin.img[goblin.dir],
      goblin.left,
      goblin.top,
      goblin.width,
      goblin.height
    );

    drawObstacle();

    if (!isGameOver()) isGameRunning = 0;
  } else if (isGameRunning == 0) {
    isGameRunning = 0;

    ctx.fillStyle = "#e0a96d";
    let w = canvas.width * 0.75;
    let h = canvas.width * 0.25;
    ctx.fillRect(canvas.width / 2 - w / 2, canvas.height / 2 - h / 2, w, h);

    ctx.textAlign = "center";
    ctx.font = `${w / 10}px Arial`;
    ctx.fillStyle = "#000";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 + h / 16, w);
    ctx.font = `${w / 30}px Arial`;
    ctx.fillText(
      "click board to restart",
      canvas.width / 2,
      canvas.height / 2 + h / 3,
      w
    );
  } else {
    ctx.fillStyle = "#e0a96d";
    let w = canvas.width * 0.75;
    let h = canvas.width * 0.25;
    ctx.fillRect(canvas.width / 2 - w / 2, canvas.height / 2 - h / 2, w, h);

    ctx.textAlign = "center";
    ctx.fillStyle = "#000";
    ctx.font = `${w / 15}px Arial`;
    ctx.fillText(
      "click board to start",
      canvas.width / 2,
      canvas.height / 2 + h / 16,
      w
    );
  }

  window.requestAnimationFrame(loop);
}

// starting loop
function start(x) {
  if (x == 1) {
    obj.curr = random(0, 6);
    loop();
  }
  return;
}

// initial work
window.onload = () => {
  alert("Best for PC\nMobile version in under construction");
  canvas = document.getElementById("game_board");
  ctx = canvas.getContext("2d");

  setCanvasSize();

  loadImages();
  let isLoaded = 3 + obj.img.length;

  goblin.left = sky.width / 4;
  obj.left = sky.width;

  // update canvas size after resize window
  window.onresize = setCanvasSize;

  sky.img.onload = () => start(isLoaded--);

  for (let i = 0; i < obj.img.length; i++) {
    obj.img[i].onload = () => start(isLoaded--);
  }

  goblin.img[0].onload = () => start(isLoaded--);
  goblin.img[1].onload = () => start(isLoaded--);

  window.onkeydown = (e) => {
    if (isGameRunning != 0) {
      let step = sky.width * 0.03;

      if (e.keyCode == 39) {
        goblin.dir = 1;
        goblin.left += step;
      } else if (e.keyCode == 37) {
        goblin.dir = 0;
        goblin.left -= step;
      } else if (e.keyCode == 38 && !isJumping) jumpgoblin();
    }
  };

  canvas.onclick = () => {
    goblin.left = sky.width / 4;
    obj.left = sky.width;
    if (isGameRunning == 0) isGameRunning = 1;
    if (isGameRunning == 2) isGameRunning = 1;
  };
};

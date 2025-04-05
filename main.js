const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let player = { x: 300, y: 200, size: 10, speed: 3 };
let keys = {};
let bullets = [];

canvas.addEventListener("click", (e) => {
  const angle = Math.atan2(e.offsetY - player.y, e.offsetX - player.x);
  bullets.push({
    x: player.x,
    y: player.y,
    dx: Math.cos(angle) * 5,
    dy: Math.sin(angle) * 5
  });
});

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function movePlayer() {
  if (keys['w']) player.y -= player.speed;
  if (keys['s']) player.y += player.speed;
  if (keys['a']) player.x -= player.speed;
  if (keys['d']) player.x += player.speed;
}

function update() {
  movePlayer();
  bullets.forEach(b => {
    b.x += b.dx;
    b.y += b.dy;
    // 塗り処理
    ctx.fillStyle = "#66f";
    ctx.fillRect(b.x - 2, b.y - 2, 4, 4);
  });
}

function draw() {
  ctx.fillStyle = "#ddd";
  ctx.fillRect(0, 0, canvas.width, canvas.height); // 背景（白）

  // 先に地面は塗られる（update内で）

  // プレイヤー
  ctx.fillStyle = "#00f";
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
  ctx.fill();
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();


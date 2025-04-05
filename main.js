const SIZE = 8;
const BOMBS = 10;
const game = document.getElementById("game");

let grid = [];
let bombSet = new Set();

function createGrid() {
  for (let y = 0; y < SIZE; y++) {
    grid[y] = [];
    for (let x = 0; x < SIZE; x++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.x = x;
      cell.dataset.y = y;
      game.appendChild(cell);
      grid[y][x] = { el: cell, opened: false, flagged: false, bomb: false, count: 0 };
    }
  }
}

function placeBombs() {
  while (bombSet.size < BOMBS) {
    const x = Math.floor(Math.random() * SIZE);
    const y = Math.floor(Math.random() * SIZE);
    const key = `${x},${y}`;
    if (!bombSet.has(key)) {
      bombSet.add(key);
      grid[y][x].bomb = true;
    }
  }
}

function countBombs() {
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      if (grid[y][x].bomb) continue;
      let count = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (grid[ny]?.[nx]?.bomb) count++;
        }
      }
      grid[y][x].count = count;
    }
  }
}

function openCell(x, y) {
  const cell = grid[y][x];
  if (cell.opened || cell.flagged) return;
  cell.opened = true;
  cell.el.classList.add("open");
  if (cell.bomb) {
    cell.el.textContent = "💣";
    alert("ゲームオーバー！");
    revealAll();
    return;
  }
  if (cell.count > 0) {
    cell.el.textContent = cell.count;
  } else {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx;
        const ny = y + dy;
        if (grid[ny]?.[nx]) openCell(nx, ny);
      }
    }
  }
}

function revealAll() {
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const cell = grid[y][x];
      if (cell.bomb) {
        cell.el.textContent = "💣";
        cell.el.classList.add("open");
      }
    }
  }
}

function toggleFlag(x, y) {
  const cell = grid[y][x];
  if (cell.opened) return;
  cell.flagged = !cell.flagged;
  cell.el.classList.toggle("flag");
  cell.el.textContent = cell.flagged ? "🚩" : "";
}

function addEventListeners() {
  game.addEventListener("contextmenu", e => e.preventDefault());
  game.addEventListener("click", e => {
    const x = +e.target.dataset.x;
    const y = +e.target.dataset.y;
    openCell(x, y);
  });
  game.addEventListener("contextmenu", e => {
    const x = +e.target.dataset.x;
    const y = +e.target.dataset.y;
    toggleFlag(x, y);
  });
}

createGrid();
placeBombs();
countBombs();
addEventListeners();


const mapData = [
  ['草', '草', '草', '村', '草'],
  ['草', '敵', '草', '草', '草'],
  ['草', '草', '主', '草', '草'],
  ['草', '草', '草', '草', '草'],
  ['草', '草', '草', '草', '草']
];

let playerX = 2;
let playerY = 2;

const mapEl = document.getElementById('map');
const messageEl = document.getElementById('message-box');

function renderMap() {
  mapEl.innerHTML = '';
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      const div = document.createElement('div');
      div.className = 'tile';

      if (x === playerX && y === playerY) {
        div.textContent = '＠'; // プレイヤー
      } else {
        const cell = mapData[y][x];
        div.textContent = cell === '草' ? '🌿' : cell === '村' ? '🏘️' : cell === '敵' ? '👾' : ' ';
      }

      mapEl.appendChild(div);
    }
  }
}

function showMessage(text) {
  messageEl.textContent = text;
}

document.addEventListener('keydown', (e) => {
  const key = e.key;

  if (key === 'ArrowUp' && playerY > 0) playerY--;
  if (key === 'ArrowDown' && playerY < 4) playerY++;
  if (key === 'ArrowLeft' && playerX > 0) playerX--;
  if (key === 'ArrowRight' && playerX < 4) playerX++;

  if (key === ' ') {
    const around = [
      [playerX, playerY - 1],
      [playerX, playerY + 1],
      [playerX - 1, playerY],
      [playerX + 1, playerY]
    ];

    let talked = false;

    for (const [x, y] of around) {
      if (mapData[y]?.[x] === '村') {
        showMessage("村人『こんにちは、旅の人！』");
        talked = true;
        break;
      } else if (mapData[y]?.[x] === '敵') {
        showMessage("スライムが現れた！(戦闘は未実装)");
        talked = true;
        break;
      }
    }

    if (!talked) showMessage('誰もいない…');
  }

  renderMap();
});

renderMap();


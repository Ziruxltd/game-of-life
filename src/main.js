// 1. Initialize the board
const canvas = document.getElementById('canvas');
const start_button = document.getElementById('start-btn');
const stop_button = document.getElementById('stop-btn');
const erase_button = document.getElementById('erase-btn');
const paint_button = document.getElementById('paint-btn');
const plus_button = document.getElementById('plus-btn');
const minus_button = document.getElementById('minus-btn');
const restart_button = document.getElementById('restart-btn');
const paint_size = document.getElementById('paint-size');
paint_size.innerText = 1;
const context = canvas.getContext('2d');

const BLOCK_SIZE = 6;
const BOARD_WIDTH = 100;
const BOARD_HEIGHT = 100;

const updateInterval = 42;
let gameStarted = false;
let generation = 0;
let painting = false;
let erase = false;
let paintSize = 1;

canvas.width = BOARD_WIDTH * BLOCK_SIZE;
canvas.height = BOARD_HEIGHT * BLOCK_SIZE;

function createInitBoard() {
  let board = [];
  for (let i = 0; i < BOARD_HEIGHT; i++) {
    board[i] = [];
    for (let j = 0; j < BOARD_WIDTH; j++) {
      board[i][j] = 0;
    }
  }
  return board;
}

let board = createInitBoard();

context.scale(BLOCK_SIZE, BLOCK_SIZE);

// 2. Game loop

function update() {
  if (!gameStarted) return;
  board = nextGeneration(board);
  draw();
  updateGeneration();
}

function updateGeneration() {
  generation++;
  document.getElementById('generation').innerText = generation;
}

function draw() {
  context.fillStyle = '#dad7cd';
  context.fillRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);

  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        context.fillStyle = 'black';
        context.fillRect(x, y, 1, 1);
      }
    });
  });
}

start_button.addEventListener('click', () => {
  start_button.style.display = 'none';
  stop_button.style.display = 'block';
  restart_button.setAttribute('disabled', 'true');
  gameStarted = true;
  setInterval(update, updateInterval);
});

stop_button.addEventListener('click', () => {
  start_button.style.display = 'block';
  stop_button.style.display = 'none';
  restart_button.removeAttribute('disabled', 'false');
  gameStarted = false;
});

canvas.addEventListener('mousedown', (event) => {
  if (!gameStarted) painting = true;
  handleDrawInCanvas(event);
});
canvas.addEventListener('mouseup', () => {
  painting = false;
});
canvas.addEventListener('mousemove', handleDrawInCanvas);

erase_button.addEventListener('click', () => {
  erase = true;
  erase_button.setAttribute('activated', 'true');
  paint_button.removeAttribute('activated', 'false');
});

paint_button.addEventListener('click', () => {
  erase = false;
  erase_button.removeAttribute('activated', 'false');
  paint_button.setAttribute('activated', 'true');
});

plus_button.addEventListener('click', () => {
  if (paintSize < 4) paintSize++;
  paint_size.innerText = paintSize;
});

minus_button.addEventListener('click', () => {
  if (paintSize > 1) paintSize--;
  paint_size.innerText = paintSize;
});

restart_button.addEventListener('click', () => {
  if (gameStarted) return;
  board = createInitBoard();
  generation = 0;
  draw();
  document.getElementById('generation').innerText = generation;
});

function handleDrawInCanvas(event) {
  if (!painting) return;
  const x = Math.floor(event.offsetX / BLOCK_SIZE);
  const y = Math.floor(event.offsetY / BLOCK_SIZE);

  // Adjust the loops to correctly handle the size
  for (let i = 0; i < paintSize; i++) {
    for (let j = 0; j < paintSize; j++) {
      const row = (y + i + BOARD_HEIGHT) % BOARD_HEIGHT;
      const col = (x + j + BOARD_WIDTH) % BOARD_WIDTH;
      board[row][col] = erase ? 0 : 1;
    }
  }

  draw();
}

// 3. Game logic
// 1. Any live cell with fewer than two live neighbors dies, as if by underpopulation.
// 2. Any live cell with two or three live neighbors lives on to the next generation.
// 3. Any live cell with more than three live neighbors dies, as if by overpopulation.
// 4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

function nextGeneration(board) {
  const newBoard = createInitBoard();

  for (let y = 0; y < BOARD_HEIGHT; y++) {
    for (let x = 0; x < BOARD_WIDTH; x++) {
      const neighbors = countNeighbors(board, x, y);

      if (board[y][x] === 1) {
        if (neighbors < 2 || neighbors > 3) {
          newBoard[y][x] = 0;
        } else {
          newBoard[y][x] = 1;
        }
      } else {
        if (neighbors === 3) {
          newBoard[y][x] = 1;
        }
      }
    }
  }

  return newBoard;
}

function countNeighbors(board, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      const row = (y + i + BOARD_HEIGHT) % BOARD_HEIGHT;
      const col = (x + j + BOARD_WIDTH) % BOARD_WIDTH;
      sum += board[row][col];
    }
  }
  sum -= board[y][x];
  return sum;
}

draw();
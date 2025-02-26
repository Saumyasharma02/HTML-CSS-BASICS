const board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const gameBoard = document.getElementById("game-board");
const statusDisplay = document.getElementById("status");
const resetButton = document.getElementById("reset-button");

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Function to handle cell click
function handleCellClick(event) {
  const cell = event.target;
  const cellIndex = cell.getAttribute("data-index");

  if (board[cellIndex] !== "" || !gameActive) return;

  board[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  if (checkWinner()) {
    statusDisplay.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (board.every(cell => cell !== "")) {
    statusDisplay.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

// Function to check for a winner
function checkWinner() {
  return winningCombinations.some(combination => {
    return combination.every(index => board[index] === currentPlayer);
  });
}

// Function to reset the game
function resetGame() {
  board.fill("");
  currentPlayer = "X";
  gameActive = true;
  statusDisplay.textContent = "Player X's turn";

  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
}

// Add event listeners to cells
gameBoard.addEventListener("click", handleCellClick);

// Add event listener to reset button
resetButton.addEventListener("click", resetGame);

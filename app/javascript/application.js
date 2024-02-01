// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails";
import "controllers";

var cells1 = [];
var cells2 = [];
// Render the board initially
// renderBoard();
var player1 = document.getElementById("player1").value;
var player2 = document.getElementById("player2").value;
var board1;
var board2;

var the_win = "";

// Handle "New Game" button click
document.getElementById("new-game-button").addEventListener("click", () => {
  resetGame();
});

function resetGame() {
  // Reset game state on the server (replace with your logic)
  resetGameState();
}

// Example of resetting game state on the server (replace with your implementation)
function resetGameState() {
  // Make an AJAX request to your Rails controller to reset the game state
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.backgroundColor = "white";
    cells1 = [];
    cells2 = [];
    board1 = "";
    board2 = "";
    the_win = "";
    currentPlayer = "X";
  });
}
function save_game() {
  if (board2 == undefined) {
    board2 = cells2.sort().join("");
  }
  const currentPlayer = player1 + "vs" + player2;
  const board = "X:" + board1 + ",O:" + board2;
  const winner = the_win; /* Get the winner (optional) */
  const payload = JSON.stringify({
    current_player: currentPlayer,
    board: board,
    winner: winner,
  });
  console.log(payload);
  fetch("/save_game", {
    method: "POST", // Indicate POST method
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content,
    }, // Send data as JSON
    body: payload,
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle response (e.g., display confirmation message or update UI)
      console.log("Game saved successfully:", data);
    })
    .catch((error) => {
      // Handle errors gracefully
      console.error("Error saving game:", error);
    });
}
function checkWin(cells) {
  // Define winning combinations
  const winningCombinations = [
    "012",
    "345",
    "678", // Rows
    "036",
    "147",
    "258", // Columns
    "048",
    "246", // Diagonals
  ];

  // Sort the cells and join them into a string
  const sortedCells = cells.sort().join("");

  // Check if the sortedCells match any winning combination
  return winningCombinations.some((combination) =>
    new RegExp(`^${combination}$`).test(sortedCells),
  );
}
function checkWinner(arrayID, player) {
  let board = arrayID.sort().join("");
  let is_winner = checkWin(arrayID);
  if (player === "X") {
    board1 = board;

    if (is_winner) {
      the_win = player1;
    }
  } else {
    board2 = board;
    if (is_winner) {
      the_win = player2;
    }
  }
  if (the_win != "") {
    alert("the winner is " + the_win);
    save_game();
  }
}

const cells = document.querySelectorAll(".cell");
let currentPlayer = "X"; // Start with player 1

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (the_win !== "") {
      return;
    }
    if (cell.textContent === "") {
      const cellId = cell.getAttribute("data-cell-id"); // Get the cell ID
      console.log("Clicked cell ID:", cellId); // Log the ID for testing
      cell.textContent = currentPlayer;
      cell.style.backgroundColor =
        currentPlayer === "X" ? "lightblue" : "lightgreen";
      currentPlayer === "X" ? cells1.push(cellId) : cells2.push(cellId);

      // Update game logic here (e.g., check for win conditions)

      if (cells1.length >= 3) {
        checkWinner(cells1, currentPlayer);
      }
      if (cells2.length >= 3) {
        checkWinner(cells2, currentPlayer);
      }
      currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch players
    }
  });
});

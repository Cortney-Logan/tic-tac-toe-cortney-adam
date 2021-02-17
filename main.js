
let start = document.getElementById("start");
let playerStatus = document.getElementById("playerStatus");
let cells = document.getElementsByClassName("cell");
let currentPlayer = "X";

start.addEventListener("click", () => {
  start.disabled = true;

  playerStatus.textContent = "Player X's Turn";
});

for (let elements of cells) {
  elements.addEventListener("click", (event) => {

    if (event.target.textContent === ""){
    if (currentPlayer === "X") {
      event.target.textContent = "X";
      playerStatus.textContent = "Player O's Turn";
      currentPlayer = "O";
    } else {
      event.target.textContent = "O";
      playerStatus.textContent = "Player X's Turn";
      currentPlayer = "X";
    }
} else alert("Please select an empty cell.")

  });
}

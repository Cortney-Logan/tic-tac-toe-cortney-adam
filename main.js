// declare js variable targeting start button in game
let start = document.getElementById("start");
// declare js variable targeting playerstatus area in game
let playerStatus = document.getElementById("playerStatus");
// declare js HTML collection targeting collection of game cells in game
let cells = document.getElementsByClassName("cell");
// declare variable to keep track of current player
let currentPlayer = "X";

//adds event listener to start button - when clicked the button is disabled and player status shows "player x's turn"
start.addEventListener("click", () => {
  start.disabled = true;
  playerStatus.textContent = "Player X's Turn";
});

//adds event listener to each cell
for (let elements of cells) {
  // when clicked the textContent of the cell will change to X or O depending on the currentPlayer.  The current player is then changed
  elements.addEventListener("click", (event) => {
    //guard clause to prevent a previously clicked cell from being clicked again. If it has already been clicked the player is alerted to pick an empty cell
    if (event.target.textContent === "") {
      if (currentPlayer === "X") {
        event.target.textContent = "X";
        playerStatus.textContent = "Player O's Turn";
        currentPlayer = "O";
      } else {
        event.target.textContent = "O";
        playerStatus.textContent = "Player X's Turn";
        currentPlayer = "X";
      }
    } else alert("Please select an empty cell.");
  });
}

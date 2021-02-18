// declare js variable targeting start button in game
let start = document.getElementById("start");
// declare js variable targeting playerstatus area in game
let playerStatus = document.getElementById("playerStatus");
// declare js HTML collection targeting collection of game cells in game
let cells = Array.from(document.getElementsByClassName("cell"));
// declare variable to keep track of current player
let currentPlayer = "X";
console.log(cells);

//adds event listener to start button - when clicked the button is disabled and player status shows "player x's turn"
start.addEventListener("click", () => {
  start.disabled = true;
  playerStatus.textContent = "Player X's Turn";
});
//adds event listener to each cell
for (let elements of cells) {
  // when clicked the textContent of the cell will change to X or O depending on the currentPlayer.  The current player is then changed
  elements.addEventListener("click", (event) => {
    //guard clause to prevent a previously clicked cell from being clicked again. If it has already been clicked the player is alerted to pick an empty cell.  Otherwise it marks the cell appropriately
    if (event.target.textContent === "") {
      if (currentPlayer === "X") {
        event.target.textContent = "X";
      } else {
        event.target.textContent = "O";
      }
    } else alert("Please select an empty cell.");

    //check for win condition by calling win() function
    //if win returns true, the current player is declared the winner & the start button is re-enabled
    if (win()) {
      playerStatus.textContent = `Player ${currentPlayer} Won`;
      start.disabled = false;
      cells.children.textContent = "";
    }
    // if there's no win it changes the current player changes and game alerts that it is the next player's turn
    else {
      if (currentPlayer === "X") {
        currentPlayer = "O";
      } else {
        currentPlayer = "X";
      }
      playerStatus.textContent = `Player ${currentPlayer}'s Turn`;
    }
  });
}

//checks for win condition - if a condition is met it returns true, otherwise is undefined (which evaluates to false)
function win() {
  if (
    cells[0].textContent === cells[3].textContent &&
    cells[3].textContent === cells[6].textContent &&
    cells[0].textContent !== ""
  ) {
    cells[0].style.textDecoration = "line-through";
    return true;
  } else if (
    cells[1].textContent === cells[4].textContent &&
    cells[4].textContent === cells[7].textContent &&
    cells[1].textContent !== ""
  ) {
    cells[1].style.textDecoration = "line-through";
    return true;
  } else if (
    cells[2].textContent === cells[5].textContent &&
    cells[5].textContent === cells[8].textContent &&
    cells[2].textContent !== ""
  ) {
    cells[2].style.textDecoration = "line-through";
    return true;
  } else if (
    cells[0].textContent === cells[1].textContent &&
    cells[1].textContent === cells[2].textContent &&
    cells[0].textContent !== ""
  ) {
    cells[0].style.textDecoration = "line-through";
    return true;
  } else if (
    cells[3].textContent === cells[4].textContent &&
    cells[4].textContent === cells[5].textContent &&
    cells[3].textContent !== ""
  ) {
    cells[3].style.textDecoration = "line-through";
    return true;
  } else if (
    cells[6].textContent === cells[7].textContent &&
    cells[7].textContent === cells[8].textContent &&
    cells[6].textContent !== ""
  ) {
    cells[6].style.textDecoration = "line-through";
    return true;
  } else if (
    cells[0].textContent === cells[4].textContent &&
    cells[4].textContent === cells[8].textContent &&
    cells[0].textContent !== ""
  ) {
    cells[0].style.textDecoration = "line-through";
    return true;
  } else if (
    cells[2].textContent === cells[4].textContent &&
    cells[4].textContent === cells[6].textContent &&
    cells[2].textContent !== ""
  ) {
    cells[2].style.textDecoration = "line-through";
    return true;
  }
}

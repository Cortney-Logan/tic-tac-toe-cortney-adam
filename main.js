// declare js variable targeting start button in game
let start = document.getElementById("start");
// declare js variable targeting playerstatus area in game
let playerStatus = document.getElementById("playerStatus");
// declare js HTML collection targeting collection of game cells in game
let cells = Array.from(document.getElementsByClassName("cell"));
// declare variable to keep track of current player
let currentPlayer = "X";

//adds event listener to start button - when clicked the button is disabled and game play can begin
start.addEventListener("click", () => {
  //disables start button
  start.disabled = true;
  // player status shows "player x's turn"
  playerStatus.textContent = "Player X's Turn";
  //runs through each cell
  for (let elements of cells) {
    //clear the board for a new game
    elements.textContent = "";
    elements.style.textDecoration = "none";
    //adds event listener to each cell to allow for game play
    elements.addEventListener("click", playGame);
  }
});

function playGame(event) {
  //guard clause to prevent a previously clicked cell from being clicked again. If it has already been clicked the player is alerted to pick an empty cell.  Otherwise it marks the cell appropriately
  if (event.target.textContent === "") {
    // when the textContent of the cell will change to X or O depending on the currentPlayer.  The current player is then changed
    if (currentPlayer === "X") {
      event.target.textContent = "X";
    } else {
      event.target.textContent = "O";
    }
  } else alert("Please select an empty cell.");

  //check for win condition by calling win() function
  //if win returns true, the current player is declared the winner, the start button is re-enabled and playGame click listener is removed from all cells
  if (win()) {
    playerStatus.textContent = `Player ${currentPlayer} Won`;
    start.disabled = false;
    for (let elements of cells) {
      elements.removeEventListener("click", playGame);
    }
  }
  // else if (tie()) {
  //   playerStatus.textContent = `Draw`;
  //   start.disabled = false;
  // }
  // if there's no win it changes the current player changes and game alerts that it is the next player's turn
  else {
    if (currentPlayer === "X") {
      currentPlayer = "O";
    } else {
      currentPlayer = "X";
    }
    playerStatus.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

//checks for win condition - if a condition is met it returns true, otherwise is undefined (which evaluates to false)
function win() {
  //checks win condition for column 1
  if (
    cells[0].textContent === cells[3].textContent &&
    cells[3].textContent === cells[6].textContent &&
    cells[0].textContent !== ""
  ) {
    cells[0].style.textDecoration = "line-through";
    return true;
  }
  //checks win condition for column 2
  else if (
    cells[1].textContent === cells[4].textContent &&
    cells[4].textContent === cells[7].textContent &&
    cells[1].textContent !== ""
  ) {
    cells[1].style.textDecoration = "line-through";
    return true;
  }
  //checks win condition for column 3
  else if (
    cells[2].textContent === cells[5].textContent &&
    cells[5].textContent === cells[8].textContent &&
    cells[2].textContent !== ""
  ) {
    cells[2].style.textDecoration = "line-through";
    return true;
  }
  //checks win condition for row 1
  else if (
    cells[0].textContent === cells[1].textContent &&
    cells[1].textContent === cells[2].textContent &&
    cells[0].textContent !== ""
  ) {
    cells[0].style.textDecoration = "line-through";
    return true;
  }
  //checks win condition for row 2
  else if (
    cells[3].textContent === cells[4].textContent &&
    cells[4].textContent === cells[5].textContent &&
    cells[3].textContent !== ""
  ) {
    cells[3].style.textDecoration = "line-through";
    return true;
  }
  //checks win condition for row 3
  else if (
    cells[6].textContent === cells[7].textContent &&
    cells[7].textContent === cells[8].textContent &&
    cells[6].textContent !== ""
  ) {
    cells[6].style.textDecoration = "line-through";
    return true;
  }
  //checks win condition for upper left to lower right diagonal
  else if (
    cells[0].textContent === cells[4].textContent &&
    cells[4].textContent === cells[8].textContent &&
    cells[0].textContent !== ""
  ) {
    cells[0].style.textDecoration = "line-through";
    return true;
  }
  //checks win condition for upper right to lower left diagonal
  else if (
    cells[2].textContent === cells[4].textContent &&
    cells[4].textContent === cells[6].textContent &&
    cells[2].textContent !== ""
  ) {
    cells[2].style.textDecoration = "line-through";
    return true;
  }
}

// let textContentArr = []
// for (let element in cells){
// textContentArr[i]=cells[i].textContent
// }

// function tie() {
//   cells.forEach((element) => {
//     if (!element.textContent) {
//       console.log("element.textContent is not equal to '' and is: "+element.textContent)
//       return true;
//     } else return false;
//   });
// }

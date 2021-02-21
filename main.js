//-------------------- HTML Variables --------------------//

// declare js variable targeting start button in game
let start = document.getElementById("start");

// declare js variable targeting playerstatus area in game
let playerStatus = document.getElementById("playerStatus");

// declare js HTML collection targeting collection of game cells in game
let cells = Array.from(document.getElementsByClassName("cell"));

//declares js variable to target the hours, minutes, and seconds elements in the game timer
let hourTimer = document.getElementById("hours");
let minuteTimer = document.getElementById("minutes");
let secondTimer = document.getElementById("seconds");

//declares variables for playervplayer and playervcomputer buttons
let playerVplayer = document.getElementById("player-vs-player");
let playerVcomputer = document.getElementById("player-vs-computer");

//declares varaibles for choosing player x and o names
let setPlayerXName = document.getElementById("set-player-X-name");
let setPlayerOName = document.getElementById("set-player-O-name");

//declares variables to keep track of playerX and playerO names displayed in game
let playerXNameDisplay = document.getElementById("player-X-name");
let playerONameDisplay = document.getElementById("player-O-name");
let chooseNamesForms = document.getElementsByClassName("choose-name");

//-------------------- Native JS Variables --------------------//

//variables for player x and o names in game - set as default values
let playerXName = "Player X";
let playerOName = "Player O";

//declares variables to keep track of current player and current player name
let currentPlayer = "";
let currentPlayerName = "";

//declares hour, minute, and second counters for the game timer
let hours = 0;
let minutes = 0;
let seconds = 0;

//declares timer interval to keep track of game timer time
let timer;

//while playervsplayer or playervcomputer are not disabled, start should be disabled (disabled = true)
start.disabled = true;


//-------------------- Event Listeners --------------------//

//add event listener to Player V Player Game Button ----------//
playerVplayer.addEventListener("click", () => {
  start.disabled = false;
  playerVplayer.disabled = true;
  playerVcomputer.disabled = true;
  gameType = "pVp";
  currentPlayer = "X";
  //allows users to choose their own names
  chooseNames();
});

//add event listener to Player v Computer Game Button-----------//
playerVcomputer.addEventListener("click", () => {
  start.disabled = false;
  playerVplayer.disabled = true;
  playerVcomputer.disabled = true;
  currentPlayer = "X";
  playerStatus.textContent = " Player must click into an empty cell in order for computer to randomly guess";
  gameType = "pVc";
  playerXNameDisplay.textContent = "Player X";
  playerONameDisplay.textContent = "Player O";
  playerXName = "Player X";
  playerOName = "Player O";
});

//adds event listener to start button - when clicked the button is disabled and game play can begin
start.addEventListener("click", () => {
  //removes option to see choose name forms
  for (let form of chooseNamesForms) {
    form.style.visibility = "hidden";
  }
  //clears the game timer to 0
  if (timer) {
    clearInterval(timer);
  }

  //resets hour, minute, second counters for game timer
  hours = 0;
  minutes = 0;
  seconds = 0;
  //initiates the game timer to run ever second
  timer = setInterval(setTimer, 1000);

  //disables start button
  start.disabled = true;
  // player status shows "player x's turn"
  playerStatus.textContent = `${playerXName}'s Turn`;

  //runs through each cell
  for (let elements of cells) {
    //clear the board for a new game
    elements.textContent = "";
    elements.style.backgroundColor = "white";

    // game type id player v player or player v computer
    if (gameType === "pVp") {
      //adds event listener to each cell to allow for game play
      elements.addEventListener("click", playGame);
    } else elements.addEventListener("click", playComputerGame);
  }
});

//-------------------- Functions --------------------//

//accepts user name and changes value
function chooseNames() {
  //prompts users to enter name
  playerStatus.textContent = "Choose Your Names";
  //makes choose-names visible to allow user to submit name choice
  for (let form of chooseNamesForms) {
    form.style.visibility = "visible";
  }

  //adds even listener to player X name choice
  setPlayerXName.addEventListener("submit", (evt) => {
    //prevents default form action of reset
    evt.preventDefault();
    //changes player X name to value submitted in player X form
    playerXName = document.getElementById("playerX").value;
    //if user does not submit anything - use default name
    if (playerXName === "") {
      playerXName = "Player X";
    }
    //changes display for Player X to show chosen name
    playerXNameDisplay.textContent = playerXName;
    //resets the player X name form
    setPlayerXName.reset();
  });
  // add event listener to plyer O name choice
  setPlayerOName.addEventListener("submit", (evt) => {
    //prevents default form action of reset
    evt.preventDefault();
    //changes player X name to value submitted in player O form
    playerOName = document.getElementById("playerO").value;
    //if user does not submit anything - use default name
    if (playerOName === "") {
      playerOName = "Player O";
    }
    //changes display for Player O to show chosen name
    playerONameDisplay.textContent = playerOName;
    //resets the player O name form
    setPlayerOName.reset();
  });
}

// Player vs Player game function
function playGame(event) {
  //guard clause to prevent a previously clicked cell from being clicked again. If it has already been clicked the player is alerted to pick an empty cell.  Otherwise it marks the cell appropriately
  if (event.target.textContent !== "") {
    alert("Please select an empty cell.");
  }
  // when the textContent of the cell will change to X or O depending on the currentPlayer.  The current player is then changed
  else if (event.target.textContent === "") {
    if (currentPlayer === "X") {
      event.target.textContent = "X";
    } else {
      event.target.textContent = "O";
    }

    //check for win condition by calling win() function
    //if win returns true, the current player is declared the winner, the start button is re-enabled and playGame click listener is removed from all cells
    if (win()) {
      playerStatus.textContent = `${currentPlayerName} Won!`;
      start.disabled = true;
      playerVplayer.disabled = false;
      playerVcomputer.disabled = false;

      // removes event listener on cells
      for (let elements of cells) {
        elements.removeEventListener("click", playGame);
      }
      //resets timer
      clearInterval(timer);
      
      //check for tie condition
      //if tie, re-enable buttons to play again
    } else if (tie()) {
      playerStatus.textContent = " It's a Tie, Play Again?";
      start.disabled = true;
      playerVplayer.disabled = false;
      playerVcomputer.disabled = false;
      for (let elements of cells) {
        elements.removeEventListener("click", playGame);
      }
      //resets timer
      clearInterval(timer);

      // changes players turn while win and tie functions are false
    } else {
      if (currentPlayer === "X") {
        currentPlayer = "O";
        currentPlayerName = playerOName;
      } else {
        currentPlayer = "X";
        currentPlayerName = playerXName;
      }
      playerStatus.textContent = `${currentPlayerName}'s Turn`;
    }
  }
}


// Player vs Computer game function
function playComputerGame(event) {
  if (event.target.textContent !== "") {
    alert("Please select an empty cell.");
  } else if (event.target.textContent === "") {

    // when the textContent of the cell will change to X or O depending on the currentPlayer.  The current player is then changed
    if (currentPlayer === "X") {
      event.target.textContent = "X";
    } else {

      // random guess by computer via randomGuess function
      let randomGuess = Math.floor(Math.random() * 8);
      while (cells[randomGuess].textContent !== "") {
        randomGuess = Math.floor(Math.random() * 8);
      }
      cells[randomGuess].textContent = "O";
    }

    //check for win condition by calling win() function
    //if win returns true, the current player is declared the winner, the start button is re-enabled and playGame click listener is removed from all cells
    if (win()) {
      playerStatus.textContent = `Player ${currentPlayer} Won`;
      start.disabled = true;
      playerVplayer.disabled = false;
      playerVcomputer.disabled = false;


      //removes event listener on cells
      for (let elements of cells) {
        elements.removeEventListener("click", playComputerGame);
      }

      //resets timer
      clearInterval(timer);

      //check for tie condition
      //if tie, re-enable buttons to play again
    } else if (tie()) {
      playerStatus.textContent = " It's a Tie, Play Again?";
      start.disabled = true;
      playerVplayer.disabled = false;
      playerVcomputer.disabled = false;
      for (let elements of cells) {
        elements.removeEventListener("click", playGame);
      }
      // resets timer
      clearInterval(timer);

      // changes players turn while win and tie functions are false
    } else {
      if (currentPlayer === "X") {
        currentPlayer = "O";
      } else {
        currentPlayer = "X";
      }
      playerStatus.textContent = `Player ${currentPlayer}'s Turn`;
    }
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
    cells[0].style.backgroundColor = "lightblue";
    cells[3].style.backgroundColor = "lightblue";
    cells[6].style.backgroundColor = "lightblue";
    return true;
  }
  //checks win condition for column 2
  else if (
    cells[1].textContent === cells[4].textContent &&
    cells[4].textContent === cells[7].textContent &&
    cells[1].textContent !== ""
  ) {
    cells[1].style.backgroundColor = "lightblue";
    cells[4].style.backgroundColor = "lightblue";
    cells[7].style.backgroundColor = "lightblue";
    return true;
  }
  //checks win condition for column 3
  else if (
    cells[2].textContent === cells[5].textContent &&
    cells[5].textContent === cells[8].textContent &&
    cells[2].textContent !== ""
  ) {
    cells[2].style.backgroundColor = "lightblue";
    cells[5].style.backgroundColor = "lightblue";
    cells[8].style.backgroundColor = "lightblue";
    return true;
  }
  //checks win condition for row 1
  else if (
    cells[0].textContent === cells[1].textContent &&
    cells[1].textContent === cells[2].textContent &&
    cells[0].textContent !== ""
  ) {
    cells[1].style.backgroundColor = "lightblue";
    cells[1].style.backgroundColor = "lightblue";
    cells[2].style.backgroundColor = "lightblue";
    return true;
  }
  //checks win condition for row 2
  else if (
    cells[3].textContent === cells[4].textContent &&
    cells[4].textContent === cells[5].textContent &&
    cells[3].textContent !== ""
  ) {
    cells[3].style.backgroundColor = "lightblue";
    cells[4].style.backgroundColor = "lightblue";
    cells[5].style.backgroundColor = "lightblue";
    return true;
  }
  //checks win condition for row 3
  else if (
    cells[6].textContent === cells[7].textContent &&
    cells[7].textContent === cells[8].textContent &&
    cells[6].textContent !== ""
  ) {
    cells[6].style.backgroundColor = "lightblue";
    cells[7].style.backgroundColor = "lightblue";
    cells[8].style.backgroundColor = "lightblue";
    return true;
  }
  //checks win condition for upper left to lower right diagonal
  else if (
    cells[0].textContent === cells[4].textContent &&
    cells[4].textContent === cells[8].textContent &&
    cells[0].textContent !== ""
  ) {
    cells[0].style.backgroundColor = "lightblue";
    cells[4].style.backgroundColor = "lightblue";
    cells[8].style.backgroundColor = "lightblue";
    return true;
  }
  //checks win condition for upper right to lower left diagonal
  else if (
    cells[2].textContent === cells[4].textContent &&
    cells[4].textContent === cells[6].textContent &&
    cells[2].textContent !== ""
  ) {
    cells[2].style.backgroundColor = "lightblue";
    cells[4].style.backgroundColor = "lightblue";
    cells[6].style.backgroundColor = "lightblue";
    return true;
  }
}
//setTimer function prints the updated time to the game board with correct formatting
function setTimer() {

  //if 59 seconds have reached 59, the next second will reset seconds to 0 and iterate minutes by 1
  if (seconds === 59) {
    minutes += 1;
    seconds = 0;
    if (minutes === 59) {
      hours += 1;
      minutes = 0;
    }
  }

  //else only iterate seconds
  else {
    seconds += 1;
  
  }

  //print out updated seconds, minutes and hours to game board
  secondTimer.textContent = timerPadding(seconds, 2);
  minuteTimer.textContent = timerPadding(minutes, 2);
  hourTimer.textContent = timerPadding(hours, 2);
}

//padding function takes a number and a size as the number of characters and adds leading 0s until the number string is the correct size
function timerPadding(num, size) {
  padNum = num + "";
  while (padNum.length < size) padNum = "0" + padNum;
  return padNum;
}

// function checks for tie game scenario
function tie() {
  if (
    (cells[0].textContent === "X" || cells[0].textContent === "O") &&
    (cells[1].textContent === "X" || cells[1].textContent === "O") &&
    (cells[2].textContent === "X" || cells[2].textContent === "O") &&
    (cells[3].textContent === "X" || cells[3].textContent === "O") &&
    (cells[4].textContent === "X" || cells[4].textContent === "O") &&
    (cells[5].textContent === "X" || cells[5].textContent === "O") &&
    (cells[6].textContent === "X" || cells[6].textContent === "O") &&
    (cells[7].textContent === "X" || cells[7].textContent === "O") &&
    (cells[8].textContent === "X" || cells[8].textContent === "O")
  ) {
    return true;
  }
  return false;
}

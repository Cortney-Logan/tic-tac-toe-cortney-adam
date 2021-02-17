let start = document.getElementById('start');
let playerStatus = document.getElementById('playerStatus');
let cells = document.getElementsByClassName('cell');
let X = document.getElementsByClassName('X');
let O = document.getElementsByClassName('O');



start.addEventListener('click', () => {
    start.disabled =true;

    playerStatus.textContent = "Player X's turn";
})

for (let elements of cells) {
elements.addEventListener('click', (event) => {
    event.target.img.src="/images/X.jpg";

})}
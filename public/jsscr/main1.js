let cleanBoard;
let playerX = 'X'
let playerO = 'O'

let winningconditons = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let cells = document.querySelectorAll('.cell')

startGame();

function startGame() {
    document.querySelector(".endgame").style.display = "none"
    cleanBoard = Array.from(Array(9).keys())
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style
.removeProperty('background-color')
        cells[i].addEventListener('click', turnClick, false)
    }
}

function turnClick(square) {
    if (typeof cleanBoard[square.target.id] == 'number') {
        turn(square.target.id, playerO)
        if (!checkTie()) turn(bestSpot(), playerX)
    }
}

function turn(squareId, player) {
    cleanBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(cleanBoard, player)
    if (gameWon) gameOver(gameWon)
}

function checkWin(board, player) {
    let plays = board.reduce((a, e, i) =>
        (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of winningconditons.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = { index: index, player: player };
            break;
        }
    }
    return gameWon
}

function gameOver(gameWon) {
    for (let index of winningconditons[gameWon.index]) {
        document.getElementById(index).style
.backgroundColor =
            gameWon.player == playerO ? "blue" : "red";
    }
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false)
    }
    declareWinner(gameWon.player == playerO ? "You Win!" : "You Lose!")
}

function declareWinner(who) {
    document.querySelector(".endgame").style.display = "block"
    document.querySelector(".endGame .text").innerText = who
}

function emptySquares() {
    return cleanBoard.filter(s => typeof s == 'number')
}

function bestSpot() {
    return emptySquares()[0];
}

function checkTie() {
    if (emptySquares().length == 0) {
        for (let i = 0; i < cells.length; i++) {
            cells[i].style
    .backgroundColor = "green"
            cells[i].removeEventListener('click', turnClick, false)
        }
        declareWinner("Tie Game")
        return true
    }
    return false
}
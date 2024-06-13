const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.game-board');
const turnMessageElement = document.getElementById('turnMessage');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const restartButton = document.getElementById('restartButton');
const newGameButton = document.getElementById('newGameButton');
let isCircleTurn;

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startGame();

restartButton.addEventListener('click', startGame);
newGameButton.addEventListener('click', startGame);

function startGame() {
    isCircleTurn = false;
    updateTurnMessage();
    cellElements.forEach(cell => {
        cell.classList.remove('x');
        cell.classList.remove('circle');
        cell.innerHTML = '';  // Clear the cell content
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = isCircleTurn ? 'circle' : 'x';
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        updateTurnMessage();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!';
    } else {
        winningMessageTextElement.innerText = `${isCircleTurn ? "O's" : "X's"} Wins!`;
    }
    winningMessageElement.classList.add('show');
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle');
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.innerHTML = currentClass === 'x' ? 'X' : 'O';  // Add X or O to the cell
}

function swapTurns() {
    isCircleTurn = !isCircleTurn;
}

function setBoardHoverClass() {
    board.classList.remove('x');
    board.classList.remove('circle');
    if (isCircleTurn) {
        board.classList.add('circle');
    } else {
        board.classList.add('x');
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

function updateTurnMessage() {
    turnMessageElement.innerText = isCircleTurn ? "O's turn" : "X's turn";
}

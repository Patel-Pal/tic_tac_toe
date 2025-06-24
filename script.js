const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restart");

// Winning Conditions
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
]

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

// initializeing the game
initializeGame()
function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`

    running = true;
}

//call when cell is Clicked
function cellClicked() {
    const cellIndex = parseInt(this.getAttribute("cellIndex"));
    // console.log(cellIndex)

    if (options[cellIndex] != "" || !running) {
        return;
    }

    updateCell(this, cellIndex);
    // ChangePlayer()
    checkWinner();
}

//call when cell is updated
function updateCell(cell, index) {
    options[index] = currentPlayer;

    cell.textContent = currentPlayer;
}

//change players "X" & "O"
function ChangePlayer() {
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    // console.log(currentPla yer)
    statusText.textContent = `${currentPlayer}'s turn`
}

// Check Winner Probablity & compare with winConditions
function checkWinner() {

    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (options[a] && options[a] === options[b] && options[a] === options[c]) {
            statusText.textContent = `${currentPlayer} wins `;
            setTimeout(()=>{
                alert("Congration 🎉 "+currentPlayer+" Wins")
            },120)
            
            running = false;
            return;
        }
    }

    if (!options.includes("")) {
        statusText.textContent = `Draw Game`;
        running = false;
        return;
    }
    ChangePlayer()
}


// for restart game
function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}
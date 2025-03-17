const win_patterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];
 
let svg = document.getElementById("ticTacToeSVG");
let resetBtn = document.querySelector("#reset_btn");
let resDisplay = document.querySelector("#result");
let player1_symbol = null;
let player2_symbol = null;
let count=0;

let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

document.querySelectorAll(".material-symbols-outlined").forEach((icon) => {
    icon.addEventListener("click", () => {
        let selected_symbol = icon.getAttribute("data-symbol");

        if (!player1_symbol) {
            player1_symbol = selected_symbol;
            document.getElementById("player1_symbol").innerHTML = `<span class="material-symbols-outlined">${player1_symbol}</span>`;
        } else if (!player2_symbol && selected_symbol !== player1_symbol) {
            player2_symbol = selected_symbol;
            document.getElementById("player2_symbol").innerHTML = `<span class="material-symbols-outlined">${player2_symbol}</span>`;
        }
    });
});

let currentPlayer=player1_symbol;

const createSVG = (symbol, x, y) => {
    let svgNS = "http://www.w3.org/2000/svg";
    let text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", x * 100 + 50);
    text.setAttribute("y", y * 100 + 60);
    text.textContent = symbol;
    text.setAttribute("class", "material-symbols-outlined");
    return text;
};


const handleClick = (event) => {
    const cell = event.target;
    if (!cell.classList.contains("cell")) return;

    if(!player1_symbol || !player2_symbol){
        alert("Players must select the symbols before starting the game.");
        return;
    }

    let [_, row, col] = cell.id.split("-");
    row = parseInt(row);
    col = parseInt(col);

    if (board[row][col] !== "") return;

    let symbol = currentPlayer === player1_symbol ? player1_symbol : player2_symbol;
    board[row][col] = symbol;
    svg.appendChild(createSVG(symbol, col, row));
    count++;

    if (checkWinner()) {
        declareWinner(symbol);
        return;
    }

    if (board.flat().every(cell => cell !== "") && count === 9) {
        gameDraw();
        return;
    }

    currentPlayer = currentPlayer === player1_symbol ? player2_symbol : player1_symbol;
};

const resetGame = () => {
    currentPlayer = player1_symbol;
    board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    document.getElementById("p1").value = "";
    document.getElementById("p2").value = "";
    document.getElementById("player1_symbol").innerText = null;
    document.getElementById("player2_symbol").innerText = null;
    player1_symbol = null;
    player2_symbol = null;
    resDisplay.innerText = "";

    while (svg.lastChild && svg.lastChild.nodeName === "text") {
        svg.removeChild(svg.lastChild);
     
    }
    count=0;
    svg.addEventListener("click", handleClick);
};

const checkWinner = () => {
    for (let pattern of win_patterns) {
        let [a, b, c] = pattern;
        let row1 = Math.floor(a / 3), col1 = a % 3;
        let row2 = Math.floor(b / 3), col2 = b % 3;
        let row3 = Math.floor(c / 3), col3 = c % 3;

        if (
            board[row1][col1] &&
            board[row1][col1] === board[row2][col2] &&
            board[row1][col1] === board[row3][col3]
        ) {
            return true;
            svg.removeEventListener("click", handleClick);
        }
    }
    return false;
};

const declareWinner = (winner) => {
    let player1 = document.getElementById("p1").value;
    let player2 = document.getElementById("p2").value;
    resDisplay.innerText = winner === player1_symbol ? "Winner is " + player1 : "Winner is " + player2;
    svg.removeEventListener("click", handleClick);
};

const gameDraw = () => {
    resDisplay.innerText = "Tie";
    svg.removeEventListener("click", handleClick);
};

svg.addEventListener("click", handleClick);
resetBtn.addEventListener("click", resetGame);
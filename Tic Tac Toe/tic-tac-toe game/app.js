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
 
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset_btn");
let resDisplay = document.querySelector("#result");
let player1_symbol=null;
let player2_symbol=null;

document.querySelectorAll(".material-symbols-outlined").forEach((icon)=>{
    icon.addEventListener("click",()=>{
        let selected_symbol=icon.getAttribute("data-symbol");

       if(!player1_symbol){
        player1_symbol=selected_symbol;
        document.getElementById("player1_symbol").innerHTML=`<span class="material-symbols-outlined">${player1_symbol}</span>`;
       }
       else if(!player2_symbol && selected_symbol!==player1_symbol){
        player2_symbol=selected_symbol;
        document.getElementById("player2_symbol").innerHTML=`<span class="material-symbols-outlined">${player2_symbol}</span>`;
       }
    });
});


 
let turnO = true;
let count = 0;
 
const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
 
    document.getElementById("p1").value="";
    document.getElementById("p2").value="";
    document.getElementById("player1_symbol").innerText=null;
    document.getElementById("player2_symbol").innerText=null;
    player1_symbol = null;
    player2_symbol = null;
    resDisplay.innerText="";
};
 
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(!player1_symbol || !player2_symbol){
            alert("Players must select the symbols before starting the game.");
            return;
        }

        if (turnO) {
            box.innerHTML = `<span class="material-symbols-outlined">${player1_symbol}</span>`;
            turnO = false;
        }
        else {
            box.innerHTML = `<span class="material-symbols-outlined">${player2_symbol}</span>`;
            turnO = true;
        }
        box.disabled = true;
        count++;
 
        if (count === 9) {
            gameDraw();
        } else {
            checkWinner();
        }
    });
});
 
const gameDraw = () => {
    resDisplay.innerText = "Tie"
    disableBoxes();
};
 
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};
 
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};
 
const declareWinner = (winner) => {
    let player1 = document.getElementById("p1").value;
    let player2 = document.getElementById("p2").value;
    if(winner===player1_symbol){
        resDisplay.innerText = "Winner is " + player1;
    }else{
        resDisplay.innerText = "Winner is " + player2;
    }
};
 
const checkWinner = () => {
    for (let pattern of win_patterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
 
        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                disableBoxes();
                declareWinner(pos1);
            }
        }
    }
};
 
resetBtn.addEventListener("click", resetGame);
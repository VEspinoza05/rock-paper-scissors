//Global variables
let humanScore = 0;
let computerScore = 0;
let rounds = 0;

while(rounds !== 5) {
    option = playGame();
    
    if(option === "canceled") break;
    else if(option === "wrong choice") continue;

    rounds++;
}

anounceWinners();

//functions
function anounceWinners() {
    console.log(`Human score: ${humanScore} \nComputer Score : ${computerScore}`);
        
    if(humanScore > computerScore) console.log("Winner is Human!");
    else if (computerScore > humanScore) console.log("Winner is Computer!");
    else console.log("It's a draw.");
}

function playGame(){
    const humanSelection = getHumanChoice();

    if(humanSelection === "canceled" || 
        humanSelection === "wrong choice") return humanSelection;

    const computerSelection = getComputerChoice();
    playRound(humanSelection, computerSelection);
}

function getComputerChoice() {
    const minNumber = 1;
    const maxNumber = 3;
    const randomNumber = Math.floor(Math.random() * maxNumber + minNumber);

    switch(randomNumber) {
        case 1:
            return "rock";
            break;
        case 2:
            return "paper";
            break;
        case 3:
            return "scissors"
            break;
    }
}

function getHumanChoice() {
    let choice = prompt("Enter a choice: rock, paper or scissors","");

    if(choice === null) return "canceled"

    choice = choice.toLowerCase();

    if(choice === "rock" ||
        choice === "paper" ||
        choice === "scissors") {
        return choice;
    }

    else {
        return "wrong choice";
    }
}

function playRound(humanChoice, computerChoice){
    let losingPlayer;
    let roundResult;

    if((humanChoice === "rock" && computerChoice === "paper") ||
        (humanChoice === "paper" && computerChoice === "rock")) {

        roundResult = "Paper beats Rock";
        
        if(humanChoice === "paper") losingPlayer = "Computer";
        else losingPlayer = "You";
    }
    else if((humanChoice === "paper" && computerChoice === "scissors") ||
        (humanChoice === "scissors" && computerChoice === "paper")) {

            roundResult = "Scissors beats Paper"

            if(humanChoice === "scissors") losingPlayer = "Computer";
            else losingPlayer = "You";
        }
    else if((humanChoice === "scissors" && computerChoice === "rock") ||
        (humanChoice === "rock" && computerChoice === "scissors")) {

            roundResult = "Rock beats Scissors"

            if(humanChoice === "rock") losingPlayer = "Computer";
            else losingPlayer = "You"
    }
    else {
        console.log("It's a draw");
        return;
    }
    

    if(losingPlayer === "You") computerScore++;
    else humanScore++; 

    console.log(`${losingPlayer} lose! ${roundResult}`);
}
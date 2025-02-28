//Global variables
let humanScore = 0;
let computerScore = 0;

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
        console.log("It's a draw. There's no winner.");
        return;
    }
    

    if(losingPlayer === "You") computerScore++;
    else humanScore++; 

    console.log(`${losingPlayer} lose! ${roundResult}`);
}
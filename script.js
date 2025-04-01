//Global variables
let humanScore = 0;
let computerScore = 0;
let roundCount = 0;

const choicesContainer = document.querySelector(".choices");
const gameUiH2 = document.querySelector(".game-ui > h2");

//functions
function getFinalWinner() { 
    if(humanScore > computerScore) return "Winner is Human!";
    else if (computerScore > humanScore) return "Winner is Computer!";
    else return "It's a draw.";
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
        return "It's a draw";
    }
    

    if(losingPlayer === "You") computerScore++;
    else humanScore++; 

    return `${losingPlayer} lose! ${roundResult}`;
}

function displayRoundInfo(roundResult) {
    const roundInfoElement = document.querySelector(".round-info");
    roundInfoElement.textContent = roundResult;
}

function displayRoundCount(roundCount) {
    const roundCountElement = document.querySelector(".round-num");
    roundCountElement.textContent = "Round " + roundCount;
}

function displayScores() {
    const humanScoreElement = document.querySelector(".human-score");
    const computerScoreElement = document.querySelector(".computer-score");

    humanScoreElement.textContent = "Human: " + humanScore;
    computerScoreElement.textContent = "Computer: " + computerScore;
}

function createResetButton() {
    const resetButton = document.createElement("button");
    resetButton.textContent = "Restart"
    return resetButton;
}

function createGameOverBanner() {
    const gameOverBanner = document.createElement("div");
    gameOverBanner.textContent = "Game Over! " + getFinalWinner();
    resetButton = createResetButton();
    gameOverBanner.appendChild(resetButton);
    return gameOverBanner;
}

function displayGameOver() {
    const gameOverBanner = createGameOverBanner();
    const resultsContainer = document.querySelector(".results");
    const gameUiContainer = document.querySelector(".game-ui")
    gameUiContainer.insertBefore(gameOverBanner, resultsContainer);
}

//Event
const choices = document.querySelectorAll(".choice");

choices.forEach((c) => 
    c.addEventListener("click", () => {
        if (roundCount === 5) return;
        
        computerChoice = getComputerChoice();
        humanChoice = c.textContent.toLowerCase();
        roundResult = playRound(humanChoice, computerChoice);
        displayRoundInfo(roundResult);
        displayRoundCount(++roundCount);
        displayScores();

        if(roundCount === 5) {
            displayGameOver();
            choicesContainer.remove();
            gameUiH2.remove();
        }
    })
)
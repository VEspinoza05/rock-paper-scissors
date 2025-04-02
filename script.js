//Global variables
let humanScore = 0;
let computerScore = 0;
let roundCount = 0;

const gameUiContainer = document.querySelector(".game-ui");
const choicesContainer = document.querySelector(".choices");
const gameUiH2 = document.querySelector(".game-ui > h2");
const roundCountContainer = document.querySelector(".round-num");
const roundInfoContainer = document.querySelector(".round-info");
const humanScoreContainer = document.querySelector(".human-score");
const computerScoreContainer = document.querySelector(".computer-score");
const resultsContainer = document.querySelector(".results");

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
    roundInfoContainer.textContent = roundResult;
}

function displayRoundCount(roundCount) {
    roundCountContainer.textContent = "Round " + roundCount;
}

function displayScores() {
    humanScoreContainer.textContent = "Human: " + humanScore;
    computerScoreContainer.textContent = "Computer: " + computerScore;
}

function createResetButton() {
    const resetButton = document.createElement("button");
    resetButton.textContent = "Restart"
    resetButton.addEventListener("click", () => resetGame())
    return resetButton;
}

function createGameOverBanner() {
    const gameOverBanner = document.createElement("div");
    gameOverBanner.setAttribute("class", "game-over-banner")
    gameOverBanner.textContent = "Game Over! " + getFinalWinner();
    resetButton = createResetButton();
    gameOverBanner.appendChild(resetButton);
    return gameOverBanner;
}

function displayGameOver() {
    const gameOverBanner = createGameOverBanner();
    gameUiContainer.insertBefore(gameOverBanner, resultsContainer);
}

function resetGame() {
    computerScore = humanScore = roundCount = 0;
    setDefaultUi();
}

function setDefaultUi() {
    const gameOverBanner = document.querySelector(".game-over-banner");
    gameUiContainer.insertBefore(gameUiH2, gameOverBanner);
    gameUiContainer.insertBefore(choicesContainer, gameOverBanner);
    gameOverBanner.remove();
    roundCountContainer.textContent = "";
    roundInfoContainer.textContent = ""
    displayScores();
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
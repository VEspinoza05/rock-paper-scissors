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
const handButtonIdToImage = new Map(Object.entries({
    "rock-hand": "rock-static.png",
    "paper-hand": "paper-static.png",
    "scissor-hand": "scissors-static.png"
}));
const handChoiceToImage = new Map(Object.entries({
    "rock": "rock-static.png",
    "paper": "paper-static.png",
    "scissors": "scissors-static.png"
}));
const handButtonIdToHandChoice = new Map(Object.entries({
    "rock-hand": "rock",
    "paper-hand": "paper",
    "scissor-hand": "scissors"
}));
const rockPaperScissorsMap = new Map(Object.entries({
    "rock": "scissors",
    "scissors": "paper",
    "paper": "rock"
}));
const handButtons = document.getElementsByClassName("hands");
const playerChoiceImage = document.getElementById("player-choice-image");
const computerChoiceImage = document.getElementById("computer-choice-image");
const headerText = document.getElementById("header-text-text");
const resultsText = document.getElementById("results-text");
const handImages = document.getElementsByClassName("hands");
const resultsImages = document.getElementsByClassName("result-image-item");
const resultsImagesContainer = document.getElementById("rock-paper-scissors-results-images-container");
let playerScore = document.getElementById("player-score");
let computerScore = document.getElementById("computer-score");
let currentRound = 1;


class Player {
    score = 0;
    handChoices = ["rock", "paper", "scissors"];
    handThrown = null;
    name = "";

    constructor(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    getScore() {
        return this.score;
    }

    getHandThrown() {
        return this.handThrown;
    }

    throwHand(handToThrow = null) {
        this.handThrown = handToThrow !== null ? handToThrow : this.handChoices[Math.floor(Math.random() * this.handChoices.length)];
        return this.handThrown;
    }
}

function checkHandsAndUpdateScores(playerOne, playerTwo) {
    if (playerOne.getHandThrown() === null || playerTwo.getHandThrown() === null) {
        throw new ReferenceError("One or more players did not throw a hand! Please both players throw a hand!");
    }
    if (!rockPaperScissorsMap.has(playerOne.getHandThrown()) || !rockPaperScissorsMap.has(playerTwo.getHandThrown())) {
        console.log(playerOne.getHandThrown());
        console.log(playerTwo.getHandThrown());
        throw new ReferenceError("Please type a valid hand. Rock Paper or Scissors!");
    }
    if (rockPaperScissorsMap.get(playerOne.getHandThrown()) === playerTwo.getHandThrown()) {
        playerOne.score++;
        return [playerOne, playerOne.getHandThrown()];
    } else if (rockPaperScissorsMap.get(playerTwo.getHandThrown()) === playerOne.getHandThrown()) {
        playerTwo.score++;
        return [playerTwo, playerTwo.getHandThrown()];
    } else {
        return "tie";
    }
}

function modifyHtmlElementsView(arrayOfElements, hide = true, display = "flex") {
    if (hide) {
        for (let element of arrayOfElements) {
            element.style.display = "none";
        }
    } else {
        for (let element of arrayOfElements) {
            element.style.display = display;
        }
    }
}

function playGame(amountOfTimesToPlay = 5) {
    modifyHtmlElementsView(resultsImages, true);
    const computer = new Player("Computer");
    const player = new Player("Player");
    resultsImagesContainer.onclick = () => {
        modifyHtmlElementsView(resultsImages, true);
        modifyHtmlElementsView(handImages, false);
    }
    for (let handButton of handButtons) {
        handButton.onclick = () => {
            playerChoiceImage.src = handButtonIdToImage.get(handButton.id);
            player.throwHand(handButtonIdToHandChoice.get(handButton.id));
            computer.throwHand();
            computerChoiceImage.src = handChoiceToImage.get(computer.getHandThrown());
            try {
                const result = checkHandsAndUpdateScores(player, computer);
                let rockPaperScissorsResultMessage = "";
                if (result === "tie") {
                    rockPaperScissorsResultMessage = `It's a ${result}!`;
                } else if (result[0] === player) {
                    rockPaperScissorsResultMessage = `${player.getName()} wins!`;
                } else {
                    rockPaperScissorsResultMessage = `${computer.getName()} wins!`;
                }
                resultsText.innerText = `${rockPaperScissorsResultMessage}`;
                playerScore.innerText = player.getScore().toString();
                computerScore.innerText = computer.getScore().toString();
                currentRound++;
                modifyHtmlElementsView(handImages, true);
                modifyHtmlElementsView(resultsImages, false);
            } catch (err) {
                headerText.innerText = `Error occurred: ${err}. Please reload`;
            }
        }
    }
}

playGame();

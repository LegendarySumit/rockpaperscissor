window.addEventListener('DOMContentLoaded', function () {

    let playerHand = document.getElementById("player-hand");
    let computerHand = document.getElementById("computer-hand");

    let startBtn = document.getElementById("start-button");
    let rockBtn = document.getElementById("rock-button");
    let paperBtn = document.getElementById("paper-button");
    let scissorsBtn = document.getElementById("scissors-button");

    let playerScore = document.getElementById("player-score");
    let computerScore = document.getElementById("computer-score");

    let resetBtn = document.getElementById("reset-button");

    let resultDiv = document.querySelector(".result");

    let images = {
        stone: "assets/Images/stone.png",
        paper: "assets/Images/paper.png",
        scissors: "assets/Images/scissors.png",

        staticHands: {
            playerHand: "assets/Images/statichand.png",
            computerHand: "assets/Images/statichandREV.png"
        }
    };

    let userChoice = "";
    let computerChoice = "";
    let playerScoreValue = 0;
    let computerScoreValue = 0;

    let gameStarted = false;
    let choices = ["stone", "paper", "scissors"];
    let delayTime = 800; // milliseconds

    function disablebtns() {
        rockBtn.disabled = true;
        paperBtn.disabled = true;
        scissorsBtn.disabled = true;
        resetBtn.disabled = true;
    }

    function enablebtns() {
        rockBtn.disabled = false;
        paperBtn.disabled = false;
        scissorsBtn.disabled = false;
        resetBtn.disabled = false;
    }

    disablebtns();

    startBtn.addEventListener("click", function () {
        resultDiv.textContent = "Game Started! Choose Rock, Paper, or Scissors";
        gameStarted = true;
        enablebtns();
    });

    rockBtn.addEventListener("click", function () {
        handleUserChoice("stone");
    });

    paperBtn.addEventListener("click", function () {
        handleUserChoice("paper");
    });

    scissorsBtn.addEventListener("click", function () {
        handleUserChoice("scissors");
    });

    function handleUserChoice(choice) {
        if (!gameStarted) return;

        userChoice = choice;

        // Keep both hands static while waiting
        playerHand.src = images.staticHands.playerHand;
        computerHand.src = images.staticHands.computerHand;
        resultDiv.textContent = "Waiting for computer...";

        setTimeout(function () {
            // Show player hand
            if (choice === "stone") {
                playerHand.src = images.stone;
            } else if (choice === "paper") {
                playerHand.src = images.paper;
            } else {
                playerHand.src = images.scissors;
            }

            // Computer chooses and shows
            computerChoice = getComputerChoice();
            showComputerHand();
            playRound();
        }, delayTime);
    }

    function getComputerChoice() {
        return choices[Math.floor(Math.random() * choices.length)];
    }

    function showComputerHand() {
        if (computerChoice === "stone") {
            computerHand.src = images.stone;
        } else if (computerChoice === "paper") {
            computerHand.src = images.paper;
        } else {
            computerHand.src = images.scissors;
        }
    }

    function playRound() {
        if (userChoice === computerChoice) {
            resultDiv.textContent = "🤝 It's a draw! 🤝";
        } else if (
            (userChoice === "stone" && computerChoice === "scissors") ||
            (userChoice === "paper" && computerChoice === "stone") ||
            (userChoice === "scissors" && computerChoice === "paper")
        ) {
            resultDiv.textContent = "🎉 You win this round! 🎉";
            playerScoreValue++;
        } else {
            resultDiv.textContent = "😢 You lose this round! 😢";
            computerScoreValue++;
        }
        updateScore();
    }

    function updateScore() {
        playerScore.textContent = playerScoreValue;
        computerScore.textContent = computerScoreValue;
    }

    function resetGame() {
        userChoice = "";
        computerChoice = "";
        playerScoreValue = 0;
        computerScoreValue = 0;
        updateScore();
        playerHand.src = images.staticHands.playerHand;
        computerHand.src = images.staticHands.computerHand;
        disablebtns();
        gameStarted = false;
        resultDiv.textContent = "Scores reset. Click Start Game to play again!";
    }

    resetBtn.addEventListener("click", resetGame);
});

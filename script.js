let computerScore = 0;
let humanScore = 0;

const roundResult = document.querySelector(".round-result");
const playerScore = document.querySelector(".player-score");
const comScore = document.querySelector(".computer-score");
const computerRock = document.getElementById("rock");
const computerPaper = document.getElementById("paper");
const computerScissors = document.getElementById("scissors");
const instructions = document.querySelector(".instructions");
const finalResultText = document.querySelector(".final-result-text");
const finalResult = document.querySelector(".final-result");

let humanChoices = document.querySelector(".human-choices");
let svgs = document.querySelectorAll("svg");
let resetRestartButton = document.querySelector(".restart-reset");

function getHumanChoice(e) {
  if (e.target.closest(".rock")) {
    return "rock";
  } else if (e.target.closest(".paper")) {
    return "paper";
  } else if (e.target.closest(".scissors")) {
    return "scissors";
  }
}

function getComputerChoice() {
  const result = Math.random();
  if (result < 0.3) {
    return "rock";
  } else if (result < 0.6) {
    return "paper";
  } else {
    return "scissors";
  }
}

function colorHumanChoice(e, color) {
  const svg = e.target.closest("svg");
  svg.classList.remove("black");
  svg.classList.add(color);
}

function colorComputerChoice(computerChoice, color) {
  switch (computerChoice) {
    case "rock":
      computerRock.classList.remove("black");
      computerRock.classList.add(color);
      break;
    case "paper":
      computerPaper.classList.remove("black");
      computerPaper.classList.add(color);
      break;
    case "scissors":
      computerScissors.classList.remove("black");
      computerScissors.classList.add(color);
      break;
  }
}

function resetSvgs() {
  svgs.forEach((svg) => {
    svg.classList.remove("red");
    svg.classList.remove("green");
    svg.classList.remove("blue");
    svg.classList.add("black");
    svg.classList.add("hover");
    svg.style.cursor = "pointer";
  });
}

function computerWins(e, computerChoice, humanChoice) {
  computerScore++;
  roundResult.textContent = `“You lose! ${computerChoice} beats ${humanChoice}”`;
  colorHumanChoice(e, "red");
  colorComputerChoice(computerChoice, "green");
}

function humanWins(e, humanChoice, computerChoice) {
  humanScore++;
  roundResult.textContent = `“You win! ${humanChoice} beats ${computerChoice}”`;
  colorHumanChoice(e, "green");
  colorComputerChoice(computerChoice, "red");
}

function draw(e, computerChoice) {
  roundResult.textContent = `“It's a draw! Both chose ${computerChoice}”`;
  colorHumanChoice(e, "blue");
  colorComputerChoice(computerChoice, "blue");
}

function endGame() {
  humanChoices.removeEventListener("click", playGame);
  finalResultText.classList.remove("d-none");
  svgs.forEach((svg) => {
    svg.classList.remove("hover");
    svg.style.cursor = "default";
  });

  if (computerScore > humanScore) {
    finalResult.textContent = "Sorry, you lost the game! :'(";
  } else {
    finalResult.textContent = "Congrats! You won :D";
  }
}

function checkRoundWinner(computerChoice, humanChoice) {
  if (
    (computerChoice === "paper" && humanChoice === "rock") ||
    (computerChoice === "rock" && humanChoice === "scissors") ||
    (computerChoice === "scissors" && humanChoice === "paper")
  ) {
    return "computer";
  } else if (
    (computerChoice === "rock" && humanChoice === "paper") ||
    (computerChoice === "scissors" && humanChoice === "rock") ||
    (computerChoice === "paper" && humanChoice === "scissors")
  ) {
    return "human";
  }
  return "";
}

function playRound(e) {
  resetSvgs();

  const humanChoice = getHumanChoice(e);
  const computerChoice = getComputerChoice();

  const roundWinner = checkRoundWinner(computerChoice, humanChoice);

  if (roundWinner === "computer") {
    computerWins(e, computerChoice, humanChoice);
  } else if (roundWinner === "human") {
    humanWins(e, humanChoice, computerChoice);
  } else {
    draw(e, humanChoice, computerChoice);
  }

  comScore.textContent = computerScore;
  playerScore.textContent = humanScore;
}

function playGame(e) {
  playRound(e);

  if (humanScore === 5 || computerScore === 5) {
    endGame();
  }
}

function resetGame() {
  computerScore = 0;
  humanScore = 0;
  comScore.textContent = computerScore;
  playerScore.textContent = humanScore;
  roundResult.textContent = "";
  finalResult.textContent = "";
  finalResultText.classList.add("d-none");
  resetSvgs();
  humanChoices.addEventListener("click", playGame);
}

resetRestartButton.addEventListener("click", resetGame);
humanChoices.addEventListener("click", playGame);

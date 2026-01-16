let computerScore = 0;
let humanScore = 0;

const roundResult = document.querySelector(".round-result");
const humanScoreDisplay = document.querySelector(".player-score");
const computerScoreDisplay = document.querySelector(".computer-score");
const computerRock = document.getElementById("rock");
const computerPaper = document.getElementById("paper");
const computerScissors = document.getElementById("scissors");
const finalResultText = document.querySelector(".final-result-text");
const finalResult = document.querySelector(".final-result");
const humanChoices = document.querySelector(".human-choices");
const svgs = document.querySelectorAll("svg");
const resetRestartButton = document.querySelector(".restart-reset");
const winningMoves = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};
const WINNING_SCORE = 5;


function getHumanChoice(e) {
  const svg = e.target.closest("svg");
  if (svg.classList.contains("rock")) return "rock";
  if (svg.classList.contains("paper")) return "paper";
  if (svg.classList.contains("scissors")) return "scissors";
}

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * 3)];
}

function checkRoundWinner(computerChoice, humanChoice) {
  if (humanChoice === computerChoice) return "draw";
  return winningMoves[humanChoice] === computerChoice ? "human" : "computer";
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
    svg.classList.remove("red", "green", "blue", "default-cursor");
    svg.classList.add("black", "hover");
  });
}

function playRound(e) {
  resetSvgs();

  const humanChoice = getHumanChoice(e);
  const computerChoice = getComputerChoice();
  const roundWinner = checkRoundWinner(computerChoice, humanChoice);

  switch (roundWinner) {
    case "human":
      humanScore++;
      roundResult.textContent = `You win! ${humanChoice} beats ${computerChoice}`;
      colorHumanChoice(e, "green");
      colorComputerChoice(computerChoice, "red");
      break;
    case "computer":
      computerScore++;
      roundResult.textContent = `You lose! ${computerChoice} beats ${humanChoice}`;
      colorHumanChoice(e, "red");
      colorComputerChoice(computerChoice, "green");
      break;
    default:
      roundResult.textContent = `It's a draw! Both chose ${computerChoice}`;
      colorHumanChoice(e, "blue");
      colorComputerChoice(computerChoice, "blue");
  }

  computerScoreDisplay.textContent = computerScore;
  humanScoreDisplay.textContent = humanScore;
}

function endGame() {
  humanChoices.removeEventListener("click", playGame);
  finalResultText.classList.remove("d-none");
  svgs.forEach((svg) => {
    svg.classList.remove("hover");
    svg.classList.add("default-cursor");
  });

  finalResult.textContent =
    computerScore > humanScore
      ? "Sorry, you lost the game! :'("
      : "Congrats! You won :D";
}

function playGame(e) {
  playRound(e);

  if (humanScore === WINNING_SCORE || computerScore === WINNING_SCORE) {
    endGame();
  }
}

function resetGame() {
  computerScore = 0;
  humanScore = 0;
  computerScoreDisplay.textContent = computerScore;
  humanScoreDisplay.textContent = humanScore;
  roundResult.textContent = "";
  finalResult.textContent = "";
  finalResultText.classList.add("d-none");
  resetSvgs();
  humanChoices.addEventListener("click", playGame);
}

resetRestartButton.addEventListener("click", resetGame);
humanChoices.addEventListener("click", playGame);

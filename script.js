let computerScore = 0;
let userScore = 0;

const roundResult = document.querySelector(".round-result");
const playerScore = document.querySelector(".player-score");
const comScore = document.querySelector(".computer-score");
const computerRock = document.getElementById("rock");
const computerPaper = document.getElementById("paper");
const computerScissors = document.getElementById("scissors");
const instructions = document.querySelector(".instructions");
const finalResult = document.querySelector(".final-result");

let userChoices = document.querySelector(".user-choices");
let svgs = document.querySelectorAll("svg");
let resetRestartButton = document.querySelector(".restart-reset");

function getUserChoice(e) {
  if (e.target.closest(".rock")) {
    return "rock";
  } else if (e.target.closest(".paper")) {
    return "paper";
  } else if (e.target.closest(".scissors")) {
    return "scissors";
  }
}

function getComputerChoice() {
  if (Math.random() < 0.3) {
    return "rock";
  } else if (Math.random() < 0.6) {
    return "paper";
  } else {
    return "scissors";
  }
}

function colorUserChoice(e, color) {
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

function resetSvgsColorToBlack() {
  svgs.forEach((svg) => {
    svg.classList.remove("red");
    svg.classList.remove("green");
    svg.classList.remove("blue");
    svg.classList.add("black");
  });
}

function computerWins(e, computerChoice, userChoice) {
  computerScore++;
  roundResult.textContent = `“You lose! ${computerChoice} beats ${userChoice}”`;
  colorUserChoice(e, "red");
  colorComputerChoice(computerChoice, "green");
}

function userWins(e, userChoice, computerChoice) {
  userScore++;
  roundResult.textContent = `“You win! ${userChoice} beats ${computerChoice}”`;
  colorUserChoice(e, "green");
  colorComputerChoice(computerChoice, "red");
}

function draw(e, userChoice, computerChoice) {
  roundResult.textContent = `“It's a draw! Both chose ${computerChoice}”`;
  colorUserChoice(e, "blue");
  colorComputerChoice(userChoice, "blue");
}

function endGame() {
  if (userScore === 5 || computerScore === 5) {
    userChoices.removeEventListener("click", playRound);
    svgs.forEach((svg) => (svg.style.cursor = "default"));
  }

  if (computerScore === 5) {
    finalResult.textContent = "Sorry, you lost the game! :'(";
    instructions.classList.add("d-none");
  } else if (userScore === 5) {
    finalResult.textContent = "Congrats! You won :D";
    instructions.classList.add("d-none");
  }
}

function playRound(e) {
  resetSvgsColorToBlack();

  const userChoice = getUserChoice(e);
  console.log(userChoice);
  const computerChoice = getComputerChoice();
  console.log(computerChoice);

  if (
    (computerChoice === "paper" && userChoice === "rock") ||
    (computerChoice === "rock" && userChoice === "scissors") ||
    (computerChoice === "scissors" && userChoice === "paper")
  ) {
    computerWins(e, computerChoice, userChoice);
  } else if (
    (computerChoice === "rock" && userChoice === "paper") ||
    (computerChoice === "scissors" && userChoice === "rock") ||
    (computerChoice === "paper" && userChoice === "scissors")
  ) {
    userWins(e, userChoice, computerChoice);
  } else {
    draw(e, userChoice, computerChoice);
  }

  comScore.textContent = computerScore;
  playerScore.textContent = userScore;

  endGame();
}

resetRestartButton.addEventListener("click", () => {
  computerScore = 0;
  userScore = 0;
  comScore.textContent = computerScore;
  playerScore.textContent = userScore;
  roundResult.textContent = "";
  finalResult.textContent = "";
  svgs.forEach((svg) => svg.classList.add("black"));
  userChoices.addEventListener("click", playRound);
});

userChoices.addEventListener("click", playRound);

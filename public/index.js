const dot = { image: "url(images/dot.svg)", title: "dot", color: "#333dfd" };
const cross = {
  image: "url(images/cross.svg)",
  title: "cross",
  color: "#fd3333",
};
const COLOR1 = "transparent";
const COLOR2 = "#060171";

var dotScore = 0;
var crossScore = 0;
var isPlayer1 = true;
var gameOver = false;
var boxesChecked = 0;
const player1 = "DOT";
const player2 = "CROSS";
const correctPatterns = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

var boxes = document.querySelectorAll(".box");
var restartBtn = document.querySelector(".restartContainer");
var resultBox = document.querySelector(".resultBox");
var dotPlayer = document.querySelector(".dot");
var crossPlayer = document.querySelector(".cross");
var scores = document.querySelectorAll(".score");

startNewGame();

boxes.forEach((box, index) => {
  box.addEventListener("click", () =>
    !gameOver ? handleBoxClick(index) : null
  );
  box.checkType = null;
});

restartBtn.addEventListener("click", startNewGame);

function handleBoxClick(index) {
  var { image, title, color } = isPlayer1 ? dot : cross;

  if (boxes[index].checkType === null) {
    dotPlayer.style.backgroundColor = isPlayer1 ? COLOR1 : COLOR2;
    crossPlayer.style.backgroundColor = isPlayer1 ? COLOR2 : COLOR1;
    boxes[index].style.backgroundImage = image;
    boxes[index].style.backgroundColor = color;
    boxes[index].checkType = title;
    isPlayer1 = !isPlayer1;
    boxesChecked += 1;
    checkGameProgress();
  }
  if (!isPlayer1 && boxesChecked < 9 && !gameOver) {
    let emptyBoxes = [];
    boxes.forEach((box, key) => {
      if (box.checkType === null) {
        emptyBoxes.push(key);
      }
    });

    let randomIndex = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    handleBoxClick(randomIndex);
  }
}

function checkGameProgress() {
  for (let p of correctPatterns) {
    p = p.map((p) => p - 1);
    b1 = boxes[p[0]].checkType;
    b2 = boxes[p[1]].checkType;
    b3 = boxes[p[2]].checkType;

    if (b1 === "dot" && b2 === "dot" && b3 === "dot") {
      dotScore += 1;
      handleGameEnd(player1, p);
      return;
    } else if (b1 === "cross" && b2 === "cross" && b3 === "cross") {
      crossScore += 1;
      handleGameEnd(player2, p);
      return;
    }
  }
  if (boxesChecked === 9) {
    handleGameDraw();
    return;
  }
}

function handleGameEnd(winner, matchedBoxes) {
  scores[0].innerHTML = dotScore;
  scores[1].innerHTML = crossScore;
  showRestartButton();
  boxes.forEach((box, index) => {
    matchedBoxes.includes(index) ? box.classList.add("winnerBoxes") : null;
  });
  resultBox.innerHTML = `${winner} Wins`;
  gameOver = true;
}

function handleGameDraw() {
  showRestartButton();
  gameOver = true;
  resultBox.innerHTML = "Game Drawn";
}

function startNewGame() {
  dotPlayer.style.backgroundColor = COLOR2;
  crossPlayer.style.backgroundColor = COLOR1;
  restartBtn.style.display = "none";
  boxesChecked = 0;

  isPlayer1 = true;
  gameOver = false;
  boxes.forEach((box) => {
    box.checkType = null;
    box.style.backgroundImage = "none";
    box.style.backgroundColor = "white";
    box.classList.remove("winnerBoxes");
  });
}

function showRestartButton() {
  setTimeout(() => {
    restartBtn.style.display = "flex";
  }, 150);
}

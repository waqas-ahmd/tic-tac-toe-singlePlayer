const dot = { image: "url(/public/dot.svg)", title: "dot" };
const cross = { image: "url(/public/cross.svg)", title: "cross" };
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
var playerName = document.querySelector("#playerName");
var playerState = document.querySelector("#playerState");
var restartBtn = document.querySelector(".restartBtn");

startNewGame();

boxes.forEach((box, index) => {
  box.addEventListener("click", () =>
    !gameOver ? handleBoxClick(index) : null
  );
  box.checkType = null;
});

restartBtn.addEventListener("click", startNewGame);

function handleBoxClick(index) {
  var { image, title } = isPlayer1 ? dot : cross;
  if (boxes[index].checkType === null) {
    boxes[index].style.backgroundImage = image;
    boxes[index].checkType = title;
    isPlayer1 = !isPlayer1;
    boxesChecked += 1;
    setTimeout(checkGameProgress, 10);
  }
}

function checkGameProgress() {
  for (let p of correctPatterns) {
    p = p.map((p) => p - 1);
    b1 = boxes[p[0]].checkType;
    b2 = boxes[p[1]].checkType;
    b3 = boxes[p[2]].checkType;

    if (b1 === "dot" && b2 === "dot" && b3 === "dot") {
      handleGameEnd(player1, p);
      return;
    } else if (b1 === "cross" && b2 === "cross" && b3 === "cross") {
      handleGameEnd(player2, p);
      return;
    }
  }
  if (boxesChecked === 9) {
    handleGameDraw();
    return;
  }
  setCurrentPlayerName();
}

function handleGameEnd(winner, matchedBoxes) {
  restartBtn.style.display = "block";
  boxes.forEach((box, index) => {
    matchedBoxes.includes(index)
      ? (box.style.backgroundColor = "#441d52")
      : null;
  });
  playerState.innerHTML = " Wins";
  gameOver = true;
}

function handleGameDraw() {
  restartBtn.style.display = "block";
  gameOver = true;
  playerState.innerHTML = "Draw";
  playerName.innerHTML = "Game ";
}

function setCurrentPlayerName() {
  playerName.innerHTML = isPlayer1 ? player1 : player2;
}

function startNewGame() {
  restartBtn.style.display = "none";
  boxesChecked = 0;
  playerState.innerHTML = "'s Turn";
  isPlayer1 = true;
  setCurrentPlayerName();
  gameOver = false;
  boxes.forEach((box) => {
    box.checkType = null;
    box.style.backgroundImage = "none";
    box.style.backgroundColor = "white";
  });
}

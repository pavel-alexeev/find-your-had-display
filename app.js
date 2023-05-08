const gameStart = document.querySelector("#starting");
const openBtn = document.querySelector("#openBtn");
const elementP = document.createElement("p");
const elementP2 = document.createElement("p");
const input = document.createElement("input");
const nextBtn = document.createElement("button");
const div = document.createElement("div");
const div2 = document.createElement("div");
const playNext = document.querySelector("#playNext");
const hTwoElement = document.createElement("h2");

let areaWidth = 0;
let areaHeight = 0;
let holesPercentage = 0;

const hat = "./images/hat.svg";
const hole = "./images/hole-svgrepo-com.png";
const fieldCharacter = "./images/field.svg";
let pathCharacter = "./images/downDir.svg";
let ground = [];
let move;
let difficultyLevel;
let steps = 0;

let indexH = 0;
let indexW = 0;

// First page start game butto
openBtn.addEventListener("click", () => {
  difficultyLevels();
});

// Ask player to choose difficulty level
function difficultyLevels() {
  while (gameStart.firstChild) {
    gameStart.removeChild(gameStart.lastChild);
  }

  const difficultyContainer = document.createElement("div");
  const easyLevel = document.createElement("input");
  const mediumLevel = document.createElement("input");
  const hardLevel = document.createElement("input");
  gameStart.appendChild(elementP);
  elementP.innerHTML = `Choose difficulty level`;
  gameStart.appendChild(difficultyContainer);
  difficultyContainer.id = "levelsContainer";
  difficultyContainer.appendChild(easyLevel);
  easyLevel.id = "easyLevel";
  easyLevel.type = "button";
  easyLevel.value = "EASY";
  easyLevel.addEventListener(
    "click",
    () => {
      difficultyLevel = "easy";
      areaWidth = 8;
      areaHeight = 6;
      holesPercentage = 23;
      elementP.innerHTML = "";
      steps = 0;
      ground = [];
      pathCharacter = "./images/downDir.svg";
      myField = new Field(
        Field.generateField(areaWidth, areaHeight, holesPercentage)
      );
      startNewGame();
    },
    { once: true }
  );
  difficultyContainer.appendChild(mediumLevel);
  mediumLevel.id = "mediumLevel";
  mediumLevel.type = "button";
  mediumLevel.value = "MEDIUM";
  mediumLevel.addEventListener(
    "click",
    () => {
      difficultyLevel = "medium";
      areaWidth = 18;
      areaHeight = 15;
      holesPercentage = 26;
      elementP.innerHTML = "";
      steps = 0;
      ground = [];
      pathCharacter = "./images/downDir.svg";
      myField = new Field(
        Field.generateField(areaWidth, areaHeight, holesPercentage)
      );
      startNewGame();
    },
    { once: true }
  );
  difficultyContainer.appendChild(hardLevel);
  hardLevel.id = "hardLevel";
  hardLevel.type = "button";
  hardLevel.value = "HARD";
  hardLevel.addEventListener(
    "click",
    () => {
      difficultyLevel = "hard";
      areaWidth = 25;
      areaHeight = 20;
      holesPercentage = 30;
      elementP.innerHTML = "";
      steps = 0;
      ground = [];
      pathCharacter = "./images/downDir.svg";
      myField = new Field(
        Field.generateField(areaWidth, areaHeight, holesPercentage)
      );
      startNewGame();
    },
    { once: true }
  );
}

// Games page function
function startNewGame() {
  const chronometer = document.createElement("p");
  while (gameStart.firstChild) {
    gameStart.removeChild(gameStart.lastChild);
  }
  gameStart.appendChild(
    chronometer
  ).innerHTML = `<span class="minutes">00</span>:<span class="seconds">00</span>:<span class="tens">00</span>`;
  chronometer.id = "chronometer";
  gameStart.appendChild(elementP);
  elementP.innerHTML = `Use arrows buttons below or keyboard arrow buttons to navigate your character`;
  myField.createTable(myField._field);
  const arrowBtn = ["up", "left", "down", "right"];
  const arrowFunctions = [
    "moveUp()",
    "moveLeft()",
    "moveDown()",
    "moveRight()",
  ];
  const arrowDirections = [
    "fa-solid fa-arrow-up",
    "fa-solid fa-arrow-left",
    "fa-solid fa-arrow-down",
    "fa-solid fa-arrow-right",
  ];
  for (let i = 0; i < arrowBtn.length; i++) {
    const arrows = gameStart.appendChild(document.createElement("div"));
    arrows.className = arrowBtn[i];
    arrows.setAttribute("onClick", arrowFunctions[i]);
    const icons = document.createElement("i");
    arrows.appendChild(icons);
    icons.className = arrowDirections[i];
  }
}

// const appendMinutes = document.querySelector(".minutes");
// const appendSeconds = document.querySelector(".seconds");
// const appendTens = document.querySelector(".tens");
// const startTime = document.querySelector(".start");
// const stopTime = document.querySelector(".stop");
let minutes = 0;
let seconds = 0;
let tens = 0;
let interval;

const clearTimer = () => {
  tens = 0;
  seconds = 0;
  minutes = 0;
};

function startTimer() {
  tens++;
  if (tens < 10) {
    document.querySelector(".tens").innerHTML = "0" + tens;
  }
  if (tens < 100) {
    document.querySelector(".tens").innerHTML = tens;
  }
  if (tens > 99) {
    tens = 0;
    seconds++;
    document.querySelector(".seconds").innerHTML = "0" + seconds;
  }
  if (seconds > 9) {
    document.querySelector(".seconds").innerHTML = seconds;
  }
  if (seconds > 59) {
    seconds = 0;
    minutes++;
    document.querySelector(".minutes").innerHTML = "0" + minutes;
  }
  if (minutes > 9) {
    document.querySelector(".minutes").innerHTML = minutes;
  }
}

// Arrow movement functions of the game
function moveUp() {
  clearInterval(interval);
  interval = setInterval(startTimer, 10);
  move = "u";
  myField.game();
  myField.createTable(myField._field);
}

function moveLeft() {
  clearInterval(interval);
  interval = setInterval(startTimer, 10);
  move = "l";
  myField.game();
  myField.createTable(myField._field);
}

function moveDown() {
  clearInterval(interval);
  interval = setInterval(startTimer, 10);
  move = "d";
  myField.game();
  myField.createTable(myField._field);
}

function moveRight() {
  clearInterval(interval);
  interval = setInterval(startTimer, 10);
  move = "r";
  myField.game();
  myField.createTable(myField._field);
}

class Field {
  constructor(field) {
    this._field = field;
  }

  // Prints 2d array
  print() {
    return this._field.map((row) => row.join("")).join("\n");
  }

  // Generating new field with provided width, height and percentage of holes on the field
  static generateField(width, height, percentage) {
    // Initialize array

    while (!/^[0-9]+$/.test(width)) {
      width = areaWidth;
    }
    while (!/^[0-9]+$/.test(height)) {
      height = areaHeight;
    }
    while (!/^[0-9]+$/.test(percentage)) {
      percentage = holesPercentage;
    }
    for (let i = 0; i < height; i++) {
      ground[i] = []; // Initialize inner array
      for (let j = 0; j < width; j++) {
        const holeOrField = (percentage) => {
          if (percentage >= 0 && percentage <= 100) {
            const ranNum = Math.random() * 100;
            if (ranNum < percentage) {
              return hole;
            } else {
              return fieldCharacter;
            }
          }
        };
        // pathCharacter starting position
        ground[0][0] = pathCharacter;
        ground[i][j] = holeOrField(percentage);
      }
    }
    do {
      ground[Math.floor(Math.random() * (width - 1))][
        Math.floor(Math.random() * (height - 1))
      ] = hat;
    } while (ground[0][0] == hat);
    return ground;
  }

  // Programm asking for next move

  nextMove() {
    if (move === "u") {
      if (indexH <= 0) {
      } else {
        pathCharacter = "./images/upDir.svg";
        indexH--;
        ground[indexH + 1][indexW] = fieldCharacter;
        steps++;
      }
    }
    if (move === "r") {
      if (indexW >= this._field[0].length - 1) {
      } else {
        pathCharacter = "./images/rightDir.svg";
        indexW++;
        ground[indexH][indexW - 1] = fieldCharacter;
        steps++;
      }
    }
    if (move === "d") {
      if (indexH >= this._field[indexH].length - 1) {
      } else {
        pathCharacter = "./images/downDir.svg";
        indexH++;
        ground[indexH - 1][indexW] = fieldCharacter;
        steps++;
      }
    }
    if (move === "l") {
      if (indexW <= 0) {
      } else {
        pathCharacter = "./images/leftDir.svg";
        indexW--;
        ground[indexH][indexW + 1] = fieldCharacter;
        steps++;
      }
    }
  }

  // Field table
  createTable(tableData) {
    let table = document.createElement("table");
    table.id = "table";
    if (difficultyLevel == "easy") {
      table.className = "easyLevelTable";
    }
    if (difficultyLevel == "medium") {
      table.className = "mediumLevelTable";
    }
    if (difficultyLevel == "hard") {
      table.className = "hardLevelTable";
    }
    let tableBody = document.createElement("tbody");

    tableData.forEach(function (rowData) {
      let row = document.createElement("tr");
      rowData.forEach(function (cellData) {
        let cell = document.createElement("td");
        const tableImg = document.createElement("img");
        tableImg.src = cellData;
        tableImg.width = "23";
        tableImg.height = "23";
        if (cellData === pathCharacter) {
          tableImg.id = "pathCharacter";
        }
        cell.appendChild(tableImg);
        row.appendChild(cell);
      });

      tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    document.body.appendChild(table);
  }

  async removeTable() {
    const element = document.getElementById("table");
    element.remove();
  }

  // Asks if player wants to play again
  askForNewGame() {
    const newGameBtn = document.createElement("input");
    const exitBtn = document.createElement("input");
    const newGameDiv = gameStart.appendChild(document.createElement("div"));
    newGameDiv.id = "askForNewGame";
    newGameDiv
      .appendChild(document.createElement("p"))
      .appendChild(document.createTextNode(`Would you like to play again?`));
    newGameDiv.appendChild(newGameBtn);
    newGameBtn.type = "button";
    newGameBtn.value = "YES";
    newGameBtn.onclick = function () {
      document.body.removeChild(table);
      difficultyLevels();
      indexH = 0;
      indexW = 0;
    };
    newGameDiv.appendChild(exitBtn);
    exitBtn.setAttribute = ("onClick", "something()");
    exitBtn.onclick = function () {
      window.close();
    };
    exitBtn.type = "button";
    exitBtn.value = "NO";
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "Enter":
          document.body.removeChild(table);
          difficultyLevels();
          indexH = 0;
          indexW = 0;
          break;
        case "Escape":
          window.close();
      }
    });
  }

  finishTime() {
    if (minutes === 0) {
      minutes = "";
    } else if (minutes > 0 && minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds > 0 && seconds < 10) {
      seconds = "0" + seconds + "";
    } else {
      seconds = seconds;
    }
    if (tens > 0 && tens < 10) {
      tens = "0" + tens;
    } else {
      tens = tens;
    }
    return `${minutes}${minutes > 0 ? ":" : ""}${seconds}.${tens}`;
  }

  stepTime() {
    let time = (
      (Number(minutes * 6000) + seconds * 100 + tens) /
      steps /
      100
    ).toFixed(2);
    return time;
  }

  ifWin() {
    switch (this._field[indexH][indexW]) {
      case hole:
        while (gameStart.firstChild) {
          gameStart.removeChild(gameStart.lastChild);
        }
        gameStart.appendChild(div);
        div.setAttribute("class", "droppedElementLose");
        div.innerHTML = `You lose! Fell into a hole.`;
        clearInterval(interval);
        clearTimer;
        this.askForNewGame();
        break;
      case hat:
        while (gameStart.firstChild) {
          gameStart.removeChild(gameStart.lastChild);
        }
        gameStart.appendChild(div);
        div.setAttribute("class", "droppedElementWin");
        div.innerHTML = `Congratulations!`;
        gameStart.appendChild(div2);
        div2.setAttribute("class", "rightToLeftSlide");
        div2.innerHTML = `You win!`;
        gameStart.appendChild(elementP2);
        elementP2.innerHTML = `You did ${steps} steps in ${this.finishTime()} ${
          minutes == 0 ? "seconds" : ""
        }. Average ${this.stepTime()} seconds per step`;
        elementP2.setAttribute("class", "leftToRightSlide");
        clearInterval(interval);
        clearTimer();
        // clearInterval(interval);
        this.askForNewGame();
        break;
      case fieldCharacter:
        this._field[indexH][indexW] = pathCharacter;
        break;
      default:
        break;
    }
  }

  // Function to start the game
  game() {
    this.print();
    this.removeTable();
    this.nextMove();
    this.ifWin();
  }
}
let myField = new Field(Field.generateField(4, 4, 20));

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      moveUp();
      break;
    case "ArrowRight":
      moveRight();
      break;
    case "ArrowDown":
      moveDown();
      break;
    case "ArrowLeft":
      moveLeft();
      break;
    default:
      break;
  }
});

const gameStart = document.querySelector("#starting");
const openBtn = document.querySelector("#openBtn");
const elementP = document.createElement("p");
const input = document.createElement("input");
const nextBtn = document.createElement("button");
const div = document.createElement("div");

let areaWidth;
let areaHeight;
let holesPercentage;

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";
let currentlyPlaying = true;
let ground = [];

// let hole = document.createElement("img");
// hole.src = "./icons/circle-regular.svg";

let indexH = 0;
let indexW = 0;

openBtn.addEventListener("click", () => {
  while (gameStart.firstChild) {
    gameStart.removeChild(gameStart.lastChild);
  }

  gameStart
    .appendChild(elementP)
    .appendChild(document.createTextNode("Type field width(number):"));
  gameStart.appendChild(input);
  input.setAttribute("id", "input");
  input.id = "width";

  gameStart.appendChild(nextBtn).appendChild(document.createTextNode("Next"));
  nextBtn.setAttribute("id", "next");
  nextBtn.setAttribute("onclick", "toHeight()");
});

function toHeight() {
  areaWidth = document.getElementById("width").value;
  input.setAttribute("id", "height");
  elementP.innerHTML = "Type field height(number):";
  input.value = "";
  nextBtn.setAttribute("onclick", "toHolesPercentage()");
  console.log(areaWidth);
  console.log(areaHeight);
}

function toHolesPercentage() {
  areaHeight = document.getElementById("height").value;
  elementP.innerHTML = "How many percent of field will be holes:";
  input.value = "";
  input.setAttribute("id", "holesPercent");
  nextBtn.setAttribute("onclick", "fireUpGame()");
}

function fireUpGame() {
  holesPercentage = document.getElementById("holesPercent").value;

  console.log(areaWidth);
  console.log(areaHeight);
  console.log(holesPercentage);

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
      // prompt(
      //   "Welcome to the 'Find Your Hat' game. Press 'Enter' to start the game."
      // );

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
          // i++ needs to be j++
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
      // let move = prompt(
      //   "Your next move? 'u' for up, 'l' for left, 'd' for down, 'r' for right: "
      // );
      if (move === "u") {
        if (indexH <= 0) {
          console.log("You lose! Out of boundary.");
          currentlyPlaying = false;
        } else {
          indexH--;
        }
      }
      if (move === "r") {
        if (indexW >= this._field[0].length - 1) {
          console.log("You lose! Out of boundary.");
          currentlyPlaying = false;
        } else {
          indexW++;
        }
      }
      if (move === "d") {
        if (indexH >= this._field[indexH].length - 1) {
          console.log("You lose! Out of boundary.");
          currentlyPlaying = false;
        } else {
          indexH++;
        }
      }
      if (move === "l") {
        if (indexW <= 0) {
          console.log("You lose! Out of boundary.");
          currentlyPlaying = false;
        } else {
          indexW--;
        }
      }
    }

    indexOfItem(array2d, item) {
      let index = [].concat
        .apply([], [].concat.apply([], array2d))
        .indexOf(item);

      // return "false" if the item is not found
      if (index === -1) {
        return false;
      }

      // Use any row to get the rows' array length
      // Note, this assumes the rows are arrays of the same length
      let numColumns = array2d[0].length;

      // row = the index in the 1d array divided by the row length (number of columns)
      let row = parseInt(index / numColumns);

      // col = index modulus the number of columns
      let col = index % numColumns;
      return [row, col];
    }

    createTable(tableData) {
      let table = document.createElement("table");
      table.id = "table";
      let tableBody = document.createElement("tbody");

      tableData.forEach(function (rowData) {
        let row = document.createElement("tr");

        rowData.forEach(function (cellData) {
          let cell = document.createElement("td");
          cell.appendChild(document.createTextNode(cellData));
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

    ifWin() {
      switch (this._field[indexH][indexW]) {
        case hole:
          console.log("You lose! Fell into a hole.");
          currentlyPlaying = false;
          break;
        case hat:
          console.log("Congratulations! You win!");
          currentlyPlaying = false;
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
      indexH = 0;
      indexW = 0;

      while (currentlyPlaying) {
        console.log(this.print());
        if (currentlyPlaying) {
          // this.removeTable();
          this.removeTable();
          this.createTable(this._field);

          this.nextMove();
          this.ifWin();
        }
      }
      let playAgain = prompt(
        "Would you like to play again? Press 'y' for yes or any other key to quit."
      );
      if (playAgain === "y") {
        currentlyPlaying = true;
        indexH = 0;
        indexW = 0;
        ground = Field.generateField(ground[0].length, ground.length, 25);
        this.game();
      } else console.log("Thanks for playing!");
    }
  }

  const myField = new Field(Field.generateField());

  myField.game();
}

// nextBtn.addEventListener("click", () => {

//   nextBtn.addEventListener("click", () => {
//     areaHeight = document.getElementById("height").value;
//     elementP.innerHTML = "How many percent of field will be holes:";
//     input.value = "";
//     input.setAttribute("id", "holesPercent");

//     nextBtn.addEventListener("click", () => {
//       holesPercentage = document.getElementById("holesPercent").value;
//       elementP.innerHTML = "please move";
//       input.value = "";
//       input.setAttribute("id", "move");
//       // while (gameStart.firstChild) {
//       //   gameStart.removeChild(gameStart.lastChild);
//       // }
//       // gameStart.appendChild(input);
//       // input.type = "text";
//       // input.id = "input";
//       // input.value = "Enter number";
//       // gameStart
//       //   .appendChild(nextBtn)
//       //   .appendChild(document.createTextNode("Next"));
//       // nextBtn.setAttribute("id", "next");
//     });

//   });
// });

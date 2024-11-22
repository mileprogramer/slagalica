import possibleResult from "./Results.js";
import SlagalicaOption from "./Option.js";
import BoxGuesses from "./BoxGuesses.js";
import PrintResult from "./PrintResult.js";
class Game {
    constructor(gameBody) {
        this.elements = ["skocko", "karo", "tref", "pik", "srce", "zvezda"];
        this.ROWS_TO_TRY = 6;
        this.handleAddOption = (value, image) => {
            this.userCombination.push(value);
            this.boxGuesses.updateCell(this.index, this.indexRow, image);
            this.index++;
            if (this.userCombination.length === 4) {
                this.handleGame();
            }
        };
        this.gameBody = gameBody;
        this.index = 0;
        this.indexRow = 0;
        this.userCombination = [];
        this.options = [];
        this.winningCombination = this.generateWinningCombination();
        this.boxGuesses = new BoxGuesses(this.gameBody, this.ROWS_TO_TRY);
        this.printResult = new PrintResult(this.gameBody, this.ROWS_TO_TRY);
        this.generateHtml();
        this.handleAddOption.bind(this);
        this.startGame();
        console.log(this.winningCombination);
    }
    generateHtml() {
        this.gameBody.innerHTML += `
            <div class='options'>
                ${this.elements.map(element => `<div class="element">
                        <img data-sign="${element}" src="img/${element}.png" alt="">
                    </div>`).join("")}
            </div>
            <div class="delete"><button>X</button></div>
        </div>
        `;
    }
    startGame() {
        var _a;
        (_a = document.querySelector(".delete")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => this.undoSign());
        let options = document.querySelectorAll(".options .element");
        for (let i = 0; i < this.elements.length; i++) {
            this.options.push(new SlagalicaOption(this.elements[i], options[i], this.handleAddOption));
        }
    }
    handleGame() {
        let results = this.checkCombination();
        this.printResult.paint(results, this.indexRow);
        let winOrNot = results.filter(target => target === possibleResult.onPlace);
        if (winOrNot.length === 4) {
            setTimeout(() => {
                confirm("YOU WIN CONGRATS!!!! Do you want to play again");
            }, 100);
        }
        else if (this.indexRow === this.ROWS_TO_TRY - 1) {
            this.boxGuesses.printWinningResults(this.winningCombination);
            if (confirm("You loose, do you want do play again")) {
                this.newGame();
            }
            else
                this.stopGame();
        }
        this.indexRow++;
        this.index = 0;
        this.userCombination = [];
    }
    stopGame() {
        this.options.forEach(option => option.removeEventClick());
    }
    newGame() {
        this.gameBody.innerHTML = "";
        new Game(this.gameBody);
    }
    generateWinningCombination() {
        let copyElements = [...this.elements];
        let winningCombination = [];
        for (let i = 4; i > 0; i--) {
            let randomNumber = Math.floor(Math.random() * (i + 1));
            winningCombination.push(copyElements[randomNumber]);
            copyElements.splice(randomNumber, 1);
        }
        return winningCombination;
    }
    checkCombination() {
        const resultArray = [];
        const remainingWinning = [...this.winningCombination];
        for (let i = 0; i < this.userCombination.length; i++) {
            if (this.userCombination[i] === remainingWinning[i]) {
                resultArray.push(possibleResult.onPlace);
                remainingWinning[i] = null;
            }
            else {
                resultArray.push(null);
            }
        }
        for (let i = 0; i < this.userCombination.length; i++) {
            if (resultArray[i] === null) {
                const matchIndex = remainingWinning.indexOf(this.userCombination[i]);
                if (matchIndex !== -1) {
                    resultArray[i] = false;
                    remainingWinning[matchIndex] = null;
                }
                else {
                    resultArray[i] = possibleResult.notInCombination;
                }
            }
        }
        return resultArray;
    }
    undoSign() {
        if (this.index === 0)
            return;
        this.userCombination.pop();
        this.index--;
        this.boxGuesses.removeImageFromCell(this.index, this.indexRow);
    }
}
export default Game;

import possibleResult from "./Results.js";
import {GameElements} from "./Types.js";
import SlagalicaOption from "./Option.js";
import BoxGuesses from "./BoxGuesses.js";
import PrintResult from "./PrintResult.js";


class Game {
    protected options :Array<SlagalicaOption>;
    protected boxGuesses :BoxGuesses;
    protected printResult :PrintResult;
    protected gameBody :Element;
    protected index :number;
    protected indexRow :number;
    protected userCombination :Array<GameElements>;
    protected winningCombination :Array<GameElements>;
    private elements :Array<GameElements> = ["skocko", "karo", "tref", "pik", "srce", "zvezda"];
    private readonly ROWS_TO_TRY = 6;

    constructor(gameBody :Element) {
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
        console.log(this.winningCombination)
    }

    protected generateHtml() {
        this.gameBody.innerHTML +=  `
            <div class='options'>
                ${this.elements.map(element =>
                    `<div class="element">
                        <img data-sign="${element}" src="img/${element}.png" alt="">
                    </div>`
                ).join("")}
            </div>
            <div class="delete"><button>X</button></div>
        </div>
        `;
    }

    protected startGame() :void {
        document.querySelector(".delete")?.addEventListener("click", () => this.undoSign())
        let options = document.querySelectorAll(".options .element")
        for(let i = 0; i<this.elements.length; i++) {
            this.options.push(
                new SlagalicaOption(this.elements[i], options[i], this.handleAddOption)
            );
        }
    }

    protected handleAddOption = (value :GameElements, image :HTMLImageElement) => {
        this.userCombination.push(value);
        this.boxGuesses.updateCell(this.index, this.indexRow, image);
        this.index++;
        
        if(this.userCombination.length === 4) {
            this.handleGame();
        }
    }

    protected handleGame() :void {
        
        let results = this.checkCombination();
        this.printResult.paint(results, this.indexRow);
        let winOrNot = results.filter(target => target === possibleResult.onPlace)

        if(winOrNot.length === 4) {

            setTimeout(() => {
                confirm("YOU WIN CONGRATS!!!! Do you want to play again");
            }, 100)
        }
        else if(this.indexRow === this.ROWS_TO_TRY -1) {

            this.boxGuesses.printWinningResults(this.winningCombination);
            if(confirm("You loose, do you want do play again")) {
                this.newGame();
            }
            else this.stopGame();
        }

        this.indexRow++
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

    protected generateWinningCombination() :Array<GameElements> {
        let copyElements :Array<GameElements> = [...this.elements];
        let winningCombination  :Array<GameElements> = [];
        for(let i = 4; i > 0; i--) {
            let randomNumber = Math.floor(Math.random() * (i + 1));
            winningCombination.push(copyElements[randomNumber]);
            copyElements.splice(randomNumber, 1);
        }
        return winningCombination;
    }

    protected checkCombination() :Array<boolean | null> {
        const resultArray: Array<boolean | null> = [];
        const remainingWinning: (string | null)[] = [...this.winningCombination];
        
        for (let i = 0; i < this.userCombination.length; i++) {
            if (this.userCombination[i] === remainingWinning[i]) {
                resultArray.push(possibleResult.onPlace); 
                remainingWinning[i] = null;
            } else {
                resultArray.push(null); 
            }
        }

        for (let i = 0; i < this.userCombination.length; i++) {
            if (resultArray[i] === null) {
                const matchIndex = remainingWinning.indexOf(this.userCombination[i]);

                if (matchIndex !== -1) {
                    resultArray[i] = false; 
                    remainingWinning[matchIndex] = null; 
                } else {
                    resultArray[i] = possibleResult.notInCombination; 
                }
            }
        }
        return resultArray;
    }

    undoSign() {
        if(this.index === 0) return;
        this.userCombination.pop();
        this.index--;
        this.boxGuesses.removeImageFromCell(this.index, this.indexRow);
    }
}

export default Game;
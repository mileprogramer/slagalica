import { GameElements } from "Types.js";

export default class BoxGuesses{
    numberOfRows :number;
    gameBody :Element;
    guessesRows :NodeListOf<HTMLElement>

    constructor(gameBody :Element, numberOfRows :number) {
        this.numberOfRows = numberOfRows;
        this.gameBody = gameBody;
        this.generateBox();
        this.guessesRows = document.querySelectorAll(".guesses-row")
        // i have to add some delay because the browser mostly did not finish with updating the dom
        setTimeout(() => this.guessesRows = document.querySelectorAll(".guesses-row"), 100) 
    }

    protected generateBox() {
        let guesses = ``;
        for(let i =0; i<this.numberOfRows; i++) {
            guesses += `
            <div class="guesses-row">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>`;
        }
        guesses += `
        <div class="win-row">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>`;
        this.gameBody.innerHTML +=  `
            <div class='guesses'>
                ${guesses}
            </div>`;
    }

    updateCell(index :number, indexRow :number, image :HTMLImageElement) {
        let row = this.guessesRows[indexRow]
        let cells = row.querySelectorAll("div");
        cells[index].appendChild(image.cloneNode());
    }   

    removeImageFromCell(index :number, indexRow :number) {
        console.log(index, indexRow);
        let row = this.guessesRows[indexRow]
        let cells = row.querySelectorAll("div");
        cells[index].innerHTML = "";
    }

    printWinningResults(winningCombination :Array<GameElements>) {
        let winRows = document.querySelectorAll(".win-row div");
        if(!winRows) return;

        for(let i = 0; i< winRows.length; i++) {
            winRows[i].innerHTML = `<img src='img/${winningCombination[i]}.png'>`
        }
    }

}
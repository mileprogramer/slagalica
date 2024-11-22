export default class BoxGuesses {
    constructor(gameBody, numberOfRows) {
        this.numberOfRows = numberOfRows;
        this.gameBody = gameBody;
        this.generateBox();
        this.guessesRows = document.querySelectorAll(".guesses-row");
        // i have to add some delay because the browser mostly did not finish with updating the dom
        setTimeout(() => this.guessesRows = document.querySelectorAll(".guesses-row"), 100);
    }
    generateBox() {
        let guesses = ``;
        for (let i = 0; i < this.numberOfRows; i++) {
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
        this.gameBody.innerHTML += `
            <div class='guesses'>
                ${guesses}
            </div>`;
    }
    updateCell(index, indexRow, image) {
        let row = this.guessesRows[indexRow];
        let cells = row.querySelectorAll("div");
        cells[index].appendChild(image.cloneNode());
    }
    removeImageFromCell(index, indexRow) {
        console.log(index, indexRow);
        let row = this.guessesRows[indexRow];
        let cells = row.querySelectorAll("div");
        cells[index].innerHTML = "";
    }
    printWinningResults(winningCombination) {
        let winRows = document.querySelectorAll(".win-row div");
        if (!winRows)
            return;
        for (let i = 0; i < winRows.length; i++) {
            winRows[i].innerHTML = `<img src='img/${winningCombination[i]}.png'>`;
        }
    }
}

export default class PrintResult {
    constructor(gameBody, rows) {
        this.gameBody = gameBody;
        this.rows = rows;
        this.generateHTML();
        this.outputRows = document.querySelectorAll(".output-row");
        setTimeout(() => this.outputRows = document.querySelectorAll(".output-row"), 100);
    }
    generateHTML() {
        let output = `<div class="output">`;
        for (let i = 0; i < this.rows; i++) {
            output += `
            <div class="output-row">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>`;
        }
        output += `</div>`;
        this.gameBody.innerHTML += output;
    }
    paint(results, indexRow) {
        let outputRow = this.outputRows[indexRow];
        let fields = outputRow.querySelectorAll("div");
        results.sort((a, b) => {
            if (a === true && b !== true)
                return -1;
            if (a !== true && b === true)
                return 1;
            if (a === false && b !== false)
                return -1;
            if (a !== false && b === false)
                return 1;
            return 0;
        });
        for (let i = 0; i < results.length; i++) {
            if (results[i] === true) {
                fields[i].style.backgroundColor = "red";
            }
            else if (results[i] === false) {
                fields[i].style.backgroundColor = "yellow";
            }
        }
    }
}
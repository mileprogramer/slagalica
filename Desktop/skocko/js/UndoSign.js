export default class UndoSign {
    constructor(userCombination, index, indexRow, guessesRows) {
        var _a;
        this.userCombination = userCombination;
        this.index = index;
        this.indexRow = indexRow;
        this.guessesRows = guessesRows;
        (_a = document.querySelector(".delete")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => this.undoChoosenSign());
    }
    undoChoosenSign() {
        let fields = this.guessesRows[this.indexRow].querySelectorAll("div");
        let field = fields[this.index];
        field.innerHTML = "";
        this.userCombination.pop();
        this.index--;
    }
    removeEvent() {
        removeEventListener("click", this.undoChoosenSign);
    }
}

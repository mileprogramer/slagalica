import {GameElements} from "./Types.js";

export default class SlagalicaOption {
    public value :GameElements;
    public divElement :Element;

    constructor(value :GameElements, divElement: Element, public updateUserCombination: (value: GameElements, image :HTMLImageElement) => void) {
        this.value = value;
        this.divElement = divElement;
        this.divElement.addEventListener("click", () => this.click())
        this.updateUserCombination = updateUserCombination
    }

    click() {
        let value = this.value;
        let image = this.divElement.querySelector("img");
        if(image) {
            this.updateUserCombination(value, image)
        }
    }

    removeEventClick() {
        this.divElement.removeEventListener("click", this.click);
    }
}
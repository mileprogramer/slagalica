import Game from './Game.js';
(function () {
    let gameBody = document.querySelector(".game-body");
    if (gameBody) {
        const gameController = new Game(gameBody);
    }
})();

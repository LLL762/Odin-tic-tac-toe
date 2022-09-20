import { Gameboard } from "./scripts/gameboard";
import { Player, PlayerSymbols } from "./scripts/player";
import css from "./style.css";
require("./index.html");

console.log("pedro");

const pedro = Player(1, "Pedro");
const pedra = Player(2, "Pedra");
const gameboard = Gameboard(pedro, pedra);
const newGameBtn = document.getElementById("new-game-btn");

newGameBtn.addEventListener("click", () => gameboard.startNewGame());

const playerDisplay = (() => {
  const currPlayerDisplay = document.getElementById("curr-player-display");

  const obsUpdate = (eventName, oldPlayer, newPlayer) => {
    if (eventName === "player-change")
      currPlayerDisplay.firstChild.textContent = newPlayer.name;
  };

  return { obsUpdate };
})();

gameboard.initBoard();
gameboard.startNewGame();

gameboard.obsHelper.addObserver(playerDisplay);

console.log(PlayerSymbols.getCircle());

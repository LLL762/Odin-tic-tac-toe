import { GameBoardController } from "./scripts/game-board/gameboard-controller";
import { GameInfoController } from "./scripts/game-info/game-info-controller";
import css from "./style.css";
require("./index.html");

console.log("pedro");

GameBoardController.initGameboard();
GameBoardController.getObsHelper().addObserver(GameInfoController);
GameInfoController.init(GameBoardController.getGameBoard());

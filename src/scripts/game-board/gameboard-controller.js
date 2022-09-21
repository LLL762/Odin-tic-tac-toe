import { BoardViewManager } from "./board-view-manager";
import { GameBoardService } from "./game-board-service";
import { GameOverService } from "./game-over-service";
import { Gameboard } from "./gameboard";
import { Player, PlayerSymbols } from "../player";
import { EventNames, ObservableHelper } from "../observable-helper";

const GameBoardController = (() => {
  const pedro = Player(1, "Pedro");
  const pedra = Player(2, "Pedra");
  pedra.symbol = PlayerSymbols.getCircle();
  const gameboard = Gameboard(pedro, pedra);
  const newGameBtn = document.getElementById("new-game-btn");
  const obsHelper = ObservableHelper();

  const getObsHelper = () => obsHelper;

  const initGameboard = () =>
    BoardViewManager.initBoard(gameboard.getBoard(), cellOnclick);

  const clearGameBoard = () => BoardViewManager.clearBoard();

  const cellOnclick = (event) => playerMoveAction(event);

  const playerMoveAction = (event) => {
    const cell = event.currentTarget;
    const cellX = Number(cell.id.split("-")[0]);
    const cellY = Number(cell.id.split("-")[1]);
    let wins = [];

    GameBoardService.playerMoveAction(cellX, cellY, gameboard);
    cell.removeEventListener("click", cellOnclick);
    BoardViewManager.markCell(
      cell,
      PlayerSymbols.getTemplate(gameboard.getCurrentPlayer().symbol)
    );

    wins = GameOverService.isGameOver(gameboard, cellX, cellY);

    if (wins.length > 1) {
      wins.forEach((cell) => {
        BoardViewManager.highlighcell(cell[0], cell[1]);
      });

      obsHelper.notifyObservers(
        EventNames.getWin(),
        gameboard.getCurrentPlayer(),
        2
      );

      BoardViewManager.clearCellsOnClick(cellOnclick);
      BoardViewManager.gameOver();
    }

    if (wins.length == 1) {
      obsHelper.notifyObservers(EventNames.getTie(), 1, 2);
    }

    gameboard.changePlayer();
  };

  const newGameAction = () => {
    GameBoardService.startNewGame(gameboard);
    BoardViewManager.clearBoard(cellOnclick);

    obsHelper.notifyObservers(EventNames.getNewGame(), 1, 2);
  };

  newGameBtn.addEventListener("click", () => newGameAction(event));

  const getGameBoard = () => gameboard;

  return { initGameboard, clearGameBoard, getObsHelper, getGameBoard };
})();

export { GameBoardController };

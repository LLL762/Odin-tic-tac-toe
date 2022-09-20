import { BoardViewManager } from "./board-view-manager";
import { GameBoardService } from "./game-board-service";
import { GameOverService } from "./game-over-service";
import { Gameboard } from "./gameboard";
import { Player, PlayerSymbols } from "./player";

const GameBoardController = (() => {
  const pedro = Player(1, "Pedro");
  const pedra = Player(2, "Pedra");
  pedra.symbol = PlayerSymbols.getCircle();
  const gameboard = Gameboard(pedro, pedra);
  const newGameBtn = document.getElementById("new-game-btn");

  const initGameboard = () =>
    BoardViewManager.initBoard(gameboard.getBoard(), cellOnclick);

  const clearGameBoard = () => BoardViewManager.clearBoard();

  const cellOnclick = (event) => playerMoveAction(event);

  const playerMoveAction = (event) => {
    const cell = event.currentTarget;
    const cellX = Number(cell.id.split("-")[0]);
    const cellY = Number(cell.id.split("-")[1]);

    GameBoardService.playerMoveAction(cellX, cellY, gameboard);
    cell.removeEventListener("click", cellOnclick);
    BoardViewManager.markCell(
      cell,
      PlayerSymbols.getTemplate(gameboard.getCurrentPlayer().symbol)
    );

    console.log(GameOverService.isGameOver(gameboard, cellX, cellY));

    gameboard.changePlayer();
  };

  const newGameAction = (event) => {
    GameBoardService.startNewGame(gameboard);
    BoardViewManager.clearBoard(cellOnclick);
  };

  newGameBtn.addEventListener("click", (event) => newGameAction(event));

  return { initGameboard, clearGameBoard };
})();

export { GameBoardController };

import { EventNames } from "../observable-helper";
import { GameInfoManager } from "./game-info-view-manager";

const init = (board) => {
  GameInfoManager.displayCurrentPlayerInfos(board.getCurrentPlayer());
  board.getObsHelper().addObserver(GameInfoController);
};

const GameInfoController = (() => {
  const obsUpdate = (eventName, oldValue, newValue) => {
    switch (eventName) {
      case EventNames.getWin():
        GameInfoManager.setGameStatusText(`${oldValue.name} wins !`);
        break;

      case EventNames.getTie():
        GameInfoManager.setGameStatusText(`tie !!!!`);
        break;

      case EventNames.getNewGame():
        GameInfoManager.setGameStatusText("");
        break;

      case EventNames.getPlayerChanged():
        GameInfoManager.displayCurrentPlayerInfos(newValue);
        break;

      default:
        break;
    }
  };

  return { obsUpdate, init };
})();

export { GameInfoController };

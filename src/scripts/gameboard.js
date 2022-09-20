import { ObservableHelper } from "./observable-helper";
import { PlayerSymbols } from "./player";

const Gameboard = (player1, player2) => {
  const emptyBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const getEmptyBoard = () => {
    return JSON.parse(JSON.stringify(emptyBoard));
  };

  const obsHelper = ObservableHelper();

  let board = getEmptyBoard();
  let filledCells = 0;
  let currentPlayer = player1;

  const setCurrentPlayer = (player) => {
    obsHelper.notifyObservers("player-change", currentPlayer, player);
    currentPlayer = player;
  };

  const changePlayer = () => {
    currentPlayer = currentPlayer == player1 ? player2 : player1;
  };

  const getCurrentPlayer = () => {
    return JSON.parse(JSON.stringify(currentPlayer));
  };

  const resetBoard = () => {
    board = getEmptyBoard();
    filledCells = 0;
    console.log(board);
  };

  const startNewGame = () => {
    resetBoard();
    player1.symbol = PlayerSymbols.getCross();
    player2.symbol = PlayerSymbols.getCircle();
  };

  const markCell = (cellX, cellY) => {
    const oldValue = board[cellX][cellY];

    if (oldValue !== 0) {
      throw new Error("Cell not empty");
    }

    obsHelper.notifyObservers(
      `cell ${cellX}-${cellY} marked`,
      oldValue,
      currentPlayer.symbol
    );
    board[cellX][cellY] = currentPlayer.symbol;
    filledCells++;
  };

  const getBoard = () => JSON.parse(JSON.stringify(board));

  const getFilledCells = () => filledCells;

  return {
    player1,
    player2,
    getCurrentPlayer,
    getBoard,
    resetBoard,
    obsHelper,
    changePlayer,
    markCell,
    startNewGame,
    getFilledCells,
  };
};

export { Gameboard };

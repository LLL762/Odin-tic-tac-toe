import { ObservableHelper } from "./observable-helper";
import { PlayerSymbols } from "./player";
import { Templates } from "./templates";

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
  const maxIndex = emptyBoard.length - 1;
  const boardContainer = document.getElementById("gameboard");

  let board = getEmptyBoard();
  let filledCell = 0;
  let currentPlayer = player1;

  const setCurrentPlayer = (player) => {
    obsHelper.notifyObservers("player-change", currentPlayer, player);
    currentPlayer = player;
  };

  const getCurrentPlayer = () => {
    return JSON.parse(JSON.stringify(currentPlayer));
  };

  const resetBoard = () => {
    console.log(emptyBoard);
    board = getEmptyBoard();
    filledCell = 0;
    boardContainer.innerHTML = "";
    initBoard();
  };

  const startNewGame = () => {
    resetBoard();
    player1.symbol = PlayerSymbols.getCross();
    player2.symbol = PlayerSymbols.getCircle();
  };

  const initBoard = () => {
    for (let i = 0; i <= maxIndex; i++) {
      createRow(i);
    }
  };

  const createRow = (rowIndex) => {
    for (let i = 0; i <= maxIndex; i++) {
      const cellWrapper = document.createElement("div");
      cellWrapper.innerHTML = Templates.getCell();
      const cell = cellWrapper.firstChild;

      cell.id = `${rowIndex}-${i}`;
      cell.addEventListener("click", playerMoveListener);

      boardContainer.appendChild(cell);
      console.log(boardContainer);
    }
  };

  const playerMoveListener = (event) => playerMove(event);

  const playerMove = (event) => {
    /*    if (player !== currentPlayer) {
      throw new Error("Not your turn");
    } */

    const cell = event.currentTarget;
    const cellX = cell.id.split("-")[0];
    const cellY = cell.id.split("-")[1];

    console.log(cell.id.split("-"));
    cell.removeEventListener("click", playerMoveListener);
    markCell(cellX, cellY);

    cell.innerHTML = PlayerSymbols.getTemplate(currentPlayer.symbol);

    setCurrentPlayer(currentPlayer == player1 ? player2 : player1);

    filledCell++;
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
  };

  const getGameBoard = () => JSON.parse(JSON.stringify(board));

  return {
    player1,
    player2,
    getCurrentPlayer,
    setCurrentPlayer,
    getGameBoard,
    initBoard,
    resetBoard,
    playerMove,
    obsHelper,
    startNewGame,
  };
};

export { Gameboard };

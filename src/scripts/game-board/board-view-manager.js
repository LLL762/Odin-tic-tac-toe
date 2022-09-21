import { Templates } from "../templates";

const BoardViewManager = (() => {
  const boardContainer = document.getElementById("gameboard");
  const newGameBtn = document.getElementById("new-game-btn");

  const initBoard = (board, cellOnclick) => {
    for (let i = 0; i < board.length; i++) {
      createRow(board, i, cellOnclick);
    }
  };

  const createRow = (board, rowIndex, cellOnclick) => {
    for (let i = 0; i < board.length; i++) {
      const cellWrapper = document.createElement("div");
      cellWrapper.innerHTML = Templates.getCell();
      const cell = cellWrapper.firstChild;

      cell.id = `${i}-${rowIndex}`;
      cell.addEventListener("click", cellOnclick);

      boardContainer.appendChild(cell);
    }
  };

  const clearBoard = (cellOnclick) => {
    for (let cell of boardContainer.querySelectorAll(".gameboard-cell")) {
      cell.classList.remove("cell-highlight");
      cell.classList.remove("not-interactive");
      cell.innerHTML = Templates.getEmptySvg();
      cell.addEventListener("click", cellOnclick);
    }
    boardContainer.classList.remove("grey-out");
    newGameBtn.classList.remove("pulse");
  };

  const clearCellsOnClick = (cellOnclick) => {
    for (let cell of boardContainer.querySelectorAll(".gameboard-cell")) {
      cell.removeEventListener("click", cellOnclick);
    }
  };

  const markCell = (cell, symbol) => {
    cell.innerHTML = symbol;
    cell.classList.add("not-interactive");
  };

  const gameOver = () => {
    makeAllCellsNotInteractive();
    boardContainer.classList.add("grey-out");
    newGameBtn.classList.add("pulse");
  };

  const makeAllCellsNotInteractive = () => {
    for (let cell of boardContainer.querySelectorAll(".gameboard-cell")) {
      cell.classList.add("not-interactive");
    }
  };

  const highlighcell = (cellX, cellY) => {
    const cellId = `${cellX}-${cellY}`;
    const cell = document.getElementById(cellId);

    cell.classList.add("cell-highlight");
  };

  return {
    initBoard,
    clearBoard,
    markCell,
    highlighcell,
    clearCellsOnClick,
    gameOver,
  };
})();

export { BoardViewManager };

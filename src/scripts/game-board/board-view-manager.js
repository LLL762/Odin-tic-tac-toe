import { Templates } from "../templates";

const BoardViewManager = (() => {
  const boardContainer = document.getElementById("gameboard");

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
      cell.innerHTML = Templates.getEmptySvg();
      cell.addEventListener("click", cellOnclick);
    }
  };

  const clearCellsOnClick = (cellOnclick) => {
    for (let cell of boardContainer.querySelectorAll(".gameboard-cell")) {
      cell.removeEventListener("click", cellOnclick);
    }
  };

  const markCell = (cell, symbol) => {
    cell.innerHTML = symbol;
  };

  const highlighcell = (cellX, cellY) => {
    const cellId = `${cellX}-${cellY}`;
    console.log(cellId);
    const cell = document.getElementById(cellId);

    cell.classList.add("cell-highlight");
  };

  return { initBoard, clearBoard, markCell, highlighcell, clearCellsOnClick };
})();

export { BoardViewManager };

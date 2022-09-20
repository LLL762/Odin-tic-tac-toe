import { Templates } from "./templates";

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
      cell.innerHTML = Templates.getEmptySvg();
      cell.addEventListener("click", cellOnclick);
      console.log(cell.event);
    }
  };

  const markCell = (cell, symbol) => {
    cell.innerHTML = symbol;
  };

  return { initBoard, clearBoard, markCell };
})();

export { BoardViewManager };

import { PlayerSymbols } from "./player";

const GameOverService = (() => {
  const isGameOver = (gameboard, cellX, cellY) => {
    const playerSymbol = gameboard.getCurrentPlayer().symbol;
    const board = gameboard.getBoard();

    let wins = [];

    if (getNbSymbolsOnLine(board, cellY).get(playerSymbol) == board.length) {
      wins.push(`win on line number ${cellY}`);
    }

    if (getNbSymbolsOnColumn(board, cellX).get(playerSymbol) == board.length) {
      wins.push(`win on column number ${cellX}`);
    }

    if (
      cellX == cellY &&
      getNbSymbolsOnDiagonal(board).get(playerSymbol) == board.length
    ) {
      wins.push("win on diagonal");
    }

    if (
      cellX + cellY == board.length - 1 &&
      getNbSymbolsOnCrossDiagonal(board).get(playerSymbol) == board.length
    ) {
      wins.push("win on cross-diagonal");
    }

    if (wins.length > 0) {
      return wins;
    }

    if (gameboard.getFilledCells() == board.length * board.length) {
      return "tie";
    }

    return "continue";
  };

  const getNbSymbolsOnLine = (board, lineIndex) => {
    let countCross = 0;
    let countCircle = 0;
    let result = [];

    for (let i = 0; i < board.length; i++) {
      result = incrementCount(countCross, countCircle, board[i][lineIndex]);
      countCross = result[0];
      countCircle = result[1];
    }

    return new Map([
      [PlayerSymbols.getCross(), countCross],
      [PlayerSymbols.getCircle(), countCircle],
    ]);
  };

  const getNbSymbolsOnColumn = (board, columnIndex) => {
    let countCross = 0;
    let countCircle = 0;
    let result = [];

    for (let i = 0; i < board.length; i++) {
      result = incrementCount(countCross, countCircle, board[columnIndex][i]);
      countCross = result[0];
      countCircle = result[1];
    }

    return new Map([
      [PlayerSymbols.getCross(), countCross],
      [PlayerSymbols.getCircle(), countCircle],
    ]);
  };

  const getNbSymbolsOnDiagonal = (board) => {
    let countCross = 0;
    let countCircle = 0;
    let result = [];

    for (let i = 0; i < board.length; i++) {
      result = incrementCount(countCross, countCircle, board[i][i]);
      countCross = result[0];
      countCircle = result[1];
    }

    return new Map([
      [PlayerSymbols.getCross(), countCross],
      [PlayerSymbols.getCircle(), countCircle],
    ]);
  };

  const getNbSymbolsOnCrossDiagonal = (board) => {
    const maxIndex = board.length - 1;
    let countCross = 0;
    let countCircle = 0;
    let result = [];

    for (let i = 0; i < board.length; i++) {
      result = incrementCount(countCross, countCircle, board[i][maxIndex - i]);
      countCross = result[0];
      countCircle = result[1];
    }

    return new Map([
      [PlayerSymbols.getCross(), countCross],
      [PlayerSymbols.getCircle(), countCircle],
    ]);
  };

  const incrementCount = (countCross, countCircle, value) => {
    switch (value) {
      case PlayerSymbols.getCross():
        countCross++;
        break;
      case PlayerSymbols.getCircle():
        countCircle++;
        break;
      case 0:
        break;

      default:
        throw new Error("Invalid value");
    }

    return [countCross, countCircle];
  };
  return { isGameOver };
})();

export { GameOverService };

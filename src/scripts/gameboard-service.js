import { PlayerSymbols } from "./player";

const GameBoardService = (() => {
  const isGameOver = (board) => {
    let wins = [];

    if (getNbSymbolsOnLine(cellX, playerSymbol) == maxIndex) {
      wins.push(`win on line number ${cellX}`);
    }

    if (getNbSymbolsOnColumn(cellY, playerSymbol) == maxIndex) {
      wins.push(`win on column number ${cellY}`);
    }

    if (cellX == cellY && getNbSymbolsOnDiagonal(playerSymbol) == maxIndex) {
      wins.push("win on diagonal");
    }

    if (
      cellX + cellY == board.length - 1 &&
      getNbSymbolsOnCrossDiagonal(playerSymbol) == maxIndex
    ) {
      wins.push("win on cross-diagonal");
    }

    if (wins.length > 0) {
      return "win";
    }

    if (filledCell == board.length * board.length) {
      return "tie";
    }

    return "continue";
  };

  const getNbSymbolsOnLine = (board, lineIndex) => {
    let countCross = 0;
    let countCircle = 0;

    while (count < board.length) {
      switch (board[lineIndex][count]) {
        case PlayerSymbols.getCross():
          countCross++;
          break;
        case PlayerSymbols.getCircle():
          countCircle++;
          break;
        default:
          break;
      }
    }

    return count;
  };

  const getNbSymbolsOnColumn = (columnIndex, playerSymbol) => {
    let count = 0;

    while (count < board.length) {
      if (emptyBoard[count][columnIndex] == playerSymbol) {
        count++;
      }
    }

    return count;
  };

  const getNbSymbolsOnDiagonal = (playerSymbol) => {
    let count = 0;

    while (count < board.length) {
      if (emptyBoard[count][count] == playerSymbol) {
        count++;
      }
    }
    return count;
  };

  const getNbSymbolsOnCrossDiagonal = (playerSymbol) => {
    let count = 0;

    while (count < board.length) {
      if (emptyBoard[maxIndex - count][maxIndex - count] == playerSymbol) {
        count++;
      }
    }

    return count;
  };
})();

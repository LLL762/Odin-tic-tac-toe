const Gameboard = (player1, player2) => {
  const emptyBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const board = emptyBoard;
  const maxIndex = board.length - 1;

  let filledCell = 0;
  let currentPlayer = player1;

  const resetBoard = () => {
    board = emptyBoard;
    filledCell = 0;
  };

  const playerMove = (player, cellX, cellY) => {
    if (player.getId() !== currentPlayer.getId()) {
      throw new Error("Not your turn");
    }

    currentPlayer = player === player1 ? player2 : player1;

    filledCell++;
  };

  const markCell = (player, cellX, cellY) => {
    if (emptyBoard[cellX][cellY] !== 0) {
      throw new Error("Cell not empty");
    }

    board[cellIndex] = player === player1 ? 1 : 2;
  };

  const isGameOver = (cellX, cellY, playerSymbol) => {
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

  const getNbSymbolsOnLine = (lineIndex, playerSymbol) => {
    let count = 0;

    while (count < board.length) {
      if (emptyBoard[lineIndex][count] == playerSymbol) {
        count++;
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

  const getGameBoard = () => JSON.parse(JSON.stringify(board));

  return { getGameBoard, resetBoard, playerMove };
};

export { Gameboard };

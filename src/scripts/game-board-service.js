const GameBoardService = (() => {
   
  const playerMoveAction = (cellX, cellY, gameBoard) => {
    gameBoard.markCell(cellX, cellY);
    gameboard.
  };

  const startNewGame = (gameBoard) => {
    gameBoard.resetBoard();
  };

  return { playerMoveAction, startNewGame };
})();

export { GameBoardService };

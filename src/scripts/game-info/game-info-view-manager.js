const GameInfoManager = (() => {
  const gameStatusDisplay = document.getElementById("game-status");
  const currentPlayerInfos = document.getElementById("current-player-infos");

  const setGameStatusText = (text) => {
    gameStatusDisplay.textContent = text;
  };

  const displayCurrentPlayerInfos = (player) => {
    currentPlayerInfos.textContent = `${player.name} turn`;
  };

  return { setGameStatusText, displayCurrentPlayerInfos };
})();

export { GameInfoManager };

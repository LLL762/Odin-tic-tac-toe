import { Templates } from "./templates";

const Player = (nbIn, nameIn, scoreIn, isHumanIn) => {
  let nb = nbIn ?? 1;
  let name = nameIn ?? "Player " + nb;
  let score = scoreIn ?? 0;
  let isHuman = isHumanIn ?? true;
  let symbol = PlayerSymbols.getCross();

  return { nb, name, score, isHuman, symbol };
};

const PlayerSymbols = (() => {
  const cross = "cross";
  const circle = "circle";

  const getCross = () => {
    return cross;
  };

  const getCircle = () => {
    return circle;
  };

  const getTemplate = (symbol) => {
    switch (symbol) {
      case cross:
        return Templates.getCross();
      case circle:
        return Templates.getCircle();
      default:
        return;
    }
  };

  return { getCross, getCircle, getTemplate };
})();

export { Player, PlayerSymbols };

const ObservableHelper = () => {
  const observers = [];
  const addObserver = (observer) => observers.push(observer);
  const removeObserver = (observer) =>
    observers.splice(observers.indexOf(observer), 1);

  const notifyObservers = (eventName, oldValue, newValue) => {
    if (oldValue != newValue) {
      for (let observer of observers) {
        observer.obsUpdate(eventName, oldValue, newValue);
      }
    }
  };
  return { addObserver, removeObserver, notifyObservers };
};

const EventNames = (() => {
  const win = "win";
  const newGame = "newGame";
  const playerChanged = "playerChanged";
  const tie = "tie";

  const getWin = () => win;
  const getNewGame = () => newGame;
  const getPlayerChanged = () => playerChanged;
  const getTie = () => tie;

  return { getWin, getNewGame, getPlayerChanged, getTie };
})();

export { ObservableHelper, EventNames };

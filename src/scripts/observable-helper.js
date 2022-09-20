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

export { ObservableHelper };

const getEmptyDestination = () => ({
  name: ``,
  description: ``,
  pictures: []
});

class DestinationsModel {
  constructor() {
    this._destinations = [];
  }

  setDestinations(destinations) {
    this._destinations = destinations.map((it) => Object.assign({}, it));
  }

  getAll() {
    return this._destinations;
  }

  getDestinationByName(name) {
    return name === ``
      ? getEmptyDestination()
      : this._destinations.find((it) => it.name === name);
  }
}

export default DestinationsModel;

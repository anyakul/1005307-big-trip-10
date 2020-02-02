class Destination {
  constructor(destination) {
    this.name = destination[`name`];
    this.description = destination[`description`];
    this.pictures = destination[`pictures`];
  }

  static parseDestination(destination) {
    return new Destination(destination);
  }

  static parseDestinations(destination) {
    return destination.map(Destination.parseDestination);
  }
}

export default Destination;

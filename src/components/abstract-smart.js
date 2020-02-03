import AbstractComponent from './abstract';

class AbstractSmartComponent extends AbstractComponent {
  rerender() {
    const oldElement = this.getElement();

    this.removeElement();

    oldElement.replaceWith(this.getElement());

    this._recoveryListeners();
  }

  _recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }
}

export default AbstractSmartComponent;
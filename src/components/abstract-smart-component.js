import AbstractComponent from './abstract-component';

class AbstractSmartComponent extends AbstractComponent {
  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  rerender() {
    const oldElement = this.getElement();
    this.removeElement();
    oldElement.replaceWith(this.getElement());
    const newElement = this.getElement();
    newElement.replaceWith(this.getElement());
    this.recoveryListeners();
  }
}

export default AbstractSmartComponent;

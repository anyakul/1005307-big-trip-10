import AbstractComponent from './abstract';

class AbstractSmartComponent extends AbstractComponent {
  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  rerender() {
    const oldElement = this.getElement();   console.log('rerender1oldElement',oldElement);

    this.removeElement();                     console.log('rerender2oldElement',this.getElement());

    oldElement.replaceWith(this.getElement());   console.log('rerender3oldElement',oldElement);

    this.recoveryListeners();
  }
}

export default AbstractSmartComponent;

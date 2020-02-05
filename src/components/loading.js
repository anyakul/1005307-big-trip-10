import AbstractComponent from './abstract';

class LoadingComponent extends AbstractComponent {
  getTemplate() {
    return (
      `<p class="trip-events__msg">Loading...</p>`
    );
  }
}

export default LoadingComponent;

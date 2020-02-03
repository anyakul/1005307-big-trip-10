import AbstractSmartComponent from './abstract-smart';
import {createMenuTemplate} from './templates/site-menu';

const MenuTab = {
  TABLE: `table`,
  STATS: `stats`,
};

const MenuTabName = {
  [MenuTab.TABLE]: `Table`,
  [MenuTab.STATS]: `Stats`,
};

const createMenuTabs = (activeTab) => Object.entries(MenuTabName)
  .map(([tab, name]) => ({tab, name, isActive: tab === activeTab}));

class SiteMenuComponent extends AbstractSmartComponent {
  constructor(activeTab = MenuTab.TABLE) {
    super();

    this._activeTab = activeTab;
    this._onTabChange = null;

    this._onClick = this._onClick.bind(this);
  }

  getTemplate() {
    return createMenuTemplate(createMenuTabs(this._activeTab));
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  setOnTabChange(handler) {
    this._onTabChange = handler;
    this._subscribeOnEvents();
  }

  _subscribeOnEvents() {
    this.getElement().addEventListener(`click`, this._onClick);
  }

  _onClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    const menuTab = evt.target.dataset.menuTab;
    if (this._activeTab === menuTab) {
      return;
    }

    this._activeTab = menuTab;
    this._onTabChange(menuTab);
  }
}

export default SiteMenuComponent;
export {MenuTab};

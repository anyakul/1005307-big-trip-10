import AbstractComponent from './abstract';
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

class SiteMenuComponent extends AbstractComponent {
  constructor(activeTab = MenuTab.TABLE) {
    super();

    this._activeTab = activeTab;
    this._tabs = createMenuTabs(this._activeTab);
  }

  getTemplate() {
    return createMenuTemplate(this._tabs);
  }

  setTabChangeHandler(handler) {
    this.getElement().querySelectorAll(`.trip-tabs__btn`).forEach((tab) => {
      tab.addEventListener(`click`, handler);
    });
  }
}

export default SiteMenuComponent;
export {MenuTab};

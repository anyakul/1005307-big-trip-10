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
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const menuTab = evt.target.dataset.menuTab;
      if (this._activeTab === menuTab) {
        return;
      }

      this._activeTab = menuTab;
      handler(this._activeTab);
    });
  }
}

export default SiteMenuComponent;
export {MenuTab};

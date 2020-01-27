import AbstractComponent from './abstract';
import {createMenuTemplate} from './templates/site-menu';

const MenuTab = {
  TABLE: `table`,
  STATS: `stats`,
};

const ACTIVE_TAB_CLASS = `trip-tabs__btn--active`;

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

  setClickHandler(handler) {
    this._tableTab = this._element.children[0];
    this._statsTab = this._element.children[1];
    this.getElement().querySelectorAll(`.trip-tabs__btn`).forEach((tab) => {
      tab.addEventListener(`click`, handler);
    });
  }

  setActiveTab(active) {
    if (active.value === this._active) {
      return;
    }
    this._element.querySelector(`.${ACTIVE_TAB_CLASS}`).classList.remove(ACTIVE_TAB_CLASS);
    active.classList.add(ACTIVE_TAB_CLASS);
    this._active = active.value;
  }
}

export default SiteMenuComponent;
export {MenuTab};

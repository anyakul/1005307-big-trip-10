import SiteMenuComponent from '../components/site-menu';
import {render} from '../utils/render';

const MenuTab = {
  TABLE: `table`,
  STATS: `stats`,
};

class SiteMenuController {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;

    this._activeTab = MenuTab.TABLE;
    this._siteMenuComponent = null;
    //this._onDataChange = this._onDataChange.bind(this);
  //  this._eventsModel.addDataChangeHandler(this._onDataChange);
   // this._onSiteMenuChange = this._onSiteMenuChange.bind(this);
  }

  render() {

    const menuTabs = Object.values(MenuTab).map((menuTab) => ({
      name: menuTab,
      isActive: menuTab === this._activeTab,
    }));

    this._siteMenuComponent = new SiteMenuComponent(menuTabs);

    render(this._container, this._siteMenuComponent.getElement());
  }

  setMenuChangeHandler(table, stats) {
    this._siteMenuComponent.setClickHandler((evt) => {
      this._siteMenuComponent.setActiveTab(evt.target);
      if (evt.target.value === MenuTab.TABLE) {
        table.show();
        stats.hide();
      } else {
        table.hide();
        stats.show();
      }
    });
  }

  /*_onSiteMenuChange(menuTab) {
    this._eventsModel.setSiteMenu(menuTab);
    this._activeMenuTab = menuTab;
  }

  _onDataChange() {
    this.render();
  }*/
}

export default SiteMenuController;

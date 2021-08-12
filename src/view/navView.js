import View from "./View.js";

class NavView extends View {
  _navContainer = document.querySelector(".nav");
  _whereAmIBtn = document.querySelector(".nav__whereami_btn");
  _displayContainer = document.querySelector(".display-countries");

  // Handler WhereAmI
  addHandlerWhereAmI(handler) {
    this._navContainer.addEventListener(
      "click",
      function (e) {
        e.preventDefault();

        const whereAmI = e.target.closest(".nav__whereami_btn");
        if (!whereAmI) return;

        // hide countries card
        this._hideCountryCardContainer();

        // clear detail page
        this._clearDetailPageContainer();

        // hide pagination container
        this._hidePaginationContainer();

        //render tracked country
        handler();
      }.bind(this)
    );
  }

  // Handler region
  addHandlerFilterRegion(handler) {
    this._navContainer.addEventListener(
      "click",
      function (e) {
        e.preventDefault();

        const region = e.target.closest(".region");
        if (!region) return;
        const regionName = region.getAttribute("data-region");

        // show countrycard container
        this._showCountryCardContainer();

        // clear country cards
        this._displayContainer.innerHTML = "";

        // clear detail page
        this._clearDetailPageContainer();

        //render regional countries
        handler(regionName);
      }.bind(this)
    );
  }
}

export default new NavView();

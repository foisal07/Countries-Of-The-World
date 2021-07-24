import View from "./View.js";

class NavView extends View {
  _navContainer = document.querySelector(".nav");
  _whereAmIBtn = document.querySelector(".nav__whereami_btn");

  // Handler WhereAmI
  addHandlerWhereAmI(handler) {
    this._navContainer.addEventListener(
      "click",
      function (e) {
        e.preventDefault();

        const whereAmI = e.target.closest(".nav__whereami_btn");
        if (!whereAmI) return;

        // clear countries card
        this._clear();

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

        console.log(regionName);

        // clear countries card
        this._clear();

        //render regional countries
        handler(regionName);
      }.bind(this)
    );
  }
}

export default new NavView();

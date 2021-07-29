import View from "./View.js";

class NavView extends View {
  _countryCardConatiner = document.querySelector(".countrycard__container");
  _navContainer = document.querySelector(".nav");
  _whereAmIBtn = document.querySelector(".nav__whereami_btn");
  _displayContainer = document.querySelector(".display-countries");
  _detailPageContainer = document.querySelector(".detailpage__conatiner");
  _neighbourContainer = document.querySelector(".neighbour__container");

  // Handler WhereAmI
  addHandlerWhereAmI(handler) {
    this._navContainer.addEventListener(
      "click",
      function (e) {
        e.preventDefault();

        const whereAmI = e.target.closest(".nav__whereami_btn");
        if (!whereAmI) return;

        // hide countries card
        this._countryCardConatiner.classList.add("hidden");

        // clear detail page
        this._detailPageContainer.innerHTML = "";
        // this._neighbourContainer.innerHTML = "";

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

        // clear countries cards
        this._countryCardConatiner.classList.remove("hidden");
        this._displayContainer.innerHTML = "";

        // clear detail page
        this._detailPageContainer.innerHTML = "";
        // this._neighbourContainer.innerHTML = "";

        //render regional countries
        handler(regionName);
      }.bind(this)
    );
  }
}

export default new NavView();

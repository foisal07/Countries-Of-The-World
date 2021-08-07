import View from "./View.js";

export class CountryView extends View {
  _displayContainer = document.querySelector(".display-countries");
  _pagination = document.querySelector(".pagination");
  _sortingLetter = document.querySelector(".letter");

  // _countryCardContainer = document.querySelector(".countrycard__container");
  // _detailPageContainer = document.querySelector(".detailpage__container");

  addHandlerRenderCountryCard(handler) {
    window.addEventListener("load", handler());
  }

  addHandlerPagination(handler) {
    this._pagination.addEventListener(
      "click",
      function (e) {
        e.preventDefault();

        // get first letter
        const letter = e.target.closest(".letter");
        if (!letter) return;
        const sortingLetter = letter.innerText.toLowerCase();

        //clear container
        this._clearCountryCardContainer();
        handler(sortingLetter);
      }.bind(this)
    );
  }

  addHandlerCountryCard(handler) {
    // handler country card
    this._displayContainer.addEventListener(
      "click",
      function (e) {
        e.preventDefault();

        //get country name
        const country = e.target.closest(".country-card");
        if (!country) return;
        const countryName = country
          .getAttribute("data-country-name")
          .toLowerCase();

        // hide countries card
        this._hideCountryCardContainer();

        // neighbour container country card clear detail page
        this._clearDetailPageContainer();

        // go top
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth",
        });

        //render country detail page
        handler(countryName);
      }.bind(this)
    );
  }
}

export default new CountryView();

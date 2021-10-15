import { CountryView } from "./countryView.js";

class CountryNeighbourView extends CountryView {
  _displayContainer = document.querySelector(".detailpage__container");

  addHandlerCountryCard(handler) {
    // handler country card
    this._displayContainer.addEventListener(
      "click",
      function (e) {
        e.preventDefault();
        e.stopPropagation();

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

        // clear pagination
        this._hidePaginationContainer();

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

export default new CountryNeighbourView();

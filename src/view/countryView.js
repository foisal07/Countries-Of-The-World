import View from "./View.js";

class CountryView extends View {
  _displayContainer = document.querySelector(".display-countries");
  _countryCardContainer = document.querySelector(".countrycard__container");
  _detailPageContainer = document.querySelector(".detailpage__conatiner");

  addHandlerRenderCountryCard(handler) {
    window.addEventListener("load", handler);
  }

  addHandlerCountryCard(handler) {
    // handler country card
    this._displayContainer.addEventListener(
      "click",
      function (e) {
        e.preventDefault();
        const country = e.target.closest(".country-card");
        if (!country) return;
        const countryName = country
          .getAttribute("data-country-name")
          .toLowerCase();

        // hide countries card
        this._countryCardContainer.classList.add("hidden");

        // show detail page
        this._detailPageContainer.classList.remove("hidden");

        //render country detail page
        handler(countryName);
      }.bind(this)
    );
  }
}

export default new CountryView();

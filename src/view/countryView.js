import View from "./View.js";

class CountryView extends View {
  _displayContainer = document.querySelector(".display-countries");

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
        const countryName = country.getAttribute("data-country-name");

        // clear countries card
        this._clear();

        //render country detail page
        handler(countryName);
      }.bind(this)
    );
  }
}

export default new CountryView();

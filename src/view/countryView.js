import View from "./View.js";

export class CountryView extends View {
  _displayContainer = document.querySelector(".display-countries");

  // addHandlerRenderCountryCard(handler) {
  //   window.addEventListener("load", handler());
  // }

  // addHandlerCountryCard(handler) {
  //   // handler country card
  //   this._displayContainer.addEventListener(
  //     "click",
  //     function (e) {
  //       e.preventDefault();

  //       //get country name
  //       const country = e.target.closest(".country-card");
  //       if (!country) return;
  //       const countryName = country
  //         .getAttribute("data-country-name")
  //         .toLowerCase();

  //       // hide countries card
  //       this._hideCountryCardContainer();

  //       // neighbour container country card clear detail page
  //       this._clearDetailPageContainer();

  //       // clear pagination
  //       this._hidePaginationContainer();

  //       // go top
  //       window.scroll({
  //         top: 0,
  //         left: 0,
  //         behavior: "smooth",
  //       });

  //       //render country detail page
  //       handler(countryName);
  //     }.bind(this)
  //   );
  // }
}

export default new CountryView();

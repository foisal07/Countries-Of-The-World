import View from "./View.js";

class CountryPageView extends View {
  _displayContainer = document.querySelector(".detailpage__container");

  addHandlerBackBtn() {
    this._displayContainer.addEventListener(
      "click",
      function (e) {
        const backBtn = e.target.closest(".button--back");
        if (!backBtn) return;

        // clear detail page
        this._displayContainer.innerHTML = "";

        // show country card container
        this._showCountryCardContainer();

        // show pagination container
        this._showPaginationContainer();
      }.bind(this)
    );
  }
}

export default new CountryPageView();

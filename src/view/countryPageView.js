import View from "./View.js";

class CountryPageView extends View {
  _displayContainer = document.querySelector(".detailpage__container");
  _neighbourContainer = document.querySelector(".neighbour__container");

  addHandlerBackBtn(handler) {
    this._displayContainer.addEventListener(
      "click",
      function (e) {
        const backBtn = e.target.closest(".button--back");
        if (!backBtn) return;

        // clear detail page
        this._displayContainer.innerHTML = "";

        handler();
      }.bind(this)
    );
  }
}

export default new CountryPageView();

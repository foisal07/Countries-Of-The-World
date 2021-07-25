import View from "./View.js";

class SearchView extends View {
  _search = document.querySelector(".search");
  _navSearchCountryInput = document.querySelector(".nav__searchCountry__input");

  // Handler search
  addHandlerSearchView(handler) {
    this._search.addEventListener(
      "submit",
      function (e) {
        e.preventDefault();

        // get search query
        const searchedCountry = this._navSearchCountryInput.value.toLowerCase();

        //clear country cards
        this._clear();

        handler(searchedCountry);
      }.bind(this)
    );
  }
}

export default new SearchView();

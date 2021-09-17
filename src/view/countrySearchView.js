import View from "./View.js";

class SearchView extends View {
  _search = document.querySelector(".search");
  _navSearchCountryInput = document.querySelector(".nav__searchCountry__input");
  _autCompleteContainer = document.querySelector(".nav__autocompleteContainer");
  _errorMessage = "Country not found!";

  // Handler search
  addHandlerSearch(handler) {
    this._search.addEventListener(
      "submit",
      function (e) {
        e.preventDefault();

        //get searched query
        const searchedCountry = this._navSearchCountryInput.value.toLowerCase();

        //hide country cards
        this._hideCountryCardContainer();

        // clear detail page
        this._clearDetailPageContainer();

        // clear search field
        this._navSearchCountryInput.value = "";

        // hide pagination container
        this._hidePaginationContainer();

        handler(searchedCountry);
      }.bind(this)
    );
  }

  addHandlerAutoComplete(handler) {
    this._search.addEventListener(
      "input",
      function (e) {
        e.preventDefault();

        //show suggested country box
        this._autCompleteContainer.classList.remove("hidden");
  
        //get searched query
        const searchedCountry = this._navSearchCountryInput.value.toLowerCase();

        //suggest country
        handler(searchedCountry);
      }.bind(this)
    );
  }
}

export default new SearchView();

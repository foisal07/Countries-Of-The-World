import View from "./View.js";

class SearchView extends View {
  _search = document.querySelector(".search");
  _navSearchCountryInput = document.querySelector(".nav__searchCountry__input");
  _countryCardsConatiner = document.querySelector(".countrycard__container");
  _detailPageContainer = document.querySelector(".detailpage__container");

  // Handler search
  addHandlerSearch(handler) {
    this._search.addEventListener(
      "submit",
      function (e) {
        e.preventDefault();

        //get searched query
        const searchedCountry = this._navSearchCountryInput.value.toLowerCase();

        //hide country cards
        this._countryCardsConatiner.classList.add("hidden");

        // clear detail page
        this._detailPageContainer.innerHTML = "";

        // clear search field
        this._navSearchCountryInput.value = "";

        handler(searchedCountry);
      }.bind(this)
    );
  }
}

export default new SearchView();

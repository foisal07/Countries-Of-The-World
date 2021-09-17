import View from "./View.js";

class AutoCompleteView extends View {
  _displayContainer = document.querySelector(".nav__autocompleteContainer");
  _navSearchCountryInput = document.querySelector(".nav__searchCountry__input");

  _generateMarkup(data) {
    return `
            <li class='autosuggestCountry' data-country=${data}><a href='#'>${data}</a></li>
        `;
  }

  render(data) {
    const markup =
      data.length !== 0
        ? data.map((country) => this._generateMarkup(country)).join("")
        : "No match";
    this._displayContainer.insertAdjacentHTML("beforeend", markup);
  }

  _clear() {
    this._displayContainer.innerHTML = "";
  }

  addHandlerAutoCompleteCountry(handler) {
    this._displayContainer.addEventListener(
      "click",
      function (e) {
        e.preventDefault();

        //get searched query
        const countryClicked = e.target.closest(".autosuggestCountry");
        const country = countryClicked.getAttribute("data-country");

        //clear country card container
        this._hideCountryCardContainer();

        // clear detail page container
        this._clearDetailPageContainer();

        // clear input
        this._navSearchCountryInput.innerHTML = "";

        // display country detail page
        handler(country);

        // hide country suggest container
        this._displayContainer.classList.add("hidden");
      }.bind(this)
    );
  }
}

export default new AutoCompleteView();

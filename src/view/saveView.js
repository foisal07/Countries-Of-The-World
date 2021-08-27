import View from "./View.js";

class SaveView extends View {
  _displayContainer = document.querySelector(".display-countries");

  addHandlerSaveCountry(handler) {
    this._displayContainer.addEventListener(
      "click",
      function (e) {
        e.preventDefault();
        console.log(e);

        //get clicked icon and country
        const icon = e.target.closest(".icon");
        if (!icon) return;
        const iconClicked = icon.getAttribute("data-icon").toLowerCase();
        const country = e.target.closest(".country-card__icons");
        const countryCode = country.getAttribute("data-countryCode");

        document.getElementById(`icon--${iconClicked}`).style.fill = 'orange';

        //save current country
        handler(countryCode, iconClicked);
      }.bind(this)
    );
  }
}

export default new SaveView();

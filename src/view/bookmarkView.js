import View from "./View.js";

class IconView extends View {
  _displayContainer = document.querySelector(".display-countries");

  addHandlerBookmark(handler) {
    // handler country card
    this._displayContainer.addEventListener(
      "click",
      function (e) {
        e.preventDefault();
        //get
        const icon = e.target.closest(".icon--bookmark");
        if (!icon) return;
        const country = e.target.closest(".country-card");
        const iconName = icon.getAttribute("data-icon").toLowerCase();
        const countryName = country
          .getAttribute("data-country-name")
          .toLowerCase();

        //bookmark current country
        handler(countryName);
      }.bind(this)
    );
  }
}

export default new IconView();

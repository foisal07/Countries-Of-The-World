import View from "./View.js";

export class CountryView extends View {
  _displayContainer = document.querySelector(".display-countries");
  _countryCardContainer = document.querySelector(".countrycard__container");
  _detailPageContainer = document.querySelector(".detailpage__container");
  _card = document.querySelector(".card");

  addHandlerRenderCountryCard(handler) {
    window.addEventListener("load", handler);
  }

  addHandlerCountryCard(handler) {
    // handler country card
    this._displayContainer.addEventListener(
      "click",
      function (e) {
        console.log(e);
        e.preventDefault();

        //get country name
        const country = e.target.closest(".country-card");
        if (!country) return;
        const countryName = country
          .getAttribute("data-country-name")
          .toLowerCase();

        // hide countries card
        this._countryCardContainer.classList.add("hidden");

        // neighbour container country card clear detail page
        this._detailPageContainer.innerHTML = "";

        // go top
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth",
        });

        //render country detail page
        handler(countryName);
      }.bind(this)
    );

    // [this._card, this._detailPageContainer].forEach((container) => {
    //   console.log(container);
    //   container.addEventListener(
    //     "click",
    //     function (e) {
    //       console.log(e);
    //       e.preventDefault();

    //       //get country name
    //       const country = e.target.closest(".country-card");
    //       if (!country) return;
    //       const countryName = country
    //         .getAttribute("data-country-name")
    //         .toLowerCase();

    //       // hide countries card
    //       this._countryCardContainer.classList.add("hidden");

    //       // neighbour container country card clear detail page
    //       this._detailPageContainer.innerHTML = "";

    //       //render country detail page
    //       handler(countryName);
    //     }.bind(this)
    //   );
    // });
  }
}

export default new CountryView();

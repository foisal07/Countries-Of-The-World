export default class View {
  _displayContainer;
  _countryCardsContainer = document.querySelector(".countrycard__container");
  _detailPageContainer = document.querySelector(".detailpage__container");
  _paginationContainer = document.querySelector(".pagination__container");
  _iconContainer = document.querySelector(".country-card__icons");

  _generateCountryCardMarkup(country) {
    return `
    <div class="country-card dark" data-country-name="${country.name}">
        <div class="country-card__flag">
            <img src="${country.flags[0]}" alt="${country.name}" />
        </div>
        <div class="country-card__info">
            <div class="country-card__info__name">
                <strong><h4>${country.name}</h4></strong>
                ${this._generateIcons(
                  country.alpha3Code,
                  country.favourtie,
                  country.traveled
                )}            
            </div>
            <ul class="country-card__info__detail">
                <li> Population: <strong>${(
                  country.population / 1000000
                ).toFixed(2)} M</strong></li>
                <li>Area: <strong>${Math.round(
                  country.area * 0.386102
                )} Sqm (approx)
                    </strong>
                </li>

                <li>Region: <strong>${country.region}</strong></li>
            </ul>
        </div>
    </div>
    `;
  }

  _generateCountryPageMarkup(country, borderCountry, city) {
    return `
    <div class="country-detail fade">

        <div class="country-detail__flag">
          <div class="btn__container">
            <button class ='button--back'>
              <i class="icon fa fa-long-arrow-left" aria-hidden="true"></i>
            </button>
          </div>
          <img src="${country.flags[0]}" alt="${country.name}"/>
        </div>

        <div class="country-detail__info">

            <div class="country-detail__info__name">
                <h1>${
                  city
                    ? `You are now in ${city}, ${country.name}`
                    : `${country.name}`
                }</h1>                
                ${this._generateIcons(country.alpha3Code)} 
            </div>

            <div class="country-detail__info__detail">

                <div class="column-one">
                    <li>
                        <strong>Native Name: </strong> ${country.nativeName}
                    </li>
                    <li>
                        <strong>Population: </strong>${(
                          country.population / 1000000
                        ).toFixed(2)} M
                    </li>
                    <li>
                        <strong>Area: </strong>${Math.round(
                          country.area * 0.386102
                        )} Sqm (approx)
                    </li>
                    <li>
                        <strong>Region: </strong>${country.region}
                    </li>
                    <li>
                        <strong>Sub Region: </strong>${country.subregion}
                    </li>
                </div>

                <div class="column-two">
                    <li>
                        <strong>Capital: </strong>${country.capital}
                    </li>
                    <li>
                        <strong>Currencies: </strong>${
                          country.currencies[0].name
                        } (${country.currencies[0].symbol})
                    </li>
                    <li>
                        <strong>Language: </strong>${country.languages
                          .map((lang) => lang.name)
                          .join(" , ")}
                    </li>
                    <li>
                        <strong>Country Domain: </strong>${
                          country.topLevelDomain
                        }
                    </li>
                </div>
                
            </div>
        </div>
    </div>

    <div class='map__container'>
      <h2>On Map</h2>
      <div class="country-map" id="map">
      </div>
    </div>

    <div class="neighbour__container">
      <h2>The Neighbours</h2>
      <div class="country__neighbours">
      ${borderCountry
        .map((country) => {
          return this._generateCountryCardMarkup(country);
        })
        .join(" ")}
      </div>
    </div>`;
  }

  _fillColor(marked) {
    return `fill = ${marked ? "orange" : "none"}`;
  }

  _generateIcons(countryalphacode, favourite, traveled) {
    return `  <div class = 'country-card__icons' data-countryCode = ${countryalphacode}> 
                <div class = 'icon' data-icon='favourite'>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-2 w-2" viewBox="0 0 24 24" stroke="currentColor">
                    <path id ='${countryalphacode}__icon--favourite' ${this._fillColor(
      favourite
    )}  stroke-linecap="round" class=''stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div class ='icon' data-icon='traveled'>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6"  viewBox="0 0 24 24" stroke="currentColor">
                  <path id = '${countryalphacode}__icon--traveled' ${this._fillColor(
      traveled
    )} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
              </div>
    `;
  }

  renderCard(data) {
    const markup = data
      .map((country) => this._generateCountryCardMarkup(country))
      .join("");
    this._displayContainer.insertAdjacentHTML("beforeend", markup);
  }

  renderPage(data, borderCountry, city) {
    const markup = this._generateCountryPageMarkup(data, borderCountry, city);
    this._displayContainer.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div class = "error__message">
          <i class="icon fa fa-exclamation-triangle"></i>${message}
        </div>
        
        <div class="btn__container">
          <button class ='button button--med button--back'>
            All Country
          </button>
        </div>
      </div>
    `;
    this._displayContainer.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerCountryCard(handler) {
    // handler country card
    this._countryCardsContainer.addEventListener(
      "click",
      function (e) {
        e.preventDefault();
        e.stopPropagation();

        //get country name
        const country = e.target.closest(".country-card");
        if (!country) return;
        const countryName = country
          .getAttribute("data-country-name")
          .toLowerCase();

        // hide countries card
        this._hideCountryCardContainer();

        // neighbour container country card clear detail page
        this._clearDetailPageContainer();

        // clear pagination
        this._hidePaginationContainer();

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
  }

  addHandlerStoreCountry(handler) {
    this._displayContainer.addEventListener(
      "click",
      function (e) {
        e.preventDefault();

        //get clicked icon and country
        const icon = e.target.closest(".icon");
        if (!icon) return;
        const iconClicked = icon.getAttribute("data-icon");
        const country = e.target.closest(".country-card__icons");
        const countryCode = country.getAttribute("data-countryCode");

        // get display container class
        const displayContainerClass = this._displayContainer.className;

        //save/delete current country
        handler(countryCode, iconClicked, displayContainerClass);

        //stop bubling event to country card to stop executing render country detail
        e.stopPropagation();
      }.bind(this)
    );
  }

  _hideCountryCardContainer() {
    this._countryCardsContainer.classList.add("hidden");
  }

  _showCountryCardContainer() {
    this._countryCardsContainer.classList.remove("hidden");
  }

  _clearCountryCardContainer() {
    this._displayContainer.innerHTML = "";
  }

  _clearDetailPageContainer() {
    this._detailPageContainer.innerHTML = "";
  }

  _hidePaginationContainer() {
    this._paginationContainer.classList.add("hidden");
  }

  _showPaginationContainer() {
    this._paginationContainer.classList.remove("hidden");
  }
}

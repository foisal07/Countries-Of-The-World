export default class View {
  _displayContainer;
  _countryCardsContainer = document.querySelector(".countrycard__container");
  _detailPageContainer = document.querySelector(".detailpage__container");

  _generateCountryCardMarkup(country) {
    return `
    <div class="country-card dark" data-country-name="${country.name}">
        <div class="country-card__flag">
            <img src="${country.flag}" alt="${country.name}" />
        </div>
        <div class="country-card__info">
            <div class="country-card__info__name">
                <strong><h4>${country.name}</h4></strong>
            </div>
            <ul class="country-card__info__detail">
                <li> Population: <strong>${(
                  country.population / 1000000
                ).toFixed(2)} M</strong></li>
                <li>Language: <strong>${country.languages
                  .map((lang) => lang.name)
                  .join(" , ")}</strong></li>
                <li>Region: <strong>${country.region}</strong></li>
            </ul>
        </div>
    </div>
    `;
  }

  _generateCountryPageMarkup(country, borderCountry, city) {
    return `
    <div class="country-detail">
        <div class="country-detail__flag">
            <img src="${country.flag}" alt="${country.name}"/>
        </div>

        <div class="country-detail__info">
            <div class="btn__container">
                <button class ='button button--med button--back'>
                  All Country
                </button>
            </div>

            <div class="country-detail__info__name">
                <h1>${
                  city
                    ? `You are now in ${city}, ${country.name}`
                    : `${country.name}`
                }</h1>
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
    <h2>On Map</h2>
    <div class="country-map" id="map">

    </div>
    <h2>The Neighbours</h2>
    <div class="neighbour__container">
    ${
      borderCountry.length > 0
        ? borderCountry
            .map((country) => {
              return this._generateCountryCardMarkup(country);
            })
            .join(" ")
        : "No land borders"
    }
    </div>`;
  }

  renderCard(data) {
    const markup = this._generateCountryCardMarkup(data);
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

  _hideCountryCardContainer() {
    this._countryCardsContainer.classList.add("hidden");
  }

  _showCountryCardContainer() {
    this._countryCardsContainer.classList.remove("hidden");
  }

  _clearDetailPageContainer() {
    this._detailPageContainer.innerHTML = "";
  }
  
  _clearCountryCardContainer() {
    this._displayContainer.innerHTML = "";
  }
}

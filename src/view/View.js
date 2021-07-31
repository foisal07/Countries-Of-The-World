export default class View {
  _data;
  _borderCountry;
  _displayContainer;

  _generateCountryCardMarkup(country) {
    return `
    <div class="country-card" data-country-name="${country.name}">
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

  _generateCountryPageMarkup(country, borderCountry) {
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
                <h1>${country.name}</h1>
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
                        <strong>Timezone: </strong>${country.timezones}
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
    this._data = data;
    const markup = this._generateCountryCardMarkup(data);
    this._displayContainer.insertAdjacentHTML("beforeend", markup);
  }

  renderPage(data, borderCountry) {
    this._data = data;
    this._borderCountry = borderCountry;
    const markup = this._generateCountryPageMarkup(data, borderCountry);
    this._displayContainer.insertAdjacentHTML("afterbegin", markup);
  }

  renderLoading() {}

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <p>${message}</p>
      </div>
    `;
    this._displayContainer.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._displayContainer.innerHTML = "";
  }
}

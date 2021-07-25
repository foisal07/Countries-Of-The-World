export default class View {
  _data;
  _displayContainer = document.querySelector(".display-countries");

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

    </div
    `;
  }

  _generateCountryPageMarkup(country) {
    return `
    <div class="country-detail">
        <div class="country-detail__Flag">
            <button class ='button button--med button--back'>
                <span class='icon'><i class="fa fa-angle-left"></i></span>
                Back
            </button>
            <img src="${country.flag}" alt="" />
        </div>           

        <div class="country-detail__info">

            <div class="country-detail__info__name">
                <h2>${country.name}</h2>
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
                        <strong>Top Level Domain: </strong>${
                          country.topLevelDomain
                        }   
                    </li>
                </div>
            </div>
        </div>
    </div>
    `;
  }

  renderCard(data) {
    this._data = data;
    const markup = this._generateCountryCardMarkup(data);
    this._displayContainer.insertAdjacentHTML("beforeend", markup);
  }

  renderPage(data) {
    this._data = data;
    const markup = this._generateCountryPageMarkup(data);
    this._displayContainer.insertAdjacentHTML("beforeend", markup);
  }

  renderError(msg) {}

  _clear() {
    this._displayContainer.innerHTML = "";
  }
}

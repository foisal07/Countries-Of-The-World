class View {
  _data;
  _displayContainer = document.querySelector(".display-countries");

  _generateCountryCardMarkup(country) {
    console.log(country);
    return `
    <div class="country-card">
        <div class="country-card__flag">
            <img src="${country.flag}" alt="${country.name}" />
        </div>
        <div class="country-card__info">
            <div class="country-card__info__name">
                <strong><h4>${country.name}</h4></strong>
            </div>
            <ul class="country-card__info__detail">
                <li> Population:<strong>${(
                  country.population / 1000000
                ).toFixed(2)} M</strong></li>
                <li>Language:<strong>${country.name}</strong></li>
                <li>Region:<strong>${country.region}</strong></li>
            </ul>
        </div>
    </div>
    `;
  }

  _generateCountryPageMarkup(data) {
    return `
    <div class="country-detail">
        <div class="country-detail__Flag">
            <button class ='button button--med button--back'>
                <span class='icon'><i class="fa fa-angle-left"></i></span>
                Back
            </button>
            <img src="${data.flag}" alt="" />
        </div>           

        <div class="country-detail__info">

            <div class="country-detail__info__name">
                <h2>${data.name}</h2>
            </div>

            <div class="country-detail__info__detail">
                <div class="column-one">
                    <li>
                        <strong>Native Name: </strong> ${data.nativeName}
                    </li>
                    <li>
                        <strong>Population: </strong>${(
                          data.population / 1000000
                        ).toFixed(2)} M
                    </li>
                    <li>
                        <strong>Region: </strong>${data.region}
                    </li>
                    <li>
                        <strong>Sub Region: </strong>${data.subregion}
                    </li>
                </div>

                <div class="column-two">
                    <li>
                        <strong>Capital: </strong>${data.capital}
                    </li>
                    <li>
                        <strong>Currencies: </strong>${
                          data.currencies[0].name
                        } (${data.currencies[0].symbol})
                    </li>
                    <li>
                        <strong>Language: </strong>${data.languages[0].name}
                    </li>
                    <li>
                        <strong>Top Level Domain: </strong>${
                          data.topLevelDomain
                        }   
                    </li>
                </div>
            </div>
        </div>
    </div>
    `;
  }

  render(data) {
    this._data = data;
    let markup;
    data.forEach((country) => {
      markup = this._generateCountryCardMarkup(country);
    });
    this._displayContainer.insertAdjacentHTML("beforeend", markup);
  }
}

export default new View();
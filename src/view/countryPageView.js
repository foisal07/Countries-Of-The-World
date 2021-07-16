class CountryPageView {
  _displayCountries = document.querySelector(".display-countries");

  render(data) {
    data.forEach((data) => {
      const markup = `
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
                                        <strong>Population: </strong>${data.population}
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
                                        <strong>Currencies: </strong>${data.currencies}
                                    </li>
                                    <li>
                                        <strong>Language: </strong>${data.languages}
                                    </li>
                                    <li>
                                        <strong>Top Level Domain: </strong>${data.topLevelDomain}   
                                    </li>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;

      this._displayCountries.insertAdjacentHTML("beforeend", markup);
    });
  }
}

export default new CountryPageView();

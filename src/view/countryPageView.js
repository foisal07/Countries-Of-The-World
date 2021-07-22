class CountryPageView {
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
                        <strong>Language: </strong>${country.languages[0].name}
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

  render(data) {
    this._data = data;
    const markup = this._generateCountryPageMarkup(data);
    this._displayContainer.insertAdjacentHTML("beforeend", markup);
  }
}

export default new CountryPageView();

// class CountryPageView {
//   _displayCountries = document.querySelector(".display-countries");

//   renderPage(data) {
//     // data.forEach((data) => {
//       const markup = `
//                 <div class="country-detail">
//                     <div class="country-detail__Flag">
//                         <button class ='button button--med button--back'>
//                             <span class='icon'><i class="fa fa-angle-left"></i></span>
//                             Back
//                         </button>
//                         <img src="${data.flag}" alt="" />
//                     </div>

//                         <div class="country-detail__info">

//                             <div class="country-detail__info__name">
//                                 <h2>${data.name}</h2>
//                             </div>

//                             <div class="country-detail__info__detail">
//                                 <div class="column-one">
//                                     <li>
//                                         <strong>Native Name: </strong> ${
//                                           data.nativeName
//                                         }
//                                     </li>
//                                     <li>
//                                         <strong>Population: </strong>${(
//                                           data.population / 1000000
//                                         ).toFixed(2)} M
//                                     </li>
//                                     <li>
//                                         <strong>Region: </strong>${data.region}
//                                     </li>
//                                     <li>
//                                         <strong>Sub Region: </strong>${
//                                           data.subregion
//                                         }
//                                     </li>
//                                 </div>

//                                 <div class="column-two">
//                                     <li>
//                                         <strong>Capital: </strong>${
//                                           data.capital
//                                         }
//                                     </li>
//                                     <li>
//                                         <strong>Currencies: </strong>${
//                                           data.currencies[0].name
//                                         } (${data.currencies[0].symbol})
//                                     </li>
//                                     <li>
//                                         <strong>Language: </strong>${
//                                           data.languages[0].name
//                                         }
//                                     </li>
//                                     <li>
//                                         <strong>Neighbours: </strong> ${
//                                           data.borders
//                                         }
//                                     </li>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 `;

//       this._displayCountries.insertAdjacentHTML("beforeend", markup);
//     // });
//   }
// }

// <div class="country-neighbours">
//     <div class="country-neighbours__title">
//       <h2>The Neighbours</h2>
//     </div>
//     ${data.borders}
// </div>

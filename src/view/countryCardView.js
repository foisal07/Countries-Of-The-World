// class CountryCardView {
//   _displayCountries = document.querySelector(".display-countries");

//   renderCard(country) {
//     // data.forEach((country) => {
//     // console.log(country);
//     const markup = `
//                 <div class="country-card">
//                     <div class="country-card__flag">
//                         <img src="${country.flag}" alt="${country.name}" />
//                     </div>
//                     <div class="country-card__info">
//                         <div class="country-card__info__name">
//                             <strong><h4>${country.name}</h4></strong>
//                         </div>
//                         <ul class="country-card__info__detail">
//                             <li> Population:<strong>${(
//                               country.population / 1000000
//                             ).toFixed(2)} M</strong>
//                             </li>
//                             <li>Language:<strong>${country.name}</strong></li>
//                             <li>Region:<strong>${country.region}</strong></li>
//                         </ul>
//                     </div>
//                 </div>
//                 `;

//     this._displayCountries.insertAdjacentHTML("beforeend", markup);
//     // });
//   }
// }

class CountryCardView {
  _data;
  _displayContainer = document.querySelector(".display-countries");

  _generateCountryCardMarkup(country) {
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

  render(data) {
    console.log(data);
    this._data = data;
    const markup = this._generateCountryCardMarkup(data);
    this._displayContainer.insertAdjacentHTML("beforeend", markup);
  }
}

export default new CountryCardView();

class CountryCardView {
  _displayCountries = document.querySelector(".display-countries");

  render(data) {
    console.log(data);
    data.forEach((country) => {
      const markup = `
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
                            ).toFixed(2)} M</strong>
                            </li>
                            <li>Language:<strong>${country.name}</strong></li>
                            <li>Region:<strong>${country.region}</strong></li>
                        </ul>
                    </div>
                </div>
                `;

      this._displayCountries.insertAdjacentHTML("beforeend", markup);
    });
  }
}

export default new CountryCardView();



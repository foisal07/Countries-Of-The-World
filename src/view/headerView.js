class HeaderView {
  _body = document.body;
  _modeBtn = document.querySelector(".header_darkmode_btn");
  _countryCard = document.querySelector(".country-card");
  _nav = document.querySelector(".nav");

  addHandlerThemeButton(handler) {
    this._modeBtn.addEventListener("click", (e) => {
      this._body.classList.toggle("dark");
      this._body.classList.toggle("light");

        this._countryCard.classList.toggle("dark");
        this._countryCard.classList.toggle("light");
      //   handler();
    });
  }
}

export default new HeaderView();

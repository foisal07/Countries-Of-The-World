import View from "./View.js";

class CountryPaginationView extends View {
  _displayContainer = document.querySelector(".display-countries");
  _paginationContainer = document.querySelector(".pagination__container");
  _sortingLetter = document.querySelector(".letter");
  _prevBtn = document.querySelector(".btnPrev");
  _nextBtn = document.querySelector(".btnNext");
  _slidesAll = document.querySelectorAll(".slide");
  _curSlide = 0;
  _maxSlide = 5;

  addHandlerPagination(handler) {
    this._paginationContainer.addEventListener(
      "click",
      function (e) {
        e.preventDefault();

        // get first letter
        const letter = e.target.closest(".letter");
        if (!letter) return;
        const sortingLetter = letter.innerText.toLowerCase();

        //clear container
        this._clearCountryCardContainer();

        // display matched letter countires
        handler(sortingLetter);
      }.bind(this)
    );
  }

  _goToSlide(slide) {
    // set initial slide positions (Nodelist)
    this._slidesAll.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  }

  _nextSlide() {
    if (this._curSlide === this._maxSlide - 1) {
      return (this._curSlide = 0);
    } else {
      return this._curSlide++;
    }
  }

  _prevSlide() {
    if (this._curSlide === 0) {
      return (this._curSlide = this._maxSlide - 1);
    } else {
      return this._curSlide--;
    }
  }

  addHandlerSlides() {
    // at load slide number 0
    this._goToSlide(this._curSlide);

    this._paginationContainer.addEventListener(
      "click",
      function (e) {
        e.preventDefault();

        // set prev slide number
        if (e.target.closest(".btnPrev")) this._prevSlide();

        // set next slide number
        if (e.target.closest(".btnNext")) this._nextSlide();

        // go to set slide number
        this._goToSlide(this._curSlide);
      }.bind(this)
    );
  }
}

export default new CountryPaginationView();

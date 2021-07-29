import View from "./View.js";
import { CountryView } from "./countryView.js";

class CountryNeighbourView extends CountryView {
  _displayContainer = document.querySelector(".detailpage__container");
}

export default new CountryNeighbourView();

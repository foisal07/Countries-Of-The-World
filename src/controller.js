import {
  ALL__COUNTRIES__API,
  SEARCH__COUNTRY__API,
  REGION__COUNTRIES__API,
} from "./config.js";
import * as model from "../src/model.js";
import CountryCardView from "./view/countryCardView.js";
import CountryPageView from "./view/countryPageView.js";

// import "core-js/stable";
// import "regenerator-runtime/runtime";
// import { async } from "regenerator-runtime";

const body = document.body;
const modeBtn = document.querySelector(".header_darkmode_btn");

modeBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
  body.classList.toggle("light");
});

const controlAllCountries = async function () {
  //Get all countries data
  await model.getAllCountries(ALL__COUNTRIES__API);

  // Render all countries
  CountryCardView.render(model.state.countriesAll);
};

const controlSearchCountry = async function () {
  // Get country
  await model.getSearchedCountry(SEARCH__COUNTRY__API, "Bangladesh");

  //Render country
  CountryPageView.render(model.state.searchedCountry);
};

const controlFilterByRegion = async function () {
  // Get countries by region
  await model.getCountriesByRegion(REGION__COUNTRIES__API, "Europe");

  // Render regional country
  CountryCardView.render(model.state.countriesByRegion);
};

// const controlDetailPage = async function (data) {
//   //Get all countries data
//   DetailPageView.render(data);
// };

// controlAllCountries();
// controlFilterByRegion();
controlSearchCountry();

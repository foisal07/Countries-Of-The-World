import {
  ALL__COUNTRIES__API,
  SEARCH__COUNTRY__API,
  REGION__COUNTRIES__API,
  BORDER__COUNTIRES__API,
  TRACK__IP__API,
} from "./config.js";
import * as model from "../src/model.js";
import CountryCardView from "./view/countryCardView.js";
import CountryPageView from "./view/countryPageView.js";
import countryNeighbourView from "./view/countryNeighbourView.js";

// import "core-js/stable";
// import "regenerator-runtime/runtime";
// import { async } from "regenerator-runtime";

const body = document.body;
const modeBtn = document.querySelector(".header_darkmode_btn");

modeBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
  body.classList.toggle("light");
});

// All countries
const controlAllCountries = async function () {
  //Get all countries data
  await model.getAllCountries(ALL__COUNTRIES__API);

  // Render all countries card
  // model.state.countriesAll.forEach((country) =>
  //   CountryCardView.render(country)
  // );
};

//Detail Page
const controlSearchCountry = async function () {
  // Get country
  await model.getCountry(SEARCH__COUNTRY__API, "Bangladesh");

  let countryBorders;

  //Render country details
  model.state.countriesAll.forEach((country) => {
    if (country.name === "Bangladesh") {
      CountryPageView.render(country);
      countryBorders = country.borders;
    }
  });

  //Render neighbours card
  countryBorders.forEach((countryCode) => {
    model.state.countriesAll.forEach((country) => {
      if (country.alpha3Code === countryCode) {
        countryNeighbourView.render(country);
      }
    });
  });
};

// Display current country
const controlWhereAmI = async function () {
  // Get country [lat,lng]
  await model.getLatLng(TRACK__IP__API);
  

  // Create map
};

// Countries filter by region
const controlFilterByRegion = async function () {
  // Get countries by region
  await model.getCountriesByRegion(REGION__COUNTRIES__API, "Asia");

  // Render regional country card
  model.state.countriesAll.forEach((country) => {
    if (country.region === "Asia") {
      CountryCardView.renderCard(country);
    }
  });
};

controlAllCountries();
controlWhereAmI();
// controlFilterByRegion();
controlSearchCountry();

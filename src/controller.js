import {
  ALL__COUNTRIES__API,
  COUNTRY__API,
  REGION__COUNTRIES__API,
  BORDER__COUNTIRES__API,
  TRACK__IP__API,
} from "./config.js";
import * as model from "../src/model.js";
import CountryView from "./view/countryView.js";
import CountryPageView from "./view/countryPageView.js";
import countryNeighbourView from "./view/countryNeighbourView.js";
import NavView from "./view/navView.js";
import SearchView from "./view/countrySearchView.js";

// import "core-js/stable";
// import "regenerator-runtime/runtime";
// import { async } from "regenerator-runtime";

const body = document.body;
const modeBtn = document.querySelector(".header_darkmode_btn");

modeBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
  body.classList.toggle("light");
});
const countryCardConatiner = document.querySelector(".countrycard__container");

// Display All Countries Card
const controlAllCountries = async function () {
  //get all countries data
  await model.getAllCountries(ALL__COUNTRIES__API);

  //render all countries card
  model.state.countriesAll.forEach((country) =>
    CountryView.renderCard(country)
  );
};

//Display Country Detail Page
const controlGetCountry = function (countryName) {
  let countryBorders, countryLatLng;

  //render country details
  model.state.countriesAll.forEach((country) => {
    if (country.name.toLowerCase() === countryName) {
      CountryPageView.renderPage(country);
      countryBorders = country.borders;
      countryLatLng = country.latlng;
    }
  });

  // display country location on map
  renderMap(...countryLatLng);

  //render neighbouring country card
  renderNeighbourCountry(countryBorders, model.state.countriesAll);
};

// render Current Country
const controlWhereAmI = async function () {
  // get country [lat,lng]
  await model.getLatLng(TRACK__IP__API);

  let countryBorders;

  //render country details
  model.state.countriesAll.forEach((country) => {
    if (country.alpha2Code === model.state.ipTrackedCountry) {
      CountryPageView.renderPage(country);
      countryBorders = country.borders;
    }
  });

  // render country location on map
  renderMap(...model.state.latlng);

  //Rrender neighbouring country card
  renderNeighbourCountry(countryBorders, model.state.countriesAll);
};

// Display Filtered Countries By Region
const controlFilterByRegion = function (region) {
  // render regional country card
  model.state.countriesAll.forEach((country) => {
    if (country.region === region) {
      CountryView.renderCard(country);
    }
  });
};

// Render negighbour country
const renderNeighbourCountry = function (countryBorders, countriesAll) {
  countryBorders.forEach((countryCode) => {
    countriesAll.forEach((country) => {
      if (country.alpha3Code === countryCode) {
        countryNeighbourView.renderCard(country);
      }
    });
  });
};

// Create Display Map
const renderMap = function (lat, lng) {
  // Create leaflet map
  const mapView = L.map("map").setView([lat, lng], 5);

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZm9pc2FsMDciLCJhIjoiY2txdnNxazRhMGhsMTJvbWg2OWlyODN6NyJ9.Tf_hHhpLFTpQPmbMl_wbSQ",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 20,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoiZm9pc2FsMDciLCJhIjoiY2txdnNxazRhMGhsMTJvbWg2OWlyODN6NyJ9.Tf_hHhpLFTpQPmbMl_wbSQ",
    }
  ).addTo(mapView);

  // Leaflet map marker
  L.popup()
    .setLatLng([lat, lng])
    .setContent("You Are Here Now")
    .openOn(mapView);
};

const showCountryCard = function () {
  countryCardConatiner.classList.remove("hidden");
};

const init = function () {
  CountryView.addHandlerRenderCountryCard(controlAllCountries);
  CountryView.addHandlerCountryCard(controlGetCountry);
  NavView.addHandlerWhereAmI(controlWhereAmI);
  NavView.addHandlerFilterRegion(controlFilterByRegion);
  SearchView.addHandlerSearch(controlGetCountry);
  CountryPageView.addHandlerBackBtn(showCountryCard);
};
init();

// Search functionalities //
// Back button
// Render spinner/loader
// Render error
// Fix bug: getcountry() map reinitialize
// Fix bug: On map neighbours heading display on load
// Fix bug: Neighbour country card > click go to the country
// Fix bug: Change neighbour country when clicked multiple countries
// Fix bug: Country card > Country deatil showing map "you are here now"
// Fix bug: Nav spaacing
// Theme switch
// API request timeout

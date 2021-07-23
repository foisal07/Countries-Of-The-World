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

// import "core-js/stable";
// import "regenerator-runtime/runtime";
// import { async } from "regenerator-runtime";

const body = document.body;
const modeBtn = document.querySelector(".header_darkmode_btn");

modeBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
  body.classList.toggle("light");
});

// Display All Countries Card
const controlAllCountries = async function () {
  //get all countries data
  await model.getAllCountries(ALL__COUNTRIES__API);

  //render all countries card
  // model.state.countriesAll.forEach((country) =>
  //   CountryView.renderCard(country)
  // );
};

//Display Country Detail Page
const controlSearchCountry = function () {
  let countryBorders, countryLatLng;

  //render country details
  model.state.countriesAll.forEach((country) => {
    if (country.name === "Bangladesh") {
      CountryPageView.renderPage(country);
      countryBorders = country.borders;
      countryLatLng = country.latlng;
    }
  });

  // display country location on map
  displayMap(...countryLatLng);

  //render neighbouring country card
  displayNeighbourCountry(countryBorders, model.state.countriesAll);
};

// Display Current Country
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

  // display country location on map
  displayMap(...model.state.latlng);

  //Rrender neighbouring country card
  displayNeighbourCountry(countryBorders, model.state.countriesAll);
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
const displayNeighbourCountry = function (countryBorders, countriesAll) {
  countryBorders.forEach((countryCode) => {
    countriesAll.forEach((country) => {
      if (country.alpha3Code === countryCode) {
        countryNeighbourView.renderCard(country);
      }
    });
  });
};

// Create Display Map
const displayMap = function (lat, lng) {
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

window.addEventListener("load", controlAllCountries());

const whereAmIBtn = document.querySelector(".nav__whereami_btn");

whereAmIBtn.addEventListener("click", function () {
  // controlWhereAmI();
  controlSearchCountry();
  // controlFilterByRegion('Asia');
});

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
  model.state.countriesAll.forEach((country) =>
    CountryView.renderCard(country)
  );
};

//Display Country Detail Page
const controlSearchCountry = function (countryName) {
  let countryBorders, countryLatLng;

  //render country details
  model.state.countriesAll.forEach((country) => {
    if (country.name === countryName) {
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

window.addEventListener("load", controlAllCountries());

const navContainer = document.querySelector(".nav");
const navSearchCountry = document.querySelector(".nav__searchCountry");
const navSearchCountryInput = document.querySelector(
  ".nav__searchCountry__input"
);
const whereAmIBtn = document.querySelector(".nav__whereami_btn");
const countriesContainer = document.querySelector(".display-countries");

// Handler search
navContainer.addEventListener("click", function (e) {
  e.preventDefault();

  const search = e.target.closest(".navSearchCountryInput");
  if (!search) return;

  console.log(navSearchCountryInput.value());
});

// Handler WhereAmI
navContainer.addEventListener("click", function (e) {
  e.preventDefault();

  const whereAmI = e.target.closest(".nav__whereami_btn");
  if (!whereAmI) return;

  // clear countries card
  CountryView._clear();

  //render tracked country
  controlWhereAmI();
});

// Handler region
navContainer.addEventListener("click", function (e) {
  e.preventDefault();

  const region = e.target.closest(".region");

  if (!region) return;
  const regionName = region.getAttribute("data-region");

  // clear countries card
  CountryView._clear();

  //render regional countries
  controlFilterByRegion(regionName);
});

// Handler country card
countriesContainer.addEventListener("click", function (e) {
  e.preventDefault();
  const country = e.target.closest(".country-card");
  if (!country) return;
  const countryName = country.getAttribute("data-country-name");

  // clear countries card
  CountryView._clear();

  //render country
  controlSearchCountry(countryName);
});

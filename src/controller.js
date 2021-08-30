import { ALL__COUNTRIES__API, TRACK__IP__API } from "./config.js";

import * as model from "../src/model.js";

import CountryView from "./view/countryView.js";
import SaveView from "./view/saveView.js";
import CountryPaginationView from "./view/paginationView.js";
import CountryPageView from "./view/countryPageView.js";
import CountryNeighbourView from "./view/countryNeighbourView.js";
import NavView from "./view/navView.js";
import SearchView from "./view/countrySearchView.js";
import HeaderView from "./view/headerView.js";
import FavouriteCountryView from "./view/favouriteCountryView.js";
import TraveledCountryView from "./view/traveledCountryView.js";

// Display Countries Card
const controlAllCountries = async function (sortingLetter = "a") {
  try {
    //get all countries data
    await model.getAllCountries(ALL__COUNTRIES__API, sortingLetter);

    //render countries card start with A
    CountryView.renderCard(model.state.countriesFilterByLetter);
  } catch (err) {
    console.error(`${err} Yo`);
  }
};

//Display Country Detail Page
const controlCountryDetails = async function (countryName) {
  try {
    // get country
    const country = model.state.countriesAll.find(
      (country) => country.name.toLowerCase() === countryName
    );

    if (!country)
      throw new Error(
        ` Check spelling '${countryName.toUpperCase()}' isn't a country. You can also try to create country '${countryName.toUpperCase()}'for yourself 😛`
      );

    // get country lat lng
    const countryLatLng = country.latlng;

    // get bordering countries Alpha3Code
    const countryBorders = country.borders;

    getBorderingCountries(model.state.countriesAll, countryBorders);

    // render country detail page
    CountryPageView.renderPage(country, borderCountry);

    //remove previous border countries
    borderCountry = [];

    // display country location on map
    renderMap(
      ...countryLatLng,
      countryName.charAt(0).toUpperCase() + countryName.slice(1)
    );
  } catch (err) {
    CountryPageView.renderError(err);
  }
};

//Get negighbouring country
let borderCountry = [];

const getBorderingCountries = function (countriesAll, countryBorders) {
  countryBorders.forEach((countryCode) => {
    countriesAll.filter((country) => {
      if (country.alpha3Code === countryCode) borderCountry.push(country);
    });
  });
};

// Display Current Country
const controlWhereAmI = async function () {
  try {
    // get country [lat,lng]
    await model.getLatLng(TRACK__IP__API);

    // get country
    const country = model.state.countriesAll.find(
      (country) => country.alpha2Code === model.state.ipTrackedCountry
    );

    if (!country)
      throw new Error(
        "You're a Jason Bourne 😛 couldn't find you at the moment"
      );

    // get country borders
    const countryBorders = country.borders;

    // get bordering countries
    getBorderingCountries(model.state.countriesAll, countryBorders);

    // render country detail page
    CountryPageView.renderPage(country, borderCountry, model.state.city);

    // render country location on map
    renderMap(...model.state.latlng, "You are here now!");
  } catch (err) {
    CountryPageView.renderError(err);
  }
};

// Display Filtered Countries
const controlFilterBy = function (filterBy) {
  // render countries card by population ascending
  if (filterBy === "population") {
    model.sortCountries(filterBy);
    CountryView.renderCard(model.state.sortedCountries);
  }

  // render countries card by area size ascending
  if (filterBy === "area") {
    model.sortCountries(filterBy);
    CountryView.renderCard(model.state.sortedCountries);
  }

  // render favourite countries card
  if (filterBy === "favourite") {
    TraveledCountryView._clearCountryCardContainer();
    FavouriteCountryView.renderCard(model.state.favouriteCountry);
  }

  // render traveled countries card
  if (filterBy === "traveled") {
    FavouriteCountryView._clearCountryCardContainer();
    TraveledCountryView.renderCard(model.state.traveledCountry);
  }

  // render island countries card
  if (filterBy === "island") {
    model.getIslandcountries();
    CountryView.renderCard(model.state.islandCountries);
  }

  // render regional country card
  model.getCountriesFilterByRegion(filterBy);
  CountryView.renderCard(model.state.regionalCountries);
};

// Save/Delete Countries From Favourite, Traveled List
const controlStoreCountry = function (countryCode, iconClicked) {
  // Check is country stored
  let countryIndex;

  // search bookmarked country
  if (iconClicked === "favourite")
    countryIndex = model.state.favouriteCountry.findIndex(
      (country) => country.alpha3Code === countryCode
    );

  // search traveled country
  if (iconClicked === "traveled")
    countryIndex = model.state.traveledCountry.findIndex(
      (country) => country.alpha3Code === countryCode
    );

  console.log(model.state.favouriteCountry);
  // save/delete country
  // Index === -1 country doesn't exist in arr favourite, traveled
  if (countryIndex > -1) {
    // Delete country
    model.deleteCountry(countryIndex, iconClicked);

    //re-render countries
    if (iconClicked === "favourite") {
      FavouriteCountryView._clearCountryCardContainer();
      TraveledCountryView._clearCountryCardContainer();
      console.log(model.state.favouriteCountry);
      FavouriteCountryView.renderCard(model.state.favouriteCountry);
    }

    if (iconClicked === "traveled") {
      FavouriteCountryView._clearCountryCardContainer();
      TraveledCountryView._clearCountryCardContainer();
      TraveledCountryView.renderCard(model.state.traveledCountry);
    }
  } else {
    // save country
    model.saveCountry(countryCode, iconClicked);
  }

  // update icon

  // persist data
};

// Create Display Map
const renderMap = function (lat, lng, popupMsg) {
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
  L.popup().setLatLng([lat, lng]).setContent(`${popupMsg}`).openOn(mapView);
};

const init = function () {
  HeaderView.addHandlerThemeButton();
  SearchView.addHandlerSearch(controlCountryDetails);
  NavView.addHandlerWhereAmI(controlWhereAmI);
  NavView.addHandlerFilter(controlFilterBy);
  CountryView.addHandlerRenderCountryCard(controlAllCountries);
  // CountryView.addHandlerCountryCard(controlCountryDetails);
  SaveView.addHandlerSaveCountry(controlStoreCountry);
  FavouriteCountryView.addHandlerSaveCountry(controlStoreCountry);
  TraveledCountryView.addHandlerSaveCountry(controlStoreCountry);
  CountryPageView.addHandlerBackBtn();
  CountryNeighbourView.addHandlerCountryCard(controlCountryDetails);
  CountryPaginationView.addHandlerPagination(controlAllCountries);
  CountryPaginationView.addHandlerSlides();
};

init();

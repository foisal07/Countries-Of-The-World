import { ALL__COUNTRIES__API, TRACK__IP__API } from "./config.js";

import * as model from "../src/model.js";

import CountryView from "./view/countryView.js";
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
  // clear display container
  FavouriteCountryView._clearCountryCardContainer();
  TraveledCountryView._clearCountryCardContainer();

  // render countries card by population ascending
  if (filterBy === "population") {
    model.sortCountries(filterBy);
    console.log(model.state.sortedCountries);
    CountryView.renderCard(model.state.sortedCountries);
  }

  // render countries card by area size ascending
  if (filterBy === "area") {
    model.sortCountries(filterBy);
    console.log(model.state.sortedCountries);
    CountryView.renderCard(model.state.sortedCountries);
  }

  // render favourite countries card
  if (filterBy === "favourite") {
    console.log(model.state.favouriteCountry);
    FavouriteCountryView.renderCard(model.state.favouriteCountry);
  }

  // render traveled countries card
  if (filterBy === "traveled") {
    TraveledCountryView.renderCard(model.state.traveledCountry);
  }

  // render island countries card
  if (filterBy === "island") {
    model.getIslandcountries();
    console.log(model.state.islandCountries);
    CountryView.renderCard(model.state.islandCountries);
  }

  // render regional country card
  model.getCountriesFilterByRegion(filterBy);
  console.log(model.state.regionalCountries);
  CountryView.renderCard(model.state.regionalCountries);
};

// Save/Delete Countries From Favourite, Traveled List
const controlStoreCountry = function (
  countryCode,
  iconClicked,
  displayContainerClass
) {
  // Check is country stored
  let countryIndex;

  // search favourite country
  if (iconClicked === "favourite")
    countryIndex = model.state.favouriteCountry.findIndex(
      (country) => country.alpha3Code === countryCode
    );

  // search traveled country
  if (iconClicked === "traveled")
    countryIndex = model.state.traveledCountry.findIndex(
      (country) => country.alpha3Code === countryCode
    );

  // save/delete country
  // Index === -1 country doesn't exist in favourite, traveled arr
  if (countryIndex > -1) {
    // delete country from storage
    model.deleteCountry(countryIndex, iconClicked, countryCode);

    //unfill icon
    document.getElementById(`${countryCode}__icon--${iconClicked}`).style.fill =
      "";

    //re-render countries
    if (
      iconClicked === "favourite" &&
      displayContainerClass === "favourite__countries"
    ) {
      // clear display container
      FavouriteCountryView._clearCountryCardContainer();
      // re-render
      FavouriteCountryView.renderCard(model.state.favouriteCountry);
    }

    if (
      iconClicked === "traveled" &&
      displayContainerClass === "traveled__countries"
    ) {
      // clear display container
      TraveledCountryView._clearCountryCardContainer();
      // re-render
      TraveledCountryView.renderCard(model.state.traveledCountry);
    }
  } else {
    // save country
    console.log(model.state.countriesAll);
    model.saveCountry(countryCode, iconClicked);

    //fill icon
    document.getElementById(`${countryCode}__icon--${iconClicked}`).style.fill =
      "orange";
  }
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
  CountryView.addHandlerCountryCard(controlCountryDetails);
  CountryView.addHandlerStoreCountry(controlStoreCountry);
  FavouriteCountryView.addHandlerCountryCard(controlCountryDetails);
  FavouriteCountryView.addHandlerStoreCountry(controlStoreCountry);
  TraveledCountryView.addHandlerStoreCountry(controlStoreCountry);
  TraveledCountryView.addHandlerCountryCard(controlCountryDetails);
  CountryPageView.addHandlerBackBtn();
  CountryPageView.addHandlerStoreCountry(controlStoreCountry);
  CountryNeighbourView.addHandlerCountryCard(controlCountryDetails);
  CountryPaginationView.addHandlerPagination(controlAllCountries);
  CountryPaginationView.addHandlerSlides();
};

init();

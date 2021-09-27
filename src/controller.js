import * as model from "../src/model.js";
import { ALL__COUNTRIES__API, TRACK__IP__API } from "./config.js";
import AutoCompleteView from "./view/autoCompleteView.js";
import CountryNeighbourView from "./view/countryNeighbourView.js";
import CountryPageView from "./view/countryPageView.js";
import SearchView from "./view/countrySearchView.js";
import CountryView from "./view/countryView.js";
import FavouriteCountryView from "./view/favouriteCountryView.js";
import HeaderView from "./view/headerView.js";
import NavView from "./view/navView.js";
import CountryPaginationView from "./view/paginationView.js";
import TraveledCountryView from "./view/traveledCountryView.js";

// Display Countries Card
const controlAllCountries = async function () {
  try {
    //get all countries data
    await model.getAllCountries(ALL__COUNTRIES__API);
  } catch (err) {
    console.error(`${err} Yo`);
  }
};

// Display Countries On Load Paginated By Letter
const controlFilterCountries = async function (sortingLetter = "a") {
  await model.getCountriesFilterByLetter(sortingLetter);
  CountryView.renderCard(model.state.countriesFilterByLetter);
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
  if (countryBorders === undefined) return;
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

// Display autocomplete country
const controlAutoCompleteCountry = function (searchedInput) {
  // get all countries name array
  model.getAllCountriesName();

  // match input with country name array
  const matches = model.state.countriesAllName.filter((name) =>
    name.match(`^${searchedInput}`)
  );

  // clear container
  AutoCompleteView._clear();

  // display the countries matching
  if (searchedInput !== "") AutoCompleteView.render(matches);
};

// Display Filtered Countries
const controlFilterBy = function (filterBy) {
  // clear display container
  FavouriteCountryView._clearCountryCardContainer();
  TraveledCountryView._clearCountryCardContainer();

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
    FavouriteCountryView.renderCard(model.state.favouriteCountry);
  }

  // render traveled countries card
  if (filterBy === "traveled") {
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

  // document.getElementById(`${countryCode}__icon--${iconClicked}`).style.fill ===
  // ""
  //   ? document.getElementById(`${countryCode}__icon--${iconClicked}`).style
  //       .fill === "orange"
  //   : document.getElementById(`${countryCode}__icon--${iconClicked}`).style
  //       .fill === "";

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

const init = async function () {
  await controlAllCountries();
  await controlFilterCountries();
  controlAutoCompleteCountry();
  AutoCompleteView.addHandlerAutoCompleteCountry(controlCountryDetails);
  HeaderView.addHandlerThemeButton();
  SearchView.addHandlerSearch(controlCountryDetails);
  SearchView.addHandlerAutoComplete(controlAutoCompleteCountry);
  NavView.addHandlerWhereAmI(controlWhereAmI);
  NavView.addHandlerFilter(controlFilterBy);
  // CountryView.addHandlerRenderCountryCard(controlAllCountries);
  CountryView.addHandlerCountryCard(controlCountryDetails);
  CountryView.addHandlerStoreCountry(controlStoreCountry);
  FavouriteCountryView.addHandlerCountryCard(controlCountryDetails);
  FavouriteCountryView.addHandlerStoreCountry(controlStoreCountry);
  TraveledCountryView.addHandlerStoreCountry(controlStoreCountry);
  TraveledCountryView.addHandlerCountryCard(controlCountryDetails);
  CountryPageView.addHandlerBackBtn();
  CountryPageView.addHandlerStoreCountry(controlStoreCountry);
  CountryNeighbourView.addHandlerCountryCard(controlCountryDetails);
  CountryPaginationView.addHandlerPagination(controlFilterCountries);
  CountryPaginationView.addHandlerSlides();
};

init();

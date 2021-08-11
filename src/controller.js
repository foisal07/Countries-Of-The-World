import {
  ALL__COUNTRIES__API,
  COUNTRY__API,
  REGION__COUNTRIES__API,
  BORDER__COUNTIRES__API,
  TRACK__IP__API,
} from "./config.js";
import * as model from "../src/model.js";
import CountryView from "./view/countryView.js";
import CountryPaginationView from "./view/paginationView.js";
import CountryPageView from "./view/countryPageView.js";
import CountryNeighbourView from "./view/countryNeighbourView.js";
import NavView from "./view/navView.js";
import SearchView from "./view/countrySearchView.js";
import HeaderView from "./view/headerView.js";
import { AJAX } from "./helper.js";

// import "core-js/stable";
// import "regenerator-runtime/runtime";
// import { async } from "regenerator-runtime";

// Display All Countries Card
const controlAllCountries = async function (sortingLetter = "a") {
  try {
    //get all countries data
    await model.getAllCountries(ALL__COUNTRIES__API);

    //render all countries card
    // model.state.countriesAll.forEach((country) =>
    //   CountryView.renderCard(country)
    // );

    model.state.countriesAll.forEach((country) => {
      if (country.name.slice(0, 1).toLowerCase() === sortingLetter)
        CountryView.renderCard(country);
    });
  } catch (err) {
    console.error(`${err} Yo`);
  }
};

//Display Country Detail Page
const controlGetCountry = async function (countryName) {
  try {
    // get country
    const [country] = model.state.countriesAll.filter(
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

    // get top cities

    // get country alpha2code
    // const countryAlpha2Code = country.alpha2Code;
    // model.getTopCitiesOfCountry(countryAlpha2Code)

    // get bordering countries
    // let borderCountry = await AJAX(
    //   `https://restcountries.eu/rest/v2/alpha?codes=${countryBorders
    //     .map((countrycode) => countrycode.toLowerCase())
    //     .join(";")}`
    // );

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

// Display Current Country
const controlWhereAmI = async function () {
  try {
    // get country [lat,lng]
    await model.getLatLng(TRACK__IP__API);

    // get country
    const [country] = model.state.countriesAll.filter(
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

// Display Filtered Countries By Region
const controlFilterByRegion = function (region) {
  // render regional country card
  model.state.countriesAll.forEach((country) => {
    if (country.region === region) {
      CountryView.renderCard(country);
    }
  });
};

//Get negighbouring country
let borderCountry = [];

const getBorderingCountries = function (countriesAll, countryBorders) {
  countryBorders.forEach((countryCode) => {
    countriesAll.forEach((country) => {
      if (country.alpha3Code === countryCode) borderCountry.push(country);
    });
  });
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

// model.getTopCitiesOfCountry()

const init = function () {
  CountryView.addHandlerRenderCountryCard(controlAllCountries);
  CountryView.addHandlerCountryCard(controlGetCountry);
  CountryPaginationView.addHandlerPagination(controlAllCountries);
  CountryNeighbourView.addHandlerCountryCard(controlGetCountry);
  NavView.addHandlerWhereAmI(controlWhereAmI);
  NavView.addHandlerFilterRegion(controlFilterByRegion);
  SearchView.addHandlerSearch(controlGetCountry);
  CountryPageView.addHandlerBackBtn();
  CountryPaginationView.addHandlerSlides();
};

init();

// Search functionalities //
// Back button //
// Render spinner/loader
// Render error //
// search get country //
// Where am I now //
// Fix bug: getcountry() map reinitialize //
// Fix bug: Neighbour country card > click go to the country //
// Fix bug: Change neighbour country when clicked multiple countries //
// Fix bug: Country card > Country deatil showing map "you are here now"//
// Fix bug: Nav spaacing
// Theme switch
// API request timeout //
// Fix bug: Where AM I multiple negibhours second time //
// Change/test getbordercountries functions to API call

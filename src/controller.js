import { ALL__COUNTRIES__API, TRACK__IP__API } from "./config.js";

import * as model from "../src/model.js";

import CountryView from "./view/countryView.js";
import IconView from "./view/bookmarkView.js";
import CountryPaginationView from "./view/paginationView.js";
import CountryPageView from "./view/countryPageView.js";
import CountryNeighbourView from "./view/countryNeighbourView.js";
import NavView from "./view/navView.js";
import SearchView from "./view/countrySearchView.js";
import HeaderView from "./view/headerView.js";

// Display Countries Card
const controlAllCountries = async function (sortingLetter = "a") {
  try {
    //get all countries data
    await model.getAllCountries(ALL__COUNTRIES__API);

    //render countries card start with A
    const countriesFilterByLetter = model.state.countriesAll.filter(
      (country) => country.name.slice(0, 1).toLowerCase() === sortingLetter
    );

    CountryView.renderCard(countriesFilterByLetter);
  } catch (err) {
    console.error(`${err} Yo`);
  }
};

//Display Country Detail Page
const controlGetCountry = async function (countryName) {
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
const controlFilterByRegion = function (filterBy) {
  if (filterBy === "population") controlSort(filterBy);
  if (filterBy === "area") controlSort(filterBy);
  if (filterBy === "favourite") CountryView.renderCard(bookmarkedCountry);
  if (filterBy === "island") renderIslandcountries();

  // filter regional country
  const countriesFilterByRegion = model.state.countriesAll.filter(
    (country) => country.region === filterBy
  );

  // render regional country card
  CountryView.renderCard(countriesFilterByRegion);
};

// Display Filtered Countries By Population, Area
const controlSort = function (sortBy) {
  // passing compare object population, area etc
  const compareFunction = function (sortBy) {
    return (a, b) => b[0][sortBy] - a[0][sortBy];
  };

  // sort countries
  const countiresSorted = model.state.countriesAll
    .map((country) => [country])
    .sort(compareFunction(sortBy));

  // filter top ten countries
  const topCountries = countiresSorted
    .slice(0, 10)
    .map((country) => country[0]);

  //render top ten filtered countries
  CountryView.renderCard(topCountries);
};

// Bookmarked country
let bookmarkedCountry = [];

const bookmarkCountry = function (countryName) {
  const country = model.state.countriesAll.find(
    (country) => country.name.toLowerCase() === countryName
  );
  bookmarkedCountry.push(country);
};

//Get Island Countries
const renderIslandcountries = () => {
  const islandCountries = model.state.countriesAll.filter(
    (country) => country.borders.length === 0
  );
  CountryView.renderCard(islandCountries);
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

// const getBorderingCountries = function (countriesAll, countryBorders) {
//   // countryBorders.forEach((countryCode) => {
//     countriesAll.filter((country) => {
//       country.alpha3Code === countryCode;
//     });
//   // });
// };

// console.log(getBorderingCountries());

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
  CountryView.addHandlerRenderCountryCard(controlAllCountries);
  CountryView.addHandlerCountryCard(controlGetCountry);
  IconView.addHandlerBookmark(bookmarkCountry);
  CountryPaginationView.addHandlerPagination(controlAllCountries);
  CountryNeighbourView.addHandlerCountryCard(controlGetCountry);
  NavView.addHandlerWhereAmI(controlWhereAmI);
  NavView.addHandlerFilterRegion(controlFilterByRegion);
  SearchView.addHandlerSearch(controlGetCountry);
  CountryPageView.addHandlerBackBtn();
  CountryPaginationView.addHandlerSlides();
  HeaderView.addHandlerThemeButton();
};

init();

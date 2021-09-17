import { AJAX } from "./helper.js";
import { ALL__COUNTRIES__API } from "./config.js";

export const state = {
  countriesAll: [],
  countriesAllName: [],
  countriesFilterByLetter: [],
  ipTrackedCountry: {},
  latlng: [],
  city: {},
  sortedCountries: [],
  islandCountries: [],
  regionalCountries: [],
  favouriteCountry: [],
  traveledCountry: [],
};

let storageAllCountry;

// Get All Country Data
export const getAllCountries = async function (url) {
  try {
    if (storageAllCountry === null) {
      const data = await AJAX(url);
      state.countriesAll = data;
    } else {
      state.countriesAll = JSON.parse(storageAllCountry);
    }
  } catch (err) {
    throw err;
  }
};

// Get all countries name
export const getAllCountriesName = function () {
  state.countriesAllName = state.countriesAll.map((country) => country.name.toLowerCase());
};

// Filter countries by first letter
export const getCountriesFilterByLetter = async function (sortingLetter) {
  state.countriesFilterByLetter = state.countriesAll.filter(
    (country) => country.name.slice(0, 1).toLowerCase() === sortingLetter
  );
};

// Get Lat Lng From IP Adress
export const getLatLng = async function (url) {
  try {
    // Get IP Adress from browser
    const { ip } = await AJAX("https://api.ipify.org/?format=json");

    // Get lat lng
    const data = await AJAX(`${url}${ip}`);
    state.ipTrackedCountry = data.location.country;
    state.city = data.location.city;
    state.latlng = [data.location.lat, data.location.lng];
  } catch (err) {
    throw err;
  }
};

// Sort countries by population and area
export const sortCountries = function (sortBy) {
  // passing compare object (population, area etc.)
  const compareFunction = function (sortBy) {
    return (a, b) => b[0][sortBy] - a[0][sortBy];
  };

  // sort countries
  const countiresSorted = state.countriesAll
    .map((country) => [country])
    .sort(compareFunction(sortBy));

  // filter top ten countries
  state.sortedCountries = countiresSorted
    .slice(0, 10)
    .map((country) => country[0]);
};

// Get Island Countries
export const getIslandcountries = () => {
  state.islandCountries = state.countriesAll.filter(
    (country) => country.borders.length === 0
  );
};

// Get Countries Filter By Region
export const getCountriesFilterByRegion = (filterBy) => {
  state.regionalCountries = state.countriesAll.filter(
    (country) => country.region === filterBy
  );
};

// Persits data
const persistData = function (iconClicked) {
  // persit favourtie country data
  if (iconClicked === "favourite")
    localStorage.setItem(
      "favouriteCountry",
      JSON.stringify(state.favouriteCountry)
    );

  // persit favourtie country data
  if (iconClicked === "traveled")
    localStorage.setItem(
      "traveledCountry",
      JSON.stringify(state.traveledCountry)
    );

  // update state all countries with saved, deleted countries
  localStorage.setItem("allCountry", JSON.stringify(state.countriesAll));
};

// Save Country
export const saveCountry = function (countryCode, iconClicked) {
  const country = state.countriesAll.find(
    (country) => country.alpha3Code === countryCode
  );

  // find the country in state.countriesAll
  const index = state.countriesAll.findIndex(
    (c) => c.alpha3Code === countryCode
  );

  if (iconClicked === "favourite") {
    // store country to favourite
    state.favouriteCountry.push(country);
    //marked country as favourite
    state.countriesAll[index].favourtie = true;
  }

  if (iconClicked === "traveled") {
    // store country to traveled
    state.traveledCountry.push(country);
    //marked country as traveled
    state.countriesAll[index].traveled = true;
  }

  persistData(iconClicked);
};

// Delete Country
export const deleteCountry = function (countryIndex, iconClicked, countryCode) {
  // find the country index state.countriesAll
  const index = state.countriesAll.findIndex(
    (c) => c.alpha3Code === countryCode
  );

  if (iconClicked === "favourite") {
    // delete country from favourite
    state.favouriteCountry.splice(countryIndex, 1);
    //unmark country as favourite
    state.countriesAll[index].favourtie = false;
  }

  if (iconClicked === "traveled") {
    // delete country from traveled
    state.traveledCountry.splice(countryIndex, 1);
    //unmark country as favourite
    state.countriesAll[index].traveled = false;
  }

  persistData(iconClicked);
};

const init = function () {
  // load all countries with user updated data
  storageAllCountry = localStorage.getItem("allCountry");
  if (storageAllCountry) state.countriesAll = JSON.parse(storageAllCountry);

  // load favourited countries
  const storageFavouriteCountry = localStorage.getItem("favouriteCountry");

  if (storageFavouriteCountry)
    state.favouriteCountry = JSON.parse(storageFavouriteCountry);

  // load traveled countries
  const storageTraveledCountry = localStorage.getItem("traveledCountry");
  if (storageTraveledCountry)
    state.traveledCountry = JSON.parse(storageTraveledCountry);
};

init();

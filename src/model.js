import { AJAX } from "./helper.js";

export const state = {
  countriesAll: [],
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

// Get All Country Data
export const getAllCountries = async function (url, sortingLetter) {
  try {
    const data = await AJAX(url);
    state.countriesAll = data;

    // filter countries by starting letter
    state.countriesFilterByLetter = state.countriesAll.filter(
      (country) => country.name.slice(0, 1).toLowerCase() === sortingLetter
    );
  } catch (err) {
    throw err;
  }
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

  //marked country as favourite
  state.countriesAll[index].favourtie = true;

  console.log(state.countriesAll);

  if (iconClicked === "favourite") state.favouriteCountry.push(country);

  if (iconClicked === "traveled") state.traveledCountry.push(country);

  persistData(iconClicked);
};

// Delete Country
export const deleteCountry = function (countryIndex, iconClicked, countryCode) {

  // find the country index state.countriesAll
  const index = state.countriesAll.findIndex(
    (c) => c.alpha3Code === countryCode
  );

  //unmark country as favourite
  state.countriesAll[index].favourtie = false;

  console.log(state.countriesAll);

  console.log(state.countriesAll);
  if (iconClicked === "favourite")
    state.favouriteCountry.splice(countryIndex, 1);

  if (iconClicked === "traveled") state.traveledCountry.splice(countryIndex, 1);

  persistData(iconClicked);
};

const init = function () {
  const storageFavouriteCountry = localStorage.getItem("favouriteCountry");

  if (storageFavouriteCountry)
    state.favouriteCountry = JSON.parse(storageFavouriteCountry);

  const storageTraveledCountry = localStorage.getItem("traveledCountry");
  if (storageTraveledCountry)
    state.traveledCountry = JSON.parse(storageTraveledCountry);
};

init();

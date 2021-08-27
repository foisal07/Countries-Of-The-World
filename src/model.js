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
  bookmarkedCountry: [],
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
  // passing compare object population, area
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

// Save Country
export const saveCountry = function (countryCode, iconClicked) {
  const country = state.countriesAll.find(
    (country) => country.alpha3Code === countryCode
  );
  if (iconClicked === "bookmark") state.bookmarkedCountry.push(country);
  if (iconClicked === "traveled") state.traveledCountry.push(country);
};

// export const getTopCitiesOfCountry = async function (countryCode) {
//   const data = await AJAX(
//     `${ACCUWEATHER__API__URL}adminareas/${countryCode}?apikey=${ACCUWEATHER__API__KEY}`
//   );
//   console.log(data);
// }

// export const getCountriesByRegion = async function (url, region) {
//   try {
//     const data = await AJAX(`${url}${region}`);
//     state.countriesByRegion = data;
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const getBorderCountries = async function (url, borders) {
//   try {

//   } catch (err) {
//     console.log(err);
//   }
// };

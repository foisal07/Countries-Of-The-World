import { AJAX } from "./helper.js";

export const state = {
  countriesAll: [],
  ipTrackedCountry: {},
  latlng: [],
};

export const getAllCountries = async function (url) {
  try {
    const data = await AJAX(url);
    state.countriesAll = data;
  } catch (err) {
    throw err
  }
};

export const getLatLng = async function (url) {
  try {
    // Get IP Adress from browser
    const { ip } = await AJAX("https://api.ipify.org/?format=json");

    // Get lat lng
    const data = await AJAX(`${url}${ip}`);
    state.ipTrackedCountry = data.location.country;
    state.latlng = [data.location.lat, data.location.lng];
  } catch (err) {
    throw err;
  }
};

// export const getCountry = async function (url, country) {
//   try {
//     const data = await AJAX(`${url}${country}`);
//     const [coun] = data;
//     console.log(coun);
//     state.searchedCountry = coun;
//     const [...borders] = coun.borders;
//     console.log(borders);
//     state.borders = coun.borders;

//     // Returns Array of promise
//     //     const borderCoutnriesData = state.borders.map(async (countryCode) => {
//     //       const res = await AJAX(
//     //         `https://restcountries.eu/rest/v2/alpha/${countryCode}`
//     //       );
//     //       return res;
//     //     });

//     //     state.borderCoutnries = await Promise.all(borderCoutnriesData);

//     //     // console.log(state.borderCoutnries);

//     //     // state.borders.forEach(async (countryCode) => {
//     //     //   const res = await AJAX(
//     //     //     `https://restcountries.eu/rest/v2/alpha/${countryCode}`
//     //     //   );
//     //     // state.borderCoutnries.push(res);

//     //     // Reverse Geo code API
//     //     // https://geocode.xyz/${lat},${lng}?geoit=json
//     //     });

//     //     console.log(state.borderCoutnries);
//   } catch (err) {
//     console.log(err);
//   }
// };

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
//     const borderCoutnriesData = borders.map(async (countryCode) => {
//       const res = await AJAX(
//         `${url}${countryCode}`
//       );
//       console.log(res);
//       return res;
//     });

//     state.borderCoutnries = await Promise.all(borderCoutnriesData);
//     console.log(state.borderCoutnries);
//     // borders.forEach(async (country) => {
//     //   const data = await AJAX(`${url}${country}`);
//     //   state.borderCountries.push(data);
//     // });
//   } catch (err) {
//     console.log(err);
//   }
// };

// state.countriesAsia = data.filter((country) => country.region === "Asia");
// state.countriesEurope = data.filter((country) => country.region === "Europe");
// state.countriesAfrica = data.filter((country) => country.region === "Africa");
// state.countriesOceania = data.filter(
//   (country) => country.region === "Oceania"
// );
// state.countriesAmericas = data.filter(
//   (country) => country.region === "Americas"
// );
// state.country;

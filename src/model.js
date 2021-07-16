import { AJAX } from "./helper.js";

export const state = {
  countriesAll: [],
  searchedCountry: [],
  countriesByRegion: [],
};

export const getAllCountries = async function (url) {
  try {
    const data = await AJAX(url);
    state.countriesAll = data;
  }catch (err) {
    console.log(err);
  }
};

export const getSearchedCountry = async function (url, country) {
  try {
    const data = await AJAX(`${url}${country}`);
    state.searchedCountry = data;
  } catch (err) {
    console.log(err);
  }
};

export const getCountriesByRegion = async function (url, region) {
  try {
    const data = await AJAX(`${url}${region}`);
    state.countriesByRegion = data;
  } catch (err) {
    console.log(err);
  }
};



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
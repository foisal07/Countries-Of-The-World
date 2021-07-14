import { AJAX } from "./helper.js";

export const state = {
  countries: {},
};

export const getAllCountry = async function (url) {
  const data = await AJAX(url);

  data.forEach((countries) => {
    return state.countries = countries;
  });
};

console.log(state);

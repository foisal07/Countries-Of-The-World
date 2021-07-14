import * as model from "../src/model.js";


// import "core-js/stable";
// import "regenerator-runtime/runtime";
// import { async } from "regenerator-runtime";

const body = document.body;
const modeBtn = document.querySelector(".header_darkmode_btn");

modeBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
  body.classList.toggle("light");
});

const controlAllCountries = async function () {
  //Get all countries data
  await model.getAllCountry("https://restcountries.eu/rest/v2/all");
};

controlAllCountries();

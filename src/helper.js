import { TIMEOUT__SEC } from "./config.js";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT__SEC)]);
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

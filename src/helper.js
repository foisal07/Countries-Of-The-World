export const AJAX = async function (url) {
  try {
    const fetchPRO = await fetch(url);
    const data = fetchPRO.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

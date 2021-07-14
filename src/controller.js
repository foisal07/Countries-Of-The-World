const body = document.body;
const modeBtn = document.querySelector(".header_darkmode_btn");

modeBtn.addEventListener("click", () => {
  // body.classList.replace("dark", "light");
  // body.classList.replace("light", "dark");
  body.classList.toggle("dark");
  body.classList.toggle("light");
  //   body.classList.replace("light", "light");
});



const formSearch = document.querySelector(".form-search"),
  inputCitiesFrom = formSearch.querySelector(".input__cities-from"),
  dropdownCitiesFrom = formSearch.querySelector(".dropdown__cities-from"),
  inputCitiesTo = formSearch.querySelector(".input__cities-to"),
  dropdownCitiesTo = formSearch.querySelector(".dropdown__cities-to");

const city = [
  "Melbourne",
  "Sydney",
  "Bendigo",
  "Gold Coast",
  "Perth",
  "Darvin",
  "New York",
  "San Francisco",
  "London",
  "Paris",
  "Mexico",
  "Toronto",
  "Bangkok",
  "Las Vegas",
  "Madrid",
];

inputCitiesFrom.addEventListener("input", () => {
  console.log("event input");
});

const get = (name) => {
  console.log("demand of get: " + name);
};

get("Olegus");

//get(500 years);

get("bobr");

get(500);

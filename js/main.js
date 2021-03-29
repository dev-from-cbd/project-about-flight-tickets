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
  const filterCity = city.filter((item) => {
    return item.includes(inputCitiesFrom.value);
    console.log(filterCity);
  });
});

const get = (name) => {
  console.log("demand of get: " + name);
};

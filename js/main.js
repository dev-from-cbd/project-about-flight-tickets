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
  dropdownCitiesFrom.textContent = "";

  if ((inputCitiesFrom.value !== "")) {
  }

  const filterCity = city.filter((item) => {
    const fixItem = item.toLowerCase();

    return fixItem.includes(inputCitiesFrom.value.toLowerCase());
  });

  filterCity.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add(".dropdown__city");
    li.textContent = item;
    dropdownCitiesFrom.append(li);
  });
});

const get = (name) => {
  console.log("demand of get: " + name);
};

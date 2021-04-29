// getting elements from a page
const formSearch = document.querySelector(".form-search"),
  inputCitiesFrom = formSearch.querySelector(".input__cities-from"),
  dropdownCitiesFrom = formSearch.querySelector(".dropdown__cities-from"),
  inputCitiesTo = formSearch.querySelector(".input__cities-to"),
  dropdownCitiesTo = formSearch.querySelector(".dropdown__cities-to"),
  inputDateDepart = formSearch.querySelector(".input__date-depart");

// data
const CITIESAPI = "http://api.travelpayouts.com/data/en/cities.json",
  PROXY = "http://cors-anywhere.herokuapp.com/",
  API_KEY = "853c139c883e1864a947c2d4131e004";

let city = [];

//functions
const getData = (url, callback) => {
  const request = new XMLHttpRequest();

  request.open("GET", url);

  request.addEventListener("readystatechange", () => {
    if (request.readyState !== 4) return;

    if (request.status === 200) {
      callback(request.response);
    } else {
      console.error(request.status);
    }
  });

  request.send();
};

const showCity = (input, list) => {
  list.textContent = "";

  if (input.value !== "") {
    const filterCity = city.filter((item) => {
      const fixItem = item.name.toLowerCase();
      return fixItem.includes(input.value.toLowerCase());
    });

    filterCity.forEach((item) => {
      const li = document.createElement("li");
      li.classList.add("dropdown__city");
      li.textContent = item.name;
      list.append(li);
    });
  }
};

const selectCity = (event, input, list) => {
  const target = event.target;
  if (target.tagName.toLowerCase() === "li") {
    input.value = target.textContent;
    list.textContent = "";
  }
};

inputCitiesFrom.addEventListener("input", () => {
  showCity(inputCitiesFrom, dropdownCitiesFrom);
});

inputCitiesTo.addEventListener("input", () => {
  showCity(inputCitiesTo, dropdownCitiesTo);
});

dropdownCitiesFrom.addEventListener("click", (event) => {
  selectCity(event, inputCitiesFrom, dropdownCitiesFrom);
});

dropdownCitiesTo.addEventListener("click", (event) => {
  selectCity(event, inputCitiesTo, dropdownCitiesTo);
});

//Calls function
getData(
  PROXY + CITIESAPI,
  (data) => (city = JSON.parse(data).filter((item) => item.name))
);

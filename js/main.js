// getting elements from a page
const formSearch = document.querySelector(".form-search"),
  inputCitiesFrom = formSearch.querySelector(".input__cities-from"),
  dropdownCitiesFrom = formSearch.querySelector(".dropdown__cities-from"),
  inputCitiesTo = formSearch.querySelector(".input__cities-to"),
  dropdownCitiesTo = formSearch.querySelector(".dropdown__cities-to"),
  inputDateDepart = formSearch.querySelector(".input__date-depart"),
  cheapestTicket = document.getElementById("cheapest-ticket"),
  otherCheapTickets = document.getElementById("other-cheap-tickets");

// data
const CITIESAPI = "http://api.travelpayouts.com/data/en/cities.json",
  PROXY = "http://cors-anywhere.herokuapp.com/",
  API_KEY = "853c139c883e1864a947c2d4131e004",
  CALENDAR = "http://min-prices.aviasales.ru/calendar_preload";

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
      return fixItem.startsWith(input.value.toLowerCase());
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

const getNameCity = (code) => {
  const objCity = city.find((item) => item.code === code);
  return objCity.name;
}

const getData = (date) => {
  return new Date(date).toLocaleString("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getChanges = (n) => {
  if (n) {
    return n === 1 ? "with one stop" : "with two or more transfers";
  } else {
    return "Without transfers";
  }
};

const getLinkAviasales = () => {
  let link = 'https://www.aviasales.ru/search/';

  link += data.origin;

  const date = new Date(data.depart_date);

  console.log(data);

  return link;
}
//https://www.aviasales.ru/search/SVX2905KGD1

const createCard = (data) => {
const ticket = document.createElement("article");
ticket.classList.add('ticket');

let deep = "";

if (data) {
  deep = `
    <h3 class="agent">${data.gate}</h3>
      <div class="ticket__wrapper">
        <div class="left-side">
          <a href="${getLinkAviasales}" class="button button__buy">Buy for ${data.value}&dollar;</a>
        </div>
        <div class="right-side">
          <div class="block-left">
            <div class="city__from">Departure from the city
              <span class="city__name">${getNameCity(data.origin)}</span>
            </div>
            <div class="date">${getDate(data.depart_date)}</div>
          </div>

          <div class="block-right">
            <div class="changes">${getChanges(data.number_of_changes)}</div>
            <div class="city__to">Destination city:
              <span class="city__name">${getNameCity(data.destination)}</span>
            </div>
          </div>
        </div>
      </div>
  `;
} else {
  deep = "<h3>Unfortunately, there were no tickets available for the current date.</h3>"
}

ticket.insertAdjacentHTML("afterbegin", deep)

return ticket;
};

const renderCheapDay = (cheapTicket) => {
  cheapestTicket.style.display = "block";
  cheapestTicket.innerHTML = "<h2>The cheapest ticket for the selected date</h2>";

  const ticket = createCard(cheapTicket[0]);
  cheapestTicket.append(ticket);
};

const renderCheapYear = (cheapTickets) => {
  otherCheapTickets.style.display = "block";
  otherCheapTickets.innerHTML = "<h2>Cheapest tickets for other dates</h2>";

  cheapTickets.sort((a, b) => a.value - b.value);

  console.log(cheapTickets);
};

const renderCheap = (data, date) => {
  const cheapTicketYear = JSON.parse(data).best_prices;

  const cheapTicketDay = cheapTicketYear.filter((item) => {
    return item.depart_date === date;
  });

  renderCheapDay(cheapTicketDay);
  renderCheapYear(cheapTicketYear);
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

formSearch.addEventListener("submit", (event) => {
  event.preventDefault();

  const cityFrom = city.find((item) => {
    return inputCitiesFrom.value === item.name;
  });

  const cityTo = city.find((item) => {
    return inputCitiesTo.value === item.name;
  });

  const formData = {
    from: cityFrom,
    to: cityTo,
    when: inputDateDepart.value,
  };

  if (formData.from && formData.to) {
    const requestData =
      `?depart_date=${formData.when}&origin=${formData.from.code}` +
      `&destination=${formData.to.code}&one_way=true`;

    getData(CALENDAR + requestData, (data) => {
      renderCheap(data, formData.when);
    });
  }, error => {
    alert("Please, enter correct name of a city");
    console.error('Error', error)
  }
});

//Calls function
getData(PROXY + CITIESAPI, (data) => {
  city = JSON.parse(data).filter(
    (item) => item.name && item.destination && item.origin
  );

  city.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });

  console.log(city);
});

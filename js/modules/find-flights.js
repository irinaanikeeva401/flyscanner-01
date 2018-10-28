(function() {
  let tableBody = document.querySelector("#table-tbody");
  const btnSubmit = document.querySelector("#btn-submit");

  btnSubmit.addEventListener("click", function() {
    const keyDeparture = window.getDepartureKey();
		const keyDestination = window.getDestinationKey();

    if(!keyDeparture) {
        document.querySelector('#input-from').closest('.field').classList.add('error');
    } else {
        document.querySelector('#input-from').closest('.field').classList.remove('error');
    }

    if(!keyDestination) {
        document.querySelector('#input-to').closest('.field').classList.add('error');
    } else {
        document.querySelector('#input-to').closest('.field').classList.remove('error');
    }

    if(keyDeparture && keyDestination) {
      btnSubmit.classList.add("disabled");

      window.api.getFlights(function(response) {
        showTable(); 

        renderTable(response);
        window.updateFilterCount();
        window.hidePlaceholder();
        btnSubmit.classList.remove("disabled");
      }, function() {
        window.showPlaceholder();
        hideTable();
        btnSubmit.classList.remove("disabled");
      });
    }
  });

  function showTable() {
    const table = document.querySelector('#result-search');

    table.classList.remove('hidden');
  }

  function hideTable() {
    const table = document.querySelector('#result-search');

    table.classList.add('hidden');
  }

  function renderTable(data) {
    document.getElementById("table-tbody").innerHTML = "";

    data.forEach(function(item) {
      tableBody.innerHTML += "<tr>";

      airline(item);
      aircraft(item);
      flightNumber(item);
      destination(item);
      departureCell(item);
      arrivalCell(item);
      gateway(item);
      duration(item);
      priceCell(item);

      tableBody.innerHTML += "</tr>";
    });
  }

  function airline(key) {
    const cell = document.createElement("td");
    tableBody.appendChild(cell);

    const logoAirline = document.createElement("div");
    logoAirline.className = "airline-logo";
    cell.appendChild(logoAirline);

    let image = document.createElement("img");

    if (key.AirlineLogo) {
      image.setAttribute("src", key.AirlineLogo);
    } else {
      image = document.createElement("div");
      image.innerText = key.Airline;
    }

    logoAirline.appendChild(image);
  }

  function aircraft(key) {
    const cell = document.createElement("td");

    cell.innerText = key.Aircraft;
    tableBody.appendChild(cell);
  }

  function flightNumber(key) {
    const cell = document.createElement("td");

    cell.innerText = key.CodeAircraft;
    tableBody.appendChild(cell);
  }

  function destination(key) {
    const cell = document.createElement("td");

    cell.innerText = key.Destination;
    tableBody.appendChild(cell);
  }

  function departureCell(key) {
    const cell = document.createElement("td");
    
    cell.className = "data-cell";
    tableBody.appendChild(cell);

    const time = document.createElement("div");
    time.className = "time";
    time.innerText = getTime(key.Departure);
    cell.appendChild(time);

    const dateElem = document.createElement("div");
    dateElem.className = "date";
    dateElem.innerText = getDate(key.Departure);
    cell.appendChild(dateElem);
  }

  function arrivalCell(key) {
    const cell = document.createElement("td");
    
    cell.className = "data-cell";
    tableBody.appendChild(cell);

    const time = document.createElement("div");
    time.className = "time";
    time.innerText = getTime(key.Arrival);
    cell.appendChild(time);

    const dateElem = document.createElement("div");
    dateElem.className = "date";
    dateElem.innerText = getDate(key.Arrival);
    cell.appendChild(dateElem);
  }

  function gateway(key) {
    const cell = document.createElement("td");
    cell.innerText = key.Gate;
    tableBody.appendChild(cell);
  }

  function duration(key) {
    let departureDate = new Date(key.Departure);
    let arrivalDate = new Date(key.Arrival);
    let diff = arrivalDate - departureDate + 3600000 * key.GMT;
    const cell = document.createElement("td");

    tableBody.appendChild(cell);

    const textElem = document.createElement("span");
    textElem.innerText = getTime(diff);
    cell.appendChild(textElem);

    if (key.Transfer) {
      const transferElem = document.createElement("div");
      transferElem.className = "transfer";
      cell.appendChild(transferElem);

      const countOfTransfer = document.createElement("span");
      countOfTransfer.className = "count-of-transfer";

      if (key.Transfer.length == 1) {
        countOfTransfer.innerText = "1 пересадка";
      } else {
        countOfTransfer.innerText = key.Transfer.length + " пересадки";
      }

      transferElem.appendChild(countOfTransfer);

      key.Transfer.forEach(function(item, index) {
        const cityOfTransfer = document.createElement("span");
        const isLastIndex = key.Transfer.length - 1 === index;

        cityOfTransfer.className = "city-of-transfer";
        cityOfTransfer.setAttribute("title", item.PlaceName + ", " + item.PlaceId);
        cityOfTransfer.innerText = " " + item.PlaceId + (!isLastIndex ? "," : "");

        transferElem.appendChild(cityOfTransfer);
      });
    }
  }

  function priceCell(key) {
    const cell = document.createElement("td");
    cell.className = "price-cell";
    tableBody.appendChild(cell);

    const price = document.createElement("div");
    price.innerText = (key.Price * window.getCurrentRate()).toFixed(0) + " " + window.getCurrentSymbol();
    price.className = "price";
    cell.appendChild(price);

    const countOfPassengers = document.querySelector("#passenger .selected").getAttribute("data-value");

    let priceTotal = document.createElement("div");
    priceTotal.innerText = "Итого: ";
    priceTotal.className = "price-total";
    cell.appendChild(priceTotal);

    let priceSingle = document.createElement("span");
    priceSingle.className = "price-total-block";
    priceSingle.innerText = (key.Price * countOfPassengers * window.getCurrentRate()).toFixed(0) + " " + window.getCurrentSymbol();

    priceTotal.appendChild(priceSingle);

    let btn = document.createElement("button");
    btn.className = "ui button fluid green";
    btn.innerText = "Купить";
    cell.appendChild(btn);
  }

  function getTime(date) {
    const parsedDate = new Date(date);

    return ('0' + parsedDate.getHours()).slice(-2) + ':' + ('0'+ parsedDate.getMinutes()).slice(-2);
  }

  function getDate(date) {
    const parsedDate = new Date(date);

    return parsedDate.toLocaleString("ru", { day : 'numeric', month: 'long', year: 'numeric' });
  }
})();

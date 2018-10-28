(function() {
  function getAjax(url, cb, cbOnError) {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {

      if (xhr.readyState === 4 && xhr.status === 200) {
        cb(JSON.parse(xhr.responseText));
      } else {

        if(cbOnError) {
          cbOnError();
        }
      }
    };

    xhr.open("GET", url, true);

    xhr.send();
  }

  function getCurrencies(cb) {
    getAjax("http://dump.metacode.in/flyscanner/api/exchange_rates.json", cb);
  }

  function getDeparture(cb) {
    getAjax("http://dump.metacode.in/flyscanner/api/departure.json", cb);
  }

  function getDestination(cb) {
    getAjax("http://dump.metacode.in/flyscanner/api/destination.json", cb);
  }

  function getFlights(cb, cbOnError) {
    const direction = document.querySelector("#input-to .selected").getAttribute("data-value");
    
    getAjax("http://dump.metacode.in/flyscanner/api/flights/" + direction + ".json", cb, cbOnError);
  }

  window.api = {
    getCurrencies,
    getDeparture,
    getDestination,
    getFlights
  };
})();

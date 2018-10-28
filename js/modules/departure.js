(function() {
  let container = document.querySelector("#input-from");
  let currentIndex = 0;
  let isInit = false;
  let data = {};

  function close() {
    let menu = container.querySelector(".menu");

    container.classList.remove("active");
    menu.classList.remove("transition");
    menu.classList.remove("visible");
  }

  function updateCurrentItem(key) {
    let currentItem = container.querySelector(".text");
    currentItem.innerText = key;
    currentItem.classList.remove("default");
  }

  function renderList() {
    const menu = container.querySelector(".menu");
    menu.innerHTML = "";

    data.forEach(function(item, index) {
      const elem = document.createElement("div");
      elem.setAttribute("data-value", item["CityId"].toLowerCase());
      elem.classList.add("item");
      elem.innerText = item["PlaceName"];

      const plane = document.createElement("i");
      plane.className = "plane icon";
      elem.insertBefore(plane, elem.firstChild);

      menu.appendChild(elem);

      elem.addEventListener("click", function() {
        let items = container.querySelectorAll(".item");

        items[currentIndex].classList.remove("selected");
        this.classList.add("selected");
        currentIndex = index;
        updateCurrentItem(item["PlaceName"]);

        close();
      }, true);
    });
  }

  function loadData() {
    container.classList.add("loading");

    window.api.getDeparture(function(response) {
      container.classList.remove("loading");
      data = response;
      renderList();
    });

    isInit = true;
  }

  // Open list
  container.addEventListener("click", function() {
    let menu = container.querySelector(".menu");

    container.classList.add("active");
    menu.classList.add("transition", "visible");

    if (!isInit) {
      loadData();
    }
  }, true);

  document.addEventListener("click", evt => {
    let targetElement = evt.target;

    do {
      if (targetElement == container) {
        return;
      }
      targetElement = targetElement.parentNode;
    } while (targetElement);

    close();
  });

  function updateDeparture(key, collection, index) {
    data = collection;
    currentIndex = index;

    updateCurrentItem(key);
    renderList();
  }

  function getDepartureData() {
    return data;
  }

  function getCurrentIndexDep() {
    return currentIndex;
  }

  function getDepartureKey() {
    return data.length > 0 ? data[currentIndex]["PlaceName"] : null;
  }

  window.getCurrentIndexDep = getCurrentIndexDep;
  window.updateDeparture = updateDeparture;
  window.getDepartureData = getDepartureData;
  window.getDepartureKey = getDepartureKey;
})();

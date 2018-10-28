(function() {
  const container = document.querySelector("#type-flight");
  let activeIndex = 1;

  function setTwoWays() {
    setActiveState(1);
  }

  function setActiveState(index) {
    const field = container.querySelectorAll(".field")[index];
    const radioInput = field.querySelector("input[type=radio]");
    const radioItem = field.querySelector(".radio");

    radioInput.click();
    radioItem.classList.add("checked");
  }

  function addEvent(items) {
    items.forEach((item, index) => {
      item.addEventListener("click", e => {
        setActiveState(index);
      });
    });
  }

  function init(index) {
    const labels = container.querySelectorAll(".field label");
    setActiveState(index);
    addEvent(labels);
  }

  init(activeIndex);

  const firstClick = document.querySelector("#firstCB");
  firstClick.onclick = function() {
    eventDisabled();
  };

  const secondClick = document.querySelector("#secondCB");
  secondClick.onclick = function() {
    eventDisabled();
  };

  function eventDisabled() {
    const chbox = document.getElementById("firstCB");
    if (chbox.checked) {
      document.getElementById("date-range-end").classList.remove("disabled");
    } else {
      document.getElementById("date-range-end").classList.add("disabled");
    }
  }

  eventDisabled();

  const dateRangeClick = document.querySelector("#date-range-end");
  dateRangeClick.onclick = function() {
    const c1 = document.querySelector("#firstCB");
    c1.checked = "checked";
    document.getElementById("date-range-end").classList.remove("disabled");
  };

  window.setTwoWays = setTwoWays;
})();

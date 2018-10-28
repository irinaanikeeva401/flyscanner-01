(function() {
  const search = document.getElementsByClassName("number-of-search");
  const typeOfFilter = document.getElementById("type-of-filter");
  const buttons = document.getElementById("buttons");
  let selectedButton = document.querySelector("#buttons .active");
  
  function updateFilterCount() {
    const count = document.getElementById("table-tbody").getElementsByTagName("tr");
    search[0].innerText = count.length / 2;
  }

  buttons.addEventListener("click", function(e) {
    selectedButton.classList.remove("active");

    selectedButton = e.target;
    selectedButton.classList.add("active");

    typeOfFilter.innerText = selectedButton.innerText;
  });

  window.updateFilterCount = updateFilterCount;
})();

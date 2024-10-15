import getData from "./getData.js";
import getCards from "./getCards.js";

const d = document;

const $cardsContainer = d.querySelector(".cards-container");

let filtered = [],
  filterClasses = ["filter-weapon", "filter-quality"],
  weapons = ["bow", "catalyst", "claymore", "polearm", "sword"],
  qualities = ["5-stars", "4-stars", "3-stars", "2-stars", "1-stars"];

let $filters = "filter-checkbox";

const filterAction = (filters, data) => {
  let charactersId = [];

  let filtersStr = filters.map((e) => e.toString());

  let [weaponFilter, qualityFilter] = filtersStr;

  for (let i = Object.keys(data).length; i >= 1; i--) {
    charactersId.push(i);
    if (
      weaponFilter.includes(data[i].weapon) &&
      qualityFilter.includes(data[i].quality)
    )
      charactersId = charactersId.filter((e) => e !== i);
  }

  filtered.forEach((e) => (d.getElementById(e).style.display = "inline-flex"));

  filtered = [];

  charactersId.forEach((e) => {
    let $card = d.getElementById(e);
    $card.style.display = "none";

    filtered.push(e);
  });
};

const getCheckNames = (className) => {
  let $checkbox = document.querySelectorAll(
    `.${className} input[type=checkbox]:checked`
  );
  return [...$checkbox].map((e) => e.id);
};

const getChecked = (filterNames) => {
  let filters = filterNames.map((e) => getCheckNames(e)),
    res = [];

  for (let i = 0; i < filterNames.length; i++) {
    if (filterNames[i].includes("weapon")) {
      filters[i].length == 0 ? res.push(weapons) : res.push(filters[i]);
    } else if (filterNames[i].includes("quality")) {
      filters[i].length == 0 ? res.push(qualities) : res.push(filters[i]);
    }
  }

  filterAction(res, weaponsData);
};

d.addEventListener("click", (e) => {
  if (e.target.className === $filters) getChecked(filterClasses);
});

let weaponsData = await getData("./db/weapons.json");

console.log(weaponsData);

getCards(weaponsData, $cardsContainer, "./assets/weapons");
getChecked(filterClasses);

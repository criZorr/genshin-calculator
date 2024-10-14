import getData from "./getData.js";
import getCards from "./getCards.js";

const d = document;

const $cardsContainer = d.querySelector(".cards");

let filtered = [],
  filterClasses = ["filter-weapon", "filter-quality"],
  weapons = ["bow", "catalyst", "claymore", "polearm", "sword"],
  qualities = ["5-stars", "4-stars", "3-stars", "2-stars", "1-stars"];

let $filters = "filter-checkbox";

const filterAction = (filters, data) => {
  let names = [];

  let filtersStr = filters.map((e) => e.toString());

  let [weaponFilter, qualityFilter] = filtersStr;

  for (let i = Object.keys(data).length; i >= 1; i--) {
    names.push(data[i].name);
    if (
      weaponFilter.includes(data[i].weapon) &&
      qualityFilter.includes(data[i].quality)
    )
      names = names.filter((e) => e !== data[i].name);
  }

  filtered.forEach((e) => (d.querySelector(e).style.display = "inline-flex"));

  filtered = [];

  names.forEach((e) => {
    let name = e
      .replaceAll(" ", "_")
      .replaceAll(")", "")
      .replaceAll("(", "")
      .replaceAll("'", "_")
      .replaceAll('"', "");

    let $card = d.querySelector(`.${name}-card`);
    $card.style.display = "none";

    filtered.push(`.${name}-card`);
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

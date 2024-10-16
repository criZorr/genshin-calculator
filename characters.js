import getData from "./getData.js";
import getCards from "./getCards.js";
import getNumbList from "./getNumbList.js";

const d = document;

const $cardsContainer = d.querySelector(".cards-container"),
  $modal = d.querySelector(".modal-container");

let filtered = [],
  filterClasses = ["filter-element", "filter-weapon", "filter-quality"],
  elements = ["anemo", "cryo", "dendro", "electro", "geo", "hydro", "pyro"],
  weapons = ["bow", "catalyst", "claymore", "polearm", "sword"],
  qualities = ["5-stars", "4-stars"];

let $filters = "filter-checkbox";

const filterAction = (filters, data) => {
  let charactersId = [];

  let filtersStr = filters.map((e) => e.toString());

  let [elementFilter, weaponFilter, qualityFilter] = filtersStr;

  for (let i = Object.keys(data).length; i >= 1; i--) {
    charactersId.push(i);
    if (
      elementFilter.includes(data[i].element) &&
      weaponFilter.includes(data[i].weapon) &&
      qualityFilter.includes(data[i].quality.replace("-colab", ""))
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
  let $checkbox = document.querySelectorAll(`.${className} input[type=checkbox]:checked`);
  return [...$checkbox].map((e) => e.id);
};

const getChecked = (filterNames) => {
  let filters = filterNames.map((e) => getCheckNames(e)),
    res = [];

  for (let i = 0; i < filterNames.length; i++) {
    if (filterNames[i].includes("element")) {
      filters[i].length == 0 ? res.push(elements) : res.push(filters[i]);
    } else if (filterNames[i].includes("weapon")) {
      filters[i].length == 0 ? res.push(weapons) : res.push(filters[i]);
    } else if (filterNames[i].includes("quality")) {
      filters[i].length == 0 ? res.push(qualities) : res.push(filters[i]);
    }
  }

  filterAction(res, charactersData);
};

const getTalents = (characterId) => {
  $modal.style.display = "flex";

  let $talentContainer = d.querySelector(".talent-info"),
    talents = charactersData[characterId].talents,
    name = charactersData[characterId].name;

  for (let i = 0; i < talents.length; i++) {
    let fragment = d.createElement("div");
    fragment.classList.add("talent-selector-container");

    fragment.innerHTML = `
              <div class="custom-checkbox">
                <input
                  type="checkbox"
                  name="checkbox-talent-${i + 1}"
                  id="checkbox-talent-${i + 1}"
                />
                <span class="custom-checkbox-btn bg-snd">
                  <div></div>
                </span>
              </div>
              <div class="talent-selector bg-snd">
                <section class="talent-data">
                  <figure class="talent-img">
                    <img src="./assets/talent.png" alt="${name} talent ${i + 1}" />
                  </figure>
                  <p class="frst-text compact">${talents[i]}</p>
                </section>
                <div class="talent-lvl bg-snd">
                  <select class="nmb-list frst-text" id="first-selection">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                  </select>
                  <div class="scnd-text">→</div>
                  <select class="nmb-list frst-text" id="second-selection">
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  </select>
                </div>
              </div>
    `;

    $talentContainer.appendChild(fragment);
  }
};

d.addEventListener("change", (e) => {
  let eventId = e.target.id;

  if (eventId === "first-selection") getNumbList(e.target);
});

d.addEventListener("click", (e) => {
  let eventClass = e.target.className,
    eventId = e.target.id;

  if (eventClass === $filters) getChecked(filterClasses);

  if (eventClass === "card" || eventClass === "character-img" || eventClass === "card-name") {
    getTalents(e.target.attributes._id.value);
  }

  if (eventClass === "modal-container" || eventId === "cancel-btn") {
    $modal.style.display = "none";
    d.querySelector(".talent-info").innerHTML = "";
  }
});

let charactersData = await getData("./db/characters.json");

getCards(charactersData, $cardsContainer, "./assets/characters");
getChecked(filterClasses);

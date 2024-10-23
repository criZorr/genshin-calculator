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

const isChecked = (el, info) => {
  if (el.checked) {
    info.style.opacity = "1";
    info.style.pointerEvents = "all";
    info.style.transition = "all 0.25s ease-in";
  } else {
    info.style.opacity = "0.5";
    info.style.pointerEvents = "none";
    info.style.transition = "all 0.25s ease-out";
  }
};

const getTalents = (characterId) => {
  $modal.style.display = "flex";

  isChecked(d.getElementById("checkbox-level"), d.querySelector(".level-info"));

  let $talentContainer = d.querySelector(".talent-info"),
    talents = charactersData[characterId].talents,
    name = charactersData[characterId].name,
    weapon = charactersData[characterId].weapon;

  for (let i = 0; i < talents.length; i++) {
    let fragment = d.createElement("div");
    fragment.classList.add("talent-selector-container");

    let talentName = talents[i];
    talentName = talentName.replaceAll(":", "_").replaceAll("/", "_");

    if (i == 0) {
      fragment.innerHTML = `
              <div class="custom-checkbox">
                <input
                  type="checkbox"
                  name="checkbox-talent-${i + 1}"
                  id="checkbox-talent-${i + 1}"
                  checked="true"
                />
                <span class="custom-checkbox-btn bg-snd">
                  <div></div>
                </span>
              </div>
              <div class="talent-selector bg-snd">
                <section class="talent-data">
                  <figure class="talent-img">
                    <img src="./assets/talents/${weapon}.png" alt="${name} talent ${i + 1}: ${
        talents[i]
      }" />
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
    } else {
      fragment.innerHTML = `
              <div class="custom-checkbox">
                <input
                  type="checkbox"
                  name="checkbox-talent-${i + 1}"
                  id="checkbox-talent-${i + 1}"
                  checked="true"
                />
                <span class="custom-checkbox-btn bg-snd">
                  <div></div>
                </span>
              </div>
              <div class="talent-selector bg-snd">
                <section class="talent-data">
                  <figure class="talent-img">
                    <img src="./assets/talents/${talentName}.png" alt="${name} talent ${i + 1}: ${
        talents[i]
      }" />
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
    }

    $talentContainer.appendChild(fragment);
  }

  let $checkBoxes = d.querySelectorAll(".custom-checkbox input");

  for (let i = 0; i < Object.keys($checkBoxes).length; i++) {
    $checkBoxes[i].addEventListener("change", (e) =>
      isChecked(e.target, e.target.parentNode.parentNode.lastElementChild)
    );
  }
};

d.addEventListener("change", (e) => {
  let eventId = e.target.id;

  if (eventId === "first-selection") {
    getNumbList(e.target);
    if (e.target.parentElement.parentElement.firstElementChild.className == "ascension-selector") {
      const $selectors = d.querySelectorAll(".ascension-selector input");
      let fstValue = Number(e.target.parentElement.querySelector("#second-selection").value) - 1;

      for (let i = 0; i < Object.keys($selectors).length; i++) {
        if (i < fstValue) $selectors[i].checked = true;
        if (i >= fstValue) $selectors[i].checked = false;
      }
    }
  }

  if (eventId === "second-selection") {
    if (e.target.parentElement.parentElement.firstElementChild.className == "ascension-selector") {
      const $selectors = d.querySelectorAll(".ascension-selector input");
      let fstValue = Number(e.target.value) - 1;

      for (let i = 0; i < Object.keys($selectors).length; i++) {
        if (i < fstValue) $selectors[i].checked = true;
        if (i >= fstValue) $selectors[i].checked = false;
      }
    }
  }

  if (eventId.includes("ascension-")) {
    const $selectors = d.querySelectorAll(".ascension-selector input"),
      $fstOption = $selectors[0].parentNode.parentNode.querySelector("#first-selection"),
      $sndOption = $selectors[0].parentNode.parentNode.querySelector("#second-selection");
    let numberId = eventId.replaceAll("ascension-", "");

    for (let i = 0; i < Object.keys($selectors).length; i++) {
      if (i < numberId - 1) $selectors[i].checked = true;
      if (i >= numberId) $selectors[i].checked = false;
    }

    let val = Number(numberId) + 1;
    $sndOption.value = val;

    if ($fstOption.value >= $sndOption.value) $fstOption.value = $sndOption.value - 1;

    getNumbList($fstOption);
  }
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

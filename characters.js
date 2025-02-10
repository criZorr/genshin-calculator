import getData from "./helpers/getData.js";
import getCards from "./components/getCards.js";
import getNumbList from "./helpers/getNumbList.js";
import handleAscension from "./helpers/handleAscension.js";
import calculateCharacter from "./components/calculateCharacter.js";
import createLocal from "./helpers/createLocal.js";
import drawItems from "./components/drawItems.js";
import drawTotalItems from "./components/drawTotalItems.js";
import createTotalLocal from "./helpers/createTotalLocal.js";
import calculateNeeded from "./components/calculateNeeded.js";
import deleteLocal from "./helpers/deleteLocal.js";
import toggleSize from "./components/toggleSize.js";
import drawTotalExcess from "./components/drawTotalExcess.js";

const d = document;

const $cardsContainer = d.querySelector(".cards-container"),
  $modal = d.querySelector(".modal-container");

let filtered = [],
  filterClasses = ["filter-element", "filter-weapon", "filter-quality"],
  elements = ["anemo", "cryo", "dendro", "electro", "geo", "hydro", "pyro"],
  weapons = ["bow", "catalyst", "claymore", "polearm", "sword"],
  qualities = ["5-stars", "4-stars"];

let $filters = "filter-checkbox";

let saveFlag = false;
let confirmFlag = false;

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

const createObject = (data, id) => {
  let obj = {};

  obj["Mora"] = data[0];
  if (!(data[1][0] === 0)) obj["Wanderer's Advice"] = data[1][0];
  if (!(data[1][1] === 0)) obj["Adventurer's Experience"] = data[1][1];
  if (!(data[1][2] === 0)) obj["Hero's Wit"] = data[1][2];
  if (!(data[2] === 0)) obj[charactersData[id]["specialty-material"]] = data[2];
  if (!(data[3] === 0)) obj[charactersData[id]["boss-material"]] = data[3];
  if (!(data[4][0] === 0)) obj[`${charactersData[id].stone} Sliver`] = data[4][0];
  if (!(data[4][1] === 0)) obj[`${charactersData[id].stone} Fragment`] = data[4][1];
  if (!(data[4][2] === 0)) obj[`${charactersData[id].stone} Chunk`] = data[4][2];
  if (!(data[4][3] === 0)) obj[`${charactersData[id].stone} Gemstone`] = data[4][3];
  if (!(data[5][0] === 0)) obj[charactersData[id]["enemy-material"][0]] = data[5][0];
  if (!(data[5][1] === 0)) obj[charactersData[id]["enemy-material"][1]] = data[5][1];
  if (!(data[5][2] === 0)) obj[charactersData[id]["enemy-material"][2]] = data[5][2];
  if (!(data[7] === 0)) obj[charactersData[id]["weekly-boss"]] = data[7];
  if (!(data[8] === 0)) obj["Crown of Insight"] = data[8];

  if (charactersData[id]["name"].includes("Traveler")) {
    if (!(data[6][0] === 0))
      obj[`Teachings of ${charactersData[id]["domain-material"][0]}`] = data[6][0];
    if (!(data[6][1][0] === 0))
      obj[`Guide to ${charactersData[id]["domain-material"][1]}`] = data[6][1][0];
    if (!(data[6][1][1] === 0))
      obj[`Guide to ${charactersData[id]["domain-material"][2]}`] = data[6][1][1];
    if (!(data[6][1][2] === 0))
      obj[`Guide to ${charactersData[id]["domain-material"][0]}`] = data[6][1][2];
    if (!(data[6][2][0] === 0))
      obj[`Philosophies of ${charactersData[id]["domain-material"][2]}`] = data[6][2][0];
    if (!(data[6][2][1] === 0))
      obj[`Philosophies of ${charactersData[id]["domain-material"][0]}`] = data[6][2][1];
    if (!(data[6][2][2] === 0))
      obj[`Philosophies of ${charactersData[id]["domain-material"][1]}`] = data[6][2][2];
  } else {
    if (!(data[6][0] === 0))
      obj[`Teachings of ${charactersData[id]["domain-material"]}`] = data[6][0];
    if (!(data[6][1] === 0)) obj[`Guide to ${charactersData[id]["domain-material"]}`] = data[6][1];
    if (!(data[6][2] === 0))
      obj[`Philosophies of ${charactersData[id]["domain-material"]}`] = data[6][2];
  }

  return obj;
};

const getItems = () => {
  drawItems("characterData", charactersData, ".card-individual-container", ".selected-items");
};

const getTotal = () => {
  calculateNeeded("userMaterials", "characterTotal");
  drawTotalItems("neededCharacter", ".elements-container");
  drawTotalExcess("characterTotal", ".extra-container");
};

const getTalents = (characterId) => {
  $modal.style.visibility = "visible";
  $modal.style.opacity = "1";

  isChecked(d.getElementById("checkbox-level"), d.querySelector(".level-info"));

  let $talentContainer = d.querySelector(".talent-info"),
    $saveBtn = d.getElementById("save-btn"),
    talents = charactersData[characterId].talents,
    name = charactersData[characterId].name,
    weapon = charactersData[characterId].weapon;

  $saveBtn.setAttribute("modal-id", characterId);

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
        <div class="talent-selector bg-snd" id="talent-${i + 1}">
          <section class="talent-data">
            <figure class="talent-img">
              <img src="./assets/talents/${weapon}.webp"
                alt="${name} talent ${i + 1}: ${talents[i]}"
              />
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
        </div>`;
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
        <div class="talent-selector bg-snd" id="talent-${i + 1}">
          <section class="talent-data">
            <figure class="talent-img">
              <img src="./assets/talents/${talentName}.webp" alt="${name}
                talent ${i + 1}: ${talents[i]}"
              />
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
        </div>`;
    }

    $talentContainer.appendChild(fragment);
  }

  let $checkBoxes = d.querySelectorAll(".custom-checkbox input");

  for (let i = 0; i < Object.keys($checkBoxes).length; i++) {
    $checkBoxes[i].addEventListener("change", (e) =>
      isChecked(e.target, e.target.parentNode.parentNode.lastElementChild)
    );
  }

  saveFlag = true;

  $saveBtn.addEventListener("click", () => {
    let numId = Number(characterId);

    let fstTalentValues = [],
      sndTalentValues = [],
      levelValues = [],
      ascension = false;

    for (let i = 1; i <= 3; i++) {
      if (!(d.getElementById(`talent-${i}`).style.opacity === "0.5")) {
        fstTalentValues.push(Number(d.querySelector(`#talent-${i} #first-selection`).value));
        sndTalentValues.push(Number(d.querySelector(`#talent-${i} #second-selection`).value));
      } else {
        fstTalentValues.push(0);
        sndTalentValues.push(0);
      }
    }

    let fstLevelValue = Number(d.querySelector("#level-data #first-selection").value),
      sndLevelValue = Number(d.querySelector("#level-data #second-selection").value);

    if (!(d.getElementById("level-data").style.opacity === "0.5")) {
      levelValues.push(fstLevelValue);
      levelValues.push(sndLevelValue);
    } else {
      levelValues.push(0);
      levelValues.push(0);
    }

    if (sndLevelValue === 8) sndLevelValue = 7;

    if (d.querySelectorAll(".ascension-selector input")[sndLevelValue - 2].checked)
      ascension = true;

    if (!(fstTalentValues.toString() == "0,0,0" && levelValues.toString() == "0,0")) {
      let calculatedData = calculateCharacter(
        fstTalentValues,
        sndTalentValues,
        levelValues,
        ascension,
        name
      );

      let characterObject = createObject(calculatedData, numId);

      createLocal("characterData", numId, characterObject);
      getItems();
      createTotalLocal("characterTotal", "characterData");
      getTotal();
      $modal.style.visibility = "hidden";
      $modal.style.opacity = "0";
      saveFlag = false;
    }
  });
};

const drawModal = () => {
  $modal.innerHTML = `
    <div class="modal-character bg-trd">
      <div class="level-container">
        <div class="custom-checkbox">
          <label class="scnd-text" for="checkbox-level">Calculate levels</label>
          <input type="checkbox" name="checkbox-level" id="checkbox-level" checked="true" />
          <span class="custom-checkbox-btn bg-snd">
            <div></div>
          </span>
        </div>
        <div class="level-info" id="level-data">
          <div class="ascension-selector">
            <input type="checkbox" name="ascension-selected" id="ascension-1" />
            <label for="ascension-1">✦</label>
            <input type="checkbox" name="ascension-selected" id="ascension-2" />
            <label for="ascension-2">✦</label>
            <input type="checkbox" name="ascension-selected" id="ascension-3" />
            <label for="ascension-3">✦</label>
            <input type="checkbox" name="ascension-selected" id="ascension-4" />
            <label for="ascension-4">✦</label>
            <input type="checkbox" name="ascension-selected" id="ascension-5" />
            <label for="ascension-5">✦</label>
            <input type="checkbox" name="ascension-selected" id="ascension-6" />
            <label for="ascension-6">✦</label>
          </div>
          <div class="level-content bg-snd">
            <select class="nmb-list frst-text" id="first-selection">
              <option value="1">1</option>
              <option value="2">20</option>
              <option value="3">40</option>
              <option value="4">50</option>
              <option value="5">60</option>
              <option value="6">70</option>
              <option value="7">80</option>
            </select>
            <div class="scnd-text">→</div>
            <select class="nmb-list frst-text" id="second-selection">
              <option value="2">20</option>
              <option value="3">40</option>
              <option value="4">50</option>
              <option value="5">60</option>
              <option value="6">70</option>
              <option value="7">80</option>
              <option value="8">90</option>
            </select>
          </div>
        </div>
      </div>
      <div class="talent-container">
        <h5 class="scnd-text">Calculate talents</h5>
        <div class="talent-info"></div>
      </div>
      <div class="character-form">
        <div class="level-form">
          <div class="btn-modal-lvl">
            <button class="btn-bordered" id="cancel-btn">Cancel</button>
          </div>
          <div class="btn-modal-lvl">
            <button class="btn bg-snd-dark" id="save-btn">Save</button>
          </div>
        </div>
      </div>
    </div>`;
};

const deleteConfirmation = (id, name) => {
  $modal.innerHTML = `
    <div class="modal-info bg-trd">
      <p class="info-title scnd-text">Do you want to delete ${name}?</p>
      <div class="info-form">
        <div class="btn-modal-info">
          <button class="btn-bordered" id="cancel-btn">Cancel</button>
        </div>
        <div class="btn-modal-info">
          <button class="btn bg-snd-dark" id="confirm-btn" _id="${id}">Delete</button>
        </div>
      </div>
    </div>
  `;
  $modal.style.visibility = "visible";
  $modal.style.opacity = "1";

  confirmFlag = true;

  let $confimButton = d.getElementById("confirm-btn");
  $confimButton.addEventListener("click", (e) => {
    deleteLocal("characterData", e.target.attributes._id.value, "userMaterials");
    getItems();
    createTotalLocal("characterTotal", "characterData");
    getTotal();
    $modal.style.visibility = "hidden";
    $modal.style.opacity = "0";
    confirmFlag = false;
  });
};

d.addEventListener("change", (e) => {
  let eventId = e.target.id,
    eventClass = e.target.className;

  if (eventId === "first-selection") {
    getNumbList(e.target);
    if (e.target.parentElement.parentElement.firstElementChild.className == "ascension-selector") {
      const $selectors = d.querySelectorAll(".ascension-selector input");
      let selected = Number(e.target.parentElement.querySelector("#second-selection").value) - 1;

      handleAscension(selected, $selectors);
    }
  }

  if (eventId === "second-selection") {
    if (e.target.parentElement.parentElement.firstElementChild.className == "ascension-selector") {
      const $selectors = d.querySelectorAll(".ascension-selector input");
      let selected = Number(e.target.value) - 1;

      handleAscension(selected, $selectors);
    }
  }

  if (eventId.includes("ascension-")) {
    const $selectors = d.querySelectorAll(".ascension-selector input"),
      $fstOption = $selectors[0].parentNode.parentNode.querySelector("#first-selection"),
      $sndOption = $selectors[0].parentNode.parentNode.querySelector("#second-selection");
    let numberId = eventId.replaceAll("ascension-", "");

    handleAscension(numberId, $selectors, 1);

    $sndOption.value = Number(numberId) + 1;

    if ($fstOption.value >= $sndOption.value) $fstOption.value = $sndOption.value - 1;

    getNumbList($fstOption);
  }

  if (eventClass.includes("selected-items")) location.hash = e.target.value;
});

d.addEventListener("click", (e) => {
  let eventClass = e.target.className,
    eventId = e.target.id;

  try {
    eventClass.includes("something");
  } catch (err) {
    eventClass = "none";
  }

  if (eventClass === $filters) getChecked(filterClasses);

  if (
    eventClass === "card" ||
    eventClass === "card-img" ||
    eventClass === "card-name" ||
    eventClass === "btn-edit" ||
    eventClass.includes("btn-edit-container")
  ) {
    drawModal();
    getTalents(e.target.attributes._id.value);
  }

  if (eventClass === "btn-delete" || eventClass.includes("btn-delete-container")) {
    deleteConfirmation(
      e.target.attributes._id.value,
      charactersData[e.target.attributes._id.value].name
    );
  }

  if (eventClass === "modal-container" || eventId === "cancel-btn") {
    $modal.style.visibility = "hidden";
    $modal.style.opacity = "0";
    saveFlag = false;
  }

  toggleSize(eventClass, e.target);
});

d.addEventListener("keydown", (e) => {
  if (e.key == "Enter" && saveFlag) {
    d.getElementById("save-btn").click();
  }
  if (e.key == "Enter" && confirmFlag) {
    d.getElementById("confirm-btn").click();
  }
  if (e.key == "Escape" && saveFlag) {
    d.querySelector(".modal-container").click();
  }
  if (e.key == "Escape" && confirmFlag) {
    d.querySelector(".modal-container").click();
  }
});

let charactersData = await getData("./db/characters.json");

!localStorage.getItem("characterData") ? localStorage.setItem("characterData", "{}") : getItems();

if (!localStorage.getItem("userInfo"))
  localStorage.setItem(
    "userInfo",
    '{"World":9,"dropWeeklyBoss":3,"craftingTalents":1,"craftingWeapons":1,"craftingMaterials":1,"talentDrop":3,"weaponDrop":3,"talentResin":1,"weaponResin":1,"talentRNG":1,"weaponRNG":1,"Mora":0}'
  );

!localStorage.getItem("characterTotal")
  ? localStorage.setItem("characterTotal", "{}")
  : Object.keys(JSON.parse(localStorage.getItem("characterTotal"))).length == 0
  ? undefined
  : getTotal();

if (!localStorage.getItem("userMaterials")) localStorage.setItem("userMaterials", "{}");

getCards(charactersData, $cardsContainer, "./assets/characters");
getChecked(filterClasses);

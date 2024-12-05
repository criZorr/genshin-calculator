import getData from "./helpers/getData.js";
import getCards from "./components/getCards.js";
import getNumbList from "./helpers/getNumbList.js";
import handleAscension from "./helpers/handleAscension.js";
import calculateWeapon from "./components/calculateWeapon.js";
import createLocal from "./helpers/createLocal.js";
import drawItems from "./components/drawItems.js";
import drawTotalItems from "./components/drawTotalItems.js";
import createTotalLocal from "./helpers/createTotalLocal.js";
import calculateNeeded from "./components/calculateNeeded.js";
import deleteLocal from "./helpers/deleteLocal.js";
import toggleSize from "./components/toggleSize.js";

const d = document;

const $cardsContainer = d.querySelector(".cards-container"),
  $modal = d.querySelector(".modal-container");

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
    if (weaponFilter.includes(data[i].weapon) && qualityFilter.includes(data[i].quality))
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
    if (filterNames[i].includes("weapon")) {
      filters[i].length == 0 ? res.push(weapons) : res.push(filters[i]);
    } else if (filterNames[i].includes("quality")) {
      filters[i].length == 0 ? res.push(qualities) : res.push(filters[i]);
    }
  }

  filterAction(res, weaponsData);
};

const createObject = (data, id) => {
  let obj = {};

  if (!(data[0] === 0)) obj["Mora"] = data[0];
  if (!(data[1][0] === 0)) obj["Enhancement Ore"] = data[1][0];
  if (!(data[1][1] === 0)) obj["Fine Enhancement Ore"] = data[1][1];
  if (!(data[1][2] === 0)) obj["Mystic Enhancement Ore"] = data[1][2];
  if (!(data[2][0] === 0)) obj[weaponsData[id]["enemy-material"][0]] = data[2][0];
  if (!(data[2][1] === 0)) obj[weaponsData[id]["enemy-material"][1]] = data[2][1];
  if (!(data[2][2] === 0)) obj[weaponsData[id]["enemy-material"][2]] = data[2][2];
  if (!(data[3][0] === 0)) obj[weaponsData[id]["special-enemy-material"][0]] = data[3][0];
  if (!(data[3][1] === 0)) obj[weaponsData[id]["special-enemy-material"][1]] = data[3][1];
  if (!(data[3][2] === 0)) obj[weaponsData[id]["special-enemy-material"][2]] = data[3][2];
  if (!(data[4][0] === 0)) obj[weaponsData[id]["domain-material"][0]] = data[4][0];
  if (!(data[4][1] === 0)) obj[weaponsData[id]["domain-material"][1]] = data[4][1];
  if (!(data[4][2] === 0)) obj[weaponsData[id]["domain-material"][2]] = data[4][2];
  if (!(data[4][3] === 0)) obj[weaponsData[id]["domain-material"][3]] = data[4][3];

  return obj;
};

const getItems = () => {
  drawItems("weaponData", weaponsData, ".card-individual-container", ".selected-items");
};

const getTotal = () => {
  calculateNeeded("userMaterials", "weaponTotal");
  drawTotalItems("neededWeapon", ".total-container");
};

const getLevels = (weaponId) => {
  $modal.style.display = "flex";

  let $labels = d.querySelectorAll(".ascension-selector label"),
    $levelContainer = d.querySelector(".level-content"),
    $saveBtn = d.getElementById("save-btn");

  $saveBtn.setAttribute("modal-id", weaponId);

  if (weaponsData[weaponId].quality == "2-stars" || weaponsData[weaponId].quality == "1-stars") {
    $labels[5].style.display = "none";
    $labels[4].style.display = "none";

    $labels[0].parentNode.style.justifyContent = "center";
    $labels[0].parentNode.style.gap = "1rem";

    $levelContainer.innerHTML = `<select class="nmb-list frst-text" id="first-selection">
              <option value="1">1</option>
              <option value="2">20</option>
              <option value="3">40</option>
              <option value="4">50</option>
              <option value="5">60</option>
            </select>
            <div class="scnd-text">→</div>
            <select class="nmb-list frst-text" id="second-selection">
              <option value="2">20</option>
              <option value="3">40</option>
              <option value="4">50</option>
              <option value="5">60</option>
              <option value="6">70</option>
            </select>`;
  } else {
    $labels[5].style.display = "block";
    $labels[4].style.display = "block";

    $labels[0].parentNode.style.justifyContent = "space-between";
    $labels[0].parentNode.style.gap = "0";

    $levelContainer.innerHTML = `<select class="nmb-list frst-text" id="first-selection">
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
            </select>`;
  }

  $saveBtn.addEventListener("click", () => {
    let numId = Number(weaponId);

    let fstLevelValue = Number(d.querySelector("#first-selection").value),
      sndLevelValue = Number(d.querySelector("#second-selection").value);

    let levelValues = [fstLevelValue, sndLevelValue],
      ascension = false;

    let quality = weaponsData[numId].quality;

    if (quality === "2-stars" || quality === "1-stars") {
      if (sndLevelValue === 6) sndLevelValue = 5;
    }

    if (sndLevelValue === 8) sndLevelValue = 7;

    if (d.querySelectorAll(".ascension-selector input")[sndLevelValue - 2].checked)
      ascension = true;

    let calculatedData = calculateWeapon(levelValues, ascension, quality);

    let weaponObject = createObject(calculatedData, numId);

    createLocal("weaponData", numId, weaponObject);
    getItems();
    createTotalLocal("weaponTotal", "weaponData");
    getTotal();
    $modal.style.display = "none";
  });
};

const drawModal = () => {
  $modal.innerHTML = `<div class="modal-weapon bg-trd">
        <div class="level-info">
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
          <div class="level-content bg-snd"></div>
        </div>
        <div class="weapon-form">
          <div class="btn-modal-lvl">
            <button class="btn-bordered" id="cancel-btn">Cancel</button>
          </div>
          <div class="btn-modal-lvl">
            <button class="btn bg-snd-dark" id="save-btn">Save</button>
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
  $modal.style.display = "flex";

  let $confimButton = d.getElementById("confirm-btn");
  $confimButton.addEventListener("click", (e) => {
    deleteLocal("weaponData", e.target.attributes._id.value, "userMaterials");
    getItems();
    createTotalLocal("weaponTotal", "weaponData");
    getTotal();
    $modal.style.display = "none";
  });
};

d.addEventListener("change", (e) => {
  let eventId = e.target.id,
    eventClass = e.target.className;

  if (eventId === "first-selection") {
    getNumbList(e.target);

    const $selectors = d.querySelectorAll(".ascension-selector input");
    let selected = Number(e.target.parentElement.querySelector("#second-selection").value) - 1;

    handleAscension(selected, $selectors);
  }

  if (eventId === "second-selection") {
    const $selectors = d.querySelectorAll(".ascension-selector input");
    let selected = Number(e.target.value) - 1;

    handleAscension(selected, $selectors);
  }

  if (eventId.includes("ascension-")) {
    const $selectors = d.querySelectorAll(".ascension-selector input"),
      $fstOption = $selectors[0].parentNode.parentNode.querySelector("#first-selection"),
      $sndOption = $selectors[0].parentNode.parentNode.querySelector("#second-selection");
    let numberId = eventId.replaceAll("ascension-", "");

    handleAscension(numberId, $selectors, 1);

    let val = Number(numberId) + 1;
    $sndOption.value = val;

    if ($fstOption.value >= $sndOption.value) $fstOption.value = $sndOption.value - 1;

    getNumbList($fstOption);
  }

  if (eventClass.includes("selected-items")) location.hash = e.target.value;
});

d.addEventListener("click", (e) => {
  let eventClass = e.target.className,
    eventId = e.target.id;

  if (eventClass === $filters) getChecked(filterClasses);

  if (
    eventClass === "card" ||
    eventClass === "card-img" ||
    eventClass === "card-name" ||
    eventClass === "btn-edit" ||
    eventClass.includes("btn-edit-container")
  ) {
    drawModal();
    getLevels(e.target.attributes._id.value);
  }

  if (eventClass === "btn-delete" || eventClass.includes("btn-delete-container")) {
    deleteConfirmation(
      e.target.attributes._id.value,
      weaponsData[e.target.attributes._id.value].name
    );
  }

  if (eventClass === "modal-container" || eventId === "cancel-btn") $modal.style.display = "none";

  toggleSize(eventClass, e.target);
});

let weaponsData = await getData("./db/weapons.json");

!localStorage.getItem("weaponData") ? localStorage.setItem("weaponData", "{}") : getItems();

if (!localStorage.getItem("userInfo"))
  localStorage.setItem(
    "userInfo",
    '{"World":9,"dropWeeklyBoss":3,"craftingTalents":1,"craftingWeapons":1,"craftingMaterials":1,"talentDrop":3,"weaponDrop":3,"talentResin":1,"weaponResin":1,"talentRNG":1,"weaponRNG":1,"Mora":0}'
  );

!localStorage.getItem("weaponTotal")
  ? localStorage.setItem("weaponTotal", "{}")
  : Object.keys(JSON.parse(localStorage.getItem("weaponTotal"))).length == 0
  ? undefined
  : getTotal();

if (!localStorage.getItem("userMaterials")) localStorage.setItem("userMaterials", "{}");

getCards(weaponsData, $cardsContainer, "./assets/weapons");
getChecked(filterClasses);

import getData from "./helpers/getData.js";
import getCards from "./components/getCards.js";
import getNumbList from "./helpers/getNumbList.js";
import handleAscensions from "./helpers/handleAscensions.js";
import calculateWeapon from "./components/calculateWeapon.js";
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
  $modal = d.querySelector(".modal-container"),
  language = localStorage.getItem("language");

let filtered = [],
  filterClasses = ["filter-weapon", "filter-quality"],
  weapons = ["bow", "catalyst", "claymore", "polearm", "sword"],
  qualities = ["5-stars", "4-stars", "3-stars", "2-stars", "1-stars"],
  $filters = "filter-checkbox",
  saveFlag = false,
  confirmFlag = false,
  langData = "",
  weaponsLanguage = "",
  langMaterials = "";

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
    `.${className} input[type=checkbox]:checked`,
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

const createObject = (data, id, savedData) => {
  let obj = {};

  if (!(data[0] === 0)) obj["Mora"] = data[0];
  if (!(data[1][0] === 0)) obj["Enhancement Ore"] = data[1][0];
  if (!(data[1][1] === 0)) obj["Fine Enhancement Ore"] = data[1][1];
  if (!(data[1][2] === 0)) obj["Mystic Enhancement Ore"] = data[1][2];
  if (!(data[2][0] === 0))
    obj[weaponsData[id]["enemy-material"][0]] = data[2][0];
  if (!(data[2][1] === 0))
    obj[weaponsData[id]["enemy-material"][1]] = data[2][1];
  if (!(data[2][2] === 0))
    obj[weaponsData[id]["enemy-material"][2]] = data[2][2];
  if (!(data[3][0] === 0))
    obj[weaponsData[id]["special-enemy-material"][0]] = data[3][0];
  if (!(data[3][1] === 0))
    obj[weaponsData[id]["special-enemy-material"][1]] = data[3][1];
  if (!(data[3][2] === 0))
    obj[weaponsData[id]["special-enemy-material"][2]] = data[3][2];
  if (!(data[4][0] === 0))
    obj[weaponsData[id]["domain-material"][0]] = data[4][0];
  if (!(data[4][1] === 0))
    obj[weaponsData[id]["domain-material"][1]] = data[4][1];
  if (!(data[4][2] === 0))
    obj[weaponsData[id]["domain-material"][2]] = data[4][2];
  if (!(data[4][3] === 0))
    obj[weaponsData[id]["domain-material"][3]] = data[4][3];

  obj["savedData"] = savedData;

  return obj;
};

const getItems = () => {
  drawItems(
    "weaponData",
    weaponsData,
    ".card-individual-container",
    ".selected-items",
    language,
    langData ? langData : "",
    langMaterials ? langMaterials : "",
    weaponsLanguage,
    true,
  );
};

const getTotal = () => {
  calculateNeeded("userMaterials", "weaponTotal");
  drawTotalItems(
    "neededWeapon",
    ".elements-container",
    langData ? langData : "",
    langMaterials ? langMaterials : "",
  );
  drawTotalExcess(
    "weaponTotal",
    ".extra-container",
    langData ? langData : "",
    langMaterials ? langMaterials : "",
  );
};

const getLevels = (weaponId) => {
  $modal.style.visibility = "visible";
  $modal.style.opacity = "1";

  let $levelContainer = d.querySelector(".level-content"),
    $saveBtn = d.getElementById("save-btn"),
    $addBtn = d.querySelector(".add-btn"),
    $addBtnShape = d.querySelector(".btn-plus"),
    secondId = weaponId;

  if (weaponId.includes("_")) {
    secondId = weaponId.slice(0, weaponId.indexOf("_"));
  }

  $saveBtn.setAttribute("modal-id", weaponId);
  $addBtn.setAttribute("current_id", weaponId);
  $addBtnShape.setAttribute("current_id", weaponId);

  if (
    weaponsData[secondId].quality == "2-stars" ||
    weaponsData[secondId].quality == "1-stars"
  ) {
    $levelContainer.innerHTML = `
      <section class="nmb-list-container bg-snd">
        <input type="checkbox" name="ascension-selected" id="asc-fst" />
        <label for="asc-fst">✦</label>
        <select class="nmb-list frst-text" id="first-selection">
          <option value="1">1</option>
          <option value="2">20</option>
          <option value="3">40</option>
          <option value="4">50</option>
          <option value="5">60</option>
        </select>
      </section>   
      <div class="scnd-text">→</div>
      <section class="nmb-list-container bg-snd">
        <select class="nmb-list frst-text" id="second-selection">
          <option value="2">20</option>
          <option value="3">40</option>
          <option value="4">50</option>
          <option value="5">60</option>
          <option value="6">70</option>
        </select>
        <input type="checkbox" name="ascension-selected" id="asc-snd" />
        <label for="asc-snd">✦</label>
      </section>`;
  } else {
    $levelContainer.innerHTML = `
      <section class="nmb-list-container bg-snd">
        <input type="checkbox" name="ascension-selected" id="asc-fst" />
        <label for="asc-fst">✦</label>
        <select class="nmb-list frst-text" id="first-selection">
          <option value="1">1</option>
          <option value="2">20</option>
          <option value="3">40</option>
          <option value="4">50</option>
          <option value="5">60</option>
          <option value="6">70</option>
          <option value="7">80</option>
        </select>
      </section>
      <div class="scnd-text">→</div>
      <section class="nmb-list-container bg-snd">
        <select class="nmb-list frst-text" id="second-selection">
          <option value="2">20</option>
          <option value="3">40</option>
          <option value="4">50</option>
          <option value="5">60</option>
          <option value="6">70</option>
          <option value="7">80</option>
          <option value="8">90</option>
        </select>
        <input type="checkbox" name="ascension-selected" id="asc-snd" />
        <label for="asc-snd">✦</label>
      </section>`;
  }

  let data = "";
  try {
    data = JSON.parse(localStorage.getItem("weaponData"))[weaponId][
      "savedData"
    ];
  } catch (error) {
    data = undefined;
  }

  if (data) {
    let fstList = d.getElementById("first-selection"),
      sndList = d.getElementById("second-selection"),
      labels = d.querySelectorAll(".level-content label");

    if (data[2]) labels[0].click();
    if (data[3]) labels[1].click();

    fstList
      .querySelectorAll("option")
      [data[0] - 1].setAttribute("selected", "selected");

    getNumbList(fstList);

    sndList
      .querySelectorAll("option")
      [data[1] - 2].setAttribute("selected", "selected");
  }
  saveFlag = true;

  $saveBtn.addEventListener("click", () => {
    let numId = Number(secondId);

    let fstLevelValue = Number(d.querySelector("#first-selection").value),
      sndLevelValue = Number(d.querySelector("#second-selection").value);

    let levelValues = [fstLevelValue, sndLevelValue],
      ascensionFst = false,
      ascensionSnd = false;

    let quality = weaponsData[numId].quality;

    if (d.querySelector("#asc-fst").checked) ascensionFst = true;

    if (d.querySelector("#asc-snd").checked) ascensionSnd = true;

    let calculatedData = calculateWeapon(
      levelValues,
      ascensionFst,
      ascensionSnd,
      quality,
    );

    let savedData = [...levelValues, ascensionFst, ascensionSnd],
      weaponObject = createObject(calculatedData, numId, savedData);

    createLocal("weaponData", weaponId, weaponObject);
    getItems();
    createTotalLocal("weaponTotal", "weaponData");
    getTotal();
    $modal.style.visibility = "hidden";
    $modal.style.opacity = "0";
    saveFlag = false;
  });
};

const drawModal = (ogId) => {
  let id = ogId,
    quality = "",
    qualityText = "",
    type = "";

  if (ogId.includes("_")) id = ogId.slice(0, ogId.indexOf("_"));

  qualityText = weaponsData[id].quality;
  type =
    weaponsData[id].weapon.slice(0, 1).toUpperCase() +
    weaponsData[id].weapon.slice(1);

  switch (weaponsData[id].quality) {
    case "5-stars":
      quality = "five";
      break;
    case "4-stars":
      quality = "four";
      break;
    case "3-stars":
      quality = "three";
      break;
    case "2-stars":
      quality = "two";
      break;
    case "1-stars":
      quality = "one";
      break;
  }

  if (langData) {
    switch (type) {
      case "Bow":
        type = langData["static-index"][3][0];
        break;
      case "Catalyst":
        type = langData["static-index"][3][1];
        break;
      case "Claymore":
        type = langData["static-index"][3][2];
        break;
      case "Polearm":
        type = langData["static-index"][3][3];
        break;
      case "Sword":
        type = langData["static-index"][3][4];
        break;
    }

    switch (qualityText) {
      case "5-stars":
        qualityText = langData["dynamic-weapons"][0][0];
        break;
      case "4-stars":
        qualityText = langData["dynamic-weapons"][0][1];
        break;
      case "3-stars":
        qualityText = langData["dynamic-weapons"][0][2];
        break;
      case "2-stars":
        qualityText = langData["dynamic-weapons"][0][3];
        break;
      case "1-stars":
        qualityText = langData["dynamic-weapons"][0][4];
        break;
    }
  }

  $modal.innerHTML = `
    <div class="modal-weapon bg-trd">
      <section class="modal-img">
        <div class="card-bg ${quality}">
          <img class="card-img" src="./assets/weapons/${weaponsData[id].name.replaceAll('"', "")}.webp" alt="${weaponsData[id].name}">
        </div>
        <article class="character-properties">
          <p class="scnd-text"><b>${weaponsLanguage ? weaponsLanguage[weaponsData[id].name] || weaponsData[id].name : weaponsData[id].name}</b></p>
          <p class="frst-text">
            ${type}
            -
            ${qualityText.replaceAll("-", " ")}
          </p>
        </article>
      </section>
      <section class="modal-interaction">
      <article class="level-info-container">
        <div class="level-info">
          <div class="level-content bg-snd"></div>
        </div>
        <section class="another-container bg-snd">
        <p class="frst-text">${langData ? langData["dynamic-weapons"][1] : "Add another"}</p>
        <button class="add-btn">
        <img class="btn-plus" src="./assets/plus-snd.svg" alt="">
        </button>
        </section>
      </article>
      <div class="weapon-form">
        <div class="btn-modal">
          <button class="btn-bordered" id="cancel-btn">${langData ? langData["dynamic-index"][2][0] : "Cancel"}</button>
        </div>
        <div class="btn-modal">
          <button class="btn bg-snd-dark" id="save-btn">${langData ? langData["dynamic-index"][2][1] : "Save"}</button>
        </div>
      </div>
      </section>
    </div>`;
};

const deleteConfirmation = (id, name) => {
  let add = "";

  if (language === "ko") {
    const lastChar = name.charCodeAt(name.length - 1);
    if (lastChar >= 0xac00 && lastChar <= 0xd7a3) {
      const hasBatchim = (lastChar - 0xac00) % 28 !== 0;
      hasBatchim ? (add = "을") : (add = "를");
    } else {
      add = "을(를)";
    }
  }

  $modal.innerHTML = `
    <div class="modal-info bg-trd">
      <p class="info-title scnd-text">${langData ? langData["dynamic-weapons"][4][0] : "Do you want to delete"} ${name}${add}${langData ? langData["dynamic-weapons"][4][1] : "?"}</p>
      <div class="info-form">
        <div class="btn-modal">
          <button class="btn-bordered" id="cancel-btn">${langData ? langData["dynamic-index"][2][0] : "Cancel"}</button>
        </div>
        <div class="btn-modal">
          <button class="btn bg-snd-dark" id="confirm-btn" _id="${id}">${langData ? langData["dynamic-index"][2][2] : "Delete"}</button>
        </div>
      </div>
    </div>`;
  $modal.style.visibility = "visible";
  $modal.style.opacity = "1";

  confirmFlag = true;

  let $confimButton = d.getElementById("confirm-btn");
  $confimButton.addEventListener("click", (e) => {
    deleteLocal("weaponData", e.target.attributes._id.value, "userMaterials");
    getItems();
    createTotalLocal("weaponTotal", "weaponData");
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

    handleAscensions();
  }

  if (eventId === "second-selection") {
    handleAscensions();
  }

  if (eventClass.includes("selected-items")) location.hash = e.target.value;
});

const exists = (id) => {
  let data = JSON.parse(localStorage.getItem("weaponData"));
  if (data[id]) return true;
  else return false;
};

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
    e.target.matches(".card") ||
    e.target.matches(".card *") ||
    e.target.matches(".btn-edit-container") ||
    e.target.matches(".btn-edit-container *")
  ) {
    drawModal(e.target.attributes._id.value);
    getLevels(e.target.attributes._id.value);
    handleAscensions();
  }

  if (
    e.target.matches(".btn-delete-container") ||
    e.target.matches(".btn-delete-container *")
  ) {
    let id = e.target.attributes._id.value,
      ogId = id;

    if (id.includes("_")) {
      ogId = id.slice(0, id.indexOf("_"));
    }
    deleteConfirmation(
      id,
      weaponsLanguage
        ? weaponsLanguage[weaponsData[ogId].name]
        : weaponsData[ogId].name,
    );
  }

  if (eventClass === "modal-container" || eventId === "cancel-btn") {
    $modal.style.visibility = "hidden";
    $modal.style.opacity = "0";
    saveFlag = false;
  }

  if (eventClass === "add-btn" || eventClass === "btn-plus") {
    let id = e.target.attributes.current_id.value;

    if (id.includes("_")) {
      let position = id.indexOf("_"),
        ogId = id.slice(0, position),
        copy = Number(id.slice(position + 1));

      if (exists(id)) {
        let handleId = ogId + "_" + (copy + 1);

        for (let index = copy; exists(handleId); index++) {
          copy += 1;
          handleId = ogId + "_" + (copy + 1);
        }

        drawModal(handleId);
        getLevels(handleId);
      } else {
        window.alert(
          langData
            ? langData["dynamic-weapons"][2]
            : "Add the current one before adding another",
        );
      }
    } else {
      if (exists(id)) {
        let handleId = id + "_" + "1";
        for (let index = 1; exists(handleId); index++) {
          handleId = id + "_" + String(index + 1);
        }
        drawModal(handleId);
        getLevels(handleId);
      } else {
        window.alert(
          langData
            ? langData["dynamic-weapons"][3]
            : "Add the current one before adding a copy",
        );
      }
    }
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

let weaponsData = await getData("./db/weapons.json");

if (language !== "en") {
  langData = await getData(`./db/texts-${language}.json`);
  weaponsLanguage = await getData(`./db/weapons/weapons-${language}.json`);
  langMaterials = await getData(`./db/materials/materials-${language}.json`);
}

!localStorage.getItem("weaponData")
  ? localStorage.setItem("weaponData", "{}")
  : getItems();

!localStorage.getItem("weaponTotal")
  ? localStorage.setItem("weaponTotal", "{}")
  : Object.keys(JSON.parse(localStorage.getItem("weaponTotal"))).length == 0
    ? undefined
    : getTotal();

getCards(
  weaponsData,
  $cardsContainer,
  "./assets/weapons",
  language,
  weaponsLanguage,
  true,
);
getChecked(filterClasses);

import getData from "./helpers/getData.js";
import getCards from "./components/getCards.js";
import getNumbList from "./helpers/getNumbList.js";
import handleAscensions from "./helpers/handleAscensions.js";
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
  $modal = d.querySelector(".modal-container"),
  language = localStorage.getItem("language");

let filtered = [],
  filterClasses = ["filter-element", "filter-weapon", "filter-quality"],
  elements = ["anemo", "cryo", "dendro", "electro", "geo", "hydro", "pyro"],
  weapons = ["bow", "catalyst", "claymore", "polearm", "sword"],
  qualities = ["5-stars", "4-stars"],
  $filters = "filter-checkbox",
  saveFlag = false,
  confirmFlag = false,
  langData = "",
  langTalents = "",
  langMaterials = "";

const filterAction = (filters, data) => {
  let charactersId = [],
    filtersStr = filters.map((e) => e.toString()),
    [elementFilter, weaponFilter, qualityFilter] = filtersStr;

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
  let $checkbox = document.querySelectorAll(
    `.${className} input[type=checkbox]:checked`,
  );
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

const createObject = (data, id, savedData) => {
  let obj = {},
    enemyFst = data[5][0] + data[6][0],
    enemySnd = data[5][1] + data[6][1],
    enemyTrd = data[5][2] + data[6][2];

  obj["Mora"] = data[0];
  if (!(data[1][0] === 0)) obj["Wanderer's Advice"] = data[1][0];
  if (!(data[1][1] === 0)) obj["Adventurer's Experience"] = data[1][1];
  if (!(data[1][2] === 0)) obj["Hero's Wit"] = data[1][2];
  if (!(data[2] === 0)) obj[charactersData[id]["specialty-material"]] = data[2];
  if (!(data[3] === 0)) obj[charactersData[id]["boss-material"]] = data[3];
  if (!(data[4][0] === 0))
    obj[`${charactersData[id].stone} Sliver`] = data[4][0];
  if (!(data[4][1] === 0))
    obj[`${charactersData[id].stone} Fragment`] = data[4][1];
  if (!(data[4][2] === 0))
    obj[`${charactersData[id].stone} Chunk`] = data[4][2];
  if (!(data[4][3] === 0))
    obj[`${charactersData[id].stone} Gemstone`] = data[4][3];
  if (!(data[8] === 0)) obj[charactersData[id]["weekly-boss"]] = data[8];
  if (!(data[9] === 0)) obj["Crown of Insight"] = data[9];
  // Traveler exception
  if (charactersData[id]["name"].includes("Traveler")) {
    if (!(data[5][0] === 0))
      obj[charactersData[id]["enemy-material"][0]] = data[5][0];
    if (!(data[5][1] === 0))
      obj[charactersData[id]["enemy-material"][1]] = data[5][1];
    if (!(data[5][2] === 0))
      obj[charactersData[id]["enemy-material"][2]] = data[5][2];
    if (!(data[6][0] === 0))
      obj[charactersData[id]["second-enemy"][0]] = data[6][0];
    if (!(data[6][1] === 0))
      obj[charactersData[id]["second-enemy"][1]] = data[6][1];
    if (!(data[6][2] === 0))
      obj[charactersData[id]["second-enemy"][2]] = data[6][2];

    if (!(data[7][0] === 0))
      obj[`Teachings of ${charactersData[id]["domain-material"][0]}`] =
        data[7][0];
    if (!(data[7][1][0] === 0))
      obj[`Guide to ${charactersData[id]["domain-material"][1]}`] =
        data[7][1][0];
    if (!(data[7][1][1] === 0))
      obj[`Guide to ${charactersData[id]["domain-material"][2]}`] =
        data[7][1][1];
    if (!(data[7][1][2] === 0))
      obj[`Guide to ${charactersData[id]["domain-material"][0]}`] =
        data[7][1][2];
    if (!(data[7][2][0] === 0))
      obj[`Philosophies of ${charactersData[id]["domain-material"][2]}`] =
        data[7][2][0];
    if (!(data[7][2][1] === 0))
      obj[`Philosophies of ${charactersData[id]["domain-material"][0]}`] =
        data[7][2][1];
    if (!(data[7][2][2] === 0))
      obj[`Philosophies of ${charactersData[id]["domain-material"][1]}`] =
        data[7][2][2];
    // Traveler geo exception
    if (!(data[10][0] === 0))
      obj[charactersData[id]["third-enemy"][0]] = data[10][0];
    if (!(data[10][1] === 0))
      obj[charactersData[id]["third-enemy"][1]] = data[10][1];
    if (!(data[10][2] === 0))
      obj[charactersData[id]["third-enemy"][2]] = data[10][2];
    if (!(data[11][0] === 0))
      obj[`Teachings of ${charactersData[id]["second-domain-material"][0]}`] =
        data[11][0];
    if (!(data[11][1][0] === 0))
      obj[`Guide to ${charactersData[id]["second-domain-material"][1]}`] =
        data[11][1][0];
    if (!(data[11][1][1] === 0))
      obj[`Guide to ${charactersData[id]["second-domain-material"][2]}`] =
        data[11][1][1];
    if (!(data[11][1][2] === 0))
      obj[`Guide to ${charactersData[id]["second-domain-material"][0]}`] =
        data[11][1][2];
    if (!(data[11][2][0] === 0))
      obj[
        `Philosophies of ${charactersData[id]["second-domain-material"][2]}`
      ] = data[11][2][0];
    if (!(data[11][2][1] === 0))
      obj[
        `Philosophies of ${charactersData[id]["second-domain-material"][0]}`
      ] = data[11][2][1];
    if (!(data[11][2][2] === 0))
      obj[
        `Philosophies of ${charactersData[id]["second-domain-material"][1]}`
      ] = data[11][2][2];
    if (!(data[12] === 0))
      obj[charactersData[id]["second-weekly-boss"]] = data[12];
  } else {
    if (!(enemyFst === 0))
      obj[charactersData[id]["enemy-material"][0]] = enemyFst;
    if (!(enemySnd === 0))
      obj[charactersData[id]["enemy-material"][1]] = enemySnd;
    if (!(enemyTrd === 0))
      obj[charactersData[id]["enemy-material"][2]] = enemyTrd;
    if (!(data[7][0] === 0))
      obj[`Teachings of ${charactersData[id]["domain-material"]}`] = data[7][0];
    if (!(data[7][1] === 0))
      obj[`Guide to ${charactersData[id]["domain-material"]}`] = data[7][1];
    if (!(data[7][2] === 0))
      obj[`Philosophies of ${charactersData[id]["domain-material"]}`] =
        data[7][2];
  }

  obj["savedData"] = savedData;

  return obj;
};

const getItems = () => {
  drawItems(
    "characterData",
    charactersData,
    ".card-individual-container",
    ".selected-items",
    language,
    langData ? langData : "",
    langMaterials ? langMaterials : "",
  );
};

const getTotal = () => {
  calculateNeeded("userMaterials", "characterTotal");
  drawTotalItems(
    "neededCharacter",
    ".elements-container",
    langData ? langData : "",
    langMaterials ? langMaterials : "",
  );
  drawTotalExcess(
    "characterTotal",
    ".extra-container",
    langData ? langData : "",
    langMaterials ? langMaterials : "",
  );
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
            <p class="frst-text compact">${langTalents ? langTalents[talents[i]] || talents[i] : talents[i]}</p>
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
            <p class="frst-text compact">${langTalents ? langTalents[talents[i]] || talents[i] : talents[i]}</p>
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
      isChecked(e.target, e.target.parentNode.parentNode.lastElementChild),
    );
  }

  let data = "";
  try {
    data = JSON.parse(localStorage.getItem("characterData"))[characterId][
      "savedData"
    ];
  } catch (error) {
    data = undefined;
  }

  if (data) {
    let fstList = d.querySelectorAll("#first-selection"),
      sndList = d.querySelectorAll("#second-selection");

    for (let i = 1; i < fstList.length; i++) {
      let value = data[2][i - 1] - 1;
      fstList[i]
        .querySelectorAll("option")
        [value].setAttribute("selected", "selected");
      getNumbList(fstList[i]);
    }

    for (let i = 1; i < sndList.length; i++) {
      let value = data[3][i - 1] - 2;
      sndList[i]
        .querySelectorAll("option")
        [value].setAttribute("selected", "selected");
    }

    if (!data[1][0]) d.getElementById("checkbox-talent-1").click();
    if (!data[1][1]) d.getElementById("checkbox-talent-2").click();
    if (!data[1][2]) d.getElementById("checkbox-talent-3").click();
  }

  saveFlag = true;

  $saveBtn.addEventListener("click", () => {
    let numId = Number(characterId);

    let fstTalentValues = [],
      sndTalentValues = [],
      levelValues = [],
      ascensionFst = false,
      ascensionSnd = false,
      fstStorageTalent = [],
      sndStorageTalent = [],
      levelVisible = true,
      talentVisible = [];

    for (let i = 1; i <= 3; i++) {
      fstStorageTalent.push(
        Number(d.querySelector(`#talent-${i} #first-selection`).value),
      );
      sndStorageTalent.push(
        Number(d.querySelector(`#talent-${i} #second-selection`).value),
      );

      if (!(d.getElementById(`talent-${i}`).style.opacity === "0.5")) {
        talentVisible.push(true);
        fstTalentValues.push(
          Number(d.querySelector(`#talent-${i} #first-selection`).value),
        );
        sndTalentValues.push(
          Number(d.querySelector(`#talent-${i} #second-selection`).value),
        );
      } else {
        talentVisible.push(false);
        fstTalentValues.push(0);
        sndTalentValues.push(0);
      }
    }

    let fstLevelValue = Number(
        d.querySelector("#level-data #first-selection").value,
      ),
      sndLevelValue = Number(
        d.querySelector("#level-data #second-selection").value,
      ),
      sndLevelOg = sndLevelValue;

    if (!(d.getElementById("level-data").style.opacity === "0.5")) {
      levelValues.push(fstLevelValue);
      levelValues.push(sndLevelValue);
    } else {
      levelVisible = false;
      levelValues.push(0);
      levelValues.push(0);
    }

    if (d.querySelector("#asc-fst").checked) ascensionFst = true;

    if (d.querySelector("#asc-snd").checked) ascensionSnd = true;

    if (
      !(
        fstTalentValues.toString() == "0,0,0" && levelValues.toString() == "0,0"
      )
    ) {
      let calculatedData = calculateCharacter(
        fstTalentValues,
        sndTalentValues,
        levelValues,
        ascensionFst,
        ascensionSnd,
        name,
      );

      let savedData = [
          [levelVisible, fstLevelValue, sndLevelOg, ascensionFst, ascensionSnd],
          talentVisible,
          fstStorageTalent,
          sndStorageTalent,
        ],
        characterObject = createObject(calculatedData, numId, savedData);

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

const drawModal = (id) => {
  const date = new Date();
  let today = String(date.getDate()).padStart(2, "0");
  today += "-";
  today += String(date.getMonth() + 1).padStart(2, "0");

  let quality = "",
    birthday = charactersData[id].birthday,
    content = "",
    weapon =
      charactersData[id].weapon.slice(0, 1).toUpperCase() +
      charactersData[id].weapon.slice(1);

  if (birthday === "29-02") birthday = "28-02";

  if (today === birthday) {
    content = `
      <div class="card-bg birth" style="position: relative">
        <img class="confeti" src="./assets/birthday.gif"/>
        <img class="card-img" style="position: absolute" src="./assets/characters/${charactersData[id].name}.webp" alt="${charactersData[id].name}">
      </div>`;
  } else {
    switch (charactersData[id].quality) {
      case "5-stars":
        quality = "five";
        break;
      case "4-stars":
        quality = "four";
        break;
      case "5-stars-colab":
        quality = "colab";
        break;
    }
    content = `
      <div class="card-bg ${quality}">
        <img class="card-img" src="./assets/characters/${charactersData[id].name}.webp" alt="${charactersData[id].name}">
      </div>`;
  }

  if (langData) {
    switch (weapon) {
      case "Bow":
        weapon = langData["static-index"][3][0];
        break;
      case "Catalyst":
        weapon = langData["static-index"][3][1];
        break;
      case "Claymore":
        weapon = langData["static-index"][3][2];
        break;
      case "Polearm":
        weapon = langData["static-index"][3][3];
        break;
      case "Sword":
        weapon = langData["static-index"][3][4];
        break;
    }
  }

  $modal.innerHTML = `
    <div class="modal-character bg-trd">
      <section class="modal-img">
        ${content}
        <article class="character-properties">
          <p class="scnd-text"><b>${charactersData[id][`name-${language}`] || charactersData[id].name}</b></p>
          <p class="frst-text">
            ${charactersData[id].element.slice(0, 1).toUpperCase() + charactersData[id].element.slice(1)}
            -
            ${weapon}
          </p>
        </article>
      </section>

      <section class="modal-interaction">
      <div class="level-container">
        <div class="custom-checkbox">
          <label class="scnd-text" for="checkbox-level">${langData ? langData["dynamic-index"][0] : "Calculate levels"}</label>
          <input type="checkbox" name="checkbox-level" id="checkbox-level" checked="true" />
          <span class="custom-checkbox-btn bg-snd">
            <div></div>
          </span>
        </div>
        <div class="level-info" id="level-data">
          <div class="level-content bg-snd">
            <section class="nmb-list-container bg-snd frst-text">
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
            <section class="nmb-list-container bg-snd frst-text">
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
            </section>
          </div>
        </div>
      </div>
      <div class="talent-container">
        <h5 class="scnd-text">${langData ? langData["dynamic-index"][1] : "Calculate talents"}</h5>
        <div class="talent-info"></div>
      </div>
      <div class="character-form">
        <div class="level-form">
          <div class="btn-modal">
            <button class="btn-bordered" id="cancel-btn">${langData ? langData["dynamic-index"][2][0] : "Cancel"}</button>
          </div>
          <div class="btn-modal">
            <button class="btn bg-snd-dark" id="save-btn">${langData ? langData["dynamic-index"][2][1] : "Save"}</button>
          </div>
        </div>
      </div>
      </section>

    </div>`;

  let data = "";
  try {
    data = JSON.parse(localStorage.getItem("characterData"))[id]["savedData"];
  } catch (error) {
    data = undefined;
  }

  if (data) {
    let labels = d.querySelectorAll(".level-content label");

    if (!data[0][0]) d.getElementById("checkbox-level").click();
    if (data[0][3]) labels[0].click();
    if (data[0][4]) labels[1].click();

    d.querySelectorAll("#first-selection option")[data[0][1] - 1].setAttribute(
      "selected",
      "selected",
    );
    d.querySelectorAll("#second-selection option")[data[0][2] - 2].setAttribute(
      "selected",
      "selected",
    );
  }
};

const deleteConfirmation = (id, name) => {
  $modal.innerHTML = `
    <div class="modal-info bg-trd">
      <p class="info-title scnd-text">${langData ? langData["dynamic-index"][3][0] : "Do you want to delete"} ${name} ${langData ? langData["dynamic-index"][3][1] : "?"}</p>
      <div class="info-form">
        <div class="btn-modal">
          <button class="btn-bordered" id="cancel-btn">${langData ? langData["dynamic-index"][2][0] : "Cancel"}</button>
        </div>
        <div class="btn-modal">
          <button class="btn bg-snd-dark" id="confirm-btn" _id="${id}">${langData ? langData["dynamic-index"][2][2] : "Delete"}</button>
        </div>
      </div>
    </div>
  `;
  $modal.style.visibility = "visible";
  $modal.style.opacity = "1";

  confirmFlag = true;

  let $confimButton = d.getElementById("confirm-btn");
  $confimButton.addEventListener("click", (e) => {
    deleteLocal(
      "characterData",
      e.target.attributes._id.value,
      "userMaterials",
    );
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

    if (e.target.parentElement.className.includes("nmb-list-container")) {
      handleAscensions();
    }
  }

  if (eventId === "second-selection") {
    if (e.target.parentElement.className.includes("nmb-list-container")) {
      handleAscensions();
    }
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
    drawModal(e.target.attributes._id.value);
    getTalents(e.target.attributes._id.value);
    handleAscensions();
  }

  if (
    eventClass === "btn-delete" ||
    eventClass.includes("btn-delete-container")
  ) {
    deleteConfirmation(
      e.target.attributes._id.value,
      charactersData[e.target.attributes._id.value][`name-${language}`] ||
        charactersData[e.target.attributes._id.value].name,
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
if (language !== "en") {
  langData = await getData(`./db/texts-${language}.json`);
  langTalents = await getData(`./db/talents-${language}.json`);
  langMaterials = await getData(`./db/materials-${language}.json`);
}

!localStorage.getItem("characterData")
  ? localStorage.setItem("characterData", "{}")
  : getItems();

if (
  Object.keys(JSON.parse(localStorage.getItem("characterTotal"))).length !== 0
)
  getTotal();

getCards(charactersData, $cardsContainer, "./assets/characters", language);
getChecked(filterClasses);

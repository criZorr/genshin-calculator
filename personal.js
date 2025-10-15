import drawTotalItems from "./components/drawTotalItems.js";
import calculateNeeded from "./components/calculateNeeded.js";
import toggleSize from "./components/toggleSize.js";
import calculateData from "./db/data.js";
import drawTotalExcess from "./components/drawTotalExcess.js";

const d = document;

const $modal = d.querySelector(".modal-container"),
  $modalMaterials = d.querySelector(".modal-container-materials");

const svg = `
<svg class="frst-text faq" alt="faq" width="11" height="11" viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.49998 0.458328C4.50283 0.458328 3.52808 0.754017 2.69898 1.308C1.86988 1.86199 1.22368 2.64939 0.842089 3.57063C0.460497 4.49188 0.360656 5.50559 0.555189 6.48357C0.749723 7.46156 1.2299 8.3599 1.93499 9.06499C2.64008 9.77008 3.53841 10.2503 4.5164 10.4448C5.49439 10.6393 6.5081 10.5395 7.42934 10.1579C8.35059 9.77629 9.13799 9.13009 9.69198 8.30099C10.246 7.4719 10.5416 6.49714 10.5416 5.49999C10.5401 4.16335 10.0084 2.88189 9.06324 1.93674C8.11808 0.991586 6.83663 0.459905 5.49998 0.458328ZM5.49998 9.62499C4.68413 9.62499 3.88661 9.38307 3.20825 8.92981C2.5299 8.47655 2.00119 7.83231 1.68898 7.07856C1.37677 6.32482 1.29508 5.49542 1.45424 4.69525C1.61341 3.89508 2.00627 3.16007 2.58317 2.58318C3.16006 2.00629 3.89506 1.61342 4.69523 1.45426C5.49541 1.29509 6.32481 1.37678 7.07855 1.68899C7.8323 2.0012 8.47653 2.52991 8.92979 3.20827C9.38306 3.88662 9.62498 4.68415 9.62498 5.49999C9.62365 6.5936 9.18862 7.64204 8.41532 8.41534C7.64203 9.18863 6.59359 9.62366 5.49998 9.62499ZM5.95832 7.56249V8.47916H5.04165V7.56249H5.95832ZM7.33332 4.35416C7.33381 4.62904 7.27224 4.90048 7.1532 5.14824C7.03416 5.396 6.86072 5.61369 6.64582 5.78508C6.29866 6.05409 6.06392 6.44256 5.98719 6.87499H5.05586C5.09638 6.52163 5.20725 6.17996 5.38193 5.87013C5.5566 5.5603 5.79154 5.28858 6.0729 5.07099C6.18581 4.98063 6.27574 4.86483 6.33533 4.73306C6.39493 4.60129 6.4225 4.45728 6.4158 4.31282C6.40909 4.16835 6.3683 4.02752 6.29676 3.90184C6.22521 3.77616 6.12494 3.66918 6.00415 3.58966C5.86952 3.50166 5.71461 3.44957 5.55416 3.43834C5.39371 3.42711 5.23306 3.45711 5.08748 3.52549C4.9322 3.59992 4.80188 3.71787 4.71237 3.86498C4.62287 4.01209 4.57803 4.18204 4.58332 4.35416C4.58332 4.47572 4.53503 4.5923 4.44907 4.67825C4.36312 4.76421 4.24654 4.81249 4.12498 4.81249C4.00342 4.81249 3.88685 4.76421 3.80089 4.67825C3.71494 4.5923 3.66665 4.47572 3.66665 4.35416C3.65983 4.0019 3.75702 3.65545 3.94607 3.35814C4.13512 3.06083 4.40763 2.82586 4.72952 2.68262C5.01486 2.5551 5.32771 2.50148 5.63923 2.52672C5.95074 2.55195 6.25089 2.65522 6.51198 2.82699C6.76427 2.99401 6.9713 3.22087 7.11462 3.48734C7.25793 3.7538 7.33306 4.0516 7.33332 4.35416Z"/>
</svg>`;

let saveFlag = false,
  containerFlag = false,
  filtered = [],
  filterClasses = ["filter-items"],
  items = [
    "exp",
    "elite",
    "common",
    "weekly",
    "world",
    "stones",
    "talent",
    "weapon",
    "speciality",
  ],
  $filters = "filter-checkbox";

const all = calculateData("all"),
  eliteEnemies = calculateData("eliteEnemies").length,
  commonEnemies = calculateData("commonEnemies").length,
  weekBoss = calculateData("weekBoss").length + 1,
  boss = calculateData("boss").length,
  stones = calculateData("stones").length,
  talentMaterials = calculateData("talentMaterials").length,
  weaponMaterials = calculateData("weaponMaterials").length,
  specialty = Object.keys(calculateData("specialty")).length;

let $itemsContainer = d.querySelector(".items-container-user");

const filterAction = (filters) => {
  let itemsId = [];

  for (let i = 0; i < all.length; i++) {
    itemsId.push(i);
  }

  let sum = 8;

  if (filters.includes("exp")) {
    for (let i = 0; i < 8; i++) {
      itemsId = itemsId.filter((e) => e !== i);
    }
  }

  if (filters.includes("elite")) {
    for (let i = 0; i < eliteEnemies; i++) {
      itemsId = itemsId.filter((e) => e !== i + sum);
    }
  }
  sum += eliteEnemies;

  if (filters.includes("common")) {
    for (let i = 0; i < commonEnemies; i++) {
      itemsId = itemsId.filter((e) => e !== i + sum);
    }
  }
  sum += commonEnemies;

  if (filters.includes("weekly")) {
    for (let i = 0; i < weekBoss; i++) {
      itemsId = itemsId.filter((e) => e !== i + sum);
    }
  }
  sum += weekBoss;

  if (filters.includes("world")) {
    for (let i = 0; i < boss; i++) {
      itemsId = itemsId.filter((e) => e !== i + sum);
    }
  }
  sum += boss;

  if (filters.includes("stones")) {
    for (let i = 0; i < stones; i++) {
      itemsId = itemsId.filter((e) => e !== i + sum);
    }
  }
  sum += stones;

  if (filters.includes("talent")) {
    for (let i = 0; i < talentMaterials; i++) {
      itemsId = itemsId.filter((e) => e !== i + sum);
    }
  }
  sum += talentMaterials;

  if (filters.includes("weapon")) {
    for (let i = 0; i < weaponMaterials; i++) {
      itemsId = itemsId.filter((e) => e !== i + sum);
    }
  }
  sum += weaponMaterials;

  if (filters.includes("speciality")) {
    for (let i = 0; i < specialty; i++) {
      itemsId = itemsId.filter((e) => e !== i + sum);
    }
  }

  filtered.forEach((e) => (d.getElementById(e).style.display = "inline-flex"));

  filtered = [];

  itemsId.forEach((e) => {
    let $card = d.getElementById(e);
    $card.style.display = "none";

    filtered.push(e);
  });
};

const getChecked = (filterNames) => {
  let $checkbox = document.querySelectorAll(
      `.${filterNames} input[type=checkbox]:checked`
    ),
    filters = [...$checkbox].map((e) => e.id),
    res = [];

  filters.length == 0 ? (res = items) : (res = filters);

  filterAction(res);
};

const getTotal = () => {
  calculateNeeded("userMaterials", "total");
  drawTotalItems("neededTotal", ".elements-container");
  drawTotalExcess("total", ".extra-container");
};

const calculateTotal = (...objects) => {
  return objects.reduce((a, b) => {
    for (let key in b) {
      if (b.hasOwnProperty(key)) a[key] = (a[key] || 0) + b[key];
    }
    return a;
  }, {});
};

const calcTotalMaterials = () => {
  let localCharacter = JSON.parse(localStorage.getItem("characterTotal")),
    localWeapon = JSON.parse(localStorage.getItem("weaponTotal"));

  let characterKeys = Object.keys(localCharacter);
  let weaponKeys = Object.keys(localWeapon);

  let objects = [];

  for (let i = 0; i < characterKeys.length; i++) {
    objects.push(localCharacter[characterKeys[i]]);
  }
  for (let i = 0; i < weaponKeys.length; i++) {
    objects.push(localWeapon[weaponKeys[i]]);
  }

  let calculated = calculateTotal(localCharacter, localWeapon);

  localStorage.setItem("total", JSON.stringify(calculated));
  getTotal();
};

const drawUserData = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const $container = d.querySelector(".user-info");

  let optionsDomains = ["I", "II", "III", "IV"],
    optionsBonus = ["No", "10% talent", "25% talent"],
    resinType = ["20 resin", "40 resin", "60 resin"],
    rng = ["Without RNG", "With RNG"];

  $container.innerHTML = `
    <div class="user-data">
      <div class="user-parameter-header">
        <h5>World Level</h5>
        <button class="btn-element-info" _id="World" _name="World Level">
          <img class="btn-edit-info" src="./assets/edit.svg" alt="edit"  _id="World" _name="World Level"/>
        </button>
      </div>
      <p class="h5-regular">${userInfo["World"]}
        <div class="faq-container">
          ${svg}          
          <span class="tooltip">This changes the Boss, Enemies and Ley Lines drops</span>
        </div>
      </p>
    </div>

    <div class="user-data">
      <div class="user-parameter-header">
        <h5>Bonus Crafting</h5>
        <button class="btn-element-info" _id="crafting" _name="Bonus Crafting">
          <img class="btn-edit-info" src="./assets/edit.svg" alt="edit"  _id="crafting" _name="Bonus Crafting"/>
        </button>
      </div>
      <p class="h5-regular">${optionsBonus[userInfo["crafting"]]}
        <div class="faq-container">
          ${svg}          
          <span class="tooltip">There are some talents which increase the chance to get more talent materials</span>
        </div>
      </p>
    </div>

    <div class="user-data">
      <div class="user-parameter-header">
        <h5>Level Domains</h5>
        <button class="btn-element-info" _id="levelDomains" _name="Level Domains">
          <img class="btn-edit-info" src="./assets/edit.svg" alt="edit"  _id="levelDomains" _name="Level Domains"/>
        </button>
      </div>
      <p class="h5-regular">${optionsDomains[userInfo["levelDomains"]]}
        <div class="faq-container">
          ${svg}          
          <span class="tooltip">This changes domains drops</span>
        </div>
      </p>
    </div>

    <div class="user-data">
      <div class="user-parameter-header">
        <h5>Resin Amount to Use</h5>
        <button class="btn-element-info" _id="resin" _name="Resin Amount to Use">
          <img class="btn-edit-info" src="./assets/edit.svg" alt="edit"  _id="resin" _name="Resin Amount to Use"/>
        </button>
      </div>
      <p class="h5-regular">${resinType[userInfo["resin"]]}
        <div class="faq-container">
          ${svg}          
          <span class="tooltip">This will change how many times you should do a Domain</span>
        </div>
      </p>
    </div>

    <div class="user-data">
      <div class="user-parameter-header">
        <h5>Calculations</h5>
        <button class="btn-element-info" _id="RNG" _name="Calculations">
          <img class="btn-edit-info" src="./assets/edit.svg" alt="edit"  _id="RNG" _name="Calculations"/>
        </button>
      </div>
      <p class="h5-regular">${rng[userInfo["RNG"]]}
        <div class="faq-container">
          ${svg}          
          <span class="tooltip">Materials Domains drops has RNG. This will change the approximation of how many times you should do the domain</span>
        </div>
      </p>
    </div>

    <div class="user-data">
      <div class="user-parameter-header">
        <h5>Mora Daily Profit</h5>
        <button class="btn-element-profit" _id="Mora" _name="Mora Daily Profit">
          <img class="btn-edit-profit" src="./assets/edit.svg" alt="edit"  _id="Mora" _name="Mora Daily Profit"/>
        </button>
      </div>
      <p class="h5-regular">${userInfo["Mora"]} 
        <div class="faq-container">
          ${svg}          
          <span class="tooltip">As you spend resin you earn Mora. E.g., doing domains, killing a boss</span>
        </div>
      </p>
    </div>`;
};

const getRarity = (i) => {
  let rarityCases = 1,
    fstCounter = 0,
    sndCounter = 8;

  if (i === 0 || i === 2 || i === 4) rarityCases = 3;

  if (i === 1) rarityCases = 4;

  if (i === 3 || i === 5) rarityCases = 2;

  if (i === 7) rarityCases = 5;

  sndCounter += eliteEnemies;
  if (i >= 8 && i < sndCounter) {
    rarityCases = 2;
    let calc = (i - 8) % 3;
    if (calc == 0) rarityCases = 4;
    if (calc == 1) rarityCases = 3;
  }
  fstCounter = sndCounter;

  sndCounter += commonEnemies;
  if (i >= fstCounter && i < sndCounter) {
    rarityCases = 1;
    let calc = (i - fstCounter) % 3;
    if (calc == 0) rarityCases = 3;
    if (calc == 1) rarityCases = 2;
  }
  fstCounter = sndCounter;

  sndCounter += weekBoss;
  if (i >= fstCounter && i < sndCounter) rarityCases = 5;
  fstCounter = sndCounter;

  sndCounter += boss;
  if (i >= fstCounter && i < sndCounter) rarityCases = 4;
  fstCounter = sndCounter;

  sndCounter += stones;
  if (i >= fstCounter && i < sndCounter) {
    rarityCases = 2;
    let calc = (i - fstCounter) % 4;
    if (calc == 0) rarityCases = 5;
    if (calc == 1) rarityCases = 4;
    if (calc == 2) rarityCases = 3;
  }
  fstCounter = sndCounter;

  sndCounter += talentMaterials;
  if (i >= fstCounter && i < sndCounter) {
    rarityCases = 2;
    let calc = (i - fstCounter) % 3;
    if (calc == 0) rarityCases = 4;
    if (calc == 1) rarityCases = 3;
  }
  fstCounter = sndCounter;

  sndCounter += weaponMaterials;
  if (i >= fstCounter && i < sndCounter) {
    rarityCases = 2;
    let calc = (i - fstCounter) % 4;
    if (calc == 0) rarityCases = 5;
    if (calc == 1) rarityCases = 4;
    if (calc == 2) rarityCases = 3;
  }
  fstCounter = sndCounter;

  switch (rarityCases) {
    case 1:
      return "one";
    case 2:
      return "two";
    case 3:
      return "three";
    case 4:
      return "four";
    case 5:
      return "five";
    default:
      break;
  }
};

const drawUserMaterial = () => {
  const $container = d.querySelector(".card-user-amount");
  $container.innerHTML = "";

  let localUserMaterials = JSON.parse(localStorage.getItem("userMaterials"));

  for (let i = 0; i < all.length; i++) {
    if (localUserMaterials[all[i]]) {
      if (localUserMaterials[all[i]] > 0) {
        let number = localUserMaterials[all[i]];
        number = number.toLocaleString("ru-RU");
        let fragment = d.createElement("div"),
          fixedName = all[i].replaceAll('"', "ç"),
          imgName = all[i].replaceAll('"', "").replaceAll(":", "_");
        fragment.classList.add("items-card");

        let rarity = getRarity(i);

        fragment.innerHTML = `
          <div class="item-bg ${rarity}">
            <img src="./assets/materials/${imgName}.webp" alt="${all[i]}" />
          </div>
          <h5 class="card-name">${number}</h5>
          <button class="btn-element-owned" _id="${fixedName}">
            <img class="btn-edit-owned" src="./assets/edit.svg" alt="edit" _id="${fixedName}"/>
          </button>
        `;

        $container.appendChild(fragment);
      }
    }
  }
  calcTotalMaterials();
};

const drawModalProfit = (id) => {
  const $userInfo = JSON.parse(localStorage.getItem("userInfo"));

  let number = $userInfo[id];

  $modal.innerHTML = `
    <div class="modal-info bg-trd">
      <div class="edit-owned-header">
        <figure>
          <img src="./assets/materials/${id}.webp" alt="${id}" />
        </figure>
        <p class="info-title scnd-text">${id}</p>
      </div>
      <div class="number-pick-container">
        <input type="number" id="number-picker" name="number-picker" min="0" class="number-picker frst-text" step="1" pattern="\d*" value="${number}">
      </div>
      <div class="info-form">
        <div class="btn-modal">
          <button class="btn-bordered" id="cancel-btn">Cancel</button>
        </div>
        <div class="btn-modal">
          <button class="btn bg-snd-dark" id="confirm-btn" _id="">Save</button>
        </div>
      </div>
    </div>`;

  const $saveBtn = d.getElementById("confirm-btn");

  saveFlag = true;

  $saveBtn.addEventListener("click", (e) => {
    if (
      Number(d.querySelector("#number-picker").value) ||
      d.querySelector("#number-picker").value == 0
    ) {
      $userInfo[id] = Number(d.querySelector("#number-picker").value);
      localStorage.setItem("userInfo", JSON.stringify($userInfo));
      $modal.style.visibility = "hidden";
      $modal.style.opacity = "0";
      $modal.innerHTML = "";
      saveFlag = false;
      drawUserMaterial();
      drawUserData();
      drawModalPossible();
    } else {
      alert("Set a number");
    }
  });
};

const drawModalElement = (id) => {
  const $userMaterials = JSON.parse(localStorage.getItem("userMaterials"));

  let ogName = id.replaceAll("ç", '"'),
    fixedName = id.replaceAll("ç", "").replaceAll(":", "_");

  let number = $userMaterials[ogName];

  $modal.innerHTML = `
    <div class="modal-info bg-trd">
      <div class="edit-owned-header">
        <figure>
          <img src="./assets/materials/${fixedName}.webp" alt="${ogName}" />
        </figure>
        <p class="info-title scnd-text">${ogName}</p>
      </div>
      <div class="number-pick-container">
        <input type="number" id="number-picker" name="number-picker" min="0" class="number-picker frst-text" step="1" pattern="\d*" value="${number}">
      </div>
      <div class="info-form">
        <div class="btn-modal">
          <button class="btn-bordered" id="cancel-btn">Cancel</button>
        </div>
        <div class="btn-modal">
          <button class="btn bg-snd-dark" id="confirm-btn" _id="">Save</button>
        </div>
      </div>
    </div>`;

  const $saveBtn = d.getElementById("confirm-btn");

  saveFlag = true;

  $saveBtn.addEventListener("click", (e) => {
    if (
      Number(d.querySelector("#number-picker").value) ||
      Number(d.querySelector("#number-picker").value) >= 0
    ) {
      if (Number(d.querySelector("#number-picker").value) >= 0) {
        $userMaterials[ogName] = Number(
          d.querySelector("#number-picker").value
        );
        localStorage.setItem("userMaterials", JSON.stringify($userMaterials));
        $modal.style.visibility = "hidden";
        $modal.style.opacity = "0";
        $modal.innerHTML = "";
        saveFlag = false;
        drawUserMaterial();
        drawUserData();
        drawModalPossible();
      } else {
        alert("Set a positive number");
      }
    } else {
      alert("Set a number");
    }
  });
};

const drawModalInfo = (id, name) => {
  const $userInfo = JSON.parse(localStorage.getItem("userInfo"));

  let options = ``;

  if (id === "World")
    options = `
      <option value="0">0</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>`;

  if (id === "levelDomains")
    options = `
      <option value="0">I</option>
      <option value="1">II</option>
      <option value="2">III</option>
      <option value="3">IV</option>`;

  if (id === "crafting")
    options = `
      <option value="0">No</option>
      <option value="1">10% talent</option>
      <option value="2">25% talent</option>`;

  if (id === "resin") {
    options = `
      <option value="0">20 resin</option>
      <option value="1">40 resin</option>
      <option value="2">60 resin</option>`;
  }

  if (id === "RNG") {
    options = `
      <option value="0">Without RNG</option>
      <option value="1">With RNG</option>`;
  }

  $modal.innerHTML = `
    <div class="modal-info bg-trd">
      <div class="edit-owned-header">
        <figure>
          <img src="./assets/materials/${name}.webp" alt="${name}" />
        </figure>
        <p class="info-title scnd-text">${name}</p>
      </div>
      <div class="number-pick-container">
        <select class="info-options frst-text bg-trd">
          ${options}
        </select>
      </div>
      <div class="info-form">
        <div class="btn-modal">
          <button class="btn-bordered" id="cancel-btn">Cancel</button>
        </div>
        <div class="btn-modal">
          <button class="btn bg-snd-dark" id="confirm-btn" _id="">Save</button>
        </div>
      </div>
    </div>`;

  const $saveBtn = d.getElementById("confirm-btn");

  saveFlag = true;

  $saveBtn.addEventListener("click", (e) => {
    let value = d.querySelector(".info-options").value;
    $userInfo[id] = Number(value);
    localStorage.setItem("userInfo", JSON.stringify($userInfo));
    $modal.style.visibility = "hidden";
    $modal.style.opacity = "0";
    $modal.innerHTML = "";
    saveFlag = false;
    drawUserMaterial();
    drawUserData();
    drawModalPossible();
  });
};

const drawModalPossible = () => {
  let localUserMaterials = JSON.parse(localStorage.getItem("userMaterials"));

  all.forEach((el) => {
    let number = 0;
    if (localUserMaterials[el] >= 0) number = localUserMaterials[el];

    number = number.toLocaleString("ru-RU");

    let label = d.querySelector(
      `[_name="${el.replaceAll('"', "").replaceAll(":", "_")}"]`
    );
    label.innerHTML = number;
  });
};

const getListElements = () => {
  for (let i = 0; i < all.length; i++) {
    let fragment = d.createElement("div"),
      tempName = all[i].replaceAll('"', "").replaceAll(":", "_"),
      fixedName = all[i].replaceAll('"', "ç");
    fragment.classList.add("items-card");
    fragment.id = i;
    let rarity = getRarity(i);

    fragment.innerHTML = `
      <div class="item-bg ${rarity}">
        <img src="./assets/materials/${tempName}.webp" alt="${all[i]}" />
      </div>
      <h5 _name="${tempName}" class="card-name"></h5>
      <button class="btn-element-owned" _id="${fixedName}">
        <img class="btn-edit-owned" src="./assets/edit.svg" alt="edit" _id="${fixedName}"/>
      </button>
    `;
    $itemsContainer.appendChild(fragment);
  }

  setTimeout(() => {
    d.querySelector(".btn-plus-container").style.visibility = "visible";
  }, 500);
};

if (!localStorage.getItem("userMaterials"))
  localStorage.setItem("userMaterials", "{}");

if (!localStorage.getItem("userInfo"))
  localStorage.setItem(
    "userInfo",
    '{"World":9,"crafting":1,"levelDomains":3,"resin":1,"RNG":1,"Mora":1000}'
  );

!localStorage.getItem("total")
  ? localStorage.setItem("total", "{}")
  : Object.keys(JSON.parse(localStorage.getItem("total"))).length == 0
  ? undefined
  : getTotal();

!localStorage.getItem("weaponTotal")
  ? localStorage.setItem("weaponTotal", "{}")
  : Object.keys(JSON.parse(localStorage.getItem("weaponTotal"))).length == 0
  ? undefined
  : getTotal();

!localStorage.getItem("characterTotal")
  ? localStorage.setItem("characterTotal", "{}")
  : Object.keys(JSON.parse(localStorage.getItem("characterTotal"))).length == 0
  ? undefined
  : getTotal();

drawUserMaterial();
drawUserData();

window.addEventListener("load", getListElements);

d.addEventListener("click", (e) => {
  let eventId = e.target.id,
    eventClass = e.target.className;

  try {
    eventClass.includes("something");
  } catch (err) {
    eventClass = "none";
  }

  if (eventClass === $filters) getChecked(filterClasses);

  if (eventClass === "btn-element-owned" || eventClass === "btn-edit-owned") {
    drawModalElement(e.target.attributes["_id"].value);
    $modal.style.visibility = "visible";
    $modal.style.opacity = "1";
  }

  if (eventClass === "btn-element-profit" || eventClass === "btn-edit-profit") {
    drawModalProfit(e.target.attributes["_id"].value);
    $modal.style.visibility = "visible";
    $modal.style.opacity = "1";
  }

  if (eventClass === "btn-element-info" || eventClass === "btn-edit-info") {
    drawModalInfo(
      e.target.attributes["_id"].value,
      e.target.attributes["_name"].value
    );
    $modal.style.visibility = "visible";
    $modal.style.opacity = "1";
  }

  if (eventClass === "modal-container" || eventId === "cancel-btn") {
    $modal.style.visibility = "hidden";
    $modal.style.opacity = "0";
    saveFlag = false;
  }

  if (eventClass === "modal-container-materials") {
    $modalMaterials.style.visibility = "hidden";
    $modalMaterials.style.opacity = "0";
    containerFlag = false;
  }

  if (eventClass === "btn-plus" || eventClass.includes("btn-plus-container")) {
    getChecked(filterClasses);
    drawModalPossible();
    $modalMaterials.style.visibility = "visible";
    $modalMaterials.style.opacity = "1";
    containerFlag = true;
  }

  toggleSize(eventClass, e.target);
});

d.addEventListener("change", (e) => {
  if (e.target.className.includes("selected-items"))
    location.hash = e.target.value;
});

d.addEventListener("keydown", (e) => {
  if (e.key == "Enter" && saveFlag) {
    d.getElementById("confirm-btn").click();
  }
  if (e.key == "Escape" && saveFlag) {
    d.querySelector(".modal-container").click();
  }
  if (e.key == "Escape" && containerFlag) {
    d.querySelector(".modal-container-materials").click();
  }
});

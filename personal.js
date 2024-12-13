import drawTotalItems from "./components/drawTotalItems.js";
import calculateNeeded from "./components/calculateNeeded.js";
import toggleSize from "./components/toggleSize.js";
import calculateData from "./db/data.js";
import drawTotalExcess from "./components/drawTotalExcess.js";

const d = document;

const $modal = d.querySelector(".modal-container"),
  $modalMaterials = d.querySelector(".modal-container-materials");

const svg = `
<svg
                      class="frst-text faq"
                      alt="faq"
                      width="11"
                      height="11"
                      viewBox="0 0 11 11"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.49998 0.458328C4.50283 0.458328 3.52808 0.754017 2.69898 1.308C1.86988 1.86199 1.22368 2.64939 0.842089 3.57063C0.460497 4.49188 0.360656 5.50559 0.555189 6.48357C0.749723 7.46156 1.2299 8.3599 1.93499 9.06499C2.64008 9.77008 3.53841 10.2503 4.5164 10.4448C5.49439 10.6393 6.5081 10.5395 7.42934 10.1579C8.35059 9.77629 9.13799 9.13009 9.69198 8.30099C10.246 7.4719 10.5416 6.49714 10.5416 5.49999C10.5401 4.16335 10.0084 2.88189 9.06324 1.93674C8.11808 0.991586 6.83663 0.459905 5.49998 0.458328ZM5.49998 9.62499C4.68413 9.62499 3.88661 9.38307 3.20825 8.92981C2.5299 8.47655 2.00119 7.83231 1.68898 7.07856C1.37677 6.32482 1.29508 5.49542 1.45424 4.69525C1.61341 3.89508 2.00627 3.16007 2.58317 2.58318C3.16006 2.00629 3.89506 1.61342 4.69523 1.45426C5.49541 1.29509 6.32481 1.37678 7.07855 1.68899C7.8323 2.0012 8.47653 2.52991 8.92979 3.20827C9.38306 3.88662 9.62498 4.68415 9.62498 5.49999C9.62365 6.5936 9.18862 7.64204 8.41532 8.41534C7.64203 9.18863 6.59359 9.62366 5.49998 9.62499ZM5.95832 7.56249V8.47916H5.04165V7.56249H5.95832ZM7.33332 4.35416C7.33381 4.62904 7.27224 4.90048 7.1532 5.14824C7.03416 5.396 6.86072 5.61369 6.64582 5.78508C6.29866 6.05409 6.06392 6.44256 5.98719 6.87499H5.05586C5.09638 6.52163 5.20725 6.17996 5.38193 5.87013C5.5566 5.5603 5.79154 5.28858 6.0729 5.07099C6.18581 4.98063 6.27574 4.86483 6.33533 4.73306C6.39493 4.60129 6.4225 4.45728 6.4158 4.31282C6.40909 4.16835 6.3683 4.02752 6.29676 3.90184C6.22521 3.77616 6.12494 3.66918 6.00415 3.58966C5.86952 3.50166 5.71461 3.44957 5.55416 3.43834C5.39371 3.42711 5.23306 3.45711 5.08748 3.52549C4.9322 3.59992 4.80188 3.71787 4.71237 3.86498C4.62287 4.01209 4.57803 4.18204 4.58332 4.35416C4.58332 4.47572 4.53503 4.5923 4.44907 4.67825C4.36312 4.76421 4.24654 4.81249 4.12498 4.81249C4.00342 4.81249 3.88685 4.76421 3.80089 4.67825C3.71494 4.5923 3.66665 4.47572 3.66665 4.35416C3.65983 4.0019 3.75702 3.65545 3.94607 3.35814C4.13512 3.06083 4.40763 2.82586 4.72952 2.68262C5.01486 2.5551 5.32771 2.50148 5.63923 2.52672C5.95074 2.55195 6.25089 2.65522 6.51198 2.82699C6.76427 2.99401 6.9713 3.22087 7.11462 3.48734C7.25793 3.7538 7.33306 4.0516 7.33332 4.35416Z"
                      />
                    </svg>
`;

const all = calculateData("all");
let sorted = calculateData("all").sort(),
  $itemsContainer = d.querySelector(".items-container-user"),
  options = "";

const getTotal = () => {
  calculateNeeded("userMaterials", "total");
  drawTotalItems("neededTotal", ".elements-container", "-personal");
  drawTotalExcess("total", ".extra-container", "-personal");
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
};

const drawUserData = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const $container = d.querySelector(".user-info");

  let optionsDomains = ["I", "II", "III", "IV"],
    optionsBonus = ["No", "10% talent", "25% talent"],
    resinType = ["Original", "Condensed"],
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
        <h5>Talents Bonus Crafting</h5>
        <button class="btn-element-info" _id="craftingTalents" _name="Talents Bonus Crafting">
          <img class="btn-edit-info" src="./assets/edit.svg" alt="edit"  _id="craftingTalents" _name="Talents Bonus Crafting"/>
        </button>
    </div>
    <p class="h5-regular">${optionsBonus[userInfo["craftingTalents"]]}
          <div class="faq-container">
            ${svg}          
            <span class="tooltip">There are some talents which increase the chance to get more talent materials</span>
          </div>
        </p>
  </div>

  <div class="user-data">
    <div class="user-parameter-header">
        <h5>Weapon Bonus Crafting</h5>
        <button class="btn-element-info" _id="craftingWeapons" _name="Weapon Bonus Crafting">
          <img class="btn-edit-info" src="./assets/edit.svg" alt="edit"  _id="craftingWeapons" _name="Weapon Bonus Crafting"/>
        </button>
    </div>
    <p class="h5-regular">${optionsBonus[userInfo["craftingWeapons"]]}
          <div class="faq-container">
            ${svg}          
            <span class="tooltip">There are some talents which increase the chance to get more weapon materials</span>
          </div>
        </p>
  </div>
  
  <div class="user-data">
    <div class="user-parameter-header">
        <h5>Materials Bonus Crafting</h5>
        <button class="btn-element-info" _id="craftingMaterials" _name="Materials Bonus Crafting">
          <img class="btn-edit-info" src="./assets/edit.svg" alt="edit"  _id="craftingMaterials" _name="Materials Bonus Crafting"/>
        </button>
    </div>
    <p class="h5-regular">${optionsBonus[userInfo["craftingMaterials"]]}
          <div class="faq-container">
            ${svg}          
            <span class="tooltip">There are some talents which increase the chance to get more enemy materials</span>
          </div>
        </p>
  </div>

  <div class="user-data">
    <div class="user-parameter-header">
        <h5>Boss Domain</h5>
        <button class="btn-element-info" _id="dropWeeklyBoss" _name="Boss Domain">
          <img class="btn-edit-info" src="./assets/edit.svg" alt="edit"  _id="dropWeeklyBoss" _name="Boss Domain"/>
        </button>
    </div>
    <p class="h5-regular">${optionsDomains[userInfo["dropWeeklyBoss"]]}
          <div class="faq-container">
            ${svg}          
            <span class="tooltip">This changes the Weekly Boos drops</span>
          </div>
        </p>
  </div>

  <div class="user-data">
    <div class="user-parameter-header">
        <h5>Talent Domains</h5>
        <button class="btn-element-info" _id="talentDrop" _name="Talent Domains">
          <img class="btn-edit-info" src="./assets/edit.svg" alt="edit"  _id="talentDrop" _name="Talent Domains"/>
        </button>
    </div>
    <p class="h5-regular">${optionsDomains[userInfo["talentDrop"]]}
          <div class="faq-container">
            ${svg}          
            <span class="tooltip">This changes the Domains Talent Materials drops</span>
          </div>
        </p>
  </div>

  <div class="user-data">
    <div class="user-parameter-header">
        <h5>Weapon Domains</h5>
        <button class="btn-element-info" _id="weaponDrop" _name="Weapon Domains">
          <img class="btn-edit-info" src="./assets/edit.svg" alt="edit"  _id="weaponDrop" _name="Weapon Domains"/>
        </button>
    </div>
    <p class="h5-regular">${optionsDomains[userInfo["weaponDrop"]]}
          <div class="faq-container">
            ${svg}          
            <span class="tooltip">This changes the Domains Weapon Materials drops</span>
          </div>
        </p>
  </div>

  <div class="user-data">
    <div class="user-parameter-header">
        <h5>Talent Domains Resin</h5>
        <button class="btn-element-info" _id="talentResin" _name="Talent Domains Resin">
          <img class="btn-edit-info" src="./assets/edit.svg" alt="edit"  _id="talentResin" _name="Talent Domains Resin"/>
        </button>
    </div>
    <p class="h5-regular">${resinType[userInfo["talentResin"]]}
          <div class="faq-container">
            ${svg}          
            <span class="tooltip">This will change how many times you should do a Domain Talent Materials</span>
          </div>
        </p>
  </div>

  <div class="user-data">
    <div class="user-parameter-header">
        <h5>Weapon Domains Resin</h5>
        <button class="btn-element-info" _id="weaponResin" _name="Weapon Domains Resin">
          <img class="btn-edit-info" src="./assets/edit.svg" alt="edit"  _id="weaponResin" _name="Weapon Domains Resin"/>
        </button>
    </div>
    <p class="h5-regular">${resinType[userInfo["weaponResin"]]}
          <div class="faq-container">
            ${svg}          
            <span class="tooltip">This will change how many times you should do a Domain Weapon Materials</span>
          </div>
        </p>
  </div>

  <div class="user-data">
    <div class="user-parameter-header">
        <h5>Talent Calculations</h5>
        <button class="btn-element-info" _id="talentRNG" _name="Talent Calculations">
          <img class="btn-edit-info" src="./assets/edit.svg" alt="edit"  _id="talentRNG" _name="Talent Calculations"/>
        </button>
    </div>
    <p class="h5-regular">${rng[userInfo["talentRNG"]]}
          <div class="faq-container">
            ${svg}          
            <span class="tooltip">Talent Materials Domains drops has RNG. This will change the approximation of how many times you should do the domain</span>
          </div>
        </p>
  </div>

  <div class="user-data">
    <div class="user-parameter-header">
      <h5>Weapon Calculations</h5>
      <button class="btn-element-info" _id="weaponRNG" _name="Weapon Calculations">
        <img class="btn-edit-info" src="./assets/edit.svg" alt="edit"  _id="weaponRNG" _name="Weapon Calculations"/>
      </button>
    </div>
    <p class="h5-regular">${rng[userInfo["weaponRNG"]]} 
      <div class="faq-container">
        ${svg}          
        <span class="tooltip">Weapon Materials Domains drops has RNG. This will change the approximation of how many times you should do the domain</span>
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
  </div>
  `;
};

const drawUserMaterial = () => {
  const $container = d.querySelector(".card-user-amount");
  $container.innerHTML = "";

  let localUserMaterials = JSON.parse(localStorage.getItem("userMaterials"));

  all.forEach((el) => {
    if (localUserMaterials[el]) {
      if (localUserMaterials[el] > 0) {
        let number = localUserMaterials[el];
        number = number.toLocaleString("ru-RU");
        let fragment = d.createElement("div"),
          fixedName = el.replaceAll('"', "ç");
        fragment.classList.add("element-owned-info");
        fragment.innerHTML = `
      <section class="element-data">
        <figure class="element-img">
          <img src="./assets/materials/${el.replaceAll('"', "")}.png" alt="${el}" />
        </figure>
        <section class="element-props">
          <h5 class="frst-text">${el}</h5>
          <div class="element-days">
            <small class="frst-text">Amount owned:</small>
          </div>
        </section>
      </section>
      <section class="element-count">
        <button class="btn-element-owned" _id="${fixedName}">
          <img class="btn-edit-owned" src="./assets/edit.svg" alt="edit"  _id="${fixedName}"/>
        </button>
        <small class="frst-text">${number}</small>
      </section>
    `;
        $container.appendChild(fragment);
      }
    }
  });

  let fragment = d.createElement("div");
  fragment.classList.add("element-owned-info");
  fragment.innerHTML = `
      <section class="element-data">
        <figure class="element-img add-item-figure">
          <img src="./assets/add.png" alt="Add item" class="add-item"/>
        </figure>
        <section class="element-props">
          <h5 class="frst-text">Add item</h5>
          <div class="element-days">
            <small class="frst-text">Press the icon.</small>
          </div>
        </section>
      </section>
    `;
  $container.appendChild(fragment);
};

const drawModalProfit = (id) => {
  const $userInfo = JSON.parse(localStorage.getItem("userInfo"));

  let number = $userInfo[id];

  $modal.innerHTML = `
  <div class="modal-info bg-trd">
  <div class="edit-owned-header">
  <figure class="element-img">
          <img src="./assets/materials/${id}.png" alt="${id}" />
        </figure>
      <p class="info-title scnd-text">${id}</p>
  </div>
  <div class="number-pick-container">
  <input type="number" id="number-picker" name="number-picker" min="0" class="number-picker frst-text" step="1" pattern="\d*" value="${number}">
  </div>
      <div class="info-form">
        <div class="btn-modal-info">
          <button class="btn-bordered" id="cancel-btn">Cancel</button>
        </div>
        <div class="btn-modal-info">
          <button class="btn bg-snd-dark" id="confirm-btn" _id="">Save</button>
        </div>
      </div>
    </div>`;

  const $saveBtn = d.getElementById("confirm-btn");

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
      drawUserMaterial();
      calcTotalMaterials();
      getTotal();
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
    fixedName = id.replaceAll("ç", "");

  let number = $userMaterials[ogName];

  $modal.innerHTML = `
  <div class="modal-info bg-trd">
  <div class="edit-owned-header">
  <figure class="element-img">
          <img src="./assets/materials/${fixedName}.png" alt="${ogName}" />
        </figure>
      <p class="info-title scnd-text">${ogName}</p>
  </div>
  <div class="number-pick-container">
  <input type="number" id="number-picker" name="number-picker" min="0" class="number-picker frst-text" step="1" pattern="\d*" value="${number}">
  </div>
      <div class="info-form">
        <div class="btn-modal-info">
          <button class="btn-bordered" id="cancel-btn">Cancel</button>
        </div>
        <div class="btn-modal-info">
          <button class="btn bg-snd-dark" id="confirm-btn" _id="">Save</button>
        </div>
      </div>
    </div>`;

  const $saveBtn = d.getElementById("confirm-btn");

  $saveBtn.addEventListener("click", (e) => {
    if (
      Number(d.querySelector("#number-picker").value) ||
      Number(d.querySelector("#number-picker").value) >= 0
    ) {
      if (Number(d.querySelector("#number-picker").value) >= 0) {
        $userMaterials[ogName] = Number(d.querySelector("#number-picker").value);
        localStorage.setItem("userMaterials", JSON.stringify($userMaterials));
        $modal.style.visibility = "hidden";
        $modal.style.opacity = "0";
        $modal.innerHTML = "";
        drawUserMaterial();
        calcTotalMaterials();
        getTotal();
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
    <option value="9">9</option>
    `;

  if (id === "dropWeeklyBoss" || id === "talentDrop" || id === "weaponDrop")
    options = `
    <option value="0">I</option>
    <option value="1">II</option>
    <option value="2">III</option>
    <option value="3">IV</option>
    `;

  if (id === "craftingTalents" || id === "craftingWeapons" || id === "craftingMaterials")
    options = `
    <option value="0">No</option>
    <option value="1">10% talent</option>
    <option value="2">25% talent</option>
    `;

  if (id === "talentResin" || id === "weaponResin") {
    options = `
    <option value="0">Original</option>
    <option value="1">Condensed</option>
    `;
  }

  if (id === "talentRNG" || id === "weaponRNG") {
    options = `
    <option value="0">Without RNG</option>
    <option value="1">With RNG</option>
    `;
  }

  $modal.innerHTML = `
  <div class="modal-info bg-trd">
  <div class="edit-owned-header">
  <figure class="element-img">
          <img src="./assets/materials/${name}.png" alt="${name}" />
        </figure>
      <p class="info-title scnd-text">${name}</p>
  </div>
  <div class="number-pick-container">
  <select class="info-options frst-text bg-trd">
    ${options}
  </select>
  </div>
      <div class="info-form">
        <div class="btn-modal-info">
          <button class="btn-bordered" id="cancel-btn">Cancel</button>
        </div>
        <div class="btn-modal-info">
          <button class="btn bg-snd-dark" id="confirm-btn" _id="">Save</button>
        </div>
      </div>
    </div>`;

  const $saveBtn = d.getElementById("confirm-btn");

  $saveBtn.addEventListener("click", (e) => {
    let value = d.querySelector(".info-options").value;
    $userInfo[id] = Number(value);
    localStorage.setItem("userInfo", JSON.stringify($userInfo));
    $modal.style.visibility = "hidden";
    $modal.style.opacity = "0";
    $modal.innerHTML = "";
    drawUserMaterial();
    calcTotalMaterials();
    getTotal();
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

    let label = d.querySelector(`[_name="${el.replaceAll('"', "")}"]`);
    label.innerHTML = number;
  });
};

const getListElements = () => {
  sorted.forEach((el) => {
    options += `<option>${el}</option>`;
  });

  all.forEach((el) => {
    let fragment = d.createElement("div"),
      tempName = el.replaceAll('"', ""),
      fixedName = el.replaceAll('"', "ç");
    fragment.classList.add("element-owned-info");
    fragment.id = el;
    fragment.innerHTML = `
      <section class="element-data">
        <figure class="element-img">
          <img src="./assets/materials/${tempName}.png" alt="${el}" />
        </figure>
        <section class="element-props">
          <h5 class="frst-text">${el}</h5>
          <div class="element-days">
            <small class="frst-text">Amount owned:</small>
          </div>
        </section>
      </section>
      <section class="element-count">
        <button class="btn-element-owned" _id="${fixedName}">
          <img class="btn-edit-owned" src="./assets/edit.svg" alt="edit" _id="${fixedName}"/>
        </button>
        <small class="frst-text" _name="${tempName}"></small>
      </section>
  `;

    $itemsContainer.appendChild(fragment);
  });

  let $optionsContainer = d.querySelector(".selected-items");
  $optionsContainer.innerHTML = options;
};

if (!localStorage.getItem("userMaterials")) localStorage.setItem("userMaterials", "{}");

if (!localStorage.getItem("userInfo"))
  localStorage.setItem(
    "userInfo",
    '{"World":9,"dropWeeklyBoss":3,"craftingTalents":1,"craftingWeapons":1,"craftingMaterials":1,"talentDrop":3,"weaponDrop":3,"talentResin":1,"weaponResin":1,"talentRNG":1,"weaponRNG":1,"Mora":0}'
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
calcTotalMaterials();
getTotal();
drawUserData();
getListElements();

d.addEventListener("click", (e) => {
  let eventId = e.target.id,
    eventClass = e.target.className;

  try {
    eventClass.includes("something");
  } catch (err) {
    eventClass = "none";
  }

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
    drawModalInfo(e.target.attributes["_id"].value, e.target.attributes["_name"].value);
    $modal.style.visibility = "visible";
    $modal.style.opacity = "1";
  }

  if (eventClass === "modal-container" || eventId === "cancel-btn") {
    $modal.style.visibility = "hidden";
    $modal.style.opacity = "0";
  }

  if (eventClass === "modal-container-materials") {
    $modalMaterials.style.visibility = "hidden";
    $modalMaterials.style.opacity = "0";
  }

  if (
    eventClass === "add-item" ||
    eventClass === "add-item-figure" ||
    eventClass === "btn-plus" ||
    eventClass.includes("btn-plus-container")
  ) {
    drawModalPossible();
    $modalMaterials.style.visibility = "visible";
    $modalMaterials.style.opacity = "1";
  }

  toggleSize(eventClass, e.target);
});

d.addEventListener("change", (e) => {
  if (e.target.className.includes("selected-items")) location.hash = e.target.value;
});

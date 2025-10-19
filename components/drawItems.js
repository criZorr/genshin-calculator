import calculateData from "../db/data.js";

const d = document;

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

let $userInfo = "";
let worldLevel = "";

let dropBoss = 1.6185,
  leyMora = 12000;

let dropWeeklyBoss = 0;

const specialty = calculateData("specialty"),
  boss = calculateData("boss"),
  weekBoss = calculateData("weekBoss"),
  special = calculateData("special"),
  all = calculateData("all");

let specialtyKeys = Object.keys(specialty);

const getCalculations = () => {
  $userInfo = JSON.parse(localStorage.getItem("userInfo"));
  worldLevel = $userInfo["World"];

  switch (worldLevel) {
    case 1:
      dropBoss = 1.7037;
      leyMora = 20000;
      break;
    case 2:
      dropBoss = 1.7037;
      leyMora = 28000;
      break;
    case 3:
      dropBoss = 1.8741;
      leyMora = 36000;
      break;
    case 4:
      dropBoss = 2.0445;
      leyMora = 44000;
      break;
    case 5:
      dropBoss = 2.2149;
      leyMora = 52000;
      break;
    case 6:
      dropBoss = 2.3852;
      leyMora = 60000;
      break;
    case 7:
      dropBoss = 2.5556;
      leyMora = 60000;
      break;
    case 8:
      dropBoss = 2.5556;
      leyMora = 60000;
      break;
    case 9:
      dropBoss = 3;
      leyMora = 60000;
      break;
    default:
      break;
  }

  switch ($userInfo["levelDomains"]) {
    case 1:
      dropWeeklyBoss = 1;
      break;
    case 2:
      dropWeeklyBoss = 1.55;
      break;
    case 3:
      dropWeeklyBoss = 2.1;
      break;
    default:
      break;
  }
};

export default function drawItems(
  localVariable,
  data,
  classContainer,
  classOptions
) {
  getCalculations();
  const $container = d.querySelector(classContainer),
    $optionsContainer = d.querySelector(classOptions);
  $container.innerHTML = "";
  $optionsContainer.innerHTML = "";

  let $localData = JSON.parse(localStorage.getItem(localVariable)),
    keys = Object.keys($localData);

  let names = keys.map((e) => data[e].name);
  names = names.sort();

  let keysSorted = names.map((e) => {
    for (let i = 0; i < names.length; i++) {
      if (e === data[keys[i]].name) return keys[i];
    }
  });

  let optionTotal = d.createElement("option");
  optionTotal.setAttribute("value", "Total");
  optionTotal.innerHTML = "Total";
  $optionsContainer.appendChild(optionTotal);

  for (let i = 0; i < keys.length; i++) {
    let name = names[i],
      id = keysSorted[i];

    let HeaderContent = `
            <div class="element-header">
              <h3 class="frst-text">${name}</h3>
              <section class="buttons-element">
              <button class="btn-element btn-expand-container">
                  <img class="btn-expand" src="./assets/expand.svg" alt="expand ${name} card"/>
                </button>
                <button class="btn-element btn-edit-container" _id="${id}">
                  <img class="btn-edit" _id="${id}" src="./assets/edit.svg" alt="edit" />
                </button>
                <button class="btn-element btn-delete-container" _id="${id}">
                  <img class="btn-delete" _id="${id}" src="./assets/delete.svg" alt="delete" />
                </button>
              </section>
            </div>
        `;

    let itemsContainer = d.createElement("div");
    itemsContainer.classList.add("calcs-container");

    let itemsContent = "";

    all.forEach((el) => {
      if ($localData[id][el]) {
        let number = $localData[id][el];
        number = number.toLocaleString("ru-RU");

        let tempName = el;
        tempName = tempName.replaceAll('"', "").replaceAll(":", "_");

        let avgFarming = "",
          label = "Look at Total section",
          faq = "Go to Total section to see full calculation";

        if (specialtyKeys.includes(el)) {
          avgFarming = number / specialty[el];
          avgFarming = Math.ceil(avgFarming);
          label = "Avg. days collecting local specialty";
          faq = `In the game there are ${specialty[el]} of this specialty.`;
        }

        if (boss.includes(el)) {
          avgFarming = number / dropBoss;
          avgFarming = Math.ceil(avgFarming);
          label = "Approx. times to defeat boss";
          faq = `This calculation depends of your World Level. (You can change it in "personal" section).`;
        }

        if (weekBoss.includes(el)) {
          avgFarming = number / dropWeeklyBoss;
          avgFarming = Math.ceil(avgFarming);
          label = "Approx. times to defeat weekly boss";
          faq = `This calculation depends on the domain level you choose. (You can change it in "personal" section).`;
        }

        if (special.includes(el)) {
          avgFarming = number;
          avgFarming = Math.ceil(avgFarming);
          label = "Approx. times to complete Natlan quests";
          faq = `Natlan Quests give you this material when you complete them.`;
        }

        if (el === "Mora") {
          avgFarming = $localData[id][el] / leyMora;
          let a = Math.ceil(avgFarming);
          avgFarming = `${Math.ceil(a / 9)} (${a})`;
          label = "Approx. days doing Ley Lines (times)";
          faq = "Only spending all your 180 daily resin in Ley Lines";
        }

        if (el === "Crown of Insight") {
          avgFarming = number;
          label = "Approx. times to purchase it in the shop (1 per month)";
          faq = "You can purchase one Crown of Insight every month";
        }

        let itemContent = `
    <div class="element-info">
              <section class="element-data">
                <figure class="element-img">
                  <img src="./assets/materials/${tempName}.webp" alt="item" />
                </figure>
                <section class="element-props">
                  <h5 class="frst-text">${el}</h5>
                  <div class="element-days">
                    <small class="frst-text description-txt">${label}</small>
                    <div class="faq-container">
                    ${svg}
                    <span class="tooltip">${faq}</span>
                    </div>
                  </div>
                </section>
              </section>
              <section class="element-count">
                <h5 class="frst-text">${number}</h5>
                <small class="frst-text">${avgFarming}</small>
              </section>
            </div>
    `;
        itemsContent += itemContent;
      }
    });

    itemsContainer.innerHTML = itemsContent;

    let card = d.createElement("section");
    card.classList.add("card-individual", "bg-snd");
    card.id = name;
    card.innerHTML = HeaderContent;
    card.appendChild(itemsContainer);
    $container.appendChild(card);

    let option = d.createElement("option");
    option.setAttribute("value", name);
    option.innerHTML = name;
    $optionsContainer.appendChild(option);
  }
}

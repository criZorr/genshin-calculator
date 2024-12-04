import calculateData from "../db/data.js";
import calculateTotal from "../helpers/calculateTotal.js";

const craftMaterialsFour = [...calculateData("stones"), ...calculateData("weaponMaterials")];

const craftMaterialsThree = [
  ...calculateData("talentMaterials"),
  ...calculateData("commonEnemies"),
  ...calculateData("eliteEnemies"),
];

const maxMaterials = ["Gemstone", "Philosophies"];

export default function calculateNeeded(userLocal, variable) {
  for (let i = 31; i <= craftMaterialsFour.length; i += 4) {
    maxMaterials.push(craftMaterialsFour[i]);
  }

  for (let i = 56; i <= craftMaterialsThree.length; i += 3) {
    maxMaterials.push(craftMaterialsThree[i]);
  }

  let craftMaterials = [...craftMaterialsFour, ...craftMaterialsThree];

  let $userData = JSON.parse(localStorage.getItem(userLocal)),
    $data = JSON.parse(localStorage.getItem(variable));

  let newUserData = {};
  let neededData = {};

  let datakeys = Object.keys($data);

  let tempObj = {};

  datakeys.forEach((e) => {
    if (!$userData.hasOwnProperty(e)) {
      newUserData[e] = 0;
      neededData[e] = $data[e];
    } else {
      let calc = $data[e] - ($userData[e] + (tempObj[e] || 0));
      if (calc > 0) {
        neededData[e] = calc;
      }
      if (calc < 0) {
        let calculate = true;
        maxMaterials.forEach((f) => {
          if (e.includes(f)) calculate = false;
        });

        if (calculate) {
          calc = -1 * calc;
          calc = Math.floor(calc / 3);

          for (let i = 0; i < craftMaterials.length; i++) {
            if (e === craftMaterials[i]) tempObj[craftMaterials[i + 1]] = calc;
          }
        }
      }
    }
  });

  tempObj = {};

  if (variable === "characterTotal")
    localStorage.setItem("neededCharacter", JSON.stringify(neededData));

  if (variable === "weaponTotal") localStorage.setItem("neededWeapon", JSON.stringify(neededData));

  if (variable === "total") localStorage.setItem("neededTotal", JSON.stringify(neededData));

  let totalUserData = calculateTotal($userData, newUserData);

  //
  let object = {};

  for (let i = 0; i < craftMaterialsThree.length; i += 3) {
    let raw = 0;
    let raw10 = 0;
    let raw25 = 0;

    if (neededData[craftMaterialsThree[i]] >= 0) raw += neededData[craftMaterialsThree[i]];

    if (neededData[craftMaterialsThree[i + 1]] >= 0)
      raw += neededData[craftMaterialsThree[i + 1]] * 3;

    if (neededData[craftMaterialsThree[i + 2]] >= 0)
      raw += neededData[craftMaterialsThree[i + 2]] * 9;

    if (raw > 0) {
      let gold = Math.ceil((neededData[craftMaterialsThree[i + 2]] || 0) * (9 / 1.21)),
        purple = Math.ceil((neededData[craftMaterialsThree[i + 1]] || 0) * (3 / 1.1));
      raw10 = Math.ceil((neededData[craftMaterialsThree[i]] || 0) + gold + purple);

      object[craftMaterialsThree[i]] = [raw, raw10];
      object[craftMaterialsThree[i + 1]] = [raw, raw10];
      object[craftMaterialsThree[i + 2]] = [raw, raw10];
    }
  }

  for (let i = 0; i < craftMaterialsFour.length; i += 4) {
    let raw = 0;
    let raw10 = 0;
    let raw25 = 0;

    if (neededData[craftMaterialsFour[i]] >= 0) raw += neededData[craftMaterialsFour[i]];

    if (neededData[craftMaterialsFour[i + 1]] >= 0)
      raw += neededData[craftMaterialsFour[i + 1]] * 3;

    if (neededData[craftMaterialsFour[i + 2]] >= 0)
      raw += neededData[craftMaterialsFour[i + 2]] * 9;

    if (neededData[craftMaterialsFour[i + 3]] >= 0)
      raw += neededData[craftMaterialsFour[i + 3]] * 27;

    if (raw > 0) {
      let gold = Math.ceil(neededData[craftMaterialsFour[i + 3]] * (27 / 1.331)),
        purple = Math.ceil(neededData[craftMaterialsFour[i + 2]] * (9 / 1.21)),
        blue = Math.ceil(neededData[craftMaterialsFour[i + 1]] * (3 / 1.1));
      raw10 = Math.ceil(neededData[craftMaterialsFour[i]] + gold + purple + blue);

      object[craftMaterialsFour[i]] = [raw, raw10];
      object[craftMaterialsFour[i + 1]] = [raw, raw10];
      object[craftMaterialsFour[i + 2]] = [raw, raw10];
      object[craftMaterialsFour[i + 3]] = [raw, raw10];
    }
  }

  let bookSum =
    neededData["Wanderer's Advice"] +
    neededData["Adventurer's Experience"] * 5 +
    neededData["Hero's Wit"] * 20;

  object["Wanderer's Advice"] = bookSum;
  object["Adventurer's Experience"] = bookSum;
  object["Hero's Wit"] = bookSum;

  let oreSum =
    neededData["Enhancement Ore"] +
    neededData["Fine Enhancement Ore"] * 5 +
    neededData["Mystic Enhancement Ore"] * 25;

  object["Enhancement Ore"] = oreSum;
  object["Fine Enhancement Ore"] = oreSum;
  object["Mystic Enhancement Ore"] = oreSum;

  localStorage.setItem("rawMaterials", JSON.stringify(object));

  localStorage.setItem(userLocal, JSON.stringify(totalUserData));
}

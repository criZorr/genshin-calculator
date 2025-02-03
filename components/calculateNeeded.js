import calculateData from "../db/data.js";
import calculateTotal from "../helpers/calculateTotal.js";

const weaponMaterials = calculateData("weaponMaterials"),
  stoneMaterials = calculateData("stones"),
  talentMaterials = calculateData("talentMaterials"),
  enemiesMaterials = [...calculateData("commonEnemies"), ...calculateData("eliteEnemies")],
  expMaterials = [
    "Wanderer's Advice",
    "Adventurer's Experience",
    "Hero's Wit",
    "Enhancement Ore",
    "Fine Enhancement Ore",
    "Mystic Enhancement Ore",
  ];

let craftMaterialsFour = [...stoneMaterials, ...weaponMaterials],
  craftMaterialsThree = [...talentMaterials, ...enemiesMaterials];

const all = calculateData("all-normal");

const maxMaterials = ["Hero's Wit", "Mystic Enhancement Ore"];

export default function calculateNeeded(userLocal, variable) {
  for (let i = 3; i <= craftMaterialsFour.length; i += 4) {
    maxMaterials.push(craftMaterialsFour[i]);
  }

  for (let i = 2; i <= craftMaterialsThree.length; i += 3) {
    maxMaterials.push(craftMaterialsThree[i]);
  }

  let craftMaterials = [...craftMaterialsFour, ...craftMaterialsThree, ...expMaterials];

  let $userData = JSON.parse(localStorage.getItem(userLocal)),
    $data = JSON.parse(localStorage.getItem(variable)),
    $activeTalent = JSON.parse(localStorage.getItem("userInfo"));

  let talentCrafting = $activeTalent["craftingTalents"],
    weaponCrafting = $activeTalent["craftingWeapons"],
    materialCrafting = $activeTalent["craftingMaterials"];

  let newUserData = {};
  let neededData = {};

  let tempObj = {};

  all.forEach((e) => {
    if (!$userData.hasOwnProperty(e)) {
      newUserData[e] = 0;
      neededData[e] = $data[e];
    } else {
      let calc = ($data[e] || 0) - (($userData[e] || 0) + (tempObj[e] || 0));
      if (calc > 0) {
        neededData[e] = calc;
      }

      if (calc < 0 && enemiesMaterials.includes(e)) {
        let calculate = true;
        if (maxMaterials.includes(e)) calculate = false;

        if (calculate) {
          calc = -1 * calc;

          if (materialCrafting === 0) calc = Math.floor(calc / 3);
          if (materialCrafting === 1) calc = Math.floor(1.1 * (calc / 3));
          if (materialCrafting === 2) calc = Math.floor((4 / 3) * (calc / 3));

          let position = craftMaterials.indexOf(e);
          if (position >= 0) tempObj[craftMaterials[position + 1]] = calc;
        }
      }

      if (calc < 0 && talentMaterials.includes(e)) {
        let calculate = true;
        if (maxMaterials.includes(e)) calculate = false;

        if (calculate) {
          calc = -1 * calc;

          if (talentCrafting === 0) calc = Math.floor(calc / 3);
          if (talentCrafting === 1) calc = Math.floor(1.1 * (calc / 3));
          if (talentCrafting === 2) calc = Math.floor((4 / 3) * (calc / 3));

          let position = craftMaterials.indexOf(e);
          if (position >= 0) tempObj[craftMaterials[position + 1]] = calc;
        }
      }

      if (calc < 0 && weaponMaterials.includes(e)) {
        let calculate = true;
        if (maxMaterials.includes(e)) calculate = false;

        if (calculate) {
          calc = -1 * calc;

          if (weaponCrafting === 0) calc = Math.floor(calc / 3);
          if (weaponCrafting === 1) calc = Math.floor(1.1 * (calc / 3));
          if (weaponCrafting === 2) calc = Math.floor((4 / 3) * (calc / 3));

          let position = craftMaterials.indexOf(e);
          if (position >= 0) tempObj[craftMaterials[position + 1]] = calc;
        }
      }

      if (calc < 0 && stoneMaterials.includes(e)) {
        let calculate = true;
        if (maxMaterials.includes(e)) calculate = false;

        if (calculate) {
          calc = -1 * calc;
          calc = Math.floor(calc / 3);

          let position = craftMaterials.indexOf(e);
          if (position >= 0) tempObj[craftMaterials[position + 1]] = calc;
        }
      }

      if (calc < 0 && expMaterials.includes(e)) {
        let calculate = true;
        if (maxMaterials.includes(e)) calculate = false;

        if (calculate) {
          calc = -1 * calc;

          if (e === "Adventurer's Experience") {
            calc = Math.floor(calc / 4);
          } else {
            calc = Math.floor(calc / 5);
          }

          let position = craftMaterials.indexOf(e);
          if (position >= 0) tempObj[craftMaterials[position + 1]] = calc;
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
      let gold10 = Math.ceil((neededData[craftMaterialsThree[i + 2]] || 0) * (9 / 1.21)),
        purple10 = Math.ceil((neededData[craftMaterialsThree[i + 1]] || 0) * (3 / 1.1)),
        gold25 = Math.ceil((neededData[craftMaterialsThree[i + 2]] || 0) * (9 / (16 / 9))),
        purple25 = Math.ceil((neededData[craftMaterialsThree[i + 1]] || 0) * (3 / (4 / 3)));

      raw10 = Math.ceil((neededData[craftMaterialsThree[i]] || 0) + gold10 + purple10);
      raw25 = Math.ceil((neededData[craftMaterialsThree[i]] || 0) + gold25 + purple25);

      object[craftMaterialsThree[i]] = [raw, raw10, raw25];
      object[craftMaterialsThree[i + 1]] = [raw, raw10, raw25];
      object[craftMaterialsThree[i + 2]] = [raw, raw10, raw25];
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
      let gold10 = Math.ceil((neededData[craftMaterialsFour[i + 3]] || 0) * (27 / 1.331)),
        purple10 = Math.ceil((neededData[craftMaterialsFour[i + 2]] || 0) * (9 / 1.21)),
        blue10 = Math.ceil((neededData[craftMaterialsFour[i + 1]] || 0) * (3 / 1.1)),
        gold25 = Math.ceil((neededData[craftMaterialsFour[i + 3]] || 0) * (27 / (64 / 27))),
        purple25 = Math.ceil((neededData[craftMaterialsFour[i + 2]] || 0) * (9 / (16 / 9))),
        blue25 = Math.ceil((neededData[craftMaterialsFour[i + 1]] || 0) * (3 / (4 / 3)));

      raw10 = Math.ceil((neededData[craftMaterialsFour[i]] || 0) + gold10 + purple10 + blue10);
      raw25 = Math.ceil((neededData[craftMaterialsFour[i]] || 0) + gold25 + purple25 + blue25);

      object[craftMaterialsFour[i]] = [raw, raw10, raw25];
      object[craftMaterialsFour[i + 1]] = [raw, raw10, raw25];
      object[craftMaterialsFour[i + 2]] = [raw, raw10, raw25];
      object[craftMaterialsFour[i + 3]] = [raw, raw10, raw25];
    }
  }

  let bookSum =
    (neededData["Wanderer's Advice"] || 0) +
    (neededData["Adventurer's Experience"] || 0) * 5 +
    (neededData["Hero's Wit"] || 0) * 20;

  object["Wanderer's Advice"] = bookSum;
  object["Adventurer's Experience"] = bookSum;
  object["Hero's Wit"] = bookSum;

  let oreSum =
    (neededData["Enhancement Ore"] || 0) +
    (neededData["Fine Enhancement Ore"] || 0) * 5 +
    (neededData["Mystic Enhancement Ore"] || 0) * 25;

  object["Enhancement Ore"] = oreSum;
  object["Fine Enhancement Ore"] = oreSum;
  object["Mystic Enhancement Ore"] = oreSum;

  localStorage.setItem("rawMaterials", JSON.stringify(object));
  localStorage.setItem(userLocal, JSON.stringify(totalUserData));
}

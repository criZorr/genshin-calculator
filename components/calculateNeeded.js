import calculateData from "../db/data.js";
import calculateTotal from "../helpers/calculateTotal.js";

const weaponMaterials = calculateData("weaponMaterials"),
  stoneMaterials = calculateData("stones"),
  talentMaterials = calculateData("talentMaterials"),
  enemiesMaterials = [
    ...calculateData("commonEnemies"),
    ...calculateData("eliteEnemies"),
  ],
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

  let craftMaterials = [...craftMaterialsFour, ...craftMaterialsThree];

  let $userData = JSON.parse(localStorage.getItem(userLocal)),
    $data = JSON.parse(localStorage.getItem(variable)),
    crafting = JSON.parse(localStorage.getItem("userInfo"))["crafting"];

  let newUserData = {},
    neededData = {},
    tempObj = {},
    neededRaw = {},
    tempRaw = {};

  all.forEach((e) => {
    if (!expMaterials.includes(e)) {
      if (!$userData.hasOwnProperty(e)) {
        newUserData[e] = 0;
        neededData[e] = $data[e];
        neededRaw[e] = $data[e];
      } else {
        let calc = ($data[e] || 0) - (($userData[e] || 0) + (tempObj[e] || 0)),
          calcRaw = ($data[e] || 0) - (($userData[e] || 0) + (tempRaw[e] || 0));

        if (calc > 0) {
          neededData[e] = calc;
          calcRaw < 0
            ? (neededRaw[e] = -1 * calcRaw)
            : (neededRaw[e] = calcRaw);
        }

        if (calc < 0 && enemiesMaterials.includes(e)) {
          let calculate = true;
          if (maxMaterials.includes(e)) calculate = false;

          if (calculate) {
            calc *= -1;

            if (crafting === 0) calc = Math.floor(calc / 3);
            if (crafting === 1) calc = Math.floor(1.1 * (calc / 3));
            if (crafting === 2) calc = Math.floor((4 / 3) * (calc / 3));

            let position = craftMaterials.indexOf(e);
            if (position >= 0) tempObj[craftMaterials[position + 1]] = calc;
          }
        }

        if (calc < 0 && talentMaterials.includes(e)) {
          let calculate = true;
          if (maxMaterials.includes(e)) calculate = false;

          if (calculate) {
            calc *= -1;

            if (crafting === 0) calc = Math.floor(calc / 3);
            if (crafting === 1) calc = Math.floor(1.1 * (calc / 3));
            if (crafting === 2) calc = Math.floor((4 / 3) * (calc / 3));

            let position = craftMaterials.indexOf(e);
            if (position >= 0) tempObj[craftMaterials[position + 1]] = calc;
          }
        }

        if (calcRaw < 0 && talentMaterials.includes(e)) {
          let calculate = true;

          if (maxMaterials.includes(e)) calculate = false;

          if (calculate) {
            calcRaw *= -1;

            if (crafting === 0) calcRaw = calcRaw / 3;
            if (crafting === 1) calcRaw = 1.1 * (calcRaw / 3);
            if (crafting === 2) calcRaw = (4 / 3) * (calcRaw / 3);

            let position = craftMaterials.indexOf(e);
            if (position >= 0) tempRaw[craftMaterials[position + 1]] = calcRaw;
          }
        }

        if (calc < 0 && weaponMaterials.includes(e)) {
          let calculate = true;
          if (maxMaterials.includes(e)) calculate = false;

          if (calculate) {
            calc *= -1;

            if (crafting === 0) calc = Math.floor(calc / 3);
            if (crafting === 1) calc = Math.floor(1.1 * (calc / 3));
            if (crafting === 2) calc = Math.floor((4 / 3) * (calc / 3));

            let position = craftMaterials.indexOf(e);
            if (position >= 0) tempObj[craftMaterials[position + 1]] = calc;
          }
        }

        if (calcRaw < 0 && weaponMaterials.includes(e)) {
          let calculate = true;

          if (maxMaterials.includes(e)) calculate = false;

          if (calculate) {
            calcRaw *= -1;

            if (crafting === 0) calcRaw = calcRaw / 3;
            if (crafting === 1) calcRaw = 1.1 * (calcRaw / 3);
            if (crafting === 2) calcRaw = (4 / 3) * (calcRaw / 3);

            let position = craftMaterials.indexOf(e);
            if (position >= 0) tempRaw[craftMaterials[position + 1]] = calcRaw;
          }
        }

        if (calc < 0 && stoneMaterials.includes(e)) {
          let calculate = true;
          if (maxMaterials.includes(e)) calculate = false;

          if (calculate) {
            calc *= -1;
            calc = Math.floor(calc / 3);

            let position = craftMaterials.indexOf(e);
            if (position >= 0) tempObj[craftMaterials[position + 1]] = calc;
          }
        }
      }
    }
  });

  tempRaw = {};
  tempObj = {};

  expMaterials.forEach((e) => {
    if (!$userData.hasOwnProperty(e)) newUserData[e] = 0;
  });

  let fstBook =
      ($data["Wanderer's Advice"] || 0) - ($userData["Wanderer's Advice"] || 0),
    sndBook =
      ($data["Adventurer's Experience"] || 0) -
      ($userData["Adventurer's Experience"] || 0),
    trdBook = ($data["Hero's Wit"] || 0) - ($userData["Hero's Wit"] || 0),
    totalBook = fstBook + 5 * sndBook + 20 * trdBook;

  if (totalBook > 0) {
    if (Math.floor(totalBook / 20) > 0)
      neededData["Hero's Wit"] = Math.floor(totalBook / 20);
    if (Math.floor((totalBook % 20) / 5) > 0)
      neededData["Adventurer's Experience"] = Math.floor((totalBook % 20) / 5);
    if ((totalBook % 20) % 5 > 0)
      neededData["Wanderer's Advice"] = (totalBook % 20) % 5;
  }

  let fstOre =
      ($data["Enhancement Ore"] || 0) - ($userData["Enhancement Ore"] || 0),
    sndOre =
      ($data["Fine Enhancement Ore"] || 0) -
      ($userData["Fine Enhancement Ore"] || 0),
    trdOre =
      ($data["Mystic Enhancement Ore"] || 0) -
      ($userData["Mystic Enhancement Ore"] || 0),
    totalOre = fstOre + 5 * sndOre + 25 * trdOre;

  if (totalOre > 0) {
    if (Math.floor(totalOre / 25) > 0)
      neededData["Mystic Enhancement Ore"] = Math.floor(totalOre / 25);
    if (Math.floor((totalOre % 25) / 5) > 0)
      neededData["Fine Enhancement Ore"] = Math.floor((totalOre % 25) / 5);
    if ((totalOre % 25) % 5 > 0)
      neededData["Enhancement Ore"] = (totalOre % 25) % 5;
  }

  if (variable === "characterTotal")
    localStorage.setItem("neededCharacter", JSON.stringify(neededData));

  if (variable === "weaponTotal")
    localStorage.setItem("neededWeapon", JSON.stringify(neededData));
  if (variable === "total")
    localStorage.setItem("neededTotal", JSON.stringify(neededData));

  let totalUserData = calculateTotal($userData, newUserData);

  let object = {};

  for (let i = 0; i < craftMaterialsThree.length; i += 3) {
    let raw = 0,
      raw10 = 0,
      raw25 = 0;

    if (neededRaw[craftMaterialsThree[i]] >= 0)
      raw += neededRaw[craftMaterialsThree[i]];

    if (neededRaw[craftMaterialsThree[i + 1]] >= 0)
      raw += neededRaw[craftMaterialsThree[i + 1]] * 3;

    if (neededRaw[craftMaterialsThree[i + 2]] >= 0)
      raw += neededRaw[craftMaterialsThree[i + 2]] * 9;

    if (raw > 0) {
      let gold10 = Math.ceil(
          (neededRaw[craftMaterialsThree[i + 2]] || 0) * (9 / 1.21)
        ),
        purple10 = Math.ceil(
          (neededRaw[craftMaterialsThree[i + 1]] || 0) * (3 / 1.1)
        ),
        gold25 = Math.ceil(
          (neededRaw[craftMaterialsThree[i + 2]] || 0) * (9 / (16 / 9))
        ),
        purple25 = Math.ceil(
          (neededRaw[craftMaterialsThree[i + 1]] || 0) * (3 / (4 / 3))
        );

      raw10 = Math.ceil(
        (neededRaw[craftMaterialsThree[i]] || 0) + gold10 + purple10
      );
      raw25 = Math.ceil(
        (neededRaw[craftMaterialsThree[i]] || 0) + gold25 + purple25
      );

      object[craftMaterialsThree[i]] = [raw, raw10, raw25];
      object[craftMaterialsThree[i + 1]] = [raw, raw10, raw25];
      object[craftMaterialsThree[i + 2]] = [raw, raw10, raw25];
    }
  }

  for (let i = 0; i < craftMaterialsFour.length; i += 4) {
    let raw = 0,
      raw10 = 0,
      raw25 = 0;

    if (neededRaw[craftMaterialsFour[i]] >= 0)
      raw += neededRaw[craftMaterialsFour[i]];

    if (neededRaw[craftMaterialsFour[i + 1]] >= 0)
      raw += neededRaw[craftMaterialsFour[i + 1]] * 3;

    if (neededRaw[craftMaterialsFour[i + 2]] >= 0)
      raw += neededRaw[craftMaterialsFour[i + 2]] * 9;

    if (neededRaw[craftMaterialsFour[i + 3]] >= 0)
      raw += neededRaw[craftMaterialsFour[i + 3]] * 27;

    if (raw > 0) {
      let gold10 = Math.ceil(
          (neededRaw[craftMaterialsFour[i + 3]] || 0) * (27 / 1.331)
        ),
        purple10 = Math.ceil(
          (neededRaw[craftMaterialsFour[i + 2]] || 0) * (9 / 1.21)
        ),
        blue10 = Math.ceil(
          (neededRaw[craftMaterialsFour[i + 1]] || 0) * (3 / 1.1)
        ),
        gold25 = Math.ceil(
          (neededRaw[craftMaterialsFour[i + 3]] || 0) * (27 / (64 / 27))
        ),
        purple25 = Math.ceil(
          (neededRaw[craftMaterialsFour[i + 2]] || 0) * (9 / (16 / 9))
        ),
        blue25 = Math.ceil(
          (neededRaw[craftMaterialsFour[i + 1]] || 0) * (3 / (4 / 3))
        );

      raw10 = Math.ceil(
        (neededRaw[craftMaterialsFour[i]] || 0) + gold10 + purple10 + blue10
      );
      raw25 = Math.ceil(
        (neededRaw[craftMaterialsFour[i]] || 0) + gold25 + purple25 + blue25
      );

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

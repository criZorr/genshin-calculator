const ascensionFive = {
  1: {
    mora: 10000,
    material: [1, 5],
    specialEnemy: [1, 5],
    enemy: [1, 3],
  },
  2: {
    mora: 20000,
    material: [2, 5],
    specialEnemy: [1, 18],
    enemy: [1, 12],
  },
  3: {
    mora: 30000,
    material: [2, 9],
    specialEnemy: [2, 9],
    enemy: [2, 9],
  },
  4: {
    mora: 45000,
    material: [3, 5],
    specialEnemy: [2, 18],
    enemy: [2, 14],
  },
  5: {
    mora: 55000,
    material: [3, 9],
    specialEnemy: [3, 14],
    enemy: [3, 9],
  },
  6: {
    mora: 65000,
    material: [4, 6],
    specialEnemy: [3, 27],
    enemy: [3, 18],
  },
};

const ascensionFour = {
  1: {
    mora: 5000,
    material: [1, 3],
    specialEnemy: [1, 3],
    enemy: [1, 2],
  },
  2: {
    mora: 15000,
    material: [2, 3],
    specialEnemy: [1, 12],
    enemy: [1, 8],
  },
  3: {
    mora: 20000,
    material: [2, 6],
    specialEnemy: [2, 6],
    enemy: [2, 6],
  },
  4: {
    mora: 30000,
    material: [3, 3],
    specialEnemy: [2, 12],
    enemy: [2, 9],
  },
  5: {
    mora: 35000,
    material: [3, 6],
    specialEnemy: [3, 9],
    enemy: [3, 6],
  },
  6: {
    mora: 45000,
    material: [4, 4],
    specialEnemy: [3, 18],
    enemy: [3, 12],
  },
};

const ascensionThree = {
  1: {
    mora: 5000,
    material: [1, 2],
    specialEnemy: [1, 2],
    enemy: [1, 1],
  },
  2: {
    mora: 10000,
    material: [2, 2],
    specialEnemy: [1, 8],
    enemy: [1, 5],
  },
  3: {
    mora: 15000,
    material: [2, 4],
    specialEnemy: [2, 4],
    enemy: [2, 4],
  },
  4: {
    mora: 20000,
    material: [3, 2],
    specialEnemy: [2, 8],
    enemy: [2, 6],
  },
  5: {
    mora: 25000,
    material: [3, 4],
    specialEnemy: [3, 6],
    enemy: [3, 4],
  },
  6: {
    mora: 30000,
    material: [4, 3],
    specialEnemy: [3, 12],
    enemy: [3, 8],
  },
};

const ascensionTwo = {
  1: {
    mora: 5000,
    material: [1, 1],
    specialEnemy: [1, 1],
    enemy: [1, 1],
  },
  2: {
    mora: 5000,
    material: [2, 1],
    specialEnemy: [1, 5],
    enemy: [1, 4],
  },
  3: {
    mora: 10000,
    material: [2, 3],
    specialEnemy: [2, 3],
    enemy: [2, 3],
  },
  4: {
    mora: 15000,
    material: [3, 1],
    specialEnemy: [2, 5],
    enemy: [2, 4],
  },
};

const ascensionOne = {
  1: {
    mora: 0,
    material: [1, 1],
    specialEnemy: [1, 1],
    enemy: [1, 1],
  },
  2: {
    mora: 5000,
    material: [2, 1],
    specialEnemy: [1, 4],
    enemy: [1, 2],
  },
  3: {
    mora: 5000,
    material: [2, 2],
    specialEnemy: [2, 2],
    enemy: [2, 2],
  },
  4: {
    mora: 10000,
    material: [3, 1],
    specialEnemy: [2, 4],
    enemy: [2, 3],
  },
};

const levelFive = {
  2: [12160, 12, 0, 4],
  3: [62280, 62, 1, 2],
  4: [62820, 62, 4, 1],
  5: [92780, 92, 4, 0],
  6: [129920, 129, 4, 3],
  7: [175040, 175, 0, 1],
  8: [371480, 371, 2, 2],
};

const levelFour = {
  2: [8100, 8, 0, 3],
  3: [41520, 41, 2, 3],
  4: [41880, 41, 4, 2],
  5: [61840, 61, 4, 1],
  6: [86620, 86, 3, 1],
  7: [116700, 116, 3, 3],
  8: [247660, 247, 3, 2],
};

const levelThree = {
  2: [5360, 5, 1, 4],
  3: [27400, 27, 2, 0],
  4: [27640, 27, 3, 1],
  5: [40820, 40, 4, 1],
  6: [57180, 57, 1, 0],
  7: [77020, 76, 5, 1],
  8: [163460, 163, 2, 2],
};

const levelTwo = {
  2: [3640, 3, 3, 1],
  3: [18700, 18, 3, 3],
  4: [18860, 18, 4, 2],
  5: [27840, 27, 4, 1],
  6: [38980, 38, 5, 0],
};

const levelOne = {
  2: [2440, 2, 2, 1],
  3: [12460, 12, 2, 2],
  4: [12580, 12, 3, 0],
  5: [18560, 18, 2, 4],
  6: [26000, 26, 0, 0],
};

export default function calculateWeapon(levelValues, ascensionBool, quality) {
  let levelMora = 0,
    fstLevelCrystal = 0,
    sndLevelCrystal = 0,
    trdLevelCrystal = 0,
    fstLevelValue = levelValues[0],
    sndLevelValue = levelValues[1];

  let levelInfo = "",
    ascensionInfo = "";

  if (quality === "5-stars") {
    levelInfo = levelFive;
    ascensionInfo = ascensionFive;
  }
  if (quality === "4-stars") {
    levelInfo = levelFour;
    ascensionInfo = ascensionFour;
  }
  if (quality === "3-stars") {
    levelInfo = levelThree;
    ascensionInfo = ascensionThree;
  }
  if (quality === "2-stars") {
    levelInfo = levelTwo;
    ascensionInfo = ascensionTwo;
  }
  if (quality === "1-stars") {
    levelInfo = levelOne;
    ascensionInfo = ascensionOne;
  }

  for (let i = fstLevelValue + 1; i <= sndLevelValue; i++) {
    levelMora += levelInfo[i][0];
    fstLevelCrystal += levelInfo[i][1];
    sndLevelCrystal += levelInfo[i][2];
    trdLevelCrystal += levelInfo[i][3];
  }

  let ascensionMora = 0,
    fstAscensionSpecial = 0,
    sndAscensionSpecial = 0,
    trdAscensionSpecial = 0,
    fstAscensionEnemy = 0,
    sndAscensionEnemy = 0,
    trdAscensionEnemy = 0,
    fstAscensionMaterial = 0,
    sndAscensionMaterial = 0,
    trdAscensionMaterial = 0,
    fthAscensionMaterial = 0,
    ascensionHandler = 0;

  if (quality === "2-stars" || quality === "1-stars") {
    if (sndLevelValue === 6) sndLevelValue = 5;
  }

  if (sndLevelValue === 8) sndLevelValue = 7;

  ascensionBool ? (ascensionHandler = sndLevelValue - 1) : (ascensionHandler = sndLevelValue - 2);

  for (let i = fstLevelValue; i <= ascensionHandler; i++) {
    ascensionMora += ascensionInfo[i].mora;

    let enemyType = ascensionInfo[i].enemy[0],
      enemyAmount = ascensionInfo[i].enemy[1],
      specialType = ascensionInfo[i].specialEnemy[0],
      specialAmount = ascensionInfo[i].specialEnemy[1],
      materialType = ascensionInfo[i].material[0],
      materialAmount = ascensionInfo[i].material[1];

    if (enemyType === 1) fstAscensionEnemy += enemyAmount;
    if (enemyType === 2) sndAscensionEnemy += enemyAmount;
    if (enemyType === 3) trdAscensionEnemy += enemyAmount;

    if (specialType === 1) fstAscensionSpecial += specialAmount;
    if (specialType === 2) sndAscensionSpecial += specialAmount;
    if (specialType === 3) trdAscensionSpecial += specialAmount;

    if (materialType === 1) fstAscensionMaterial += materialAmount;
    if (materialType === 2) sndAscensionMaterial += materialAmount;
    if (materialType === 3) trdAscensionMaterial += materialAmount;
    if (materialType === 4) fthAscensionMaterial += materialAmount;
  }

  let totalMora = levelMora + ascensionMora,
    totalEnemy = [fstAscensionEnemy, sndAscensionEnemy, trdAscensionEnemy],
    totalSpecialEnemy = [fstAscensionSpecial, sndAscensionSpecial, trdAscensionSpecial],
    totalMaterial = [
      fstAscensionMaterial,
      sndAscensionMaterial,
      trdAscensionMaterial,
      fthAscensionMaterial,
    ],
    totalCrystal = [fstLevelCrystal, sndLevelCrystal, trdLevelCrystal];

  return [totalMora, totalCrystal, totalEnemy, totalSpecialEnemy, totalMaterial];
}

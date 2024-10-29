const ascension = {
  1: {
    mora: 20000,
    stone: [1, 1],
    specialty: 3,
    enemy: [1, 3],
    boss: 0,
  },
  2: {
    mora: 40000,
    stone: [2, 3],
    specialty: 10,
    enemy: [1, 15],
    boss: 2,
  },
  3: {
    mora: 60000,
    stone: [2, 6],
    specialty: 20,
    enemy: [2, 12],
    boss: 4,
  },
  4: {
    mora: 80000,
    stone: [3, 3],
    specialty: 30,
    enemy: [2, 18],
    boss: 8,
  },
  5: {
    mora: 100000,
    stone: [3, 6],
    specialty: 45,
    enemy: [3, 12],
    boss: 12,
  },
  6: {
    mora: 120000,
    stone: [4, 6],
    specialty: 60,
    enemy: [3, 24],
    boss: 20,
  },
};

const level = {
  2: [24200, 1, 0, 6],
  3: [115800, 4, 3, 28],
  4: [116000, 0, 0, 29],
  5: [171000, 0, 3, 42],
  6: [239200, 1, 3, 59],
  7: [322400, 2, 2, 80],
  8: [684800, 4, 0, 171],
};

const talents = {
  2: {
    mora: 12500,
    enemy: [1, 6],
    book: [1, 3],
    boss: 0,
    crown: 0,
  },
  3: {
    mora: 17500,
    enemy: [2, 3],
    book: [2, 2],
    boss: 0,
    crown: 0,
  },
  4: {
    mora: 25000,
    enemy: [2, 4],
    book: [2, 4],
    boss: 0,
    crown: 0,
  },
  5: {
    mora: 30000,
    enemy: [2, 6],
    book: [2, 6],
    boss: 0,
    crown: 0,
  },
  6: {
    mora: 37500,
    enemy: [2, 9],
    book: [2, 9],
    boss: 0,
    crown: 0,
  },
  7: {
    mora: 120000,
    enemy: [3, 4],
    book: [3, 4],
    boss: 1,
    crown: 0,
  },
  8: {
    mora: 260000,
    enemy: [3, 6],
    book: [3, 6],
    boss: 1,
    crown: 0,
  },
  9: {
    mora: 450000,
    enemy: [3, 9],
    book: [3, 12],
    boss: 2,
    crown: 0,
  },
  10: {
    mora: 700000,
    enemy: [3, 12],
    book: [3, 16],
    boss: 2,
    crown: 1,
  },
};

export default function calculateCharacter(
  fstTalentValues,
  sndTalentValues,
  levelValues,
  ascensionBool
) {
  let talentMora = 0,
    fstTalentEnemy = 0,
    sndTalentEnemy = 0,
    trdTalentEnemy = 0,
    fstTalentBook = 0,
    sndTalentBook = 0,
    trdTalentBook = 0,
    talentBoss = 0,
    talentCrow = 0;

  for (let i = 0; i < fstTalentValues.length; i++) {
    if (!(fstTalentValues[i] === 0)) {
      for (let j = fstTalentValues[i] + 1; j <= sndTalentValues[i]; j++) {
        talentMora += talents[j].mora;
        talentBoss += talents[j].boss;
        talentCrow += talents[j].crown;

        let enemyType = talents[j].enemy[0],
          enemyAmount = talents[j].enemy[1],
          bookType = talents[j].book[0],
          bookAmount = talents[j].book[1];

        if (enemyType === 1) fstTalentEnemy += enemyAmount;
        if (enemyType === 2) sndTalentEnemy += enemyAmount;
        if (enemyType === 3) trdTalentEnemy += enemyAmount;

        if (bookType === 1) fstTalentBook += bookAmount;
        if (bookType === 2) sndTalentBook += bookAmount;
        if (bookType === 3) trdTalentBook += bookAmount;
      }
    }
  }

  // console.log(
  //   "Talentos:\n" +
  //     "Mora: " +
  //     talentMora +
  //     "\nEnemigos: " +
  //     "grises - " +
  //     fstTalentEnemy +
  //     " verdes - " +
  //     sndTalentEnemy +
  //     " azules - " +
  //     trdTalentEnemy +
  //     "\nMateriales de talento: " +
  //     "grises - " +
  //     fstTalentBook +
  //     " verdes - " +
  //     sndTalentBook +
  //     " azules - " +
  //     trdTalentBook +
  //     "\nJefe semanal: " +
  //     talentBoss +
  //     "\nCoronas: " +
  //     talentCrow
  // );

  let levelMora = 0,
    fstLevelBook = 0,
    sndLevelBook = 0,
    trdLevelBook = 0,
    fstLevelValue = levelValues[0],
    sndLevelValue = levelValues[1];

  if (!(fstLevelValue === 0)) {
    for (let i = fstLevelValue + 1; i <= sndLevelValue; i++) {
      levelMora += level[i][0];
      fstLevelBook += level[i][1];
      sndLevelBook += level[i][2];
      trdLevelBook += level[i][3];
    }
  }

  // console.log(
  //   "Nivel:\n" +
  //     "Mora: " +
  //     levelMora +
  //     "\nLibros de experiencia: " +
  //     "verdes - " +
  //     fstLevelBook +
  //     " azules - " +
  //     sndLevelBook +
  //     " morados - " +
  //     trdLevelBook
  // );

  let ascensionMora = 0,
    fstAscensionStone = 0,
    sndAscensionStone = 0,
    trdAscensionStone = 0,
    fthAscensionStone = 0,
    specialty = 0,
    fstAscensionEnemy = 0,
    sndAscensionEnemy = 0,
    trdAscensionEnemy = 0,
    ascensionBoss = 0,
    ascensionHandler = 0;

  if (sndLevelValue === 8) sndLevelValue = 7;

  ascensionBool ? (ascensionHandler = sndLevelValue - 1) : (ascensionHandler = sndLevelValue - 2);

  if (!(fstLevelValue === 0)) {
    for (let i = fstLevelValue; i <= ascensionHandler; i++) {
      ascensionMora += ascension[i].mora;
      specialty += ascension[i].specialty;
      ascensionBoss += ascension[i].boss;

      let enemyType = ascension[i].enemy[0],
        enemyAmount = ascension[i].enemy[1],
        stoneType = ascension[i].stone[0],
        stoneAmount = ascension[i].stone[1];

      if (enemyType === 1) fstAscensionEnemy += enemyAmount;
      if (enemyType === 2) sndAscensionEnemy += enemyAmount;
      if (enemyType === 3) trdAscensionEnemy += enemyAmount;

      if (stoneType === 1) fstAscensionStone += stoneAmount;
      if (stoneType === 2) sndAscensionStone += stoneAmount;
      if (stoneType === 3) trdAscensionStone += stoneAmount;
      if (stoneType === 4) fthAscensionStone += stoneAmount;
    }
  }

  // console.log(
  //   "Ascensión:\n" +
  //     "Mora: " +
  //     ascensionMora +
  //     "\nEnemigos: " +
  //     "grises - " +
  //     fstAscensionEnemy +
  //     " verdes - " +
  //     sndAscensionEnemy +
  //     " azules - " +
  //     trdAscensionEnemy +
  //     "\nPiedras de ascensión: " +
  //     "verdes - " +
  //     fstAscensionStone +
  //     " azules - " +
  //     sndAscensionStone +
  //     " morados - " +
  //     trdAscensionStone +
  //     " dorados - " +
  //     fthAscensionStone +
  //     "\nEspecialidad: " +
  //     specialty +
  //     "\nJefe de mundo: " +
  //     ascensionBoss
  // );

  let totalMora = talentMora + levelMora + ascensionMora,
    totalEnemy = [
      fstTalentEnemy + fstAscensionEnemy,
      sndTalentEnemy + sndAscensionEnemy,
      trdTalentEnemy + trdAscensionEnemy,
    ],
    totalStone = [fstAscensionStone, sndAscensionStone, trdAscensionStone, fthAscensionStone],
    totalTalentBook = [fstTalentBook, sndTalentBook, trdTalentBook],
    totalLevelBook = [fstLevelBook, sndLevelBook, trdLevelBook];

  return [
    totalMora,
    totalEnemy,
    totalLevelBook,
    specialty,
    ascensionBoss,
    totalStone,
    totalTalentBook,
    talentBoss,
    talentCrow,
  ];
}

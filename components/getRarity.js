const d = document;

export default function getRarity(
  id,
  eliteEnemies,
  commonEnemies,
  weekBoss,
  boss,
  stones,
  talentMaterials,
  weaponMaterials,
) {
  let rarityCases = 1,
    fstCounter = 0,
    sndCounter = 8;

  if (id === 0 || id === 2 || id === 4) rarityCases = 3;

  if (id === 1) rarityCases = 4;

  if (id === 3 || id === 5) rarityCases = 2;

  if (id === 7) rarityCases = 5;

  sndCounter += eliteEnemies;
  if (id >= 8 && id < sndCounter) {
    rarityCases = 2;
    let calc = (id - 8) % 3;
    if (calc == 0) rarityCases = 4;
    if (calc == 1) rarityCases = 3;
  }
  fstCounter = sndCounter;

  sndCounter += commonEnemies;
  if (id >= fstCounter && id < sndCounter) {
    rarityCases = 1;
    let calc = (id - fstCounter) % 3;
    if (calc == 0) rarityCases = 3;
    if (calc == 1) rarityCases = 2;
  }
  fstCounter = sndCounter;

  sndCounter += weekBoss;
  if (id >= fstCounter && id < sndCounter) rarityCases = 5;
  fstCounter = sndCounter;

  sndCounter += boss;
  if (id >= fstCounter && id < sndCounter) rarityCases = 4;
  fstCounter = sndCounter;

  sndCounter += stones;
  if (id >= fstCounter && id < sndCounter) {
    rarityCases = 2;
    let calc = (id - fstCounter) % 4;
    if (calc == 0) rarityCases = 5;
    if (calc == 1) rarityCases = 4;
    if (calc == 2) rarityCases = 3;
  }
  fstCounter = sndCounter;

  sndCounter += talentMaterials;
  if (id >= fstCounter && id < sndCounter) {
    rarityCases = 2;
    let calc = (id - fstCounter) % 3;
    if (calc == 0) rarityCases = 4;
    if (calc == 1) rarityCases = 3;
  }
  fstCounter = sndCounter;

  sndCounter += weaponMaterials;
  if (id >= fstCounter && id < sndCounter) {
    rarityCases = 2;
    let calc = (id - fstCounter) % 4;
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
}

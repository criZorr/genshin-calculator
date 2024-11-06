const calculateTotal = (...objects) => {
  return objects.reduce((a, b) => {
    for (let key in b) {
      if (b.hasOwnProperty(key)) a[key] = (a[key] || 0) + b[key];
    }
    return a;
  }, {});
};

export default function calculateNeeded(userLocal, variable) {
  let $userData = JSON.parse(localStorage.getItem(userLocal)),
    $data = JSON.parse(localStorage.getItem(variable));

  let newUserData = {};
  let neededData = {};

  let datakeys = Object.keys($data);

  datakeys.forEach((e) => {
    if (!$userData.hasOwnProperty(e)) {
      newUserData[e] = 0;
      neededData[e] = $data[e];
    } else {
      let calc = $data[e] - $userData[e];
      if (calc > 0) {
        neededData[e] = calc;
      }
    }
  });

  if (variable === "characterTotal")
    localStorage.setItem("neededCharacter", JSON.stringify(neededData));

  if (variable === "weaponTotal") localStorage.setItem("neededWeapon", JSON.stringify(neededData));

  let totalUserData = calculateTotal($userData, newUserData);

  localStorage.setItem(userLocal, JSON.stringify(totalUserData));
}

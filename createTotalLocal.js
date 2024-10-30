const calculateTotal = (...objects) => {
  return objects.reduce((a, b) => {
    for (let key in b) {
      if (b.hasOwnProperty(key)) a[key] = (a[key] || 0) + b[key];
    }
    return a;
  }, {});
};

export default function createTotalLocal(localVariable, dataVariable) {
  let $localData = JSON.parse(localStorage.getItem(dataVariable));

  let localKeys = Object.keys($localData);

  let objects = [];
  for (let i = 0; i < localKeys.length; i++) {
    objects.push($localData[localKeys[i]]);
  }

  let calculated = calculateTotal(...objects);

  let sortedKeys = Object.keys(calculated);
  sortedKeys = sortedKeys.sort();

  let sortedObject = {};
  sortedObject["Mora"] = calculated["Mora"];

  sortedKeys.forEach((e) => {
    if (!(e == "Mora")) {
      sortedObject[e] = calculated[e];
    }
  });

  localStorage.setItem(localVariable, JSON.stringify(calculated));
}

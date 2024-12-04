import calculateTotal from "./calculateTotal.js";

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

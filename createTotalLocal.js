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

  localStorage.setItem(localVariable, JSON.stringify(calculated));
}

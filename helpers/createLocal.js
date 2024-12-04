export default function createLocal(variable, id, object) {
  let $localData = JSON.parse(localStorage.getItem(variable));

  if (Object.keys($localData).length === 0) {
    localStorage.setItem(variable, `{"${id}":${JSON.stringify(object)}}`);
  } else {
    $localData[id] = object;
    localStorage.setItem(variable, JSON.stringify($localData));
  }
}

export default function (variable, id, object) {
  let $localData = JSON.parse(localStorage.getItem(variable));

  if (Object.keys($localData).length === 0) {
    localStorage.setItem(variable, `{"${id}":${JSON.stringify(object)}}`);
  } else {
    let exist = true;
    if ($localData.hasOwnProperty(id)) exist = false;

    if (exist) {
      console.log($localData);
      $localData[id] = object;
      console.log($localData);
      localStorage.setItem(variable, JSON.stringify($localData));
    }
  }
}

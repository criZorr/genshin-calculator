export default function deleteLocal(variable, id, userData) {
  let $localData = JSON.parse(localStorage.getItem(variable)),
    $userData = JSON.parse(localStorage.getItem(userData)),
    localKeys = Object.keys($localData[id]);
  delete $localData[id];
  localStorage.setItem(variable, JSON.stringify($localData));

  for (let i = 0; i < localKeys.length; i++) {
    if ($userData[localKeys[i]] == 0) {
      delete $userData[localKeys[i]];
    }
  }

  localStorage.setItem(userData, JSON.stringify($userData));
}

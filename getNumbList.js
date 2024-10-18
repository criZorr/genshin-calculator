export default function getNumbList(e) {
  let fstValue = Number(e.value);

  const $sndOptions = e.parentElement.querySelectorAll("#second-selection option");

  let $sndSelection = e.parentElement.querySelector("#second-selection"),
    sndValue = Number($sndSelection.value);

  for (let i = 0; i < Object.keys($sndOptions).length; i++) {
    $sndOptions[i].style.display = "block";
    if (Number($sndOptions[i].value) <= fstValue) $sndOptions[i].style.display = "none";
  }

  if (sndValue <= fstValue) $sndSelection.value = fstValue + 1;
}

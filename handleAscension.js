export default function handleAscension(handleValue, selectors, rest = 0) {
  for (let i = 0; i < Object.keys(selectors).length; i++) {
    if (i < handleValue - rest) selectors[i].checked = true;
    if (i >= handleValue) selectors[i].checked = false;
  }
}

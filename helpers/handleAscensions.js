export default function handleAscensions() {
  let lists = document.querySelectorAll(".nmb-list-container .nmb-list"),
    labels = document.querySelectorAll(".nmb-list-container label"),
    boxes = document.querySelectorAll(".nmb-list-container input"),
    fstValue = Number(lists[0].value),
    sndValue = Number(lists[1].value),
    options = lists[1].querySelectorAll(".nmb-list-container option"),
    total = Number(Object.keys(options).length + 1);

  if (fstValue === 1) {
    labels[0].className = "opaqued";
    boxes[0].checked = false;
  } else {
    labels[0].className = "visible";
  }

  if (sndValue === total) {
    labels[1].className = "opaqued";
    boxes[1].checked = false;
  } else {
    labels[1].className = "visible";
  }
}

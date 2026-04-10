export default function toggleSize(clase, target) {
  if (clase === "btn-expand") {
    let container =
        target.parentElement.parentElement.parentElement.parentElement,
      firstContainer = target.parentElement,
      elements = container.children[1];

    container.style.maxHeight = "none";

    target.classList.remove("btn-expand");
    target.classList.add("btn-collapse");

    firstContainer.classList.remove("btn-expand-container");
    firstContainer.classList.add("btn-collapse-container");

    target.alt = target.alt.replaceAll("expand", "collapse");
    target.src = "./assets/collapse.svg";

    elements.style.overflowY = "hidden";
  }

  if (clase.includes("btn-expand-container")) {
    let container = target.parentElement.parentElement.parentElement,
      children = target.children[0],
      elements = container.children[1];

    container.style.maxHeight = "none";

    target.classList.remove("btn-expand-container");
    target.classList.add("btn-collapse-container");

    children.classList.remove("btn-expand");
    children.classList.add("btn-collapse");

    children.alt = children.alt.replaceAll("expand", "collapse");
    children.src = "./assets/collapse.svg";

    elements.style.overflowY = "hidden";
  }

  if (clase === "btn-collapse") {
    let container =
        target.parentElement.parentElement.parentElement.parentElement,
      firstContainer = target.parentElement,
      elements = container.children[1];

    container.style.maxHeight = "16rem";

    target.classList.remove("btn-collapse");
    target.classList.add("btn-expand");

    firstContainer.classList.remove("btn-collapse-container");
    firstContainer.classList.add("btn-expand-container");

    target.alt = target.alt.replaceAll("collapse", "expand");
    target.src = "./assets/expand.svg";

    elements.style.overflowY = "scroll";
  }

  if (clase.includes("btn-collapse-container")) {
    let container = target.parentElement.parentElement.parentElement,
      children = target.children[0],
      elements = container.children[1];

    container.style.maxHeight = "16rem";

    target.classList.remove("btn-collapse-container");
    target.classList.add("btn-expand-container");

    children.classList.remove("btn-collapse");
    children.classList.add("btn-expand");

    children.alt = children.alt.replaceAll("collapse", "expand");
    children.src = "./assets/expand.svg";

    elements.style.overflowY = "scroll";
  }
}

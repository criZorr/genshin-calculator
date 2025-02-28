(() => {
  const d = document,
    $stylesheet = document.styleSheets;

  if (!localStorage.getItem("theme")) localStorage.setItem("theme", "auto");

  let theme = localStorage.getItem("theme"),
    $autoTag = d.querySelector(".auto-theme");

  if (theme === "dark") {
    let theme = d.createElement("link");
    theme.href = "./styles/dark-theme.css";
    theme.classList.add("dark-theme");
    theme.rel = "stylesheet";

    $autoTag.remove();

    d.head.appendChild(theme);
  }
  if (theme === "light") $autoTag.remove();

  if (!$stylesheet[1].cssRules[0].cssText.includes("& .nesting")) {
    let $supportNoNesting = d.createElement("link");
    $supportNoNesting.href = "./styles/styles-no-nesting.css";
    $supportNoNesting.rel = "stylesheet";

    d.head.appendChild($supportNoNesting);
  }

  window.addEventListener("load", () => {
    d.querySelector("body").classList.add("bg-trd");
    setTimeout(() => {
      d.querySelector(".loader-container").style.visibility = "hidden";
      d.querySelector(".loader-container").style.display = "none";
      d.querySelector("main").style.visibility = "visible";
    }, 500);
  });
})();

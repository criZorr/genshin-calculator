(() => {
  const d = document,
    $stylesheet = document.styleSheets;

  if (!localStorage.getItem("theme")) localStorage.setItem("theme", "auto");

  let theme = localStorage.getItem("theme"),
    $autoTag = d.querySelector(".auto-theme"),
    $darkTag = d.querySelector(".dark-theme");

  if (theme === "auto") {
    let theme = d.createElement("link");
    theme.href = "./styles/auto-theme.css";
    theme.classList.add("auto-theme");
    theme.rel = "stylesheet";

    if ($darkTag) $darkTag.remove();

    d.head.appendChild(theme);
  }

  if (theme === "dark") {
    let theme = d.createElement("link");
    theme.href = "./styles/dark-theme.css";
    theme.classList.add("dark-theme");
    theme.rel = "stylesheet";

    if ($autoTag) $autoTag.remove();

    d.head.appendChild(theme);
  }

  if (theme === "light") {
    if ($darkTag) $darkTag.remove();
    if ($autoTag) $autoTag.remove();
  }

  if (!$stylesheet[1].cssRules[0].cssText.includes("& .nesting")) {
    let $supportNoNesting = d.createElement("link");
    $supportNoNesting.href = "./styles/styles-no-nesting.css";
    $supportNoNesting.rel = "stylesheet";

    d.head.appendChild($supportNoNesting);
  }

  window.addEventListener("load", () => {
    d.querySelector("body").style.visibility = "visible";
  });

  // d.onreadystatechange = function () {
  //   if (d.readyState == "complete") {
  //     d.querySelector("body").style.visibility = "visible";
  //   }
  // };
})();

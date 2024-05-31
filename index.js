(() => {
  const $stylesheet = document.styleSheets;

  if (!$stylesheet[1].cssRules[0].cssText.includes("& .nesting")) {
    let $supportNoNesting = document.createElement("link");
    $supportNoNesting.href = "./styles/styles-no-nesting.css";
    $supportNoNesting.rel = "stylesheet";

    document.head.appendChild($supportNoNesting);
  }
})();

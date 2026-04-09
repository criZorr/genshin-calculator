import getData from "./helpers/getData.js";
(() => {
  if (!localStorage.getItem("theme")) localStorage.setItem("theme", "auto");
  if (!localStorage.getItem("language")) localStorage.setItem("language", "en");
})();

(async (d) => {
  let language = localStorage.getItem("language");

  if (language !== "en") {
    const $items = d.querySelectorAll(".txt-item"),
      $url = window.location.pathname;

    let dataLan = await getData(`./db/texts-${language}.json`),
      pageName = $url.replaceAll("/", "").slice(0, -5),
      list = Array.from($items),
      text = [...dataLan["header"]];

    for (const el of dataLan[`static-${pageName}`]) {
      text.push(...el);
    }

    text.push(...dataLan["footer"]);

    list.forEach((el, index) => {
      el.innerHTML = text[index];
    });
  }
})(document);

((d) => {
  const $page = d.querySelector("html");
  let theme = localStorage.getItem("theme");

  if (theme === "dark") {
    $page.classList.add("color-dark");
    $page.classList.remove("color-os");
  }
  if (theme === "light") {
    $page.classList.add("color-light");
    $page.classList.remove("color-os");
  }
})(document);

((d) => {
  const $stylesheet = d.styleSheets;

  if (!$stylesheet[1].cssRules[0].cssText.includes("& .nesting")) {
    let $supportNoNesting = d.createElement("link");
    $supportNoNesting.href = "./styles/styles-no-nesting.css";
    $supportNoNesting.rel = "stylesheet";
    d.head.appendChild($supportNoNesting);
  }
})(document);

((d) => {
  const mobile =
      !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      ),
    $characters = d.querySelector(".section-items"),
    $scrolls = d.querySelectorAll(".scroll-active");

  if (mobile) {
    if (navigator.userAgent.includes("Firefox")) {
      $scrolls.forEach((e) => e.classList.add("scroll-active-mz"));
      if ($characters) {
        $characters.classList.add("section-items-mz");
      }
    } else {
      $scrolls.forEach((e) => e.classList.add("scroll-active-dsk"));
      if ($characters) {
        $characters.classList.add("section-items-dsk");
      }
    }
  }
})(document);

((d, w) => {
  w.addEventListener("load", () => {
    d.querySelector("body").classList.add("bg-trd");
    d.querySelector(".loader-container").style.opacity = "0";
    setTimeout(() => {
      d.querySelector(".loader-container").style.visibility = "hidden";
      d.querySelector(".loader-container").style.display = "none";
      d.querySelector("main").style.visibility = "visible";
    }, 150);
  });
})(document, window);

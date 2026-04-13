import getData from "./helpers/getData.js";
(() => {
  if (!localStorage.getItem("theme")) localStorage.setItem("theme", "auto");
  if (!localStorage.getItem("language")) localStorage.setItem("language", "en");
  if (!localStorage.getItem("userMaterials"))
    localStorage.setItem("userMaterials", "{}");

  if (!localStorage.getItem("userInfo"))
    localStorage.setItem(
      "userInfo",
      '{"World":9,"crafting":1,"levelDomains":3,"resin":1,"RNG":1,"Mora":1000}',
    );

  if (!localStorage.getItem("total")) localStorage.setItem("total", "{}");
  if (!localStorage.getItem("weaponTotal"))
    localStorage.setItem("weaponTotal", "{}");
  if (!localStorage.getItem("characterTotal"))
    localStorage.setItem("characterTotal", "{}");

  let erraser = true,
    mora = 0;
  try {
    erraser = localStorage.getItem("userInfo")["talentRNG"];
  } catch (error) {
    erraser = false;
  }
  if (erraser) {
    mora = JSON.parse(localStorage.getItem("userInfo"))["Mora"];
    localStorage.removeItem("userInfo");
    localStorage.setItem(
      "userInfo",
      `{"World":9,"crafting":1,"levelDomains":3,"resin":1,"RNG":1,"Mora":${mora}}`,
    );
  }
})();

(async (d) => {
  let language = localStorage.getItem("language");

  if (language !== "en") {
    const $items = d.querySelectorAll(".txt-item"),
      $url = window.location.pathname;

    d.documentElement.lang = language;

    let dataLan = await getData(`./db/texts-${language}.json`),
      pageName = $url.replaceAll("/", ""),
      list = Array.from($items),
      text = [...dataLan["header"]],
      $title = d.querySelector("title");

    $title.innerHTML = dataLan["html"][0];

    if (pageName === "") pageName = "index";

    for (const el of dataLan[`static-${pageName}`]) text.push(...el);

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
    const $loader = d.querySelector(".loader-container");
    d.querySelector("body").classList.add("bg-trd");
    $loader.style.opacity = "0";
    setTimeout(() => {
      $loader.style.visibility = "hidden";
      $loader.style.display = "none";
      d.querySelector("main").style.visibility = "visible";
      d.querySelector(".header").style.visibility = "visible";
      d.querySelector(".footer").style.visibility = "visible";
    }, 150);
  });
})(document, window);

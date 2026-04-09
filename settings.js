import getData from "./helpers/getData.js";

const d = document,
  $importFile = d.getElementById("import"),
  $exportBtn = d.getElementById("export-btn"),
  $importBtn = d.getElementById("import-btn"),
  $notification = d.querySelector(".notification-container"),
  $page = d.querySelector("html"),
  $select = d.querySelector("#language");

let theme = localStorage.getItem("theme"),
  language = localStorage.getItem("language");

let stickersData = await getData("./db/stickers.json"),
  stickersLength = Object.keys(stickersData).length;

let dataLan = "";

const showNoti = (text) => {
  let n = Math.floor(Math.random() * stickersLength) + 1,
    file = stickersData[n];

  $notification.querySelector("p").innerHTML = text;
  $notification.querySelector("img").src = `./assets/stickers/${file}`;

  $notification.classList.add("transition");

  setTimeout(() => {
    $notification.classList.remove("transition");
  }, 2000);
};

const exportFile = () => {
  const data = {};

  data["userInfo"] = JSON.parse(localStorage.getItem("userInfo") || "{}");
  data["userMaterials"] = JSON.parse(
    localStorage.getItem("userMaterials") || "{}",
  );
  data["characterData"] = JSON.parse(
    localStorage.getItem("characterData") || "{}",
  );
  data["characterTotal"] = JSON.parse(
    localStorage.getItem("characterTotal") || "{}",
  );
  data["weaponData"] = JSON.parse(localStorage.getItem("weaponData") || "{}");
  data["weaponTotal"] = JSON.parse(localStorage.getItem("weaponTotal") || "{}");
  data["neededCharacter"] = JSON.parse(
    localStorage.getItem("neededCharacter") || "{}",
  );
  data["neededWeapon"] = JSON.parse(
    localStorage.getItem("neededWeapon") || "{}",
  );
  data["neededTotal"] = JSON.parse(localStorage.getItem("neededTotal") || "{}");
  data["total"] = JSON.parse(localStorage.getItem("total") || "{}");
  data["rawMaterials"] = JSON.parse(
    localStorage.getItem("rawMaterials") || "{}",
  );

  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = d.createElement("a");
  a.href = url;
  a.download = "gc-data";
  a.click();
  a.remove();

  let text = "Exported!";
  if (language !== "en") text = dataLan["dynamic-settings"][0];
  showNoti(text);
};

const writeData = (data) => {
  let dataObject = JSON.parse(data);

  if (dataObject["userInfo"])
    localStorage.setItem("userInfo", JSON.stringify(dataObject["userInfo"]));

  if (dataObject["userMaterials"])
    localStorage.setItem(
      "userMaterials",
      JSON.stringify(dataObject["userMaterials"]),
    );

  if (dataObject["characterData"])
    localStorage.setItem(
      "characterData",
      JSON.stringify(dataObject["characterData"]),
    );

  if (dataObject["characterTotal"])
    localStorage.setItem(
      "characterTotal",
      JSON.stringify(dataObject["characterTotal"]),
    );

  if (dataObject["weaponData"])
    localStorage.setItem(
      "weaponData",
      JSON.stringify(dataObject["weaponData"]),
    );

  if (dataObject["weaponTotal"])
    localStorage.setItem(
      "weaponTotal",
      JSON.stringify(dataObject["weaponTotal"]),
    );

  if (dataObject["neededCharacter"])
    localStorage.setItem(
      "neededCharacter",
      JSON.stringify(dataObject["neededCharacter"]),
    );

  if (dataObject["neededWeapon"])
    localStorage.setItem(
      "neededWeapon",
      JSON.stringify(dataObject["neededWeapon"]),
    );

  if (dataObject["neededTotal"])
    localStorage.setItem(
      "neededTotal",
      JSON.stringify(dataObject["neededTotal"]),
    );

  if (dataObject["total"])
    localStorage.setItem("total", JSON.stringify(dataObject["total"]));

  if (dataObject["rawMaterials"])
    localStorage.setItem(
      "rawMaterials",
      JSON.stringify(dataObject["rawMaterials"]),
    );

  let text = "Imported!";
  if (language !== "en") text = dataLan["dynamic-settings"][1];
  showNoti(text);
};

const handleFile = (input) => {
  const file = input.files[0];

  if (file.type === "application/json") {
    let reader = new FileReader();
    reader.readAsText(file);
    reader.addEventListener("load", () => writeData(reader.result));
  } else {
    window.alert("Use the exported JSON file!");
  }
};

const translate = async (language) => {
  dataLan = await getData(`./db/texts-${language}.json`);
  const $items = d.querySelectorAll(".txt-item");
  let list = Array.from($items),
    text = [...dataLan["header"]];

  for (const el of dataLan["static-settings"]) {
    text.push(...el);
  }

  text.push(...dataLan["footer"]);

  list.forEach((el, index) => {
    el.innerHTML = text[index];
  });
};

$importFile.addEventListener("change", () => handleFile($importFile));
$exportBtn.addEventListener("click", exportFile);
$importBtn.addEventListener("click", () => $importFile.click());

if (theme === "auto") d.querySelector("#radio-auto").checked = "true";
if (theme === "light") d.querySelector("#radio-light").checked = "true";
if (theme === "dark") d.querySelector("#radio-dark").checked = "true";
$select.querySelector(`option[value="${language}"]`).selected = true;

if (language !== "en") dataLan = await getData(`./db/texts-${language}.json`);

d.addEventListener("change", (e) => {
  let $id = e.target.id;

  if ($id === "radio-light") {
    $page.classList.add("color-light");
    $page.classList.remove("color-os");
    $page.classList.remove("color-dark");
    localStorage.setItem("theme", "light");
  }

  if ($id === "radio-auto") {
    $page.classList.add("color-os");
    $page.classList.remove("color-light");
    $page.classList.remove("color-dark");
    localStorage.setItem("theme", "auto");
  }

  if ($id === "radio-dark") {
    $page.classList.add("color-dark");
    $page.classList.remove("color-os");
    $page.classList.remove("color-light");
    localStorage.setItem("theme", "dark");
  }

  if ($id === "language") {
    localStorage.setItem("language", `${e.target.value}`);
    language = e.target.value;
    translate(e.target.value);
  }
});

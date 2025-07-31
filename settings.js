import getData from "./helpers/getData.js";

const d = document,
  $importFile = d.getElementById("import"),
  $exportBtn = d.getElementById("export-btn"),
  $importBtn = d.getElementById("import-btn"),
  $notification = d.querySelector(".notification-container");

let theme = localStorage.getItem("theme");

let stickersData = await getData("./db/stickers.json"),
  stickersLength = Object.keys(stickersData).length;

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
    localStorage.getItem("userMaterials") || "{}"
  );
  data["characterData"] = JSON.parse(
    localStorage.getItem("characterData") || "{}"
  );
  data["characterTotal"] = JSON.parse(
    localStorage.getItem("characterTotal") || "{}"
  );
  data["weaponData"] = JSON.parse(localStorage.getItem("weaponData") || "{}");
  data["weaponTotal"] = JSON.parse(localStorage.getItem("weaponTotal") || "{}");
  data["neededCharacter"] = JSON.parse(
    localStorage.getItem("neededCharacter") || "{}"
  );
  data["neededWeapon"] = JSON.parse(
    localStorage.getItem("neededWeapon") || "{}"
  );
  data["neededTotal"] = JSON.parse(localStorage.getItem("neededTotal") || "{}");
  data["total"] = JSON.parse(localStorage.getItem("total") || "{}");
  data["rawMaterials"] = JSON.parse(
    localStorage.getItem("rawMaterials") || "{}"
  );

  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = d.createElement("a");
  a.href = url;
  a.download = "gc-data";
  a.click();
  a.remove();

  showNoti("Exported!");
};

const writeData = (data) => {
  let dataObject = JSON.parse(data);

  if (dataObject["userInfo"])
    localStorage.setItem("userInfo", JSON.stringify(dataObject["userInfo"]));

  if (dataObject["userMaterials"])
    localStorage.setItem(
      "userMaterials",
      JSON.stringify(dataObject["userMaterials"])
    );

  if (dataObject["characterData"])
    localStorage.setItem(
      "characterData",
      JSON.stringify(dataObject["characterData"])
    );

  if (dataObject["characterTotal"])
    localStorage.setItem(
      "characterTotal",
      JSON.stringify(dataObject["characterTotal"])
    );

  if (dataObject["weaponData"])
    localStorage.setItem(
      "weaponData",
      JSON.stringify(dataObject["weaponData"])
    );

  if (dataObject["weaponTotal"])
    localStorage.setItem(
      "weaponTotal",
      JSON.stringify(dataObject["weaponTotal"])
    );

  if (dataObject["neededCharacter"])
    localStorage.setItem(
      "neededCharacter",
      JSON.stringify(dataObject["neededCharacter"])
    );

  if (dataObject["neededWeapon"])
    localStorage.setItem(
      "neededWeapon",
      JSON.stringify(dataObject["neededWeapon"])
    );

  if (dataObject["neededTotal"])
    localStorage.setItem(
      "neededTotal",
      JSON.stringify(dataObject["neededTotal"])
    );

  if (dataObject["total"])
    localStorage.setItem("total", JSON.stringify(dataObject["total"]));

  if (dataObject["rawMaterials"])
    localStorage.setItem(
      "rawMaterials",
      JSON.stringify(dataObject["rawMaterials"])
    );

  showNoti("Imported!");
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

$importFile.addEventListener("change", () => handleFile($importFile));
$exportBtn.addEventListener("click", exportFile);
$importBtn.addEventListener("click", () => $importFile.click());

if (theme === "auto") d.querySelector("#radio-auto").checked = "true";
if (theme === "light") d.querySelector("#radio-light").checked = "true";
if (theme === "dark") d.querySelector("#radio-dark").checked = "true";

d.addEventListener("change", (e) => {
  let $id = e.target.id;

  if ($id === "radio-light") {
    if (d.querySelector(".auto-theme")) d.querySelector(".auto-theme").remove();
    if (d.querySelector(".dark-theme")) d.querySelector(".dark-theme").remove();
    localStorage.setItem("theme", "light");
  }

  if ($id === "radio-auto") {
    let theme = d.createElement("link");
    theme.href = "./styles/auto-theme.css";
    theme.classList.add("auto-theme");
    theme.rel = "stylesheet";

    if (d.querySelector(".dark-theme")) d.querySelector(".dark-theme").remove();
    localStorage.setItem("theme", "auto");

    d.head.appendChild(theme);
  }

  if ($id === "radio-dark") {
    let theme = d.createElement("link");
    theme.href = "./styles/dark-theme.css";
    theme.classList.add("dark-theme");
    theme.rel = "stylesheet";

    if (d.querySelector(".auto-theme")) d.querySelector(".auto-theme").remove();
    localStorage.setItem("theme", "dark");

    d.head.appendChild(theme);
  }
});

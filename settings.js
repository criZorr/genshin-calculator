const d = document;

const exportFile = () => {
  const data = {};

  data["userInfo"] = JSON.parse(localStorage.getItem("userInfo") || "{}");
  data["userMaterials"] = JSON.parse(localStorage.getItem("userMaterials") || "{}");
  data["characterData"] = JSON.parse(localStorage.getItem("characterData") || "{}");
  data["characterTotal"] = JSON.parse(localStorage.getItem("characterTotal") || "{}");
  data["weaponData"] = JSON.parse(localStorage.getItem("weaponData") || "{}");
  data["weaponTotal"] = JSON.parse(localStorage.getItem("weaponTotal") || "{}");
  data["neededCharacter"] = JSON.parse(localStorage.getItem("neededCharacter") || "{}");
  data["neededWeapon"] = JSON.parse(localStorage.getItem("neededWeapon") || "{}");
  data["neededTotal"] = JSON.parse(localStorage.getItem("neededTotal") || "{}");
  data["total"] = JSON.parse(localStorage.getItem("total") || "{}");
  data["rawMaterials"] = JSON.parse(localStorage.getItem("rawMaterials") || "{}");

  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = d.createElement("a");
  a.href = url;
  a.download = "gc-data";
  a.click();
  a.remove();
};

const writeData = (data) => {
  let dataObject = JSON.parse(data);

  if (dataObject["userInfo"])
    localStorage.setItem("userInfo", JSON.stringify(dataObject["userInfo"]));

  if (dataObject["userMaterials"])
    localStorage.setItem("userMaterials", JSON.stringify(dataObject["userMaterials"]));

  if (dataObject["characterData"])
    localStorage.setItem("characterData", JSON.stringify(dataObject["characterData"]));

  if (dataObject["characterTotal"])
    localStorage.setItem("characterTotal", JSON.stringify(dataObject["characterTotal"]));

  if (dataObject["weaponData"])
    localStorage.setItem("weaponData", JSON.stringify(dataObject["weaponData"]));

  if (dataObject["weaponTotal"])
    localStorage.setItem("weaponTotal", JSON.stringify(dataObject["weaponTotal"]));

  if (dataObject["neededCharacter"])
    localStorage.setItem("neededCharacter", JSON.stringify(dataObject["neededCharacter"]));

  if (dataObject["neededWeapon"])
    localStorage.setItem("neededWeapon", JSON.stringify(dataObject["neededWeapon"]));

  if (dataObject["neededTotal"])
    localStorage.setItem("neededTotal", JSON.stringify(dataObject["neededTotal"]));

  if (dataObject["total"]) localStorage.setItem("total", JSON.stringify(dataObject["total"]));

  if (dataObject["rawMaterials"])
    localStorage.setItem("rawMaterials", JSON.stringify(dataObject["rawMaterials"]));

  console.log("done");
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

const $importFile = d.getElementById("import");
$importFile.addEventListener("change", () => handleFile($importFile));

const $exportBtn = d.getElementById("export-btn");
$exportBtn.addEventListener("click", exportFile);

const $importBtn = d.getElementById("import-btn");
$importBtn.addEventListener("click", () => $importFile.click());

const d = document;
export default function getCards(
  data,
  $container,
  path,
  lang,
  langData = "",
  flag = false,
) {
  for (let i = Object.keys(data).length; i >= 1; i--) {
    let name = data[i]["name"],
      nameLan = name;

    if (lang !== "en" && flag) {
      if (langData) nameLan = langData[name] || name;
    } else {
      nameLan = data[i][`name-${lang}`] || name;
    }

    let card = d.createElement("div");
    card.classList.add("card");
    card.setAttribute("_id", i);
    card.setAttribute("id", i);

    let cardBg = d.createElement("div");
    cardBg.classList.add("card-bg");

    let p = d.createElement("h5");
    p.classList.add("card-name");
    p.classList.add("dark-text");
    p.innerHTML = nameLan;
    p.setAttribute("_id", i);

    const date = new Date();
    let today = String(date.getDate()).padStart(2, "0");
    today += "-";
    today += String(date.getMonth() + 1).padStart(2, "0");

    let birthday = data[i].birthday;

    if (birthday === "29-02") birthday = "28-02";

    if (today === birthday) {
      cardBg.classList.add("birth");
      cardBg.style.position = "relative";
      cardBg.innerHTML = `
        <img class="confeti" src="./assets/birthday.gif"/>
        <img
          class="card-img"
          _id="${i}" src="${path}/${name.replaceAll('"', "")}.webp"
          alt="${nameLan}"
          style="position: absolute"
        />`;
    } else {
      switch (data[i].quality) {
        case "5-stars":
          cardBg.classList.add("five");
          break;
        case "4-stars":
          cardBg.classList.add("four");
          break;
        case "3-stars":
          cardBg.classList.add("three");
          break;
        case "2-stars":
          cardBg.classList.add("two");
          break;
        case "1-stars":
          cardBg.classList.add("one");
          break;
        case "5-stars-colab":
          cardBg.classList.add("colab");
          break;
      }
      cardBg.innerHTML = `<img class="card-img" _id="${i}" src="${path}/${name.replaceAll(
        '"',
        "",
      )}.webp" alt="${nameLan}" />`;
    }

    card.appendChild(cardBg);
    card.appendChild(p);
    $container.appendChild(card);
  }
}

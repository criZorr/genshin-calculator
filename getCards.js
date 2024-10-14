const d = document;
export default function getCards(data, $container, path) {
  console.log(data);
  for (let i = Object.keys(data).length; i >= 1; i--) {
    let name = data[i].name,
      nameModified = name
        .replaceAll("(", "")
        .replaceAll(")", "")
        .replaceAll(" ", "_")
        .replaceAll("'", "_");

    let card = d.createElement("div");
    card.classList.add("card");
    card.classList.add(`${nameModified}-card`);

    let cardBg = d.createElement("div");
    cardBg.classList.add("card-bg");

    let p = d.createElement("h5");
    p.classList.add("card-name");
    p.innerHTML = name;

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

    cardBg.innerHTML = `<img src="${path}/${name}.png" alt="${name}" />`;
    card.appendChild(cardBg);
    card.appendChild(p);
    $container.appendChild(card);
  }
}
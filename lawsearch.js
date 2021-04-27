import { createInfoText } from "./searchresult.js";
import { testLawData } from "./testData.js";

function searchHandler() {
  const value = document.getElementById("search").value;
  alert(value + " 를 검색합니다.");
  window.open(
    "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=" +
      value,
    "_blank"
  );
}

/**
 * Create simple card
 *
 * ! Consider a more simpler way..
 * @param {*} data law data
 * @returns Card div element.
 */
const createCard = (data) => {
  const { id, title, whoCreate, where, when, summary, isCompleted } = data;

  const cardElement = document.createElement("div");
  const inner = document.createElement("div");
  const description = document.createElement("div");
  const titleElement = document.createElement("p");
  const paragraphElement = document.createElement("p");

  // Set card element attribute
  cardElement.setAttribute("class", "card");
  cardElement.style.cursor = "pointer";
  cardElement.onclick = () => moveToSearchResult(id);

  inner.setAttribute("class", "inner");
  description.setAttribute("class", "description");
  titleElement.setAttribute("class", "cardTitle");
  paragraphElement.setAttribute("class", "cardParagraph");

  const infoList = [whoCreate, where, when, summary];
  createInfoText(infoList, paragraphElement);
  const cardTitle = document.createTextNode(title);

  titleElement.appendChild(cardTitle);

  const image = new Image();
  image.setAttribute("class", "cardImage");

  if (isCompleted) image.src = "./img/complete.png";
  else image.src = "./img/inprogress.png";

  inner.appendChild(titleElement);
  description.appendChild(paragraphElement);
  description.appendChild(image);
  inner.appendChild(description);

  cardElement.appendChild(inner);

  return cardElement;
};

/**
 * Card item view.
 * ! Modify or remove this function after presentation.
 */
window.onload = () => {
  const CardsPreview = () => {
    const div = document.getElementById("cardBox");
    // The number of cards shown in the preview
    const maxAmount = 12;

    for (let i = 0; i < maxAmount; i++) {
      const id = i % 3;
      const currentData = testLawData[id];
      const card = createCard(currentData);
      div.appendChild(card);
    }
  };

  CardsPreview();
};

function searchHandler() {
  const value = document.getElementById("search").value;
  alert(value + " 를 검색합니다.");
  window.open(
    "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=" +
      value,
    "_blank"
  );
}

function moveToHome() {
  window.location.href = "./index.html";
}

// For presentation!
const testLawData = [
  {
    id: "1",
    title: "공동주택관리법 일부개정법률안",
    whoCreate: "박상혁의원 외 12인",
    where: "국토교통관리위원회",
    when: "2021 - 04 - 05",
    summary: "공동주택, 회계관리, 회계감사",
    isCompleted: false,
  },
  {
    id: "2",
    title: "부동산 거래신고 등에 관한 법률 일부개정법률안",
    whoCreate: "박상혁의원 외 12인",
    where: "국토교통관리위원회",
    when: "2021 - 04 - 05",
    summary: "공동주택, 회계관리, 회계감사",
    isCompleted: true,
  },
  {
    id: "3",
    title: "자원의 절약과 재활용촉진에 관한 법률 일부개정법률안",
    whoCreate: "박상혁의원 외 12인",
    where: "국토교통관리위원회",
    when: "2021 - 04 - 05",
    summary: "공동주택, 회계관리, 회계감사",
    isCompleted: false,
  },
];

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

  cardElement.setAttribute("class", "card");
  inner.setAttribute("class", "inner");
  description.setAttribute("class", "description");
  titleElement.setAttribute("class", "cardTitle");
  paragraphElement.setAttribute("class", "cardParagraph");

  let paragraph = `누가? ${whoCreate}` + '</br>' + `어디서? ${where}` + '</br>' + `언제? ${when}` + '</br>' + `한줄요약: ${summary}`;
  const cardTitle = document.createTextNode(title);
  paragraphElement.innerHTML = paragraph;

  titleElement.appendChild(cardTitle);

  const image = new Image();
  image.setAttribute("class", "cardImage");
  if (isCompleted) image.src = './img/complete.png';
  else image.src = './img/inprogress.png';

  inner.appendChild(titleElement);
  description.appendChild(paragraphElement);
  description.appendChild(image);
  inner.appendChild(description)

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

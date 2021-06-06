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

const createSimplePeopleList = (peopleData) => {
  const first = peopleData[0];
  const firstValue = first["name"];
  const length = peopleData.length;
  const simpleList = `${firstValue}의원 외 ${length}인`;
  return simpleList;
};

const createInfoText = (infoList, div) => {
  // Modify this after presentation
  const text = ["누가?", "어디서?", "언제?", "한줄요약"];

  for (let i = 0; i < infoList.length; i++) {
    const element = document.createElement("p");
    element.setAttribute("class", `info`);

    // create people list.
    // example: 박상혁의원 외 12인
    if (i == 0) {
      const simpleList = createSimplePeopleList(infoList[0]);
      element.innerHTML = simpleList;
    } else if (i == infoList.length - 1) {
      const strongElement = document.createElement("strong");
      element.innerHTML = `${text[i]}`;
      strongElement.innerHTML = ` ${infoList[i]}`;
      element.appendChild(strongElement);
    } else {
      element.innerHTML = `${text[i]} ${infoList[i]}`;
    }

    div.appendChild(element);
  }

  return;
};

window.onload = () => {
  const CardsPreview = () => {
    const div = document.getElementById("cardBox");
    // The number of cards shown in the preview
    const maxAmount = 3;

    for (let i = 0; i < maxAmount; i++) {
      const id = i % 3;
      const currentData = testLawData[id];
      const card = createCard(currentData);
      div.appendChild(card);
    }
  };

  CardsPreview();
  const temp = location.href.split("?");
  const idTemp = temp[1].split("=");
  const key = decodeURI(idTemp[1]);

  console.log(document.getElementById("search").placeholder);
  document.getElementById("search").placeholder = key;
};

function moveToLawSearch() {
  window.location.href = "./lawsearch.html";
}

function moveToPeopleSearch() {
  window.location.href = "./people.html";
}

function moveToPeopleDetail() {
  window.location.href = "./peopleDetail.html";
}

function moveToHome() {
  window.location.href = "./index.html";
}

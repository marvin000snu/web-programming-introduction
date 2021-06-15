import { getParameter } from "./peopleDetail.js";

/**
 *
 * @param {string} keyword
 * @returns data
 */
export const requestLawData = async (keyword) => {
  if (keyword !== undefined) {
    return $.ajax({
      url: `http://3.34.197.145:3002/api/law/search/${keyword}`,
      type: "GET",
      dataType: "json",
    });
  } else {
    return $.ajax({
      url: `http://3.34.197.145:3002/api/law/preview`,
      type: "GET",
      dataType: "json",
    });
  }
};

const searchByKeyword = async (keyword) => {
  // window.location.replace(`./lawsearch.html?keyword=${keyword}`)
  removePrevResult();
  window.history.replaceState(undefined, undefined, `lawsearch.html?keyword=${keyword}`);
  await requestLawData(keyword)
    .then((data) => {
      showOnPage(data);
    })
    .catch((err) => {
      console.error(err);
    });
};

const showOnPage = (lawData) => {
  console.log(lawData);
  const maxAmount = 12; // 수정
  const div = document.getElementById("cardBox");

  // 검색 결과가 없을 경우
  if (lawData.length == 0) {
    alert("검색결과가 없습니다.");
    return;
  } else {
    for (let i = 0; i < maxAmount; i++) {
      const currentData = lawData[i];
      const lawCard = createCard(currentData);
      div.appendChild(lawCard);
    }
  }
};

const removePrevResult = () => {
  const div = document.getElementById("cardBox");
  const length = div.children.length;
  for (let i = 0; i < length; i++) {
    div.children[0].remove();
  }
}

/**
 * Create simple card
 *
 * ! Consider a more simpler way..
 * @param {*} data law data
 * @param {string} keyword search keyword
 * @returns Card div element.
 */
export const createCard = (data) => {
  const {
    agree,
    billId,
    billName,
    billNo,
    disagree,
    drop,
    generalResult,
    lead,
    notattend,
    passGubn,
    procDt,
    procStageCd,
    proposeDt,
    summary,
    team,
  } = data;

  const cardElement = document.createElement("div");
  const inner = document.createElement("div");
  const description = document.createElement("div");
  const titleElement = document.createElement("p");
  const paragraphElement = document.createElement("p");

  cardElement.setAttribute("class", "card");
  cardElement.style.cursor = "pointer";
  cardElement.addEventListener("click", () => {
    moveToLawSearchResult(getParameter("keyword"), billId);
  });
  inner.setAttribute("class", "inner");
  description.setAttribute("class", "description");
  titleElement.setAttribute("class", "cardTitle");
  paragraphElement.setAttribute("class", "cardParagraph");

  const whoCreate = `${lead}의원 외 ${team.split(",").length}인`;
  const paragraph =
    `${whoCreate}` + "</br>" + `${summary}`;
  const cardTitle = document.createTextNode(billName);

  paragraphElement.innerHTML = paragraph;
  titleElement.appendChild(cardTitle);

  const image = new Image();
  image.setAttribute("class", "cardImage");
  const isCompleted = (generalResult == "") ? false : true;
  image.src = (isCompleted) ? "./img/complete.png" : "./img/inprogress.png";

  inner.appendChild(titleElement);
  description.appendChild(paragraphElement);
  description.appendChild(image);
  inner.appendChild(description);
  cardElement.appendChild(inner);

  return cardElement;
};

const initializeView = async () => {
  const keyword = getParameter("keyword");

  await requestLawData(keyword).then(data => {
    const div = document.getElementById("cardBox");

    data.forEach(element => {
      const card = createCard(element);
      div.appendChild(card);
    });
  })
}

window.onload = () => {
  initializeView();
};

window.searchByKeyword = searchByKeyword;

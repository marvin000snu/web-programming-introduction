import { addCategory } from "./people.js";
import { getParameter } from "./peopleDetail.js";
import { committeeData, statusData } from "./tagData.js";

export const getLawDataByHashtag = async (hashTag) => {
  return $.ajax({
    url: `http://3.34.197.145:3002/api/law/searchByHashtag/${hashTag}`,
    type: "GET",
    dataType: "json",
  });
};

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

export const getLawDataByID = async (billId) => {
  return $.ajax({
    url: `http://3.34.197.145:3002/api/law/getLawInfo/${billId}`,
    type: "GET",
    dataType: "json",
  });
};

export const getHashTag = async (billId) => {
  return $.ajax({
    url: `http://3.34.197.145:3002/api/law/hashtag/${billId}`,
    type: "GET",
    dataType: "json",
  });
};

const searchByKeyword = async (keyword) => {
  let lawData = [];
  // window.location.replace(`./lawsearch.html?keyword=${keyword}`)
  removePrevResult();
  window.history.replaceState(
    undefined,
    undefined,
    keyword == undefined
      ? `lawsearch.html`
      : `lawsearch.html?keyword=${keyword}`
  );
  await requestLawData(keyword)
    .then((data) => {
      lawData = data;
    })
    .catch((err) => {
      console.error(err);
      return;
    });
  await getLawDataByHashtag(keyword)
    .then((data) => {
      data.forEach((e) => {
        lawData.push(e);
      });
      showOnPage(lawData);
    })
    .catch((err) => console.error(err));

  if (keyword !== undefined) {
    try {
      const infoTitle = document.getElementById("info_title");
      infoTitle.remove();
    } catch (err) {
      //
    }
  }
};

const showOnPage = async (lawData) => {
  const maxAmount = lawData.length; // 수정
  const div = document.getElementById("cardBox");

  // 검색 결과가 없을 경우
  if (lawData.length == 0) {
    const message = "검색결과가 없습니다!";
    const pElement = document.createElement("p");
    pElement.setAttribute("id", "warning-message");
    pElement.innerHTML = message;
    div.appendChild(pElement);
    alert("검색결과가 없습니다.");
    return;
  } else {
    for (let i = 0; i < maxAmount; i++) {
      const currentData = lawData[i];
      const lawCard = await createCard(currentData);
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
};

/**
 * Create simple card
 *
 * ! Consider a more simpler way..
 * @param {*} data law data
 * @param {string} keyword search keyword
 * @returns Card div element.
 */
export const createCard = async (data) => {
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
    group
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
  const hashTag = await getHashTag(billId);
  const paragraph =
    `누가? ${whoCreate}` +
    "</br>" +
    `어디서? ${group}` +
    "</br>" +
    `언제? ${proposeDt}` +
    "</br>" +
    `한줄요약: ${hashTag["hash-tag"]}`;
  if (billName.length > 45) {
    titleElement.setAttribute("style", "font-size: 16px;");
  }
  const cardTitle = document.createTextNode(billName);

  paragraphElement.innerHTML = paragraph;
  titleElement.appendChild(cardTitle);

  const image = new Image();
  image.setAttribute("class", "cardImage");
  const isCompleted = generalResult == "" ? false : true;
  image.src = isCompleted ? "./img/complete.png" : "./img/inprogress.png";

  inner.appendChild(titleElement);
  description.appendChild(paragraphElement);
  description.appendChild(image);
  inner.appendChild(description);
  cardElement.appendChild(inner);

  return cardElement;
};

/**
 * Search law data by tag
 */
const tagSearch = async () => {
  removePrev(); // ! Remove previous card data on main page

  const committee = document.getElementById("소속위원회").value;
  const status = document.getElementById("상태").value;

  await getData(party, type, committee).then((data) => {
    showOnPage(data);
  });
};

const initializeView = () => {
  let lawData = [];
  const div = document.getElementById("cardBox");
  const keyword = getParameter("keyword");
  searchByKeyword(keyword);
};

window.onload = () => {
  initializeView();

  const committeeElement = document.getElementById("소속위원회");
  const statusElement = document.getElementById("상태");

  addCategory(
    [committeeElement, statusElement],
    [committeeData, statusData],
    2
  );
};

window.searchByKeyword = searchByKeyword;

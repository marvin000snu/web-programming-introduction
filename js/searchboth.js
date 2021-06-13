import { createPeopleCard, requestPeopleData } from "./people.js";
import { createCard } from "./lawsearch.js";
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

const getDataBySearchBoth = async (keyword) => {
  let datas = [];
  await requestPeopleData().then((res) => {
    const peopleData = res["result"];
    peopleData.forEach((data) => {
      datas.push(data);
    });
  });

  return datas;
};


/**
 * Show data on the main page.
 *
 * @param {Array} data People data.
 */
const showOnPage = (peopleData) => {
  const maxAmount = 300; // 한페이지에 보여줄 Maximum 갯수
  const div = document.getElementById("peopleCardBox");

  // 검색 결과가 없을 경우
  if (peopleData.length == 0) {
    const message = "검색결과가 없습니다!";
    const pElement = document.createElement("p");
    pElement.setAttribute("id", "warning-message");
    pElement.innerHTML = message;
    div.appendChild(pElement);
    alert("검색결과가 없습니다."); // Remove this?
    return;
  }

  try {
    for (let i = 0; i < maxAmount; i++) {
      const currentData = peopleData[i];
      const peopleCard = createPeopleCard(currentData);
      div.appendChild(peopleCard);
    }
  } catch {
    // Cannot destructure property 'committee' of 'data' as it is undefined
  }
};

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

window.onload = async () => {
  CardsPreview();
  await getDataBySearchBoth().then((data) => {
    console.log("=>", data);
    showOnPage(data);
  });

  const temp = location.href.split("?");
  const idTemp = temp[1].split("=");
  const key = decodeURI(idTemp[1]);

  console.log(document.getElementById("search").placeholder);
  document.getElementById("search").placeholder = key;
};

import { createPeopleCard, requestPeopleData } from "./people.js";
import { createCard, requestLawData } from "./lawsearch.js";
import { getLeadLawData, getParameter } from "./peopleDetail.js";

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
  console.log("키워드:", keyword);
  let datas = { lawData: [], peopleData: [] };
  await requestLawData(keyword)
    .then((res) => {
      datas["lawData"] = res;
    })
    .catch((err) => {
      console.error(err);
    });
  await requestPeopleData()
    .then((res) => {
      const peopleData = res["result"];
      peopleData.forEach((data) => {
        if (data.name === keyword) {
          datas["peopleData"].push(data);
        }
      });
    })
    .catch((err) => {
      console.error(err);
    });

    if (datas["peopleData"].length !== 0) {
      console.log(keyword);
      await getLeadLawData(keyword).then(res => {
        datas["lawData"] = res;
      }).catch(err => console.error(err));
    }

  return datas;
};

/**
 * Show data on the main page.
 *
 * @param {Array} data People data.
 */
const showOnPage = async (lawData, peopleData) => {
  console.log("law=>", lawData, "people", peopleData);
  const maxAmount = 300; // 한페이지에 보여줄 Maximum 갯수
  const cardDiv = document.getElementById("cardBox");
  const peopleCardDiv = document.getElementById("peopleCardBox");

  // 법률안 검색 결과가 없을 경우
  if (lawData.length == 0) {
    const message = "검색결과가 없습니다!";
    const pElement = document.createElement("p");
    pElement.setAttribute("id", "warning-message");
    pElement.innerHTML = message;
    cardDiv.appendChild(pElement);
  } else {
    for (let i = 0; i < lawData.length; i++) {
      const currentData = lawData[i];
      const card = await createCard(currentData);
      cardDiv.appendChild(card);
    }
  }

  // 의원 검색 결과가 없을 경우
  if (peopleData.length == 0) {
    const message = "검색결과가 없습니다!";
    const pElement = document.createElement("p");
    pElement.setAttribute("id", "warning-message");
    pElement.innerHTML = message;
    peopleCardDiv.appendChild(pElement);
  } else {
    console.log(peopleData);
    try {
      for (let i = 0; i < maxAmount; i++) {
        const currentData = peopleData[i];
        console.log(currentData);
        const peopleCard = createPeopleCard(currentData);
        console.log("currentData:")
        console.log(currentData)
        peopleCardDiv.appendChild(peopleCard);
      }
    } catch (err) {
      // console.error(err);
      // Cannot destructure property 'committee' of 'data' as it is undefined
    }
  }
};

window.onload = async () => {
  const keyword = decodeURI(getParameter("keyword"));
  console.log(keyword);
  const data = await getDataBySearchBoth(keyword);
  const { lawData, peopleData } = data;
  await showOnPage(lawData, peopleData);

  console.log(document.getElementById("search").placeholder);
  document.getElementById("search").placeholder = keyword;
};

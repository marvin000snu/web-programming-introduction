import { committeeData, typeData, partyData } from "./tagData.js";

/**
 *
 * @param {*} data People data
 */
const createPeopleCard = (data) => {
  const { committee, count, gender, id, local, name, party, type } = data;
  const cardElement = document.createElement("div");
  const imgCover = document.createElement("div");
  const inner = document.createElement("div");

  cardElement.setAttribute("id", "boxContainer");
  imgCover.setAttribute("id", "boxImg");
  inner.setAttribute("id", "boxInner");

  const innerText = `${name} / ${local}`;
  inner.innerHTML = innerText;

  const image = new Image();
  image.setAttribute("class", "cardImage");
  image.src = "../img/peopleSample.png";

  cardElement.appendChild(image);
  cardElement.appendChild(inner);

  return cardElement;
};

const requestDataFromServer = async () => {
  return $.ajax({
    url: "http://3.34.197.145:3002/api/people/getAllPeople", // 클라이언트가 요청을 보낼 서버의 URL 주소
    type: "GET", // HTTP 요청 방식(GET, POST)
    dataType: "json", // 서버에서 보내줄 데이터의 타입
  });
};

const filtering = (datas, category, value) => {
  let filteredData = [];
  datas.forEach((data) => {
    if (data[category] == value) {
      filteredData.push(data);
    }
  });

  return filteredData;
};

/**
 * @param {string} category Tag category
 * @param {string} tagText Text value
 */
const getData = async (party, type, committee) => {
  let values = [party, type, committee];
  let categoryList = ["party", "type", "committee"];
  let datas = [];
  await requestDataFromServer().then((res) => {
    const peopleData = res["result"];

    if (party == "all" && type == "all" && committee == "all") {
      // Search all
      peopleData.forEach((data) => {
        datas.push(data);
      });
    } else {
      // Filter search
      datas = peopleData;
      for (let i = 0; i < 3; i++) {
        if (values[i] !== "all") {
          datas = filtering(datas, categoryList[i], values[i]);
        }
      }
    }
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

  const div = document.getElementById("cardBox");
  //
  try {
    for (let i = 0; i < maxAmount; i++) {
      const currentData = peopleData[i];
      const peopleCard = createPeopleCard(currentData);
      div.appendChild(peopleCard);
    }
  } catch {
    // 검색 내역이 없을 때 UI 생각해 볼 것!
  }
};

/**
 * Remove previous card data on main page.
 */
const removePrev = () => {
  const div = document.getElementById("cardBox");
  const length = div.children.length;
  for (let i = 0; i < length; i++) {
    div.children[0].remove();
  }
};

/**
 * Search people data by tag
 */
const tagSearch = async () => {
  removePrev(); // ! Remove previous card data on main page

  const party = document.getElementById("정당").value;
  const type = document.getElementById("당선방법").value;
  const committee = document.getElementById("소속위원회").value;

  await getData(party, type, committee).then((data) => {
    showOnPage(data);
  });
};

const addCategory = (elements, datas, size) => {
  for (let i = 0; i < size; i++) {
    for (let key in datas[i]) {
      const optionElement = document.createElement("option");
      optionElement.setAttribute("value", key);
      optionElement.innerHTML = `${datas[i][key]}`;
      elements[i].appendChild(optionElement);
    }
  }
};

window.onload = async () => {
  await getData("all", "all", "all").then((data) => {
    showOnPage(data);
  });

  const partyElement = document.getElementById("정당");
  const typeElement = document.getElementById("당선방법");
  const committeeElement = document.getElementById("소속위원회");

  addCategory(
    [partyElement, typeElement, committeeElement],
    [partyData, typeData, committeeData],
    3
  );
};

window.tagSearch = tagSearch;

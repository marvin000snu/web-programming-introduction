import { committeeData, typeData, partyData } from "./tagData.js";

const searchPeopleByKeyword = async (keyword) => {
  let result = [];
  window.history.replaceState(
    undefined,
    undefined,
    `./people.html?keyword=${keyword}`
  );
  await requestPeopleData().then((data) => {
    const peopleData = data["result"];
    peopleData.forEach((d) => {
      if (d.name == keyword) {
        result.push(d);
      }
      if (d.name.includes(keyword)) {
        result.push(d);
      }
    });
  });
  // 중복되는 의원이 없는 경우
  if (result.length == 1) {
    window.location.href = `./peopleDetail.html?id=${result[0].id}`;
  } else {
    removePrev();
    showOnPage(result);
  }
};

/**
 *
 * @param {*} data People data
 */
export const createPeopleCard = (data) => {
  const partyObj = {
    더불어민주당: "#00A0E2",
    국민의힘: "#E61E2B",
    정의당: "#FFCC00",
    국민의당: "#EA5504",
    열린민주당: " #003E9B",
    기본소득당: "#82C8B4",
    시대전환: "#5A147E",
    무소속: "#d2d2d2",
  };

  const { committee, count, gender, id, local, name, party, type } = data;
  const cardElement = document.createElement("div");
  const imgCover = document.createElement("div");
  const inner = document.createElement("p");
  const peopleCardImageCover = document.createElement("div");

  peopleCardImageCover.setAttribute("class", "peopleCardImageCover");
  peopleCardImageCover.setAttribute(
    "style",
    `background-color:${partyObj[party]};`
  );
  cardElement.setAttribute("id", "boxContainer");
  imgCover.setAttribute("id", "boxImg");
  inner.setAttribute("id", "peopleName");

  const innerText = `${name} / ${local}`;
  inner.innerHTML = innerText;

  const image = new Image();
  image.setAttribute("class", "peopleCardImage");
  if(id===497){
    image.src = `../img/img300/${"이수진1"}.png`;

  }else   if(id===498){
    image.src = `../img/img300/${"이수진2"}.png`;

  }else   if(id===335){
    image.src = `../img/img300/${"김병욱1"}.png`;

  }else   if(id===336){
    image.src = `../img/img300/${"김병욱2"}.png`;

  }else{
    image.src = `../img/img300/${name}.png`;
  }
  image.addEventListener("click", () => {
    location.href = `./peopleDetail.html?id=${id}`;
  });
  image.style.cursor = "pointer";
  peopleCardImageCover.appendChild(image);
  cardElement.appendChild(peopleCardImageCover);
  cardElement.appendChild(inner);

  return cardElement;
};

export const requestPeopleData = async () => {
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
export const getData = async (party, type, committee) => {
  let values = [party, type, committee];
  let categoryList = ["party", "type", "committee"];
  let datas = [];

  await requestPeopleData().then((res) => {
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

export const addCategory = (elements, datas, size) => {
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
  await getData("all", "all", "all")
    .then((data) => {
      showOnPage(data);
    })
    .catch((err) => {
      console.error(err);
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
window.searchPeopleByKeyword = searchPeopleByKeyword;

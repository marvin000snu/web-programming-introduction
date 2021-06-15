const requestPeopleData = async () => {
  return $.ajax({
    url: "http://3.34.197.145:3002/api/people/getAllPeople", // 클라이언트가 요청을 보낼 서버의 URL 주소
    type: "GET", // HTTP 요청 방식(GET, POST)
    dataType: "json" // 서버에서 보내줄 데이터의 타입
  });
};

const requestMainAttendData = async (id) => {
  return $.ajax({
    url: `http://3.34.197.145:3002/api/people/getMainAttendData/${id}`,
    type: "GET",
    dataType: "json"
  });
};

const requestSubAttendData = async (id) => {
  return $.ajax({
    url: `http://3.34.197.145:3002/api/people/getSubAttendData/${id}`,
    type: "GET",
    dataType: "json"
  });
};

/**
 * Find specific people by id
 * @param {number} id
 */
const requestPeopleDataByID = async (id) => {
  const data = await requestPeopleData();
  const result = data["result"].find((people) => people.id === id);
  return result;
};

/**
 * @param {string} searchName
 * @returns parameter
 */
export const getParameter = (searchName) => {
  let params = window.location.search.substr(location.search.indexOf("?") + 1);
  params = params.split("&");

  for (let i = 0; i < params.length; i++) {
    let temp = params[i].split("=");
    if ([temp[0]] == searchName) return temp[1];
  }

  return undefined;
};

const showOnPage = (mainAttendData, subAttendData, peopleData) => {
  // For deploy on server, remove this method.
  console.log(
    "Main =>",
    mainAttendData,
    "Sub =>",
    subAttendData,
    "People Data =>",
    peopleData
  );
  const partyObj = {
    더불어민주당: "#00A0E2",
    국민의힘: "#E61E2B",
    정의당: "#FFCC00",
    국민의당: "#EA5504",
    열린민주당: " #003E9B",
    기본소득당: "#82C8B4",
    시대전환: "#5A147E",
    무소속: "#d2d2d2"
  };

  const { name, party, local, count, committee, id } = peopleData;
  // FIXME: 중복되는 코드 정리할 방법을 생각해 볼 것!
  const nameParagraph = `${name} (${party}) / ${local}`;
  const nameElement = document.getElementById("name");
  nameElement.innerHTML = nameParagraph;

  const peopleParagraph = `${count} 의원이며, ${committee}에서 법안을 심사하고 있습니다.`;
  const peopleParagraphElement = document.getElementById("peopleParagraph");
  const backgroundCircle = document.getElementById("backgroundCircle");
  backgroundCircle.setAttribute(
    "style",
    `background-color:${partyObj[party]};`
  );
  
  if (id === 497) {
    document.getElementById("circleImg").src = `./img/img300/${"이수진1"}.png`;
  } else if (id === 498) {
    document.getElementById("circleImg").src = `./img/img300/${"이수진2"}.png`;
  } else if (id === 335) {
    document.getElementById("circleImg").src = `./img/img300/${"김병욱1"}.png`;
  } else if (id === 336) {
    document.getElementById("circleImg").src = `./img/img300/${"김병욱2"}.png`;
  } else {
    document.getElementById("circleImg").src = `./img/img300/${name}.png`;
  }
  peopleParagraphElement.innerHTML = peopleParagraph;

  const { main_attend, main_notAttend, main_work, main_home } = mainAttendData;
  const { sub_attend, sub_notAttend, sub_worl, sub_home } = subAttendData;
  const mainAttendRate = peopleData["main-attend-rate"];
  const subAttendRate = peopleData["sub-attend-rate"];
  console.log(mainAttendRate, subAttendRate);

  window.mainAttendRate = mainAttendRate;
  window.subAttendRate = subAttendRate;

  return { mainAttendRate, subAttendRate };
};

// Loading bar
// FIXME: setInterval 을 아래 dataView 함수에 있는 loading 변수를 이용하도록
const onReady = (callback) => {
  let intervalID;
  const checkReady = () => {
    if (document.getElementsByTagName("body")[0] !== undefined) {
      window.clearInterval(intervalID);
      callback.call(this);
    }
  };
  intervalID = window.setInterval(checkReady, 3000);
};

const show = (id, value) => {
  try {
    document.getElementById(id).style.display = value ? "block" : "none";
  } catch (error) {
    return;
  }
};

onReady(() => {
  show("mainpage", true);
  show("loading", false);
});

// FIXME: 에러 핸들링 생각해 볼 것!
const dataView = async () => {
  let loading = false; // handle loading bar..
  const id = Number(getParameter("id"));
  let mainAttendData,
    subAttendData,
    peopleData = undefined;

  await requestMainAttendData(id)
    .then((res) => {
      mainAttendData = res;
    })
    .catch((err) => {
      console.error(err);
    });

  await requestSubAttendData(id)
    .then((res) => {
      subAttendData = res;
    })
    .catch((err) => {
      console.error(err);
    });

  await requestPeopleDataByID(id)
    .then((res) => {
      peopleData = res;
    })
    .catch((err) => {
      console.error(err);
    });

  if (mainAttendData && subAttendData && peopleData) {
    const rate = showOnPage(mainAttendData, subAttendData, peopleData);
    return rate;
  }
};

window.dataView = dataView;

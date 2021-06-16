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

const getTeamLawData = async (peopleName) => {
  return $.ajax({
    url: `http://3.34.197.145:3002/api/law/team/${peopleName}`,
    type: "GET",
    dataType: "json",
  });
};

export const getLeadLawData = async (peopleName) => {
  return $.ajax({
    url: `http://3.34.197.145:3002/api/law/lead/${peopleName}`,
    type: "GET",
    dataType: "json",
  });
};

const getScore = async (peopleID) => {
  return $.ajax({
    url: `http://3.34.197.145:3002/api/people/grade/${peopleID}`,
    type: "GET",
    dataType: "json",
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

/**
 *
 * @param {*} billCount
 * @param {*} billRate
 */
const addVoteResultOnPage = (billCount, billRate, leadLawData) => {
  // const passCount = leadLawData.filter(obj => obj.generalResult == "원안가결").length;
  const div1 = document.getElementById("lawScore1");
  div1.innerHTML =
    `제출 법률안 수: ${billCount}개` +
    "<br />" +
    `300명 의원 중 ${undefined}등을 기록했어요.`;

  const div2 = document.getElementById("lawScore2");
  div2.innerHTML =
    `통과는 얼마나? : ${getPassMessage(billCount, billRate)}` +
    "<br />" +
    `제출한 법률안 ${billCount}개 중, ${billRate}개만 통과되었어요.`;
};

const getAttendMessage = (rate) => {
  let message = undefined;
  const percent = rate * 100;
  console.log(percent);
  if (percent == 100) {
    message = "그대는 진정한 성실맨!";
  } else if (90 <= percent < 100) {
    message = "그래도 기본은 하셨습니다";
  } else if (60 <= percent < 90) {
    message = "여의도에서 의원님을 애타게 찾고있습니다";
  } else {
    message = "의원님 얼굴까먹기 일보직전";
  }

  return message;
};

const getPassMessage = (total, passAmount) => {
  let message = undefined;
  const percent = (passAmount / total) * 100;
  if (percent == 100) {
    message = "내는 족족 통과시키는 그대는 가결왕!";
  } else if (60 <= percent < 100) {
    message = "그래도 평균은 하셨어요";
  } else {
    message = "의원님에게는 유독 높은 본회의의 벽";
  }

  return message;
};

/**
 *
 * @param {*} mainAttendResult
 * @param {*} subAttendResult
 */
const addAttendResultOnPage = (
  mainAttendResult,
  subAttendResult,
  mainRate,
  subRate
) => {
  let mainAttendTotal = 0,
    subAttendTotal = 0;

  let mainAttendCount = {},
    subAttendCount = {};
  for (const [name, value] of Object.entries(mainAttendResult)) {
    mainAttendCount[name] = value[0] == "" ? 0 : value.length;
    mainAttendTotal += value[0] == "" ? 0 : value.length;
  }
  for (const [name, value] of Object.entries(subAttendResult)) {
    if (name == "name") continue;
    subAttendCount[name] = value[0] == "" ? 0 : value.length;
    subAttendTotal += value[0] == "" ? 0 : value.length;
  }

  const div1 = document.getElementById("attendScore1");
  console.log(div1);
  
  div1.innerHTML =
    `상임위원회: ${getAttendMessage(subRate)}` +
    "<br />" +
    `${subAttendTotal}번의 회의 중, ${subAttendCount.attend}번 참석` +
    `/ ${subAttendCount.home}번 병가` +
    `/ ${subAttendCount.work}번 청가` +
    `/ ${subAttendCount.notAttend}번 결석했어요.`;
  
  const div2 = document.getElementById("attendScore2");
  div2.innerHTML =
    `본회의: ${getAttendMessage(mainRate)}` +
    "<br />" +
    `${mainAttendTotal}번의 회의 중, ${mainAttendCount.attend}번 참석` +
    `/ ${mainAttendCount.home}번 병가` +
    `/ ${mainAttendCount.work}번 청가` +
    `/ ${mainAttendCount.notAttend}번 결석했어요.`;
};

/**
 *
 * @param {*} mainAttendData
 * @param {*} subAttendData
 * @param {*} peopleData
 * @param {*} scoreData
 * @returns
 */
const showOnPage = (
  mainAttendData,
  subAttendData,
  peopleData,
  scoreData,
  leadLawData
) => {
  // For deploy on server, remove this method.
  console.log(
    "Main =>",
    mainAttendData,
    "Sub =>",
    subAttendData,
    "People Data =>",
    peopleData,
    "scoreData =>",
    scoreData
  );
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

  const mainAttendRate = peopleData["main-attend-rate"];
  const subAttendRate = peopleData["sub-attend-rate"];
  console.log(mainAttendRate, subAttendRate);
  document.getElementById("circleImg").src = `./img/img300/${name}.png`;
  peopleParagraphElement.innerHTML = peopleParagraph;

  const { sub, main, billCount, billRate } = scoreData;

  addVoteResultOnPage(billCount, billRate, leadLawData);
  addAttendResultOnPage(mainAttendData, subAttendData, main, sub);

  return { main, sub };
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
    peopleData,
    teamLawData,
    leadLawData,
    scoreData = undefined;

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
  /*
  await getTeamLawData(peopleData.name)
    .then((res) => {
      teamLawData = res;
    })
    .catch((err) => {
      console.error(err);
    });
  */
  await getLeadLawData(peopleData.name)
    .then((res) => {
      leadLawData = res;
    })
    .catch((err) => {
      console.error(err);
    });

  await getScore(peopleData.id)
    .then((res) => {
      scoreData = res;
    })
    .catch((err) => {
      console.error(err);
    });
  if (
    mainAttendData &&
    subAttendData &&
    peopleData &&
    scoreData &&
    leadLawData
  ) {
    const rate = showOnPage(
      mainAttendData,
      subAttendData,
      peopleData,
      scoreData,
      leadLawData
    );
    const name = peopleData.name;
    return { rate, name };
  }
};

window.dataView = dataView;

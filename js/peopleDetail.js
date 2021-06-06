import { requestPeopleData } from "./people.js";

const requestMainAttendData = async (id) => {
  return $.ajax({
    url: `http://3.34.197.145:3002/api/people/getMainAttendData/${id}`,
    type: "GET",
    dataType: "json",
  });
};

const requestSubAttendData = async (id) => {
  return $.ajax({
    url: `http://3.34.197.145:3002/api/people/getSubAttendData/${id}`,
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
const getParameter = (searchName) => {
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

  const { name, party, local, count, committee } = peopleData;
  // FIXME: 중복되는 코드 정리할 방법을 생각해 볼 것!
  const nameParagraph = `${name} (${party}) / ${local}`;
  const nameElement = document.getElementById("name");
  nameElement.innerHTML = nameParagraph;

  const peopleParagraph = `${count} 의원이며, ${committee}에서 법안을 심사하고 있습니다.`;
  const peopleParagraphElement = document.getElementById("peopleParagraph");
  peopleParagraphElement.innerHTML = peopleParagraph;

  const { main_attend, main_notAttend, main_work, main_home } = mainAttendData;
  const { sub_attend, sub_notAttend, sub_worl, sub_home } = subAttendData;
};

// FIXME: 에러 핸들링 생각해 볼 것!
window.onload = async () => {
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
    showOnPage(mainAttendData, subAttendData, peopleData);
  }
};

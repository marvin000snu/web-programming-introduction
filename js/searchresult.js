import { createVoteResultCanvas, colorSet, koreanStatusValue } from "./draw.js";
import { testLawData, testVoteResult } from "./testData.js";
import { getParameter } from "./peopleDetail.js";
import { getHashTag, getLawDataByID, requestLawData } from "./lawsearch.js";
import { requestPeopleData } from "./people.js";

// 제안한 사람들에서, 한줄에 표시할 개수
const ITEM_AMOUNT = 10;

const getVoteResultFromServer = async (billNumber) => {
  return $.ajax({
    url: `http://3.34.197.145:3002/api/law/vote/${billNumber}`,
    type: "GET",
    dataType: "json",
  });
};

/**
 * get current data from search result.
 * @param {string} keyword search keyword
 * @param {string} id data id
 * @returns current data
 */
const getCurrentData = async (keyword, id) => {
  const data = await getLawDataByID(id);
  return data;
};

/**
 * Generates an information paragraph.
 * @param {Array} infoList
 * @returns
 */
export const createInfoText = (infoList, div) => {
  // Modify this after presentation
  const text = ["누가?", "어디서?", "언제?", "한줄요약"];
  console.log(infoList);
  for (let i = 0; i < infoList.length; i++) {
    const element = document.createElement("p");
    element.setAttribute("class", `info`);

    // create people list.
    // example: 박상혁의원 외 12인
    if (i == 0) {
      element.innerHTML = infoList[0];
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

  const summaryElement = document.getElementById("summary");
  summaryElement.innerHTML = infoList[3];

  return;
};

/**
 * 수정예정.
 * @param {string} status
 */
const createStatus = (peopleName, whoCreate, proposeDate, procStageCd) => {
  const peopleImgElement = document.getElementById("personImage");
  const whoCreateElement = document.getElementById("whoCreate");
  const proposeDateElement = document.getElementById("proposeDate");
  const statusElement = document.getElementById("statusmessage");

  peopleImgElement.setAttribute("src", `../img/img300/${peopleName}.png`);
  whoCreateElement.innerHTML = whoCreate;
  proposeDateElement.innerHTML = proposeDate + "제안";
  statusElement.innerHTML = procStageCd;

  return;
};

/**
 * Calculate how many days have passed since the proposal.
 * @param {string} date
 */
const calculateSuggestedDate = (date) => {
  let today = new Date();

  // Ex) 2021 - 04 - 25 => 2021 04 25
  let suggestedDate = date.replace(/- /g, "");
  suggestedDate = new Date(suggestedDate);

  const gap = today - suggestedDate;
  const day = 1000 * 60 * 60 * 24;
  const passedDay = parseInt(gap / day);

  const dateParagraph = document.getElementById("date");
  dateParagraph.innerHTML = `제안 후 ${passedDay}일 째`;
};

/**
 * Visualize and show the proposed people.
 */
const createProposedPeopleGraphic = async (peopleList) => {
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
  let peopleData = {};

  await requestPeopleData().then((res) => {
    peopleList.forEach((e) => {
      peopleData[e] = res["result"].find((d) => d.name == e);
    });
  });

  const div = document.getElementById("proposedPeopleView");
  const table = document.createElement("table");
  const tableBody = document.createElement("tbody");

  // create table row
  let row = document.createElement("tr");
  let count = 0;

  for (const [name, value] of Object.entries(peopleData)) {
    const cell = document.createElement("td");
    // Set class attribute for css layout.
    cell.setAttribute("class", "tooltipContainer");
    cell.setAttribute("id", "proposedPeopleGraphic");
    try {
      const { party, id } = value;
      // Create tooltip
      const toolTip = document.createElement("span");
      toolTip.setAttribute("class", "tooltiptext");
      toolTip.innerHTML = name;
      cell.appendChild(toolTip);

      // Apply colors according to the party
      cell.setAttribute("style", `background-color:${partyObj[party]}`);
      cell.style.cursor = "pointer";
      cell.addEventListener("click", () => {
        location.href = `./peopleDetail.html?id=${id}`;
      });
      row.appendChild(cell);
      count += 1;

      if (count % ITEM_AMOUNT == 0) {
        tableBody.appendChild(row);
        row = document.createElement("tr");
      }
    } catch (err) {
      console.error(err);
    }
  }

  tableBody.appendChild(row);

  table.appendChild(tableBody);
  div.appendChild(table);
};

const addVoteResultMessage = (generalResult, passGubn) => {
  let message = undefined;
  if (passGubn == "계류의안") {
    message = "아직 투표를 하지 않았어요";
  } else {
    switch (generalResult) {
      case "원안가결":
        message = "원안 그대로 통과되었습니다";
        break;
      case "수정가결":
        message = "수정해서 통과되었습니다";
        break;
      case "철회":
        message = "앗, 의원님이 철회한 법률안입니다";
        break;
      case "대안반영폐기":
        message = "기존 제안은 폐기, 대신 위원회가 대안을 마련했어요";
        break;
      case "폐기된 법률안입니다":
        message = "폐기된 법률안입니다";
        break;
      case "부결":
        message = "삐빅, 통과되지 못했습니다";
        break;
      default:
        break;
    }
  }
  if (message) {
    const div = document.getElementById("voteResultMessage");
    div.innerHTML = `투표 결과: ${message}`;
  }
  return;
};

const createVotingResult = (voteResult) => {
  const div = document.getElementById("votingResultView");
  let start = 1;
  let end = 0;

  for (let voteStatus in voteResult) {
    end += voteResult[voteStatus];
    const canvasContainer = document.createElement("div");
    const currentColor = colorSet[voteStatus];
    canvasContainer.setAttribute("id", "canvasContainer");
    const canvas = createVoteResultCanvas(start, end, currentColor);

    const paragraph = document.createElement("p");
    paragraph.setAttribute("id", "voteStatusText");
    paragraph.innerHTML = `${koreanStatusValue[voteStatus]} ${voteResult[voteStatus]}명`;

    canvasContainer.appendChild(canvas);
    canvasContainer.appendChild(paragraph);

    div.appendChild(canvasContainer);

    start += voteResult[voteStatus];
  }
};

const createTextParagraph = (textParagraph) => {
  const div = document.getElementById("paragraphView");
  const paragraphContainer = document.createElement("p");
  paragraphContainer.setAttribute("id", "paragraph");
  paragraphContainer.innerHTML = "<pre>" + textParagraph + "</pre>";
  div.appendChild(paragraphContainer);
};

/**
 * Render pages with multiple pieces of information.
 */
const generatePage = async () => {
  const id = getParameter("id");
  const keyword = decodeURI(getParameter("keyword"));
  const lawData = await getCurrentData(keyword, id);
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
  } = lawData;
  const hashtag = await getHashTag(billId);

  console.log(lawData);
  console.log(team.split(",").length);
  const teamList = team.split(",");
  const whoCreate = `${lead}의원 외 ${teamList.length}인`;
  const infoList = [whoCreate, "where", proposeDt, hashtag['hash-tag']];
  const titleElement = document.getElementById("title");
  titleElement.innerHTML = billName;
  const div = document.getElementById("infoBox");

  createInfoText(infoList, div);
  createStatus(lead, whoCreate, proposeDt, procStageCd);
  createProposedPeopleGraphic(team.split(","));
  calculateSuggestedDate(proposeDt);

  // TEST

  if (agree !== "") {
    let vote = {};
    const voteResult = await getVoteResultFromServer(billNo);
    for (const [name, value] of Object.entries(voteResult)) {
      vote[name] = value.length
    }
    console.log(vote);
    createVotingResult(vote);
  }
  addVoteResultMessage(generalResult, passGubn);
  createTextParagraph(summary);
};

window.onload = () => {
  generatePage();
};

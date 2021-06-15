import { createVoteResultCanvas, colorSet, koreanStatusValue } from "./draw.js";
import { testLawData, testVoteResult } from "./testData.js";
import { getParameter } from "./peopleDetail.js";
import { requestLawData } from "./lawsearch.js";

/**
 * get current data from search result.
 * @param {*} keyword search keyword
 * @param {*} id data id
 * @returns current data
 */
const getCurrentData = async (keyword, id) => {
  const data = await requestLawData(keyword = keyword == 'all' ? undefined : keyword);
  return data.find(d => d.billId == id);
};

/**
 * Generates an information paragraph.
 * @param {Array} infoList
 * @returns
 */
export const createInfoText = (infoList, div) => {
  // Modify this after presentation
  const text = ["누가?", "어디서?", "언제?", "한줄요약"];
  console.log(infoList)
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
const createStatus = (proposeDate) => {
  const proposeDateElement = document.getElementById("proposeDate");
  proposeDateElement.innerHTML = proposeDate + "제안";
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
const createProposedPeopleGraphic = (peopleList) => {
  console.log(peopleList);
  const div = document.getElementById("proposedPeopleView");
  const table = document.createElement("table");
  const tableBody = document.createElement("tbody");
  const amount = peopleList.length;

  // create table row
  const row = document.createElement("tr");

  for (let i = 0; i < amount; i++) {
    const cell = document.createElement("td");
    // Set class attribute for css layout.
    cell.setAttribute("class", "tooltipContainer");
    cell.setAttribute("id", "proposedPeopleGraphic");

    const party = peopleList[i]["party"];
    const name = peopleList[i]["name"];

    // Create tooltip
    const toolTip = document.createElement("span");
    toolTip.setAttribute("class", "tooltiptext");
    toolTip.innerHTML = name;
    cell.appendChild(toolTip);

    // Apply colors according to the party
    if (party == "더불어민주당") {
      cell.setAttribute("style", "background: #219edb;");
    } else {
      cell.setAttribute("style", "background: #ffb74d;");
    }
    row.appendChild(cell);
  }

  tableBody.appendChild(row);

  table.appendChild(tableBody);
  div.appendChild(table);
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

  console.log(lawData);
  console.log(team.split(",").length);
  const teamList = team.split(",");
  const whoCreate = `${lead}의원 외 ${teamList.length}인`;
  const infoList = [whoCreate, 'where', proposeDt, summary];
  const titleElement = document.getElementById("title");
  titleElement.innerHTML = billName
  const div = document.getElementById("infoBox");

  createInfoText(infoList, div);
  createStatus(proposeDt);
  createProposedPeopleGraphic(team.split(","));
  calculateSuggestedDate(proposeDt);
  createVotingResult(testVoteResult);
  // createTextParagraph(text);
};

window.onload = () => {
  generatePage();
};

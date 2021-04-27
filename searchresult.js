import { createSimplePeopleList } from "./src/convert.js";
import {
  createVoteResultCanvas,
  colorSet,
  koreanStatusValue,
} from "./src/draw.js";
import { testLawData, testVoteResult } from "./testData.js";

/**
 * get current data from datalist.
 * @param {*} id
 * @returns current data
 */
const getCurrentData = (id) => {
  const currentData = testLawData[id];
  return currentData;
};

/**
 * Generates an information paragraph.
 * @param {Array} infoList
 * @returns
 */
export const createInfoText = (infoList, div) => {
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

/**
 * 수정예정.
 * @param {string} status
 */
const createStatus = (status) => {
  //const div = document.getElementById("statusbox");
  //const statusMessage = document.createElement("p");
  //statusMessage.setAttribute("id", "statusmessage");
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
const generatePage = () => {
  const temp = location.href.split("?");
  const idTemp = temp[1].split("=");
  const id = idTemp[1];
  const lawData = getCurrentData(id);

  const { title, whoCreate, where, when, summary, status, text } = lawData;
  const infoList = [whoCreate, where, when, summary];
  const titleElement = document.getElementById("title");
  titleElement.innerHTML = title;
  const div = document.getElementById("infoBox");

  createInfoText(infoList, div);
  createStatus(status);
  createProposedPeopleGraphic(whoCreate);
  calculateSuggestedDate(when);
  createVotingResult(testVoteResult);
  createTextParagraph(text);
};

window.onload = () => {
  generatePage();
};

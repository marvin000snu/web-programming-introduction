function moveToLawSearch() {
  window.location.href = "./lawsearch.html";
}

function moveToPeopleSearch() {
  window.location.href = "./people.html";
}

function moveToPeopleDetail() {
  window.location.href = "./peopleDetail.html";
}

function moveToHome() {
  window.location.href = "./index.html";
}

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

window.onload = function () {
  $.ajax({
    url: "http://3.34.197.145:3002/api/people/getAllPeople", // 클라이언트가 요청을 보낼 서버의 URL 주소
    type: "GET", // HTTP 요청 방식(GET, POST)
    dataType: "json", // 서버에서 보내줄 데이터의 타입
  }).done((res) => {
    console.log(res);

    const maxAmount = 12; // 한페이지에 보여줄 Maximum 갯수
    const peopleData = res["result"];

    const div = document.getElementById("cardBox");
    console.log(div);

    for (let i = 0; i < maxAmount; i++) {
      const currentData = peopleData[i];
      const peopleCard = createPeopleCard(currentData);
      div.appendChild(peopleCard);
    }
  });
};

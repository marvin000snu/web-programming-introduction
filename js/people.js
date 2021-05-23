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

window.onload = function () {
  $.ajax({
    url: "http://3.34.197.145:3002/api/people/getAllPeople", // 클라이언트가 요청을 보낼 서버의 URL 주소
    type: "GET", // HTTP 요청 방식(GET, POST)
    dataType: "json" // 서버에서 보내줄 데이터의 타입
  }).done((res) => {
    console.log(res);
  });
};

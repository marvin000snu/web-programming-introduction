function moveToLawSearch() {
  window.location.href = "./lawsearch.html";
}

function moveToHome() {
  window.location.href = "./index.html";
}

const moveToSearchResult = (id) => {
  window.location.href = "./searchresult.html?" + "id=" + id;
};

const moveToLawSearchResult = (keyword, id) => {
  console.log("====>", keyword);
  window.location.href = `./searchresult.html?keyword=${keyword}&id=${id}`;
}

const moveToSearchBoth = (keyword) => {
  window.location.href = `./searchboth.html?keyword=${keyword}`;
}

function moveToPeopleSearch() {
  window.location.href = "./people.html";
}

function moveToPeopleDetail() {
  window.location.href = "./peopleDetail.html";
}

function moveToAbout() {
  window.location.href = "./about.html";
}

const topFunction= ()=>{
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

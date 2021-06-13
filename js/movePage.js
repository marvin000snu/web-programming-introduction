function moveToLawSearch() {
  window.location.href = "./lawsearch.html";
}

function moveToHome() {
  window.location.href = "./index.html";
}

const moveToSearchResult = (id) => {
  window.location.href = "./searchresult.html?" + "id=" + id;
};

function moveToSearchBoth() {
  window.location.href = "./searchboth.html";
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

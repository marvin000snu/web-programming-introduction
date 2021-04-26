function moveToLawSearch() {
  window.location.href = "./lawsearch.html";
}

function moveToHome() {
  window.location.href = "./index.html";
}

const moveToSearchResult = (id) => {
  window.location.href = "./searchresult.html?" + "id=" + id;
};

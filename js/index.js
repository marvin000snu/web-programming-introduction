function searchHandler(key) {
  const value = document.getElementById("search").value;
  alert(value + " 를 검색합니다.");
  window.location.href = "./searchboth.html?search="+value;

}

function moveToHome() {
  window.location.href = "./index.html";
}

function moveToLawSearch() {
  window.location.href = "./lawsearch.html";
}

function moveToPeopleSearch() {
  window.location.href = "./people.html";
}

const TestTags = ["부동산 대책", "저출산", "코로나19", "선거법", ];

/**
 * Popular search item view.
 * ! Modify or remove this function after presentation.
 */
window.onload = () => {
  const tagitemPreview = () => {
    const div = document.getElementById("popularSearchItems");
    for (let i = 0; i < TestTags.length; i++) {
      const tag = document.createTextNode("#" + TestTags[i]);
      const tagElement = document.createElement("a");

      tagElement.setAttribute("class", "tag");
      tagElement.appendChild(tag);
      tagElement.href = "#";

      div.appendChild(tagElement);
    }
  };

  tagitemPreview();
};



function searchHandler() {
  const value = document.getElementById("search").value;
  alert(value + " 를 검색합니다.");
  window.open(
    "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=" +
      value,
    "_blank"
  );
}

const TestTags = ["동물보호법", "좋은어른법", "국민연금", "전월세신고제", "육아휴직"];

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

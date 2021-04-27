function searchHandler() {
  const value = document.getElementById("search").value;
  alert(value + " 를 검색합니다.");
  window.open(
    "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=" +
      value,
    "_blank"
  );
}

const TestTags = ["안녕하세요", "여기에", "키워드", "넣어주세용", "하하하"];

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

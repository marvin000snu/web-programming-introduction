function searchHandler(key) {
  const value = document.getElementById("search").value;
  window.location.href = "./searchboth.html?search=" + value;
}

function entersearch() {
  if (search.keycode == 13) {
    searchInput();
  }
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

const TestTags = ["부동산 대책", "저출산", "코로나19", "선거법"];

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
      tagElement.style.fontSize = "18px";
      tagElement.style.marginLeft = "18px";
      tagElement.style.textDecoration = "none";
      tagElement.style.marginLeft = "25px";
      tagElement.style.color = "#01b0b4";
      tagElement.appendChild(tag);
      tagElement.href = "#";

      div.appendChild(tagElement);
    }
  };
  // 브라우저 인포 받아오는 부분
  navigator.sayswho = (function () {
    var ua = navigator.userAgent,
      tem,
      M =
        ua.match(
          /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
        ) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return "IE " + (tem[1] || "");
    }
    if (M[1] === "Chrome") {
      tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
      if (tem != null) return tem.slice(1).join(" ").replace("OPR", "Opera");
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    console.log(M);
    return M[0]
    
  })();
  if(navigator.sayswho!="Chrome"){
    alert("POLISEE는 크롬 브라우저에 최적화 되어있습니다! \n"+navigator.sayswho+" 에서는 화면이 정상적으로 표시되지 않을 수 있습니다.")
  }
  tagitemPreview();
};

function searchHandler(){
    const value = document.getElementById("search").value
    alert(value + " 를 검색합니다.")
    window.open("https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query="+value,"_blank")
}

function moveToLawSearch(){
    window.location.href ="./lawsearch.html"
}
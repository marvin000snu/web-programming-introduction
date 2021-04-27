import { createInfoText } from "./searchresult.js";
import { testLawData } from "./testData.js";

var $searchInputClick = _$('.search_input').find('a');

$searchInputClick.on('click', searchText );

var _$searchInput = _$('.search_input').find('input');

_$searchInput.keyup(function(e){

if(e.keyCode == 13) {      
          searchText( );
     }
});



function searchText( $e ){
     var thisText = $('aside .menu_box .search .search_input input').val();  

   if( thisText == '' ){
           $('aside .menu_box .search .search_input input').val('').blur();
           alert('검색어가 없습니다.');
      } else {
            window.location.href = (이동시킬도메인 + "/search/search_list.asp?q=" + encodeURIComponent(thisText));                                                                //이동시킬 페이지                     //encodeURIComponent로 변환하여 넘기기 

      }

}

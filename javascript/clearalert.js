function sayCongratulations(){
    swal({
        icon: "success",
        title: "축하합니다!",
        text: "금메달을 따셨군요!",
        button: "보러가기",
}).then(() => {
    count();
    mainpage.classList.add(HIDDEN_CLASS);
    resultpage.classList.remove(HIDDEN_CLASS);
    exitMedalButton.classList.add(HIDDEN_CLASS);
    goldButton.classList.add(HIDDEN_CLASS);
});
    
}

//medalCard 만들기
function cardForGold(title, num){
    // range 정보 불러오기 --> by categories
    let savedCategories = JSON.parse(localStorage.getItem("categories"));
    console.log(savedCategories);
    function getRangebyCategory(savedCategories, text) {
        var ret = savedCategories.filter(function (item) {
            return item.text === text;
        });
        return ret[0];
    }
    savedCategories = getRangebyCategory(savedCategories, title);
    // 알림창 출동과 페이지 넘김
    if(num == parseInt(savedCategories.range)){
            sayCongratulations();
        }
}

function countForGold() {
    var resultCategories = JSON.parse(localStorage.getItem("clears"));
    let hashMap = {}
    // 본격 progressBar 만들기
    for(var resultCategory of resultCategories){
        //if that role exists
        if(resultCategory.category in hashMap ){
        //up the prev count
        hashMap[resultCategory.category] = hashMap[resultCategory.category] + 1; 
        }else{
         hashMap[resultCategory.category] = 1;
        }
      }
    console.log(hashMap);
    let outputArray = []
    Object.keys(hashMap).forEach(key => {
      outputArray.push({key , count: hashMap[key]});
      cardForGold(key, hashMap[key]); // 함수 잘 실행
})
    console.log(outputArray); // 잘 나오는지 확인
}
const okeys = document.querySelectorAll(".ok");
var myfunction = countForGold();
// if(okeys){
// for (var i = 0; i < okeys.length; i++) {
//     okeys[i].addEventListener('click', myfunction);
// }
// }

if(okeys){
    okeys.forEach(el => el.addEventListener('click', myfunction));
}
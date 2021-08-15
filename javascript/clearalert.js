function sayCongratulations(){
    swal({
        icon: "success",
        title: "축하합니다!",
        text: "금메달을 따셨군요!",
        button: "보러가기",
}).then(() => {
    count();
    categoryPage.classList.add(HIDDEN_CLASS); // 카테고리 페이지에서 바로 이동할 경우 대비
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
    function getRangebyCategory(savedCategories, text) {
        var ret = savedCategories.filter(function (item) {
            return item.text === text;
        });
        return ret[0];
    }
    savedCategories = getRangebyCategory(savedCategories, title);
    // 알림창 출동과 페이지 넘김
    if(num >= parseInt(savedCategories.range)){
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
    let outputArray = []
    Object.keys(hashMap).forEach(key => {
      outputArray.push({key , count: hashMap[key]});
      cardForGold(key, hashMap[key]); // 함수 잘 실행
})
}
const okeys = document.querySelectorAll(".ok");
var myfunction = countForGold();
if(okeys){
    okeys.forEach(el => el.addEventListener('click', myfunction));
}
document.querySelector("#return-button").addEventListener("click", countForGold); // 목표일수 변경하고 바로 실행될 수도 있으니까..
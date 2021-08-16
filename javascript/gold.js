// key = goldMedals
const savedGoldMedals = localStorage.getItem("goldMedals");
const getGoldMedals = JSON.parse(savedGoldMedals);
// 저장된 gold를 새로고침해도 없어지지 않게 만들기
if(savedGoldMedals){
    goldMedals = getGoldMedals; // 새로고침 전 localStorage에 기록된 것들도 지워지지 않고 포함되게 하려고
}
// array 중 {} 하나랑만 관계있는 함수
const awardPage = document.querySelector("#award-page");
const pastAward = document.querySelector("#past-award");
const nowAward = document.querySelector("#now-award");
function makeAward(name, pastAward, getGoldMedals){
    // getGoldMedals = getGoldMedals.reverse();
    const monthlyGold = document.createElement("div");
    monthlyGold.className = name;
    monthlyGold.classList.add(MUST_ANIMATION);
    monthlyGold.classList.add(THIRD_ANIMATION);
    pastAward.appendChild(monthlyGold);
    //년도와 월
    const yearMonth= document.createElement("div");
    yearMonth.className = "year-month";
    monthlyGold.appendChild(yearMonth);
    // 메달 박스
    const goldBox = document.createElement("div");
    goldBox.className = "gold-box";
    monthlyGold.appendChild(goldBox);
    //들어가는 내용들
    // 날짜
    if(getGoldMedals.year){
        yearMonth.innerText = `${getGoldMedals.year}\n${getGoldMedals.month}/${getGoldMedals.date}`;
        // 색깔 편하게 넣기 위해 month 숫자로 변경하고, 순서대로 색지정
        const colorNumber = parseInt(getGoldMedals.month)-1;
        const colors = ["#7F7F7F","#F78D7C","#FFB37A","#D2C6C1","#2F5597","#BF9000","#A7A7A7","#FFA602","#4472C4","#D9D9D9","#F8C800","#B9AAA0"];
        yearMonth.style = `background-color:${colors[colorNumber]}`;
    }
    //이미지
    if(pastAward == nowAward){
        if(getGoldMedals.medal){
            const goldImg = document.createElement("img");
            goldBox.appendChild(goldImg); 
            goldImg.src = `img/${getGoldMedals.medal}.png`;
        }
    }
    //카테고리
    const goldCategory = document.createElement("div");
    goldCategory.className = "gold-category";
    goldBox.appendChild(goldCategory);
    goldCategory.innerText = getGoldMedals.category;

    // 관련 카테고리 누르면 지금까지 뭐 했는지 보여주기
    const popupPage = document.querySelector("#popup-page");
    const fillTitle = document.querySelector("#fill-title");
    const detail = document.querySelector("#detail");
    const quit = document.querySelector(".quit");
    function whatIDid(a){
        a.forEach((element) => {
            if(element.category == getGoldMedals.category){
                popupPage.classList.remove(HIDDEN_CLASS);
                awardPage.classList.add(HIDDEN_CLASS);
                const didIt = document.createElement("li");
                detail.appendChild(didIt);
                didIt.classList.add(MUST_ANIMATION);
                didIt.classList.add(THIRD_ANIMATION);
                const didDay = document.createElement("span");
                didIt.appendChild(didDay);
                didDay.innerText = `${element.finishYear}\n${element.finishDay}`;
                didDay.className = "did-day";
                const didList = document.createElement("span");
                didIt.appendChild(didList);
                didList.className = "did-list";
                didList.innerText = element.text;
                fillTitle.innerText = getGoldMedals.category; // 큰제목 
            }
        });
    }
    goldBox.addEventListener("click",function(){
        if(yearMonth.innerText == ""){
            whatIDid(JSON.parse(localStorage.getItem("clears")));
        }else{
            whatIDid(JSON.parse(localStorage.getItem("lefts")));
        }
    })
    quit.addEventListener("click",function(){
        detail.innerHTML ="";
        popupPage.classList.add(HIDDEN_CLASS);
        awardPage.classList.remove(HIDDEN_CLASS);
    })
}
// 명예의 전당 버튼 createElement 삭제
function eraseAward(){
    awardPage.classList.remove(HIDDEN_CLASS); // 명예의 전당 보여주기
    resultpage.classList.add(HIDDEN_CLASS); // 결과창 지워주기
    nowAward.innerHTML = '';
    pastAward.innerHTML = ''; 
}
// JSON.parse(localStorage.getItem("medals"))한 이유는, 그냥 밖에다가 쓰면 업로드 되지 않은 key를 자꾸 가져와서!
goldButton.addEventListener("click", async function(){
    await eraseAward();
    if(getGoldMedals && JSON.parse(localStorage.getItem("medals"))){
    getGoldMedals.reverse().forEach((element) => {
        makeAward("monthly-gold", pastAward, element);
    }); // 금메달은 신규 순서대로 배열 / array 속 모든 item에 대하여 함수 실행
    JSON.parse(localStorage.getItem("medals")).forEach((element) => {
        makeAward("monthly-gold", nowAward, element);
    });

    }else if(JSON.parse(localStorage.getItem("medals"))){
        JSON.parse(localStorage.getItem("medals")).forEach((element) => {
            makeAward("monthly-gold", nowAward, element);
        });
    
    }else{
        getGoldMedals.reverse().forEach((element) => {
            makeAward("monthly-gold", pastAward, element);
        }); // array 속 모든 item에 대하여 함수 실행
    }
})
const exitAwardButton = document.querySelector("#exit-award"); // 결과페이지로 이동
exitAwardButton.addEventListener("click",function(){
    awardPage.classList.add(HIDDEN_CLASS);
    resultpage.classList.remove(HIDDEN_CLASS);
})


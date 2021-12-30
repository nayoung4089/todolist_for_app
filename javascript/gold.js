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
    monthlyGold.classList.add("did-li-list");
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
    // 빠른날짜 순서로 css 정렬
    monthlyGold.style.order = -parseInt(`${getGoldMedals.year}${getGoldMedals.month}${getGoldMedals.date}`);
    //들어가는 내용들
    // 날짜
    if(getGoldMedals.year){
        yearMonth.innerText = `${getGoldMedals.year}\n${getGoldMedals.month}/${getGoldMedals.date}`;
        // 색깔 편하게 넣기 위해 month 숫자로 변경하고, 순서대로 색지정
        const colorNumber = parseInt(getGoldMedals.month)-1;
        const colors = ["#FFADAD","#DF5E5E","#FF8243","#FFA602","#6ECB63","#548CFF","#B85C38","#C68B59","#9D9D9D","#B983FF","#7868E6","#F2789F"];
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
    const fillBottom = document.querySelector("#fill-bottom");
    const fillDate = document.querySelector(".fill-date");
    const detail = document.querySelector("#detail");
    const quit = document.querySelector(".quit");
    function whatIDid(a,b){
        a.forEach((element) => {
            if(element.category == getGoldMedals.category){
                popupPage.classList.remove(HIDDEN_CLASS);
                awardPage.classList.add(HIDDEN_CLASS);
                const didIt = document.createElement("li");
                detail.appendChild(didIt);
                didIt.classList.add("finished-li-list");
                didIt.classList.add(MUST_ANIMATION);
                didIt.classList.add(THIRD_ANIMATION);               
                if(element.finishFullDate){
                    didIt.style.order = -parseInt(element.finishFullDate.replaceAll("-",""));
                }else{didIt.style.order = -parseInt(`${element.finishYear}${element.finishDay.replace("/","")}`);}
                const didDay = document.createElement("span");
                didIt.appendChild(didDay);
                didDay.innerText = `${element.finishYear}\n${element.finishDay}`;
                didDay.className = "did-day";
                const didList = document.createElement("span");
                didIt.appendChild(didList);
                didList.className = "did-list";
                didList.innerText = element.text;
                fillDate.innerText = `${getGoldMedals.year}/${getGoldMedals.month}/${getGoldMedals.date}`; // 큰제목 날짜
                // ing중인 친구들한테 undefined 글자 안나오게..
                if(fillDate.innerText == "undefined/undefined/undefined"){
                    fillBottom.classList.add(HIDDEN_CLASS);
                }else{
                    fillBottom.classList.remove(HIDDEN_CLASS);
                }
                if(getGoldMedals.id){
                    fillDate.id = getGoldMedals.id;
                }
                fillTitle.innerText = getGoldMedals.category; // 큰제목 카테고리
                // 수정페이지
                let elementCategory = element.category;
                if(element.id){
                    didIt.id = element.id;
                    didIt.addEventListener("click",function(){
                        bg.classList.remove(HIDDEN_CLASS);
                        // changeClearPage.classList.remove(HIDDEN_CLASS);
                        popupReward();
                        const changeClearForm = document.querySelector("#change-clear-form");
                        const changeClearDate = document.querySelector("#change-clear-date");
                        const chnageClearDo = document.querySelector("#change-clear-do");
                        changeClearDate.defaultValue = element.finishFullDate;
                        chnageClearDo.defaultValue = element.text;
                        if (b == 0){
                            changeFunction(changeClearForm, didIt, elementCategory, didDay,didList, 2);
                        }else{
                            changeFunction(changeClearForm, didIt, elementCategory, didDay,didList, 3);
                        }
                    })
                };  
                // 세부사항 페이지 날짜 누르면 수정창 뜨게
                const newGoldCategory = getGoldMedals.category;
                fillBottom.addEventListener("click",function(){
                    if(fillDate.id){
                        changeGoldPage.classList.remove(HIDDEN_CLASS);
                        bg.classList.remove(HIDDEN_CLASS);
                        document.querySelector("#get-goldname").innerText = newGoldCategory;
                        changeFinDate.defaultValue = getGoldMedals.date;
                        changeFunction(changeGoldForm, fillDate, newGoldCategory, 0,0, 4);
                    }else{
                        fillDate.id = Date.now();
                        getGoldMedals.id = Date.now();
                    }
                })              
            }
        });
    }

    monthlyGold.addEventListener("click",function(){
        if(yearMonth.innerText == ""){
            whatIDid(JSON.parse(localStorage.getItem("clears")).reverse(),0);
        }else{
            whatIDid(JSON.parse(localStorage.getItem("lefts")).reverse(),1);
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
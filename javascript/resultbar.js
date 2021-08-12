const resultpage = document.querySelector("#result-page");
const resultBox = document.querySelector("#result-box");
const medalButton = document.querySelector("#medal-button");
const exitMedalButton = document.querySelector("#exit");
const goldButton = document.querySelector("#go-to-medal");

// console.log(resultCategory[4].category);
// console.log(savedFinishTodos.length); // 안되는 이유가 얘는 지금 글자 하나하나가 다른 객체로 저장된 상태라서!
let rangegoals = [];
function rangeItems(){
    localStorage.setItem("rangegoals",JSON.stringify(rangegoals));
}

// 메달 정보 localStorage 저장
let medals = [];
function medalItems(){
    localStorage.setItem("medals",JSON.stringify(medals));
}

// 금메달 localStorage 저장
let goldMedals = [];
function goldMedalItems(){
    localStorage.setItem("goldMedals",JSON.stringify(goldMedals));
}

//medalCard 만들기
function makeCard(title, num){
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
    // 할때 innerText와 비교하니까 절대! 꾸민답시고 category에 뭐 써주지 말기 굳이 하려면 key=categories도 바꿔주자

    
    // 새롭게 생성될 Card 만들기
    const totalCard = document.createElement("div");
    totalCard.className = "total-card";
    const flex = document.createElement("div");
    flex.className = "flex";

    const textBox = document.createElement("div");
    flex.appendChild(textBox);
    textBox.className = "text-box";
    const h3 = document.createElement("h2");
    h3.innerText = title; // 타이들명 = 카테고리명
    textBox.appendChild(h3);

    const pPercent = document.createElement("div");
    pPercent.className = "per";
    textBox.appendChild(pPercent);

    const newCard = document.createElement("div");
    newCard.className = "card";
    const newProgress = document.createElement("div");
    newProgress.className="progress";
    const p = document.createElement("div");
    p.className = "percentage";
    p.innerText = "달성";

    resultBox.appendChild(totalCard);
    totalCard.appendChild(flex);
    totalCard.appendChild(newCard);
    
    newCard.appendChild(newProgress);
    newCard.appendChild(p);

    // 메달 시상식을 위한 child
    const medalImg = document.createElement("img");
    flex.appendChild(medalImg); // body에 child로 넣는다는 말! 
    
    // range값 필요한 애들만 밑에 따로.
    const percentage = Math.round(num/savedCategories.range*100); // 퍼센트 만들기
    newProgress.style = `width:${percentage}%`;
    pPercent.innerText = `${num}/${savedCategories.range}`;

    function giveMedal(medalnum){
        if(percentage<=30){
            //그냥
            medalImg.src = "img/4.png"; // <img src = "img/2.jpg"> 이런 식으로 생성됨
            medalnum = 4;
        }else if(percentage>30 && percentage<=65){
            //동메달
            medalImg.src = "img/3.png";
            medalnum = 3;
        }else if(percentage>65 && percentage<100){
            //은메달
            medalImg.src = "img/2.png";
            medalnum = 2;
        }else{
            //금메달
            medalImg.src = "img/1.png";
            medalnum = 1;
            // 금메달은 따로 저장

            // 게이지 꽉차면 newprogress = 반짝반짝 + 버튼으로 변화
            h3.innerText = "클릭해주세요!";
            totalCard.classList.add(MUST_ANIMATION);
            totalCard.classList.add(MAIN_ANIMATION);

            // newprogress 누르면 모든 것이 지워짐
            function getGold(){
                // 명예의 전당 구경하라는 알림창
                swal({
                    icon: "success",
                    title: "성공적으로 저장되었습니다",
                    text: "명예의 전당을 구경해보세요!",
                    button: "확인"
                  });
                // 지운 버튼 원상복귀
                exitMedalButton.classList.remove(HIDDEN_CLASS);
                goldButton.classList.remove(HIDDEN_CLASS);
                
                totalCard.innerHTML = '';
                clears = clears.filter((clear) =>clear.category !== title); //localStorage에 지워진 건 저장되지 못하게
                finishItems(); // 원래 저장하는 localStorage 함수에 업데이트

                // 클릭했을 때 시간 저장하려고 일부러 여기다가 둠
                const clickDay = new Date();
                const goldMedalObj = {
                    year: clickDay.getFullYear(),
                    month:String(clickDay.getMonth() +1).padStart(2,"0"),
                    category: title,
                    medal: 1,
                }
                goldMedals.push(goldMedalObj);
                goldMedalItems(); // 저장해주는 거 잊지말기!
            }
            totalCard.addEventListener("click",getGold);
            // localStorage 소멸 
        }
        const newMedalObj= {
            category: title,
            medal: medalnum,
        };
        medals.push(newMedalObj);
        medalItems(); // 저장해주는 거 잊지말기!
    }
    giveMedal();
}

function eraseEverything(){
    resultBox.innerHTML = '';
}

async function count() {
    await eraseEverything(); // 기존에 써졌던 것들은 싹 지우고 다시! 이거 하고 밑에거 실행하라고 await 사용함

    // 본격 progressBar 만들기
    const resultCategories = JSON.parse(localStorage.getItem("clears"));
    let hashMap = {}

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
      makeCard(key, hashMap[key]); // 새롭게 만들어진 정보 Bar에 넣기
})
    console.log(outputArray); // 잘 나오는지 확인
}
medalButton.addEventListener("click", function(){
    mainpage.classList.add(HIDDEN_CLASS);
    resultpage.classList.remove(HIDDEN_CLASS);
    if(JSON.parse(localStorage.getItem("categories"))){
        count();
    }
});


// 메인 페이지로 이동
function exitResultPage(){
    mainpage.classList.remove(HIDDEN_CLASS);
    resultpage.classList.add(HIDDEN_CLASS);
    medals = [];
    // localStorage.removeItem("medals"); // 그냥 나가기 누르면 자꾸 key=medals값이 쌓임ㅠㅠ
}
exitMedalButton.addEventListener("click",exitResultPage);



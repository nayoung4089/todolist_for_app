// 메인페이지 카테고리 변경 누르면 페이지 변경 --> 리스트 보여줌
const categoryForm = document.querySelector("#category-form");
const categoryInput = document.querySelector("#my-category");
const categoryUl = document.querySelector("#categorylist");
// rangeBar
const myRange = document.getElementById("myRange");
const output = document.getElementById("value");
output.innerHTML = myRange.value;
myRange.oninput = function() {
    output.innerHTML = this.value;
}
// 저장된 localStorage의 정보를 select 값에 모두 표현되게 만들기
const framework = document.querySelector("#framework");
//나가기 누르면 메인페이지로 이동
const returnButton = document.querySelector("#return-button");
function returnToMainPage(){
    mainpage.classList.remove(HIDDEN_CLASS);
    categoryPage.classList.add(HIDDEN_CLASS);
}
returnButton.addEventListener("click",returnToMainPage);
let categories = [];
//localStorage에 저장하기
function categoryItems(){
    localStorage.setItem("categories",JSON.stringify(categories));
}
// ul = category에 li / span 넣기
function paintCategory(newCategory){
    const li = document.createElement("li");
    li.id = newCategory.id;
    li.className = "my-category";
    // range정보 넣기
    const rangeSpan = document.createElement("span");
    rangeSpan.innerText = `[목표: ${newCategory.range}번]`;
    rangeSpan.id = "selected-range";
    li.appendChild(rangeSpan);
    // category 정보 넣기
    const span = document.createElement("span");
    span.innerText = ` ${newCategory.text}`;
    span.id="selected-category";
    li.appendChild(span);
    // 메인페이지 select에 localStorage key = categories 불러오기 위해
    const option = document.createElement("option");
    framework.appendChild(option);
    option.value = newCategory.text;
    option.innerText = newCategory.text;
    // 목표일자 수정버튼
    let newCategorytext = newCategory.text;
    rangeSpan.addEventListener("click",function(event){
        const li = event.target.parentElement;
        // const newCategoryRange = newCategory.range;
        // popupCategory(newCategoryRange);
        bg.classList.remove(HIDDEN_CLASS);
        changeCatePage.classList.remove(HIDDEN_CLASS);
        document.querySelector("#get-cat").innerText = newCategorytext; 
        changeNum.defaultValue = newCategory.range;       
        changeFunction(changeCategoryForm, li, newCategorytext, 0,0,0);
    })
    // 지우기버튼
    const eraseButton = document.createElement("button");
    eraseButton.innerText = "✖";
    eraseButton.className = "erase-category";
    li.appendChild(eraseButton);
     // 지우기 함수 --> 누르면 localStorage에 저장하지 않기
     function remove(event){
        const li = event.target.parentElement;
        li.remove(); //html 상에서 지워지게
        categories = categories.filter((category) => category.id !== parseInt(li.id)); //localStorage에 지워진 건 저장되지 못하게
        categoryItems(); // key = category에 저장
    }
    // 이미 몇번 했지만 지우려고 하는 경우!
    function doNotErase(event){
        // 원래 erase 함수
        const lli = event.target.parentElement;
        const erasingCategory = lli.querySelector("#selected-category").innerText;
        let clearCategories = [];
        let writtenCategories = [];
        if(JSON.parse(localStorage.getItem("clears"))){
            JSON.parse(localStorage.getItem("clears")).forEach((element) => {
                clearCategories.push(element.category);
            });
            JSON.parse(localStorage.getItem("categories")).forEach((element) => {
                writtenCategories.push(element.text);
            });
            if(clearCategories.includes(erasingCategory.replace(/\s/g, '')) == false){
                remove(event); // clears에 값이 없다면 걍 지워도 무방
            }else{
                for (var i = 0; i < writtenCategories.length; i++) {
                    let sameNumber = writtenCategories.filter(x => x === erasingCategory.replace(/\s/g, '')).length;
                if(sameNumber >1){
                    remove(event); // 카테고리명 같은거 2개이상이면 걍 지워도 됨
                }else{                
                    swal({
                        icon: "warning",
                        title: "아직 금메달을 못 땄는데..",
                        text: "정말 지우시겠습니까? \n 지우면 해당 카테고리 이전 기록도 전부 사라집니다",
                        buttons: ["뒤로가기","지우기"],
                }).then((지우기) => {
                    if(지우기){
                        clears = clears.filter((clear) => clear.category !== erasingCategory.replace(/\s/g, ''));
                        finishItems(); // clears에 저장
                        medals = medals.filter((medal) => medal.category !== erasingCategory.replace(/\s/g, ''));
                        localStorage.setItem("medals",JSON.stringify(medals));
                        remove(event);
                    }
                    saveIt(); // 저장완료 됐다는 확인메세지
                });  
            }
        }
        }
        }else{
            remove(event);
        }
    }
    eraseButton.addEventListener("click", doNotErase);
    categoryUl.appendChild(li); // ul에 li 넣기
}
// 자동 새로고침 막고 localStorage에 저장하기
function handleCategorySubmit(event){
    event.preventDefault(); // 자동 새로고침 막기
    const newCategory = categoryInput.value; // 입력값 받기
    categoryInput.value = ""; // 새로고침했을 때 이렇게 뜨게
        // 최종 localStorage 저장목록
        const newCategoryObj = {
            id: Date.now(),
            text: newCategory,
            range: myRange.value,
        };
    categories.push(newCategoryObj);
    paintCategory(newCategoryObj); // html에 우리가 입력한 정보 보여주기
    categoryItems(); // localStorage에 저장
}
categoryForm.addEventListener("submit",handleCategorySubmit);
window.addEventListener("reload",handleCategorySubmit);
// 저장된 todolist를 새로고침해도 없어지지 않게 만들기
const savedCategories = localStorage.getItem("categories"); // localStorage에 저장된 key name = todos를 가져온다
if(savedCategories){
    const parseCategories = JSON.parse(savedCategories); // array로 만들어줌
    categories = parseCategories; // 새로고침 전 localStorage에 기록된 것들도 지워지지 않고 포함되게 하려고
    parseCategories.forEach(paintCategory); // paintTodo는 todolist의 정보를 가지고 있어서, 이 함수를 각각 item마다 실행시켜줘 이말!
}

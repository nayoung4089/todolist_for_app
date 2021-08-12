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

// 본격 localStorage에 categories 저장하기
let categories = [];
//localStorage에 저장하기

function categoryItems(){
    localStorage.setItem("categories",JSON.stringify(categories));
}

// ul = category에 li / span 넣기
function paintCategory(newCategory){
    const li = document.createElement("li");
    li.id = newCategory.id;
    // range정보 넣기
    const rangeSpan = document.createElement("span");
    rangeSpan.innerText = `${newCategory.range}일 동안`;
    rangeSpan.id = "selected-range";
    li.appendChild(rangeSpan);
    // category 정보 넣기
    const span = document.createElement("span");
    span.innerText = ` ${newCategory.text}`
    span.id="selected-category";
    li.appendChild(span);

    // 메인페이지 select에 localStorage key = categories 불러오기 위해
    const option = document.createElement("option");
    framework.appendChild(option);
    option.value = newCategory.text;
    option.innerText = newCategory.text;

    // 지우기버튼
    const eraseButton = document.createElement("button");
    eraseButton.innerText = "✖";
    li.appendChild(eraseButton);
    // 지우기 함수 --> 누르면 localStorage에 저장하지 않기
    function remove(event){
        const li = event.target.parentElement;
        li.remove(); //html 상에서 지워지게
        categories = categories.filter((category) => category.id !== parseInt(li.id)); //localStorage에 지워진 건 저장되지 못하게
        categoryItems(); // 원래 저장하는 localStorage 함수에 업데이트
    }
    eraseButton.addEventListener("click",remove);
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


// console.log(JSON.stringify(localStorage).length);
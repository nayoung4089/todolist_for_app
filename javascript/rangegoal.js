// // goal localStorage에 저장하기
// let ranges = [];
// function rangeItems(){
//     localStorage.setItem("ranges",JSON.stringify(ranges));
// }

// // 일단 localStorage에 저장 --> 새로고침 해도 그대로
// function paintRange(newRange){
    

//     span.innerText = newRange.text;
//     li.appendChild(span);

//     categoryUl.appendChild(li); // ul에 li 넣기
// }

// // 버튼을 클릭하면
// function createRange(){
// const newRangeBar = document.createElement('input');
// newRangeBar.id = "new-bar";
// newRangeBar.type = 'range';
// newRangeBar.min = 3;
// newRangeBar.max = 100;
// newRangeBar.value = 1; // 정수만 가능하게!

// const yes = document.createElement("button");
// yes.innerText = "확인";
// }

// function handleCategorySubmit(event){
//     event.preventDefault(); // 자동 새로고침 막기
//     const newRange = categoryInput.value; // 입력값 받기
//     categoryInput.value = ""; // 새로고침했을 때 이렇게 뜨게
//         // 최종 localStorage 저장목록
//         const newCategoryObj = {
//             id: Date.now(),
//             text: newCategory,
//         };
//     categories.push(newCategoryObj);
//     paintCategory(newCategoryObj); // html에 우리가 입력한 정보 보여주기
//     categoryItems(); // localStorage에 저장
// }
// categoryForm.addEventListener("submit",handleCategorySubmit);
// window.addEventListener("reload",handleCategorySubmit);


// // 저장된 todolist를 새로고침해도 없어지지 않게 만들기
// const savedCategories = localStorage.getItem("categories"); // localStorage에 저장된 key name = todos를 가져온다
// if(savedCategories){
//     const parseCategories = JSON.parse(savedCategories); // array로 만들어줌
//     categories = parseCategories; // 새로고침 전 localStorage에 기록된 것들도 지워지지 않고 포함되게 하려고
//     parseCategories.forEach(paintCategory); // paintTodo는 todolist의 정보를 가지고 있어서, 이 함수를 각각 item마다 실행시켜줘 이말!
// }

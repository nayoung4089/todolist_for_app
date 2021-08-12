const todoForm = document.querySelector("#todo-form");
const todoInput =document.querySelector("#hi");
const calendar = document.querySelector("#calendar");
const todolist = document.querySelector("#todolist");
const writeTodoButton = document.querySelector("#write-todo");
const todoWritePage = document.querySelector("#show-or-none");

// 완료 표시창
function saveIt(){
    swal("성공적으로 저장되었습니다", {
        buttons: false,
        timer: 1000,
      });
}
// 버튼 누르면 입력창 뜨게 만들기
writeTodoButton.addEventListener("click",function(){
    if(todoWritePage.className == HIDDEN_CLASS){
        todoWritePage.classList.remove(HIDDEN_CLASS);
        writeTodoButton.innerText = "접기";
    }else{
        todoWritePage.classList.add(HIDDEN_CLASS);
        writeTodoButton.innerText = "일정 & 목표적기";
    }});
// 카테고리 변경 누르면 변경 페이지로 이동
const categoryChangeButton = document.querySelector("#category-plus");
const categoryPage = document.querySelector("#category-page");

function changeCategoryPage(){
    mainpage.classList.add(HIDDEN_CLASS);
    categoryPage.classList.remove(HIDDEN_CLASS);
}
categoryChangeButton.addEventListener("click",changeCategoryPage);

// 캘린더 정보 localStorage 저장하기
const dayPicker = document.querySelector("#myDate");

let todos = [];
//localStorage에 저장하기

function saveItems(){
    localStorage.setItem("todos",JSON.stringify(todos));
}

// 성공한 정보 저장하기
let clears = [];
//localStorage에 저장하기
function finishItems(){
    localStorage.setItem("clears",JSON.stringify(clears));
}

// ul = todo-list에 li / span 넣기
function paintTodo(newTodo){
    // 디데이 관련 함수
    const now = new Date(); // 오늘날짜 
    const myGoal = new Date(`${newTodo.date} 00:00`); //목표날짜
    const distance = myGoal.getTime() - now.getTime();
    const dDay = distance/(1000*60*60*24); // 우선 그냥 값 적기

    const li = document.createElement("li");
    li.id = newTodo.id;
    li.className = "what-to-do";
    
    // 날짜정보 --> 디데이로 변경완료
    const day = document.createElement("span");
    day.id = "day";
    // 목표날짜를 디데이로 변환하기 , li에 value값 지정하고 그걸로 순서 알아내기
    if(dDay > 0){
        day.innerText = `D-${Math.ceil(dDay)}`; // 2시간이라도 전이면 하루 전으로 체크해야 하니까 올림!
        li.value = Math.ceil(dDay);
    }else if(dDay <= 0 && dDay >-1){
        day.innerText = "D-Day"; // 2시간이라도 전이면 하루 전으로 체크해야 하니까 올림!
        li.value = Math.ceil(dDay);
        day.classList.add(SECOND_ANIMATION);
    }else{
        day.innerText = `D+${Math.abs(Math.ceil(dDay))}`; // 디데이가 지났을 때 --> +로 바꿔줘야 함
        // abs: 절댓값
        li.value = Math.abs(Math.ceil(dDay)) + 100;
        day.style = "background-color:#5968B0"
    } 

    // day.innerText = newTodo.date;
    // 카테고리
    const cate = document.createElement("span");
    cate.id = "cate";
    cate.innerText = newTodo.category;
    // cate.className = HIDDEN_CLASS;
    // 일정정보
    const span = document.createElement("span");
    span.id = "span";
    span.innerText = newTodo.text;
    li.appendChild(day);
    li.appendChild(cate);
    li.appendChild(span);

    // 완료버튼
    const okButton = document.createElement("button");
    okButton.innerText = "✔";
    okButton.className = "ok";
    li.appendChild(okButton);

    // 완료함수
    function pleaseFinish(event){
        const li = event.target.parentElement;
        swal({
            icon: "warning",
            title: "정말로 확인하시겠습니까?",
            text: "선택 후엔 되돌릴 수 없습니다",
            buttons: ["뒤로가기", "확인하기"],
        }).then((확인하기) => {
            if (확인하기) {
            li.remove(); //html 상에서 지워지게
            todos = todos.filter((todo) => todo.id !== parseInt(li.id));
            saveItems();
            // todolist 정보 불러오기
            const finishDay = li.querySelector("#day").innerText;
            const finishCategory = li.querySelector("#cate").innerText;
            const finishString = li.querySelector("#span").innerText; // 아오.. id지정을 안했으니 null이었지...
    
            // range 정보 불러오기 --> by categories
            let savedCategories = JSON.parse(localStorage.getItem("categories"));
            console.log(savedCategories);
    
            function getRangebyCategory(savedCategories, text) {
                var ret = savedCategories.filter(function (item) {
                    return item.text === text;
                });
                return ret[0];
            }
            savedCategories = getRangebyCategory(savedCategories, finishCategory); 
            // 할때 innerText와 비교하니까 절대! 꾸민답시고 category에 뭐 써주지 말기 굳이 하려면 key=categories도 바꿔주자
            console.log(savedCategories);
    
            console.log(finishString);
    
            const finishTodoObj = {
                category: finishCategory,
                date: finishDay,
                text: finishString,
                range: savedCategories.range,
            };
            clears.push(finishTodoObj);
            finishItems();  
                    saveIt();
                    // 새로고침
                    location.reload();
                }
            });      
    }

    // 지우기버튼
    const eraseButton = document.createElement("button");
    eraseButton.innerText = "✖";
    li.appendChild(eraseButton);

    // 지우기 함수 --> 누르면 localStorage에 저장하지 않기
    function remove(event){
        const li = event.target.parentElement;
        // 지우기버튼 알림창
        swal({  icon: "warning",
                title: "정말로 지우시겠습니까?",
                text: "선택 후엔 되돌릴 수 없습니다",
                buttons: ["뒤로가기", "지우기"],
        }).then((지우기) => {
            if (지우기) {
                li.remove(); //html 상에서 지워지게
                todos = todos.filter((todo) => todo.id !== parseInt(li.id)); //localStorage에 지워진 건 저장되지 못하게
                saveItems(); // 원래 저장하는 localStorage 함수에 업데이트
                saveIt(); // 확인알림창
                // 새로고침
                location.reload();
            }
        });
    }
    eraseButton.addEventListener("click",remove);
    okButton.addEventListener("click",pleaseFinish);
    todolist.appendChild(li); 
}

// 자동 새로고침 막고 localStorage에 저장하기
function handleTodoSubmit(event){
    event.preventDefault(); // 자동 새로고침 막기
    const newTodo = todoInput.value; // 입력값 받기
    todoInput.value = ""; // 새로고침했을 때 이렇게 뜨게

    // 최종 localStorage 저장목록
    const newTodoObj = {
        id: Date.now(),
        category: framework.value,
        date: dayPicker.value,
        text: newTodo,
    };
    todos.push(newTodoObj);
    paintTodo(newTodoObj); // html에 우리가 입력한 정보 보여주기
    saveItems(); // localStorage에 저장
}
todoForm.addEventListener("submit",handleTodoSubmit);

// 저장된 todolist를 새로고침해도 없어지지 않게 만들기
const savedTodos = localStorage.getItem("todos"); // localStorage에 저장된 key name = todos를 가져온다
if(savedTodos){
    const parseTodos = JSON.parse(savedTodos); // array로 만들어줌
    todos = parseTodos; // 새로고침 전 localStorage에 기록된 것들도 지워지지 않고 포함되게 하려고
    parseTodos.forEach(paintTodo); // paintTodo는 todolist의 정보를 가지고 있어서, 이 함수를 각각 item마다 실행시켜줘 이말!
}

// 성공한 애들
const savedFinishTodos = localStorage.getItem("clears"); // localStorage에 저장된 key name = todos를 가져온다
if(savedFinishTodos){
    const finishParseTodos = JSON.parse(savedFinishTodos); // array로 만들어줌
    clears = finishParseTodos; // 새로고침 전 localStorage에 기록된 것들도 지워지지 않고 포함되게 하려고
    // finishParseTodos.forEach(paintTodo); // paintTodo는 todolist의 정보를 가지고 있어서, 이 함수를 각각 item마다 실행시켜줘 이말!
}


// 디데이 순서대로 정렬
const ascending = (a,b)=> parseInt(a.value) - parseInt(b.value);
let currentOrder = ascending;
const order  = function(){
	const ordered = [...document.getElementsByClassName("what-to-do")].sort(currentOrder)
  ordered.forEach((elem, index)=>{
  	elem.style.order = index;
  })
}
function ascendingFunction(){
    currentOrder = ascending;
    order();
}
ascendingFunction();
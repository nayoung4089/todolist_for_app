// 변경페이지(카테고리,투두,결과창)
const changeCategoryForm = document.querySelector("#change-category-form");
const changeNum = document.querySelector("#change-num");
const changeCatePage = document.querySelector("#change-category");
const changeTodoForm = document.querySelector("#change-todo-form");
const changeDate = document.querySelector("#change-date");
const chnageDo = document.querySelector("#change-do");
const changeTodoPage = document.querySelector("#change-todo");
const changeGoldForm = document.querySelector("#change-gold-form");
const changeFinDate = document.querySelector("#change-findate");
const changeGoldPage = document.querySelector("#change-gold");
const pop = document.querySelector("#pop");
// 팝업창 만들기 - 명예의 전당
function forInput(a,b,date,changeClearForm){
    const goalName = document.createElement("div");
    goalName.className = "name";
    goalName.innerText = a;
    const changeClearDate = document.createElement("input");
    changeClearDate.id = b;
    changeClearDate.type = date;
    changeClearDate.required = true;
    changeClearForm.appendChild(goalName);
    changeClearForm.appendChild(changeClearDate);
};
function popupReward(){
    const changeClear = document.createElement("div");
    changeClear.id = "change-clear";
    pop.appendChild(changeClear);
    const x = document.createElement("button");
    x.id="xxx";
    x.innerText = "x";
    const changeClearForm = document.createElement("form");
    changeClearForm.id = "change-clear-form";
    forInput("완료날짜 변경","change-clear-date","date",changeClearForm);
    forInput("완료목표 변경","change-clear-do","text",changeClearForm);
    const submitButton = document.createElement("input");
    submitButton.type="submit";
    submitButton.value="확인";
    pop.appendChild(changeClearForm);
    changeClear.appendChild(x);
    changeClear.appendChild(changeClearForm);
    changeClearForm.appendChild(submitButton);
    x.addEventListener("click",function(){
        pop.innerHTML ="";
        bg.classList.add(HIDDEN_CLASS);
    })
}
function changeFunction(changeCategoryForm, li, newCategorytext, didDay, didList, a){
    changeCategoryForm.addEventListener("submit",function(event){
        if(a == 0){
            categories = categories.filter((category) => category.id !== parseInt(li.id));
            const changeNum = document.querySelector("#change-num");
            const changed = {
                id: parseInt(li.id),
                text: newCategorytext,
                range: changeNum.value,
            }
            categories.push(changed);
            categoryItems();// 로컬스토리지 저장
            changeCatePage.classList.add(HIDDEN_CLASS);
            // didDay.innerText = `[목표: ${changeNum.value}번]`; // 새로고침 안돼도 결과 바로 달라지게 아예 html 손봄
        }else if(a == 1){
            todos = todos.filter((todo) => todo.id !== parseInt(li.id));
            let changed = {
                id: parseInt(li.id),
                category: newCategorytext,
                date: changeDate.value,
                text: chnageDo.value,
            }
            todos.push(changed);
            saveItems();
            changeTodoPage.classList.add(HIDDEN_CLASS);
        }else if(a == 4){
            goldMedals = goldMedals.filter((goldMedal) => goldMedal.id !== parseInt(li.id));
            let changedgold = {
                id: parseInt(li.id),
                // 에러나지 않기 위해서는 new Date를 반드시 써줘야 함...
                year: String(new Date(changeFinDate.value).getFullYear()),
                month:String(new Date(changeFinDate.value).getMonth() +1).padStart(2,"0"),
                date: String(new Date(changeFinDate.value).getDate()).padStart(2,"0"),
                category: newCategorytext,
                medal: 1,
            }
            goldMedals.push(changedgold);
            goldMedalItems();
            changeGoldPage.classList.add(HIDDEN_CLASS);
        }
        else{
            const changeClearDate = document.querySelector("#change-clear-date");
            const chnageClearDo = document.querySelector("#change-clear-do");
            event.preventDefault();
            const changed = {
                id: parseInt(li.id),
                category: newCategorytext,
                text: chnageClearDo.value,
                finishFullDate: changeClearDate.value,
                finishYear:String(new Date(changeClearDate.value).getFullYear()),
                finishDay: `${String(new Date(changeClearDate.value).getMonth() +1).padStart(2,"0")}/${String(new Date(changeClearDate.value).getDate()).padStart(2,"0")}`
            }
            didDay.innerText = `${String(new Date(changeClearDate.value).getFullYear())}\n${String(new Date(changeClearDate.value).getMonth() +1).padStart(2,"0")}/${String(new Date(changeClearDate.value).getDate()).padStart(2,"0")}`;
            didList.innerText = chnageClearDo.value;
            if(a == 2){
                clears = clears.filter((clear) => clear.id !== parseInt(li.id));
                clears.push(changed);
                finishItems();
            }else if(a == 3){
                lefts = lefts.filter((left) => left.id !== parseInt(li.id));
                lefts.push(changed);
                leftItems();
            }
        }
        saveIt(); // 완료창 뜨게
        pop.innerHTML ="";
        bg.classList.add(HIDDEN_CLASS);
    });
}
function close(x,changeCatePage){
    document.querySelector(x).addEventListener("click",function(){
        changeCatePage.classList.add(HIDDEN_CLASS);
        bg.classList.add(HIDDEN_CLASS);
        window.location.reload();
    })
};
close("#x",changeCatePage);
close("#xx",changeTodoPage);
close("#xxxx",changeGoldPage);


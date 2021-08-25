// 변경페이지(카테고리,투두,결과창)
const changeCategoryForm = document.querySelector("#change-category-form");
const changeNum = document.querySelector("#change-num");
const changeCatePage = document.querySelector("#change-category");
const changeTodoForm = document.querySelector("#change-todo-form");
const changeDate = document.querySelector("#change-date");
const chnageDo = document.querySelector("#change-do");
const changeTodoPage = document.querySelector("#change-todo");
const changeClearForm = document.querySelector("#change-clear-form");
const changeClearDate = document.querySelector("#change-clear-date");
const chnageClearDo = document.querySelector("#change-clear-do");
const changeClearPage = document.querySelector("#change-clear");
function changeFunction(changeCategoryForm, li, newCategorytext, changeCatePage, a){
    changeCategoryForm.addEventListener("submit",function(){
        if(a == 0){
            categories = categories.filter((category) => category.id !== parseInt(li.id));
            const changed = {
                id: parseInt(li.id),
                text: newCategorytext,
                range: changeNum.value,
            }
            categories.push(changed);
            categoryItems();// 로컬스토리지 저장
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
        }else{
            const changed = {
                id: parseInt(li.id),
                category: newCategorytext,
                text: chnageClearDo.value,
                finishFullDate: changeClearDate.value,
                finishYear:String(new Date(changeClearDate.value).getFullYear()),
                finishDay: `${String(new Date(changeClearDate.value).getMonth() +1).padStart(2,"0")}/${String(new Date(changeClearDate.value).getDate()).padStart(2,"0")}`
            }
            if(a == 2){
                console.log(changed);
                console.log(clears);
                clears = clears.filter((clear) => clear.id !== parseInt(li.id));
                clears.push(changed);
                finishItems();
            }else if(a == 3){
                console.log(changed);
                console.log(lefts);
                lefts = lefts.filter((left) => left.id !== parseInt(li.id));
                lefts.push(changed);
                leftItems();
            }
        }
        saveIt(); // 완료창 뜨게
        changeCatePage.classList.add(HIDDEN_CLASS);
        bg.classList.add(HIDDEN_CLASS);
    });
}
function close(x,changeCatePage){
    document.querySelector(x).addEventListener("click",function(){
        changeCatePage.classList.add(HIDDEN_CLASS);
        bg.classList.add(HIDDEN_CLASS);
    })
};
close("#x",changeCatePage);
close("#xx",changeTodoPage);
close("#xxx",changeClearPage);




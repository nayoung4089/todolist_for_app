const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form > input");
const mainpage = document.querySelector("#mainpage");
const greeting = document.querySelector("#greeting");
const HIDDEN_CLASS = "hidden";
const MAIN_ANIMATION = "animate__tada";
const MUST_ANIMATION = "animate__animated";
const SECOND_ANIMATION = "animate__heartBeat";
const THIRD_ANIMATION = "animate__flipInY";
// 입력하고 새로고침되는 것 막고, 메인페이지로 변경, localStorage에 저장
function stayName(event){
    event.preventDefault(); // 입력하고 새로고침 막기
    const username = loginInput.value;
    loginForm.classList.add(HIDDEN_CLASS); // 새로고침하면 메인페이지로 전환
    localStorage.setItem("username",username); //localStorage에 입력
    greeting.innerText = `반가워요, ${username}님!`
    mainpage.classList.remove(HIDDEN_CLASS); // 메인페이지 보여주기
}
//버튼 누르면 이름변경
const changeButton = document.querySelector("#change-button");
function changeName(){
    loginForm.classList.remove(HIDDEN_CLASS);
    mainpage.classList.add(HIDDEN_CLASS);
    localStorage.removeItem("username");
}
changeButton.addEventListener("click",changeName);
// 새로고침해도 보이게 만들기
const getUsername = localStorage.getItem("username");
if(getUsername){
    // 그냥 정보 가져오기
    greeting.innerText =`반가워요, ${getUsername}님!`;
    mainpage.classList.remove(HIDDEN_CLASS);
}else{
    // 완전 처음 입력한다면
    loginForm.classList.remove(HIDDEN_CLASS);
    loginForm.addEventListener("submit", stayName);
}


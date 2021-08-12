const day = document.querySelector("#clock");
function getClock(){
    const time = new Date();
    let months = String(time.getMonth() +1).padStart(2,"0");
    let dates = String(time.getDate()).padStart(2,"0");
    let nowday =""; // 모두 let으로 쓰는 것 잊지말기~
    switch(time.getDay()){
        case 0:
            nowday="일";
            break;
        case 1:
            nowday="월";
            break;            
        case 2:
            nowday="화";
            break;
        case 3:
            nowday="수";
            break;
        case 4:
            nowday="목";
            break;            
        case 5:
            nowday="금";
            break;
        case 6:
            nowday="토";
            break;
        default :
            nowDay = "";
            break;
    };
    day.innerText = `${months}/${dates} (${nowday})`;

}
getClock();
// 1초마다 함수 실행
setInterval(getClock, 1000);




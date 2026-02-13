let isStopWatchRunning = false;
const timerGrid = document.querySelector(".timer-grid");

const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

const nHour = hours.querySelector(".timer-grid__content--number");
const nMinutes = minutes.querySelector(".timer-grid__content--number");
const nSeconds = seconds.querySelector(".timer-grid__content--number");

const startPauseButton = document.querySelector(".start_pause");
const resetButton = document.querySelector(".reset");

startPauseButton.addEventListener("click", function(e){
    isStopWatchRunning = !isStopWatchRunning;
    if(isStopWatchRunning){
        e.target.innerText = "Pause";

        let hourNum = Number(nHour.innerText);
        let minNum = Number(nMinutes.innerText);
        let secNum = Number(nSeconds.innerText);

        if(isNaN(hourNum) || isNaN(minNum) || isNaN(secNum) || hourNum < 0 || minNum < 0 || secNum < 0){
            alert("Please input the time correctly");
            fnReset();
            return;
        }

        if(secNum >= 60){
            let factor = Math.floor(Number(secNum) / 60);
            nSeconds.innerText = secNum % 60;
            minNum = factor + minNum;
        }
        
        if(minNum >= 60){
            let factor = Math.floor(Number(minNum) / 60);
            nMinutes.innerText = minNum % 60;
            hourNum += factor;
        }
        else{
            nMinutes.innerText = minNum;
        }

        nHour.innerText = hourNum;
        
        let time = 0;
        Array.from(timerGrid.children).forEach((child, idx, arr) => {
            const childNum = child.querySelector(".timer-grid__content--number");
            childNum.setAttribute("contentEditable", !isStopWatchRunning);

            if(!childNum.innerText)
                childNum.innerText = "0";

            if(idx > 0 && childNum.innerText.length < 2){
                childNum.innerText = "0" + childNum.innerText;
            }
                
            if(idx === 0){
                time += Number(childNum.innerText) * 3600;
            }
            else if(idx === 1){
                time += Number(childNum.innerText) * 60;
            }
            else{
                time += Number(childNum.innerText);
            }
        });
        
        runTimer(time);
    }
    else{
        clearInterval(interval);
        e.target.innerText = "Start";
        startPauseButton.innerText = "Start";
    }
});

let interval = null;
function runTimer(time){
    interval = setInterval(() => {
        time -= 1;
        if(time === 0){
            clearInterval(interval);
            isStopWatchRunning = false;
            startPauseButton.innerText = "Start";
            Array.from(timerGrid.children).forEach((child, idx, arr) => {
                const childNum = child.querySelector(".timer-grid__content--number");
                childNum.setAttribute("contentEditable", !isStopWatchRunning);
            });
            return;
        }

        console.log(time);
        let timer = time;

        const timeArr = [];

        timeArr[2] = timer % 60;
        timeArr[1] = Math.floor(timer/60) % 60;
        timeArr[0] = Math.floor(timer/3600);

        Array.from(timerGrid.children).forEach((_child, idx, arr) => {
            let text = timeArr[idx] + "";
            if(idx > 0 && text.length < 2)
                text = "0" + text;

            arr[idx].querySelector(".timer-grid__content--number").innerText = text;
        });
    }, 1000);
}

function fnReset(){
    isStopWatchRunning = false;

    Array.from(timerGrid.children).forEach((child) => {
        const childNum = child.querySelector(".timer-grid__content--number");
        childNum.setAttribute("contentEditable", true);
        childNum.innerText = "0";
    });
    clearInterval(interval);
}

resetButton.addEventListener('click', fnReset);

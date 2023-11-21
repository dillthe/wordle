const answer = "APPLE";

let attempts = 0;
let index = 0; //수정이가능한 변수 let!
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute;top:40vh; left:40vw; font-weight:bold; background-color:white; padding:40px; ";
    document.body.appendChild(div);
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };

  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };

  const handleEnterKey = () => {
    let correct_count = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      입력한_글자.style = "font-weight:bold";
      const 정답_글자 = answer[i];
      if (입력한_글자 === 정답_글자) {
        correct_count += 1;
        block.style.background = "#6AAA64";
      } else if (answer.includes(입력한_글자))
        block.style.background = "#C9B458";
      else block.style.background = "#787C7E";
      block.style.color = "white";
    }
    if (correct_count === 5) gameover();
    else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-column[data-index="${attempts}${index - 1}"]`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };
  //logics
  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-column[data-index="${attempts}${index}"]`
    );

    // console.log(event.key, event.keycode); 백스페이스 키코드 아는 방법

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  const startTimer = () => {
    const start_time = new Date();

    function setTime() {
      const current_time = new Date();
      const passed_time = new Date(current_time - start_time);
      const min = passed_time.getMinutes().toString().padStart(2, "0");
      const sec = passed_time.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector("#timer");
      timeDiv.innerText = `${min}:${sec}`;
      //위 코드는 초 단위가 00 이렇게 표시안되고 1 2 3 이렇게 표시됨. 두자리로 표시하려면 아래처럼
      //timeDiv.innerText = `${min}:${sec}`;
    }

    //주기성
    timer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handleKeydown);
}

appStart();

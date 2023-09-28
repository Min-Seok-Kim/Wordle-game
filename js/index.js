const answer = "APPLE";

let index = 0;
let attempts = 0;
let timer;

function appStart() {
  function displayGameover() {
    const div = document.createElement("div");
    div.innerText = "GAME IS OVER";
    div.style =
      "display:flex; justify-content:center; align-items: center; position:absolute; bottom: 50%; left: 38%; width:200px; height:50px; background-color:white;";
    document.body.appendChild(div);
  }

  function nextLine() {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  }

  function gameover() {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  }

  function handleEnterKey() {
    let right_answer = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const letter = block.innerText;
      const right_letter = answer[i];
      if (letter === right_letter) {
        right_answer += 1;
        block.style.background = "#6AAA64";
      } else if (answer.includes(letter)) block.style.background = "#C9B458";
      else block.style.background = "#787C7E";
      block.style.color = "white";
    }

    if (right_answer === 5) gameover();
    else nextLine();
  }

  function handleBackspace() {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  }

  function handleKeydown(event) {
    const key = event.key;
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (event.keyCode === 8) handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key.toUpperCase();
      index++;
    }
  }

  function startTimer() {
    const startTime = new Date();

    function setTime() {
      const currentTime = new Date();
      const pastTime = new Date(currentTime - startTime);
      const minute = pastTime.getMinutes().toString().padStart(2, "0");
      const seconds = pastTime.getSeconds().toString().padStart(2, "0");
      const timeH1 = document.querySelector("#timer");
      timeH1.innerText = `${minute}:${seconds}`;
    }
    timer = setInterval(setTime, 1000);
  }

  startTimer();
  window.addEventListener("keydown", handleKeydown);
}

appStart();

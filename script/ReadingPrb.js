const nonClick = document.querySelectorAll(".non-click");
let prevSelected = null;
let submitted = false;
let correctAnswer;
var count = 0;
var prbCount = 0;
var rightCount = 0;

function selectChoice(choiceNumber, element) {
  if (!submitted) {
    nonClick.forEach((e) => {
      e.classList.remove("click");
      e.style.backgroundColor = ""; // 이전 선택 색상 제거
    });

    if (prevSelected !== choiceNumber) {
      if (prevSelected) {
        const prevElement = document.getElementById(`ch${prevSelected}`);
        if (prevElement) {
          prevElement.classList.remove("click"); // 이전 선택 취소
          prevElement.style.backgroundColor = "";
        }
      }

      element.classList.add("click");
      element.style.backgroundColor = "rgb(11, 99, 59)"; // 선택한 선지 강조
      prevSelected = choiceNumber;
    } else {
      element.classList.remove("click"); // 이전 선택 취소
      element.style.backgroundColor = ""; // 선택 취소 시 색상 초기화
      prevSelected = null;
    }
  }
}

function handleSubmission() {
  const userAnswer = document.querySelector(".click");
  if (!userAnswer) {
    alert("선지를 선택해주세요!");
  } else {
    checkAnswerAndRedirect();
    showSolutionButton(); // 해설 버튼 보이기 함수 호출
  }
}

function checkAnswerAndRedirect() {
  checkAnswer(); // 정답 확인 함수 실행
  submitted = true;
  const submitButton = document.querySelector(".reading_submit");
  disableSelection(submitButton); // 선지 클릭 및 버튼 비활성화
}
function enableSelection(button) {
  nonClick.forEach((e) => {
    e.style.pointerEvents = "auto"; // 선지 클릭 활성화
  });
  button.disabled = false; // 버튼 활성화
}
function checkAnswer() {
  const correctAnswer = document
    .getElementById("rp_question_text")
    .getAttribute("data-correct-answer");
  const userAnswer = document.querySelector(".click");
  const correctAnswerElement = document.getElementById(correctAnswer);
  if (userAnswer === correctAnswerElement) {
    alert("정답입니다!");
  } else {
    correctAnswerElement.style.backgroundColor = "lightgreen";
    if (prevSelected) {
      const prevElement = document.getElementById(`ch${prevSelected}`);
      if (prevElement) {
        prevElement.style.backgroundColor = ""; // 이전 선택 색상 초기화
        prevElement.classList.remove("click"); // 이전 선택 취소
      }
    }
    if (userAnswer) {
      userAnswer.style.backgroundColor = "red";
    }
  }
}

function disableSelection(button) {
  nonClick.forEach((e) => {
    e.style.pointerEvents = "none"; // 선지 클릭 비활성화
  });
  button.disabled = true; // 버튼 비활성화
}

function showSolutionButton() {
  const ansCheckDiv = document.querySelector(".rp_ans_check_btn");
  ansCheckDiv.style.display = "block";
}

function showSolution() {
  const ansCheckDiv = document.querySelector(".solution_explain");
  ansCheckDiv.style.display = "block";
  kursor.color("#ffffff");
}

function closeSolution() {
  const ansCheckDiv = document.querySelector(".solution_explain");
  ansCheckDiv.style.display = "none";
}

window.onload = function () {
  submitted = false;
  enableSelection(document.querySelector(".reading_submit"));
  loadNewReading(); // 페이지 로드 시에 초기 정답 설정
};
function nextSolution() {
  const ansCheckDiv = document.querySelector(".solution_explain");
  ansCheckDiv.style.display = "none";
  submitted = false;
  resetSelection();
  enableSelection(document.querySelector(".reading_submit"));
  loadNewReading(); // 페이지 로드 시에 초기 정답 설정
}
function resetSelection() {
  nonClick.forEach((e) => {
    e.classList.remove("click");
    e.style.backgroundColor = ""; // 이전 선택 색상 제거
  });

  const correctAnswer = document
    .getElementById("rp_question_text")
    .getAttribute("data-correct-answer");
  const correctAnswerElement = document.getElementById(correctAnswer);

  if (correctAnswerElement) {
    correctAnswerElement.style.backgroundColor = ""; // 정답 색상 초기화
  }
  const prevElement = document.getElementById(`ch${prevSelected}`);
  if (prevElement) {
    prevElement.style.backgroundColor = ""; // 이전 선택 색상 초기화
  }
  prevSelected = null; // 이전 선택 초기화
}
function exitSolution() {
  const ExitModal = document.querySelector(".really");
  ExitModal.style.display = "block";
}
function reallyYes() {
  const ExitModal = document.querySelector(".really");
  const SolModal = document.querySelector(".solution_explain");
  const ResultModal = document.querySelector(".result");
  ExitModal.style.display = "none";
  SolModal.style.display = "none";
  ResultModal.style.display = "block";
}
function reallyNo() {
  const ExitModal = document.querySelector(".really");
  ExitModal.style.display = "none";
}
function saveSolution() {
  if (count == 0) {
    alert("문제가 저장되었습니다.");
    count = 1;
    const SaveBtn = document.querySelector(".save_ex_btn");
    SaveBtn.textContent = "저장된 문제";
    console.log("저장");
    SaveBtn.disabled = true;
  }
}

//Coin
//Coin
//Coin
//Coin
//Coin

document.addEventListener("DOMContentLoaded", function () {
  // 페이지 로드 시에 코인 개수를 업데이트
  updateCoinCount();
  updatePrbCount();
});
function updatePrbCount(){
  let PrbCount = localStorage.getItem("prbCount");
  
}
function updateCoinCount() {
  let coinCount = localStorage.getItem("coinCount");
  if (!coinCount) {
    // 코인 개수가 없는 경우 초기화
    localStorage.setItem("coinCount", 10);
    coinCount = 10;
  }
  document.getElementById("coin_num").textContent = coinCount;
}

function createReading() {
  let coinCount = localStorage.getItem("coinCount");
  if (coinCount > 0) {
    if (confirm("코인을 1개 사용하여 지문을 생성하시겠습니까?")) {
      coinCount -= 1;
      localStorage.setItem("coinCount", coinCount);
      updateCoinCount();
      generateNewReading(); // 새로운 지문 생성 함수 호출
    }
  } else {
    localStorage.setItem("coinCount", 0);
    updateCoinCount();
    alert("코인이 부족합니다.");
  }
}

// 지문 생성 함수
// 지문 생성 함수
// 지문 생성 함수
// 지문 생성 함수
function loadNewReading() {
  const randomTitle = "A Day in the Park";

  const randomParagraph =
    "The park was bathed in the soft glow of the setting sun, creating a picturesque scene. Families gathered on the green grass, enjoying picnics and playing games. The laughter of children echoed through the air, blending with the chirping of birds. A gentle breeze rustled the leaves of the trees, providing a refreshing touch to the warm evening.";
  const randomQuestion = "Q. What added to the picturesque scene in the park?";

  const randomChoice1 = "1. Families enjoying picnics";
  const randomChoice2 = "2. The setting sun";
  const randomChoice3 = "3. Laughter of children";
  const randomChoice4 = "4. A gentle breeze";

  const correctAnswer = "ch1";
  const randomSol =
    "이 문제에서는 공원에서의 아름다운 풍경에 어떤 것이 기여했는지를 묻고 있습니다. 정답은 '소풍을 즐기는 가족'으로, 문장에서는 이들이 녹음과 놀이를 즐기며 공원의 아름다운 풍경에 기여한다고 언급하고 있습니다. 다른 선택지들은 문맥상 가능성이 있지만, 주요 강조는 소풍을 즐기는 가족에 있습니다.";
  document
    .getElementById("rp_question_text")
    .setAttribute("data-correct-answer", correctAnswer);

  // 화면의 지문과 제목 업데이트
  document.getElementById("rp_fulltext").innerHTML = `
      <h4>Reading Reprehension</h4>
      <h3>${randomTitle}</h3>
      <p>${randomParagraph}</p>
    `;
  document.getElementById("rp_question_text").innerHTML = `
    <p>${randomQuestion}</p>
    `;
  document.getElementById("ch1").textContent = randomChoice1;
  document.getElementById("ch2").textContent = randomChoice2;
  document.getElementById("ch3").textContent = randomChoice3;
  document.getElementById("ch4").textContent = randomChoice4;

  console.log("correctAnswer:", correctAnswer);
  document.getElementById("solution_ans").textContent =
    "정답: " + correctAnswer.replace("ch", "") + "번";
  document.getElementById("solution_content").textContent = randomSol;
}

function generateNewReading() {
  // 실제로는 서버로부터 새로운 지문을 가져와서 화면에 업데이트하는 로직을 추가해야 함
  // 아래는 예시로 현재 지문을 랜덤하게 바꾸는 로직

  const randomTitle = "A New Beginning";

  const randomParagraph =
    "As the sun dipped below the horizon, the sky transformed into a canvas of warm hues, casting a tranquil ambiance over the serene landscape. A gentle breeze rustled the leaves, carrying the sweet scent of blooming flowers through the air. In the distance, a river meandered peacefully, reflecting the golden glow of the fading sunlight. Birds chirped their evening melody, contributing to the harmonious symphony of nature. It was a moment of quiet reflection, where time seemed to stand still, and the beauty of the world unfolded in a captivating dance of light and color.";

  const randomQuestion = "Q. What contributes to the tranquil ambiance?";

  const randomChoice1 = "1. A gentle breeze";
  const randomChoice2 = "2. The sweet scent of blooming flowers";
  const randomChoice3 = "3. The golden glow of the fading sunlight";
  const randomChoice4 = "4. The harmonious symphony of nature";
  const correctAnswer = "ch2";
  const randomSol =
    "이 문제에서는 주어진 화면이나 텍스트에서 평온한 분위기에 기여하는 요소를 찾아내야 합니다. 정답은 'The sweet scent of blooming flowers'로, 피어나는 꽃들의 달콤한 향기가 평온한 분위기에 기여하는 것으로 묘사되어 있습니다. 나머지 선택지들은 다른 가능성이 있지만, 이 문장에서는 꽃들의 향기가 강조되고 있습니다.";

  document
    .getElementById("rp_question_text")
    .setAttribute("data-correct-answer", correctAnswer);

  // 화면의 지문과 제목 업데이트
  document.getElementById("rp_fulltext").innerHTML = `
      <h4>Reading Reprehension</h4>
      <h3>${randomTitle}</h3>
      <p>${randomParagraph}</p>
    `;
  document.getElementById("rp_question_text").innerHTML = `
    <p>${randomQuestion}</p>
    `;
  document.getElementById("ch1").textContent = randomChoice1;
  document.getElementById("ch2").textContent = randomChoice2;
  document.getElementById("ch3").textContent = randomChoice3;
  document.getElementById("ch4").textContent = randomChoice4;

  console.log("correctAnswer:", correctAnswer);
  document.getElementById("solution_ans").textContent =
    "정답: " + correctAnswer.replace("ch", "") + "번";
  document.getElementById("solution_content").textContent = randomSol;
}
function gotoMain(){
  location.href = "main.html";
}
function gotoSvRead(){
  location.href = "SavedReading.html";
}
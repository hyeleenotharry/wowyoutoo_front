import config from '/APIkey.js'
// import '../css/ReadingPrb.css'


const nonClick = document.querySelectorAll(".non-click");
let prevSelected = null;
let submitted = false;
let correct;
var count = 0;
var prbCount = 0;
var rightCount = 0;
let reading_id = 0;
let choiceNumber = null;

function selectChoice(element) {
  let clickedButton = element.target;
  choiceNumber = clickedButton.id

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

      clickedButton.classList.add("click");
      clickedButton.style.backgroundColor = "rgb(11, 99, 59)"; // 선택한 선지 강조
      prevSelected = choiceNumber;
    } else {
      clickedButton.classList.remove("click"); // 이전 선택 취소
      clickedButton.style.backgroundColor = ""; // 선택 취소 시 색상 초기화
      prevSelected = null;
    }
  }
}

// 제출
function handleSubmission(e) {
  const userAnswer = document.querySelector(".click");
  if (!userAnswer) {
    alert("선지를 선택해주세요!");
  } else {
    checkAnswerAndRedirect();
    CountReadingNums() // 푼 독해문제 카운트
    showSolutionButton(); // 해설 버튼 보이기 함수 호출

  }
}

// 맞춘 독해문제 개수 추가
async function CountReadingNums() {
  const access = localStorage.getItem('access')
  const response = await fetch(`${config.backend_base_url}/english/reading/`, {
    headers: {
      'Authorization': `Bearer ${access}`
    },
    method: 'POST',
  });
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
  const correctAnswerElement = document.getElementById(correct);
  // console.log(userAnswer)
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

// 지문 생성 함수
async function loadNewReading() {
  const access = localStorage.getItem('access');
  const response = await fetch(`${config.backend_base_url}/english/reading/new/`, {
    headers: {
      'Authorization': `Bearer ${access}`
    },
    method: "POST",
  });
  if (response.status === 402) {
    alert("코인이 부족합니다. 결제 페이지로 이동합니다.");
    window.location.href = "/checkPage.html";
  }
  else if (response.status === 400) {
    alert("생성 실패")
    window.location.href = 'main.html'
  }

  const data = await response.json()

  reading_id = data.id;
  const randomTitle = data.title;

  const randomParagraph = data.paragraph;
  const randomQuestion = data.question;

  const randomChoice1 = data.options[0];
  const randomChoice2 = data.options[1];
  const randomChoice3 = data.options[2];
  const randomChoice4 = data.options[3];
  // console.log(randomChoice1, randomChoice2)

  const correctAnswer = "ch" + (data.solution + 1);
  correct = data.solution;
  const randomSol = data.explanation;

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
  document.getElementById("0").textContent = randomChoice1;
  document.getElementById("1").textContent = randomChoice2;
  document.getElementById("2").textContent = randomChoice3;
  document.getElementById("3").textContent = randomChoice4;

  console.log("correctAnswer:", correctAnswer);
  document.getElementById("solution_ans").textContent =
    "정답: " + correctAnswer.replace("ch", "") + "번";
  document.getElementById("solution_content").textContent = randomSol;
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
}

function closeSolution() {
  const ansCheckDiv = document.querySelector(".solution_explain");
  ansCheckDiv.style.display = "none";
}

// window 시작
window.onload = async function () {
  if (!localStorage.getItem('access')) {
    document.getElementById('save-sol').style.display = 'none'
  }
  submitted = false;
  enableSelection(document.querySelector(".reading_submit"));
  await loadNewReading(); // 페이지 로드 시에 초기 정답 설정
  $('#0').on('click', selectChoice);
  $('#1').on('click', selectChoice)
  $('#2').on('click', selectChoice)
  $('#3').on('click', selectChoice)
  $('#submit').on('click', handleSubmission)

  $('#solution').on('click', showSolution)

  $('#close-sol').on('click', closeSolution)
  $('#next-sol').on('click', nextSolution)
  $('#save-sol').on('click', saveSolution)
  $('#exit-sol').on('click', exitSolution)

  $('#really-yes').on('click', reallyYes)
  $('#really-no').on('click', reallyNo)

  $('#goto-main').on('click', gotoMain)
  $('#create-read').on('click', createReading)
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
  window.location.href = 'main.html'
}
function reallyNo() {
  const ExitModal = document.querySelector(".really");
  ExitModal.style.display = "none";
}

async function saveSolution() {
  if (count == 0) {
    const access = localStorage.getItem('access')
    const response = await fetch(`${config.backend_base_url}/english/readingbook/${reading_id}/`, {
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${access}`
      },
      method: 'POST',
      body: JSON.stringify({
        'select': choiceNumber
      })
    });
    if (!response.ok) {
      const error = await response.json();
      alert(error.detail);
      return;
    }
    alert("문제가 저장되었습니다.");
    count = 1;
    const SaveBtn = document.querySelector(".save_ex_btn");
    SaveBtn.textContent = "저장된 문제";
    SaveBtn.disabled = true;
  }


  //Coin

  document.addEventListener("DOMContentLoaded", function () {
    // 페이지 로드 시에 코인 개수를 업데이트
    updateCoinCount();
    updatePrbCount();
  });
  function updatePrbCount() {
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

    window.location.reload();
  }





  async function generateNewReading() {
    // 실제로는 서버로부터 새로운 지문을 가져와서 화면에 업데이트하는 로직을 추가해야 함
    // 아래는 예시로 현재 지문을 랜덤하게 바꾸는 로직
    const response = await fetch("http://127.0.0.1:8000/english/reading/", { method: "POST" });
    if (!response.ok) {
      const error = await response.json();
      alert(error.message);
      return;
    }
    const { title, paragraph, question, solution, options, explanation } = await response.json();

    document
      .getElementById("rp_question_text")
      .setAttribute("data-correct-answer", `ch${solution}`);

    // 화면의 지문과 제목 업데이트
    document.getElementById("rp_fulltext").innerHTML = `
      <h4>Reading Reprehension</h4>
      <h3>${title}</h3>
      <p>${paragraph}</p>
    `;
    document.getElementById("rp_question_text").innerHTML = `
    <p>${question}</p>
    `;
    for (let i = 0; i < 4; i++) {
      document.getElementById(`ch${i + 1}`).textContent = options[i];
    }

    document.getElementById("solution_ans").textContent =
      `정답: ${solution + 1}번`;
    document.getElementById("solution_content").textContent = explanation;
  }

  function gotoMain() {
    location.href = "main.html";
  }

  function gotoSvRead() {
    location.href = "SavedReading.html";
  }
}
import config from '../APIkey.js'


const nonClick = document.querySelectorAll(".non-click");
let prevSelected = null;
let submitted = false;
let correct;
var count = 0;
var prbCount = 0;
var rightCount = 0;
let reading_id = 0;
let clicked_button = null;

function selectChoice(element) {
    let clickedButton = element.target;
    let choiceNumber = clickedButton.id
    console.log(clickedButton)
    clicked_button = clickedButton

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


function handleSubmission(e) {
    const userAnswer = document.querySelector(".click");
    if (!userAnswer) {
        alert("선지를 선택해주세요!");
    } else {
        checkAnswerAndRedirect();
        CountReadingNums();
        showSolutionButton(); // 해설 버튼 보이기 함수 호출
    }
}

function checkAnswerAndRedirect() {
    checkAnswer(); // 정답 확인 함수 실행
    submitted = true;
    const submitButton = document.querySelector(".reading_submit");
    disableSelection(submitButton); // 선지 클릭 및 버튼 비활성화
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
function hideSolutionButton() {
    const ansCheckDiv = document.querySelector(".rp_ans_check_btn");
    ansCheckDiv.style.display = "none";
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

// window 시작
window.onload = function () {
    submitted = false;
    enableSelection(document.querySelector(".reading_submit"));
    loadNewReading(); // 페이지 로드 시에 초기 정답 설정
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
    const ansCheckDiv = document.querySelector(".solution_explain"); // 처음에 받아온 데이터에서 인덱스를 1 증가시킨 데이터 reset
    ansCheckDiv.style.display = "none";
    submitted = false;
    resetSelection();
    hideSolutionButton();
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

// 독해 지문 저장
async function saveSolution() {
    const access = localStorage.getItem('access')
    // console.log(clicked_button.id)
    try {
        const response = await fetch(`${config.backend_base_url}/english/readingbook/${reading_id}/`, {
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${access}`
            },
            method: 'POST',
            body: JSON.stringify({
                'select': clicked_button.id
            })
        })
            .then((res) => {
                if (res.status == 200) {
                    return res.json()
                }
                return res.json()
            })
            .then((res) => {
                alert(res['detail'])
            })
    } catch (error) {
        console.log(error)
        alert('로그인이 필요한 작업입니다.')
    }
    if (count == 0) {

        count = 1;
        const SaveBtn = document.querySelector(".save_ex_btn");

    }
}


//Coin

document.addEventListener("DOMContentLoaded", function () {
    // 페이지 로드 시에 코인 개수를 업데이트
    updateCoinCount();
    updatePrbCount();
});
function updatePrbCount() {
    let PrbCount = localStorage.getItem("dprbCount");

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
    console.log("새로운 문제")
    // let coinCount = localStorage.getItem("coinCount");
    // if (coinCount > 0) {
    //   if (confirm("코인을 1개 사용하여 지문을 생성하시겠습니까?")) {
    //     coinCount -= 1;
    //     localStorage.setItem("coinCount", coinCount);
    //     updateCoinCount();
    //     window.location.reload()
    //     // generateNewReading(); // 새로운 지문 생성 함수 호출
    //   }
    // } else {
    //   localStorage.setItem("coinCount", 0);
    //   updateCoinCount();
    //   alert("코인이 부족합니다.");
    // }
    window.location.reload()
}


async function loadNewReading() {
    const response = await fetch(`${config.backend_base_url}/english/reading/`,)

    const data = await response.json()

    reading_id = data[0].id

    const randomTitle = data[0].title;

    const randomParagraph =
        data[0].paragraph;
    const randomQuestion = data[0].question;

    const randomChoice1 = data[0].options[0];
    const randomChoice2 = data[0].options[1];
    const randomChoice3 = data[0].options[2];
    const randomChoice4 = data[0].options[3];
    // console.log(randomChoice1, randomChoice2)

    const correctAnswer = "ch" + (data[0].solution + 1);
    correct = data[0].solution
    const randomSol =
        data[0].explanation;
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

    // console.log("correctAnswer:", correctAnswer);
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

    // console.log("correctAnswer:", correctAnswer);
    document.getElementById("solution_ans").textContent =
        "정답: " + correctAnswer.replace("ch", "") + "번";
    document.getElementById("solution_content").textContent = randomSol;
}
function gotoMain() {
    location.href = "main.html";
}
function gotoSvRead() {
    location.href = "SavedReading.html";
}
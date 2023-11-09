const nonClick = document.querySelectorAll(".non-click");
let prevSelected = null;
let submitted = false;

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

function checkAnswer() {
    const correctAnswer = document.getElementById("ch4");
    const userAnswer = document.querySelector(".click");
    if (userAnswer === correctAnswer) {
        alert("정답입니다!");
    } else {
        correctAnswer.style.backgroundColor = "lightgreen";
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
    kursor.color('#ffffff');
}

function closeSolution() {
    const ansCheckDiv = document.querySelector(".solution_explain");
    ansCheckDiv.style.display = "none";
}

window.onload = function () {
    nonClick.forEach((e) => {
        e.classList.remove("click");
        e.style.backgroundColor = ""; // 이전 선택 색상 제거
    });
    closeSolution();
};
// function nextSolution{
    // closeSolution();
    // window.location.href = "다음 문제 로드 링크";
// }
function exitSolution(){
    const ExitModal = document.querySelector(".really");
    ExitModal.style.display = "block";
  }
function reallyYes(){
    const ExitModal = document.querySelector(".really");
    ExitModal.style.display = "none";
    window.location.href = "main.html";
}
function reallyNo(){
    const ExitModal = document.querySelector(".really");
    ExitModal.style.display = "none";
}
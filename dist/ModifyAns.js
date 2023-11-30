import config from "../APIkey.js";
import '../css/DetailFAQ.css'
const backend_base_url = "http://localhost:8000";


// Function to render FAQ detail
async function renderFAQDetail(qna_id) {
  try {
    // Fetch FAQ detail data
    const response = await fetch(`${backend_base_url}/service/qna/${qna_id}/`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Server returned an error ${response.status}: ${response.statusText}`);
    }

    const faqDetail = await response.json();

    // Assign values to HTML elements
    document.getElementById('faqCategory').textContent = faqDetail.question_type;
    document.getElementById('faqTitle').textContent = faqDetail.title;
    document.getElementById('faqAuthor').textContent = faqDetail.username;
    document.getElementById('faqDate').textContent = faqDetail.created_at;
    document.getElementById('faqContent').textContent = faqDetail.content;
  } catch (error) {
    console.error('Error fetching FAQ detail:', error);
    // Handle the error appropriately
  }
}
async function RenderAns(qna_id) {
  try {
    const response = await fetch(
      `${config.backend_base_url}/service/qna/${qna_id}/response/`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Server returned an error ${response.status}: ${response.statusText}`
      );
    }

    const faqData = await response.json();

    // 폼에 FAQ 데이터 채우기
    document.getElementById("answerContentInput").value = faqData.content;
  } catch (error) {
    console.error("Error loading FAQ data:", error);
    // Handle the error appropriately
  }
}

// 페이지 로드 시 FAQ 데이터를 미리 불러오기
document.addEventListener("DOMContentLoaded", function () {
  loadFAQData();
});
const editBtn = document.getElementById("answerSubmitButton");
editBtn.addEventListener("click", UpdateAns(qna_id));

// FAQ 수정 요청을 보내는 함수
async function UpdateAns(qna_id) {
  const editedContent = document.getElementById("answerContentInput").value;
  try {
    const response = await fetch(
      `${config.backend_base_url}/service/qna/${qna_id}/response/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_ACCESS_TOKEN", // 필요한 경우 토큰을 추가
        },
        body: JSON.stringify({
          content: editedContent
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Server returned an error ${response.status}: ${response.statusText}`
      );
    }

    // 수정이 성공하면 이전 페이지로 이동 또는 다른 동작 수행
    alert("FAQ 답변이 수정되었습니다.");
    window.location.href = `${config.backend_base_url}/service/qna/${qna_id}/`;
  } catch (error) {
    console.error("Error updating FAQ Ans:", error);
    // Handle the error appropriately
  }
}

window.onload = function () {
  // Get FAQ ID from the URL or any other source
  const qna_id = 123;  // Replace with the actual FAQ ID

  renderFAQDetail(qna_id);

}
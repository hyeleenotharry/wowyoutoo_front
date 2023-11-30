import config from "../APIkey.js";
import '../css/DetailFAQ.css'

const urlParams = new URLSearchParams(window.location.search);
const qna_id = urlParams.get("id");

// �� ��ҿ� FAQ �����͸� �ҷ����� ���� �Լ�
async function loadFAQData() {
  try {
    const response = await fetch(
      `${config.backend_base_url}/service/qna/${qna_id}/`,
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

    // ���� FAQ ������ ä���
    document.getElementById("faqEditTitle").value = faqData.title;
    document.getElementById("faqEditContent").value = faqData.content;
  } catch (error) {
    console.error("Error loading FAQ data:", error);
    // Handle the error appropriately
  }
}

// ������ �ε� �� FAQ �����͸� �̸� �ҷ�����
document.addEventListener("DOMContentLoaded", function () {
  loadFAQData();
});
const editBtn = document.getElementById("editCompleteButton");
editBtn.addEventListener("click", updateFAQ(qna_id));
// FAQ ���� ��û�� ������ �Լ�
async function updateFAQ(qna_id) {
  const editedTitle = document.getElementById("faqEditTitle").value;
  const editedContent = document.getElementById("faqEditContent").value;
  try {
    const response = await fetch(
      `${config.backend_base_url}/service/qna/${qna_id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_ACCESS_TOKEN", // �ʿ��� ��� ��ū�� �߰�
        },
        body: JSON.stringify({
          title: editedTitle,
          content: editedContent
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Server returned an error ${response.status}: ${response.statusText}`
      );
    }

    // ������ �����ϸ� ���� �������� �̵� �Ǵ� �ٸ� ���� ����
    alert("FAQ�� �����Ǿ����ϴ�.");
    window.location.href = `${config.backend_base_url}/service/qna/${qna_id}/`;
  } catch (error) {
    console.error("Error updating FAQ:", error);
    // Handle the error appropriately
  }
}

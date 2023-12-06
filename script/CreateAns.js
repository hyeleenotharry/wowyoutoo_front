const backend_base_url = "https://api.wowyoutoo.me";


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

const submitBtn = document.getElementById("answerSubmitBtn");
submitBtn.addEventListener("click", SubmitAns(qna_id));
async function SubmitAns(qna_id) {
    var content = document.getElementById("answerContentInput");
    if (!content.value) {
        alert("내용을 입력해주세요.");
        return;
    }

    var formData = new FormData();

    formData.append("content", content.value);

    try {
        const response = await fetch(`${backend_base_url}/service/qna/${qna_id}/`, {
            method: "POST",
            body: formData,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        console.log("Success:", responseData);
        alert("답변이 등록되었습니다.");
    } catch (error) {
        console.error("Error:", error);
    }
}
window.onload = function () {
    // Get FAQ ID from the URL or any other source
    const qna_id = 123;  // Replace with the actual FAQ ID

    renderFAQDetail(qna_id);

}
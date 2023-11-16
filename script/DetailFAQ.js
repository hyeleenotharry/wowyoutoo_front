const faq = [
    {
        "id": "123",
        "username": "user1",
        "title": "FAQ 제목 1",
        "content": "FAQ 내용 1",
        "image": "이미지 파일 또는 경로 1",
        "is_answered": true,
        "is_private": true,
        "question_type": "카테고리 1"
    }      
];
const backend_base_url = "http://localhost:8000";

// Function to render FAQ detail
async function renderFAQDetail(qnaId) {
    try {
        // Fetch FAQ detail data
        const response = await fetch(`${backend_base_url}/service/qna/${qnaId}/`, {
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

        // FAQ 수정 및 삭제 기능 추가
        const editButton = document.getElementById('editButton');
        const deleteButton = document.getElementById('deleteButton');



        // FAQ_container lock의 display 설정
        const lockContainer = document.getElementById('lockContainer');
        if (faqDetail.is_private) {
            // FAQ가 private인 경우 (작성자 또는 관리자만 볼 수 있는 경우)
            // TODO: 서버에서 현재 사용자 정보를 가져와서 확인하는 로직 필요
            const isUserAuthorized = true;  // TODO: 실제로는 서버에서 사용자 권한 확인
            if (isUserAuthorized) {
                lockContainer.style.display = 'none'; // 작성자 또는 관리자인 경우 보이기
            } else {
                lockContainer.style.display = 'block'; // 작성자 또는 관리자가 아닌 경우 보이지 않기
            }
        } else {
            lockContainer.style.display = 'none'; // FAQ가 private가 아닌 경우 항상 보이기
        }

    } catch (error) {
        console.error('Error fetching FAQ detail:', error);
        // Handle the error appropriately
    }
}

// Get FAQ ID from the URL or any other source
const qnaId = 123;  // Replace with the actual FAQ ID
renderFAQDetail(qnaId);
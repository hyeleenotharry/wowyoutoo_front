import config from '../APIkey.js'

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
const backend_base_url = config.backend_base_url;

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
async function renderFAQAnswer(qna_id) {
    try {
        // Fetch FAQ Answer data
        const response = await fetch(`${backend_base_url}/service/qna/${qna_id}/response/`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`Server returned an error ${response.status}: ${response.statusText}`);
        }

        const faqAnswer = await response.json();
        if (faqAnswer.content == null) {
            document.getElementById('editAnswerButton').style.display = 'none';
            document.getElementById('deleteAnswerButton').style.display = 'none';
            document.getElementById('answerContentInput').value = '답변이 아직 없습니다.';
        }
        // Assign values to HTML elements
        else {
            document.getElementById('createAnswerButton').style.display = 'none';
            document.getElementById('answerContentInput').value = faqAnswer.content;
        }
    } catch (error) {
        console.error('Error fetching FAQ Answer:', error);
        // Handle the error appropriately
    }
}
async function deleteAns() {
    if (confirm('정말로 삭제하시겠습니까?')) {
        try {
            const response = await fetch(`${backend_base_url}/service/qna/${qna_id}/response/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // 필요한 경우 토큰을 추가
                },
            });

            if (!response.ok) {
                throw new Error(`Server returned an error ${response.status}: ${response.statusText}`);
            }

            alert('FAQ 답변이 삭제되었습니다.');
            window.location.href = '${backend_base_url}/service/qna/${qna_id}/'; // 삭제 후 이동할 페이지 URL로 변경

        } catch (error) {
            console.error('Error deleting FAQ:', error);
            // Handle the error appropriately
        }
    }

}
async function deleteFAQ() {
    if (confirm('정말로 삭제하시겠습니까?')) {
        try {
            const response = await fetch(`${backend_base_url}/service/qna/${qna_id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // 필요한 경우 토큰을 추가
                },
            });

            if (!response.ok) {
                throw new Error(`Server returned an error ${response.status}: ${response.statusText}`);
            }

            alert('FAQ가 삭제되었습니다.');
            window.location.href = '${backend_base_url}/service/qna/'; // 삭제 후 이동할 페이지 URL로 변경

        } catch (error) {
            console.error('Error deleting FAQ:', error);
            // Handle the error appropriately
        }
    }
}
window.onload = function () {
    // Get FAQ ID from the URL or any other source
    const qna_id = 123;  // Replace with the actual FAQ ID

    renderFAQDetail(qna_id);

    renderFAQAnswer(qna_id);
}
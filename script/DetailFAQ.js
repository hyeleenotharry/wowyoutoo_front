const faq = [
    {
        "id": "123",
        "username": "user1",
        "title": "FAQ ���� 1",
        "content": "FAQ ���� 1",
        "image": "�̹��� ���� �Ǵ� ��� 1",
        "is_answered": true,
        "is_private": true,
        "question_type": "ī�װ� 1"
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

        // FAQ ���� �� ���� ��� �߰�
        const editButton = document.getElementById('editButton');
        const deleteButton = document.getElementById('deleteButton');



        // FAQ_container lock�� display ����
        const lockContainer = document.getElementById('lockContainer');
        if (faqDetail.is_private) {
            // FAQ�� private�� ��� (�ۼ��� �Ǵ� �����ڸ� �� �� �ִ� ���)
            // TODO: �������� ���� ����� ������ �����ͼ� Ȯ���ϴ� ���� �ʿ�
            const isUserAuthorized = true;  // TODO: �����δ� �������� ����� ���� Ȯ��
            if (isUserAuthorized) {
                lockContainer.style.display = 'none'; // �ۼ��� �Ǵ� �������� ��� ���̱�
            } else {
                lockContainer.style.display = 'block'; // �ۼ��� �Ǵ� �����ڰ� �ƴ� ��� ������ �ʱ�
            }
        } else {
            lockContainer.style.display = 'none'; // FAQ�� private�� �ƴ� ��� �׻� ���̱�
        }

    } catch (error) {
        console.error('Error fetching FAQ detail:', error);
        // Handle the error appropriately
    }
}

// Get FAQ ID from the URL or any other source
const qnaId = 123;  // Replace with the actual FAQ ID
renderFAQDetail(qnaId);
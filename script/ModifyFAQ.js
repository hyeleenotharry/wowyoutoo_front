const urlParams = new URLSearchParams(window.location.search);
        const faqId = urlParams.get('id');

        // �� ��ҿ� FAQ �����͸� �ҷ����� ���� �Լ�
        async function loadFAQData() {
            try {
                const response = await fetch(`${backend_base_url}/service/qna/${faqId}/`, {
                    method: 'GET',
                });

                if (!response.ok) {
                    throw new Error(`Server returned an error ${response.status}: ${response.statusText}`);
                }

                const faqData = await response.json();

                // ���� FAQ ������ ä���
                document.getElementById('category').value = faqData.category;
                document.getElementById('title').value = faqData.title;
                document.getElementById('content').value = faqData.content;

            } catch (error) {
                console.error('Error loading FAQ data:', error);
                // Handle the error appropriately
            }
        }

        // ������ �ε� �� FAQ �����͸� �̸� �ҷ�����
        document.addEventListener('DOMContentLoaded', function () {
            loadFAQData();
        });

        // FAQ ���� ��û�� ������ �Լ�
        async function updateFAQ() {
            const formData = new FormData(document.getElementById('faqForm'));

            try {
                const response = await fetch(`${backend_base_url}/service/qna/${faqId}/`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // �ʿ��� ��� ��ū�� �߰�
                    },
                    body: JSON.stringify({
                        category: formData.get('category'),
                        title: formData.get('title'),
                        content: formData.get('content')
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Server returned an error ${response.status}: ${response.statusText}`);
                }

                // ������ �����ϸ� ���� �������� �̵� �Ǵ� �ٸ� ���� ����
                alert('FAQ�� �����Ǿ����ϴ�.');
                window.location.href = 'DetailFAQ.html';

            } catch (error) {
                console.error('Error updating FAQ:', error);
                // Handle the error appropriately
            }
        }
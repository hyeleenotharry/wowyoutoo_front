const urlParams = new URLSearchParams(window.location.search);
        const faqId = urlParams.get('id');

        // 폼 요소와 FAQ 데이터를 불러오기 위한 함수
        async function loadFAQData() {
            try {
                const response = await fetch(`${backend_base_url}/service/qna/${faqId}/`, {
                    method: 'GET',
                });

                if (!response.ok) {
                    throw new Error(`Server returned an error ${response.status}: ${response.statusText}`);
                }

                const faqData = await response.json();

                // 폼에 FAQ 데이터 채우기
                document.getElementById('category').value = faqData.category;
                document.getElementById('title').value = faqData.title;
                document.getElementById('content').value = faqData.content;

            } catch (error) {
                console.error('Error loading FAQ data:', error);
                // Handle the error appropriately
            }
        }

        // 페이지 로드 시 FAQ 데이터를 미리 불러오기
        document.addEventListener('DOMContentLoaded', function () {
            loadFAQData();
        });

        // FAQ 수정 요청을 보내는 함수
        async function updateFAQ() {
            const formData = new FormData(document.getElementById('faqForm'));

            try {
                const response = await fetch(`${backend_base_url}/service/qna/${faqId}/`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // 필요한 경우 토큰을 추가
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

                // 수정이 성공하면 이전 페이지로 이동 또는 다른 동작 수행
                alert('FAQ가 수정되었습니다.');
                window.location.href = 'DetailFAQ.html';

            } catch (error) {
                console.error('Error updating FAQ:', error);
                // Handle the error appropriately
            }
        }
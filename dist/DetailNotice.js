import config from '/APIkey.js'


const backend_base_url = config.backend_base_url;
const frontend_base_url = config.frontend_base_url;
// Function to render FAQ detail

const urlParms = new URLSearchParams(window.location.search);
const noticeId = urlParms.get("notice_id"); // Replace with the actual FAQ ID

function gotoModify() {

    window.location.href = `${frontend_base_url}/ModifyNotice.html?notice_id=${noticeId}`
}


window.onload = async function () {
    // Get FAQ ID from the URL or any other source

    try {
        if (localStorage.getItem('is_admin') === true) {
            document.getElementById("editButton").style.display = 'block'
            document.getElementById("deleteButton").style.display = 'block'
        }
    } catch (error) {
        console.log(error)
    }

    $('#editButton').on('click', gotoModify)
    $('#deleteButton').on('click', deleteNotice)
    renderNoticeDetail(noticeId);
    try { renderFAQAnswer(noticeId); }
    catch (error) { console.log(error) }
}




async function renderNoticeDetail(noticeId) {
    try {
        // Fetch FAQ detail
        const accessToken = localStorage.getItem("access");
        let response
        if (accessToken == null) {

            response = await fetch(`${backend_base_url}/service/${noticeId}/`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'GET',
            });
        }
        else {
            response = await fetch(`${backend_base_url}/service/${noticeId}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                method: 'GET',
            });
        }

        const noticeDetail = await response.json();

        // Assign values to HTML elements
        document.getElementById('noticeTitle').textContent = noticeDetail.title;
        document.getElementById('noticeDate').textContent = noticeDetail.created_at;
        document.getElementById('noticeContent').textContent = noticeDetail.content;

        if (noticeDetail.image != null) {
            const imageUrl = `${backend_base_url}${noticeDetail.image}`; // faqDetail에서 이미지 URL을 가져옴
            // 이미지 표시
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl; // 이미지 URL을 <img> 요소의 src 속성에 할당
            imgElement.style.width = '480px'
            imgElement.style.height = '500px'

            // <div id="noticeImage">에 이미지 요소 추가
            const noticeImageDiv = document.getElementById('noticeImage');
            noticeImageDiv.appendChild(imgElement);
            // FAQ_container lock의 display 설정
            const lockContainer = document.getElementById('lockContainer');
        }

    } catch (error) {
        console.error('Error fetching FAQ detail:', error);
        // Handle the error appropriately
    }
}

async function deleteNotice() {
    if (confirm('정말로 삭제하시겠습니까?')) {
        try {
            const accessToken = localStorage.getItem("access");
            const response = await fetch(`${backend_base_url}/service/${noticeId}/`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Server returned an error ${response.status}: ${response.statusText}`);
            }

            alert('공지사항이 삭제되었습니다.');
            location.href = `${frontend_base_url}/FAQList.html`; // 삭제 후 이동할 페이지 URL로 변경

        } catch (error) {
            alert("관리자만 삭제할수있습니다")
            // Handle the error appropriately
        }
    }
}


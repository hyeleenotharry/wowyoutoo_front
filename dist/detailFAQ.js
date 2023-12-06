import config from '../APIkey.js'
// import '../css/DetailFAQ.css'

const backend_base_url = config.backend_base_url
const frontend_base_url = config.frontend_base_url
// Function to render FAQ detail

const urlParms = new URLSearchParams(window.location.search);
const qnaId = urlParms.get("qna_id"); // Replace with the actual FAQ ID

function gotoModify() {
    window.location.href = `${frontend_base_url}/ModifyFAQ.html?qna_id=${qnaId}`
}


window.onload = async function () {
    $("#image_input").on('change', displayFileName)
    $('#editButton').on('click', gotoModify)
    $('#deleteAnswerButton').on('click', deleteAns)
    $('#deleteButton').on('click', deleteFAQ)
    renderFAQDetail(qnaId);
    try {
        renderFAQAnswer(qnaId);
    } catch (error) {
        console.log(error)
    }
    const submitBtn = document.getElementById("answerSubmitBtn");
    submitBtn.addEventListener("click", function () {
        SubmitAns(qnaId)
    });
}




async function renderFAQDetail(qnaId) {
    try {
        // Fetch FAQ detail
        const accessToken = localStorage.getItem("access");
        let response
        if (accessToken == null) {
            // console.log("없다?")
            response = await fetch(`${backend_base_url}/service/qna/${qnaId}/`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'GET',
            });
        }
        else {
            response = await fetch(`${backend_base_url}/service/qna/${qnaId}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                method: 'GET',
            });
        }

        if (response.status == 403) {
            alert("관리자와 글쓴이만 볼수있는 글입니다")
            location.href = `${frontend_base_url}/FAQList.html`;
        }

        const faqDetail = await response.json();

        // Assign values to HTML elements
        const uid = faqDetail.id // 글을 쓴 사람
        const me = JSON.parse(localStorage.getItem('payload')).user_id
        console.log(uid, me)
        if (uid != me) {
            document.getElementById('editButton').style.display = 'none'
            document.getElementById('deleteButton').style.display = 'none'
        }
        document.getElementById('faqCategory').textContent = faqDetail.question_type;
        document.getElementById('faqTitle').textContent = faqDetail.title;
        document.getElementById('faqAuthor').textContent = faqDetail.username;
        document.getElementById('faqDate').textContent = faqDetail.created_at;
        document.getElementById('faqContent').textContent = faqDetail.content;

        if (faqDetail.image != null) {
            const imageUrl = `${backend_base_url}${faqDetail.image}`; // faqDetail에서 이미지 URL을 가져옴
            // 이미지 표시
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl; // 이미지 URL을 <img> 요소의 src 속성에 할당

            // <div id="noticeImage">에 이미지 요소 추가
            const noticeImageDiv = document.getElementById('faqImage');
            noticeImageDiv.appendChild(imgElement);
            // FAQ_container lock의 display 설정
            const lockContainer = document.getElementById('lockContainer');
        }

        if (faqDetail.is_private) {
            // FAQ가 private인 경우 (작성자 또는 관리자만 볼 수 있는 경우)
            // TODO: 서버에서 현재 사용자 정보를 가져와서 확인하는 로직 필요
            const isUserAuthorized = true; // TODO: 실제로는 서버에서 사용자 권한 확인
            if (isUserAuthorized) {
                lockContainer.style.display = 'none'; // 작성자 또는 관리자인 경우 보이기
            } else {
                lockContainer.style.display = 'block'; // 작성자 또는 관리자가 아닌 경우 보이지 않기
            }
        } else {
            lockContainer.style.display = 'none'; // FAQ가 private가 아닌 경우 항상 보이기
        }

    } catch (error) {
        console.log(error)
        // Handle the error appropriately
    }
}

async function renderFAQAnswer(qnaId) {

    try {
        // Fetch FAQ Answer data
        const accessToken = localStorage.getItem("access");

        let response
        if (accessToken == null) {

            response = await fetch(`${backend_base_url}/service/qna/${qnaId}/response/`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'GET',
            });
        }
        else {
            response = await fetch(`${backend_base_url}/service/qna/${qnaId}/response/`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                method: 'GET',
            });
        }

        if (response.status == 403) {
            alert('관리자와 작성자만 볼 수 있는 글입니다.')
            location.href = `${frontend_base_url}/FAQList.html`;
        }

        if (!response.ok) {
            const deleteBtn = document.getElementById('deleteAnswerButton')
            deleteBtn.style.display = "none"
        } else {
            const deleteBtn = document.getElementById('deleteAnswerButton')
            deleteBtn.style.display = "block"
        }
        const faqAnswer = await response.json();
        if (faqAnswer.content == null) {

            document.getElementById('deleteAnswerButton').style.display = 'none';
            document.getElementById('faqAns').textContent = '답변이 아직 없습니다.';
        } else {
            document.getElementById("faqAns").textContent = faqAnswer.content;
            document.get
        }
        if (faqAnswer.image != null) {
            const imageUrl = `${backend_base_url}${faqAnswer.image}`; // faqDetail에서 이미지 URL을 가져옴
            // 이미지 표시
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl; // 이미지 URL을 <img> 요소의 src 속성에 할당

            // <div id="noticeImage">에 이미지 요소 추가
            const noticeImageDiv = document.getElementById('answerImage');
            noticeImageDiv.appendChild(imgElement);
        }

    } catch (error) {
        console.error('Error fetching FAQ Answer:', error);
        //location.href = `${frontend_base_url}/FAQList.html`;
        // Handle the error appropriately
    }
}



async function deleteAns() {
    if (confirm('정말로 삭제하시겠습니까?')) {
        try {
            const accessToken = localStorage.getItem("access");
            const response = await fetch(`${backend_base_url}/service/qna/${qnaId}/response/`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            alert('FAQ 답변이 삭제되었습니다.');
            location.href = `${frontend_base_url}/DetailFAQ.html?qna_id=${qnaId}`; // 삭제 후 이동할 페이지 URL로 변경

        } catch (error) {
            console.error('Error deleting FAQ:', error);
            location.href = `${frontend_base_url}/FAQList.html`;
            // Handle the error appropriately
        }
    }

}
async function deleteFAQ() {
    if (confirm('정말로 삭제하시겠습니까?')) {
        try {
            const accessToken = localStorage.getItem("access");
            const response = await fetch(`${backend_base_url}/service/qna/${qnaId}/`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Server returned an error ${response.status}: ${response.statusText}`);
            }

            alert('FAQ가 삭제되었습니다.');
            location.href = `${frontend_base_url}/FAQList.html`; // 삭제 후 이동할 페이지 URL로 변경

        } catch (error) {
            console.error('Error deleting FAQ:', error);
            // Handle the error appropriately
        }
    }
}


async function SubmitAns(qnaId) {
    const formData = new FormData();
    var content = document.getElementById("answerContentInput");
    var imageInput = document.getElementById("image_input");
    var fileNameDisplay = document.getElementById("file_name");
    formData.append("content", content.value)
    if (!content.value) {
        alert("내용을 입력해라!");

        return;
    }
    if (imageInput.files.length > 0) {
        formData.append('image', imageInput.files[0])
    } else {
        console.log(formData)
    }
    try {
        const accessToken = localStorage.getItem("access");
        const response = await fetch(`${backend_base_url}/service/qna/${qnaId}/response/`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();

        alert("작성되었습니다");
        content.value = "";
        imageInput.value = ""; // 파일 입력 필드 초기화
        fileNameDisplay.textContent = ""; // 파일명 표시 초기화
    } catch (error) {
        // console.error("Error:", error);
        alert("관리자만 답변할 수 있습니다.")
    }
    renderFAQAnswer(qnaId)
}

function displayFileName() {
    var imageInput = document.getElementById("image_input");
    var fileNameDisplay = document.getElementById("file_name");

    if (imageInput.files.length > 0) {
        var fileName = imageInput.files[0].name;
        fileNameDisplay.textContent = "Selected File: " + fileName;
    } else {
        fileNameDisplay.textContent = ""; // 파일이 선택되지 않았을 때 빈 문자열로 설정
    }
}
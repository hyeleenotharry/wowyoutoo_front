import '../css/DetailFAQ.css'
import config from '../APIkey.js'

const backend_base_url = config.backend_base_url
const frontend_base_url = config.frontend_base_url
var data;

const urlParms = new URLSearchParams(window.location.search);
const noticeId = urlParms.get("notice_id"); // Replace with the actual FAQ ID

document.querySelector(".faqC_submit").onclick = () => {
    SubmitNotice();
};

window.onload = () => {
    $("#image_input").on('change', displayFileName)
};

async function SubmitNotice() {
    const formData = new FormData();
    var title = document.getElementById("title_text");
    var content = document.getElementById("content_text");
    var imageInput = document.getElementById("image_input");

    formData.append('title', title.value)
    formData.append('content', content.value)
    if (!title.value) {
        alert("제목을 입력해주세요.");
        return;
    }
    if (!content.value) {
        alert("내용을 입력해주세요.");
        return;
    }

    if (imageInput.files.length > 0) {
        formData.append('image', imageInput.files[0])
    } else {
        console.log(formData)
    }
    console.log(formData)
    try {
        const accessToken = localStorage.getItem("access");
        const response = await fetch(`${backend_base_url}/service/${noticeId}/`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        console.log("Success:", responseData);
    } catch (error) {
        console.error("Error:", error);
    }
    alert("공지사항이 수정되었습니다.");
    location.href = `${frontend_base_url}/templates/FAQList.html`;
};


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


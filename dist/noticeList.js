// import '../css/FAQList.css'
import config from '../APIkey.js'

const backend_base_url = config.backend_base_url
const frontend_base_url = config.frontend_base_url

window.onload = async function () {
    fetchFaqData()

}

// HTML에 데이터를 동적으로 추가하는 함수 - 공지사항
function renderNotice(data, containerId) {
    const container = document.getElementById(containerId);

    data.forEach(item => {
        const noticeItemDiv = document.createElement("div");
        noticeItemDiv.setAttribute("onclick", `window.location.href = '${frontend_base_url}/DetailNotice.html?notice_id=${item.id}'`);
        noticeItemDiv.classList.add("notice");

        const titleDiv = document.createElement("div");
        titleDiv.classList.add("notice_title");

        const titleText = document.createElement("h2");
        titleText.textContent = item.title;

        titleDiv.appendChild(titleText);

        const contentDiv = document.createElement("div");
        contentDiv.classList.add("notice_content");

        const contentText = document.createElement("p");
        contentText.textContent = item.content;

        contentDiv.appendChild(contentText);

        noticeItemDiv.appendChild(titleDiv);
        noticeItemDiv.appendChild(contentDiv);

        container.appendChild(noticeItemDiv);
    });
}


async function fetchFaqData() {
    let noticeData;
    try {
        // 공지사항 데이터 GET 요청
        const noticeResponse = await fetch(`${backend_base_url}/service/`, {
            headers: {
                "content-type": "application/json",
            },
            method: "GET",
        });

        if (!noticeResponse.ok) {
            throw new Error(
                `Notice Server returned an error ${noticeResponse.status}: ${noticeResponse.statusText}`
            );
        }

        noticeData = await noticeResponse.json();
        console.log("Notice Data:", noticeData);

        // 공지사항 데이터를 HTML에 렌더링
        renderNotice(noticeData, "noticeList");
        // 유저가 관리자인지 확인하는 로직 구현 필요
    } catch (error) {
        console.error('Error fetching data:', error);
        // Handle the error appropriately
    }
}
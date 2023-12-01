
import config from '../APIkey.js'

const backend_base_url = config.backend_base_url
const frontend_base_url = config.frontend_base_url

function renderFAQ(data, containerId) {
    const container = document.getElementById(containerId);

    data.forEach(item => {
        const faqItemDiv = document.createElement("div");
        faqItemDiv.classList.add("FAQ");
        faqItemDiv.setAttribute("onclick", `window.location.href = '${frontend_base_url}/DetailFAQ.html?qna_id=${item.id}'`);
        const titleDiv = document.createElement("div");
        titleDiv.classList.add("FAQ_title");

        const titleText = document.createElement("h2");
        titleText.textContent = item.title;

        titleDiv.appendChild(titleText);

        const contentDiv = document.createElement("div");
        contentDiv.classList.add("FAQ_content");

        const contentText = document.createElement("p");
        contentText.textContent = item.content;

        contentDiv.appendChild(contentText);

        faqItemDiv.appendChild(titleDiv);
        faqItemDiv.appendChild(contentDiv);
        container.appendChild(faqItemDiv);
        if (item.is_private) {
            const imageElement = document.createElement("img");
            imageElement.src = "../image/lock.png";;
            imageElement.alt = "관리자와 글쓴이 본인만 볼수있습니다";
            imageElement.classList.add("private-icon");
            faqItemDiv.appendChild(imageElement);
            imageElement.style.maxWidth = "50px";
            imageElement.style.maxHeight = "50px";
        }
    });
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

// 데이터를 HTML에 렌더링
// renderNotice(notices, "noticeList");
// renderFAQ(faqs, "faqList");

$(document).ready(async function () {
    let noticeData;
    let faqData;
    let currentUserIsAdmin = false;
    let currentPage = 1;
    const faqPerPage = 5; // 페이지당 FAQ 개수

    function updatePagination() {
        document.getElementById('current-page').textContent = currentPage;
    }
    async function fetchFaqData(page) {
        try {
            const response = await fetch(`${backend_base_url}/service/qna/?page=${page}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error(`Server returned an error ${response.status}: ${response.statusText}`);
            }

            const qnaData = await response.json();
            console.log('FAQ Data:', qnaData);

            // 데이터를 HTML에 렌더링
            const startIndex = (page - 1) * faqPerPage;
            const endIndex = startIndex + faqPerPage;
            const visibleFAQs = qnaData.results.slice(startIndex, endIndex);
            renderFAQ(visibleFAQs, 'faqList');
        } catch (error) {
            console.error('Error fetching Q&A data:', error);
            // Handle the error appropriately
        }
    }

    document.getElementById('prev-page').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
            fetchFaqData(currentPage);
        }
    });

    document.getElementById('next-page').addEventListener('click', () => {
        currentPage++;
        updatePagination();
        fetchFaqData(currentPage);
    });
    try {
        // FAQ 데이터 GET 요청
        const faqResponse = await fetch(`${backend_base_url}/service/qna/`, {
            headers: {
                "content-type": "application/json",
            },
            method: "GET",
        });

        if (!faqResponse.ok) {
            throw new Error(
                `FAQ Server returned an error ${faqResponse.status}: ${faqResponse.statusText}`
            );
        }

        faqData = await faqResponse.json();
        console.log("FAQ Data:", faqData);

        // FAQ 데이터를 HTML에 렌더링
        fetchFaqData(currentPage);

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
        currentUserIsAdmin = false;
        if (currentUserIsAdmin) {
            document.getElementById("superuser").style.display = "block";
        } else {
            document.getElementById("superuser").style.display = "none";
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        // Handle the error appropriately
    }
});



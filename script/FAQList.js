const notices = [
    {
        "title": "공지사항 제목 1",
        "content": "공지사항 내용 1",
        "image": "이미지 파일 또는 경로 1"
    },
    {
        "title": "공지사항 제목 2",
        "content": "공지사항 내용 2",
        "image": "이미지 파일 또는 경로 2"
    },
    {
        "title": "공지사항 제목 3",
        "content": "공지사항 내용 3",
        "image": "이미지 파일 또는 경로 3"
    },
    {
        "title": "공지사항 제목 4",
        "content": "공지사항 내용 4",
        "image": "이미지 파일 또는 경로 4"
    },
    {
        "title": "공지사항 제목 5",
        "content": "공지사항 내용 5",
        "image": "이미지 파일 또는 경로 5"
    }
    // ... 다른 공지사항 데이터
];

const faqs = [
    {
        "title": "FAQ 제목 1",
        "content": "FAQ 내용 1",
        "image": "이미지 파일 또는 경로 1",
        "is_private": true,
        "author": "작성자 1"
    },
    {
        "title": "FAQ 제목 2",
        "content": "FAQ 내용 2",
        "image": "이미지 파일 또는 경로 2",
        "is_private": false,
        "author": "작성자 2"
    },
    {
        "title": "FAQ 제목 3",
        "content": "FAQ 내용 3",
        "image": "이미지 파일 또는 경로 3",
        "is_private": false,
        "author": "작성자 3"
    },
    {
        "title": "FAQ 제목 4",
        "content": "FAQ 내용 4",
        "image": "이미지 파일 또는 경로 4",
        "is_private": true,
        "author": "작성자 4"
    },

    // ... 다른 FAQ 데이터
];
function renderFAQ(data, containerId) {
    const container = document.getElementById(containerId);

    data.forEach(item => {
        const faqItemDiv = document.createElement("div");
        if (item.is_private) {
            faqItemDiv.classList.add("FAQ", "locked");
            faqItemDiv.setAttribute("onclick", "window.open('DetailFAQ.html')");
            const titleDiv = document.createElement("div");
            titleDiv.classList.add("FAQ_title", "lock");

            const lockImage = document.createElement("img");
            lockImage.class = "imglock";
            lockImage.src = "../image/lock.png";
            lockImage.alt = "lock";

            const lockText = document.createElement("h3");
            lockText.innerHTML = "&nbsp;관리자와 작성자만 볼 수 있는 게시글입니다.";

            titleDiv.appendChild(lockImage);
            titleDiv.appendChild(lockText);

            faqItemDiv.appendChild(titleDiv);
        } else {
            faqItemDiv.classList.add("FAQ");
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
        }

        container.appendChild(faqItemDiv);
    });
}

// HTML에 데이터를 동적으로 추가하는 함수 - 공지사항
function renderNotice(data, containerId) {
    const container = document.getElementById(containerId);

    data.forEach(item => {
        const noticeItemDiv = document.createElement("div");
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
renderNotice(notices, "noticeList");
renderFAQ(faqs, "faqList");

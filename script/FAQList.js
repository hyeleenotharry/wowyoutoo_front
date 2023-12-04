// import '../css/FAQList.css'
import config from '../APIkey.js'

const backend_base_url = config.backend_base_url
const frontend_base_url = config.frontend_base_url

window.onload = async function() {
    renderFAQList(1);
    const articlesContainer = document.getElementById('articles');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
}

async function renderFAQList(page) {
    // Fetch FAQ detail
    const response = await fetch(`${backend_base_url}/service/qna/?page=${page}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'GET',
    });
    const faqList = await response.json();
    console.log(faqList)
    $('#articles').empty()
    faqList.results.forEach((faq) => {
        let id = faq['id']
        let title = faq['title']
        let author = `글쓴이:${faq['author']["nickname"]}`
        let question_type = `질문유형:${faq['question_type']}`
        let created_at = `작성일:${faq['created_at']}`
        let image
        if (faq['is_private']) {
            image = "../image/lock.png";
        } else {
            image = "../image/open.png"
        }
        let is_answered 
        if (faq['is_answered']) {
            is_answered = "해결되었습니다"
        } else {is_answered="아직 답변이 없습니다"}

        //id 아래에 붙여야 하로 <div class = "col"> 부터
        let temp_html = `<article class="art">
    <div class="article-wrapper">
        <a href = '${frontend_base_url}/templates/DetailFAQ.html?qna_id=${id}'>
        ${id}
        </a>
        <div class="article-body">
            <h2>${title}</h2>
            <figure>
            <img src="${image}" alt="" />
            </figure>
            <p>
                ${author}
            </p>
            <p>
            ${is_answered}
            </p>
            <p>
            ${question_type}
            </p>
            <p>
            ${created_at}
            </p>
        </div>
    </div>
    </article>`
        $('#articles').append(temp_html)

    })
};

let currentPage = 1;

prevButton.addEventListener('click', function() {
    if (currentPage > 1) {
        currentPage--;
        renderFAQList(currentPage)
    }
});

// 다음 페이지 버튼 클릭 시 이벤트 처리
nextButton.addEventListener('click', function() {
    currentPage++;
    renderFAQList(currentPage)
});
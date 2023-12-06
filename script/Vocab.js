import config from '../APIkey.js'

const frontend_base_url = "http://127.0.0.1:5500";
const backend_base_url = config.backend_base_url;


let data = [
    {
        "word": "Apple",
        "correct": "사과",
        "wrong": ["배", "오렌지", "바나나"]
    },
    {
        "word": "Car",
        "correct": "자동차",
        "wrong": ["비행기", "자전거", "트럭"]
    },
    {
        "word": "Book",
        "correct": "책",
        "wrong": ["신문", "잡지", "만화책"]
    },
    {
        "word": "Computer",
        "correct": "컴퓨터",
        "wrong": ["냉장고", "세탁기", "전화기"]
    },
    {
        "word": "Sun",
        "correct": "태양",
        "wrong": ["달", "별", "구름"]
    },
    {
        "word": "Coffee",
        "correct": "커피",
        "wrong": ["차", "우유", "주스"]
    },
    {
        "word": "Dog",
        "correct": "개",
        "wrong": ["고양이", "원숭이", "토끼"]
    },
    {
        "word": "Rain",
        "correct": "비",
        "wrong": ["눈", "바람", "번개"]
    },
    {
        "word": "Mountain",
        "correct": "산",
        "wrong": ["바다", "호수", "평원"]
    },
    {
        "word": "Music",
        "correct": "음악",
        "wrong": ["미술", "체육", "수학"]
    }
]

let word_id

$(document).ready(async function () {
    console.log(localStorage.getItem('access'))
    if (!localStorage.getItem('access')) {
        document.getElementById('saveBtn').style.display = 'none'
        document.getElementById('meaning').style.marginTop = '-110px'
    }
    const response = await fetch(`${backend_base_url}/english/word/`, {
        headers: {
            "content-type": "application/json",
        },
        method: "GET",

    });
    if (!response.ok) {
        throw new Error(
            `Server returned an error ${response.status}: ${response.statustext}`
        );
    }
    data = await response.json()
    // console.log(data)

    initPage()
    // console.log(correct)
    $('#meaning').on('click', checkAnswer)
    $('#next').on('click', goNext)
    $('#pre').on('click', goPrev)
    $('#saveBtn').on('click', saveWords)
});

const data_length = data.length
let correct = ''
let i = 0


// 리스트 셔플
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function initPage() {
    console.log("init page")
    $('#en-word').empty() // 먼저 이전 페이지 지움
    $('#meaning').empty()
    $('#page-btn').empty()
    // data가 시작이면 이전 버튼 없애기 , 끝이면 다음 버튼 없애기
    let page_btn = ``
    if (i == 0) {
        page_btn = `
        
        <button class="btn-arrow btn-arrow-right" title="Next" id="next" 
            style="background-color: transparent; border: none;">Next</button>
        `
        // $('#page-btn').append(page_btn)
    } else if (i == data_length - 1) {
        page_btn = `
        <button class="btn-arrow btn-arrow-left" title="Previous" id="pre" 
            style="background-color: transparent; border: none; margin-right: 1350px;">Previous</button>
        `
    } else {
        page_btn = `
        <button class="btn-arrow btn-arrow-left" title="Previous" id="pre" 
            style="background-color: transparent; border: none; margin-right: 1350px;">Previous</button>
        
        <button class="btn-arrow btn-arrow-right" title="Next" id="next" 
            style="background-color: transparent; border: none;">Next</button>`

    }
    $('#page-btn').append(page_btn)

    word_id = data[i]['id']

    let engWord = data[i]["term"] // 단어
    correct = data[i]["meaning"] // 답
    // 틀린 답
    let wrong1 = data[i]["wrong"][0]
    let wrong2 = data[i]["wrong"][1]
    let wrong3 = data[i]["wrong"][2]

    let meanings = shuffle([correct, wrong1, wrong2, wrong3]) // 셔플

    let word_html = `<p class="title">${engWord}</p>`
    $('#en-word').append(word_html)

    meanings.forEach(a => {
        let meaning_html = `<li><button id="answer">${a}</button></li>`
        $('#meaning').append(meaning_html)
    });

}

function updatePage() {
    initPage();

    $('.answer').on('click', checkAnswer);
    $('#next').on('click', goNext);
    $('#pre').on('click', goPrev);
}


async function saveWords() {
    // console.log(word_id)
    const access = localStorage.getItem('access')
    const response = await fetch(`${backend_base_url}/english/wordsbook/${word_id}/`, {
        headers: {
            "Authorization": "Bearer " + access
        },
        method: "POST",

    }).then((res) => {
        return res.json()
    }).then((res) => {
        alert(res['message'])
    })
        .catch((error) => {
            alert(error.response.data['message'])
            console.log(error.response.data['message']);
            // Handle error
        });

}

// 푼 단어 문제 수 더하기
async function cntWords() {
    const access = localStorage.getItem('access')
    const response = await fetch(`${backend_base_url}/english/word/${word_id}/`, {
        headers: {
            "Authorization": "Bearer " + access
        },
        method: "POST",
    })
}


function checkAnswer(e) {
    let clickedButton = e.target;
    if (clickedButton.tagName === 'BUTTON') {
        const buttonText = clickedButton.textContent;
        if (buttonText == correct) {
            alert("정답입니다!")
            cntWords()
            // saveWords()
        } else {
            alert("오답입니다.")
        }

    }
}

function goNext() {

    i += 1
    updatePage()
}

function goPrev() {

    i -= 1
    updatePage()
}






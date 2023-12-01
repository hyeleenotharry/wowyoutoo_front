import config from '/APIkey.js'

$(document).ready(async function () {
    const backend_base_url = "api.wowyoutoo.me";
    const access = localStorage.getItem("access");
    const chatSocket = new WebSocket(
        `wss://${backend_base_url}/english/chat/?access=${access}`
    );

    // 메시지를 서버에서 수신하면
    chatSocket.onmessage = function (e) {
        const messages = JSON.parse(e.data);
        for (let i = 0; i < messages.length; i++) {
            if (i % 2) {
                showMyMessage(messages[i].content);
            } else {
                showBotMessage(messages[i].content);
            }
        }
    }

    chatSocket.onclose = function (e) {
        if (e.code === 5000) {
            alert("코인이 부족합니다. 코인 구매 페이지로 이동합니다.");
            window.location.href = `${config.frontend_base_url}/checkPage.html`;
        }
    }

    // $('#message-info').remove() 
    // $('#my-message').remove()

    // 텍스트박스에 커서
    document.querySelector('#chat-txt').focus();
    // enter를 누르면 click
    document.querySelector('#chat-txt').onkeyup = function (e) {
        if (e.key === 'Enter') {  // enter, return
            document.querySelector('#chat-btn').click();
        }
    };

    document.querySelector("#new-chat").onclick = (e) => {
        chatSocket.close(1000);
        location.reload();
    }

    // 버튼을 클릭하면 해당 버틍의 innerText 가 출력
    // function handleButtonClick(event) {
    //     const clickedButton = event.target;
    //     if (clickedButton.tagName === 'BUTTON') {
    //         const buttonText = clickedButton.textContent;
    //         console.log(`Clicked button text: ${buttonText}`);
    //     }
    // }


    // $('#message-chat').on('click', handleButtonClick);

    // 메시지 입력 시
    document.querySelector('#chat-btn').onclick = function (e) {
        const my_chat = $('#chat-txt').val();
        showMyMessage(my_chat);
        $('#chat-txt').val('')
        chatSocket.send(JSON.stringify({
            "role": "user",
            'content': my_chat
        }));
    }
});


// 내 메시지 띄우기
function showMyMessage(message) {
    let today = new Date();

    let hours = today.getHours(); // 시
    let minutes = today.getMinutes();  // 분
    const chat_html = `
    <div class="message my-message" id="my-message">
            <div class="message-body">
                <div class="message-body-inner">
                    <div class="message-info">
                        <h4> Me </h4>
                        <h5> <i class="fa fa-clock-o"></i> ${hours}:${minutes} </h5>
                    </div>
                    <hr>
                    <div class="message-text">
                        ${message}
                    </div>
                </div>
            </div>
            <br>
        </div>
    `
    $('#message-chat').append(chat_html)
}


// 봇의 대화 띄우기
async function showBotMessage(message) {
    let today = new Date();

    let hours = today.getHours(); // 시
    let minutes = today.getMinutes();  // 분
    const temp_html = `
    <div class="message info">
            <img alt="" class="img-circle medium-image" src="/Wow.png">

            <div class="message-body">
                <div class="message-info">
                    <h4> ChatBot </h4>
                    <h5> <i class="fa fa-clock-o"></i> ${hours}:${minutes} </h5>
                </div>
                <hr>
                <div class="message-text">
                    ${message}
                </div>
            </div>
            <br>
        </div>
    `
    $('#message-chat').append(temp_html)
}
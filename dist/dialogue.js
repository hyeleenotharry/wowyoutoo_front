import config from '/APIkey.js'

$(document).ready(async function () {
    const backend_base_url = "api.wowyoutoo.me";
    const access = localStorage.getItem("access");
    const chatSocket = new WebSocket(
        `wss://${backend_base_url}/english/chat/?access=${access}`
    );

    const chatBtn = document.querySelector('#chat-btn');
    const chatInput = document.querySelector("#chat-txt");

    // 메시지를 서버에서 수신하면
    chatSocket.onmessage = async function (e) {
        const messages = await JSON.parse(e.data);
        for (let i = 0; i < messages.length; i++) {
            if (i % 2) {
                showMyMessage(messages[i].content);
            } else {
                showBotMessage(messages[i].content);
            }
        }
        window.scrollTo(0, document.body.scrollHeight);
    }

    chatSocket.onclose = function (e) {
        if (e.code === 1006) {
            alert("로그인이 필요합니다.")
            window.location.href = `${config.frontend_base_url}/login.html`;
        }
        else if (e.code === 1011) {
            alert("코인이 부족합니다. 코인 구매 페이지로 이동합니다.");
            window.location.href = `${config.frontend_base_url}/checkPage.html`;
        }
    }

    // 텍스트박스에 커서
    chatInput.focus();
    // enter를 누르면 click
    chatInput.onkeyup = function (e) {
        if (e.key === 'Enter') {  // enter, return
            chatBtn.click();
        }
    };

    document.querySelector("#new-chat").onclick = (e) => {
        chatSocket.close(1000);
        location.reload();
    }

    // 메시지 입력 시
    chatBtn.onclick = function (e) {
        const my_chat = chatInput.value.trim();
        if (my_chat === "") return;
        showMyMessage(my_chat);
        chatInput.value = "";
        chatSocket.send(JSON.stringify({
            "role": "user",
            'content': my_chat
        }));
        window.scrollTo(0, document.body.scrollHeight);
        chatBtn.disabled = true;
    }
});

// 내 메시지 띄우기
function showMyMessage(message) {
    let today = new Date();

    let hours = today.getHours(); // 시
    let minutes = today.getMinutes();  // 분
    const chat_html = `
    <div class="message my-message" id="my-message">
        <img alt="" class="img-circle medium-image" src="https://bootdey.com/img/Content/avatar/avatar1.png">
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
function showBotMessage(message) {
    let today = new Date();

    let hours = today.getHours(); // 시
    let minutes = today.getMinutes();  // 분
    const temp_html = `
    <div class="message info">
        <img alt="" class="img-circle medium-image" src="Wow.png">
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
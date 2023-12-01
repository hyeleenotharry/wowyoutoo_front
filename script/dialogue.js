$(document).ready(async function () {
    const backend_base_url = "api.wowyoutoo.me";
    const access = localStorage.getItem("access");
    const chatSocket = new WebSocket(
        `ws://${backend_base_url}/english/chat/?access=${access}`
    );

    // 메시지를 서버에서 수신하면
    chatSocket.onmessage = function (e) {
        const data = JSON.parse(e.data);
        console.log(data);
        if (!Array.isArray(data)) {
            const { situation, your_role, my_role, objective } = data;
            $("#situation").text(situation);
            $("#ai-role").text(your_role);
            $("#my-role").text(my_role);
            $("#objective").text(objective);
        } else {
            for (let i = 0; i < data.length; i++) {
                if (i % 2) {
                    sendMyMessage(chatSocket);
                } else {
                    showBotMessage(data[i].content);
                }
            }
        }
        // showDialogue(data.content);
    };

    // chatSocket.onclose

    $('#message-info').remove()  // 기존에 있을 수 있는 단어 모두 지우고
    $('#my-message').remove()

    // 텍스트박스에 커서
    document.querySelector('#chat-txt').focus();
    // enter를 누르면 click
    document.querySelector('#chat-txt').onkeyup = function (e) {
        if (e.key === 'Enter') {  // enter, return
            document.querySelector('#chat-btn').click();
        }
    };

    $("#new-chat").click((e) => {
        chatSocket.close(1000);
        location.reload();
    })

    // 버튼을 클릭하면 해당 버틍의 innerText 가 출력
    function handleButtonClick(event) {
        const clickedButton = event.target;
        if (clickedButton.tagName === 'BUTTON') {
            const buttonText = clickedButton.textContent;
            console.log(`Clicked button text: ${buttonText}`);
        }
    }


    $('#message-chat').on('click', handleButtonClick);

    // 메시지 입력 시
    document.querySelector('#chat-btn').onclick = function (e) {
        let today = new Date();

        let hours = today.getHours(); // 시
        let minutes = today.getMinutes();  // 분

        let my_chat = $('#chat-txt').val()
        let chat_html = `
        <div class="message my-message" id="my-message">


                <div class="message-body">
                    <div class="message-body-inner">
                        <div class="message-info">
                            <h4> Me </h4>
                            <h5> <i class="fa fa-clock-o"></i> ${hours}:${minutes} </h5>
                        </div>
                        <hr>
                        <div class="message-text">
                            ${my_chat}
                        </div>
                    </div>
                </div>
                <br>
            </div>
        `
        $('#message-chat').append(chat_html)
        $('#chat-txt').val('')
        chatSocket.send(JSON.stringify({
            "role": "user",
            'content': my_chat
        }));
    }
});

function initAIChat() {

}


// 채팅 입력
function sendMyMessage(chatSocket) {
    let today = new Date();

    let hours = today.getHours(); // 시
    let minutes = today.getMinutes();  // 분

    let my_chat = $('#chat-txt').val()
    let chat_html = `
    <div class="message my-message" id="my-message">
            <div class="message-body">
                <div class="message-body-inner">
                    <div class="message-info">
                        <h4> Me </h4>
                        <h5> <i class="fa fa-clock-o"></i> ${hours}:${minutes} </h5>
                    </div>
                    <hr>
                    <div class="message-text">
                        ${my_chat}
                    </div>
                </div>
            </div>
            <br>
        </div>
    `
    $('#message-chat').append(chat_html)
    $('#chat-txt').val('')
    chatSocket.send(JSON.stringify({
        'role': "user",
        "content": my_chat,
    }));
}


// 차례대로 대화를 띄운다.
async function showBotMessage(message) {
    let today = new Date();

    let hours = today.getHours(); // 시
    let minutes = today.getMinutes();  // 분
    const temp_html = `
    <div class="message info">
            <img alt="" class="img-circle medium-image" src="../image/Wow.png">

            <div class="message-body">
                <div class="message-info">
                    <h4> WowYouToo </h4>
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
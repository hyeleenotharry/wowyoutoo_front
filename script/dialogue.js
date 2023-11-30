// import '../css/dialogue.css'
// const data = {
//     A: [
//         ["hello?", "how", "are", "you", "today?"],
//         ["But", "your", "condition", "doesn't", "look", "good"],
//         ["Oh,", "I", "understand.", "Take", "your", "time", "and", "eat", "something."]
//     ],
//     B: [
//         ["난 괜찮아요. 물어봐줘서 고마워요."],
//         ["I'm", "nice", "thank", "you", "for", "asking."],
//         ["내가 점심을 안 먹어서 그런 것 같아요."]
//         ["I", "think", "It's", "because", "I", "didn't", "have", "a", "lunch."],

//     ]
// };

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
        'message': my_chat
    }));
}


//우선 첫 번째 발화 띄우기
$(document).ready(async function () {

    const chatSocket = new WebSocket(
        'ws://localhost:8000/english/chat/'
    );

    chatSocket.onmessage = function (e) {
        const data = JSON.parse(e.data);
        showDialogue(data.message);
    };

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
            'message': my_chat
        }));
    }


    // let data_len = 0
    // for (const key in data) {
    //     data_len += data[key].length
    // }
    // console.log(data_len)

    // for (const item in data["A"]) {
    //     console.log(data["A"])
    //     for (const words in data["A"][item]) {
    //         // console.log(data[key][item][words])

    //         const wrd = data["A"][item][words]

    //         data["A"][item][words] = `<button id="${wrd}">${wrd}</button>` // 단어 저장 url 을 # 자리에

    //     }
    // }
    // console.log(data)
    // 첫번째 대화
    // let today = new Date();

    // let hours = today.getHours(); // 시
    // let minutes = today.getMinutes();  // 분

    // const word_html = data["A"][0].join(" ")
    // const temp_html = `
    // <div class="message info">
    //         <img alt="" class="img-circle medium-image" src="../image/Wow.png">

    //         <div class="message-body">
    //             <div class="message-info">
    //                 <h4> WowYouToo </h4>
    //                 <h5> <i class="fa fa-clock-o"></i> ${hours}:${minutes} </h5>
    //             </div>
    //             <hr>
    //             <div class="message-text">
    //                 ${word_html}
    //             </div>
    //         </div>
    //         <br>
    //     </div>
    // `
    // $('#message-chat').append(temp_html)


})


// 차례대로 대화를 띄운다.
async function showDialogue(message) {
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
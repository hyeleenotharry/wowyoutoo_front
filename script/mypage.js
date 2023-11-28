import config from '../APIkey.js'

const backend_base_url = config.backend_base_url
const frontend_base_url = config.frontend_base_url

function handlePersonalInfo(e) {
    // console.log(e.target.text)
    const nickname = document.getElementById("nickname")
    const email = document.getElementById("email")
    const profile_img = document.getElementById("profile-img")

    nickname.style.display = 'none'
    email.style.display = 'none'
    profile_img.style.display = 'none'

    const new_nick = document.getElementById("new-nick")
    const ex_pwd = document.getElementById("ex-pwd")
    const new_pwd1 = document.getElementById("new-pwd1")
    const new_pwd2 = document.getElementById("new-pwd2")
    const new_img = document.getElementById("new-img")


    new_nick.style.display = 'block'
    ex_pwd.style.display = 'block'
    new_pwd1.style.display = 'block'
    new_pwd2.style.display = 'block'
    new_img.style.display = 'block'

    const submit = document.getElementById('modify')

    submit.innerText = "수정 완료"

    readjustMenu()
}

async function changePersonalInfo() {
    const access = localStorage.getItem('access')

    const uid = JSON.parse(localStorage.getItem('payload'))['user_id']
    const new_nickname = document.getElementById("nick-val").value
    const ex_password = document.getElementById("ex-pwd-val").value
    const new_password1 = document.getElementById("new-pwd-val1").value
    const new_password2 = document.getElementById("new-pwd-val2").value

    let formData = new FormData()

    try {
        if (document.getElementById("new-profile-img").files[0]) {
            formData.append(
                "profile_img",
                document.getElementById("new-profile-img").files[0]
            );
            console.log(document.getElementById("new-profile-img").files[0])
        }
    } catch (error) {
        console.log(error.response)
    }

    if (ex_password == undefined) {
        alert("기존 비밀번호는 필수로 입력해주세요")
    }

    if (new_password1.val != new_password2.val) {
        alert("입력한 비밀번호와 비밀번호 확인이 다릅니다.")
    } else {
        formData.append('nickname', new_nickname)
        formData.append("present_pw", ex_password)

        formData.append('password', new_password1)
        formData.append('password_check', new_password2)


        try {
            const response = await fetch(`${backend_base_url}/accounts/profile/${uid}/`, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
                method: 'PUT',
                body: formData

            }).then((res) => {
                if (res.status == 200) {
                    alert("프로필 수정이 완료되었습니다.")
                    window.location.reload()
                }
            })
        } catch (error) {
            console.log(error.response.data['message'])
        }

    }

}

function handleProfile(e) {
    if (e.target.text == "프로필 수정") {
        handlePersonalInfo()
    } else {
        changePersonalInfo()
    }
}

function readjustMenu() {
    var profileBox = document.getElementById('profile-box');
    var menu = document.getElementById('menu-box');
    var profileBoxHeight = profileBox.offsetHeight;
    console.log(profileBoxHeight)
    profileBox.style.marginTop = -450 + 'px'
    menu.style.marginTop = 600 + 'px';
}


function gotoWord() {
    window.location.href = "../templates/myWord.html"
}

function gotoReading() {
    window.location.href = "../templates/myWord.html"
}

async function getProfile() {
    const uid = JSON.parse(localStorage.getItem('payload'))['user_id']

    const access = localStorage.getItem('access')
    // console.log(`Bearer ${access}`)
    try {
        const response = await fetch(`${backend_base_url}/accounts/profile/${uid}/`, {
            headers: {
                'Authorization': `Bearer ${access}`
            },
            method: 'GET'
        }).then((res) => {
            // console.log(res.json())
            if (res.status == 200) {
                return res.json()
            }
        }).then((res) => {
            // 프로필 정보
            const nick = document.getElementById('nickname')
            const email = document.getElementById('email')
            const img_url = document.getElementById('profile-img')

            var fullURL = backend_base_url + res['profile_img']
            // URL 디코딩
            var decodedURL = decodeURIComponent(fullURL);

            // "media/" 이후의 부분 추출
            var startIndex = decodedURL.indexOf("media/") + "media/".length;
            var extractedURL = decodedURL.substring(startIndex);

            console.log(extractedURL)

            nick.innerText = res['nickname']
            email.innerText = res['email']
            try {
                if (localStorage.getItem('provider')) {
                    $('#profile-img').attr("src", extractedURL);
                } else {
                    $('#profile-img').attr("src", fullURL);
                }
            } catch (error) {
                console.log(error)

            }


            // 내 단어 , 지문, 푼 문제 수
            const myWords = document.getElementById('word-quiz')
            const myReadings = document.getElementById('reading-quiz')
            const rank = document.getElementById('rank')

            myWords.innerText = res['word_nums']
            myReadings.innerText = res['reading_nums']
            rank.innerText = `${res['my_rank']} 위`

            // 새 프로필에 이전 정보

            $('#nick-val').val(res['nickname'])


        })
    }
    catch (error) {
        alert(error)
        window.location.href = '../templates/main.html'
    }

}


$(document).ready(function () {
    $('#modify').on('click', handleProfile)
    $('#my-word').on('click', gotoWord)
    $('#my-reading').on('click', gotoReading)

    const new_nick = document.getElementById("new-nick")
    const ex_pwd = document.getElementById("ex-pwd")
    const new_pwd1 = document.getElementById("new-pwd1")
    const new_pwd2 = document.getElementById("new-pwd2")
    const new_img = document.getElementById("new-img")

    new_nick.style.display = 'none'
    ex_pwd.style.display = 'none'
    new_pwd1.style.display = 'none'
    new_pwd2.style.display = 'none'
    new_img.style.display = 'none'
    try {
        if (localStorage.getItem('provider')) {
            const profile_btn = document.getElementById('modify')
            profile_btn.style.display = 'none'
        }
    } catch (error) {
        console.log(error)
    }

    getProfile()

})

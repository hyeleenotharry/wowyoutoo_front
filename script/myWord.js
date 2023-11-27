import config from '../APIkey.js'

const backend_base_url = config.backend_base_url
const frontend_base_url = config.frontend_base_url

let data = {}

let half_data = 0
const access = localStorage.getItem("access")

$(document).ready(async function () {

    const response = await fetch(`${backend_base_url}/english/wordsbook/`, {
        headers: {
            'Authorization': `Bearer ${access}`
        },
        method: 'GET'
    }).then((res) => {
        if (res.status == 200) {
            return res.json()
        }
    }).then((res) => {
        console.log(res)
        data = res
        half_data = data.length / 2
        console.log(half_data)
    })
        .catch((error) => {
            alert(error.response.data['message'])
            console.log(error.response.data['message']);
            // Handle error
        });

    // console.log("start")
    $('#english').empty()
    $('#korean').empty()
    $('#english-next').empty()
    $('#korean-next').empty()

    let i = 0

    let eng = '#english'
    let kor = '#korean'

    data.forEach(function (a) {
        // console.log(a)
        if (i >= half_data) {
            eng = '#english-next'
            kor = '#korean-next'
        }
        let eng_html = `
        <h3 class="word">${a["term"]}</h3>
        `
        let kor_html = `
        <h3 class="meaning">${a["meaning"]}</h3>`

        $(eng).append(eng_html)
        $(kor).append(kor_html)
        i += 1
    })
    let line_heigt = document.getElementById("v-line")
    if (half_data > 10) {
        line_heigt.style.height = 1400 + (half_data - 10) * 100 + "px"
    }

});
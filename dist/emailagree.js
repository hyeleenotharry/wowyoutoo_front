import config from '../APIkey.js'

const backend_base_url = config.backend_base_url;
const frontend_base_url = config.frontend_base_url;

$(document).ready(async function () {
    $('#next').on('click', checkAgree)
})

async function checkAgree() {
    const is_agree = 0
    if ($('#consent').is(':checked')) {
        is_agree = 1
    }
    const access = localStorage.getItem('access')
    const response = await fetch(`${backend_base_url}/accounts/tos/`, {
        headers: {
            'Authorization': `Bearer ${access}`
        },
        method: 'POST',
        body: {
            'is_agree': is_agree
        }
    }).then((res) => {
        if (res.status == 200) {
            window.location.href = 'main.html'
        } else {
            return res.json()
        }
    }).then((res) => {
        alert(res)
    })
}
import config from '../APIkey.js'

const backend_base_url = config.backend_base_url;
const frontend_base_url = config.frontend_base_url;

$(document).ready(async function () {
    $('#next').on('click', checkAgree)
})

async function checkAgree() {
    let is_agree = 0
    if ($('#consent').is(':checked')) {
        is_agree = 1
    }
    const access = localStorage.getItem('access')
    const response = await fetch(`${backend_base_url}/accounts/tos/`, {
        headers: {
            'Authorization': `Bearer ${access}`
        },
        method: 'POST',
        body: JSON.stringify({
            'is_agree': is_agree
        })
    }).then((res) => {
        if (res.status == 200) {
            window.location.href = `${frontend_base_url}/myPage.html`
        } else {
            return res.json()
        }
    }).then((res) => {
        console.log(res);
        alert(res);
    })
}
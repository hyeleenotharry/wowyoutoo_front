<<<<<<< HEAD
import config from '/APIkey.js'
=======
import config from '../APIkey.js'
>>>>>>> 8c9ebba335bbab1d64282c9c4aeb721283ec3679

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
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access}`
        },
        method: 'POST',
        body: JSON.stringify({
            "is_agree": is_agree
        })
    })
    const data = await response.json();
    alert(data.detail);
    if (response.ok) {
        window.location.href = `${frontend_base_url}/myPage.html`
    }
}
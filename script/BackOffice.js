import config from '../APIkey.js'

const backend_base_url = config.backend_base_url
const frontend_base_url = config.frontend_base_url

window.onload = () => {
    checkpermisson()
}


function gotoMain() {
    window.location.href = `${frontend_base_url}/templates/main.html`

}

function gotoMail() {
    window.location.href = '../templates/createMail.html'
}

function gotoNotice() {
    window.location.href = '../templates/CreateNotice.html'
}

function gotoAdmin() {
    window.location.href = `${backend_base_url}/admin/`
}

$(document).ready(function () {
    $('#main').on('click', gotoMain)
    $('#mail').on('click', gotoMail)
    $('#notice').on('click', gotoNotice)
    $('#admin').on('click', gotoAdmin)

})

async function checkpermisson() {
    try {
        const accessToken = localStorage.getItem("access");
        const response = await fetch(`${backend_base_url}/service/backoffice`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response.status!=200) {location.href = `${frontend_base_url}/templates/main.html`;}

    } catch (error) {
        console.error("Error:", error);
    }

}
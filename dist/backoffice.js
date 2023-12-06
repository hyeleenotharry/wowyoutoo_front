import config from '/APIkey.js'


const backend_base_url = config.backend_base_url
const frontend_base_url = config.frontend_base_url

window.onload = () => {
    checkpermisson()
}


function gotoMail() {
    window.location.href = 'createMail.html'
}

function gotoNotice() {
    window.location.href = 'CreateNotice.html'
}

function gotoAdmin() {
    window.location.href = `${backend_base_url}/admin/`
}

$(document).ready(function () {
    $('#mail').on('click', gotoMail)
    $('#notice').on('click', gotoNotice)
    $('#admin').on('click', gotoAdmin)

})

async function checkpermisson() {
    try {
        const accessToken = localStorage.getItem("access");
        const response = await fetch(`${backend_base_url}/service/ad_mail`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response.status != 200) {
            alert("관리자가 아닙니다");
            location.href = `main.html`;
        }

    } catch (error) {
        console.error("Error:", error);
    }

}
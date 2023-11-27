import config from '../APIkey.js'

const backend_base_url = config.backend_base_url
const frontend_base_url = config.frontend_base_url

const user_email = {
    "users": [
        {
            "name": "John Doe",
            "email": "john.doe@example.com"
        },
        {
            "name": "Alice Smith",
            "email": "alice.smith@example.com"
        },
        {
            "name": "Bob Johnson",
            "email": "bob.johnson@example.com"
        },
        {
            "name": "Emily Davis",
            "email": "emily.davis@example.com"
        },
        {
            "name": "Michael Wilson",
            "email": "michael.wilson@example.com"
        },
        {
            "name": "Sarah Brown",
            "email": "sarah.brown@example.com"
        },
        {
            "name": "David Lee",
            "email": "david.lee@example.com"
        },
        {
            "name": "Olivia Garcia",
            "email": "olivia.garcia@example.com"
        },
        {
            "name": "James Martinez",
            "email": "james.martinez@example.com"
        },
        {
            "name": "Emma Rodriguez",
            "email": "emma.rodriguez@example.com"
        }
    ]
}

async function submitMail() {
    const title = document.getElementById('title')
    const content = document.getElementById('content')
    // const img = document.getElementById('img')
    const image = document.querySelector("#img");

    let formData = new FormData();
    formData.append('title', title)
    formData.append('content', content)
    formData.append("image", image.files[0]);


    const response = await fetch(`${backend_base_url}/service/ad_mail/`, {
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST',
        body: formData
    })
    if (response.status == 200) {
        alert("메일이 정상적으로 전송되었습니다.")
        window.location.reload()
    } else {
        alert("메일을 보내는 과정 중 오류가 발생했습니다. 다시 한 번 시도해 주십시오")
        window.location.reload()
    }
}

$(document).ready(function () {
    $('#user-email').empty()
    user_email["users"].forEach(e => {
        let email_html = `
        <li>
                <input id="c1" type="checkbox" name="user-checkbox">
                <label for="c1" value=${e['email']}>${e['email']}</label>
            </li>`
        $('#user-email').append(email_html)
    });
    $('#selectAll').click(function () {
        var checked = $('#selectAll').is(':checked');

        if (checked)
            $("input[name=user-checkbox]").prop('checked', true);
        else
            $("input[name=user-checkbox]").prop('checked', false);
    });
    $('#subimt').on('click', submitMail)
})

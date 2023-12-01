import config from '../APIkey.js'


const backend_base_url = config.backend_base_url
const frontend_base_url = config.frontend_base_url

let reading_id = 0

function gotoDeatail() {
    localStorage.setItem('reading_id', reading_id)
    window.location.href = "ReadingDetail.html"
}

async function handleButtonClick(event) {
    const access = localStorage.getItem('access')
    const clickedButton = event.target;
    const element_cls = clickedButton.className
    if (element_cls === 'detail_btn') {
        reading_id = clickedButton.id
        gotoDeatail()
    } else {
        reading_id = clickedButton.id
        try {
            const delete_res = await fetch(`${backend_base_url}/english/readingbook/${reading_id}/`, {
                headers: {
                    'Authorization': `Bearer ${access}`,
                },
                method: 'DELETE'
            }).then((res) => {
                if (res.status == 200) {
                    alert('삭제가 완료되었습니다.')
                    window.location.reload()
                }
            })
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }
}

$(document).ready(async function () {
    const access = localStorage.getItem('access')
    $('#saved-psg').on('click', handleButtonClick)
    try {
        const response = await fetch(`${backend_base_url}/english/readingbook/`, {
            headers: {
                'Authorization': `Bearer ${access}`
            },
            method: 'GET'
        }).then((res) => {
            return res.json()
        }).then((res) => {
            const data = res
            $('#saved-psg').empty()
            data.forEach(e => {
                // console.log(e)

                let psg_html = `
                <div class="saved_psg">
                    <div class="saved_psg_title">
                      <h2>${e['title']}</h2>
                    </div>
                    <div class="saved_psg_content">
                      ${e['paragraph']}
                    </div>
                    <div style="display: flex;">
                        <button class="detail_btn" id="${e['id']}"> Detail
                        </button>
                        <button class="delete_btn" id="${e['id']}"> Delete
                        </button>
                    </div>
                </div>`
                $('#saved-psg').append(psg_html)
            });

        })
    } catch (error) {
        console.log(error)
    }
})
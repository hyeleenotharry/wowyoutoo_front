import config from '/APIkey.js'


$(document).ready(async function () {
    const uid = JSON.parse(localStorage.getItem('payload')).user_id

    const access = localStorage.getItem('access')
    const response = await fetch(`${config.backend_base_url}/accounts/profile/${uid}/`, {
        headers: {
            'Authorization': `Bearer ${access}`
        },
        method: 'GET'
    })
        .then((res) => {
            if (res.status == 200) {
                return res.json()
            }
            return res.json()
        })
        .then((res) => {
            // console.log(res['rankers'])
            let rankers = res['rankers']
            $('#rank').empty()
            let i = 1
            rankers.forEach(e => {

                let rank_html = `
                <div style="display: flex; margin-left: 43%; margin-top: 30px;">
            <h1>${i}</h1>
            <h1>${e}</h1>
        </div>
        <hr />`
                i += 1
                $('#rank').append(rank_html)
            });
        })
})
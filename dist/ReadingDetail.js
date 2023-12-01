import config from '../APIkey.js'


function showSolution() {
    const ansCheckDiv = document.querySelector(".solution_explain");
    ansCheckDiv.style.display = "block";
    // kursor.color("#ffffff");
}

function closeSolution() {
    const ansCheckDiv = document.querySelector(".solution_explain");
    ansCheckDiv.style.display = "none";
}

$(document).ready(async function () {
    const access = localStorage.getItem('access')
    const reading_id = localStorage.getItem('reading_id')

    // localStorage.removeItem('reading_id')
    try {
        const response = await fetch(`${config.backend_base_url}/english/readingbook/${reading_id}/`, {
            headers: {
                'Authorization': `Bearer ${access}`
            },
            method: 'GET'
        }).then((res) => {
            return res.json()
        }).then((res) => {
            const select_num = res['select']
            const correct_num = res['solution']

            $('#rp_fulltext_title').text(res['title'])
            $('#rp_fulltext_content').text(res['paragraph'])
            $('#rp_question_text').text(res['question'])


            $('#0').text(res['options'][0])
            $('#1').text(res['options'][1])
            $('#2').text(res['options'][2])
            $('#3').text(res['options'][3])
            $('#close-sol').on('click', closeSolution)

            $('#solution').on('click', showSolution)

            // 해설
            $('#solution_ans').text(`${res['solution'] + 1} 번`)
            $('#solution_content').text(res['explanation'])

            // 정답을 맞췄다면 
            if (select_num == correct_num) {
                const select_btn = document.getElementById(`${select_num}`)
                select_btn.style.backgroundColor = 'rgb(11, 99, 59, 0.7)'
            } else {
                const select_btn = document.getElementById(`${select_num}`)
                const correct_btn = document.getElementById(`${correct_num}`)
                select_btn.style.backgroundColor = 'rgb(255, 65, 57)'
                correct_btn.style.backgroundColor = 'rgb(11, 99, 59, 0.7)'
            }
        })
    } catch (error) {
        console.log(error)
        alert(error)
    }

})
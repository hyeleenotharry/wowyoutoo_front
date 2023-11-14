const data = {
    "vocabulary": [
        { "word": "Serendipity", "meaning": "우연한 발견" },
        { "word": "Ephemeral", "meaning": "덧없는, 순식간의" },
        { "word": "Quixotic", "meaning": "공상적인, 비현실적인" },
        { "word": "Lethargic", "meaning": "무기력한, 기운 없는" },
        { "word": "Nefarious", "meaning": "악행을 저지르는, 악랄한" },
        { "word": "Ubiquitous", "meaning": "어디에나 존재하는" },
        { "word": "Panacea", "meaning": "만병통치약" },
        { "word": "Zealous", "meaning": "열성적인, 열렬한" },
        { "word": "Mellifluous", "meaning": "달콤한, 감미로운" },
        { "word": "Ebullient", "meaning": "환희로 넘치는, 쾌활한" },
        { "word": "Sycophant", "meaning": "아첨꾼, 아부하는 사람" },
        { "word": "Idyllic", "meaning": "목가적인, 이상적인" },
        { "word": "Esoteric", "meaning": "소수만 아는, 비밀의" },
        { "word": "Cacophony", "meaning": "불협화음, 소란스러운 소리" },
        { "word": "Nostalgia", "meaning": "향수, 고향 그리움" },
        { "word": "Capitulate", "meaning": "항복하다, 굴복하다" },
        { "word": "Surreptitious", "meaning": "은밀한, 몰래 하는" },
        { "word": "Pernicious", "meaning": "치명적인, 해로운" },
        { "word": "Ephemeral", "meaning": "덧없는, 순식간의" },
        { "word": "Voracious", "meaning": "만족할 줄 모르는, 탐욕스러운" }
    ]
}

const half_data = data["vocabulary"].length / 2

$(document).ready(function () {
    // console.log("start")
    $('#english').empty()
    $('#korean').empty()
    $('#english-next').empty()
    $('#korean-next').empty()

    let i = 0

    let eng = '#english'
    let kor = '#korean'

    data["vocabulary"].forEach(function (a) {
        // console.log(a)
        if (i > half_data) {
            eng = '#english-next'
            kor = '#korean-next'
        }
        let eng_html = `
        <h3 class="word">${a["word"]}</h3>
        `
        let kor_html = `
        <h3 class="meaning">${a["meaning"]}</h3>`

        $(eng).append(eng_html)
        $(kor).append(kor_html)
        i += 1
    })
});
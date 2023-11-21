import config from '../APIkey.js'

const backend_base_url = config.backend_base_url
const frontend_base_url = config.frontend_base_url

$(document).ready(function () {
    console.log("base.js");
    try {
        const access = localStorage.getItem("access")
        if (access) {
            let login_html = `<li><a onclick="handleLogout()">Logout</a></li>`
            let dropdown_html = `
            <a href="${frontend_base_url}/templates/ReadingPrb.html">기존 지문</a>
            <a href="${frontend_base_url}/templates/ReadingPrb.html">지문 생성</a>`

            $('#nav-menu').append(login_html)
            $('#dropdown-content').append(dropdown_html)
        } else {
            console.log("로그아웃 상태")
            let login_html = `
                <li><a href="../templates/login.html">Login</a></li>
                <li><a href="../templates/login.html">Register</a></li>`
            let dropdown_html = `
                <a href="#">기존 지문</a>
            `

            $('#nav-menu').append(login_html)
            $('#dropdown-content').append(dropdown_html)
        }
    } catch (err) {
        console.log("로그아웃 상태")
        let login_html = `
        <li><a href="../templates/login.html">Login</a></li>
        <li><a href="../templates/login.html">Register</a></li>`
        let dropdown_html = `
            <a href="http://127.0.0.1:5500/templates/ReadingPrb.html">기존 지문</a>
            `

        $('#nav-menu').append(login_html)
        $('#dropdown-content').append(dropdown_html)
    }
})
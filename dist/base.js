import config from '../APIkey.js'

const backend_base_url = config.backend_base_url
const frontend_base_url = config.frontend_base_url

$(document).ready(function () {

    try {
        const access = localStorage.getItem("access")
        if (access) {
            let login_html = `<li><a onclick="handleLogout()">Logout</a></li>`
            let myPage_html = `<li><a href="myPage.html">My Page</a></li>`
            let faq_html = `<li><a href="FAQList.html">My Page</a></li>`
            let check_html = `<li><a href="checkPage.html">Payment</a></li>`
            let dropdown_html = `
            <a href="${frontend_base_url}/ExistedReading.html">기존 지문</a>
            <a href="${frontend_base_url}/ReadingPrb.html">지문 생성</a>`

            $('#nav-menu').append(login_html)
            $('#nav-menu').append(myPage_html)
            $('#nav-menu').append(check_html)
            $('#dropdown-content').append(dropdown_html)
        } else {

            let login_html = `
                <li><a href="login.html" style="cursor: pointer">Login</a></li>
                <li><a href="login.html">Register</a></li>`
            let dropdown_html = `
                <a href="ExistedReading.html">기존 지문</a>
            `

            $('#nav-menu').append(login_html)
            $('#dropdown-content').append(dropdown_html)
        }
    } catch (err) {

        let login_html = `
        <li><a href="login.html">Login</a></li>
        <li><a href="login.html">Register</a></li>`
        let dropdown_html = `
            <a href="ReadingPrb.html">기존 지문</a>
            `

        $('#nav-menu').append(login_html)
        $('#dropdown-content').append(dropdown_html)
    }
})
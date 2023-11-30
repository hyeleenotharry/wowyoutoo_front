import config from '../APIkey.js'


console.log("redirect_git")
const code = window.location.search;
console.log(code)


axios.post(`${config.backend_base_url}/accounts/github/login/`, { code: code })
    .then((response) => {
        if (response.status == 200) {
            localStorage.clear()
            console.log(response.data); // Log token and accompanying information
            const response_json = response.data;

            localStorage.setItem("access", response_json.access);
            localStorage.setItem("refresh", response_json.refresh);
            localStorage.setItem("provider", response_json.provider);

            // localStorage.setItem("payload", JSON.stringify(response_json.user_profile));

            const base64Url = response_json.access.split(".")[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const jsonPayload = decodeURIComponent(atob(base64).split("")
                .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
            );
            localStorage.setItem("payload", jsonPayload);

            alert("환영합니다.");
            window.location.replace(`${config.frontend_base_url}/templates/main.html`);
        } else if (response.status == 201) {
            localStorage.clear()
            alert("회원가입이 완료되었습니다. 로그인을 진행해주세요")
            window.location.href = '../templates/login.html'
        }

    })
    .catch((error) => {
        alert(error.response.data['error'])
        console.log(error.response.data['error']);
        window.location.href = '../templates/login.html'
        // Handle error
    });


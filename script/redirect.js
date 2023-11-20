import config from '../APIkey.js'

const code = window.location.search;
// console.log(code)


axios.post(`${config.backend_base_url}/accounts/kakao/login/`, { code: code })
    .then((response) => {
        localStorage.clear()
        // console.log(response.data.user_profile); // Log token and accompanying information
        const response_json = response.data;


        localStorage.setItem("access", response_json.access);
        localStorage.setItem("refresh", response_json.refresh);
        localStorage.setItem("profile", JSON.stringify(response_json.user_profile));

        alert("환영합니다.");
        window.location.replace(`${config.frontend_base_url}/templates/main.html`);


    })
    .catch((error) => {
        console.error('Error:', error);
        // Handle error
    });


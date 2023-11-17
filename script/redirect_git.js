import config from '../APIkey.js'

console.log("redirect_git")
const code = window.location.search;
console.log(code)


axios.post(`${config.backend_base_url}/accounts/github/login/`, { code: code })
    .then((response) => {
        localStorage.clear()
        console.log(response.data); // Log token and accompanying information
        const response_json = response.data;

        localStorage.setItem("access", response_json.access);

        localStorage.setItem("payload", JSON.stringify(response_json.user_profile));

        alert("환영합니다.");
        window.location.replace(`${config.frontend_base_url}/templates/main.html`);
    })
    .catch((error) => {
        console.error('Error:', error);
        // Handle error
    });


import config from '../APIkey.js'

console.log("redirect_git")
const queryString = window.location.search;
const params = new URLSearchParams(queryString);

// Get a specific parameter value by key
const code = params.get('code');
console.log(code);
if (code) {
    githubLogin();
}

async function githubLogin() {
    response = await fetch(`${config.backend_base_url}/accounts/github/login/`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            "code": code,
        })
    });
    console.log(response);
    if (!response.ok) {
        console.log(response);
        error = await response.json();
        console.log(error);
        return;
    }
    response_json = await response.json();
    console.log(response_json);
}






// axios.post(`${config.backend_base_url}/accounts/dj-rest-auth/github/`, { code: code })
//     .then((response) => {
//         localStorage.clear()
//         console.log(response.data); // Log token and accompanying information
//         const response_json = response.data;

//         localStorage.setItem("access", response_json.access);

//         // localStorage.setItem("payload", JSON.stringify(response_json.user_profile));

//         alert("환영합니다.");
//         window.location.replace(`${config.frontend_base_url}/templates/main.html`);
//     })
//     .catch((error) => {
//         console.log(error);
//         console.error('Error:', error);
//         // Handle error
//     });


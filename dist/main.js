// import '../css/main.css'
const linkElement = document.createElement("link");
linkElement.rel = "stylesheet";
linkElement.href = "../css/main.css"; // 여기에 CSS 파일 경로를 넣어야 해
document.head.appendChild(linkElement); // 문서의 head에 link 요소를 추가하여 CSS를 가져옴
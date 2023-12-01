
import config from '../APIkey.js'

const backend_base_url = config.backend_base_url
const frontend_base_url = config.frontend_base_url

const urlParams = new URLSearchParams(window.location.search);
const qna_id = urlParams.get("qna_id");

var data;

var category;

function showMenu(e) {
  // console.log(e.target)
  var value = e.target.innerText
  var dropbtn_content = document.querySelector(".dropbtn_content");
  var dropbtn_click = document.querySelector(".dropbtn_click");
  var dropbtn = document.querySelector(".dropbtn");
  category = value;
  // console.log(category);
  dropbtn_content.innerText = value;
  dropbtn_content.style.color = "#252525";
  dropbtn.style.borderColor = "#3992a8";
};


// let is_private=False

window.onload = () => {
  $("#image_input").on('change', displayFileName)
  var is_private = false;

  function check_private() {
    if (is_private == true) {
      is_private = false;
    } else {
      is_private = true;
    }
  };

  document.querySelector(".private_box").onclick = () => {
    check_private();
  };
  document.querySelector(".dropbtn_click").onclick = () => {
    dropdown();
  };
  // document.getElementsByClassName("fastfood").onclick = () => {
  //   showMenu(document.getElementsByClassName("fastfood").id);
  // };
  $('#category').on('click', showMenu)
  document.querySelector(".faqC_submit").onclick = () => {
    SubmitFAQ();
  };
  function dropdown() {
    var v = document.querySelector(".dropdown-content");
    var dropbtn = document.querySelector(".dropbtn");
    v.classList.toggle("show");
    dropbtn.style.borderColor = "rgb(94, 94, 94)";
  };


  async function SubmitFAQ() {
    var title = document.getElementById("title_text");
    var content = document.getElementById("content_text");
    var imageInput = document.getElementById("image_input");
    var question_type = category;
    if (!title.value) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!content.value) {
      alert("내용을 입력해주세요.");
      return;
    }
    if (!question_type) {
      alert("카테고리를 선택해주세요.");
      return;

    }

    if (imageInput.files.length > 0) {
      data = { "title": title.value, "content": content.value, "question_type": question_type, "is_private": is_private, "image": imageInput.files[0] };

    } else {
      data = { "title": title.value, "content": content.value, "question_type": question_type, "is_private": is_private, }; // 이미지가 선택되지 않았을 때 빈 문자열로 설정
    }

    try {
      const accessToken = localStorage.getItem("access");


      const response = await fetch(`${backend_base_url}/service/qna/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      console.log("Success:", responseData);
    } catch (error) {
      console.error("Error:", error);
    }

    alert("FAQ가 등록되었습니다.");
    location.href = `${frontend_base_url}/templates/FAQList.html`;
  }
};
;

window.onclick = (e) => {
  if (!e.target.matches(".dropbtn_click")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");

    var dropbtn_content = document.querySelector(".dropbtn_content");
    var dropbtn_click = document.querySelector(".dropbtn_click");
    var dropbtn = document.querySelector(".dropbtn");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
function displayFileName() {
  var imageInput = document.getElementById("image_input");
  var fileNameDisplay = document.getElementById("file_name");

  if (imageInput.files.length > 0) {
    var fileName = imageInput.files[0].name;
    fileNameDisplay.textContent = "Selected File: " + fileName;
  } else {
    fileNameDisplay.textContent = ""; // 파일이 선택되지 않았을 때 빈 문자열로 설정
  }
}



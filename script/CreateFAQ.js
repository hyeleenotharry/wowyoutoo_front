import '../css/CreateFAQ.css'

window.onload = () => {
  var category;
  var is_private;
  document.querySelector(".private_box").onclick = () => {
    check_private();
  };
  document.querySelector(".dropbtn_click").onclick = () => {
    dropdown();
  };
  document.getElementsByClassName("fastfood").onclick = () => {
    showMenu(value);
  };
  document.querySelector(".faqC_submit").onclick = () => {
    SubmitFAQ();
  };
  dropdown = () => {
    var v = document.querySelector(".dropdown-content");
    var dropbtn = document.querySelector(".dropbtn");
    v.classList.toggle("show");
    dropbtn.style.borderColor = "rgb(94, 94, 94)";
  };

  check_private = () => {
    if (is_private == true) {
      is_private = false;
    } else {
      is_private = true;
    }
  };
  showMenu = (value) => {
    var dropbtn_content = document.querySelector(".dropbtn_content");
    var dropbtn_click = document.querySelector(".dropbtn_click");
    var dropbtn = document.querySelector(".dropbtn");
    category = value;
    console.log(category);
    dropbtn_content.innerText = value;
    dropbtn_content.style.color = "#252525";
    dropbtn.style.borderColor = "#3992a8";
  };

  SubmitFAQ = async () => {
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
    if (title.value && content.value && question_type) {
      console.log(title.value, content.value, question_type, is_private);
      var formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("question_type", question_type);
      formData.append("is_private", is_private);

      // 이미지가 선택되었다면 FormData에 추가
      if (imageInput.files.length > 0) {
        formData.append("image", imageInput.files[0]);
      } else {
        formData.append("image", ""); // 이미지가 선택되지 않았을 때 빈 문자열로 설정
      }
      try {
        const response = await fetch(`${backend_base_url}/service/qna/${qna_id}/`, {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        console.log("Success:", responseData);
      } catch (error) {
        console.error("Error:", error);
      }

      alert("FAQ가 등록되었습니다.");
      location.href = `${backend_base_url}/service/qna/${qna_id}/`;
    }
  };
};

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

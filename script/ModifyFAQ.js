import '../css/DetailFAQ.css'
import config from '../APIkey.js'

const backend_base_url = config.backend_base_url
const frontend_base_url = config.frontend_base_url

const urlParams = new URLSearchParams(window.location.search);
const qna_id = urlParams.get("qna_id");

var data;

var category;

function showMenu(e){
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

  function check_private(){
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
  function dropdown(){
    var v = document.querySelector(".dropdown-content");
    var dropbtn = document.querySelector(".dropbtn");
    v.classList.toggle("show");
    dropbtn.style.borderColor = "rgb(94, 94, 94)";
  };



  // showMenu = (value) => {
  //   var dropbtn_content = document.querySelector(".dropbtn_content");
  //   var dropbtn_click = document.querySelector(".dropbtn_click");
  //   var dropbtn = document.querySelector(".dropbtn");
  //   category = value;
  //   console.log(category);
  //   dropbtn_content.innerText = value;
  //   dropbtn_content.style.color = "#252525";
  //   dropbtn.style.borderColor = "#3992a8";
  // };

  async function SubmitFAQ(){
    const formData = new FormData();
    var title = document.getElementById("title_text");
    var content = document.getElementById("content_text");
    var imageInput = document.getElementById("image_input");

    formData.append('title',title.value)
    formData.append('content',content.value)
    if (!title.value) {
        alert("제목을 입력해주세요.");
        return;
    }
    if (!content.value) {
        alert("내용을 입력해주세요.");
        return;
    }

    if (imageInput.files.length > 0) {
        // data = {
        //     "title": title.value,
        //     "content": content.value,
        //     "image": imageInput.files[0]
        // };
        formData.append('image',imageInput.files[0])
    } else {
        // data = {
        //     "title": title.value,
        //     "content": content.value
        // }; // 이미지가 선택되지 않았을 때 빈 문자열로 설정
        console.log(formData)
    }
    console.log(formData)
    
    try {
      const accessToken = localStorage.getItem("access");
      console.log(qna_id)
      
      const response = await fetch(`${backend_base_url}/service/qna/${qna_id}/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // "Content-Type": "application/json",
          },
        body: formData,
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
      
      alert("FAQ가 수정되었습니다.");
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


// �� ��ҿ� FAQ �����͸� �ҷ����� ���� �Լ�
// async function loadFAQData() {
//   const access = localStorage.getItem('access')
//   var formData = new formData()

//   const faq_title = $('#title_text').val()
//   const faq_content = $('#content_text').val()
//   const is_private = $('#private').is(":checked")
//   const question_type = $('#category').val()

//   // 이미지
//   try {
//     if (document.getElementById("image_input").files[0]) {
//         formData.append(
//             "image",
//             document.getElementById("image_input").files[0]
//         );
//         console.log(document.getElementById("image_input").files[0])
//     }
//   } catch (error) {
//       console.log(error.response)
//       alert(error)
//   }

//   formData.append('title', faq_title)
//   formData.append('content', faq_content)
//   formData.append('is_private', is_private)
//   formData.append('question_type', question_type)
  
//   try {
//     const response = await fetch(
//       `${config.backend_base_url}/service/qna/${qna_id}/`,{
//         headers: {
//           'Authorization': `Bearer ${access}`
//         },
//         method: 'PUT',
//         body: formData
//       }
      
//     );

//     if (!response.ok) {
//       throw new Error(
//         `Server returned an error ${response.status}: ${response.statusText}`
//       );
//     } else {
//       window.location.href = '../templates/FAQList.html'
//     }

//     const faqData = await response.json();

//     // ���� FAQ ������ ä���
//     // document.getElementById("faqEditTitle").value = faqData.title;
//     // document.getElementById("faqEditContent").value = faqData.content;
//   } catch (error) {
//     console.error("Error loading FAQ data:", error);
//     // Handle the error appropriately
//   }
// }

// // ������ �ε� �� FAQ �����͸� �̸� �ҷ�����
// document.addEventListener("DOMContentLoaded", function () {
//   loadFAQData();
// });
// const editBtn = document.getElementById("editCompleteButton");
// editBtn.addEventListener("click", updateFAQ(qna_id));
// // FAQ ���� ��û�� ������ �Լ�
// async function updateFAQ(qna_id) {
//   const editedTitle = document.getElementById("faqEditTitle").value;
//   const editedContent = document.getElementById("faqEditContent").value;
//   try {
//     const response = await fetch(
//       `${config.backend_base_url}/service/qna/${qna_id}/`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer YOUR_ACCESS_TOKEN", // �ʿ��� ��� ��ū�� �߰�
//         },
//         body: JSON.stringify({ 
//             title: editedTitle, 
//             content: editedContent 
//         }),
//       }
//     );

//     if (!response.ok) {
//       throw new Error(
//         `Server returned an error ${response.status}: ${response.statusText}`
//       );
//     }

//     // ������ �����ϸ� ���� �������� �̵� �Ǵ� �ٸ� ���� ����
//     alert("FAQ�� �����Ǿ����ϴ�.");
//     window.location.href = `${config.backend_base_url}/service/qna/${qna_id}/`;
//   } catch (error) {
//     console.error("Error updating FAQ:", error);
//     // Handle the error appropriately
//   }
// }

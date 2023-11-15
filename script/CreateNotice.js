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
  async function submitFAQ() {
    var title = document.getElementById("title_text").value;
    var content = document.getElementById("content_text").value;
    var imageInput = document.getElementById("image_input");

    if (title === "") {
      alert("제목을 입력해주세요.");
      return;
    }
    if (content === "") {
      alert("내용을 입력해주세요.");
      return;
    }

    console.log(title, content);

    var formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    // 이미지가 선택되었다면 FormData에 추가
    if (imageInput.files.length > 0) {
      formData.append("image", imageInput.files[0]);
    } else {
      formData.append("image", ''); // 이미지가 선택되지 않았을 때 빈 문자열로 설정
    }

    try {
      const response = await fetch("http://127.0.0.1:8000", {
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
  }
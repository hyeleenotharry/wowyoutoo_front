function displayFileName() {
    var imageInput = document.getElementById("image_input");
    var fileNameDisplay = document.getElementById("file_name");
  
    if (imageInput.files.length > 0) {
      var fileName = imageInput.files[0].name;
      fileNameDisplay.textContent = "Selected File: " + fileName;
    } else {
      fileNameDisplay.textContent = ""; // ������ ���õ��� �ʾ��� �� �� ���ڿ��� ����
    }
  }
  async function submitFAQ() {
    var title = document.getElementById("title_text").value;
    var content = document.getElementById("content_text").value;
    var imageInput = document.getElementById("image_input");

    if (title === "") {
      alert("������ �Է����ּ���.");
      return;
    }
    if (content === "") {
      alert("������ �Է����ּ���.");
      return;
    }

    console.log(title, content);

    var formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    // �̹����� ���õǾ��ٸ� FormData�� �߰�
    if (imageInput.files.length > 0) {
      formData.append("image", imageInput.files[0]);
    } else {
      formData.append("image", ''); // �̹����� ���õ��� �ʾ��� �� �� ���ڿ��� ����
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
(()=>{const t="http://localhost:8000";document.getElementById("answerSubmitBtn").addEventListener("click",async function(e){var n=document.getElementById("answerContentInput");if(n.value){var o=new FormData;o.append("content",n.value);try{const n=await fetch(`${t}/service/qna/${e}/`,{method:"POST",body:o});if(!n.ok)throw new Error(`HTTP error! Status: ${n.status}`);const a=await n.json();console.log("Success:",a),alert("�亯�� ��ϵǾ����ϴ�.")}catch(t){console.error("Error:",t)}}else alert("������ �Է����ּ���.")}(qna_id)),window.onload=function(){!async function(e){try{const e=await fetch(`${t}/service/qna/123/`,{headers:{"Content-Type":"application/json"},method:"GET"});if(!e.ok)throw new Error(`Server returned an error ${e.status}: ${e.statusText}`);const n=await e.json();document.getElementById("faqCategory").textContent=n.question_type,document.getElementById("faqTitle").textContent=n.title,document.getElementById("faqAuthor").textContent=n.username,document.getElementById("faqDate").textContent=n.created_at,document.getElementById("faqContent").textContent=n.content}catch(t){console.error("Error fetching FAQ detail:",t)}}()}})();
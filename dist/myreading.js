(()=>{"use strict";const t="http://127.0.0.1:8000";let e=0;async function a(a){const n=localStorage.getItem("access"),s=a.target;if("detail_btn"===s.className)e=s.id,localStorage.setItem("reading_id",e),window.location.href="../templates/ReadingDetail.html";else{e=s.id;try{await fetch(`${t}/english/readingbook/${e}/`,{headers:{Authorization:`Bearer ${n}`},method:"DELETE"}).then((t=>{200==t.status&&(alert("삭제가 완료되었습니다."),window.location.reload())}))}catch(t){console.log(t),alert(t)}}}$(document).ready((async function(){const e=localStorage.getItem("access");$("#saved-psg").on("click",a);try{await fetch(`${t}/english/readingbook/`,{headers:{Authorization:`Bearer ${e}`},method:"GET"}).then((t=>t.json())).then((t=>{const e=t;$("#saved-psg").empty(),e.forEach((t=>{let e=`\n                <div class="saved_psg">\n                    <div class="saved_psg_title">\n                      <h2>${t.title}</h2>\n                    </div>\n                    <div class="saved_psg_content">\n                      ${t.paragraph}\n                    </div>\n                    <div style="display: flex;">\n                        <button class="detail_btn" id="${t.id}"> Detail\n                        </button>\n                        <button class="delete_btn" id="${t.id}"> Delete\n                        </button>\n                    </div>\n                </div>`;$("#saved-psg").append(e)}))}))}catch(t){console.log(t)}}))})();
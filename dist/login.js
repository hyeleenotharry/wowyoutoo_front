(()=>{"use strict";const e="http://127.0.0.1:5500",t="http://127.0.0.1:8000",n="d4c3cf94add403608578",a=document.createElement("link");a.rel="stylesheet",a.href="../css/login.css",document.head.appendChild(a);const s=e,i=t;async function o(){"Sign up"==document.getElementById("signBtn").textContent?async function(){const e=document.getElementById("nickname").value,t=document.getElementById("email").value,n=document.getElementById("password1").value,a=document.getElementById("password2").value;n?(n!=a&&(alert("비밀번호와 비밀번호 확인이 서로 다릅니다."),window.location.reload()),await fetch(`${i}/accounts/signup/`,{headers:{"content-type":"application/json"},method:"POST",body:JSON.stringify({nickname:e,email:t,password1:n,password2:a})}).then((e=>400===e.status?(console.log(e),e.json()):201==e.status?(window.location.href="../templates/email_await.html",e.json()):void 0)).then((e=>{console.log(e);try{e.password1?alert(e.password1):e.non_field_errors&&alert(e.non_field_errors)}catch(e){console.log(e)}}))):alert("비밀번호란은 필수입니다.")}():async function(){try{const e=document.getElementById("nickname").value,t=document.getElementById("email").value,n=document.getElementById("password1").value,a=await fetch(`${i}/accounts/api/token/`,{headers:{"content-type":"application/json"},method:"POST",body:JSON.stringify({nickname:e,email:t,password:n})});if(!a.ok)throw new Error(`Server returned an error ${a.status}: ${a.statustext}`);const o=await a.json();localStorage.setItem("access",o.access),localStorage.setItem("refresh",o.refresh);const l=o.access.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),r=decodeURIComponent(atob(l).split("").map((e=>"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2))).join(""));localStorage.setItem("payload",r),alert("환영합니다."),window.location.replace(`${s}/templates/main.html`)}catch(e){alert("회원정보가 일치하지 않습니다")}}()}const{Component:l}=React,r=({signIn:e,slide:t})=>{const n=e?"Hello friend!":"Welcome back!",a=e?"Enter your personal details and start your journey with us":"To keep connected with us please login with your personal info",s=e?"Sign up!":"Sign in!";return React.createElement("div",{className:"Panel ActionPanel"},React.createElement("h2",null,n),React.createElement("p",null,a),React.createElement("button",{onClick:t},s))},c=({signIn:e})=>{const t=e?"Sign in":"Create account",n=[{type:"text",id:"nickname",placeholder:"nickname"},{type:"text",id:"email",placeholder:"Email"},{type:"password",id:"password1",placeholder:"Password"}];e||n.push({type:"password",id:"password2",placeholder:"PassWord Check"});const a=e?"Sign in":"Sign up";return React.createElement("div",{className:"Panel FormPanel"},React.createElement("h2",null,t),React.createElement("div",{className:"Social"},[{id:"kakao",icon:"K"},{id:"github",icon:"G"}].map((({id:e,icon:t})=>React.createElement("button",{id:e,key:t},t)))),React.createElement("p",null,"Or use your email account"),React.createElement("form",null,n.map((({type:e,id:t,placeholder:n})=>React.createElement("input",{type:e,id:t,key:n,placeholder:n})))),React.createElement("button",{onClick:o,id:"signBtn"},a))};class d extends l{constructor(){super(),this.state={signIn:!0,transition:!1},this.slide=this.slide.bind(this)}slide(){const{signIn:e,transition:t}=this.state;if(t)return;const n=document.querySelector(".FormPanel"),a=document.querySelector(".ActionPanel"),s=a.children,i=n.getBoundingClientRect(),o=a.getBoundingClientRect();n.style.transition="all 0.7s cubic-bezier(.63,.39,.54,.91)",a.style.transition="all 0.7s cubic-bezier(.63,.39,.54,.91)",[...s].forEach((e=>e.style.transition="all 0.35s cubic-bezier(.63,.39,.54,.91)")),this.setState({transition:!0}),e?(n.style.transform=`translateX(${o.width}px)`,a.style.transform=`translateX(${-i.width}px)`,[...s].forEach((e=>{e.style.transform=`translateX(${o.width/2}px)`,e.style.opacity=0,e.style.visibility="hidden"})),n.style.borderRadius="0 20px 20px 0",a.style.borderRadius="20px 0 0 20px"):(n.style.transform=`translateX(${-o.width}px)`,a.style.transform=`translateX(${i.width}px)`,[...s].forEach((e=>{e.style.transform=`translateX(${-o.width/2}px)`,e.style.opacity=0,e.style.visibility="hidden"})),n.style.borderRadius="20px 0 0 20px",a.style.borderRadius="0 20px 20px 0");const l=setTimeout((()=>{[...s].forEach((t=>{t.style.transition="none",t.style.transform=`translateX(${e?-o.width/3:o.width/3}%)`})),this.setState({signIn:!e}),clearTimeout(l)}),350),r=setTimeout((()=>{[...s].forEach((e=>{e.style.transition="all 0.35s cubic-bezier(.63,.39,.54,.91)",e.style.transform="translateX(0)",e.style.opacity=1,e.style.visibility="visible"})),clearTimeout(r)}),400),c=setTimeout((()=>{n.style.transition="none",a.style.transition="none",n.style.transform="translate(0)",a.style.transform="translate(0)",a.style.order=e?-1:1,this.setState({transition:!1}),clearTimeout(c)}),700)}render(){return React.createElement("div",{className:"App"},React.createElement(c,{signIn:this.state.signIn}),React.createElement(r,{signIn:this.state.signIn,slide:this.slide}))}}ReactDOM.render(React.createElement(d,null),document.getElementById("root"));var m=document.getElementById("kakao"),u=document.getElementById("github");m.addEventListener("click",(function(e){!async function(){window.Kakao.Auth.authorize({redirectUri:`${s}/templates/redirect.html`})}()})),u.addEventListener("click",(function(e){!async function(){console.log("github");const e=`https://github.com/login/oauth/authorize?client_id=${n}&redirect_uri=${s}/templates/redirectGit.html&scope=read:user,user:email`;console.log(e),window.location.href=e}()}))})();
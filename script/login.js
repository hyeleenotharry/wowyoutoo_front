// import '/css/login.css'
const frontend_base_url = "http://127.0.0.1:5500";
const backend_base_url = "http://127.0.0.1:8000";
async function handleSign() {
  const button = document.getElementById("signBtn").textContent;
  console.log(button);
  if (button == 'Sign up') {
    handleSignup()
  } else {
    handleLogin()
  }
}

async function handleLogin() {
  try {
    console.log("로그인 확인");
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value;

    console.log(email, password);
    const response = await fetch(`${backend_base_url}/accounts/dj-rest-auth/login/`, {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        "email": email,
        "username": username,
        "password": password
      }),
    });
    if (!response.ok) {
      throw new Error(
        `Server returned an error ${response.status}: ${response.statustext}`
      );
    }
    const response_json = await response.json();
    console.log(response_json);

    localStorage.setItem("access", response_json.access);
    localStorage.setItem("refresh", response_json.refresh);
    const base64Url = response_json.access.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(atob(base64).split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
    );
    localStorage.setItem("payload", jsonPayload);
    alert("환영합니다.");
    window.location.replace(`${frontend_base_url}/main.html`);
  }
  catch (error) {
    console.error("Error during login:", error.message);
    alert("회원정보가 일치하지 않습니다")
  }

}

async function handleSignup() {
  console.log("회원가입 확인")
  // 유저가 입력한 정보 가져오기
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  console.log("회원가입 체크");
  // 체크
  if (password) {
    //회원가입 백엔드 url
    const response = await fetch(`${backend_base_url}/accounts/register/`, {
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        "email": email,
        "username": username,
        "password": password
      })
    }).then(res => {
      //동일한 username 이 있을 경우
      if (res.status === 400) {
        alert("동일한 유저네임이나 이메일이 존재합니다.");
        window.location.reload();
        return;
      } else {
        return res.json(); //Promise 반환
      }
    }).then(json => {
      // 이메일 인증 구현할 경우 로딩 화면
      // if (json['detail'] === "확인 이메일을 발송했습니다.") {

      //     window.location.href = "/email_await.html"
      // }
    });
    if (response.status === 200) {
      // 회원가입 성공
      alert("회원가입이 성공적으로 완료되었습니다.");
      window.location.href = "/login.html";
    }
  } else {
    alert("비밀번호란은 필수입니다.");
  }
}
const {
  Component
} = React;

// stateless component for the panel prominently featuring the button to enable the slide function
const ActionPanel = ({
  signIn,
  slide
}) => {
  // content to show conditional to the signIn boolean
  const heading = signIn ? 'Hello friend!' : 'Welcome back!';
  const paragraph = signIn ? 'Enter your personal details and start your journey with us' : 'To keep connected with us please login with your personal info';
  const button = signIn ? 'Sign up!' : 'Sign in!';

  // render the elements and includ the slide function when pressing the button
  return /*#__PURE__*/React.createElement("div", {
    className: "Panel ActionPanel"
  }, /*#__PURE__*/React.createElement("h2", null, heading), /*#__PURE__*/React.createElement("p", null, paragraph), /*#__PURE__*/React.createElement("button", {
    onClick: slide
  }, button));
};

// stateless component depicting the panel with input elements
const FormPanel = ({
  signIn
}) => {
  // heading
  const heading = signIn ? 'Sign in' : 'Create account';

  // array for authentications platforms (dead links as a proof of concept)
  const social = [{
    href: '#',
    icon: 'f' //facebook
  }, {
    href: '#',
    icon: 'g'  //google
  }, {
    href: '#',
    icon: 'in'
  }];
  // paragraph shared by both versions of the panel
  const paragraph = 'Or use your email account';

  // array of input elements, specifying the type and placeholder
  const inputs = [{
    type: 'text',
    id: 'email',
    placeholder: 'Email'
  }, {
    type: 'password',
    id: 'password',
    placeholder: 'Password'
  }];
  // if the signIn boolean directs toward the sign up form, include an additional input in the inputs array, for the name
  if (!signIn) {
    inputs.unshift({
      type: 'text',
      id: 'username',
      placeholder: 'Name'
    });
  }

  // link also shared by both versions of the panel
  const link = {
    href: '#',
    text: 'Forgot your password?'
  };

  // button to hypothetically sign in/up
  const button = signIn ? 'Sign in' : 'Sign up';

  // render the specified content in the matching elements
  return /*#__PURE__*/React.createElement("div", {
    className: "Panel FormPanel"
  }, /*#__PURE__*/React.createElement("h2", null, heading), /*#__PURE__*/React.createElement("div", {
    className: "Social"
  }, social.map(({
    href,
    icon
  }) => /*#__PURE__*/React.createElement("a", {
    href: href,
    key: icon
  }, icon))), /*#__PURE__*/React.createElement("p", null, paragraph), /*#__PURE__*/React.createElement("form", null, inputs.map(({
    type,
    id,
    placeholder
  }) => /*#__PURE__*/React.createElement("input", {
    type: type,
    id: id,
    key: placeholder,
    placeholder: placeholder
  }))), /*#__PURE__*/React.createElement("a", {
    href: link.href
  }, link.text), /*#__PURE__*/React.createElement("button", {
    onClick: handleSign,
    id: "signBtn"
  }, button));
};

// main component managing the state of the application, detailing the slide function and rendering the necessary components
class App extends Component {
  constructor() {
    super();
    this.state = {
      // boolean to determine which set of panels to show
      // determining also the content of the panels
      signIn: true,
      // boolean to avoid having the slide function run before the transition is completed
      transition: false
    };
    // bind the slide function to update the state
    this.slide = this.slide.bind(this);
  }
  slide() {
    // retrieve the signIn boolean
    const {
      signIn,
      transition
    } = this.state;

    // if already transitioning, pre-emptively escape the function
    // else continue applying the slide effect
    if (transition) {
      return;
    }

    // target the two panel elements
    const formPanel = document.querySelector('.FormPanel');
    const actionPanel = document.querySelector('.ActionPanel');
    // retrieve the child elements of the action panel (to transition them in and out of view)
    const actionPanelChildren = actionPanel.children;

    // continue only if the elements are not transitioning
    // retrieve the bounding box allowing to decipher the position and size of the elements
    const formBoundingRect = formPanel.getBoundingClientRect();
    const actionBoundingRect = actionPanel.getBoundingClientRect();

    // apply a transition (later removed to re-arrange the position of the elements without visual modification)
    formPanel.style.transition = 'all 0.7s cubic-bezier(.63,.39,.54,.91)';
    actionPanel.style.transition = 'all 0.7s cubic-bezier(.63,.39,.54,.91)';
    // apply a transiton to the child elements of the second panel as well
    [...actionPanelChildren].forEach(child => child.style.transition = 'all 0.35s cubic-bezier(.63,.39,.54,.91)');
    this.setState({
      transition: true
    });

    // if signing in slide the form panel to the right, the action panel the other way
    if (signIn) {
      // by an amount equal to the other element's width
      formPanel.style.transform = `translateX(${actionBoundingRect.width}px)`;
      actionPanel.style.transform = `translateX(${-formBoundingRect.width}px)`;

      // transition the child elements out of sight in a direction opposite to the action panel
      [...actionPanelChildren].forEach(child => {
        child.style.transform = `translateX(${actionBoundingRect.width / 2}px)`;
        child.style.opacity = 0;
        child.style.visibility = 'hidden';
      });

      // ! update the border radius as well
      formPanel.style.borderRadius = '0 20px 20px 0';
      actionPanel.style.borderRadius = '20px 0 0 20px';
    } else {
      // else translate the elements back to where they sat earlier
      // ! not to translateX(0), as their position is actually and soon modified
      formPanel.style.transform = `translateX(${-actionBoundingRect.width}px)`;
      actionPanel.style.transform = `translateX(${formBoundingRect.width}px)`;
      [...actionPanelChildren].forEach(child => {
        child.style.transform = `translateX(${-actionBoundingRect.width / 2}px)`;
        child.style.opacity = 0;
        child.style.visibility = 'hidden';
      });
      formPanel.style.borderRadius = '20px 0 0 20px';
      actionPanel.style.borderRadius = '0 20px 20px 0';
    }
    // ! update the state before the transition has a chance to complete, to have the content appear
    const timeoutState = setTimeout(() => {
      // remove the transition on the child elements to reposition them on the opposite side of the incoming direciton
      [...actionPanelChildren].forEach(child => {
        child.style.transition = 'none';
        child.style.transform = `translateX(${signIn ? -actionBoundingRect.width / 3 : actionBoundingRect.width / 3}%)`;
      });
      this.setState({
        signIn: !signIn
      });
      clearTimeout(timeoutState);
    }, 350);
    const timeoutChildren = setTimeout(() => {
      // transition the child elements back into view
      [...actionPanelChildren].forEach(child => {
        child.style.transition = 'all 0.35s cubic-bezier(.63,.39,.54,.91)';
        child.style.transform = `translateX(0)`;
        child.style.opacity = 1;
        child.style.visibility = 'visible';
      });
      clearTimeout(timeoutChildren);
    }, 400);

    // after the transition is complete
    const timeoutTransition = setTimeout(() => {
      // remove the transition
      formPanel.style.transition = 'none';
      actionPanel.style.transition = 'none';
      // immediately remove the translation and re-arrange the elements to have the action panel effectively to the left
      // ! accessibility concerns
      formPanel.style.transform = 'translate(0)';
      actionPanel.style.transform = 'translate(0)';
      actionPanel.style.order = signIn ? -1 : 1;
      this.setState({
        transition: false
      });
      clearTimeout(timeoutTransition);
    }, 700);
  }
  // include the two panels with the content dictated by the boolean
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "App"
    }, /*#__PURE__*/React.createElement(FormPanel, {
      signIn: this.state.signIn
    }), /*#__PURE__*/React.createElement(ActionPanel, {
      signIn: this.state.signIn,
      slide: this.slide
    }));
  }
}
ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('root'));
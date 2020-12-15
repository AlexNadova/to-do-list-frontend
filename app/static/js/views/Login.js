import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Login");
  }

  async getJs(url, token) {
    const form = document.querySelector("#loginForm");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      var xhttp = new XMLHttpRequest();
      const data = new FormData(form);
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          let response = JSON.parse(this.response);
          localStorage.setItem("token", response.accessToken);
          localStorage.setItem("id", response.id);
          window.location.href = "/notes";
        } else if (
          this.readyState == 4 &&
          this.status != 0 &&
          this.status != 200
        ) {
          let response = JSON.parse(this.response);
          document.getElementById("err").innerHTML =
            this.status + ": " + response.message;
        }
      };
      xhttp.open("POST", url + "/auth/signIn");
      xhttp.send(data);
    });
  }

  async getHtml(url, token, html) {
    let div = document.createElement("div");
    div.innerHTML = `
    <h1>Login</h1>
    <form id="loginForm" class="form">
      <div class="form__input">
        <label for="email">Email</label>
        <input name="email" id="email">
      </div>
      <div class="form__input">
        <label for="password">Password</label>
        <input name="password" id="password">
      </div>
      <button class="action__button submit"><span>Login</span></button>
    </form>
    `;
    html(div);
  }
}

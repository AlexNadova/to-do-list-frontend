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
          let response = JSON.parse(this.response)
          localStorage.setItem("token", response.accessToken);
          localStorage.setItem("id", response.id);
          window.location.href = "/notes";
        } else
          document.getElementById("demo").innerHTML =
            this.readyState + " " + this.status;
      };
      xhttp.open("POST", url + "/auth/signIn");
      xhttp.send(data);
    });
  }

  async getHtml(url, token, html) {
    html(`
    <h1>Login</h1>
    <form id="loginForm">
      <div>
        <label for="email">Email</label>
        <input name="email" id="email">
      </div>
      <div>
        <label for="password">Password</label>
        <input name="password" id="password">
      </div>
      <div>
        <button id="btn">Login</button>
      </div>
    </form>
    <p id="demo"></p>
    `);
  }
}

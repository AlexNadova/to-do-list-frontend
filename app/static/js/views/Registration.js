import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Registration");
  }

  async getJs(url, token) {
    const form = document.querySelector("#registrationForm");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      var xhttp = new XMLHttpRequest();
      const data = new FormData(form);
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          window.location.href = "/login";
        } else document.getElementById("demo").innerHTML = this.responseText;
      };
      xhttp.open("POST", url + "/auth/signUp");
      xhttp.send(data);
    });
  }

  async getHtml(url, token, html) {
    html(`
    <h1>Login</h1>
    <form id="registrationForm">
      <div>
        <label for="email">Email</label>
        <input name="email" id="email">
      </div>
      <div>
        <label for="name">Name</label>
        <input name="name" id="name">
      </div>
      <div>
        <label for="password">Password</label>
        <input name="password" id="password">
      </div>
      <div>
        <label for="password_confirmation">Password</label>
        <input name="password_confirmation" id="password_confirmation">
      </div>
      <div>
        <button id="btn">Login</button>
      </div>
    </form>
    <p id="demo"></p>
    `);
  }
}
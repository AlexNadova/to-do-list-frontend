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
        } else if (
          this.readyState == 4 &&
          this.status != 0 &&
          this.status != 200
        ) {
          let response = JSON.parse(this.response);
          let err = document.getElementById("err");
          err.innerText = this.status + ": " + response.message;
          err.style.display = "block";
          setTimeout(function () {
            err.innerText = "";
            err.style.display = "none";
          }, 4000);
        }
      };
      xhttp.open("POST", url + "/auth/signUp");
      xhttp.send(data);
    });
  }

  async getHtml(url, token, html) {
    let div = document.createElement("div");
    div.innerHTML = `
    <h1>Register now</h1>
    <form id="registrationForm" class="form">
      <div class="form__input">
        <label for="email">Email</label>
        <input name="email" id="email">
      </div>
      <div class="form__input">
        <label for="name">Name</label>
        <input name="name" id="name">
      </div>
      <div class="form__input">
        <label for="password">Password</label>
        <input type="password" name="password" id="password">
      </div>
      <div class="form__input">
        <label for="password_confirmation">Password</label>
        <input type="password" name="password_confirmation" id="password_confirmation">
      </div>
      <button class="action__button submit"><span>Sign in</span></button>
    </form>
    `;
    html(div);
  }
}

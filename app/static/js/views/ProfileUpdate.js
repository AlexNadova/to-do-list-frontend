import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.userId = localStorage.getItem("id");
    this.setTitle("Update user");
  }

  async getJs(url, token) {
    const form = document.querySelector("#updateUserForm");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      let noteId = this.noteId;
      var xhttp = new XMLHttpRequest();
      const data = new FormData(form);
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          window.location.href = "/profile";
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
      xhttp.open("PUT", url + "/users/" + this.userId);
      xhttp.setRequestHeader("x-access-token", token);
      xhttp.send(data);
    });
  }

  async getHtml(url, token, html) {
    let userId = this.userId;
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url + "/users/" + userId, true);
    xhttp.setRequestHeader("x-access-token", token);
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var userInfo = JSON.parse(this.responseText);
        let div = document.createElement("div");
        div.innerHTML = `
        <h1>Update user</h1>
        <form id="updateUserForm" class="form">
          <div class="form__input">
            <label for="email">Email</label>
            <input name="email" id="email" value="${userInfo.email}">
          </div>
          <div class="form__input">
            <label for="name">Name</label>
            <input name="name" id="name" value="${userInfo.name}">
          </div>
          <div class="form__input">
            <label for="password">Password</label>
            <input type="password" name="password" id="password">
          </div>
          <div class="form__input">
            <label for="password_confirmation">Password</label>
            <input type="password" name="password_confirmation" id="password_confirmation">
          </div>
          <button type="submit" class="action__button submit"><span>Update user</span></button>
        </form>
        `;
        html(div);
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
  }
}

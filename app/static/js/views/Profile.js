import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.userId = localStorage.getItem("id");
    this.setTitle("Profile");
  }

  async getJs(url, token) {
    document.querySelector("#deleteBtn").addEventListener("click", () => {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          window.location.href = "/login";
          localStorage.removeItem("id");
          localStorage.removeItem("token");
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
      xhttp.open("DELETE", url + "/users/" + this.userId, true);
      xhttp.setRequestHeader("x-access-token", token);
      xhttp.send();
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
          <h1>Profile</h1>
          <div id="deleteBtn" class="action__button"><a>Delete profile</a></div>
          <div class="action__button"><a href="../update-user">Update user</a></div>
          <div class="info__container">
            <ul class="info">
              <li>ID: ${userInfo.id}</li>
              <li>Title: ${userInfo.name}</li>
              <li>Content: ${userInfo.email}</li>
              <li>Created at: ${userInfo.createdAt}</li>
              <li>Updated at: ${userInfo.updatedAt}</li>
            </ul>
          </div>
        `;
        if (html) html(div);
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

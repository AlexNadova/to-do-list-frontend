import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Profile");
  }

  async getJs(url, token) {
    document.querySelector("#deleteBtn").addEventListener("click", () => {
      let userId = localStorage.getItem("id");
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          window.location.href = "/login";
          localStorage.removeItem("id");
          localStorage.removeItem("token");
        }
      };
      xhttp.open("DELETE", url + "/users/" + userId, true);
      xhttp.setRequestHeader("x-access-token", token);
      xhttp.send();
    });
  }

  async getHtml(url, token, res) {
    let userId = localStorage.getItem("id");
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url + "/users/" + userId, true);
    xhttp.setRequestHeader("x-access-token", token);
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var userInfo = JSON.parse(this.responseText);
        let html = `
          <h1>Profile</h1>
          <button id="deleteBtn">Delete profile</button>
          <div>
            <ul>
              <li>ID: ${userInfo.id}</li>
              <li>Title: ${userInfo.name}</li>
              <li>Content: ${userInfo.email}</li>
              <li>Created at: ${userInfo.createdAt}</li>
              <li>Updated at: ${userInfo.updatedAt}</li>
            </ul>
          </div>
        `;
        if (res) res(html);
      }
    };
  }
}

import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.noteId = params.id;
    this.userId = localStorage.getItem("id");
    this.setTitle("Viewing Note");
  }

  async getJs(url, token) {
    document.querySelector("#deleteBtn").addEventListener("click", () => {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
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
      xhttp.open(
        "DELETE",
        url + "/notes/" + this.userId + "/" + this.noteId,
        true
      );
      xhttp.setRequestHeader("x-access-token", token);
      xhttp.send();
    });
  }

  async getHtml(url, token, res) {
    let noteId = this.noteId;
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url + "/notes/" + this.userId + "/" + noteId, true);
    xhttp.setRequestHeader("x-access-token", token);
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var noteInfo = JSON.parse(this.responseText);
        let html = `
          <h1>Note</h1>
          <p>You are viewing note #${noteInfo.id}.</p>
          <button id="deleteBtn">Delete note</button>
          <a href="../update-note/${noteId}">Update note</a>
          <div>
            <ul>
              <li>ID: ${noteInfo.id}</li>
              <li>Title: ${noteInfo.title}</li>
              <li>Content: ${noteInfo.content}</li>
              <li>Created at: ${noteInfo.createdAt}</li>
              <li>Updated at: ${noteInfo.updatedAt}</li>
            </ul>
          </div>
        `;
        if (res) res(html);
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
  }
}

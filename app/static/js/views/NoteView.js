import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.noteId = params.id;
    this.setTitle("Viewing Note");
  }

  
  async getJs(url, token) {
    document.querySelector("#deleteBtn").addEventListener("click", () => {
      let userId = localStorage.getItem("id");
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          window.location.href = "/notes";
        }
      };
      xhttp.open("DELETE", url + "/notes/" + userId + "/" + this.noteId, true);
      xhttp.setRequestHeader("x-access-token", token);
      xhttp.send();
    });
  }

  async getHtml(url, token, res) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url + "/notes/1/" + this.noteId, true);
    xhttp.setRequestHeader("x-access-token", token);
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var noteInfo = JSON.parse(this.responseText);
        let html = `
          <h1>Note</h1>
          <p>You are viewing note #${noteInfo.id}.</p>
          <button id="deleteBtn">Delete note</button>
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
      }
    };
  }
}

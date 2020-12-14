import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.userId = localStorage.getItem("id");
    this.noteId = params.id;
    this.setTitle("Update note");
  }

  async getJs(url, token) {
    const form = document.querySelector("#updateNoteForm");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      let noteId = this.noteId;
      var xhttp = new XMLHttpRequest();
      const data = new FormData(form);
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          window.location.href = "/notes/" + noteId;
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
      xhttp.open("PUT", url + "/notes/" + this.userId + "/" + noteId);
      xhttp.setRequestHeader("x-access-token", token);
      xhttp.send(data);
    });
  }

  async getHtml(url, token, html) {
    html(`
    <h1>Update note</h1>
    <form id="updateNoteForm">
      <div>
        <label for="title">Title</label>
        <input name="title" id="title">
      </div>
      <div>
        <label for="content">Content</label>
        <textarea name="content" id="content"></textarea>
      </div>
      <div>
        <button id="btn">Update note</button>
      </div>
    </form>
    `);
  }
}

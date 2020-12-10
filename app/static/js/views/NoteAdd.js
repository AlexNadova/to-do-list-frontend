import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Add note");
  }

  async getJs(url, token) {
    let userId = localStorage.getItem("id");
    const form = document.querySelector("#addNoteForm");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      var xhttp = new XMLHttpRequest();
      const data = new FormData(form);
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          window.location.href = "/notes";
        }
      };
      xhttp.open("POST", url + "/notes/" + userId);
      xhttp.setRequestHeader("x-access-token", token);
      xhttp.send(data);
    });
  }

  async getHtml(url, token, html) {
    html(`
    <h1>Login</h1>
    <form id="addNoteForm">
      <div>
        <label for="title">Title</label>
        <input name="title" id="title">
      </div>
      <div>
        <label for="content">Content</label>
        <textarea name="content" id="content"></textarea>
      </div>
      <div>
        <button id="btn">Add note</button>
      </div>
    </form>
    `);
  }
}

import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Notes");
  }

  getJs(url, token) {
    document.querySelector("#addNote").addEventListener("click", () => {
      window.location.href = "/add-note";
    });
  }

  getHtml(url, token, res) {
    let html = `
      <div>
        <h1>Notes:</h1>
        <button id="addNote">Add note</button>
    `;
    let userId = localStorage.getItem("id");
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url + "/notes/" + userId, true);
    xhttp.setRequestHeader("x-access-token", token);
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var notes = JSON.parse(this.responseText);
        html += "<ul>";
        notes.data.forEach((note) => {
          html += `
          <li>
            <a href="./notes/${note.id}">ID:${note.id} title:${note.title}</a>
          </li>`;
        });
        html += "</ul></div>";
        if (res) res(html);
      }
    };
  }
}

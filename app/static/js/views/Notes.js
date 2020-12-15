import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Notes");
  }

  getHtml(url, token, res) {
    let html = document.createElement("div");

    html.innerHTML = `
      <h1>Your notes</h1>
      <div class="action__button">
        <a href="./add-note">Add note</a>
      </div>
    `;

    let userId = localStorage.getItem("id");
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url + "/notes/" + userId, true);
    xhttp.setRequestHeader("x-access-token", token);
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let noteListContainer = document.createElement("div");
        noteListContainer.setAttribute("class", "notes-list__container");
        let noteList = document.createElement("ul");
        noteList.setAttribute("class", "notes-list");
        var notes = JSON.parse(this.responseText);
        notes.data.forEach((note) => {
          var noteItem = document.createElement("li");
          noteItem.setAttribute("id", note.id);
          var noteLink = document.createElement("a");
          noteLink.setAttribute("href", "./notes/" + note.id);
          noteLink.innerText = note.title;
          noteItem.appendChild(noteLink);
          noteList.appendChild(noteItem);
        });
        noteListContainer.appendChild(noteList);
        html.appendChild(noteListContainer);
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

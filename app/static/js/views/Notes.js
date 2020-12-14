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
      <a href="./add-note">Add note</a>
    `;

    let userId = localStorage.getItem("id");
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url + "/notes/" + userId, true);
    xhttp.setRequestHeader("x-access-token", token);
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let noteList = document.createElement("ul");
        var notes = JSON.parse(this.responseText);
        notes.data.forEach((note) => {
          var noteItem = document.createElement("li");
          noteItem.setAttribute("id", note.id);
          var noteLink = document.createElement("a");
          noteLink.setAttribute("href", "./notes/" + note.id);
          noteLink.innerText = `ID:${note.id} title:${note.title}`;
          noteItem.appendChild(noteLink);
          noteList.appendChild(noteItem);
        });
        html.appendChild(noteList);
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

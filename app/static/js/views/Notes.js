import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Notes");
  }

  getHtml(url, token, res) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url + "/notes/1", true);
    xhttp.setRequestHeader("x-access-token", token);
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var notes = JSON.parse(this.responseText);
        let html = "<div><ul>";
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

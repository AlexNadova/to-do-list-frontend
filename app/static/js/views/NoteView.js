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
          let err = document.getElementById("err");
          err.innerText = this.status + ": " + response.message;
          err.style.display = "block";
          setTimeout(function () {
            err.innerText = "";
            err.style.display = "none";
          }, 4000);
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

  async getHtml(url, token, html) {
    let noteId = this.noteId;
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url + "/notes/" + this.userId + "/" + noteId, true);
    xhttp.setRequestHeader("x-access-token", token);
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var noteInfo = JSON.parse(this.responseText);
        let div = document.createElement("div");
        let htmlString = `
          <h1>Note</h1>
          <div id="deleteBtn" class="action__button"><a>Delete note</a></div>
          <div class="action__button"><a href="../update-note/${noteId}">Update note</a></div>
        `;
        let noteInfoElement = document.createElement("div");
        noteInfoElement.setAttribute("class", "info__container");
        if (noteInfo.tags.length > 0) {
          let tagsList = document.createElement("ul");
          tagsList.setAttribute("class", "info__tags");
          noteInfo.tags.forEach((tag) => {
            var tagsListItem = document.createElement("li");
            tagsListItem.setAttribute("id", tag.tagId);
            tagsListItem.setAttribute("class", "tag n" + tag.tagId);
            tagsListItem.innerText = tag.name;
            tagsList.appendChild(tagsListItem);
          });
          noteInfoElement.appendChild(tagsList);
        }
        let infoContainer = document.createElement("ul");
        infoContainer.setAttribute("class", "info");
        infoContainer.innerHTML = `
          <li>ID: ${noteInfo.id}</li>
          <li>Title: ${noteInfo.title}</li>
          <li>Created at: ${noteInfo.createdAt}</li>
          <li>Updated at: ${noteInfo.updatedAt}</li>
          <li>Content: ${noteInfo.content}</li>
        `;
        noteInfoElement.appendChild(infoContainer);
        div.innerHTML = htmlString.trim();
        div.appendChild(noteInfoElement);
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

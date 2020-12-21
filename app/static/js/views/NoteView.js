import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.noteId = params.id;
    this.userId = localStorage.getItem("id");
    this.setTitle("Viewing Note");
  }

  async getJs(url, token) {
    /** add click event for deleting current note */
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
    /** API request to get note according to URL */
    let noteId = this.noteId;
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url + "/notes/" + this.userId + "/" + noteId, true);
    xhttp.setRequestHeader("x-access-token", token);
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var noteInfo = JSON.parse(this.responseText);
        /** div element to return */
        let div = document.createElement("div");
        div.innerHTML = `
          <h1>Note</h1>
          <div id="deleteBtn" class="action__button"><a>Delete note</a></div>
          <div class="action__button"><a href="../update-note/${noteId}">Update note</a></div>
        `;
        /** div.info__container container for note's information*/
        let noteInfoElement = document.createElement("div");
        noteInfoElement.setAttribute("class", "info__container");
        if (noteInfo.tags.length > 0) {
          /** ul.info__tags of note's tags */
          let tagsList = document.createElement("ul");
          tagsList.setAttribute("class", "info__tags");
          /** generate li.tag for note */
          noteInfo.tags.forEach((tag) => {
            var tagsListItem = document.createElement("li");
            tagsListItem.setAttribute("id", tag.tagId);
            tagsListItem.setAttribute("class", "tag n" + tag.tagId);
            tagsListItem.innerText = tag.name;
            /** apend li.tag to ul.info__tags */
            tagsList.appendChild(tagsListItem);
          });
          /** append ulinfo__tags to div.info__container */
          noteInfoElement.appendChild(tagsList);
        }
        /** ul.info of note's information */
        let infoContainer = document.createElement("ul");
        infoContainer.setAttribute("class", "info");
        infoContainer.innerHTML = `
          <li>ID: ${noteInfo.id}</li>
          <li>Title: ${noteInfo.title}</li>
          <li>Created at: ${noteInfo.createdAt}</li>
          <li>Updated at: ${noteInfo.updatedAt}</li>
          <li>Content: ${noteInfo.content}</li>
        `;
        /** append ul.info to div.info__container */
        noteInfoElement.appendChild(infoContainer);
        /** append div.info__container to div element to return */
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

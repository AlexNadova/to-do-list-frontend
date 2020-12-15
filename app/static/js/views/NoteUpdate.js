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
      let array = data.getAll("tag");
      for (var i = 0; i < array.length; i++) {
        data.append("tags", array[i]);
      }
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          window.location.href = "/notes/" + noteId;
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
      xhttp.open("PUT", url + "/notes/" + this.userId + "/" + noteId);
      xhttp.setRequestHeader("x-access-token", token);
      xhttp.send(data);
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
        div.innerHTML = "<h1>Update note</h1>";
        let form = document.createElement("form");
        form.setAttribute("id", "updateNoteForm");
        form.setAttribute("class", "form");
        form.innerHTML = `
          <div class="form__input">
            <label for="title">Title</label>
            <input name="title" id="title" value="${noteInfo.title}">
          </div>
          <div class="form__input">
            <label for="content">Content</label>
            <textarea name="content" id="content">${noteInfo.content}</textarea>
          </div>
        `;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            let tags = JSON.parse(this.responseText);
            let tagFieldset = document.createElement("fieldset");
            tagFieldset.setAttribute("id", "tag");
            tagFieldset.setAttribute("class", "info__tags");
            tags.forEach((tag) => {
              let tagItem = document.createElement("div");
              tagItem.setAttribute("class", "tag n" + tag.id);

              let tagInput = document.createElement("input");
              tagInput.setAttribute("type", "checkbox");
              tagInput.setAttribute("id", tag.id);
              tagInput.setAttribute("value", tag.id);
              tagInput.setAttribute("name", "tag");

              console.log(noteInfo.tags);
              Array.prototype.forEach.call(noteInfo.tags, (usedTag) => {
                if (tag.id == usedTag.tagId)
                  tagInput.setAttribute("checked", "true");
              });

              let tagLabel = document.createElement("label");
              tagLabel.setAttribute("for", tag.name);
              tagLabel.innerText = tag.name;

              tagItem.appendChild(tagLabel);
              tagItem.appendChild(tagInput);
              tagFieldset.appendChild(tagItem);
            });
            form.appendChild(tagFieldset);
            let button = document.createElement("button");
            button.setAttribute("type", "submit");
            button.setAttribute("class", "action__button submit");
            button.innerHTML = "<span>Update note</span>";
            form.appendChild(button);
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
        xhttp.open("GET", url + "/tags");
        xhttp.send();
        div.appendChild(form);
        html(div);
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

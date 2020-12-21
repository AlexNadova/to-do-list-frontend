import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Add note");
  }

  async getJs(url, token) {
    /** POST to create new note */
    let userId = localStorage.getItem("id");
    const form = document.querySelector("#addNoteForm");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      var xhttp = new XMLHttpRequest();
      const data = new FormData(form);
      /** to get chosen tags in correct form from form */
      let array = data.getAll("tag");
      for (var i = 0; i < array.length; i++) {
        data.append("tags", array[i]);
      }
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
      xhttp.open("POST", url + "/notes/" + userId);
      xhttp.setRequestHeader("x-access-token", token);
      xhttp.send(data);
    });
  }

  async getHtml(url, token, html) {
    /** div element to return */
    let div = document.createElement("div");
    div.innerHTML = "<h1>Add new note</h1>";
    /** form.form */
    let form = document.createElement("form");
    form.setAttribute("id", "addNoteForm");
    form.setAttribute("class", "form");
    form.innerHTML = `
      <div class="form__input">
        <label for="title">Title</label>
        <input name="title" id="title">
      </div>
      <div class="form__input">
        <label for="content">Content</label>
        <textarea name="content" id="content"></textarea>
      </div>
    `;
    /** GET request to get possible tags to choose from */
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let tagsResponse = JSON.parse(this.responseText);
        /** fieldset.info__tags to group all tags checkboxes */
        let tagFieldset = document.createElement("fieldset");
        tagFieldset.setAttribute("id", "tag");
        tagFieldset.setAttribute("class", "info__tags");
        /** add checkbox input for each tag from response */
        tagsResponse.forEach((tag) => {
          /** div.tag container for tag */
          let tagItem = document.createElement("div");
          tagItem.setAttribute("class", "tag n" + tag.id);
          /** input checkbox for tag */
          let tagInput = document.createElement("input");
          tagInput.setAttribute("type", "checkbox");
          tagInput.setAttribute("id", tag.id);
          tagInput.setAttribute("value", tag.id);
          tagInput.setAttribute("name", "tag");
          /** label for checkbox input */
          let tagLabel = document.createElement("label");
          tagLabel.setAttribute("for", tag.name);
          tagLabel.innerText = tag.name;
          /** append checkbox label & input to div.tag */
          tagItem.appendChild(tagLabel);
          tagItem.appendChild(tagInput);
          /** append div.tag to fieldset.info__tags */
          tagFieldset.appendChild(tagItem);
        });
        /** append fieldset.info__tags to form.form */
        form.appendChild(tagFieldset);
        /** button.action__button.submit to submit form.form */
        let button = document.createElement("button");
        button.setAttribute("type", "submit");
        button.setAttribute("class", "action__button submit");
        button.innerHTML = "<span>Add note</span>";
        /** append button.action__button.submit to form.form */
        form.appendChild(button);
      } else if (
        this.readyState == 4 &&
        this.status != 0 &&
        this.status != 200
      ) {
        let err = document.getElementById("err");
        err.innerText = "Tags could not be loaded.";
        err.style.display = "block";
        setTimeout(function () {
          err.innerText = "";
          err.style.display = "none";
        }, 4000);
      }
    };
    xhttp.open("GET", url + "/tags");
    xhttp.send();
    /** append form.form to div element to return */
    div.appendChild(form);
    html(div);
  }
}

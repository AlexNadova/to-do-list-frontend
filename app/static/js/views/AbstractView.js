export default class {
  constructor(params) {
    this.params = params;
  }

  setTitle(title) {
    document.title = title;
  }

  async getJs(url, token) {
    return "";
  }

  async getHtml(url, token, res) {
    return "";
  }

  getNav(isRestricted) {
    let nav = "";
    if (isRestricted) {
      nav = `
      <a href="/notes" class="nav__link" data-link>Notes</a>
      <a href="/profile" class="nav__link" data-link>Profile</a>
      <a id="logout" class="nav__link">Logout</a>
      <span>X</span>
    `;
    } else {
      nav = `
      <a href="/login" class="nav__link" data-link>Login</a>
      <a href="/registration" class="nav__link" data-link>Registration</a>
      <span>X</span>
    `;
    }
    return nav;
  }
}

export default class {
  constructor(params) {
    this.params = params;
  }

  /**
   *
   * @param {string} title - title of the page
   */
  setTitle(title) {
    document.title = title;
  }

  /**
   *
   * @param {string} url  - base API URL for requests
   * @param {string} token - JWT for requests
   */
  async getJs(url, token) {
    return null;
  }

  /**
   *
   * @param {string} url  - base API URL for requests
   * @param {string} token - JWT for requests
   * @param {function} res - callback
   * @returns {HTMLDivElement} HTML element to display on page
   */
  async getHtml(url, token, res) {
    return null;
  }

  /**
   *
   * @param {boolean} isRestricted - whether user can access current page
   * @returns {string} - string HTML for navigation bar
   */
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

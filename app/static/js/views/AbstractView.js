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
}

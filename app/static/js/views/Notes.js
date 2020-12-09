import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Notes");
    }

    async getHtml() {
        return `
            <h1>Notes</h1>
            <p>You are viewing your notes!</p>
        `;
    }
}
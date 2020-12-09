import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.noteId = params.id;
        this.setTitle("Viewing Note");
    }

    async getHtml() {
        return `
            <h1>Note</h1>
            <p>You are viewing note #${this.noteId}.</p>
        `;
    }
}
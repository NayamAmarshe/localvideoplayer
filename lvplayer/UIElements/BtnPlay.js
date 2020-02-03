export class BtnPlay {

    constructor() {
        this.DOM = this.createDOMElement();
    }
    createDOMElement() {
        const btnPlay = document.createElement('div');
        btnPlay.setAttribute('class', 'lvplayer__button lvplayer__button--play');

        return btnPlay;
    }
    toggleBgImage(image) {
        this.DOM.style.backgroundImage = `url('./lvplayer/src/${image}.svg')`;
    }
}
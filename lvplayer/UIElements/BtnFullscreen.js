export class BtnFullscreen {

    constructor() {
        this.DOM = this.createDOMElement();
    }

    createDOMElement() {
        const btnFullscreen = document.createElement('div');
        btnFullscreen.setAttribute(
            'class',
            'lvplayer__button lvplayer__button--fullscreen',
        );

        return btnFullscreen;
    }

    toggleBgImage(image) {
        this.DOM.style.backgroundImage = `url('./lvplayer/src/${image}.svg')`;
    }
}
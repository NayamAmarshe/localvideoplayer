export class BtnVolume {

    constructor() {
        this.DOM = this.createDOMElement();
    }

    createDOMElement() {
        const btnVolume = document.createElement('div');
        btnVolume.setAttribute(
            'class',
            'lvplayer__button lvplayer__button--volume',
        );

        return btnVolume;
    }
    toggleBgImage(image) {
        this.DOM.style.backgroundImage = `url('./lvplayer/src/${image}.svg')`;
    }
}
export class PlayerVolumePopup {

    constructor() {
        this.DOM = this.createDOMElement();
    }

    createDOMElement() {
        const playerVolumePopup = document.createElement('div');
        playerVolumePopup.setAttribute('class', 'lvplayer__volumePopup');

        return playerVolumePopup;
    }
}
export class PlayerVolumeRange {

    constructor() {
        this.DOM = this.createDOMElement();
    }

    createDOMElement() {
        const playerVolumeRange = document.createElement('input');
        playerVolumeRange.setAttribute('class', 'lvplayer__volumeRange');
        playerVolumeRange.setAttribute('type', 'range');
        playerVolumeRange.setAttribute('value', '1');
        playerVolumeRange.setAttribute('min', '0');
        playerVolumeRange.setAttribute('max', '1');
        playerVolumeRange.setAttribute('step', '.1');

        return playerVolumeRange;
    }
}
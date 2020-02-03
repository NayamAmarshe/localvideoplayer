export class PlayerProgress {

    constructor() {
        this.DOM = this.createDOMElement();
    }

    createDOMElement() {
        const playerProgress = document.createElement('input');
        playerProgress.setAttribute('class', 'lvplayer__progress');
        playerProgress.setAttribute('type', 'range');
        playerProgress.setAttribute('value', '0');
        playerProgress.setAttribute('min', '0');
        playerProgress.setAttribute('step', '.1');

        return playerProgress;
    }
}
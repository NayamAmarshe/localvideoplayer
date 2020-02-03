export class PlayerWrapper {

    constructor(parentContainer) {
        this.DOM = this.createDOMElement(parentContainer);
    }

    createDOMElement(parentContainer) {
        const playerWrapper = document.createElement('div');
        playerWrapper.setAttribute('class', 'lvplayer');
        playerWrapper.setAttribute('tabindex', '0');

        document.querySelector(parentContainer).appendChild(playerWrapper);

        return playerWrapper;
    }
}
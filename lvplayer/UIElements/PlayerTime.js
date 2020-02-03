export class PlayerTime {

    constructor() {
        this.DOM = this.createDOMElement();
    }

    createDOMElement() {
        const playerTime = document.createElement('div');
        playerTime.setAttribute('class', 'lvplayer__time');

        return playerTime;
    }
}
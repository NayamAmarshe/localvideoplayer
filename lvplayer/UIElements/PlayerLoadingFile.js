export class PlayerLoadingFile {

    constructor() {
        this.DOM = this.createDOMElement();
    }

    createDOMElement() {
        const playerLoadingFile = document.createElement('progress');
        playerLoadingFile.setAttribute('class', 'lvplayer__loadingFile');

        return playerLoadingFile;
    }
}
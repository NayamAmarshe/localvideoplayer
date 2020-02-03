export class BtnSubtitles {

    constructor(parentContainer) {
        this.DOM = this.createDOMElement(parentContainer);
    }

    createDOMElement(parentContainer) {
        const btnSubtitlesLabel = document.createElement('label');
        btnSubtitlesLabel.setAttribute(
            'class',
            'lvplayer__button lvplayer__button--subtitles',
        );
        btnSubtitlesLabel.setAttribute('for', `uploadSubtitles${parentContainer}`);

        const btnSubtitles = document.createElement('input');
        btnSubtitles.setAttribute('id', `uploadSubtitles${parentContainer}`);
        btnSubtitles.setAttribute('class', 'lvplayer__uploadSubtitles');
        btnSubtitles.setAttribute('type', 'file');
        btnSubtitles.setAttribute('accept', '.vtt');

        btnSubtitlesLabel.appendChild(btnSubtitles);

        return btnSubtitlesLabel;
    }
}
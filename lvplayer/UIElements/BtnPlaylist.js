export class BtnPlaylist {

    constructor(parentContainer) {
        this.DOM = this.createDOMElement(parentContainer);
    }

    createDOMElement(parentContainer) {
        const btnPlaylistLabel = document.createElement('label');
        btnPlaylistLabel.setAttribute(
            'class',
            'lvplayer__button lvplayer__button--playlist',
        );
        btnPlaylistLabel.setAttribute('for', `uploadVideo${parentContainer}`);

        const btnPlaylist = document.createElement('input');
        btnPlaylist.setAttribute('id', `uploadVideo${parentContainer}`);
        btnPlaylist.setAttribute('class', 'lvplayer__uploadVideo');
        btnPlaylist.setAttribute('type', 'file');
        btnPlaylist.setAttribute('accept', 'video/*');
        btnPlaylist.setAttribute('multiple', 'multiple');

        btnPlaylistLabel.appendChild(btnPlaylist);

        return btnPlaylistLabel;
    }

}
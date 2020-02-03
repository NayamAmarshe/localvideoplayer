export class Playlist {

    constructor() {
        this.DOM = this.createDOMElement();
    }

    createDOMElement() {
        const playlist = document.createElement('div');
        playlist.setAttribute('class', 'lvplayer__playlist');

        this.list = document.createElement('ul');
        this.list.setAttribute('class', 'lvplayer__playlist__list');
        playlist.appendChild(this.list);


        return playlist;
    }
}
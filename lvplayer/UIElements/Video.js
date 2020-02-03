export class Video {

    constructor() {
        this.DOM = this.createDOMElement();
    }

    createDOMElement() {
        const video = document.createElement('video');
        video.setAttribute('class', 'lvplayer__videoTag');

        this.track = document.createElement('track');
        this.track.setAttribute('class', 'lvplayer__subtitles');
        this.track.setAttribute('kind', 'subtitles');
        this.track.setAttribute('default', 'default');
        video.appendChild(this.track);

        const p = document.createElement('p');
        p.innerHTML =
            "Your broswer can't play videos via HTML5. Please use other broswer.";
        video.appendChild(p);

        return video;
    }
}
export class PlayerPopup {
  constructor() {
    this.DOM = this.createDOMElement();
  }

  createDOMElement() {
    const playerVolumePopup = document.createElement('div');
    playerVolumePopup.setAttribute('class', 'lvplayer__Popup');

    return playerVolumePopup;
  }
}

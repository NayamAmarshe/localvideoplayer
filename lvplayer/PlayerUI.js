import { PlayerWrapper } from './UIElements/PlayerWrapper.js'
import { Video } from './UIElements/Video.js'
import { BtnPlaylist } from './UIElements/btnPlaylist.js'
import { BtnSubtitles } from './UIElements/BtnSubtitles.js'
import { BtnPlay } from './UIElements/BtnPlay.js'
import { BtnVolume } from './UIElements/BtnVolume.js'
import { BtnFullscreen } from './UIElements/BtnFullscreen.js'
import { PlayerTime } from './UIElements/PlayerTime.js'
import { PlayerProgress } from './UIElements/PlayerProgress.js'
import { PlayerVolumeRange } from './UIElements/PlayerVolumeRange.js'
import { PlayerLoadingFile } from './UIElements/PlayerLoadingFile.js'
import { PlayerVolumePopup } from './UIElements/PlayerVolumePopup.js'
import { Playlist } from './UIElements/Playlist.js'

export class PlayerUI {
  constructor(parentContainer) {
    this.root = new PlayerWrapper(parentContainer).DOM;
    this.video = new Video();
    this.btnPlaylist = new BtnPlaylist(parentContainer);
    this.btnSubtitles = new BtnSubtitles(parentContainer);
    this.btnPlay = new BtnPlay();
    this.btnVolume = new BtnVolume();
    this.btnFullscreen = new BtnFullscreen();
    this.playerTime = new PlayerTime();
    this.playerProgress = new PlayerProgress();
    this.playerVolumeRange = new PlayerVolumeRange();
    this.playerLoadingFile = new PlayerLoadingFile();
    this.playerVolumePopup = new PlayerVolumePopup();
    this.playlist = new Playlist();
    this.createInterface();
  }

  createInterface() {
    this.root.appendChild(this.video.DOM);
    this.root.appendChild(this.btnPlaylist.DOM);
    this.root.appendChild(this.btnSubtitles.DOM);
    this.root.appendChild(this.btnPlay.DOM);
    this.root.appendChild(this.btnVolume.DOM);
    this.root.appendChild(this.btnFullscreen.DOM);
    this.root.appendChild(this.playerTime.DOM);
    this.root.appendChild(this.playerProgress.DOM);
    this.root.appendChild(this.playerVolumeRange.DOM);
    this.root.appendChild(this.playerLoadingFile.DOM);
    this.root.appendChild(this.playerVolumePopup.DOM);
    this.root.appendChild(this.playlist.DOM);
  }

}

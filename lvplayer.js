import { PlayerUI } from './lvplayer/PlayerUI.js';

export class LVPlayer {
  constructor(rootClass) {
    this._rootClass = rootClass;
    this._mouseTimer;
    this.playerUI = new PlayerUI(rootClass);
    this.PlayerHandlers();
    this.PlayerEvents();
  }

  PlayerHandlers() {
    this._playerWrapper = this.playerUI.root;
    this._player = this.playerUI.video.DOM;
    this._uploadVideo = this.playerUI.btnPlaylist.DOM;
    this._uploadSubtitles = this.playerUI.btnSubtitles.DOM;
    this._playButton = this.playerUI.btnPlay;
    this._volumeButton = this.playerUI.btnVolume;
    this._fullscreenButton = this.playerUI.btnFullscreen;
    this._playlist = this.playerUI.playlist.DOM;
    this._playlistList = this.playerUI.playlist.list;
    this._playerSubtitles = this.playerUI.video.track;
    this._playerProgress = this.playerUI.playerProgress.DOM;
    this._playerVolumeRange = this.playerUI.playerVolumeRange.DOM;
    this._playerTime = this.playerUI.playerTime.DOM;
    this._playerLoadingFile = this.playerUI.playerLoadingFile.DOM;
    this._playerPopup = this.playerUI.playerPopup.DOM;
    this._buttons = [
      this._uploadVideo,
      this._uploadSubtitles,
      this._playButton.DOM,
      this._volumeButton.DOM,
      this._fullscreenButton.DOM,
    ];
    this._playerElements = [
      this._playerVolumeRange,
      this._playerTime,
      this._playerProgress,
      this._playlist,
      ...this._buttons,
    ];
  }
  PlayerEvents() {
    this._uploadVideo.onchange = e => {
      const collator = new Intl.Collator(undefined, {
        numeric: true,
        sensitivity: 'base',
      });
      const files = [...e.target.files].sort(collator.compare);
      this.uploadFile(files[0]).then(src => this.loadFile(src, 'video'));

      this._playlistList.innerHTML = '';
      if (files.length > 1) {
        for (let i = 1; files.length >= i; i++) {
          this.addToPlaylist(files[i - 1], i);
        }
      }
    };

    this._uploadSubtitles.onchange = e => {
      this.uploadFile(e.target.files[0]).then(src =>
        this.loadFile(src, 'subtitles'),
      );
    };

    this._playerWrapper.onmouseenter = () => {
      this.showGUI();
    };
    this._playerWrapper.onmouseleave = () => {
      this.hideGUI();
    };

    this._player.onmousemove = () => {
      clearTimeout(this._mouseTimer);
      this.showGUI();
      this._mouseTimer = setTimeout(() => {
        this.hideGUI();
      }, 1700);
    };

    this._playerWrapper.ondragover = e => {
      e.preventDefault();
    };

    this._playerWrapper.ondrop = e => {
      e.preventDefault();
      const collator = new Intl.Collator(undefined, {
        numeric: true,
        sensitivity: 'base',
      });
      const files = [...e.dataTransfer.files]
        .filter(file => String(file.type).includes('video'))
        .sort(collator.compare);

      this.uploadFile(files[0]).then(src => this.loadFile(src, 'video'));

      this._playlistList.innerHTML = '';
      if (files.length > 1) {
        for (let i = 1; files.length >= i; i++) {
          this.addToPlaylist(files[i - 1], i);
        }
      }
    };

    this._player.onended = () => {
      if (this.activeElement != undefined) {
        const index = this.activeElement.getAttribute('data-index');

        if (index < this._playlistList.childElementCount) {
          this.activeElement.nextSibling.click();
        }
      }
    };

    this._playButton.DOM.onclick = () => {
      this.togglePlay();
    };

    this._player.onclick = () => {
      this.togglePlay();
    };

    this._player.onpause = () => {
      this._playButton.toggleBgImage('play');
    };

    this._player.onplay = () => {
      this._playButton.toggleBgImage('pause');
    };

    this._player.ontimeupdate = () => {
      Number.prototype.toHHMMSS = function() {
        let sec_num = parseInt(this, 10);
        let hours = Math.floor(sec_num / 3600);
        let minutes = Math.floor((sec_num - hours * 3600) / 60);
        let seconds = sec_num - hours * 3600 - minutes * 60;

        if (hours < 10) {
          hours = '0' + hours;
        }
        if (minutes < 10) {
          minutes = '0' + minutes;
        }
        if (seconds < 10) {
          seconds = '0' + seconds;
        }

        if (hours == 0) {
          return `${minutes}:${seconds}`;
        } else {
          return `${hours}:${minutes}:${seconds}`;
        }
      };

      this._playerProgress.max = this._player.duration;
      this._playerProgress.value = this._player.currentTime;
      this._playerTime.innerHTML = `${this._player.currentTime.toHHMMSS()} / ${this._player.duration.toHHMMSS()}`;
      this.printPlayerProgress();
    };

    this._playerProgress.oninput = e => {
      this._player.currentTime = e.target.value;
      this.printPlayerProgress();
    };

    this._playerVolumeRange.oninput = e => {
      this._player.volume = e.target.value;
    };

    this._player.onvolumechange = () => {
      this._playerVolumeRange.value = this._player.volume;
      this._playerVolumeRange.style.background = `linear-gradient(to right, #C8CCD1 0%, #C8CCD1 ${this
        ._player.volume * 100}%, #83868a ${this._player.volume *
        100}%, #83868a 100%)`;

      switch (true) {
        case this._player.volume === 0:
          this._volumeButton.toggleBgImage('mute');
          break;
        case this._player.volume < 0.25:
          this._volumeButton.toggleBgImage('volume1');
          break;
        case this._player.volume < 0.5:
          this._volumeButton.toggleBgImage('volume2');
          break;
        case this._player.volume < 0.75:
          this._volumeButton.toggleBgImage('volume3');
          break;
        case this._player.volume > 0.75:
          this._volumeButton.toggleBgImage('volume4');
          break;
        default:
          break;
      }
    };

    this._volumeButton.DOM.onclick = () => {
      this.toggleVolume();
    };

    this._player.onfullscreenchange = () => {
      if (this) {
        this._fullscreenButton.toggleBgImage('fullscreen');
      } else {
        this._fullscreenButton.toggleBgImage('minimalize');
      }
    };

    this._fullscreenButton.DOM.onclick = () => {
      this.toggleFullscreen();
    };

    this._playerWrapper.onkeydown = e => {
      this.setShortcut(e);
    };

    document.onfullscreenchange = () => {
      this.fullScreenShortcuts();
    };
  }
  setShortcut(e) {
    if (e.key == ' ') {
      this.togglePlay();
    }
    if (e.key == 'm') {
      this.toggleVolume();
    }
    if (e.key == 'f') {
      this.toggleFullscreen();
    }
    if (e.key == 'ArrowLeft' && e.ctrlKey) {
      if (
        this._player.playbackRate >= 0.5 &&
        this._player.playbackRate - 0.25 > 0
      ) {
        this._player.playbackRate -= 0.25;
        this.showPopup(`x ${this._player.playbackRate}`);
      }
    }
    if (e.key == 'ArrowRight' && e.ctrlKey) {
      if (
        this._player.playbackRate <= 3 &&
        this._player.playbackRate + 0.25 <= 3
      ) {
        this._player.playbackRate += 0.25;
        this.showPopup(`x ${this._player.playbackRate}`);
      }
    }
    if (e.key == 'ArrowLeft' && !e.ctrlKey) {
      if (
        this._player.currentTime != 0 &&
        this._player.currentTime - this._player.duration * 0.025 > 0
      ) {
        this._player.currentTime -= this._player.duration * 0.025;
      }
    }
    if (e.key == 'ArrowRight' && !e.ctrlKey) {
      if (
        this._player.currentTime != this._player.duration &&
        this._player.currentTime + this._player.duration * 0.025 <
          this._player.duration
      ) {
        this._player.currentTime += this._player.duration * 0.025;
      }
    }
    if (e.key == 'ArrowUp') {
      if (this._player.volume <= 0.9) {
        this._player.volume += 0.1;
        this.showPopup(`${Math.floor(this._player.volume * 100)}%`);
      }
    }
    if (e.key == 'ArrowDown') {
      if (this._player.volume >= 0.1) {
        this._player.volume -= 0.1;
        this.showPopup(`${Math.floor(this._player.volume * 100)}%`);
      }
    }
  }
  uploadFile(file) {
    const filePromise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        resolve(new Blob([fileReader.result]));
      };

      fileReader.onerror = () => {
        fileReader.abort();
        reject(console.error('Error during loading file'));
      };

      fileReader.readAsArrayBuffer(file);

      if (!file.name.endsWith('.vtt')) {
        fileReader.onprogress = e => {
          this._playerLoadingFile.max = e.total;
          this._playerLoadingFile.value = e.loaded;
          this._playerLoadingFile.style.opacity = '1';
          if (e.loaded == e.total) {
            this._playerLoadingFile.style.opacity = '0';
          }
        };

        fileReader.onloadend = () => {
          this._player.setAttribute('autoplay', '');
          this._playlist.style.opacity = '1';
        };
      }
    });

    return filePromise;
  }

  loadFile(file, type) {
    if (type === 'video') {
      this._player.src = URL.createObjectURL(file);
    } else {
      this._playerSubtitles.src = URL.createObjectURL(file);
    }
  }

  addToPlaylist(file, i) {
    const name = file.name.substring(0, file.name.lastIndexOf('.'));

    const li = document.createElement('li');
    li.appendChild(document.createTextNode(name));
    li.setAttribute('class', 'lvplayer__playlist__element');
    li.setAttribute('data-index', i);
    li.onclick = e => {
      this.setActiveModifier(e.target);

      this.cleanPlayerSubtitles();

      this.uploadFile(file).then(src => this.loadFile(src, 'video'));
    };

    if (i == 1) {
      li.classList.add('lvplayer__playlist__element--active');
      this.activeElement = li;
    }

    this._playlistList.appendChild(li);
  }

  setActiveModifier(element) {
    if (this.activeElement != undefined) {
      this.activeElement.classList.remove(
        'lvplayer__playlist__element--active',
      );
    }
    element.classList.add('lvplayer__playlist__element--active');
    this.activeElement = element;
  }

  showGUI() {
    for (let element of this._playerElements) {
      element.style.opacity = '1';
    }
  }

  hideGUI() {
    for (let element of this._playerElements) {
      element.style.opacity = '0';
    }
  }

  togglePlay() {
    if (this._player.src != '') {
      if (!this._player.paused) {
        this._player.pause();
      } else {
        this._player.play();
      }
    }
  }

  toggleVolume() {
    if (!this._player.volume == 0) {
      this._volumeButton.toggleBgImage('mute');
      this._player.volume = 0;
      this._playerVolumeRange.value = 0;
    } else {
      this._volumeButton.toggleBgImage('volume4');
      this._player.volume = 1;
      this._playerVolumeRange.value = 1;
    }
  }

  toggleFullscreen() {
    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    ) {
      document.exitFullscreen();
    } else {
      this._player.requestFullscreen();
    }
  }

  fullScreenShortcuts() {
    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    ) {
      document.onkeydown = e => {
        this.setShortcut(e);
      };
      document.onclick = () => {
        this.togglePlay();
      };
    } else {
      document.onkeydown = null;
      document.onclick = null;
    }
  }

  showPopup(msg) {
    this._playerPopup.innerHTML = msg;
    this._playerPopup.style.opacity = 1;
    setTimeout(() => {
      this._playerPopup.style.opacity = 0;
    }, 1500);
  }

  printPlayerProgress() {
    const percentages =
      (this._player.currentTime / this._player.duration) * 100;
    this._playerProgress.style.background = `linear-gradient(to right, #C8CCD1 0%, #C8CCD1 ${percentages}%, #83868a ${percentages}%, #83868a 100%)`;
  }

  cleanPlayerSubtitles() {
    this._playerSubtitles.removeAttribute('src');
    this._uploadSubtitles.value = '';
  }
}

const playerWrapper = document.querySelector('.player');
const player = document.querySelector('.player__videoTag');
const uploadVideo = document.getElementById('uploadVideo');
const uploadSubtitles = document.getElementById('uploadSubtitles');
const playButton = document.querySelector('.button-play');
const playlistButton = document.querySelector('.button-playlist');
const playlist = document.querySelector('.playlist');
const playlistList = document.querySelector('.playlist__list');
const playerSubtitles = document.querySelector('.player__subtitles');
const playerProgress = document.querySelector('.player__progress');
const playerVolumeRange = document.querySelector('.player__volume-range');
const playerTime = document.querySelector('.player__time');
const playerLoadingFile = document.querySelector('.player__loadingFile');
const playerVolumePopup = document.querySelector('.player__volume-popup');
const [...buttons] = document.querySelectorAll('.button');
const playerElements = [playerVolumeRange, playerTime, playerProgress, playlist, ...buttons];
let mouseTimer;


uploadVideo.onchange = function () {

    let files = [...this.files].sort((a, b) => (a.name > b.name) ? 1 : -1);

    loadFile(files[0])
        .then(src => player.src = URL.createObjectURL(src));

    if (files.length > 1) {

        playlistList.innerHTML = "";
        for (let i = 1; files.length >= i; i++) {
            addToPlaylist(files[i - 1], i);
        }

    }

}

uploadSubtitles.onchange = function () {

    loadFile(this.files[0])
        .then(src => playerSubtitles.src = URL.createObjectURL(src));

}

function loadFile(file) {

    let filePromise = new Promise(function (resolve, reject) {

        let fileReader = new FileReader()

        fileReader.onload = () => {
            resolve(new Blob([fileReader.result]));
        };

        fileReader.onerror = () => {
            fileReader.abort();
            reject(console.error('Error during loading file'));
        }

        fileReader.readAsArrayBuffer(file);

        if (!file.name.endsWith('.vtt')) {
            fileReader.onprogress = function (e) {

                playerLoadingFile.max = e.total;
                playerLoadingFile.value = e.loaded;
                playerLoadingFile.style.opacity = "1";
                if (e.loaded == e.total) {
                    playerLoadingFile.style.opacity = "0";
                }

            }

            fileReader.onloadend = function () {

                player.setAttribute("autoplay", "");
                document.querySelector('.playlist').style.opacity = "1";

            };
        }
    });

    return filePromise;
}

function setActiveModifier(element) {

    document.querySelector('.playlist__element--active')
        .classList.remove("playlist__element--active");

    element.classList.add("playlist__element--active");

}

function cleanPlayerSubtitles() {

    playerSubtitles.removeAttribute("src");
    uploadSubtitles.value = "";

}

function addToPlaylist(file, i) {

    let li = document.createElement('li');
    let name = file.name.substring(0, file.name.lastIndexOf('.'));
    li.appendChild(document.createTextNode(name));
    li.setAttribute("class", "playlist__element");
    li.setAttribute("data-index", i);
    li.onclick = function () {

        setActiveModifier(this);

        cleanPlayerSubtitles();

        loadFile(file)
            .then(src => player.src = URL.createObjectURL(src));

    };
    if (i == 1) {
        li.classList.add("playlist__element--active");
    }
    playlistList.appendChild(li);

}

playerWrapper.onmouseenter = () => {
    ShowGUI();
};
playerWrapper.onmouseleave = () => {
    HideGUI();
}

document.onmousemove = function () {

    clearTimeout(mouseTimer);
    ShowGUI();
    mouseTimer = setTimeout(function () {
        HideGUI();
    }, 1700);

}

function ShowGUI() {

    for (let element of playerElements) {
        element.style.opacity = "1";
    }

}

function HideGUI() {

    for (let element of playerElements) {
        element.style.opacity = "0";
    }

}

playerWrapper.ondragover = (e) => {

    e.preventDefault();

}

playerWrapper.ondrop = (e) => {

    e.preventDefault();
    let files = [...e.dataTransfer.files].filter(file => String(file.type).includes("video")).sort((a, b) => (a.name > b.name) ? 1 : -1);

    loadFile(files[0])
        .then(src => player.src = URL.createObjectURL(src))

    if (files.length > 1) {

        playlistList.innerHTML = "";
        for (let i = 1; files.length >= i; i++) {
            addToPlaylist(files[i - 1], i);
        }

    }

}

player.onended = () => {

    let index = document.querySelector('.playlist__element--active').getAttribute('data-index');

    if (index < playlistList.childElementCount) {

        document.querySelector(`li[data-index="${Number(index) + 1}"]`).click();

    }

};

function TogglePlay() {

    if (player.src != '') {
        if (!player.paused) {
            player.pause();
        } else {
            player.play();
        }
    }

}

playButton.onclick = () => {
    TogglePlay();
}

player.onclick = () => {
    TogglePlay();
}

player.onpause = () => {
    playButton.style.backgroundImage = "url('./src/play.svg')";
}

player.onplay = () => {
    playButton.style.backgroundImage = "url('./src/pause.svg')";
}

Number.prototype.toHHMMSS = function () {

    let sec_num = parseInt(this, 10);
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (hours == 0) {
        return `${minutes}:${seconds}`;
    } else {
        return `${hours}:${minutes}:${seconds}`;
    }

}

function printPlayerProgress() {
    let percentages = (player.currentTime / player.duration) * 100;
    playerProgress.style.background = `linear-gradient(to right, #C8CCD1 0%, #C8CCD1 ${percentages}%, #83868a ${percentages}%, #83868a 100%)`;
}

player.ontimeupdate = () => {

    playerProgress.max = player.duration;
    playerProgress.value = player.currentTime;
    playerTime.innerHTML = `${player.currentTime.toHHMMSS()} / ${player.duration.toHHMMSS()}`;
    printPlayerProgress();

}

playerProgress.oninput = function () {

    player.currentTime = this.value;
    printPlayerProgress();

}

playerVolumeRange.oninput = function () {
    player.volume = this.value;
}

player.onvolumechange = () => {

    playerVolumeRange.value = player.volume;
    playerVolumeRange.style.background = `linear-gradient(to right, #C8CCD1 0%, #C8CCD1 ${player.volume * 100}%, #83868a ${player.volume * 100}%, #83868a 100%)`;
    if (player.volume == 0) {
        document.querySelector('.button-volume').style.backgroundImage = "url('./src/mute.svg')";
    } else if (player.volume < .25) {
        document.querySelector('.button-volume').style.backgroundImage = "url('./src/volume1.svg')";
    } else if (player.volume < .5) {
        document.querySelector('.button-volume').style.backgroundImage = "url('./src/volume2.svg')";
    } else if (player.volume < .75) {
        document.querySelector('.button-volume').style.backgroundImage = "url('./src/volume3.svg')";
    } else {
        document.querySelector('.button-volume').style.backgroundImage = "url('./src/volume4.svg')";
    }

}

function ToggleVolume() {

    if (!player.volume == 0) {
        document.querySelector('.button-volume').style.backgroundImage = "url('./src/mute.svg')";
        player.volume = 0;
        playerVolumeRange.value = 0;
    } else {
        document.querySelector('.button-volume').style.backgroundImage = "url('./src/volume4.svg')";
        player.volume = 1;
        playerVolumeRange.value = 1;
    }

}

document.querySelector('.button-volume').onclick = () => {
    ToggleVolume()
};

function ToggleFullscreen() {

    if (document.fullscreenElement) {
        document.exitFullscreen()
    } else {
        player.requestFullscreen();
    }

}

player.onfullscreenchange = function () {

    if (this) {
        document.querySelector('.button-fullscreen').style.backgroundImage = "url('./src/fullscreen.svg')";
    } else {
        document.querySelector('.button-fullscreen').style.backgroundImage = "url('./src/minimalize.svg')";
    }

}

document.querySelector('.button-fullscreen').onclick = () => {
    ToggleFullscreen();
}

document.onkeydown = (e) => {

    if (e.key == " ") {
        TogglePlay();
    }
    if (e.key == "m") {
        ToggleVolume();
    }
    if (e.key == "f") {
        ToggleFullscreen();
    }
    if (e.key == "ArrowLeft") {
        if (player.currentTime != 0 && (player.currentTime - (player.duration * 0.025)) > 0) {
            player.currentTime -= (player.duration * 0.025);
        }
    }
    if (e.key == "ArrowRight") {
        if (player.currentTime != player.duration && (player.currentTime + (player.duration * 0.025)) < player.duration) {
            player.currentTime += (player.duration * 0.025);
        }
    }
    if (e.key == "ArrowUp") {
        if (player.volume <= .9) {
            player.volume += .1;
            playerVolumePopup.innerHTML = `${Math.floor(player.volume * 100)}%`;
            playerVolumePopup.style.opacity = 1;
            setTimeout(function () {
                playerVolumePopup.style.opacity = 0;
            }, 1500);
        }
    }
    if (e.key == "ArrowDown") {
        if (player.volume >= .1) {
            player.volume -= .1;
            playerVolumePopup.innerHTML = `${Math.floor(player.volume * 100)}%`;
            playerVolumePopup.style.opacity = 1;
            setTimeout(function () {
                playerVolumePopup.style.opacity = 0;
            }, 1500);
        }
    }

}
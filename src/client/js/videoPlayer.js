console.log("videoPlayer loaded");

const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volume = document.getElementById("volume");

const handlePlayClick = (e) => {
    if (video.paused) {
        playBtn.innerText = "Pause";
        video.play();
    } else {
        playBtn.innerText = "Play";
        video.pause();
    }
};
const handlePause = () => (playBtn.innerText = "Play");
const handlePlay = () => (playBtn.innerText = "Pause");

const handleMute = (e) => {
    if (video.muted) {
        muteBtn.innerText = "Unmute";
        video.muted = false;
    } else {
        muteBtn.innerText = "Mute";
        video.muted = true;
    }
};

const formatTime = (seconds) => {
    const secondsNum = parseInt(seconds, 10);
    let minutes = Math.floor(secondsNum / 60);
    let remainingSeconds = secondsNum % 60;
    return `${minutes}:${remainingSeconds}`;
};

const handleTimeUpdate = () => {
    time.innerText = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
};

const handleVolumeChange = (e) => {
    const { target } = e;
    video.volume = target.value;
};

const handleLoadedMetadata = () => {
    time.innerText = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
video.addEventListener("pause", handlePause);
video.addEventListener("play", handlePlay);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("volumechange", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
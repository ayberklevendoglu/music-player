const musicContainer = document.querySelector("#music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector("#progress");
const progressContainer = document.querySelector("#progress-container");
const songTitle = document.querySelector("#title");
const cover = document.querySelector("#cover");

// song names
const songs = ["sahara", "jungle", "delilah"];

let songIndex = 2;

const loadSong = (song) => {
  songTitle.textContent = `Currently playing : ${song.toUpperCase()}`;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
};
loadSong(songs[songIndex]);

const playSong = () => {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
};

const pauseSong = () => {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  audio.pause();
};

const previousSong = () => {
  songIndex--;
  if (songIndex < 0) songIndex = songs.length - 1;
  loadSong(songs[songIndex]);
  playSong();
};

const nextSong = () => {
  songIndex++;
  if (songIndex === songs.length) songIndex = 0;
  loadSong(songs[songIndex]);
  playSong();
};

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercentage = (currentTime / duration) * 100;
  progress.style.width = `${progressPercentage}%`;
}

function seek(e) {
  const percent = e.offsetX / this.offsetWidth;
  audio.currentTime = percent * audio.duration;
  progress.value = percent / 100;
}

playBtn.addEventListener("click", () => {
  if (musicContainer.classList.contains("play")) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener("click", previousSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", seek);

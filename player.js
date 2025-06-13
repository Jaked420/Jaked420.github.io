const songs = [
  { title: "🔥 10 Bars Challenge", file: "audio/10_bars_challenge.m4a" },
  { title: "😤 Damn Jake", file: "audio/damn_jake.m4a" },
  { title: "🌙 Last One For The Night", file: "audio/last_one_for_the_night_i_had_fun.m4a" },
  { title: "💨 1", file: "audio/1.m4a" },
  { title: "🦅 Free Bird", file: "audio/free_bird.m4a" },
  { title: "🤔 _)", file: "audio/underscore_paren.m4a" },
  { title: "🛵 1 Scooter Gang v2", file: "audio/1_scooter_gang_v2.m4a" },
  { title: "🙅 They Don't Understand", file: "audio/they_dont_understand.m4a" },
  { title: "📅 2018", file: "audio/2018.m4a" },
  { title: "🦈 Great White", file: "audio/great_white.m4a" },
  { title: "🐶 Young Dog Freestyle", file: "audio/young_dog_freestyle.m4a" },
  { title: "🎮 Apex Legends Freestyle", file: "audio/apex_legends_freestyle.m4a" },
  { title: "❓ idk", file: "audio/idk.m4a" },
  { title: "🦁 Beast", file: "audio/beast.m4a" },
  { title: "❤️ I Love This Beat", file: "audio/i_love_this_beat.m4a" }
];


let currentIndex = 0;
const shuffledIndexes = songs.map((_, i) => i);

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
shuffleArray(shuffledIndexes);

const audio = document.getElementById('audioTrack');
const title = document.getElementById('trackTitle');
const seekBar = document.getElementById('seekBar');

let isReadyToPlay = false;

function loadTrack(index) {
  currentIndex = index;
  const songIndex = shuffledIndexes[index];
  audio.src = songs[songIndex].file;
  title.textContent = songs[songIndex].title;
  seekBar.value = 0;
  isReadyToPlay = false;
  audio.load();
}

audio.addEventListener('canplay', () => {
  isReadyToPlay = true;
  audio.play().catch(e => {
    // Catch play() errors (autoplay restrictions etc)
    console.log('Play error:', e);
  });
});

document.getElementById('playBtn').addEventListener('click', () => {
  if (isReadyToPlay) {
    audio.play();
  }
});

document.getElementById('pauseBtn').addEventListener('click', () => {
  audio.pause();
});

document.getElementById('prevBtn').addEventListener('click', () => {
  loadTrack((currentIndex - 1 + songs.length) % songs.length);
});

document.getElementById('nextBtn').addEventListener('click', () => {
  loadTrack((currentIndex + 1) % songs.length);
});

audio.addEventListener('timeupdate', () => {
  seekBar.value = (audio.currentTime / audio.duration) * 100 || 0;
});

seekBar.addEventListener('input', () => {
  if (audio.duration) {
    audio.currentTime = (seekBar.value / 100) * audio.duration;
  }
});

window.addEventListener('load', () => loadTrack(0));
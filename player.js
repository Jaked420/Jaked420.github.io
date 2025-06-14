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

// Shuffle the playlist
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
shuffleArray(shuffledIndexes);

// DOM elements
const audio = document.getElementById('audioTrack');
const title = document.getElementById('trackTitle');
const seekBar = document.getElementById('seekBar');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Load and play a track
function loadTrack(index) {
  currentIndex = index;
  const songIndex = shuffledIndexes[index];
  const track = songs[songIndex];
  audio.src = track.file;
  title.textContent = track.title;
  seekBar.value = 0;
  audio.play().catch(err => console.log("Auto-play blocked:", err));
}

// Button listeners
playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});
prevBtn.addEventListener('click', () => {
  loadTrack((currentIndex - 1 + songs.length) % songs.length);
});
nextBtn.addEventListener('click', () => {
  loadTrack((currentIndex + 1) % songs.length);
});

// Icon toggle
audio.addEventListener('play', () => playBtn.textContent = '⏸️');
audio.addEventListener('pause', () => playBtn.textContent = '▶️');
audio.addEventListener('ended', () => playBtn.textContent = '▶️');

// Seekbar
audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    seekBar.value = (audio.currentTime / audio.duration) * 100;
  }
});
seekBar.addEventListener('input', () => {
  if (audio.duration) {
    audio.currentTime = (seekBar.value / 100) * audio.duration;
  }
});

// Auto load on page ready
window.addEventListener('DOMContentLoaded', () => loadTrack(0));
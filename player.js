const songs = [
  { title: "10_bars_challenge", file: "audio/10_bars_challenge.m4a" },
  { title: "1", file: "audio/1.m4a" },
  { title: "1_scooter_gang_v2", file: "audio/1_scooter_gang_v2.m4a" },
  { title: "2018", file: "audio/2018.m4a" },
  { title: "another_freestyle", file: "audio/another_freestyle.m4a" },
  { title: "apex_legends_freestyle", file: "audio/apex_legends_freestyle.m4a" },
  { title: "back_2_Da_Trap", file: "audio/back_2_Da_Trap.m4a" },
  { title: "Beast ", file: "audio/Beast .m4a" },  // Note: filename has a space before .m4a
  { title: "damn_jake", file: "audio/damn_jake.m4a" },
  { title: "Early_morning_Freestyle", file: "audio/Early_morning_Freestyle.m4a" },
  { title: "first_48", file: "audio/first_48.m4a" },
  { title: "free_bird", file: "audio/free_bird.m4a" },
  { title: "freestyle_again", file: "audio/freestyle_again.m4a" },
  { title: "great_white", file: "audio/great_white.m4a" },
  { title: "idk", file: "audio/idk.m4a" },
  { title: "i_love_this_beat", file: "audio/i_love_this_beat.m4a" },
  { title: "last_one_for_the_night_i_had_fun", file: "audio/last_one_for_the_night_i_had_fun.m4a" },
  { title: "Letting_Up", file: "audio/Letting_Up.m4a" },
  { title: "they_dont_understand", file: "audio/they_dont_understand.m4a" },
  { title: "Use_EarBudz", file: "audio/Use_EarBudz.m4a" },
  { title: "Where_U_AT", file: "audio/Where_U_AT.m4a" },
  { title: "young_dog_freestyle", file: "audio/young_dog_freestyle.m4a" }
];


let currentIndex = 0;
const shuffledIndexes = songs.map((_, i) => i);

// Shuffle only if not saved
if (!localStorage.getItem('shuffledOrder')) {
  shuffleArray(shuffledIndexes);
  localStorage.setItem('shuffledOrder', JSON.stringify(shuffledIndexes));
} else {
  const savedOrder = JSON.parse(localStorage.getItem('shuffledOrder'));
  if (Array.isArray(savedOrder) && savedOrder.length === songs.length) {
    savedOrder.forEach((val, i) => shuffledIndexes[i] = val);
  }
}

// DOM elements
const audio = document.getElementById('audioTrack');
const title = document.getElementById('trackTitle');
const seekBar = document.getElementById('seekBar');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Load a track by index
function loadTrack(index, restore = false) {
  currentIndex = index;
  const songIndex = shuffledIndexes[index];
  const track = songs[songIndex];
  audio.src = track.file;
  title.textContent = track.title;
  seekBar.value = 0;

  // Restore time and state if needed
  if (restore) {
    const savedTime = parseFloat(localStorage.getItem('mediaTime') || '0');
    const wasPlaying = localStorage.getItem('mediaPlaying') === 'true';
    audio.currentTime = isNaN(savedTime) ? 0 : savedTime;
    if (wasPlaying) {
      audio.play().catch(err => console.log("Auto-play blocked:", err));
    }
  } else {
    audio.play().catch(err => console.log("Auto-play blocked:", err));
  }
}

// Seekbar sync
audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    seekBar.value = (audio.currentTime / audio.duration) * 100;
    localStorage.setItem('mediaTime', audio.currentTime.toString());
  }
});

// Button controls
playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    localStorage.setItem('mediaPlaying', 'true');
  } else {
    audio.pause();
    localStorage.setItem('mediaPlaying', 'false');
  }
});
prevBtn.addEventListener('click', () => {
  loadTrack((currentIndex - 1 + songs.length) % songs.length);
});
nextBtn.addEventListener('click', () => {
  loadTrack((currentIndex + 1) % songs.length);
});

// Seek manually
seekBar.addEventListener('input', () => {
  if (audio.duration) {
    audio.currentTime = (seekBar.value / 100) * audio.duration;
  }
});

// Icon sync
audio.addEventListener('play', () => {
  playBtn.textContent = '⏸️';
  localStorage.setItem('mediaPlaying', 'true');
});
audio.addEventListener('pause', () => {
  playBtn.textContent = '▶️';
  localStorage.setItem('mediaPlaying', 'false');
});
audio.addEventListener('ended', () => {
  playBtn.textContent = '▶️';
});

// Auto load
window.addEventListener('DOMContentLoaded', () => {
  const savedIndex = parseInt(localStorage.getItem('mediaIndex') || '0');
  loadTrack(savedIndex, true);
});

// Save current track index
audio.addEventListener('loadeddata', () => {
  localStorage.setItem('mediaIndex', currentIndex.toString());
});

// Shuffle function
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

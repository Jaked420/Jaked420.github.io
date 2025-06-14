window.addEventListener('scroll', () => {
  const footer = document.getElementById('pageFooter');
  const player = document.getElementById('mediaPlayer');

  if (!footer || !player) return;

  const footerRect = footer.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (footerRect.top <= windowHeight) {
    // Footer is visible or near bottom — show player below footer
    player.classList.add('at-footer');
  } else {
    // Footer not visible — fix player to bottom
    player.classList.remove('at-footer');
  }
});
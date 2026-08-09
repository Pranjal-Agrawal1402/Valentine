(function () {
  const storageKey = "valentineMusicEnabled";
  const audioId = "valentineMusic";
  const audioSrc = "congratulations.mp3";
  const isLastPage = /(^|\/)(lastpage\.html)$/i.test(window.location.pathname);

  function ensureAudioElement() {
    let audio = document.getElementById(audioId);
    if (!audio) {
      audio = document.createElement("audio");
      audio.id = audioId;
      audio.preload = "auto";
      audio.loop = true;
      audio.style.display = "none";
      document.body.appendChild(audio);
    }

    if (!audio.src || new URL(audio.src, window.location.href).pathname !== "/" + audioSrc) {
      audio.src = audioSrc;
    }

    return audio;
  }

  function startMusic() {
    window.localStorage.setItem(storageKey, "true");

    if (isLastPage) {
      const audio = document.getElementById(audioId);
      if (audio) {
        audio.pause();
      }
      return;
    }

    const audio = ensureAudioElement();
    audio.play().catch(function () {
      // Ignore autoplay restrictions until the user interacts with the page.
    });
  }

  window.enableMusicAndGo = function (url) {
    startMusic();
    window.location.href = url;
  };

  document.addEventListener("click", startMusic, { once: true });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startMusic);
  } else {
    startMusic();
  }
})();

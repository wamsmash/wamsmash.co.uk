(function () {
  const STORAGE_KEY = "wamsmash_player_state_v1";

  const TRACKS = [
    {
      id: "chaos",
      title: "CHAOS",
      lane: "red",
      year: "2026",
      audio: "/assets/audio/chaos.mp3",
      cover: "/assets/img/covers/chaos.jpg",
      note: "Modern Parable",
      blurb: "Red lane flagship. Confrontation, contrast, pressure inside the cockpit.",
      tags: "red lane, confrontation, pressure, duality, neon noir",
    },
    {
      id: "bonfire",
      title: "BONFIRE",
      lane: "blue",
      year: "2026",
      audio: "/assets/audio/bonfire.mp3",
      cover: "/assets/img/covers/bonfire.jpg",
      note: "High energy",
      blurb: "Blue lane surge. Heat in the cold, forward momentum without hesitation.",
      tags: "blue lane, energy, ignition, momentum, night drive",
    },
    {
      id: "star",
      title: "STAR",
      lane: "iridescent",
      year: "2026",
      audio: "/assets/audio/star.mp3",
      cover: "/assets/img/covers/star.jpg",
      note: "Anthem",
      blurb: "Iridescent anthem. Spotlight tension between visibility and vulnerability.",
      tags: "iridescent lane, anthem, spotlight, performance, exposure",
    },
    {
      id: "equinox",
      title: "EQUINOX",
      lane: "blue",
      year: "2026",
      audio: "/assets/audio/equinox.mp3",
      cover: "/assets/img/covers/equinox.jpg",
      note: "Lift",
      blurb: "Blue lane balance. Light and dark split clean down the centre.",
      tags: "blue lane, balance, duality, eclipse, symmetry",
    },
    {
      id: "mary",
      title: "MARY",
      lane: "blue",
      year: "2026",
      audio: "/assets/audio/mary.mp3",
      cover: "/assets/img/covers/mary.jpg",
      note: "Story",
      blurb: "Blue lane narrative. Intimate story under controlled green glow.",
      tags: "blue lane, story, intimacy, late night, character study",
    },
    {
      id: "arcraiders",
      title: "ARC RAIDERS",
      lane: "green",
      year: "2026",
      audio: "/assets/audio/arc-raiders.mp3",
      cover: "/assets/img/covers/arcraiders.jpg",
      note: "Gaming",
      blurb: "Green lane propulsion. Tactical movement through structured resistance.",
      tags: "green lane, drive, tactical, forward motion, industrial",
    },
    {
      id: "hold",
      title: "HOLD",
      lane: "pink",
      year: "2026",
      audio: "/assets/audio/hold.mp3",
      cover: "/assets/img/covers/hold.jpg",
      note: "Control",
      blurb: "Pink lane restraint. Tension contained without collapse.",
      tags: "pink lane, control, tension, discipline, restraint",
    },
    {
      id: "breach",
      title: "BREACH",
      lane: "iridescent",
      year: "2026",
      audio: "/assets/audio/breach.mp3",
      cover: "/assets/img/covers/breach.jpg",
      note: "Pressure",
      blurb: "Iridescent pressure point. Threshold moment before impact.",
      tags: "iridescent lane, pressure, threshold, rupture, structural tension",
    },
    {
      id: "jungle",
      title: "JUNGLE",
      lane: "red",
      year: "2026",
      audio: "/assets/audio/jungle.mp3",
      cover: "/assets/img/covers/jungle.jpg",
      note: "Impact",
      blurb: "Red lane force. Instinct, rhythm, environment pushing back.",
      tags: "red lane, impact, instinct, rhythm, primal energy",
    },
    {
      id: "thedeviliswicked",
      title: "THE DEVIL IS WICKED",
      lane: "red",
      year: "2026",
      audio: "/assets/audio/thedeviliswicked.mp3",
      cover: "/assets/img/covers/thedeviliswicked.jpg",
      note: "Judgement",
      blurb: "Red lane judgement. Cold authority, weight without spectacle.",
      tags: "red lane, judgement, authority, underworld, industrial noir",
    }
  ];

  function $(sel, root = document) {
    return root.querySelector(sel);
  }

  function createPlayerBar() {
    const bar = document.createElement("div");
    bar.className = "playerBar";
    bar.innerHTML = `
      <div class="playerInner">
        <div class="playerNow">
          <div class="playerNowTitle" id="wmNowTitle">WAMSMASH</div>
          <div class="playerNowSub" id="wmNowSub">Select a track</div>
        </div>
        <div class="playerControls">
          <audio id="wmAudio" controls preload="none"></audio>
        </div>
      </div>
    `;
    document.body.appendChild(bar);
    return bar;
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  function findTrackById(id) {
    return TRACKS.find(t => t.id === id) || null;
  }

  function setNowPlayingUI(track) {
    const title = $("#wmNowTitle");
    const sub = $("#wmNowSub");
    if (!title || !sub) return;

    if (!track) {
      title.textContent = "WAMSMASH";
      sub.textContent = "Select a track";
      return;
    }

    title.textContent = track.title;
    sub.textContent = `${track.lane} lane, ${track.note}`;
  }

  function setAudioSource(audioEl, track) {
    if (!audioEl || !track) return;
    if (audioEl.getAttribute("data-track-id") === track.id) return;

    audioEl.src = track.audio;
    audioEl.setAttribute("data-track-id", track.id);
  }

  function wireAudioPersistence(audioEl) {
    audioEl.addEventListener("timeupdate", function () {
      const id = audioEl.getAttribute("data-track-id");
      if (!id) return;

      saveState({
        trackId: id,
        time: audioEl.currentTime || 0,
        paused: audioEl.paused
      });
    });

    audioEl.addEventListener("pause", function () {
      const state = loadState() || {};
      state.paused = true;
      saveState(state);
    });

    audioEl.addEventListener("play", function () {
      const state = loadState() || {};
      state.paused = false;
      saveState(state);
    });
  }

  function restoreAudio(audioEl) {
    const state = loadState();
    if (!state || !state.trackId) return;

    const track = findTrackById(state.trackId);
    if (!track) return;

    setNowPlayingUI(track);
    setAudioSource(audioEl, track);

    const resumeTime = Number(state.time || 0);
    const shouldPlay = state.paused === false;

    audioEl.addEventListener("loadedmetadata", function once() {
      audioEl.removeEventListener("loadedmetadata", once);
      if (resumeTime > 0 && isFinite(resumeTime)) audioEl.currentTime = resumeTime;
      if (shouldPlay) audioEl.play().catch(() => {});
    });
  }

  function renderFeaturedGrid() {
    const mount = document.getElementById("wmFeatured");
    if (!mount) return;

    mount.innerHTML = "";

    for (const track of TRACKS) {
      const card = document.createElement("div");
      card.className = "card";
card.innerHTML = `
  <div class="cardImg">
    <img src="${track.cover}" alt="${track.title} cover">
    <div class="cardInfo">
      <div class="cardInfoInner">
        <div class="cardInfoTitle">${track.title}</div>
        <div class="cardInfoMeta">${track.lane} lane, ${track.note}</div>
        ${track.blurb ? `<div class="cardInfoBlurb">${track.blurb}</div>` : ``}
        ${track.tags ? `<div class="cardInfoTags">${track.tags}</div>` : ``}
      </div>
    </div>
  </div>

  <div class="cardTop">
    <div>
      <h3 class="cardTitle">${track.title}</h3>
      <div class="cardMeta">${track.lane} lane, ${track.note}</div>
    </div>
    <div class="badge">${track.year}</div>
  </div>

  <div class="cardActions">
    <button class="btn btnPrimary" data-play="${track.id}">Play</button>
    <a class="btn" href="/music/index.html#${track.id}">Details</a>
  </div>
`;
      mount.appendChild(card);
    }
  }

  function wirePlayButtons(audioEl) {
    document.addEventListener("click", function (e) {
      const btn = e.target.closest("[data-play]");
      if (!btn) return;

      const id = btn.getAttribute("data-play");
      const track = findTrackById(id);
      if (!track) return;

      setNowPlayingUI(track);
      setAudioSource(audioEl, track);

      audioEl.play().catch(() => {});
    });
  }

  function renderMusicList() {
    const mount = document.getElementById("wmMusicList");
    if (!mount) return;

    mount.innerHTML = "";

    for (const track of TRACKS) {
      const row = document.createElement("div");
      row.className = "card";
row.innerHTML = `
  <div class="cardImg">
    <img src="${track.cover}" alt="${track.title} cover">
    <div class="cardInfo">
      <div class="cardInfoInner">
        <div class="cardInfoTitle">${track.title}</div>
        <div class="cardInfoMeta">${track.lane} lane, ${track.note}</div>
        ${track.blurb ? `<div class="cardInfoBlurb">${track.blurb}</div>` : ``}
        ${track.tags ? `<div class="cardInfoTags">${track.tags}</div>` : ``}
      </div>
    </div>
  </div>

  <div class="cardTop">
    <div>
      <h3 class="cardTitle" id="${track.id}">${track.title}</h3>
      <div class="cardMeta">${track.lane} lane, ${track.note}</div>
    </div>
    <div class="badge">${track.year}</div>
  </div>

  <div class="cardActions">
    <button class="btn btnPrimary" data-play="${track.id}">Play</button>
  </div>
`;
      mount.appendChild(row);
    }
  }

  function init() {
    createPlayerBar();

    const audioEl = $("#wmAudio");
    wireAudioPersistence(audioEl);
    restoreAudio(audioEl);

    renderFeaturedGrid();
    renderMusicList();
    wirePlayButtons(audioEl);

    if (!audioEl.getAttribute("data-track-id")) setNowPlayingUI(null);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

/* jshint esversion: 6 */
(function () {
  const STORAGE_KEY = "wamsmash_player_state_v1";
  const FEATURED_COUNT = 6;

  const TRACKS = [
    {
      id: "chaos",
      title: "CHAOS",
      lane: "red",
      year: "2025",
      audio: "/assets/audio/chaos.mp3",
      cover: "/assets/img/covers/chaos.jpg",
      note: "",
      blurb: "Borrowed power. No rules\nPredators eat. Allies ghost\nGates shut. No way back in",
      tags: "modern parable, jungle leaning drums, cinematic pressure, high contrast",
    },
    {
      id: "bonfire",
      title: "BONFIRE",
      lane: "blue",
      year: "2025",
      audio: "/assets/audio/bonfire.mp3",
      cover: "/assets/img/covers/bonfire.jpg",
      note: "",
      blurb: "Sun on the snow. Cabin holds\nShortcuts wash out. Weight stays\nI just need something that doesn’t crack",
      tags: "arctic ignition\ncabin under pressure\nghost drift narrative\nheavy drop contrast",
    },
    {
      id: "star",
      title: "STAR",
      lane: "yellow",
      year: "2026",
      audio: "/assets/audio/star.mp3",
      cover: "/assets/img/covers/star.jpg",
      note: "",
      blurb: "Men pull closer. Light gets warmer\nPower in the quiet tilt\nDo you play you or me",
      tags: "brass driven rhythm\nlatin pulse undertone\nspotlight psychology\nperformance tension",
    },
    {
      id: "equinox",
      title: "EQUINOX",
      lane: "iridescent",
      year: "2026",
      audio: "/assets/audio/equinox.mp3",
      cover: "/assets/img/covers/equinox.jpg",
      note: "",
      blurb: "Cold divides. Warm replies\nTempo shifts. Keys turn\nThe line holds",
      tags: "season cycle form\ntempo and key modulation\npiano sax call response\nanalogue meets aggressive",
    },
    {
      id: "mary",
      title: "MARY",
      lane: "green",
      year: "2026",
      audio: "/assets/audio/mary.mp3",
      cover: "/assets/img/covers/mary.jpg",
      note: "",
      blurb: "Stillness in a crowded room\nShe reads past the surface\nNothing lost. It’s now enough",
      tags: "downtempo regulation\nreggae pulse undercurrent\nsynth spine motif\nrestorative tension",
    },
    {
      id: "arcraiders",
      title: "ARC RAIDERS",
      lane: "green",
      year: "2026",
      audio: "/assets/audio/arc-raiders.mp3",
      cover: "/assets/img/covers/arcraiders.jpg",
      note: "",
      blurb: "Green lane propulsion. Tactical movement through structured resistance.",
      tags: "uk grime cadence\ndubstep texture pressure\ntactical survival rhythm\nindustrial machine threat",
    },
    {
      id: "hold",
      title: "HOLD",
      lane: "pink",
      year: "2026",
      audio: "/assets/audio/hold.mp3",
      cover: "/assets/img/covers/hold.jpg",
      note: "",
      blurb: "Edge before release\nNo names. I’m here\nFeel it start. Hold",
      tags: "dubstep with sax lead\nhiphop swing drums\ncontrolled bounce bass\ncarnival edge tension",
    },
    {
      id: "breach",
      title: "BREACH",
      lane: "iridescent",
      year: "2026",
      audio: "/assets/audio/breach.mp3",
      cover: "/assets/img/covers/breach.jpg",
      note: "",
      blurb: "Brick codes speak\nGrey wind through back lanes\nI’ll stand when the night gets rough",
      tags: "uk regional hiphop\nnorth east narrative\ncomfort chorus contrast\nbleak urban tension",
    },
    {
      id: "jungle",
      title: "JUNGLE",
      lane: "red",
      year: "2026",
      audio: "/assets/audio/jungle.mp3",
      cover: "/assets/img/covers/jungle.jpg",
      note: "",
      blurb: "Predators parade. City shapes\nFeast or fall. Who’s next\nWalk away slow. Bite back",
      tags: "cinematic end credits\njungle leaning drums\nelectro bassline drive\nvocal scratch texture",
    },
    {
      id: "thedeviliswicked",
      title: "THE DEVIL IS WICKED",
      lane: "red",
      year: "2026",
      audio: "/assets/audio/thedeviliswicked.mp3",
      cover: "/assets/img/covers/thedeviliswicked.jpg",
      note: "",
      blurb: "So you say you run this game\nHold that pose. Prove it\n2 tonne steel on the back",
      tags: "liquid drum and bass\njamaican vocal influence\npressure proof narrative\nguardian stance energy",
    },
    {
      id: "dreams",
      title: "DREAMS",
      lane: "blue",
      year: "2026",
      audio: "/assets/audio/dreams.mp3",
      cover: "/assets/img/covers/dreams.jpg",
      note: "",
      blurb: "Bathroom floor. Mirror empty\nYou appeared where you don’t belong\nCouldn’t get to you. Drift away",
      tags: "vocal modulation highlight\ndream piano and sax\ndubstep drop contrast\nunresolved desire held",
    },
    {
      id: "snowberry",
      title: "SNOWBERRY",
      lane: "blue",
      year: "2026",
      audio: "/assets/audio/snowberry.mp3",
      cover: "/assets/img/covers/snowberry.jpg",
      note: "",
      blurb: "Sweet in the cold\nLetters through the phone\nWinter turns to home",
      tags: "liquid drum and bass\nwinter atmosphere pads\nfemale melodic lead\ndubstep bass undercurrent",
    },
    {
      id: "greenmachine",
      title: "GREEN MACHINE",
      lane: "green",
      year: "2026",
      audio: "/assets/audio/green-machine.mp3",
      cover: "/assets/img/covers/green-machine.jpg",
      note: "",
      blurb: "Fizzy on the inside\nDeep sub underneath\nStep inside the green machine",
      tags: "half time hiphop drums\ntropical percussion layer\nhypnotic bassline drive\nurban dubstep contrast",
    },
    {
      id: "jimmy",
      title: "JIMMY",
      lane: "blue",
      year: "2026",
      audio: "/assets/audio/jimmy.mp3",
      cover: "/assets/img/covers/jimmy.jpg",
      note: "",
      blurb: "Mouth too quick. Room goes quiet\nHeartbeat in the street\nRead the moment before you speak",
      tags: "rock drums with sax lead\nvocal scratch textures\nsocial realism narrative\ncall and response hook",
    },
    {
      id: "jazzbaby",
      title: "JAZZ BABY",
      lane: "orange",
      year: "2026",
      audio: "/assets/audio/jazz-baby.mp3",
      cover: "/assets/img/covers/jazz-baby.jpg",
      note: "",
      blurb: "Loose shoulders. Time opens\nPlayful fragments drift past\nStay present. Let it melt",
      tags: "jazz dubstep fusion\nrelaxed swing timing\nmelodic fragment flow\nwarm decompression",
    },
    {
      id: "dancefloorsaviour",
      title: "DANCE FLOOR SAVIOUR",
      lane: "yellow",
      year: "2026",
      audio: "/assets/audio/dance-floor-saviour.mp3",
      cover: "/assets/img/covers/dance-floor-saviour.jpg",
      note: "",
      blurb: "Early hook. Groove first\nVintage flex through vapour\nStill the dance floor saviour",
      tags: "uk dance radio energy\npunchy kick warm bass\nchant driven topline\nclub translation ready",
    },
    {
      id: "mylove",
      title: "MY LOVE",
      lane: "blue",
      year: "2026",
      audio: "/assets/audio/my-love.mp3",
      cover: "/assets/img/covers/my-love.jpg",
      note: "",
      blurb: "Borrowed melodies fade\nEvery note finally mine\nNow it sounds like something new",
      tags: "intimate piano intro\nidentity shift narrative\nglitch break contrast\nanthemic melodic arc",
    },
    {
      id: "monkeyman",
      title: "MONKEY MAN",
      lane: "red",
      year: "2026",
      audio: "/assets/audio/monkey-man.mp3",
      cover: "/assets/img/covers/monkey-man.jpg",
      note: "",
      blurb: "First swing lands on his brother\nWild beast in borrowed skin\nNo comment",
      tags: "metal dubstep crossover\nfast live drums energy\nfuzzy guitar drive\nprimal aggression rhythm",
    }
  ];

  const LINKS = [
    { label: "Spotify", href: "https://open.spotify.com/artist/4s68tFsNBcKZSDB5Ja4HQl", note: "Canonical releases", icon: "spotify" },
    { label: "SoundCloud", href: "https://soundcloud.com/wamsmash", note: "Playground and iteration", icon: "soundcloud" },
    { label: "YouTube", href: "https://www.youtube.com/@wamsmash", note: "Visual hub", icon: "youtube" },
    { label: "Instagram", href: "https://www.instagram.com/wamsmash", note: "Updates", icon: "instagram" },
    { label: "X", href: "https://x.com/wamsmash_", note: "Updates", icon: "x" },
    { label: "Bandcamp", href: "https://wamsmash.bandcamp.com/", note: "Direct support and catalogue", icon: "bandcamp" }
  ];

  const PRESS = [
    {
      source: "RetroReverbRecords",
      href: "https://www.retroreverbrecords.com/",
      quote: "“CHAOS is a seriously hard, high pressure electronic banger with a clear modern and genre bending style”"
    },
    {
      source: "College Music",
      href: "https://collegemusic.co.uk/",
      quote: "“Cool track with impressive singing and strong energy”"
    },
    {
      source: "Synergy FM",
      href: "https://synergyfm.net/",
      quote: "“It’s well produced and has a strong vibe”"
    },
    {
      source: "Boulimique de Musique, Les Saveurs du Jour",
      href: "https://boulimiquedemusique.blogspot.com/2026/02/la-steppe-awake-dreaming-wamsmash-les.html",
      quote: "“L'artiste britannique lance un morceau bass music à la sauce de Dub FX pour l'approche doucement bouncy. L'interprétation vocale féminine bourrée d'attitude véhicule un récit poétique, telle une fable des temps modernes, débordante de métaphores empreintes d'une touche de spiritualité.”"
    },
  ];

  function renderPress() {
    const mount = document.getElementById("wmPress");
    if (!mount) return;

    mount.innerHTML = "";

    for (const item of PRESS) {
      const a = document.createElement("a");
      a.className = "pressCard";
      a.href = item.href;
      a.target = "_blank";
      a.rel = "noopener noreferrer";

      a.innerHTML = `
        <div class="pressTop">
          <div class="pressSource">${item.source}</div>
        </div>
        <div class="pressQuote">${item.quote}</div>
      `;

      mount.appendChild(a);
    }
  }

  function laneLabel(lane) {
    const v = String(lane || "").toLowerCase();
    if (v === "red") return "🔴 RED LANE";
    if (v === "blue") return "🔵 BLUE LANE";
    if (v === "green") return "🟢 GREEN LANE";
    if (v === "yellow") return "🟡 YELLOW LANE";
    if (v === "pink") return "🩷 PINK LANE";
    if (v === "orange") return "🟠 ORANGE LANE";
    if (v === "iridescent") return "🫧 IRIDESCENT";
    return (v ? v.toUpperCase() : "LANE");
  }

  function laneDotColor(lane) {
    const v = String(lane || "").toLowerCase();
    if (v === "red") return "rgba(255, 60, 90, 0.95)";
    if (v === "blue") return "rgba(60, 180, 255, 0.95)";
    if (v === "green") return "rgba(60, 255, 170, 0.95)";
    if (v === "yellow") return "rgba(255, 210, 60, 0.95)";
    if (v === "pink") return "rgba(255, 80, 210, 0.95)";
    if (v === "orange") return "rgba(255, 140, 60, 0.95)";
    if (v === "iridescent") return "rgba(170, 210, 255, 0.95)";
    return "rgba(255,255,255,0.35)";
  }

  function ensureBrandPulseDot() {
    const header = document.querySelector("header");
    if (!header) return null;

    const brand = header.querySelector("h1, .brand, .logo, a");
    if (!brand) return null;

    const existing = header.querySelector("#wmPulseDot");
    if (existing) return existing;

    const dot = document.createElement("span");
    dot.id = "wmPulseDot";
    dot.className = "wmPulseDot";
    dot.setAttribute("aria-hidden", "true");

    brand.insertAdjacentElement("afterend", dot);

    return dot;
  }

  function updateBrandPulseDot(track) {
    const dot = ensureBrandPulseDot();
    if (!dot) return;

    const lane = track && track.lane ? track.lane : "";
    dot.style.background = laneDotColor(lane);

    const playing = wmAudio && !wmAudio.paused && !wmAudio.ended;
    dot.classList.toggle("isPlaying", !!playing);
  }

  function $(sel, root = document) {
    return root.querySelector(sel);
  }

  function $all(sel, root = document) {
    return Array.from(root.querySelectorAll(sel));
  }

  const ICONS = {
    spotify: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.6 14.4a.9.9 0 01-1.24.3c-3.4-2.1-7.7-2.6-12.7-1.4a.9.9 0 11-.42-1.75c5.45-1.3 10.2-.75 14 1.6.42.26.55.82.3 1.25zm1.8-3.1a1.1 1.1 0 01-1.5.37c-3.9-2.4-9.9-3.1-14.6-1.7a1.1 1.1 0 01-.64-2.1c5.4-1.6 12-.84 16.6 2a1.1 1.1 0 01.37 1.43zm.15-3.3C14.9 7.8 8.1 7.6 4.3 8.8a1.3 1.3 0 01-.75-2.5c4.4-1.3 12.1-1 16.8 1.8a1.3 1.3 0 01-1.78 1.9z"/></svg>`,
    soundcloud: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 11.2V21h8.2a3.8 3.8 0 000-7.6c-.3 0-.6 0-.9.1A5.5 5.5 0 007 10.2c0 .3 0 .6.1.9l.4 2h.2v-3l.4 3h.2l.4-4 .4 4h.2l.4-5 .4 5h.2l.4-2.8.4 2.8H11zM3.6 12.2a.8.8 0 00-.6.8V21h1.2v-8a.8.8 0 00-.6-.8zm2.2-1a.8.8 0 00-.6.8V21h1.2v-9a.8.8 0 00-.6-.8z"/></svg>`,
    youtube: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.6 7.2a3 3 0 00-2.1-2.1C17.7 4.6 12 4.6 12 4.6s-5.7 0-7.5.5A3 3 0 002.4 7.2 31.4 31.4 0 002.4 12a31.4 31.4 0 00.0 4.8 3 3 0 002.1 2.1c1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5a3 3 0 002.1-2.1A31.4 31.4 0 0021.6 12a31.4 31.4 0 000-4.8zM10.2 15.2V8.8L15.8 12l-5.6 3.2z"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 2h9A5.5 5.5 0 0122 7.5v9A5.5 5.5 0 0116.5 22h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2zm0 2A3.5 3.5 0 004 7.5v9A3.5 3.5 0 007.5 20h9a3.5 3.5 0 003.5-3.5v-9A3.5 3.5 0 0016.5 4h-9zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm5.6-2.2a1 1 0 110 2 1 1 0 010-2z"/></svg>`,
    x: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 2H22l-6.8 7.8L23 22h-6.6l-5.2-6.5L5.6 22H2.5l7.3-8.4L1 2h6.8l4.7 5.9L18.9 2zm-1.2 18h1.7L6.1 3.9H4.3L17.7 20z"/></svg>`,
    bandcamp: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.7 7H22l-4.9 10H9.3L14.7 7zM2 7h9.1L6.2 17H2V7z"/></svg>`,
  };

  function iconMarkup(name) {
    const svg = ICONS[name] || "";
    return `<div class="linkIcon" aria-hidden="true">${svg}</div>`;
  }

  function readJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }

  function writeJson(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {}
  }

  function updateLeaderboard(gameKey, score) {
    const lbKey = `wamsmash_lb_${gameKey}`;
    const list = readJson(lbKey, []);

    const best = list.length ? Math.max.apply(null, list.map(x => x.score || 0)) : 0;
    if (score <= best) return list.slice(0, 5);

    const entry = { initials: "YOU", score, ts: Date.now() };

    const next = [entry].concat(list)
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .slice(0, 20);

    writeJson(lbKey, next);
    return next.slice(0, 5);
  }

  function renderLeaderboard(list) {
    const rows = (list || []).slice(0, 5).map((x, i) => {
      const a = String(x.initials || "YOU").toUpperCase();
      const s = String(x.score || 0);
      return `<div style="display:flex; justify-content:space-between; gap:10px;"><div>${i + 1}. ${a}</div><div>${s}</div></div>`;
    }).join("");
    return rows || `<div style="opacity:0.75;">No scores yet</div>`;
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  function findTrackById(id) {
    return TRACKS.find(t => t.id === id) || null;
  }

  function hardenAudioElement(audioEl) {
    if (!audioEl) return;
    audioEl.setAttribute("preload", "none");
    audioEl.setAttribute("playsinline", "");
    audioEl.setAttribute("controlsList", "nodownload noplaybackrate noremoteplayback");
    audioEl.setAttribute("disableRemotePlayback", "");
  }

  let wmAudio = null;
  let currentTrackId = "";
  let shuffleOn = true;
  let recentQueue = [];

  function persistPlayerState(opts) {
    if (!wmAudio) return;
    const trackId = wmAudio.getAttribute("data-track-id") || currentTrackId || "";
    const t = (typeof wmAudio.currentTime === "number" && isFinite(wmAudio.currentTime)) ? wmAudio.currentTime : 0;
    const paused = !!wmAudio.paused;

    saveState({
      trackId,
      time: Math.max(0, t),
      paused,
      shuffleOn,
      recentQueue: recentQueue.slice(-20),
      currentTrackId: currentTrackId || trackId || "",
      ts: Date.now(),
      reason: (opts && opts.reason) ? String(opts.reason) : ""
    });
  }

  function restorePlayerState() {
    if (!wmAudio) return;

    const st = readJson(STORAGE_KEY, null);
    if (!st || !st.trackId) return;

    const track = findTrackById(st.trackId);
    if (!track) return;

    if (typeof st.shuffleOn === "boolean") shuffleOn = st.shuffleOn;
    if (Array.isArray(st.recentQueue)) recentQueue = st.recentQueue.slice(-20);
    currentTrackId = track.id;

    setNowPlayingUI(track);
    setAudioSource(wmAudio, track);

    const wantTime = (typeof st.time === "number" && isFinite(st.time)) ? st.time : 0;
    const wantPaused = (typeof st.paused === "boolean") ? st.paused : true;

    const applyTimeAndMaybePlay = function () {
      try {
        wmAudio.currentTime = Math.max(0, wantTime);
      } catch (e) {}

      if (!wantPaused) {
        wmAudio.play().catch(() => {});
      } else {
        wmAudio.pause();
      }
      updateBrandPulseDot(track);
    };

    if (wmAudio.readyState >= 1) {
      applyTimeAndMaybePlay();
    } else {
      wmAudio.addEventListener("loadedmetadata", applyTimeAndMaybePlay, { once: true });
    }
  }

  function pickNextTrackId() {
    const ids = TRACKS.map(t => t.id);
    if (!ids.length) return "";

    const last = currentTrackId;
    const avoid = new Set(recentQueue.slice(-6));
    let pool = ids.filter(id => id !== last && !avoid.has(id));
    if (!pool.length) pool = ids.filter(id => id !== last);
    if (!pool.length) pool = ids.slice();

    return pool[Math.floor(Math.random() * pool.length)];
  }

  function createPlayerBar() {
    const existing = document.querySelector(".playerBar");
    if (existing) return existing;

    const bar = document.createElement("div");
    bar.className = "playerBar";
    bar.innerHTML = `
      <div class="playerInner">
        <div class="playerNow">
          <div class="playerNowTitle" id="wmNowTitle">WAMSMASH</div>
          <div class="playerNowSub" id="wmNowSub">Select a track</div>
        </div>
        <div class="playerControls">
          <button class="btn" type="button" id="wmPrevBtn" aria-label="Previous track">Prev</button>
          <button class="btn btnPrimary" type="button" id="wmNextBtn" aria-label="Next track">Next</button>
          <button class="btn" type="button" id="wmShuffleBtn" aria-label="Shuffle toggle">Shuffle: On</button>
          <audio id="wmAudio" controls preload="none" playsinline controlsList="nodownload noplaybackrate noremoteplayback"></audio>
        </div>
      </div>
    `;

    document.body.appendChild(bar);

    const audioEl = bar.querySelector("#wmAudio");
    hardenAudioElement(audioEl);

    return bar;
  }

  function setNowPlayingUI(track) {
    const title = $("#wmNowTitle");
    const sub = $("#wmNowSub");
    if (!title || !sub) return;

    if (!track) {
      title.textContent = "WAMSMASH";
      sub.textContent = "Select a track";
      updateBrandPulseDot(null);
      return;
    }

    title.textContent = track.title;
    sub.textContent = `${laneLabel(track.lane)}${track.note ? `, ${track.note}` : ``}`;
    updateBrandPulseDot(track);
  }

  function setAudioSource(audioEl, track) {
    if (!audioEl || !track) return;

    hardenAudioElement(audioEl);

    const isSame = audioEl.getAttribute("data-track-id") === track.id;

    if (!isSame) {
      audioEl.pause();
      audioEl.removeAttribute("src");
      audioEl.load();

      audioEl.src = track.audio;
      audioEl.setAttribute("data-track-id", track.id);
      audioEl.load();
    }
  }

  function playTrackById(trackId) {
    const track = findTrackById(trackId);
    if (!wmAudio || !track) return;

    currentTrackId = track.id;
    recentQueue.push(track.id);
    if (recentQueue.length > 20) recentQueue = recentQueue.slice(-20);

    setNowPlayingUI(track);
    setAudioSource(wmAudio, track);

    try { wmAudio.currentTime = 0; } catch (e) {}

    wmAudio.play().catch(() => {});
    persistPlayerState({ reason: "playTrackById" });
  }

  function playNext() {
    if (!TRACKS.length) return;
    if (!currentTrackId) {
      playTrackById(TRACKS[0].id);
      return;
    }
    if (!shuffleOn) {
      const idx = TRACKS.findIndex(t => t.id === currentTrackId);
      const next = TRACKS[(idx + 1) % TRACKS.length];
      playTrackById(next.id);
      return;
    }
    playTrackById(pickNextTrackId());
  }

  function playPrev() {
    if (!TRACKS.length) return;
    if (recentQueue.length >= 2) {
      recentQueue.pop();
      const prevId = recentQueue.pop();
      if (prevId) playTrackById(prevId);
      return;
    }
    const idx = TRACKS.findIndex(t => t.id === currentTrackId);
    const prev = TRACKS[(idx - 1 + TRACKS.length) % TRACKS.length];
    playTrackById(prev.id);
  }

  function wirePlayerControls() {
    const prevBtn = $("#wmPrevBtn");
    const nextBtn = $("#wmNextBtn");
    const shuffleBtn = $("#wmShuffleBtn");

    if (prevBtn) prevBtn.addEventListener("click", playPrev);
    if (nextBtn) nextBtn.addEventListener("click", playNext);

    if (shuffleBtn) {
      shuffleBtn.addEventListener("click", function () {
        shuffleOn = !shuffleOn;
        shuffleBtn.textContent = `Shuffle: ${shuffleOn ? "On" : "Off"}`;
        persistPlayerState({ reason: "shuffleToggle" });
      });
    }

    if (wmAudio) {
      wmAudio.addEventListener("ended", function () {
        persistPlayerState({ reason: "ended" });
        playNext();
      });
      wmAudio.addEventListener("play", function () {
        const id = wmAudio.getAttribute("data-track-id");
        if (id) currentTrackId = id;
        persistPlayerState({ reason: "play" });
        const track = findTrackById(id);
        if (track) updateBrandPulseDot(track);
      });
      wmAudio.addEventListener("pause", function () {
        persistPlayerState({ reason: "pause" });
        const id = wmAudio.getAttribute("data-track-id");
        const track = findTrackById(id);
        if (track) updateBrandPulseDot(track);
      });

      let lastSave = 0;
      wmAudio.addEventListener("timeupdate", function () {
        const now = Date.now();
        if (now - lastSave < 800) return;
        lastSave = now;
        persistPlayerState({ reason: "timeupdate" });
      });
    }

    window.addEventListener("beforeunload", function () {
      persistPlayerState({ reason: "beforeunload" });
    });

    document.addEventListener("keydown", function (e) {
      const tag = (e.target && e.target.tagName) ? String(e.target.tagName).toLowerCase() : "";
      const inInput = tag === "input" || tag === "textarea" || (e.target && e.target.isContentEditable);
      if (inInput) return;

      if (e.code === "Space") {
        if (!wmAudio) return;
        e.preventDefault();
        if (wmAudio.paused) wmAudio.play().catch(() => {});
        else wmAudio.pause();
      }

      if (e.code === "ArrowRight") playNext();
      if (e.code === "ArrowLeft") playPrev();
    });
  }

  function imgTag(track, eager) {
    const loading = eager ? "eager" : "lazy";
    const decoding = "async";
    return `<img src="${track.cover}" alt="${track.title} cover" loading="${loading}" decoding="${decoding}">`;
  }

  function cardMarkup(track, opts) {
    return `
      <div class="cardImg">
        ${imgTag(track, !!(opts && opts.eagerImage))}
        <div class="cardInfo">
          <div class="cardInfoInner">
            <div class="cardInfoTitle">${track.title}</div>
            <div class="cardInfoMeta">${laneLabel(track.lane)}${track.note ? `, ${track.note}` : ``}</div>
            ${track.blurb ? `<div class="cardInfoBlurb">${track.blurb}</div>` : ``}
            ${track.tags ? `<div class="cardInfoTags">${track.tags}</div>` : ``}
          </div>
        </div>
      </div>

      <div class="cardTop">
        <div>
          <h3 class="cardTitle" ${opts && opts.anchorId ? `id="${track.id}"` : ``}>${track.title}</h3>
          <div class="cardMeta">
            ${laneLabel(track.lane)}${track.note ? `, ${track.note}` : ``}
          </div>
        </div>
        <div class="badge">${track.year}</div>
      </div>

      <div class="cardActions">
        <button class="btn btnPrimary" type="button" data-play="${track.id}">Play</button>
      </div>
    `;
  }

  function renderFeaturedGrid() {
    const mount = document.getElementById("wmFeatured");
    if (!mount) return;

    mount.innerHTML = "";

    const featured = TRACKS.slice(0, FEATURED_COUNT);
    for (let i = 0; i < featured.length; i++) {
      const track = featured[i];
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = cardMarkup(track, {
        eagerImage: i < 3,
        anchorId: false
      });
      mount.appendChild(card);
    }
  }

  function renderMusicList() {
    const mount = document.getElementById("wmMusicList");
    if (!mount) return;

    mount.innerHTML = "";

    for (let i = 0; i < TRACKS.length; i++) {
      const track = TRACKS[i];
      const row = document.createElement("div");
      row.className = "card";
      row.innerHTML = cardMarkup(track, {
        eagerImage: i < 3,
        anchorId: true
      });
      mount.appendChild(row);
    }
  }

  function renderLinks() {
    const mount = document.getElementById("wmLinksList");
    if (!mount) return;

    mount.innerHTML = "";

    for (let i = 0; i < LINKS.length; i++) {
      const item = LINKS[i];

      const a = document.createElement("a");
      a.className = "linkCard";
      a.href = item.href;
      a.target = "_blank";
      a.rel = "noopener noreferrer";

      a.innerHTML = `
        <div class="linkCardTop">
          <div style="display:flex; align-items:center; gap:10px;">
            ${iconMarkup(item.icon)}
            <div class="linkCardTitle">${item.label}</div>
          </div>
          <div class="linkCardBadge">Open</div>
        </div>
        <div class="linkCardNote">${item.note || ""}</div>
        <div class="linkCardUrl">${item.href}</div>
      `;

      mount.appendChild(a);
    }
  }

  function playTrack(audioEl, trackId) {
    const track = findTrackById(trackId);
    if (!track) return;

    currentTrackId = track.id;
    recentQueue.push(track.id);
    if (recentQueue.length > 20) recentQueue = recentQueue.slice(-20);

    setNowPlayingUI(track);
    setAudioSource(audioEl, track);

    try { audioEl.currentTime = 0; } catch (e) {}

    audioEl.play().catch(() => {});
    persistPlayerState({ reason: "playButton" });
  }

  function wirePlayButtons(audioEl) {
    document.addEventListener("click", function (e) {
      const btn = e.target.closest("[data-play]");
      if (!btn) return;

      const id = btn.getAttribute("data-play");
      playTrack(audioEl, id);
    });
  }

  function switchView(view) {
    const home = document.getElementById("homeView");
    const music = document.getElementById("musicView");
    const links = document.getElementById("linksView");
    const games = document.getElementById("gamesView");
    const hero = document.querySelector(".heroIntro");

    if (!home || !music || !links || !games) return;

    home.style.display = view === "home" ? "block" : "none";
    music.style.display = view === "music" ? "block" : "none";
    links.style.display = view === "links" ? "block" : "none";
    games.style.display = view === "games" ? "block" : "none";

    if (hero) hero.style.display = view === "home" ? "block" : "none";

    setActiveNav(view);
  }

  function setActiveNav(view) {
    const navRoot = document.querySelector("header nav");
    if (!navRoot) return;

    const navItems = $all("[data-view]", navRoot);

    for (const el of navItems) {
      const v = el.getAttribute("data-view");
      const isActive = v === view;

      el.classList.toggle("isActive", isActive);

      if (isActive) el.setAttribute("aria-current", "page");
      else el.removeAttribute("aria-current");
    }
  }

  function parseHash() {
    const raw = (location.hash || "").replace(/^#/, "");
    if (!raw) return { view: "home", scrollId: "" };

    const parts = raw.split("#");
    const viewPart = parts[0];
    const scrollId = parts[1] || "";

    if (viewPart === "music") return { view: "music", scrollId };
    if (viewPart === "links") return { view: "links", scrollId: "" };
    if (viewPart === "games") return { view: "games", scrollId: "" };

    return { view: "home", scrollId: "" };
  }

  function applyRoute() {
    const route = parseHash();
    switchView(route.view);

    if (route.view === "music" && route.scrollId) {
      requestAnimationFrame(function () {
        const target = document.getElementById(route.scrollId);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }

  function wireNavigation() {
    document.addEventListener("click", function (e) {
      const hero = e.target.closest(".heroIntro");
      if (hero) {
        location.hash = "music";
        return;
      }

      const btn = e.target.closest("[data-view]");
      if (!btn) return;

      const view = btn.getAttribute("data-view");
      const scrollId = btn.getAttribute("data-scroll");

      if (view === "music") {
        location.hash = scrollId ? `music#${scrollId}` : "music";
        return;
      }

      if (view === "links") {
        location.hash = "links";
        return;
      }

      if (view === "games") {
        location.hash = "games";
        return;
      }

      if (view === "home") location.hash = "";
    });

    document.addEventListener("keydown", function (e) {
      const hero = e.target.closest && e.target.closest(".heroIntro");
      if (!hero) return;

      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        location.hash = "music";
      }
    });
  }

  function clamp(n, a, b) {
    return Math.max(a, Math.min(b, n));
  }

  function ensureGameStyles() {
  if (document.getElementById("wmGameStyles")) return;
  const style = document.createElement("style");
  style.id = "wmGameStyles";
  style.textContent = `
    #wmGames{ width:100%; }
    #gamesView{ width:100%; }
    .wmGamesGrid{
      width:100%;
      display:grid;
      grid-template-columns:repeat(auto-fit, minmax(360px, 1fr));
      gap:18px;
      align-items:stretch;
    }
    .wmGamesGrid .wmGameWrap.isFull{
      grid-column:1 / -1;
    }
    @media (max-width: 900px){
      .wmGamesGrid{ grid-template-columns:1fr; }
      .wmGamesGrid .wmGameWrap.isFull{ grid-column:auto; }
    }

    .wmGameWrap{
      min-width:0;
      border:1px solid rgba(255,255,255,0.12);
      border-radius:22px;
      background:
        radial-gradient(900px 340px at 12% 10%, rgba(255,43,214,0.14), transparent 60%),
        radial-gradient(820px 340px at 85% 25%, rgba(0,229,255,0.12), transparent 60%),
        linear-gradient(180deg, rgba(14,15,22,0.60), rgba(0,0,0,0.30));
      padding:16px;
      box-shadow:0 10px 30px rgba(0,0,0,0.28);
    }
    .wmGameHead{
      display:flex;
      align-items:flex-start;
      justify-content:space-between;
      gap:10px;
      margin-bottom:12px;
    }
    .wmGameTitle{
      margin:0;
      font-size:14px;
      letter-spacing:0.06em;
      text-transform:uppercase;
    }
    .wmGameSub{
      margin-top:6px;
      color:rgba(166,168,179,0.95);
      font-size:12px;
      line-height:1.35;
    }
    .wmGameRow{
      display:flex;
      gap:10px;
      flex-wrap:wrap;
      margin-top:10px;
      justify-content:flex-end;
    }
    .wmTiny{
      font-size:12px;
      color:rgba(166,168,179,0.95);
      line-height:1.35;
    }
    .wmCountdown{
      font-weight:700;
      letter-spacing:0.06em;
    }
    .wmLbBox{
      margin-top:10px;
      border:1px solid rgba(255,255,255,0.10);
      border-radius:14px;
      padding:10px;
      background:rgba(0,0,0,0.18);
    }

    .wmMemGrid{
      display:grid;
      grid-template-columns:repeat(4, minmax(0, 1fr));
      gap:10px;
    }
    @media (max-width: 700px){
      .wmMemGrid{ grid-template-columns:repeat(3, minmax(0, 1fr)); }
    }
    .wmMemCard{
      position:relative;
      aspect-ratio:1/1;
      border-radius:14px;
      border:1px solid rgba(255,255,255,0.12);
      overflow:hidden;
      background:rgba(0,0,0,0.25);
      cursor:pointer;
      user-select:none;
    }
    .wmMemCardFace{
      position:absolute;
      inset:0;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:12px;
      letter-spacing:0.06em;
      text-transform:uppercase;
      color:rgba(242,243,247,0.90);
    }
    .wmMemBack{
      background:
        radial-gradient(500px 280px at 15% 15%, rgba(255,43,214,0.20), transparent 55%),
        radial-gradient(420px 280px at 85% 20%, rgba(0,229,255,0.16), transparent 55%),
        linear-gradient(180deg, rgba(14,15,22,0.85), rgba(0,0,0,0.35));
    }
    .wmMemCard.isFlipped .wmMemBack{ opacity:0; }
    .wmMemFront{
      background-size:cover;
      background-position:center;
      opacity:0;
      transform:scale(1.02);
    }
    .wmMemCard.isFlipped .wmMemFront{ opacity:1; }
    .wmMemFront, .wmMemBack{
      transition:opacity 0.14s ease, transform 0.14s ease;
    }
    .wmMemCard.isMatched{
      border-color:rgba(0,229,255,0.42);
      box-shadow:0 0 0 1px rgba(0,0,0,0.35) inset, 0 10px 28px rgba(0,0,0,0.28);
      cursor:default;
    }

    .wmReactArena{
      position:relative;
      height:360px;
      border-radius:16px;
      border:1px solid rgba(255,255,255,0.12);
      overflow:hidden;
      background:
        radial-gradient(900px 360px at 18% 18%, rgba(255,43,214,0.18), transparent 62%),
        radial-gradient(840px 360px at 82% 28%, rgba(0,229,255,0.16), transparent 62%),
        linear-gradient(180deg, rgba(14,15,22,0.65), rgba(0,0,0,0.35));
    }
    .wmReactTarget{
      position:absolute;
      width:56px;
      height:56px;
      border-radius:999px;
      border:1px solid rgba(255,255,255,0.18);
      background:rgba(0,0,0,0.20);
      box-shadow:0 0 0 1px rgba(0,0,0,0.35) inset, 0 10px 28px rgba(0,0,0,0.28);
      cursor:pointer;
    }
    .wmReactTarget::after{
      content:"";
      position:absolute;
      inset:-12px;
      border-radius:999px;
      background:radial-gradient(circle at 50% 50%, rgba(255,43,214,0.28), transparent 55%);
      opacity:0.72;
      filter:blur(1px);
      animation:wmPulse 0.85s ease-in-out infinite;
      pointer-events:none;
    }
    @keyframes wmPulse{
      0%{ transform:scale(0.90); opacity:0.45; }
      50%{ transform:scale(1.10); opacity:0.95; }
      100%{ transform:scale(0.90); opacity:0.45; }
    }

    .wmFlash{
      position:absolute;
      inset:0;
      pointer-events:none;
      opacity:0;
      animation:wmFlash 0.16s ease-out forwards;
    }
    @keyframes wmFlash{
      0%{ opacity:0; }
      30%{ opacity:0.85; }
      100%{ opacity:0; }
    }
    .wmFlashRed{ background:rgba(255,60,60,0.20); }
    .wmFlashGreen{ background:rgba(0,255,160,0.16); }
    .wmFlashGold{ background:rgba(255,190,0,0.16); }

    .wmSpark{
      position:absolute;
      width:6px;
      height:6px;
      border-radius:999px;
      background:rgba(0,229,255,0.95);
      pointer-events:none;
      animation:wmSpark 0.55s ease-out forwards;
    }
    @keyframes wmSpark{
      0%{ transform:translate(0,0) scale(1); opacity:1; }
      100%{ transform:translate(var(--dx), var(--dy)) scale(0.15); opacity:0; }
    }

    .wmCanvasWrap{
      border-radius:16px;
      border:1px solid rgba(255,255,255,0.12);
      overflow:hidden;
      background:rgba(0,0,0,0.20);
    }
    .wmCanvasWrap canvas{
      width:100%;
      height:auto;
      display:block;
    }

    .wmBigGo{
      position:absolute;
      inset:0;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:44px;
      font-weight:800;
      letter-spacing:0.08em;
      text-transform:uppercase;
      color:rgba(242,243,247,0.92);
      background:rgba(0,0,0,0.40);
      backdrop-filter:blur(2px);
      pointer-events:none;
    }
  `;
  document.head.appendChild(style);
}
  function spawnSparks(root, cx, cy) {
    const count = 16;
    for (let i = 0; i < count; i++) {
      const s = document.createElement("div");
      s.className = "wmSpark";
      s.style.left = `${cx}px`;
      s.style.top = `${cy}px`;

      const ang = Math.random() * Math.PI * 2;
      const mag = 26 + Math.random() * 44;
      const dx = Math.cos(ang) * mag;
      const dy = Math.sin(ang) * mag;

      s.style.setProperty("--dx", `${dx}px`);
      s.style.setProperty("--dy", `${dy}px`);

      root.appendChild(s);

      setTimeout(function () {
        if (s && s.parentNode) s.parentNode.removeChild(s);
      }, 560);
    }
  }

  function flashArena(arena, kind) {
    if (!arena) return;
    const d = document.createElement("div");
    d.className = `wmFlash ${kind}`;
    arena.appendChild(d);
    setTimeout(function () {
      if (d && d.parentNode) d.parentNode.removeChild(d);
    }, 180);
  }

  function showOverlay(root, text) {
    const overlay = document.createElement("div");
    overlay.className = "wmBigGo";
    overlay.textContent = text;
    root.appendChild(overlay);
    return overlay;
  }

  function pickRandomCoverUrl() {
    if (!TRACKS.length) return "";
    const t = TRACKS[Math.floor(Math.random() * TRACKS.length)];
    return t.cover || "";
  }

  function renderGames() {
  const mount = document.getElementById("wmGames");
  if (!mount) return;

  ensureGameStyles();

  mount.innerHTML = `
    <div class="wmGamesGrid">
      <div class="wmGameWrap">
        <div class="wmGameHead">
          <div>
            <h3 class="wmGameTitle">Memory</h3>
          </div>
          <div class="wmGameRow">
            <button class="btn btnPrimary" type="button" data-game="memory">Play</button>
            <button class="btn" type="button" data-game="memory-reset">Reset</button>
          </div>
        </div>
        <div id="wmGameMemory"></div>
      </div>

      <div class="wmGameWrap">
        <div class="wmGameHead">
          <div>
            <h3 class="wmGameTitle">Neon Reaction</h3>
          </div>
          <div class="wmGameRow">
            <button class="btn btnPrimary" type="button" data-game="reaction">Play</button>
            <button class="btn" type="button" data-game="reaction-reset">Reset</button>
          </div>
        </div>
        <div id="wmGameReaction"></div>
      </div>

      <div class="wmGameWrap isFull">
        <div class="wmGameHead">
          <div>
            <h3 class="wmGameTitle">Brick Breaker</h3>
            <div class="wmGameSub">Ready set go. 15 seconds plus +1s per top row brick. PB leaderboard</div>
          </div>
          <div class="wmGameRow">
            <button class="btn btnPrimary" type="button" data-game="breaker">Play</button>
            <button class="btn" type="button" data-game="breaker-reset">Reset</button>
          </div>
        </div>
        <div id="wmGameBreaker"></div>
      </div>

      <div class="wmGameWrap isFull">
        <div class="wmGameHead">
          <div>
            <h3 class="wmGameTitle">Lane Dodge</h3>
            <div class="wmGameSub">Slower fall. Longer runs</div>
          </div>
          <div class="wmGameRow">
            <button class="btn btnPrimary" type="button" data-game="dodge">Play</button>
            <button class="btn" type="button" data-game="dodge-reset">Reset</button>
          </div>
        </div>
        <div id="wmGameDodge"></div>
      </div>
    </div>
  `;

  initMemory(true);
  initReaction(true);
  initBreaker(true);
  initDodge(true);
}

  function sampleTracksForMemory(pairCount) {
    const list = TRACKS.slice();
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = list[i];
      list[i] = list[j];
      list[j] = tmp;
    }
    return list.slice(0, clamp(pairCount, 3, Math.min(10, list.length)));
  }

  let memState = null;

  function initMemory(silent) {
    const mount = document.getElementById("wmGameMemory");
    if (!mount) return;

    const pairs = sampleTracksForMemory(8);
    const deck = [];
    for (const t of pairs) {
      deck.push({ key: t.id, cover: t.cover, title: t.title });
      deck.push({ key: t.id, cover: t.cover, title: t.title });
    }
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = deck[i];
      deck[i] = deck[j];
      deck[j] = tmp;
    }

    memState = {
      deck,
      firstIdx: -1,
      lock: false,
      matched: new Set(),
      moves: 0
    };

    mount.innerHTML = `
      <div class="wmTiny" style="margin-bottom:10px;">Moves: <span id="wmMemMoves">0</span></div>
      <div class="wmMemGrid" id="wmMemGrid"></div>
    `;

    const grid = document.getElementById("wmMemGrid");
    if (!grid) return;

    for (let i = 0; i < deck.length; i++) {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "wmMemCard";
      card.setAttribute("data-idx", String(i));
      card.setAttribute("aria-label", "Memory card");

      const back = document.createElement("div");
      back.className = "wmMemCardFace wmMemBack";
      back.textContent = "WAMSMASH";

      const front = document.createElement("div");
      front.className = "wmMemCardFace wmMemFront";
      front.style.backgroundImage = `url("${deck[i].cover}")`;

      card.appendChild(back);
      card.appendChild(front);
      grid.appendChild(card);
    }

    if (!silent) {}
  }

  function memFlip(idx) {
    if (!memState || memState.lock) return;
    if (memState.matched.has(idx)) return;

    const grid = document.getElementById("wmMemGrid");
    const movesEl = document.getElementById("wmMemMoves");
    if (!grid || !movesEl) return;

    const cardEl = grid.querySelector(`[data-idx="${idx}"]`);
    if (!cardEl) return;

    if (cardEl.classList.contains("isFlipped")) return;

    cardEl.classList.add("isFlipped");

    if (memState.firstIdx < 0) {
      memState.firstIdx = idx;
      return;
    }

    if (memState.firstIdx === idx) return;

    memState.moves += 1;
    movesEl.textContent = String(memState.moves);

    const a = memState.deck[memState.firstIdx];
    const b = memState.deck[idx];

    if (a && b && a.key === b.key) {
      memState.matched.add(memState.firstIdx);
      memState.matched.add(idx);

      const aEl = grid.querySelector(`[data-idx="${memState.firstIdx}"]`);
      const bEl = grid.querySelector(`[data-idx="${idx}"]`);
      if (aEl) aEl.classList.add("isMatched");
      if (bEl) bEl.classList.add("isMatched");

      memState.firstIdx = -1;
      return;
    }

    memState.lock = true;
    const first = memState.firstIdx;
    memState.firstIdx = -1;

    setTimeout(function () {
      const aEl = grid.querySelector(`[data-idx="${first}"]`);
      const bEl = grid.querySelector(`[data-idx="${idx}"]`);
      if (aEl) aEl.classList.remove("isFlipped");
      if (bEl) bEl.classList.remove("isFlipped");
      memState.lock = false;
    }, 520);
  }

  let reactState = null;

  function initReaction(silent) {
    const mount = document.getElementById("wmGameReaction");
    if (!mount) return;

    reactState = {
      running: false,
      score: 0,
      hits: 0,
      misses: 0,
      targetsLeft: 19,
      endAt: 0,
      timerId: 0,
      mult: 1
    };

    mount.innerHTML = `
      <div class="wmTiny" style="margin-bottom:10px;">
        Targets: <span id="wmReactTargets">19</span>
        <span style="margin-left:10px;">Hits: <span id="wmReactHits">0</span></span>
        <span style="margin-left:10px;">Score: <span id="wmReactScore">0</span></span>
        <span style="margin-left:10px;">x<span id="wmReactMult">1</span></span>
        <span style="margin-left:10px;" class="wmCountdown">Time: <span id="wmReactTime">15.0</span></span>
      </div>
      <div class="wmReactArena" id="wmReactArena"></div>
      <div class="wmLbBox">
        <div class="wmTiny" style="margin-bottom:6px;">Top 5</div>
        <div id="wmReactLb"></div>
      </div>
    `;

    const lbEl = document.getElementById("wmReactLb");
    if (lbEl) lbEl.innerHTML = renderLeaderboard(readJson("wamsmash_lb_reaction", []).slice(0, 5));

    if (!silent) {}
  }

  function spawnReactionTarget() {
    const arena = document.getElementById("wmReactArena");
    const scoreEl = document.getElementById("wmReactScore");
    const hitsEl = document.getElementById("wmReactHits");
    const targetsEl = document.getElementById("wmReactTargets");
    const multEl = document.getElementById("wmReactMult");
    if (!arena || !scoreEl || !hitsEl || !targetsEl || !multEl) return;
    if (!reactState || !reactState.running) return;
    if (reactState.targetsLeft <= 0) return;

    arena.innerHTML = "";

    const w = arena.clientWidth;
    const h = arena.clientHeight;

    const size = 56;
    const x = Math.floor(Math.random() * Math.max(1, w - size));
    const y = Math.floor(Math.random() * Math.max(1, h - size));

    const t = document.createElement("button");
    t.type = "button";
    t.className = "wmReactTarget";
    t.style.left = `${x}px`;
    t.style.top = `${y}px`;

    const born = performance.now();

    const onMiss = function (e) {
      if (!reactState || !reactState.running) return;
      if (e && e.target === t) return;

      arena.removeEventListener("click", onMiss);

      reactState.misses += 1;
      reactState.targetsLeft -= 1;
      reactState.mult = 1;

      const penalty = 120;
      reactState.score = Math.max(0, reactState.score - penalty);

      scoreEl.textContent = String(reactState.score);
      hitsEl.textContent = String(reactState.hits);
      targetsEl.textContent = String(reactState.targetsLeft);
      multEl.textContent = String(reactState.mult);

      flashArena(arena, "wmFlashRed");

      if (reactState.targetsLeft <= 0) {
        endReaction("Time");
        return;
      }

      spawnReactionTarget();
    };

    arena.addEventListener("click", onMiss);

    t.addEventListener("click", function (ev) {
      if (!reactState || !reactState.running) return;

      arena.removeEventListener("click", onMiss);

      const now = performance.now();
      const dt = clamp(now - born, 40, 1500);

      const rect = t.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = (ev.clientX - cx);
      const dy = (ev.clientY - cy);
      const dist = Math.sqrt(dx * dx + dy * dy);

      const radius = rect.width / 2;
      const perfectThreshold = Math.max(4, radius * 0.10);
      const isPerfect = dist <= perfectThreshold;

      const base = Math.max(50, Math.floor(1100 - dt));
      const mult = reactState.mult;

      let pts = base * mult;

      if (isPerfect) {
        reactState.mult = clamp(reactState.mult + 1, 1, 5);
        pts += 150;
        flashArena(arena, "wmFlashGold");
      } else {
        flashArena(arena, "wmFlashGreen");
      }

      reactState.score += Math.floor(pts);
      reactState.hits += 1;
      reactState.targetsLeft -= 1;

      scoreEl.textContent = String(reactState.score);
      hitsEl.textContent = String(reactState.hits);
      targetsEl.textContent = String(reactState.targetsLeft);
      multEl.textContent = String(reactState.mult);

      spawnSparks(arena, x + size / 2, y + size / 2);

      if (reactState.targetsLeft <= 0) {
        endReaction("All targets cleared");
        return;
      }

      spawnReactionTarget();
    });

    arena.appendChild(t);
  }

  function tickReaction() {
    const timeEl = document.getElementById("wmReactTime");
    if (!timeEl || !reactState) return;

    const leftMs = reactState.endAt - performance.now();
    const secsLeft = Math.max(0, leftMs / 1000);
    timeEl.textContent = secsLeft.toFixed(1);

    if (leftMs <= 0) {
      endReaction("Time");
      return;
    }

    reactState.timerId = window.setTimeout(tickReaction, 80);
  }

  function startReaction() {
    if (!reactState) return;

    const arena = document.getElementById("wmReactArena");
    if (!arena) return;

    reactState.running = false;
    reactState.score = 0;
    reactState.hits = 0;
    reactState.misses = 0;
    reactState.targetsLeft = 19;
    reactState.mult = 1;

    const scoreEl = document.getElementById("wmReactScore");
    const hitsEl = document.getElementById("wmReactHits");
    const targetsEl = document.getElementById("wmReactTargets");
    const timeEl = document.getElementById("wmReactTime");
    const multEl = document.getElementById("wmReactMult");

    if (scoreEl) scoreEl.textContent = "0";
    if (hitsEl) hitsEl.textContent = "0";
    if (targetsEl) targetsEl.textContent = "19";
    if (timeEl) timeEl.textContent = "15.0";
    if (multEl) multEl.textContent = "1";

    arena.innerHTML = "";

    const ready = showOverlay(arena, "READY");
    setTimeout(function () {
      if (ready && ready.parentNode) ready.parentNode.removeChild(ready);
      const set = showOverlay(arena, "SET");
      setTimeout(function () {
        if (set && set.parentNode) set.parentNode.removeChild(set);
        const go = showOverlay(arena, "GO");
        setTimeout(function () {
          if (go && go.parentNode) go.parentNode.removeChild(go);

          reactState.running = true;
          reactState.endAt = performance.now() + 15000;
          if (reactState.timerId) clearTimeout(reactState.timerId);
          tickReaction();
          spawnReactionTarget();
        }, 260);
      }, 420);
    }, 520);
  }

  function endReaction(reason) {
    if (!reactState) return;

    reactState.running = false;
    if (reactState.timerId) clearTimeout(reactState.timerId);

    const arena = document.getElementById("wmReactArena");
    if (arena) {
      arena.innerHTML = "";
      const done = showOverlay(arena, `${reason}`);
      setTimeout(function () {
        if (done && done.parentNode) done.parentNode.removeChild(done);
      }, 900);
    }

    const lbEl = document.getElementById("wmReactLb");
    const top5 = updateLeaderboard("reaction", reactState.score);
    if (lbEl) lbEl.innerHTML = renderLeaderboard(top5);
  }

  let breakerState = null;

  function initBreaker(silent) {
    const mount = document.getElementById("wmGameBreaker");
    if (!mount) return;

    mount.innerHTML = `
      <div class="wmTiny" style="margin-bottom:10px;">
        Bricks: <span id="wmBrBricks">0</span>
        <span style="margin-left:10px;">Score: <span id="wmBrScore">0</span></span>
        <span style="margin-left:10px;" class="wmCountdown">Time: <span id="wmBrTime">15.0</span></span>
      </div>
      <div class="wmCanvasWrap" style="position:relative;">
        <canvas id="wmBreakerCanvas" width="960" height="480"></canvas>
      </div>
      <div class="wmLbBox">
        <div class="wmTiny" style="margin-bottom:6px;">Top 5</div>
        <div id="wmBrLb"></div>
      </div>
    `;

    const lbEl = document.getElementById("wmBrLb");
    if (lbEl) lbEl.innerHTML = renderLeaderboard(readJson("wamsmash_lb_breaker", []).slice(0, 5));

    const canvas = document.getElementById("wmBreakerCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const bgUrl = pickRandomCoverUrl();
    const bgImg = new Image();
    if (bgUrl) bgImg.src = bgUrl;

    breakerState = {
      canvas,
      ctx,
      bgImg,
      bgReady: false,
      running: false,
      endAt: 0,
      lastT: 0,
      paddleX: canvas.width / 2,
      paddleW: 160,
      paddleH: 14,
      paddleY: canvas.height - 26,
      ballX: canvas.width / 2,
      ballY: canvas.height - 60,
      ballVX: 5.2,
      ballVY: -5.6,
      r: 10,
      bricks: [],
      bricksLeft: 0,
      score: 0
    };

    bgImg.onload = function () { breakerState.bgReady = true; };

    const cols = 10;
    const rows = 4;
    const pad = 10;
    const top = 18;
    const side = 18;
    const bw = Math.floor((canvas.width - side * 2 - pad * (cols - 1)) / cols);
    const bh = 20;

    const brickColors = [
      "rgba(0,229,255,0.55)",
      "rgba(255,43,214,0.50)",
      "rgba(0,255,160,0.45)",
      "rgba(255,180,0,0.45)"
    ];

    const bricks = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        bricks.push({
          x: side + c * (bw + pad),
          y: top + r * (bh + pad),
          w: bw,
          h: bh,
          row: r,
          alive: true,
          color: brickColors[r % brickColors.length]
        });
      }
    }

    breakerState.bricks = bricks;
    breakerState.bricksLeft = bricks.length;

    function setPaddleFromClientX(clientX) {
      const rect = canvas.getBoundingClientRect();
      const px = (clientX - rect.left) * (canvas.width / rect.width);
      breakerState.paddleX = clamp(px, breakerState.paddleW / 2, canvas.width - breakerState.paddleW / 2);
    }

    canvas.addEventListener("mousemove", function (e) {
      if (!breakerState) return;
      setPaddleFromClientX(e.clientX);
    });

    canvas.addEventListener("touchmove", function (e) {
      if (!breakerState) return;
      if (!e.touches || !e.touches.length) return;
      setPaddleFromClientX(e.touches[0].clientX);
      e.preventDefault();
    }, { passive: false });

    if (!silent) {}
  }

  function drawBreaker() {
    const s = breakerState;
    if (!s) return;

    const g = s.ctx;
    const w = s.canvas.width;
    const h = s.canvas.height;

    g.clearRect(0, 0, w, h);

    if (s.bgReady) {
      g.globalAlpha = 0.18;
      g.drawImage(s.bgImg, 0, 0, w, h);
      g.globalAlpha = 1;
    }

    g.fillStyle = "rgba(0,0,0,0.22)";
    g.fillRect(0, 0, w, h);

    for (const b of s.bricks) {
      if (!b.alive) continue;
      g.fillStyle = b.color;
      g.fillRect(b.x, b.y, b.w, b.h);
      g.strokeStyle = "rgba(255,255,255,0.12)";
      g.strokeRect(b.x, b.y, b.w, b.h);
    }

    g.fillStyle = "rgba(255,255,255,0.88)";
    g.fillRect(s.paddleX - s.paddleW / 2, s.paddleY, s.paddleW, s.paddleH);

    g.beginPath();
    g.arc(s.ballX, s.ballY, s.r, 0, Math.PI * 2);
    g.fill();

    g.strokeStyle = "rgba(0,229,255,0.18)";
    g.strokeRect(1, 1, w - 2, h - 2);
  }

  function tickBreaker() {
    const timeEl = document.getElementById("wmBrTime");
    const scoreEl = document.getElementById("wmBrScore");
    const bricksEl = document.getElementById("wmBrBricks");

    if (!breakerState || !timeEl || !scoreEl || !bricksEl) return;
    if (!breakerState.running) return;

    const now = performance.now();
    const dt = breakerState.lastT ? clamp((now - breakerState.lastT) / 16.666, 0.7, 1.6) : 1;
    breakerState.lastT = now;

    breakerState.ballX += breakerState.ballVX * dt;
    breakerState.ballY += breakerState.ballVY * dt;

    if (breakerState.ballX < breakerState.r) {
      breakerState.ballX = breakerState.r;
      breakerState.ballVX *= -1;
    }
    if (breakerState.ballX > breakerState.canvas.width - breakerState.r) {
      breakerState.ballX = breakerState.canvas.width - breakerState.r;
      breakerState.ballVX *= -1;
    }
    if (breakerState.ballY < breakerState.r) {
      breakerState.ballY = breakerState.r;
      breakerState.ballVY *= -1;
    }

    const pLeft = breakerState.paddleX - breakerState.paddleW / 2;
    const pRight = breakerState.paddleX + breakerState.paddleW / 2;
    const pTop = breakerState.paddleY;

    const hitPaddleY = breakerState.ballY + breakerState.r >= pTop && breakerState.ballY + breakerState.r <= pTop + breakerState.paddleH;
    const hitPaddleX = breakerState.ballX >= pLeft && breakerState.ballX <= pRight;

    if (hitPaddleY && hitPaddleX && breakerState.ballVY > 0) {
      const rel = (breakerState.ballX - breakerState.paddleX) / (breakerState.paddleW / 2);
      breakerState.ballVY = -Math.abs(breakerState.ballVY) * 1.01;
      breakerState.ballVX += rel * 1.4;
    }

    for (const b of breakerState.bricks) {
      if (!b.alive) continue;

      const bx = breakerState.ballX;
      const by = breakerState.ballY;

      const withinX = bx + breakerState.r >= b.x && bx - breakerState.r <= b.x + b.w;
      const withinY = by + breakerState.r >= b.y && by - breakerState.r <= b.y + b.h;

      if (withinX && withinY) {
        b.alive = false;
        breakerState.bricksLeft -= 1;
        breakerState.score += 10;

        if (b.row === 0) breakerState.endAt += 1000;

        breakerState.ballVY *= -1;
        break;
      }
    }

    scoreEl.textContent = String(breakerState.score);
    bricksEl.textContent = String((breakerState.bricks.length - breakerState.bricksLeft));

    const leftMs = breakerState.endAt - now;
    const secsLeft = Math.max(0, leftMs / 1000);
    timeEl.textContent = secsLeft.toFixed(1);

    drawBreaker();

    if (leftMs <= 0) {
      endBreaker();
      return;
    }

    requestAnimationFrame(tickBreaker);
  }

  function startBreaker() {
    if (!breakerState) return;

    breakerState.running = false;
    breakerState.lastT = 0;
    breakerState.score = 0;

    for (const b of breakerState.bricks) b.alive = true;
    breakerState.bricksLeft = breakerState.bricks.length;

    breakerState.ballX = breakerState.canvas.width / 2;
    breakerState.ballY = breakerState.canvas.height - 60;
    breakerState.ballVX = 5.2 * (Math.random() < 0.5 ? -1 : 1);
    breakerState.ballVY = -5.6;

    const timeEl = document.getElementById("wmBrTime");
    const scoreEl = document.getElementById("wmBrScore");
    const bricksEl = document.getElementById("wmBrBricks");
    if (timeEl) timeEl.textContent = "15.0";
    if (scoreEl) scoreEl.textContent = "0";
    if (bricksEl) bricksEl.textContent = "0";

    drawBreaker();

    const wrap = breakerState.canvas.parentElement;
    if (!wrap) return;

    const overlay = showOverlay(wrap, "READY");
    setTimeout(function () {
      if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
      const set = showOverlay(wrap, "SET");
      setTimeout(function () {
        if (set && set.parentNode) set.parentNode.removeChild(set);
        const go = showOverlay(wrap, "GO");
        setTimeout(function () {
          if (go && go.parentNode) go.parentNode.removeChild(go);
          breakerState.running = true;
          breakerState.endAt = performance.now() + 15000;
          requestAnimationFrame(tickBreaker);
        }, 260);
      }, 420);
    }, 520);
  }

  function endBreaker() {
    if (!breakerState) return;
    breakerState.running = false;

    const lbEl = document.getElementById("wmBrLb");
    const top5 = updateLeaderboard("breaker", breakerState.score);
    if (lbEl) lbEl.innerHTML = renderLeaderboard(top5);
  }

  let dodgeState = null;

  function initDodge(silent) {
    const mount = document.getElementById("wmGameDodge");
    if (!mount) return;

    mount.innerHTML = `
      <div class="wmTiny" style="margin-bottom:10px;">
        Score: <span id="wmDodgeScore">0</span>
        <span style="margin-left:10px;" class="wmCountdown">Time: <span id="wmDodgeTime">15.0</span></span>
      </div>
      <div class="wmCanvasWrap" style="position:relative;">
        <canvas id="wmDodgeCanvas" width="960" height="440"></canvas>
      </div>
      <div class="wmLbBox">
        <div class="wmTiny" style="margin-bottom:6px;">Top 5</div>
        <div id="wmDodgeLb"></div>
      </div>
    `;

    const lbEl = document.getElementById("wmDodgeLb");
    if (lbEl) lbEl.innerHTML = renderLeaderboard(readJson("wamsmash_lb_dodge", []).slice(0, 5));

    const canvas = document.getElementById("wmDodgeCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const bgUrl = pickRandomCoverUrl();
    const bg = new Image();
    if (bgUrl) bg.src = bgUrl;

    dodgeState = {
      canvas,
      ctx,
      bg,
      bgReady: false,
      running: false,
      endAt: 0,
      lastT: 0,
      startAt: 0,
      x: canvas.width / 2,
      y: canvas.height - 64,
      score: 0,
      hazards: []
    };

    bg.onload = function () { dodgeState.bgReady = true; };

    function setX(clientX) {
      const r = canvas.getBoundingClientRect();
      const px = (clientX - r.left) * (canvas.width / r.width);
      dodgeState.x = clamp(px, 18, canvas.width - 18);
    }

    canvas.addEventListener("mousemove", function (e) {
      if (!dodgeState) return;
      setX(e.clientX);
    });

    canvas.addEventListener("touchmove", function (e) {
      if (!dodgeState) return;
      if (!e.touches || !e.touches.length) return;
      setX(e.touches[0].clientX);
      e.preventDefault();
    }, { passive: false });

    if (!silent) {}
  }

  function startDodge() {
    if (!dodgeState) return;

    dodgeState.running = false;
    dodgeState.lastT = 0;
    dodgeState.score = 0;
    dodgeState.hazards = [];
    dodgeState.startAt = performance.now();

    const scoreEl = document.getElementById("wmDodgeScore");
    const timeEl = document.getElementById("wmDodgeTime");
    if (scoreEl) scoreEl.textContent = "0";
    if (timeEl) timeEl.textContent = "15.0";

    const wrap = dodgeState.canvas.parentElement;
    if (!wrap) return;

    const overlay = showOverlay(wrap, "READY");
    setTimeout(function () {
      if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
      const set = showOverlay(wrap, "SET");
      setTimeout(function () {
        if (set && set.parentNode) set.parentNode.removeChild(set);
        const go = showOverlay(wrap, "GO");
        setTimeout(function () {
          if (go && go.parentNode) go.parentNode.removeChild(go);
          dodgeState.running = true;
          dodgeState.endAt = performance.now() + 15000;
          requestAnimationFrame(tickDodge);
        }, 260);
      }, 420);
    }, 520);
  }

  function tickDodge(t) {
    if (!dodgeState || !dodgeState.running) return;

    const dt = dodgeState.lastT ? clamp((t - dodgeState.lastT) / 16.666, 0.7, 1.6) : 1;
    dodgeState.lastT = t;

    const sinceStart = t - dodgeState.startAt;

    const graceMs = 1100;
const spawnChance = sinceStart < graceMs ? 0 : 0.05;

if (Math.random() < spawnChance) {
  dodgeState.hazards.push({
    x: Math.random() * dodgeState.canvas.width,
    y: -24,
    r: 10 + Math.random() * 10,
    vy: 2.2 + Math.random() * 1.6
  });
}

    for (const h of dodgeState.hazards) h.y += h.vy * dt;
    dodgeState.hazards = dodgeState.hazards.filter(h => h.y < dodgeState.canvas.height + 50);

    for (const h of dodgeState.hazards) {
      const dx = h.x - dodgeState.x;
      const dy = h.y - dodgeState.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < h.r + 14) {
        endDodge();
        return;
      }
    }

    dodgeState.score += Math.floor(2 * dt);

    const leftMs = dodgeState.endAt - t;
    const secsLeft = Math.max(0, leftMs / 1000);

    const scoreEl = document.getElementById("wmDodgeScore");
    const timeEl = document.getElementById("wmDodgeTime");
    if (scoreEl) scoreEl.textContent = String(dodgeState.score);
    if (timeEl) timeEl.textContent = secsLeft.toFixed(1);

    drawDodge();

    if (leftMs <= 0) {
      endDodge();
      return;
    }

    requestAnimationFrame(tickDodge);
  }

  function drawDodge() {
    const s = dodgeState;
    if (!s) return;
    const g = s.ctx;
    const w = s.canvas.width;
    const h = s.canvas.height;

    g.clearRect(0, 0, w, h);

    if (s.bgReady) {
      g.globalAlpha = 0.14;
      g.drawImage(s.bg, 0, 0, w, h);
      g.globalAlpha = 1;
    }

    g.fillStyle = "rgba(0,0,0,0.24)";
    g.fillRect(0, 0, w, h);

    g.strokeStyle = "rgba(255,255,255,0.08)";
    for (let i = 1; i < 6; i++) {
      const x = (w / 6) * i;
      g.beginPath();
      g.moveTo(x, 0);
      g.lineTo(x, h);
      g.stroke();
    }

    for (const hz of s.hazards) {
      g.fillStyle = "rgba(255,43,214,0.55)";
      g.beginPath();
      g.arc(hz.x, hz.y, hz.r, 0, Math.PI * 2);
      g.fill();
    }

    g.fillStyle = "rgba(0,229,255,0.85)";
    g.beginPath();
    g.arc(s.x, s.y, 14, 0, Math.PI * 2);
    g.fill();
  }

  function endDodge() {
    if (!dodgeState) return;
    dodgeState.running = false;

    const lbEl = document.getElementById("wmDodgeLb");
    const top5 = updateLeaderboard("dodge", dodgeState.score);
    if (lbEl) lbEl.innerHTML = renderLeaderboard(top5);
  }

  function wireGamesControls() {
    document.addEventListener("click", function (e) {
      const btn = e.target.closest("[data-game]");
      if (!btn) return;

      const key = btn.getAttribute("data-game");
      if (!key) return;

      if (key === "memory") { initMemory(false); return; }
      if (key === "memory-reset") { initMemory(true); return; }

      if (key === "reaction") { initReaction(false); startReaction(); return; }
      if (key === "reaction-reset") { initReaction(true); return; }

      if (key === "breaker") { initBreaker(false); startBreaker(); return; }
      if (key === "breaker-reset") { initBreaker(true); return; }

      if (key === "dodge") { initDodge(false); startDodge(); return; }
      if (key === "dodge-reset") { initDodge(true); return; }
    });

    document.addEventListener("click", function (e) {
      const card = e.target.closest(".wmMemCard");
      if (!card) return;
      const idxRaw = card.getAttribute("data-idx");
      const idx = idxRaw ? parseInt(idxRaw, 10) : -1;
      if (idx >= 0) memFlip(idx);
    });
  }

  function init() {
    createPlayerBar();

    wmAudio = $("#wmAudio");
    hardenAudioElement(wmAudio);

    wirePlayButtons(wmAudio);
    wireNavigation();
    wirePlayerControls();
    wireGamesControls();

    renderFeaturedGrid();
    renderMusicList();
    renderLinks();
    renderPress();
    renderGames();

    window.addEventListener("hashchange", applyRoute);
    applyRoute();

    const shuffleBtn = $("#wmShuffleBtn");
    if (shuffleBtn) shuffleBtn.textContent = `Shuffle: ${shuffleOn ? "On" : "Off"}`;

    setNowPlayingUI(null);
    restorePlayerState();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

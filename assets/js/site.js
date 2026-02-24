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
      cover: "/assets/img/covers/jazzbaby.jpg",
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
      cover: "/assets/img/covers/dancefloorsaviour.jpg",
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
      cover: "/assets/img/covers/mylove.jpg",
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
      cover: "/assets/img/covers/monkeyman.jpg",
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

  function clearState() {
    try {
      localStorage.removeItem(STORAGE_KEY);
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
      return;
    }

    title.textContent = track.title;
    sub.textContent = `${laneLabel(track.lane)}${track.note ? `, ${track.note}` : ``}`;
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

    try {
      audioEl.currentTime = 0;
    } catch (e) {}
  }

  function playTrackById(trackId) {
    const track = findTrackById(trackId);
    if (!wmAudio || !track) return;

    currentTrackId = track.id;
    recentQueue.push(track.id);
    if (recentQueue.length > 20) recentQueue = recentQueue.slice(-20);

    setNowPlayingUI(track);
    setAudioSource(wmAudio, track);

    wmAudio.play().catch(() => {});
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
      });
    }

    if (wmAudio) {
      wmAudio.addEventListener("ended", function () {
        playNext();
      });
    }

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

  function wireAudioPersistence(audioEl) {
    if (!audioEl) return;

    audioEl.addEventListener("pause", function () {
      const id = audioEl.getAttribute("data-track-id");
      if (!id) return;
      saveState({ trackId: id, time: 0, paused: true });
    });

    audioEl.addEventListener("play", function () {
      const id = audioEl.getAttribute("data-track-id");
      if (!id) return;
      saveState({ trackId: id, time: 0, paused: false });
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

    audioEl.play().catch(() => {});
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
      .wmGamesGrid{
        display:grid;
        grid-template-columns:repeat(2, minmax(0, 1fr));
        gap:14px;
      }
      .wmGamesGrid .wmGameWrap.isFull{
        grid-column:1 / span 2;
      }
      @media (max-width: 900px){
        .wmGamesGrid{ grid-template-columns:1fr; }
        .wmGamesGrid .wmGameWrap.isFull{ grid-column:auto; }
      }

      .wmGameWrap{
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

      .wmInlineSelect{
        border:1px solid rgba(255,255,255,0.14);
        background:rgba(0,0,0,0.20);
        color:rgba(242,243,247,0.92);
        border-radius:12px;
        padding:8px 10px;
        font-size:12px;
        outline:none;
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
              <h3 class="wmGameTitle">Dive Kick</h3>
              <div class="wmGameSub">Arrow keys move. D dives. Space kicks</div>
              <div class="wmGameRow" style="margin-top:10px;">
                <select class="wmInlineSelect" id="wmLanezPick" aria-label="Lanez">
                  <option value="red">🔴 Lanez</option>
                  <option value="blue">🔵 Lanez</option>
                  <option value="green">🟢 Lanez</option>
                  <option value="yellow">🟡 Lanez</option>
                  <option value="pink">🩷 Lanez</option>
                </select>
              </div>
            </div>
            <div class="wmGameRow">
              <button class="btn btnPrimary" type="button" data-game="divekick">Play</button>
              <button class="btn" type="button" data-game="divekick-reset">Reset</button>
            </div>
          </div>
          <div id="wmGameDiveKick"></div>
        </div>

        <div class="wmGameWrap isFull">
          <div class="wmGameHead">
            <div>
              <h3 class="wmGameTitle">Lane Dodge</h3>
            </div>
            <div class="wmGameRow">
              <button class="btn btnPrimary" type="button" data-game="dodge">Play</button>
              <button class="btn" type="button" data-game="dodge-reset">Reset</button>
            </div>
          </div>
          <div id="wmGameDodge"></div>
        </div>

        <div class="wmGameWrap isFull">
          <div class="wmGameHead">
            <div>
              <h3 class="wmGameTitle">Crow Cannon</h3>
              <div class="wmGameSub">Hold Space to charge. Release to fire</div>
            </div>
            <div class="wmGameRow">
              <button class="btn btnPrimary" type="button" data-game="cannon">Play</button>
              <button class="btn" type="button" data-game="cannon-reset">Reset</button>
            </div>
          </div>
          <div id="wmGameCannon"></div>
        </div>

        <div class="wmGameWrap isFull">
          <div class="wmGameHead">
            <div>
              <h3 class="wmGameTitle">Mini Golf</h3>
              <div class="wmGameSub">Drag to aim. Release to hit</div>
            </div>
            <div class="wmGameRow">
              <button class="btn btnPrimary" type="button" data-game="golf">Play</button>
              <button class="btn" type="button" data-game="golf-reset">Reset</button>
            </div>
          </div>
          <div id="wmGameGolf"></div>
        </div>
      </div>
    `;

    initMemory(true);
    initReaction(true);
    initBreaker(true);
    initDiveKick(true);
    initDodge(true);
    initCannon(true);
    initGolf(true);
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

    bgImg.onload = function () {
      breakerState.bgReady = true;
    };

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
      setPaddleFromClientX(e.clientX);
    });

    canvas.addEventListener("touchmove", function (e) {
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

    canvas.addEventListener("mousemove", e => setX(e.clientX));
    canvas.addEventListener("touchmove", function (e) {
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

    if (Math.random() < 0.10) {
      dodgeState.hazards.push({
        x: Math.random() * dodgeState.canvas.width,
        y: -20,
        r: 10 + Math.random() * 12,
        vy: 3.6 + Math.random() * 2.8
      });
    }

    for (const h of dodgeState.hazards) h.y += h.vy * dt;
    dodgeState.hazards = dodgeState.hazards.filter(h => h.y < dodgeState.canvas.height + 40);

    for (const h of dodgeState.hazards) {
      const dx = h.x - dodgeState.x;
      const dy = h.y - dodgeState.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < h.r + 14) {
        endDodge();
        return;
      }
    }

    dodgeState.score += Math.floor(3 * dt);

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

  let dkState = null;
  let dkLane = "red";

  function laneColor(lane) {
    const v = String(lane || "").toLowerCase();
    if (v === "red") return "rgba(255,60,60,0.90)";
    if (v === "blue") return "rgba(0,229,255,0.90)";
    if (v === "green") return "rgba(0,255,160,0.90)";
    if (v === "yellow") return "rgba(255,190,0,0.90)";
    if (v === "pink") return "rgba(255,43,214,0.90)";
    return "rgba(255,255,255,0.90)";
  }

  function initDiveKick(silent) {
    const mount = document.getElementById("wmGameDiveKick");
    if (!mount) return;

    mount.innerHTML = `
      <div class="wmTiny" style="margin-bottom:10px;">
        Score: <span id="wmDkScore">0</span>
        <span style="margin-left:10px;">Hits: <span id="wmDkHits">0</span></span>
        <span style="margin-left:10px;" class="wmCountdown">Time: <span id="wmDkTime">15.0</span></span>
      </div>
      <div class="wmCanvasWrap" style="position:relative;">
        <canvas id="wmDkCanvas" width="960" height="440"></canvas>
      </div>
      <div class="wmLbBox">
        <div class="wmTiny" style="margin-bottom:6px;">Top 5</div>
        <div id="wmDkLb"></div>
      </div>
    `;

    const lbEl = document.getElementById("wmDkLb");
    if (lbEl) lbEl.innerHTML = renderLeaderboard(readJson("wamsmash_lb_divekick", []).slice(0, 5));

    const canvas = document.getElementById("wmDkCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const bgUrl = pickRandomCoverUrl();
    const bg = new Image();
    if (bgUrl) bg.src = bgUrl;

    dkState = {
      canvas,
      ctx,
      bg,
      bgReady: false,
      running: false,
      endAt: 0,
      lastT: 0,
      score: 0,
      hits: 0,
      keys: {},
      player: { x: 240, y: 320, vx: 0, vy: 0, r: 16, grounded: true, diving: false },
      bot: { x: 720, y: 320, vx: 0, vy: 0, r: 16, grounded: true, diving: false, dir: -1, t: 0 }
    };

    bg.onload = function () { dkState.bgReady = true; };

    const pick = document.getElementById("wmLanezPick");
    if (pick) {
      dkLane = pick.value || dkLane;
      pick.onchange = function () {
        dkLane = pick.value || dkLane;
      };
    }

    if (!silent) {}
  }

  function startDiveKick() {
    if (!dkState) return;

    dkState.running = false;
    dkState.lastT = 0;
    dkState.score = 0;
    dkState.hits = 0;
    dkState.keys = {};
    dkState.player.x = 240;
    dkState.player.y = 320;
    dkState.player.vx = 0;
    dkState.player.vy = 0;
    dkState.player.grounded = true;
    dkState.player.diving = false;
    dkState.bot.x = 720;
    dkState.bot.y = 320;
    dkState.bot.vx = 0;
    dkState.bot.vy = 0;
    dkState.bot.grounded = true;
    dkState.bot.diving = false;
    dkState.bot.t = 0;

    const scoreEl = document.getElementById("wmDkScore");
    const hitsEl = document.getElementById("wmDkHits");
    const timeEl = document.getElementById("wmDkTime");
    if (scoreEl) scoreEl.textContent = "0";
    if (hitsEl) hitsEl.textContent = "0";
    if (timeEl) timeEl.textContent = "15.0";

    drawDiveKick();

    const wrap = dkState.canvas.parentElement;
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
          dkState.running = true;
          dkState.endAt = performance.now() + 15000;
          requestAnimationFrame(tickDiveKick);
        }, 260);
      }, 420);
    }, 520);
  }

  function tickDiveKick(t) {
    if (!dkState || !dkState.running) return;

    const s = dkState;
    const dt = s.lastT ? clamp((t - s.lastT) / 16.666, 0.7, 1.6) : 1;
    s.lastT = t;

    const floorY = 340;
    const grav = 0.55;

    const p = s.player;

    const moveLeft = !!(s.keys["ArrowLeft"] || s.keys["KeyA"]);
    const moveRight = !!(s.keys["ArrowRight"] || s.keys["KeyD"]);
    const diveBtn = !!(s.keys["KeyD"]);
    const kickBtn = !!(s.keys["Space"]);

    p.vx = 0;
    if (moveLeft) p.vx = -5.0;
    if (moveRight) p.vx = 5.0;

    if (diveBtn && p.grounded) {
      p.grounded = false;
      p.diving = true;
      p.vy = -9.5;
    }

    if (!p.grounded) {
      if (p.diving && kickBtn) {
        p.vy += 1.05;
      } else {
        p.vy += grav;
      }
      p.y += p.vy * dt;
    }

    p.x = clamp(p.x + p.vx * dt, 40, s.canvas.width - 40);

    if (p.y >= floorY) {
      p.y = floorY;
      p.vy = 0;
      p.grounded = true;
      p.diving = false;
    }

    const b = s.bot;
    b.t += dt;

    if (b.grounded && b.t > 22) {
      b.t = 0;
      b.dir = (p.x < b.x) ? -1 : 1;

      if (Math.random() < 0.75) {
        b.grounded = false;
        b.diving = true;
        b.vy = -9.0;
      }
    }

    b.vx = b.dir * 3.0;
    b.x = clamp(b.x + b.vx * dt, 40, s.canvas.width - 40);

    if (!b.grounded) {
      b.vy += grav;
      if (b.diving) b.vy += 0.55;
      b.y += b.vy * dt;

      if (b.y >= floorY) {
        b.y = floorY;
        b.vy = 0;
        b.grounded = true;
        b.diving = false;
      }
    }

    const dx = p.x - b.x;
    const dy = p.y - b.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < p.r + b.r) {
      const playerAttack = p.diving && !p.grounded && kickBtn;
      const botAttack = b.diving && !b.grounded;

      if (playerAttack && !botAttack) {
        s.hits += 1;
        s.score += 120;
        b.x = 720;
        b.y = floorY;
        b.grounded = true;
        b.diving = false;
        b.vy = 0;
      } else if (botAttack && !playerAttack) {
        s.score = Math.max(0, s.score - 80);
        p.x = 240;
        p.y = floorY;
        p.grounded = true;
        p.diving = false;
        p.vy = 0;
      } else {
        s.score = Math.max(0, s.score - 30);
      }
    }

    const leftMs = s.endAt - t;
    const secsLeft = Math.max(0, leftMs / 1000);

    const scoreEl = document.getElementById("wmDkScore");
    const hitsEl = document.getElementById("wmDkHits");
    const timeEl = document.getElementById("wmDkTime");
    if (scoreEl) scoreEl.textContent = String(s.score);
    if (hitsEl) hitsEl.textContent = String(s.hits);
    if (timeEl) timeEl.textContent = secsLeft.toFixed(1);

    drawDiveKick();

    if (leftMs <= 0) {
      endDiveKick();
      return;
    }

    requestAnimationFrame(tickDiveKick);
  }

  function drawDiveKick() {
    const s = dkState;
    if (!s) return;

    const g = s.ctx;
    const w = s.canvas.width;
    const h = s.canvas.height;

    g.clearRect(0, 0, w, h);

    if (s.bgReady) {
      g.globalAlpha = 0.16;
      g.drawImage(s.bg, 0, 0, w, h);
      g.globalAlpha = 1;
    }

    g.fillStyle = "rgba(0,0,0,0.24)";
    g.fillRect(0, 0, w, h);

    g.fillStyle = "rgba(255,255,255,0.06)";
    g.fillRect(0, 360, w, 2);

    const playerCol = laneColor(dkLane);
    const botCol = "rgba(255,255,255,0.78)";

    g.fillStyle = playerCol;
    g.beginPath();
    g.arc(s.player.x, s.player.y, s.player.r, 0, Math.PI * 2);
    g.fill();

    if (s.player.diving && !s.player.grounded) {
      g.fillStyle = playerCol.replace("0.90", "0.20");
      g.beginPath();
      g.arc(s.player.x, s.player.y, 34, 0, Math.PI * 2);
      g.fill();
    }

    g.fillStyle = botCol;
    g.beginPath();
    g.arc(s.bot.x, s.bot.y, s.bot.r, 0, Math.PI * 2);
    g.fill();

    if (s.bot.diving && !s.bot.grounded) {
      g.fillStyle = "rgba(255,255,255,0.12)";
      g.beginPath();
      g.arc(s.bot.x, s.bot.y, 34, 0, Math.PI * 2);
      g.fill();
    }

    g.strokeStyle = "rgba(0,229,255,0.18)";
    g.strokeRect(1, 1, w - 2, h - 2);
  }

  function endDiveKick() {
    if (!dkState) return;
    dkState.running = false;

    const lbEl = document.getElementById("wmDkLb");
    const top5 = updateLeaderboard("divekick", dkState.score);
    if (lbEl) lbEl.innerHTML = renderLeaderboard(top5);
  }

  function wireDiveKickKeys() {
    document.addEventListener("keydown", function (e) {
      if (!dkState) return;
      dkState.keys[e.code] = true;
    });

    document.addEventListener("keyup", function (e) {
      if (!dkState) return;
      dkState.keys[e.code] = false;
    });
  }

  let cannonState = null;

  function initCannon(silent) {
    const mount = document.getElementById("wmGameCannon");
    if (!mount) return;

    mount.innerHTML = `
      <div class="wmTiny" style="margin-bottom:10px;">
        Score: <span id="wmCanScore">0</span>
        <span style="margin-left:10px;">Power: <span id="wmCanPow">0</span></span>
      </div>
      <div class="wmCanvasWrap" style="position:relative;">
        <canvas id="wmCanCanvas" width="960" height="480"></canvas>
      </div>
      <div class="wmLbBox">
        <div class="wmTiny" style="margin-bottom:6px;">Top 5</div>
        <div id="wmCanLb"></div>
      </div>
    `;

    const lbEl = document.getElementById("wmCanLb");
    if (lbEl) lbEl.innerHTML = renderLeaderboard(readJson("wamsmash_lb_cannon", []).slice(0, 5));

    const canvas = document.getElementById("wmCanCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    cannonState = {
      canvas,
      ctx,
      running: false,
      fired: false,
      charge: 0,
      charging: false,
      angle: -0.55,
      score: 0,
      crow: { x: 120, y: 380, vx: 0, vy: 0, r: 12, alive: false },
      wind: (Math.random() * 0.6 - 0.3)
    };

    document.addEventListener("keydown", cannonKeyDown);
    document.addEventListener("keyup", cannonKeyUp);

    if (!silent) {}
  }

  function cannonKeyDown(e) {
    if (!cannonState) return;
    if (!cannonState.running) return;

    if (e.code === "ArrowUp") cannonState.angle = clamp(cannonState.angle - 0.03, -1.25, -0.10);
    if (e.code === "ArrowDown") cannonState.angle = clamp(cannonState.angle + 0.03, -1.25, -0.10);

    if (e.code === "Space") {
      e.preventDefault();
      cannonState.charging = true;
    }
  }

  function cannonKeyUp(e) {
    if (!cannonState) return;
    if (!cannonState.running) return;

    if (e.code === "Space") {
      e.preventDefault();
      if (!cannonState.fired) fireCrow();
      cannonState.charging = false;
    }
  }

  function startCannon() {
    if (!cannonState) return;

    cannonState.running = true;
    cannonState.fired = false;
    cannonState.charge = 0;
    cannonState.charging = false;
    cannonState.angle = -0.55;
    cannonState.score = 0;
    cannonState.crow = { x: 120, y: 380, vx: 0, vy: 0, r: 12, alive: false };
    cannonState.wind = (Math.random() * 0.6 - 0.3);

    const scoreEl = document.getElementById("wmCanScore");
    const powEl = document.getElementById("wmCanPow");
    if (scoreEl) scoreEl.textContent = "0";
    if (powEl) powEl.textContent = "0";

    const wrap = cannonState.canvas.parentElement;
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
          requestAnimationFrame(tickCannon);
        }, 260);
      }, 420);
    }, 520);
  }

  function fireCrow() {
    if (!cannonState || cannonState.fired) return;

    const pow = clamp(cannonState.charge, 10, 100);
    const spd = 6.5 + (pow / 100) * 16.5;

    cannonState.crow.alive = true;
    cannonState.crow.x = 120;
    cannonState.crow.y = 380;

    cannonState.crow.vx = Math.cos(cannonState.angle) * spd;
    cannonState.crow.vy = Math.sin(cannonState.angle) * spd;

    cannonState.fired = true;
  }

  function tickCannon(t) {
    if (!cannonState || !cannonState.running) return;

    const s = cannonState;
    const g = s.ctx;
    const w = s.canvas.width;
    const h = s.canvas.height;

    const powEl = document.getElementById("wmCanPow");
    if (s.charging && !s.fired) {
      s.charge = clamp(s.charge + 1.4, 0, 100);
      if (powEl) powEl.textContent = String(Math.floor(s.charge));
    }

    if (s.crow.alive) {
      s.crow.vx += s.wind * 0.02;
      s.crow.vy += 0.38;
      s.crow.x += s.crow.vx;
      s.crow.y += s.crow.vy;

      if (s.crow.y >= 402) {
        s.crow.y = 402;
        s.crow.vx *= 0.88;
        s.crow.vy *= -0.25;

        if (Math.abs(s.crow.vx) < 0.35 && Math.abs(s.crow.vy) < 0.35) {
          s.crow.alive = false;
          endCannon();
          return;
        }
      }

      if (s.crow.x > s.score) s.score = Math.floor(s.crow.x);
      const scoreEl = document.getElementById("wmCanScore");
      if (scoreEl) scoreEl.textContent = String(s.score);
    }

    g.clearRect(0, 0, w, h);

    g.fillStyle = "rgba(0,0,0,0.22)";
    g.fillRect(0, 0, w, h);

    g.fillStyle = "rgba(255,255,255,0.06)";
    g.fillRect(0, 412, w, 2);

    g.fillStyle = "rgba(255,255,255,0.10)";
    for (let x = 0; x <= w; x += 120) {
      g.fillRect(x, 412, 1, 12);
    }

    const cannonX = 120;
    const cannonY = 392;

    g.save();
    g.translate(cannonX, cannonY);
    g.rotate(s.angle);
    g.fillStyle = "rgba(0,229,255,0.55)";
    g.fillRect(0, -10, 90, 20);
    g.restore();

    g.fillStyle = "rgba(255,255,255,0.25)";
    g.beginPath();
    g.arc(cannonX, cannonY, 22, 0, Math.PI * 2);
    g.fill();

    if (!s.fired) {
      g.strokeStyle = "rgba(255,190,0,0.30)";
      g.beginPath();
      g.moveTo(cannonX, cannonY);
      g.lineTo(cannonX + Math.cos(s.angle) * (90 + (s.charge * 0.9)), cannonY + Math.sin(s.angle) * (90 + (s.charge * 0.9)));
      g.stroke();
    }

    if (s.crow.alive) {
      g.fillStyle = "rgba(255,43,214,0.85)";
      g.beginPath();
      g.arc(s.crow.x, s.crow.y, s.crow.r, 0, Math.PI * 2);
      g.fill();

      g.fillStyle = "rgba(0,0,0,0.25)";
      g.beginPath();
      g.arc(s.crow.x + 4, s.crow.y - 2, 3, 0, Math.PI * 2);
      g.fill();
    }

    requestAnimationFrame(tickCannon);
  }

  function endCannon() {
    if (!cannonState) return;
    cannonState.running = false;

    const lbEl = document.getElementById("wmCanLb");
    const top5 = updateLeaderboard("cannon", cannonState.score);
    if (lbEl) lbEl.innerHTML = renderLeaderboard(top5);
  }

  let golfState = null;

  function initGolf(silent) {
    const mount = document.getElementById("wmGameGolf");
    if (!mount) return;

    mount.innerHTML = `
      <div class="wmTiny" style="margin-bottom:10px;">
        Strokes: <span id="wmGolfStrokes">0</span>
        <span style="margin-left:10px;">Score: <span id="wmGolfScore">0</span></span>
      </div>
      <div class="wmCanvasWrap" style="position:relative;">
        <canvas id="wmGolfCanvas" width="960" height="480"></canvas>
      </div>
      <div class="wmLbBox">
        <div class="wmTiny" style="margin-bottom:6px;">Top 5</div>
        <div id="wmGolfLb"></div>
      </div>
    `;

    const lbEl = document.getElementById("wmGolfLb");
    if (lbEl) lbEl.innerHTML = renderLeaderboard(readJson("wamsmash_lb_golf", []).slice(0, 5));

    const canvas = document.getElementById("wmGolfCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    golfState = {
      canvas,
      ctx,
      running: false,
      aiming: false,
      strokes: 0,
      score: 0,
      ball: { x: 160, y: 360, vx: 0, vy: 0, r: 10 },
      hole: { x: 800, y: 140, r: 14 },
      drag: { x0: 0, y0: 0, x1: 0, y1: 0 },
      obstacles: [
        { x: 420, y: 190, w: 26, h: 220 },
        { x: 620, y: 0, w: 26, h: 220 },
      ],
      startAt: 0
    };

    canvas.addEventListener("mousedown", golfDown);
    canvas.addEventListener("mousemove", golfMove);
    window.addEventListener("mouseup", golfUp);

    canvas.addEventListener("touchstart", golfTouchDown, { passive: false });
    canvas.addEventListener("touchmove", golfTouchMove, { passive: false });
    window.addEventListener("touchend", golfTouchUp, { passive: false });

    if (!silent) {}
  }

  function golfDown(e) {
    if (!golfState || !golfState.running) return;
    if (Math.hypot(e.offsetX - golfState.ball.x, e.offsetY - golfState.ball.y) > 36) return;
    if (Math.hypot(golfState.ball.vx, golfState.ball.vy) > 0.15) return;

    golfState.aiming = true;
    golfState.drag.x0 = golfState.ball.x;
    golfState.drag.y0 = golfState.ball.y;
    golfState.drag.x1 = e.offsetX;
    golfState.drag.y1 = e.offsetY;
  }

  function golfMove(e) {
    if (!golfState || !golfState.running) return;
    if (!golfState.aiming) return;
    golfState.drag.x1 = e.offsetX;
    golfState.drag.y1 = e.offsetY;
  }

  function golfUp() {
    if (!golfState || !golfState.running) return;
    if (!golfState.aiming) return;

    golfState.aiming = false;

    const dx = golfState.drag.x0 - golfState.drag.x1;
    const dy = golfState.drag.y0 - golfState.drag.y1;

    const mag = clamp(Math.hypot(dx, dy), 0, 180);
    const p = (mag / 180) * 18;

    golfState.ball.vx = (dx / (mag || 1)) * p;
    golfState.ball.vy = (dy / (mag || 1)) * p;

    golfState.strokes += 1;
    const st = document.getElementById("wmGolfStrokes");
    if (st) st.textContent = String(golfState.strokes);
  }

  function golfTouchDown(e) {
    if (!golfState || !golfState.running) return;
    if (!e.touches || !e.touches.length) return;
    const t = e.touches[0];
    const rect = golfState.canvas.getBoundingClientRect();
    const x = (t.clientX - rect.left) * (golfState.canvas.width / rect.width);
    const y = (t.clientY - rect.top) * (golfState.canvas.height / rect.height);

    if (Math.hypot(x - golfState.ball.x, y - golfState.ball.y) > 36) return;
    if (Math.hypot(golfState.ball.vx, golfState.ball.vy) > 0.15) return;

    e.preventDefault();
    golfState.aiming = true;
    golfState.drag.x0 = golfState.ball.x;
    golfState.drag.y0 = golfState.ball.y;
    golfState.drag.x1 = x;
    golfState.drag.y1 = y;
  }

  function golfTouchMove(e) {
    if (!golfState || !golfState.running) return;
    if (!golfState.aiming) return;
    if (!e.touches || !e.touches.length) return;
    e.preventDefault();

    const t = e.touches[0];
    const rect = golfState.canvas.getBoundingClientRect();
    const x = (t.clientX - rect.left) * (golfState.canvas.width / rect.width);
    const y = (t.clientY - rect.top) * (golfState.canvas.height / rect.height);

    golfState.drag.x1 = x;
    golfState.drag.y1 = y;
  }

  function golfTouchUp(e) {
    if (!golfState || !golfState.running) return;
    if (!golfState.aiming) return;
    e.preventDefault();
    golfUp();
  }

  function startGolf() {
    if (!golfState) return;

    golfState.running = true;
    golfState.aiming = false;
    golfState.strokes = 0;
    golfState.score = 0;
    golfState.ball.x = 160;
    golfState.ball.y = 360;
    golfState.ball.vx = 0;
    golfState.ball.vy = 0;
    golfState.startAt = performance.now();

    const st = document.getElementById("wmGolfStrokes");
    const sc = document.getElementById("wmGolfScore");
    if (st) st.textContent = "0";
    if (sc) sc.textContent = "0";

    const wrap = golfState.canvas.parentElement;
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
          requestAnimationFrame(tickGolf);
        }, 260);
      }, 420);
    }, 520);
  }

  function tickGolf() {
    if (!golfState || !golfState.running) return;

    const s = golfState;
    const g = s.ctx;
    const w = s.canvas.width;
    const h = s.canvas.height;

    const friction = 0.985;

    s.ball.x += s.ball.vx;
    s.ball.y += s.ball.vy;

    s.ball.vx *= friction;
    s.ball.vy *= friction;

    if (Math.abs(s.ball.vx) < 0.02) s.ball.vx = 0;
    if (Math.abs(s.ball.vy) < 0.02) s.ball.vy = 0;

    if (s.ball.x < s.ball.r) { s.ball.x = s.ball.r; s.ball.vx *= -0.75; }
    if (s.ball.x > w - s.ball.r) { s.ball.x = w - s.ball.r; s.ball.vx *= -0.75; }
    if (s.ball.y < s.ball.r) { s.ball.y = s.ball.r; s.ball.vy *= -0.75; }
    if (s.ball.y > h - s.ball.r) { s.ball.y = h - s.ball.r; s.ball.vy *= -0.75; }

    for (const o of s.obstacles) {
      const bx = s.ball.x;
      const by = s.ball.y;

      const closestX = clamp(bx, o.x, o.x + o.w);
      const closestY = clamp(by, o.y, o.y + o.h);

      const dx = bx - closestX;
      const dy = by - closestY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < s.ball.r) {
        if (Math.abs(dx) > Math.abs(dy)) {
          s.ball.vx *= -0.85;
          s.ball.x += Math.sign(dx) * (s.ball.r - dist + 1);
        } else {
          s.ball.vy *= -0.85;
          s.ball.y += Math.sign(dy) * (s.ball.r - dist + 1);
        }
      }
    }

    const toHole = Math.hypot(s.ball.x - s.hole.x, s.ball.y - s.hole.y);
    if (toHole < s.hole.r && Math.hypot(s.ball.vx, s.ball.vy) < 0.45) {
      const timeMs = performance.now() - s.startAt;
      const timeScore = Math.max(0, 12000 - Math.floor(timeMs));
      const strokeScore = Math.max(0, 6000 - (s.strokes * 850));
      s.score = Math.floor(timeScore + strokeScore);

      const sc = document.getElementById("wmGolfScore");
      if (sc) sc.textContent = String(s.score);

      endGolf();
      return;
    }

    g.clearRect(0, 0, w, h);

    g.fillStyle = "rgba(0,0,0,0.22)";
    g.fillRect(0, 0, w, h);

    g.strokeStyle = "rgba(255,255,255,0.08)";
    for (let i = 0; i < 5; i++) {
      g.strokeRect(18 + i * 10, 18 + i * 10, w - 36 - i * 20, h - 36 - i * 20);
    }

    g.fillStyle = "rgba(255,255,255,0.10)";
    for (const o of s.obstacles) {
      g.fillRect(o.x, o.y, o.w, o.h);
    }

    g.fillStyle = "rgba(255,190,0,0.85)";
    g.beginPath();
    g.arc(s.hole.x, s.hole.y, s.hole.r, 0, Math.PI * 2);
    g.fill();

    g.fillStyle = "rgba(0,0,0,0.55)";
    g.beginPath();
    g.arc(s.hole.x, s.hole.y, s.hole.r - 6, 0, Math.PI * 2);
    g.fill();

    g.fillStyle = "rgba(0,229,255,0.85)";
    g.beginPath();
    g.arc(s.ball.x, s.ball.y, s.ball.r, 0, Math.PI * 2);
    g.fill();

    if (s.aiming) {
      g.strokeStyle = "rgba(255,43,214,0.35)";
      g.beginPath();
      g.moveTo(s.drag.x0, s.drag.y0);
      g.lineTo(s.drag.x1, s.drag.y1);
      g.stroke();
    }

    requestAnimationFrame(tickGolf);
  }

  function endGolf() {
    if (!golfState) return;
    golfState.running = false;

    const lbEl = document.getElementById("wmGolfLb");
    const top5 = updateLeaderboard("golf", golfState.score);
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

      if (key === "divekick") { initDiveKick(false); startDiveKick(); return; }
      if (key === "divekick-reset") { initDiveKick(true); return; }

      if (key === "dodge") { initDodge(false); startDodge(); return; }
      if (key === "dodge-reset") { initDodge(true); return; }

      if (key === "cannon") { initCannon(false); startCannon(); return; }
      if (key === "cannon-reset") { initCannon(true); return; }

      if (key === "golf") { initGolf(false); startGolf(); return; }
      if (key === "golf-reset") { initGolf(true); return; }
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

    clearState();

    wireAudioPersistence(wmAudio);
    wirePlayButtons(wmAudio);
    wireNavigation();
    wirePlayerControls();
    wireGamesControls();
    wireDiveKickKeys();

    renderFeaturedGrid();
    renderMusicList();
    renderLinks();
    renderPress();
    renderGames();

    window.addEventListener("hashchange", applyRoute);
    applyRoute();

    setNowPlayingUI(null);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

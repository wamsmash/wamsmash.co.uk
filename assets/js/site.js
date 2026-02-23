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
      cover: "/assets/img/covers/breach.mp3",
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

  const GAMES = [
    {
      id: "reaction",
      title: "Neon Reaction",
      note: "Reflex",
      blurb: "Wait for the flash\nClick as soon as it flips\nNo false starts",
      tags: "reaction time\nrepeatable loop\nclean input",
    },
    {
      id: "memory",
      title: "Lane Memory",
      note: "Pairs",
      blurb: "Match the lanes\nEmoji and label pairs\nFinish clean",
      tags: "lane system\npattern recall\nshort session",
    }
  ];

  const gameState = {
    reaction: { stage: "idle", timerId: 0, startAt: 0, best: 0, last: 0, falseStarts: 0 },
    memory: { deck: [], flipped: [], matched: 0, moves: 0, locked: false }
  };

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
    if (v === "iridescent") return "🫧 IRIDESCENT LANE";
    if (v === "orange") return "🟠 ORANGE LANE";
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
    email: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2zm0 2v.3l8 5.3 8-5.3V7H4zm16 2.7l-8 5.3-8-5.3V17h16V9.7z"/></svg>`,
    bandcamp: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.7 7H22l-4.9 10H9.3L14.7 7zM2 7h9.1L6.2 17H2V7z"/></svg>`,
  };

  function iconMarkup(name) {
    const svg = ICONS[name] || "";
    return `<div class="linkIcon" aria-hidden="true">${svg}</div>`;
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

  function restoreAudio(audioEl) {
    if (!audioEl) return;
    setNowPlayingUI(null);
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

  function gameCardMarkup(game) {
    return `
      <div class="cardTop">
        <div>
          <h3 class="cardTitle">${game.title}</h3>
          <div class="cardMeta">${game.note}</div>
        </div>
        <div class="badge">Game</div>
      </div>

      ${game.blurb ? `<div style="padding:0 14px 12px 14px; color:rgba(242,243,247,0.86); line-height:1.4; white-space:pre-line;">${game.blurb}</div>` : ``}
      ${game.tags ? `<div style="padding:0 14px 12px 14px; color:rgba(166,168,179,0.95); line-height:1.35; white-space:pre-line; font-size:12px;">${game.tags}</div>` : ``}

      <div class="cardActions">
        <button class="btn btnPrimary" type="button" data-game-open="${game.id}">Open</button>
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

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function buildMemoryDeck() {
    const pairs = [
      { k: "red", label: laneLabel("red") },
      { k: "blue", label: laneLabel("blue") },
      { k: "green", label: laneLabel("green") },
      { k: "yellow", label: laneLabel("yellow") },
      { k: "pink", label: laneLabel("pink") },
      { k: "iridescent", label: laneLabel("iridescent") },
    ];

    const deck = [];
    for (let i = 0; i < pairs.length; i++) {
      const p = pairs[i];
      deck.push({ id: `${p.k}_a`, key: p.k, face: p.label });
      deck.push({ id: `${p.k}_b`, key: p.k, face: p.label });
    }
    return shuffle(deck);
  }

  function renderGames() {
    const mount = document.getElementById("wmGames");
    if (!mount) return;

    mount.innerHTML = "";

    for (let i = 0; i < GAMES.length; i++) {
      const g = GAMES[i];
      const card = document.createElement("div");
      card.className = "card";
      card.setAttribute("data-game-card", g.id);
      card.innerHTML = gameCardMarkup(g);
      mount.appendChild(card);
    }
  }

  function openGame(gameId) {
    const card = document.querySelector(`[data-game-card="${gameId}"]`);
    if (!card) return;

    if (gameId === "reaction") {
      const s = gameState.reaction;
      if (s.timerId) clearTimeout(s.timerId);
      s.stage = "idle";
      s.startAt = 0;
      s.last = 0;

      card.innerHTML = `
        <div class="cardTop">
          <div>
            <h3 class="cardTitle">Neon Reaction</h3>
            <div class="cardMeta">Wait, then click</div>
          </div>
          <div class="badge">Game</div>
        </div>

        <div style="padding:0 14px 12px 14px; color:rgba(242,243,247,0.86); line-height:1.4; white-space:pre-line;">
          Click Start\nWait for the signal\nClick the panel
        </div>

        <div style="padding:0 14px 12px 14px; color:rgba(166,168,179,0.95); line-height:1.35; white-space:pre-line; font-size:12px;">
          Last: ${s.last ? `${s.last} ms` : `—`}\nBest: ${s.best ? `${s.best} ms` : `—`}\nFalse starts: ${s.falseStarts}
        </div>

        <div style="padding:0 14px 14px 14px;">
          <div
            data-reaction-panel="1"
            style="
              height:140px;
              border:1px solid rgba(255,255,255,0.12);
              border-radius:16px;
              background:rgba(0,0,0,0.20);
              display:flex;
              align-items:center;
              justify-content:center;
              user-select:none;
              -webkit-user-select:none;
              cursor:pointer;
              letter-spacing:0.06em;
              text-transform:uppercase;
              font-size:12px;
              color:rgba(242,243,247,0.92);
            "
          >Idle</div>
        </div>

        <div class="cardActions">
          <button class="btn btnPrimary" type="button" data-reaction-start="1">Start</button>
          <button class="btn" type="button" data-game-back="1">Back</button>
        </div>
      `;
      return;
    }

    if (gameId === "memory") {
      const m = gameState.memory;
      m.deck = buildMemoryDeck();
      m.flipped = [];
      m.matched = 0;
      m.moves = 0;
      m.locked = false;

      const tiles = m.deck.map(function (t) {
        return `
          <button
            type="button"
            class="btn"
            data-memory-tile="${t.id}"
            style="
              width:100%;
              height:72px;
              border-radius:14px;
              display:flex;
              align-items:center;
              justify-content:center;
              letter-spacing:0.06em;
              text-transform:uppercase;
              font-size:12px;
              white-space:nowrap;
              overflow:hidden;
              text-overflow:ellipsis;
            "
          >?</button>
        `;
      }).join("");

      card.innerHTML = `
        <div class="cardTop">
          <div>
            <h3 class="cardTitle">Lane Memory</h3>
            <div class="cardMeta">Match the pairs</div>
          </div>
          <div class="badge">Game</div>
        </div>

        <div style="padding:0 14px 12px 14px; color:rgba(166,168,179,0.95); line-height:1.35; white-space:pre-line; font-size:12px;">
          Moves: <span data-memory-moves="1">0</span>\nMatched: <span data-memory-matched="1">0</span> / 6
        </div>

        <div style="padding:0 14px 14px 14px;">
          <div
            style="
              display:grid;
              grid-template-columns:repeat(3, minmax(0, 1fr));
              gap:10px;
            "
          >
            ${tiles}
          </div>
        </div>

        <div class="cardActions">
          <button class="btn btnPrimary" type="button" data-memory-reset="1">Reset</button>
          <button class="btn" type="button" data-game-back="1">Back</button>
        </div>
      `;
      return;
    }
  }

  function closeGame(gameId) {
    const card = document.querySelector(`[data-game-card="${gameId}"]`);
    if (!card) return;

    const g = GAMES.find(x => x.id === gameId);
    if (!g) return;

    if (gameId === "reaction") {
      const s = gameState.reaction;
      if (s.timerId) clearTimeout(s.timerId);
      s.timerId = 0;
      s.stage = "idle";
      s.startAt = 0;
    }

    card.innerHTML = gameCardMarkup(g);
  }

  function startReaction() {
    const s = gameState.reaction;
    if (s.timerId) clearTimeout(s.timerId);

    s.stage = "waiting";
    s.startAt = 0;

    const card = document.querySelector(`[data-game-card="reaction"]`);
    if (!card) return;

    const panel = card.querySelector("[data-reaction-panel]");
    if (panel) {
      panel.textContent = "Waiting";
      panel.style.background = "rgba(0,0,0,0.20)";
      panel.style.borderColor = "rgba(255,255,255,0.12)";
    }

    const delay = 700 + Math.floor(Math.random() * 1600);
    s.timerId = setTimeout(function () {
      s.timerId = 0;
      s.stage = "go";
      s.startAt = performance.now();

      const c = document.querySelector(`[data-game-card="reaction"]`);
      const p = c ? c.querySelector("[data-reaction-panel]") : null;
      if (p) {
        p.textContent = "Go";
        p.style.background = "rgba(255,255,255,0.10)";
        p.style.borderColor = "rgba(255,255,255,0.28)";
      }
    }, delay);
  }

  function clickReactionPanel() {
    const s = gameState.reaction;
    const card = document.querySelector(`[data-game-card="reaction"]`);
    if (!card) return;

    const panel = card.querySelector("[data-reaction-panel]");
    if (!panel) return;

    if (s.stage === "waiting") {
      s.falseStarts += 1;
      s.stage = "idle";
      if (s.timerId) clearTimeout(s.timerId);
      s.timerId = 0;
      panel.textContent = "False start";
      panel.style.background = "rgba(0,0,0,0.20)";
      panel.style.borderColor = "rgba(255,255,255,0.12)";
      openGame("reaction");
      return;
    }

    if (s.stage !== "go" || !s.startAt) return;

    const ms = Math.max(0, Math.round(performance.now() - s.startAt));
    s.last = ms;
    if (!s.best || ms < s.best) s.best = ms;
    s.stage = "idle";
    s.startAt = 0;

    panel.textContent = `${ms} ms`;
    panel.style.background = "rgba(0,0,0,0.20)";
    panel.style.borderColor = "rgba(255,255,255,0.12)";

    openGame("reaction");
  }

  function memoryFind(id) {
    const m = gameState.memory;
    return m.deck.find(x => x.id === id) || null;
  }

  function setMemoryCounters(root) {
    const m = gameState.memory;
    const movesEl = root.querySelector("[data-memory-moves]");
    const matchedEl = root.querySelector("[data-memory-matched]");
    if (movesEl) movesEl.textContent = String(m.moves);
    if (matchedEl) matchedEl.textContent = String(m.matched);
  }

  function revealMemoryTile(btn, face) {
    btn.textContent = face;
    btn.style.borderColor = "rgba(255,255,255,0.30)";
    btn.style.background = "rgba(255,255,255,0.10)";
  }

  function hideMemoryTile(btn) {
    btn.textContent = "?";
    btn.style.borderColor = "rgba(255,255,255,0.18)";
    btn.style.background = "rgba(0,0,0,0.20)";
  }

  function lockMemoryTile(btn) {
    btn.disabled = true;
    btn.style.borderColor = "rgba(255,255,255,0.12)";
    btn.style.background = "rgba(0,0,0,0.25)";
    btn.style.opacity = "0.75";
  }

  function clickMemoryTile(tileId) {
    const card = document.querySelector(`[data-game-card="memory"]`);
    if (!card) return;

    const m = gameState.memory;
    if (m.locked) return;

    const btn = card.querySelector(`[data-memory-tile="${tileId}"]`);
    if (!btn || btn.disabled) return;

    const item = memoryFind(tileId);
    if (!item) return;

    if (m.flipped.indexOf(tileId) >= 0) return;

    m.flipped.push(tileId);
    revealMemoryTile(btn, item.face);

    if (m.flipped.length < 2) return;

    m.moves += 1;
    setMemoryCounters(card);

    const aId = m.flipped[0];
    const bId = m.flipped[1];
    const a = memoryFind(aId);
    const b = memoryFind(bId);

    if (!a || !b) {
      m.flipped = [];
      return;
    }

    if (a.key === b.key) {
      const aBtn = card.querySelector(`[data-memory-tile="${aId}"]`);
      const bBtn = card.querySelector(`[data-memory-tile="${bId}"]`);
      if (aBtn) lockMemoryTile(aBtn);
      if (bBtn) lockMemoryTile(bBtn);

      m.matched += 1;
      m.flipped = [];
      setMemoryCounters(card);

      if (m.matched >= 6) {
        const top = card.querySelector(".cardMeta");
        if (top) top.textContent = "Complete";
      }
      return;
    }

    m.locked = true;
    setTimeout(function () {
      const aBtn = card.querySelector(`[data-memory-tile="${aId}"]`);
      const bBtn = card.querySelector(`[data-memory-tile="${bId}"]`);
      if (aBtn) hideMemoryTile(aBtn);
      if (bBtn) hideMemoryTile(bBtn);
      m.flipped = [];
      m.locked = false;
    }, 650);
  }

  function renderLinksAndPress() {
    renderLinks();
    renderPress();
  }

  function playTrack(audioEl, trackId) {
    const track = findTrackById(trackId);
    if (!track) return;

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

  function wireGames() {
    document.addEventListener("click", function (e) {
      const openBtn = e.target.closest("[data-game-open]");
      if (openBtn) {
        const id = openBtn.getAttribute("data-game-open");
        openGame(id);
        return;
      }

      const backBtn = e.target.closest("[data-game-back]");
      if (backBtn) {
        const card = e.target.closest("[data-game-card]");
        if (!card) return;
        const id = card.getAttribute("data-game-card");
        closeGame(id);
        return;
      }

      const reactionStart = e.target.closest("[data-reaction-start]");
      if (reactionStart) {
        startReaction();
        return;
      }

      const reactionPanel = e.target.closest("[data-reaction-panel]");
      if (reactionPanel) {
        clickReactionPanel();
        return;
      }

      const memReset = e.target.closest("[data-memory-reset]");
      if (memReset) {
        openGame("memory");
        return;
      }

      const memTile = e.target.closest("[data-memory-tile]");
      if (memTile) {
        const tileId = memTile.getAttribute("data-memory-tile");
        clickMemoryTile(tileId);
        return;
      }
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
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
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

  function init() {
    createPlayerBar();

    const audioEl = $("#wmAudio");
    hardenAudioElement(audioEl);

    clearState();

    wireAudioPersistence(audioEl);
    restoreAudio(audioEl);

    renderFeaturedGrid();
    renderMusicList();
    renderLinksAndPress();
    renderGames();

    wirePlayButtons(audioEl);
    wireNavigation();
    wireGames();

    window.addEventListener("hashchange", applyRoute);
    applyRoute();

    if (!audioEl || !audioEl.getAttribute("data-track-id")) setNowPlayingUI(null);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

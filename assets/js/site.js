(function () {
  const STORAGE_KEY = "wamsmash_player_state_v1";

  const FEATURED_COUNT = 6;

  const TRACKS = [
    {
      id: "chaos",
      title: "CHAOS",
      lane: "red",
      year: "2026",
      audio: "/assets/audio/chaos.mp3",
      cover: "/assets/img/covers/chaos.jpg",
      note: "Modern Parable",
      blurb: "Borrowed power. No rules\nPredators eat. Allies ghost\nGates shut. No way back in",
      tags: "modern parable, jungle leaning drums, cinematic pressure, high contrast",
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
    },
    {
      id: "dreams",
      title: "DREAMS",
      lane: "blue",
      year: "2026",
      audio: "/assets/audio/dreams.mp3",
      cover: "/assets/img/covers/dreams.jpg",
      note: "Night drive",
      blurb: "Blue lane drift. Late hours, clean motion, quiet confidence.",
      tags: "blue lane, night drive, drift, focus, neon noir",
    },
    {
      id: "snowberry",
      title: "SNOWBERRY",
      lane: "iridescent",
      year: "2026",
      audio: "/assets/audio/snowberry.mp3",
      cover: "/assets/img/covers/snowberry.jpg",
      note: "Winter glow",
      blurb: "Iridescent winter. Pink neon reflection on snow, sweetness with bite.",
      tags: "iridescent lane, winter, neon reflection, sweetness, cold air",
    },
    {
      id: "greenmachine",
      title: "GREEN MACHINE",
      lane: "green",
      year: "2026",
      audio: "/assets/audio/green-machine.mp3",
      cover: "/assets/img/covers/green-machine.jpg",
      note: "Propulsion",
      blurb: "Green lane engine. Structured drive, mechanical intent, forward push.",
      tags: "green lane, propulsion, engine, drive, industrial",
    },
    {
      id: "jimmy",
      title: "JIMMY",
      lane: "blue",
      year: "2026",
      audio: "/assets/audio/jimmy.mp3",
      cover: "/assets/img/covers/jimmy.jpg",
      note: "Character",
      blurb: "Blue lane portrait. A person in motion, story told with restraint.",
      tags: "blue lane, character, portrait, story, late night",
    },
    {
      id: "jazzbaby",
      title: "JAZZ BABY",
      lane: "pink",
      year: "2026",
      audio: "/assets/audio/jazz-baby.mp3",
      cover: "/assets/img/covers/jazz-baby.jpg",
      note: "Flirt",
      blurb: "Pink lane play. Smooth edges, bright accents, controlled heat.",
      tags: "pink lane, flirt, groove, smooth, neon noir",
    },
    {
      id: "dancefloorsaviour",
      title: "DANCE FLOOR SAVIOUR",
      lane: "yellow",
      year: "2026",
      audio: "/assets/audio/dance-floor-saviour.mp3",
      cover: "/assets/img/covers/dance-floor-saviour.jpg",
      note: "Lift",
      blurb: "Yellow lane release. Hands up moment, warmth and movement.",
      tags: "yellow lane, lift, release, warmth, movement",
    },
    {
      id: "mylove",
      title: "MY LOVE",
      lane: "blue",
      year: "2026",
      audio: "/assets/audio/my-love.mp3",
      cover: "/assets/img/covers/my-love.jpg",
      note: "Pop",
      blurb: "Blue lane pop. Clean hook energy, sentimental but disciplined.",
      tags: "blue lane, pop, hook, sweet, clean",
    },
    {
      id: "monkeyman",
      title: "MONKEY MAN",
      lane: "red",
      year: "2026",
      audio: "/assets/audio/monkey-man.mp3",
      cover: "/assets/img/covers/monkey-man.jpg",
      note: "Impact",
      blurb: "Red lane chaos engine. Instinct, punch, playful menace.",
      tags: "red lane, impact, chaos, instinct, punch",
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
  if (v === "iridescent") return "🫧 IRIDESCENT LANE";
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
    sub.textContent = `${laneLabel(track.lane)}, ${track.note}`;
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
            <div class="cardInfoMeta">${laneLabel(track.lane)}, ${track.note}</div>
            ${track.blurb ? `<div class="cardInfoBlurb">${track.blurb}</div>` : ``}
            ${track.tags ? `<div class="cardInfoTags">${track.tags}</div>` : ``}
          </div>
        </div>
      </div>

      <div class="cardTop">
        <div>
          <h3 class="cardTitle" ${opts && opts.anchorId ? `id="${track.id}"` : ``}>${track.title}</h3>
          <div class="cardMeta">${laneLabel(track.lane)}, ${track.note}</div>
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
    const hero = document.querySelector(".heroIntro");

    if (!home || !music || !links) return;

    home.style.display = view === "home" ? "block" : "none";
    music.style.display = view === "music" ? "block" : "none";
    links.style.display = view === "links" ? "block" : "none";

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
    renderLinks();
    renderPress();

    wirePlayButtons(audioEl);
    wireNavigation();

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

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
      year: "2025",
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
      id: "edge",
      title: "EDGE",
      lane: "red",
      year: "2026",
      audio: "/assets/audio/edge.mp3",
      cover: "/assets/img/covers/edge.jpg",
      note: "",
      blurb: "Cold horizon. Pressure held\nBassline and vocal tension\nImpact without panic",
      tags: "bassline and hiphop energy\ndark vocal lift\npressure held at distance\ndramatic edge tension",
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
      id: "flow",
      title: "FLOW",
      lane: "blue",
      year: "2026",
      audio: "/assets/audio/flow.mp3",
      cover: "/assets/img/covers/flow.jpg",
      note: "",
      blurb: "Warm piano house with summer lift\nSoft movement, bright energy\nBeachside flow without friction",
      tags: "warm piano house\nsummer electronic drift\nbeach and sunset energy\nrelaxed melodic flow",
    },
    {
      id: "tempo",
      title: "TEMPO",
      lane: "blue",
      year: "2026",
      audio: "/assets/audio/tempo.mp3",
      cover: "/assets/img/covers/tempo.jpg",
      note: "",
      blurb: "Different clocks. Same pulse\nWarm UK garage tension\nMisalignment without collapse",
      tags: "warm uk garage\nheartbeat motif pressure\nlate night emotional weight\ncontrolled rhythmic tension",
    },
    {
      id: "sidewinder",
      title: "SIDEWINDER",
      lane: "yellow",
      year: "2026",
      audio: "/assets/audio/sidewinder.mp3",
      cover: "/assets/img/covers/sidewinder.jpg",
      note: "",
      blurb: "Wet city streets. Cards face down\nBass moves sideways\nLow ride pressure held tight",
      tags: "uk garage pressure\nsidewinding bass motion\nurban night energy\ntight coiled rhythm",
    },
    {
      id: "apex",
      title: "APEX",
      lane: "red",
      year: "2026",
      audio: "/assets/audio/apex.mp3",
      cover: "/assets/img/covers/apex.jpg",
      note: "",
      blurb: "Stand alone. Full grown\nDominance without noise\nPressure held at the summit",
      tags: "aggressive electronic pressure\nred lane dominance\nsummit energy\ncalm supremacy",
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
      id: "emberremix",
      title: "EMBER (REMIX)",
      lane: "orange",
      year: "2026",
      audio: "/assets/audio/emberremix.mp3",
      cover: "/assets/img/covers/emberremix.jpg",
      note: "",
      blurb: "Reframed warmth. Tension refined\nLow end held in control\nDeliberate pacing and restraint",
      tags: "warm low end control\norange lane restraint\nremix tension shaping\ndeliberate pacing",
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
    { label: "BLACK VAULT", href: "#vault", note: "Collector layer", icon: "vault" }
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
    }
  ];

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
    vault: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l7 3v6c0 5.2-3.4 9.2-7 11c-3.6-1.8-7-5.8-7-11V5l7-3zm0 3.2L7 7.3v3.6c0 3.8 2.3 6.9 5 8.5c2.7-1.6 5-4.7 5-8.5V7.3l-5-2.1zm0 2.3a2.4 2.4 0 0 1 2.4 2.4c0 .9-.5 1.7-1.2 2.1V15h-2.4v-2.9A2.4 2.4 0 0 1 9.6 10A2.4 2.4 0 0 1 12 7.5zm0 1.8a.6.6 0 1 0 0 1.2a.6.6 0 0 0 0-1.2z"/></svg>`
  };

  function iconMarkup(name) {
    const svg = ICONS[name] || "";
    return `<div class="linkIcon" aria-hidden="true">${svg}</div>`;
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
function formatPricePence(pence) {
  if (typeof pence !== "number" || Number.isNaN(pence)) return "";
  return `£${(pence / 100).toFixed(2)}`;
}

function getProductForTrack(trackId) {
  return wmProductMap[trackId] || null;
}

function getDisplayPriceHtml(trackId) {
  if (isProductOwned(trackId)) return "";

  const product = getProductForTrack(trackId);
  if (!product) return "";

  const base = typeof product.base_price_pence === "number" ? product.base_price_pence : null;
  const saleEnabled = !!product.sale_enabled;
  const sale = typeof product.sale_price_pence === "number" ? product.sale_price_pence : null;

  if (saleEnabled && sale !== null) {
    return `
      <span class="cardPriceOld">${formatPricePence(base)}</span>
      <span class="cardPriceNow">${formatPricePence(sale)}</span>
    `;
  }

  return `<span class="cardPriceNow">${formatPricePence(base)}</span>`;
}
async function loadProducts() {
  wmProducts = [];
  wmProductMap = {};

  if (!window.wmSupabase) return;

  const { data, error } = await window.wmSupabase
    .from("products")
    .select("product_code, product_type, slug, title, lane, base_price_pence, sale_price_pence, sale_enabled, sale_group, guest_visible, premium_visible, purchase_grants_premium_mode");

  if (error) {
    console.error("loadProducts failed", error);
    return;
  }

  wmProducts = Array.isArray(data) ? data : [];
  console.log("wmProducts loaded", wmProducts);

  for (const product of wmProducts) {
    if (!product) continue;
    if (product.product_type !== "track") continue;
    if (!product.slug) continue;
    wmProductMap[product.slug] = product;
  }
}

async function loadOwnedEntitlements() {
  wmOwnedProductSlugs = new Set();

  if (!window.wmSupabase) return;
  if (!wmProfile || !wmProfile.id) return;

  const { data, error } = await window.wmSupabase
    .from("entitlements")
    .select(`
      entitlement_type,
      active,
      product:product_id (
        slug
      )
    `)
    .eq("profile_id", wmProfile.id)
    .eq("active", true);

  if (error) {
    console.error("loadOwnedEntitlements failed", error);
    return;
  }

  const rows = Array.isArray(data) ? data : [];

  for (const row of rows) {
    if (!row) continue;
    if (!row.product) continue;
    const slug = row.product.slug;
    if (!slug) continue;
    wmOwnedProductSlugs.add(slug);
  }
}

function isProductOwned(slug) {
  return wmOwnedProductSlugs.has(slug);
}
function getBuyButtonLabel(trackId) {
  return isProductOwned(trackId) ? "Owned" : "Buy";
}

function updateVaultOwnershipUI() {
  const swimBtn = document.getElementById("buySwimBtn");
  const ownedWrap = document.getElementById("vaultOwnedAssets");
  const assetList = document.getElementById("vaultAssetList");

  if (!swimBtn) return;

  const owned = isProductOwned("swim");

  if (owned) {
    swimBtn.textContent = "Unlocked";
    swimBtn.disabled = true;
    swimBtn.setAttribute("aria-disabled", "true");
    swimBtn.classList.add("isOwned");

    if (ownedWrap) ownedWrap.style.display = "block";

    if (assetList) {
      assetList.innerHTML = `
        <div class="vaultOwnedItem">SWIM, high quality digital download</div>
        <div class="vaultOwnedItem">Collector note</div>
        <div class="vaultOwnedItem">Artwork pack</div>
        <div class="vaultOwnedItem">Vault presentation access</div>
      `;
    }

    return;
  }

  swimBtn.textContent = "Unlock SWIM";
  swimBtn.disabled = false;
  swimBtn.removeAttribute("aria-disabled");
  swimBtn.classList.remove("isOwned");

  if (ownedWrap) ownedWrap.style.display = "none";
  if (assetList) assetList.innerHTML = "";
}

async function getOwnedAssetsForTrack(trackId) {
  if (!window.wmSupabase) return [];
  if (!wmProfile || !wmProfile.id) return [];

  const { data, error } = await window.wmSupabase
    .from("entitlement_assets")
    .select(`
      premium_asset:premium_asset_id (
        id,
        asset_key,
        title,
        asset_type,
        storage_path,
        active
      ),
      entitlement:entitlement_id!inner (
        id,
        active,
        profile_id,
        product:product_id!inner (
          slug
        )
      )
    `)
    .eq("entitlement.profile_id", wmProfile.id)
    .eq("entitlement.active", true)
    .eq("entitlement.product.slug", trackId)

  if (error) {
    console.error("getOwnedAssetsForTrack failed", error)
    return []
  }

  const rows = Array.isArray(data) ? data : []

  return rows
    .map(row => row && row.premium_asset ? row.premium_asset : null)
    .filter(asset => asset && asset.active && asset.storage_path)
}

async function getSignedAssetUrl(storagePath) {
  if (!window.wmSupabase || !storagePath) return ""

  const { data, error } = await window.wmSupabase
    .storage
    .from("vault")
    .createSignedUrl(storagePath, 120)

  if (error) {
    console.error("getSignedAssetUrl failed", error)
    return ""
  }

  return data && data.signedUrl ? data.signedUrl : ""
}

async function downloadOwnedTrackAssets(trackId) {
  if (!isProductOwned(trackId)) {
    alert("This track is not marked as owned")
    return
  }

  const assets = await getOwnedAssetsForTrack(trackId)

  if (!assets.length) {
    console.error("No assets returned for", trackId)
    alert(`No assets found for ${trackId.toUpperCase()} yet`)
    return
  }

  let started = 0

  for (const asset of assets) {
    const url = await getSignedAssetUrl(asset.storage_path)

    if (!url) {
      console.error("No signed URL for asset", asset)
      continue
    }

    const a = document.createElement("a")
    a.href = url
    a.download = ""
    a.target = "_blank"
    a.rel = "noopener"
    document.body.appendChild(a)
    a.click()
    a.remove()

    started += 1

    await new Promise(resolve => setTimeout(resolve, 250))
  }

  if (!started) {
    alert(`Download links could not be created for ${trackId.toUpperCase()}`)
  }
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
let vaultTimer = null;
let wmProfile = null;
let wmProducts = [];
let wmProductMap = {};
let wmOwnedProductSlugs = new Set();

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
      if (shuffleOn) {
        playTrackById(pickNextTrackId());
      } else {
        playTrackById(TRACKS[0].id);
      }
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
  const owned = isProductOwned(track.id);

  return `
    <div class="cardImg">
      ${imgTag(track, !!(opts && opts.eagerImage))}
      <div class="cardInfo">
        <div class="cardInfoInner">
<div class="cardInfoTitle">${track.title}</div>
<div class="cardInfoMeta">
  ${laneLabel(track.lane)}${track.note ? `, ${track.note}` : ``}
  ${owned ? `, from your collection` : ``}
</div>
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
<button class="btn buyBtn ${owned ? "isOwned" : ""}" type="button" data-buy="${track.id}" ${owned ? "disabled aria-disabled=\"true\"" : ""}>${getBuyButtonLabel(track.id)}</button> 
${owned ? `<button class="btn" type="button" data-download="${track.id}">Download</button>` : ``}
  <div class="cardPrice">${getDisplayPriceHtml(track.id)}</div>
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
    card.className = `card${isProductOwned(track.id) ? " isOwned" : ""}`;
    card.innerHTML = cardMarkup(track, {
      eagerImage: i < 3,
      anchorId: false
    });
    mount.appendChild(card);
  }
}



function applyMusicViewState() {
  const musicList = document.getElementById("wmMusicList")
  if (!musicList) return

  musicList.classList.remove("wm-music-guest", "wm-music-member", "wm-music-premium")

  if (hasPremiumAccess()) {
    musicList.classList.add("wm-music-premium")
    return
  }

  const state = wmProfile && wmProfile.account_state ? wmProfile.account_state : "guest"

  if (state === "member") {
    musicList.classList.add("wm-music-member")
    return
  }

  musicList.classList.add("wm-music-guest")
}


  
function renderMusicList() {
  const mount = document.getElementById("wmMusicList");
  if (!mount) return;

  mount.innerHTML = "";

  for (let i = 0; i < TRACKS.length; i++) {
    const track = TRACKS[i];
    const row = document.createElement("div");
    row.className = `card${isProductOwned(track.id) ? " isOwned" : ""}`;
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
      const isInternalVault = item.href === "#vault" || item.href === "/#vault";
      const vaultLocked = isInternalVault && !canAccessVault();
      
      a.className = "linkCard";
      a.href = vaultLocked ? "#" : item.href;

      if (!isInternalVault) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }

      a.innerHTML = `
  <div class="linkCardTop">
    <div style="display:flex; align-items:center; gap:10px;">
      ${iconMarkup(item.icon)}
      <div class="linkCardTitle">${item.label}</div>
    </div>
    <div class="linkCardBadge">${isInternalVault ? (vaultLocked ? "Login" : "Enter") : "Open"}</div>
  </div>
  <div class="linkCardNote">${item.note || ""}</div>
  <div class="linkCardUrl">${isInternalVault ? (vaultLocked ? "Login required" : "Private collector layer") : item.href}</div>
`;

      mount.appendChild(a);
    }
  }

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

function wireBuyButtons() {
  document.addEventListener("click", function (e) {
    const btn = e.target.closest("[data-buy]")
    if (!btn) return

    const trackId = btn.getAttribute("data-buy")
    if (!trackId) return
    if (isProductOwned(trackId)) return

    const product = getProductForTrack(trackId)

    if (!canAccessVault()) {
      const authModal = document.getElementById("wmAuthModal")
      const loginForm = document.getElementById("wmLoginForm")
      const signupForm = document.getElementById("wmSignupForm")
      const authTitle = document.getElementById("wmAuthTitle")
      const authSubtitle = document.getElementById("wmAuthSubtitle")
      const authMessage = document.getElementById("wmAuthMessage")
      const showLoginBtn = document.getElementById("wmShowLoginBtn")
      const showSignupBtn = document.getElementById("wmShowSignupBtn")

      if (authModal) authModal.style.display = "block"
      if (loginForm) loginForm.style.display = "none"
      if (signupForm) signupForm.style.display = "flex"
      if (authTitle) authTitle.textContent = "Create account"
      if (authSubtitle) authSubtitle.textContent = "Sign up to unlock member access"
      if (authMessage) authMessage.textContent = ""
      if (showLoginBtn) showLoginBtn.classList.remove("isActive")
      if (showSignupBtn) showSignupBtn.classList.add("isActive")

      return
    }

    location.hash = "vault"
  })
}

function wireDownloadButtons() {
  document.addEventListener("click", function (e) {
    const btn = e.target.closest("[data-download]")
    if (!btn) return

    const trackId = btn.getAttribute("data-download")
    if (!trackId) return

    downloadOwnedTrackAssets(trackId)
  })
}
  

function switchView(view) {
  const home = document.getElementById("homeView");
  const music = document.getElementById("musicView");
  const links = document.getElementById("linksView");
  const vault = document.getElementById("vaultView");
  const games = document.getElementById("gamesView");
  const hero = document.querySelector(".heroIntro");

  if (!home || !music || !links || !vault || !games) return;

  home.style.display = view === "home" ? "block" : "none";
  music.style.display = view === "music" ? "block" : "none";
  links.style.display = view === "links" ? "block" : "none";
  vault.style.display = view === "vault" ? "block" : "none";
  games.style.display = view === "games" ? "block" : "none";

  if (hero) hero.style.display = view === "home" ? "block" : "none";

  setActiveNav(view === "vault" ? "links" : view);

  if (view === "games" && wmAudio && !wmAudio.currentSrc) {
    playNext();
  }

  if (view === "vault") {
    startVaultCountdown();
    requestAnimationFrame(function () {
      window.scrollTo({ top: 0, behavior: "instant" });
    });
  } else {
    stopVaultCountdown();
  }
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

    if (raw === "music") return { view: "music", scrollId: "" };
    if (raw.startsWith("music#")) return { view: "music", scrollId: raw.split("#")[1] || "" };
    if (raw === "links") return { view: "links", scrollId: "" };
    if (raw === "vault") return { view: "vault", scrollId: "" };
    if (raw === "games") return { view: "games", scrollId: "" };

    return { view: "home", scrollId: "" };
  }

  function applyRoute() {
  const route = parseHash()

  if (route.view === "vault" && !canAccessVault()) {
    location.hash = "links"

    const authModal = document.getElementById("wmAuthModal")
    const loginForm = document.getElementById("wmLoginForm")
    const signupForm = document.getElementById("wmSignupForm")
    const authTitle = document.getElementById("wmAuthTitle")
    const authSubtitle = document.getElementById("wmAuthSubtitle")
    const authMessage = document.getElementById("wmAuthMessage")
    const showLoginBtn = document.getElementById("wmShowLoginBtn")
    const showSignupBtn = document.getElementById("wmShowSignupBtn")

    if (authModal) authModal.style.display = "block"
    if (loginForm) loginForm.style.display = "none"
    if (signupForm) signupForm.style.display = "flex"
    if (authTitle) authTitle.textContent = "Create account"
    if (authSubtitle) authSubtitle.textContent = "Sign up to unlock member access"
    if (authMessage) authMessage.textContent = ""
    if (showLoginBtn) showLoginBtn.classList.remove("isActive")
    if (showSignupBtn) showSignupBtn.classList.add("isActive")

    return
  }

  switchView(route.view)

  if (route.scrollId) {
    requestAnimationFrame(function () {
      const target = document.getElementById(route.scrollId)
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    })
  }
}

function canAccessVault() {
  const state = wmProfile && wmProfile.account_state ? wmProfile.account_state : "guest"
  return state === "member" || hasPremiumAccess()
}

  
  function wireNavigation() {
    document.addEventListener("click", function (e) {

      const vaultLink = e.target.closest(".linkCard[href='#']")
if (vaultLink) {
  e.preventDefault()

const authModal = document.getElementById("wmAuthModal")
const loginForm = document.getElementById("wmLoginForm")
const signupForm = document.getElementById("wmSignupForm")
const authTitle = document.getElementById("wmAuthTitle")
const authSubtitle = document.getElementById("wmAuthSubtitle")
const authMessage = document.getElementById("wmAuthMessage")
const showLoginBtn = document.getElementById("wmShowLoginBtn")
const showSignupBtn = document.getElementById("wmShowSignupBtn")

if (authModal) authModal.style.display = "block"
if (loginForm) loginForm.style.display = "none"
if (signupForm) signupForm.style.display = "flex"
if (authTitle) authTitle.textContent = "Create account"
if (authSubtitle) authSubtitle.textContent = "Sign up to unlock member access"
if (authMessage) authMessage.textContent = ""
if (showLoginBtn) showLoginBtn.classList.remove("isActive")
if (showSignupBtn) showSignupBtn.classList.add("isActive")

return
}
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

      if (view === "home") {
        location.hash = "";
      }
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

  function pad2(n) {
    return String(n).padStart(2, "0");
  }

  function updateVaultCountdown() {
    const countdown = document.getElementById("vaultCountdown");
    if (!countdown) return;

    const endRaw = countdown.getAttribute("data-end");
    if (!endRaw) return;

    const end = new Date(endRaw).getTime();
    const now = Date.now();
    const diff = Math.max(0, end - now);

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    const daysEl = document.getElementById("vaultDays");
    const hoursEl = document.getElementById("vaultHours");
    const minutesEl = document.getElementById("vaultMinutes");
    const secondsEl = document.getElementById("vaultSeconds");

    if (daysEl) daysEl.textContent = pad2(days);
    if (hoursEl) hoursEl.textContent = pad2(hours);
    if (minutesEl) minutesEl.textContent = pad2(minutes);
    if (secondsEl) secondsEl.textContent = pad2(seconds);
  }

  function startVaultCountdown() {
    updateVaultCountdown();
    stopVaultCountdown();
    vaultTimer = setInterval(updateVaultCountdown, 1000);
  }

  function stopVaultCountdown() {
    if (vaultTimer) {
      clearInterval(vaultTimer);
      vaultTimer = null;
    }
  }

function wireVaultButtons() {
  const swimBtn = document.getElementById("buySwimBtn");
  const bundleBtn = document.getElementById("buyBundleBtn");

  if (swimBtn) {
    swimBtn.addEventListener("click", function () {
      if (isProductOwned("swim")) return;
      alert("SWIM checkout wiring is the next step");
    });
  }

  if (bundleBtn) {
    bundleBtn.addEventListener("click", function () {
      alert("Bundle checkout wiring is the next step");
    });
  }
}
  function clamp(n, a, b) {
    return Math.max(a, Math.min(b, n));
  }

  function ensureGameStyles() {
    if (document.getElementById("wmGameStyles")) return;
    const style = document.createElement("style");
    style.id = "wmGameStyles";
    style.textContent = `
      .wmGameWrap{
        border:1px solid rgba(255,255,255,0.12);
        border-radius:20px;
        background:rgba(14,15,22,0.50);
        padding:14px;
        box-shadow:0 10px 30px rgba(0,0,0,0.28);
      }
      .wmGameWrap.wmGameFull{
        grid-column: 1 / -1;
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
        height:260px;
        border-radius:16px;
        border:1px solid rgba(255,255,255,0.12);
        overflow:hidden;
        background:
          radial-gradient(600px 240px at 20% 20%, rgba(255,43,214,0.16), transparent 60%),
          radial-gradient(540px 240px at 80% 30%, rgba(0,229,255,0.14), transparent 60%),
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
        inset:-10px;
        border-radius:999px;
        background:radial-gradient(circle at 50% 50%, rgba(255,43,214,0.26), transparent 55%);
        opacity:0.65;
        filter:blur(1px);
        animation:wmPulse 0.9s ease-in-out infinite;
        pointer-events:none;
      }
      @keyframes wmPulse{
        0%{ transform:scale(0.90); opacity:0.45; }
        50%{ transform:scale(1.08); opacity:0.85; }
        100%{ transform:scale(0.90); opacity:0.45; }
      }
      .wmSpark{
        position:absolute;
        width:6px;
        height:6px;
        border-radius:999px;
        background:rgba(0,229,255,0.9);
        pointer-events:none;
        animation:wmSpark 0.55s ease-out forwards;
      }
      @keyframes wmSpark{
        0%{ transform:translate(0,0) scale(1); opacity:1; }
        100%{ transform:translate(var(--dx), var(--dy)) scale(0.2); opacity:0; }
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
      .wmTiny{
        font-size:12px;
        color:rgba(166,168,179,0.95);
        line-height:1.35;
      }
      .wmEmbedFrame{
        border-radius:16px;
        border:1px solid rgba(255,255,255,0.12);
        overflow:hidden;
        background:rgba(0,0,0,0.20);
      }
      .wmEmbedFrame iframe{
        width:100%;
        height:620px;
        display:block;
        border:0;
      }
    `;
    document.head.appendChild(style);
  }

  let activeGame = "";
  let memState = null;
  let reactState = null;
  let curveState = null;

  function renderGames() {
    const mount = document.getElementById("wmGames");
    if (!mount) return;

    ensureGameStyles();

    mount.innerHTML = `
      <div class="wmGameWrap wmGameFull">
        <div class="wmGameHead">
          <div>
            <h3 class="wmGameTitle">WAMSMASH</h3>
          </div>
          <div class="wmGameRow">
            <a class="btn btnPrimary" href="/game/" target="_blank" rel="noopener">Full Screen</a>
          </div>
        </div>

        <div class="wmEmbedFrame">
          <iframe
            src="/game/"
            title="WAMSMASH"
            loading="lazy"
            scrolling="no"
          ></iframe>
        </div>
      </div>

      <div class="wmGameWrap">
        <div class="wmGameHead">
          <div>
            <h3 class="wmGameTitle">Covers</h3>
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

      <div class="wmGameWrap">
        <div class="wmGameHead">
          <div>
            <h3 class="wmGameTitle">Keepie Uppie</h3>
          </div>
          <div class="wmGameRow">
            <button class="btn btnPrimary" type="button" data-game="curve">Play</button>
            <button class="btn" type="button" data-game="curve-reset">Reset</button>
          </div>
        </div>
        <div id="wmGameCurve"></div>
      </div>
    `;

    initMemory(true);
    initReaction(true);
    initCurve(true);
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

    if (!silent) activeGame = "memory";
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

  function initReaction(silent) {
    const mount = document.getElementById("wmGameReaction");
    if (!mount) return;

    reactState = {
      running: false,
      score: 0,
      hits: 0
    };

    mount.innerHTML = `
      <div class="wmTiny" style="margin-bottom:10px;">
        Score: <span id="wmReactScore">0</span>
        <span style="margin-left:10px;">Hits: <span id="wmReactHits">0</span></span>
      </div>
      <div class="wmReactArena" id="wmReactArena"></div>
    `;

    if (!silent) activeGame = "reaction";
  }

  function spawnReactionTarget() {
    const arena = document.getElementById("wmReactArena");
    const scoreEl = document.getElementById("wmReactScore");
    const hitsEl = document.getElementById("wmReactHits");
    if (!arena || !scoreEl || !hitsEl) return;

    arena.innerHTML = "";

    const w = arena.clientWidth;
    const h = arena.clientHeight;

    const x = Math.floor(Math.random() * Math.max(1, w - 56));
    const y = Math.floor(Math.random() * Math.max(1, h - 56));

    const t = document.createElement("button");
    t.type = "button";
    t.className = "wmReactTarget";
    t.style.left = `${x}px`;
    t.style.top = `${y}px`;

    const born = performance.now();

    t.addEventListener("click", function () {
      if (!reactState || !reactState.running) return;

      const now = performance.now();
      const dt = clamp(now - born, 40, 1800);
      const pts = Math.floor(1200 / dt * 100);

      reactState.score += pts;
      reactState.hits += 1;

      scoreEl.textContent = String(reactState.score);
      hitsEl.textContent = String(reactState.hits);

      spawnSparks(arena, x + 28, y + 28);
      spawnReactionTarget();
    });

    arena.appendChild(t);
  }

  function spawnSparks(root, cx, cy) {
    const count = 12;
    for (let i = 0; i < count; i++) {
      const s = document.createElement("div");
      s.className = "wmSpark";
      s.style.left = `${cx}px`;
      s.style.top = `${cy}px`;

      const ang = Math.random() * Math.PI * 2;
      const mag = 22 + Math.random() * 34;
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

  function startReaction() {
    if (!reactState) return;
    reactState.running = true;
    spawnReactionTarget();
  }

  function initCurve(silent) {
    const mount = document.getElementById("wmGameCurve");
    if (!mount) return;

    mount.innerHTML = `
      <div class="wmCanvasWrap">
        <canvas id="wmCurveCanvas" width="720" height="360"></canvas>
      </div>
    `;

    const canvas = document.getElementById("wmCurveCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    curveState = {
      canvas,
      ctx,
      running: false,
      paddleX: 360,
      paddleVX: 0,
      lastPaddleX: 360,
      ballX: 360,
      ballY: 180,
      ballVX: 3.2,
      ballVY: 2.6,
      speedMul: 1,
      radius: 10,
      paddleW: 120,
      paddleH: 14,
      paddleY: 330,
      score: 0,
      lastT: 0
    };

    function setPaddleX(px) {
      const nx = clamp(px, curveState.paddleW * 0.5, canvas.width - curveState.paddleW * 0.5);
      curveState.paddleX = nx;
    }

    canvas.addEventListener("mousemove", function (e) {
      const r = canvas.getBoundingClientRect();
      const px = (e.clientX - r.left) * (canvas.width / r.width);
      setPaddleX(px);
    });

    canvas.addEventListener("touchmove", function (e) {
      if (!e.touches || !e.touches.length) return;
      const r = canvas.getBoundingClientRect();
      const px = (e.touches[0].clientX - r.left) * (canvas.width / r.width);
      setPaddleX(px);
      e.preventDefault();
    }, { passive: false });

    function draw() {
      const s = curveState;
      const g = s.ctx;

      g.clearRect(0, 0, canvas.width, canvas.height);

      g.fillStyle = "rgba(0,0,0,0.25)";
      g.fillRect(0, 0, canvas.width, canvas.height);

      g.fillStyle = "rgba(242,243,247,0.9)";
      g.font = "44px system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif";
      g.fillText(String(s.score), 18, 56);

      g.fillStyle = "rgba(255,255,255,0.10)";
      for (let i = 0; i < 24; i++) {
        const x = (i * 31 + 17) % canvas.width;
        const y = (i * 19 + 33) % canvas.height;
        g.beginPath();
        g.arc(x, y, 2.2, 0, Math.PI * 2);
        g.fill();
      }

      g.fillStyle = "rgba(255,255,255,0.85)";
      g.fillRect(s.paddleX - s.paddleW / 2, s.paddleY, s.paddleW, s.paddleH);

      g.beginPath();
      g.arc(s.ballX, s.ballY, s.radius, 0, Math.PI * 2);
      g.fill();
    }

    function step(t) {
      const s = curveState;
      if (!s.running) return;

      const dt = s.lastT ? clamp((t - s.lastT) / 16.666, 0.6, 1.6) : 1;
      s.lastT = t;

      const px = s.paddleX;
      s.paddleVX = px - s.lastPaddleX;
      s.lastPaddleX = px;

      s.ballX += s.ballVX * dt;
      s.ballY += s.ballVY * dt;

      if (s.ballX < s.radius) {
        s.ballX = s.radius;
        s.ballVX *= -1;
      }
      if (s.ballX > s.canvas.width - s.radius) {
        s.ballX = s.canvas.width - s.radius;
        s.ballVX *= -1;
      }
      if (s.ballY < s.radius) {
        s.ballY = s.radius;
        s.ballVY *= -1;
      }

      const paddleTop = s.paddleY;
      const paddleLeft = s.paddleX - s.paddleW / 2;
      const paddleRight = s.paddleX + s.paddleW / 2;

      const hitY = s.ballY + s.radius >= paddleTop && s.ballY + s.radius <= paddleTop + s.paddleH;
      const hitX = s.ballX >= paddleLeft && s.ballX <= paddleRight;

      if (hitY && hitX && s.ballVY > 0) {
        const rel = (s.ballX - s.paddleX) / (s.paddleW / 2);
        s.ballVY = -Math.abs(s.ballVY) * 1.02;
        s.ballVX += rel * 1.8;

        const curve = clamp(s.paddleVX / 18, -1.2, 1.2);
        s.ballVX += curve * 1.6;

        s.score += 1;
        s.speedMul *= 1.02;
        s.ballVX *= 1.02;
        s.ballVY *= 1.02;
      }

      if (s.ballY > s.canvas.height + 40) {
        s.running = false;
      }

      draw();
      requestAnimationFrame(step);
    }

    function serveNow() {
      const s = curveState;
      s.ballX = s.canvas.width / 2;
      s.ballY = s.canvas.height / 2;
      s.ballVX = 3.2 * (Math.random() < 0.5 ? -1 : 1);
      s.ballVY = 2.6;
      s.speedMul = 1;
      s.score = 0;
      s.lastT = 0;
      s.running = true;
      requestAnimationFrame(step);
    }

    canvas.addEventListener("click", function () {
      if (!curveState) return;
      if (!curveState.running) serveNow();
    });

    draw();

    if (!silent) {
      activeGame = "curve";
      serveNow();
    }
  }

  function wireGamesControls() {
    document.addEventListener("click", function (e) {
      const btn = e.target.closest("[data-game]");
      if (!btn) return;

      const key = btn.getAttribute("data-game");
      if (!key) return;

      if (key === "memory") {
        initMemory(false);
        return;
      }
      if (key === "memory-reset") {
        initMemory(true);
        return;
      }
      if (key === "reaction") {
        initReaction(false);
        startReaction();
        return;
      }
      if (key === "reaction-reset") {
        initReaction(true);
        return;
      }
      if (key === "curve") {
        initCurve(false);
        return;
      }
      if (key === "curve-reset") {
        initCurve(true);
        return;
      }
    });

    document.addEventListener("click", function (e) {
      const card = e.target.closest(".wmMemCard");
      if (!card) return;
      const idxRaw = card.getAttribute("data-idx");
      const idx = idxRaw ? parseInt(idxRaw, 10) : -1;
      if (idx >= 0) memFlip(idx);
    });
  }

function wireAuthButtons() {
const loginBtn = document.getElementById("wmLoginBtn")
const signupBtn = document.getElementById("wmSignupBtn")
const memberBadge = document.getElementById("wmMemberBadge")
const logoutBtn = document.getElementById("wmLogoutBtn")

  const authModal = document.getElementById("wmAuthModal")
  const authCloseBtn = document.getElementById("wmAuthCloseBtn")
  const showLoginBtn = document.getElementById("wmShowLoginBtn")
  const showSignupBtn = document.getElementById("wmShowSignupBtn")
  const loginForm = document.getElementById("wmLoginForm")
  const signupForm = document.getElementById("wmSignupForm")
  const authTitle = document.getElementById("wmAuthTitle")
  const authSubtitle = document.getElementById("wmAuthSubtitle")
  const authMessage = document.getElementById("wmAuthMessage")
  const loginEmail = document.getElementById("wmLoginEmail")
  const loginPassword = document.getElementById("wmLoginPassword")
  const signupEmail = document.getElementById("wmSignupEmail")
  const signupPassword = document.getElementById("wmSignupPassword")

  
  function clearMessage() {
    if (authMessage) authMessage.textContent = ""
  }

  function showLoginMode() {
    
    if (loginForm) loginForm.style.display = "flex"
    if (signupForm) signupForm.style.display = "none"
    if (authTitle) authTitle.textContent = "Account access"
    if (authSubtitle) authSubtitle.textContent = "Login to your account"
    setAuthTab("login")
    clearMessage()
  }
function setAuthTab(mode) {
  if (showLoginBtn) showLoginBtn.classList.toggle("isActive", mode === "login")
  if (showSignupBtn) showSignupBtn.classList.toggle("isActive", mode === "signup")
}
  function showSignupMode() {
    if (loginForm) loginForm.style.display = "none"
    if (signupForm) signupForm.style.display = "flex"
    if (authTitle) authTitle.textContent = "Create account"
    if (authSubtitle) authSubtitle.textContent = "Sign up to unlock member access"
    setAuthTab("signup")
    clearMessage()
  }

  function openModal(mode) {
    if (!authModal) return
    authModal.style.display = "block"
    if (mode === "signup") showSignupMode()
    else showLoginMode()
  }

  function closeModal() {
    if (!authModal) return
    authModal.style.display = "none"
    clearMessage()
  }

  if (loginBtn) {
    loginBtn.addEventListener("click", function () {
      openModal("login")
    })
  }

  if (signupBtn) {
    signupBtn.addEventListener("click", function () {
      openModal("signup")
    })
  }

  if (showLoginBtn) {
    showLoginBtn.addEventListener("click", function () {
      showLoginMode()
    })
  }

  if (showSignupBtn) {
    showSignupBtn.addEventListener("click", function () {
      showSignupMode()
    })
  }

  if (authCloseBtn) {
    authCloseBtn.addEventListener("click", closeModal)
  }

  document.addEventListener("click", function (e) {
    const closeTarget = e.target.closest("[data-auth-close='true']")
    if (closeTarget) closeModal()
  })

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal()
  })

if (signupForm) {
  signupForm.addEventListener("submit", async function (e) {
    e.preventDefault()
    clearMessage()

    if (!window.wmSupabase) {
      if (authMessage) authMessage.textContent = "Supabase not available"
      return
    }

    const email = signupEmail ? signupEmail.value.trim() : ""
    const password = signupPassword ? signupPassword.value : ""

    const { error } = await window.wmSupabase.auth.signUp({
      email,
      password
    })

    if (error) {
      if (authMessage) authMessage.textContent = error.message
      return
    }

    if (authMessage) authMessage.textContent = "Account created, check your email if confirmation is enabled"
  })
}

if (loginForm) {
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault()
    clearMessage()

    if (!window.wmSupabase) {
      if (authMessage) authMessage.textContent = "Supabase not available"
      return
    }

    const email = loginEmail ? loginEmail.value.trim() : ""
    const password = loginPassword ? loginPassword.value : ""

    const { error } = await window.wmSupabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      if (authMessage) authMessage.textContent = error.message
      return
    }

    location.reload()
  })
}

  
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async function () {
      if (!window.wmSupabase) return
      await window.wmSupabase.auth.signOut()
      location.reload()
    })
  }
}

async function loadProfile() {
  wmProfile = null

  if (!window.wmSupabase) return null

  const { data: sessionData, error: sessionError } = await window.wmSupabase.auth.getSession()
  if (sessionError) return null
  if (!sessionData || !sessionData.session || !sessionData.session.user) return null

  const user = sessionData.session.user

  const { data, error } = await window.wmSupabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  if (error) {
    console.error("loadProfile failed", error)
    return null
  }

  wmProfile = data
console.log("wmProfile loaded", wmProfile)
return data
}
  

  async function ensureProfile() {
  if (!window.wmSupabase) return

  const { data: sessionData, error: sessionError } = await window.wmSupabase.auth.getSession()
  if (sessionError) return
  if (!sessionData || !sessionData.session || !sessionData.session.user) return

  const user = sessionData.session.user
  const email = user.email || ""

  const { error } = await window.wmSupabase
    .from("profiles")
    .upsert(
      {
  id: user.id,
  email: email,
  account_state: "member",
  premium_unlocked: false
},
      { onConflict: "id" }
    )

  if (error) {
    console.error("ensureProfile failed", error)
  }
}
async function syncAuthUI() {
  const loginBtn = document.getElementById("wmLoginBtn")
  const signupBtn = document.getElementById("wmSignupBtn")
  const memberBadge = document.getElementById("wmMemberBadge")
  const logoutBtn = document.getElementById("wmLogoutBtn")

  if (!window.wmSupabase) return

  const { data, error } = await window.wmSupabase.auth.getSession()
  if (error) return

  const hasSession = !!(data && data.session)

  if (loginBtn) loginBtn.style.display = hasSession ? "none" : ""
  if (signupBtn) signupBtn.style.display = hasSession ? "none" : ""
  if (logoutBtn) logoutBtn.style.display = hasSession ? "" : "none"

  if (memberBadge) {
    memberBadge.style.display = hasSession ? "flex" : "none"

    if (hasSession) {
      const isPremium = hasPremiumAccess()
      memberBadge.textContent = isPremium ? "Black Vault" : "Member"
    } else {
      memberBadge.textContent = "Member"
    }
  }
}

function hasPremiumAccess() {
  return !!(wmProfile && wmProfile.premium_unlocked)
}

  
function applyAccountStateUI() {
  document.body.classList.remove("wm-state-guest", "wm-state-member", "wm-state-premium")

  const state = wmProfile && wmProfile.account_state ? wmProfile.account_state : "guest"
  const premiumUnlocked = hasPremiumAccess()

  if (premiumUnlocked) {
    document.body.classList.add("wm-state-premium")
    return
  }

  if (state === "member") {
    document.body.classList.add("wm-state-member")
    return
  }

  document.body.classList.add("wm-state-guest")
}
  

  
  function init() {
    createPlayerBar();

    wmAudio = $("#wmAudio");
    hardenAudioElement(wmAudio);

    clearState();
wireAudioPersistence(wmAudio);
wirePlayButtons(wmAudio);
wireBuyButtons();
wireDownloadButtons();
wireNavigation();
    wirePlayerControls();
    wireGamesControls();
    wireVaultButtons();
    wireAuthButtons();
    
loadProducts().then(function () {
  renderFeaturedGrid()
  renderMusicList()
  renderLinks()
  renderPress()
  renderGames()

  window.addEventListener("hashchange", applyRoute)

  return ensureProfile()
}).then(function () {
  return loadProfile()
}).then(function () {
  applyRoute()
  return loadOwnedEntitlements()
}).then(function () {
  applyAccountStateUI()
  applyMusicViewState()
  renderMusicList()
  renderFeaturedGrid()
  renderLinks()
  updateVaultOwnershipUI()
  return syncAuthUI()
})

setNowPlayingUI(null)

    
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

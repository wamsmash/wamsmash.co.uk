(() => {
const SUPABASE_URL = "https://fkqachwvdeswollxgobd.supabase.co"
const SUPABASE_KEY = "sb_publishable_5N68Cgko4Dbt5QKqwDbIEw_-4tU_kea"

  const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)

  // ============================================================
  // BOOTSTRAP
  // ============================================================
  const canvas = document.getElementById("game")
  const g = canvas.getContext("2d")

  const nameModal = document.getElementById("nameModal")
  const initialsInput = document.getElementById("initials")
  const saveBtn = document.getElementById("saveScore")

  const W = canvas.width
  const H = canvas.height

  // ============================================================
  // AUDIO
  // ============================================================
  function makeSfx(src, volume) {
    const a = new Audio(src)
    a.preload = "auto"
    a.volume = volume
    return a
  }

const sfx = {
  level: makeSfx("/game/ESMlvl.mp3", 0.55),
  coin: makeSfx("/game/ESMcoin.mp3", 0.1125),
  pop: makeSfx("/game/pop.mp3", 0.55),
  bad: makeSfx("/game/bad.mp3", 0.60),
  gameover: makeSfx("/game/gameover.mp3", 0.1125)
}

  function playSfx(audio, overlap) {
    try {
      if (overlap) {
        const a = new Audio(audio.src)
        a.volume = audio.volume
        a.play().catch(() => {})
        return
      }

      audio.currentTime = 0
      audio.play().catch(() => {})
    } catch (e) {}
  }

  function playLevelSfx() {
    playSfx(sfx.level, true)
  }

  function playCoinSfx() {
    playSfx(sfx.coin, true)
  }

  function playPopSfx() {
    playSfx(sfx.pop, true)
  }

  function playBadSfx() {
    playSfx(sfx.bad, false)
  }

  function playGameOverSfx() {
    playSfx(sfx.gameover, false)
  }

  const LB_KEY = "wamsmash_runner_lb_v3"

  const SPEED_MUL = 1.20
  const MAX_SPARKS = 900
  const MAX_SMOKE = 260
  const MAX_REDBALLS = 1400
  const REDBALLS_BURST = 330

  // ============================================================
  // LANE GEOMETRY
  // ============================================================
  const lanes = {
    topY: Math.floor(H * 0.62),
    botY: Math.floor(H * 0.84),
    thickness: 6
  }

  // ============================================================
  // SMALL MATH HELPERS
  // ============================================================
  function clamp(n, a, b) { return Math.max(a, Math.min(b, n)) }
  function rand(a, b) { return a + Math.random() * (b - a) }

  // ============================================================
  // LOCAL STORAGE HELPERS
  // ============================================================
  function safeReadJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key)
      if (!raw) return fallback
      return JSON.parse(raw)
    } catch (e) {
      try { localStorage.removeItem(key) } catch (e2) {}
      return fallback
    }
  }

  function safeWriteJson(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (e) {
      return false
    }
  }

  // ============================================================
  // LANE POSITION LOOKUP
  // ============================================================
  function laneY(lane) {
    return lane === "top" ? lanes.topY : lanes.botY
  }

  // ============================================================
  // SEEDED RNG
  // ============================================================
  function mulberry32(seed) {
    return function () {
      let t = seed += 0x6D2B79F5
      t = Math.imul(t ^ (t >>> 15), t | 1)
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
  }

  // ============================================================
  // UI FX BUFFERS
  // ============================================================
  const ui = {
    floatTexts: [],
    bankCoins: [],
    smoke: [],
    sparks: [],
    flash: 0,
    introT: 0,
    thankYouBreath: 0,
    redBalls: []
  }

  // ============================================================
  // UI FX HELPERS
  // ============================================================
  function addFloatText(text, x, y, kind) {
    ui.floatTexts.push({
      text,
      x,
      y,
      vy: -38,
      t: 0,
      life: 0.9,
      kind: kind || "green"
    })
  }

  function addBankCoin(x, y, tint) {
    ui.bankCoins.push({
      x,
      y,
      tx: 122,
      ty: 54,
      t: 0,
      life: 0.55,
      tint: tint || [0, 229, 255]
    })
  }

  function spawnSmoke(cx, cy, strength, kind) {
    const want = 10 + Math.floor(strength * 8)
    const room = MAX_SMOKE - ui.smoke.length
    if (room <= 0) return
    const n = Math.min(want, room)

    for (let i = 0; i < n; i++) {
      ui.smoke.push({
        x: cx + rand(-8, 8),
        y: cy + rand(-4, 4),
        vx: rand(-40, 40) - strength * 10,
        vy: rand(-90, -30) - strength * 40,
        r: rand(6, 13) + strength * 3,
        t: 0,
        life: rand(0.35, 0.55),
        kind: kind || "green"
      })
    }
  }

  function spawnSparks(cx, cy, tint, amount) {
    const col = tint || [255, 220, 80]
    let n = amount || 22

    const room = MAX_SPARKS - ui.sparks.length
    if (room <= 0) return
    if (n > room) n = room

    for (let i = 0; i < n; i++) {
      ui.sparks.push({
        x: cx,
        y: cy,
        vx: rand(-260, 260),
        vy: rand(-320, 40),
        t: 0,
        life: rand(0.35, 0.60),
        r: rand(2, 4),
        col
      })
    }
  }

  function spawnRedBalls(cx, cy, count) {
    let n = count || 420
    const room = MAX_REDBALLS - ui.redBalls.length
    if (room <= 0) return
    if (n > room) n = room

    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2
      const sp = 320 + Math.random() * 980

      ui.redBalls.push({
        x: cx,
        y: cy,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp - (200 + Math.random() * 500),
        r: 2 + Math.random() * 3.5,
        t: 0,
        life: 2.6 + Math.random() * 1.4
      })
    }
  }

  function updateRedBalls(dt) {
    for (const b of ui.redBalls) {
      b.t += dt
      b.vy += 1200 * dt
      b.x += b.vx * dt
      b.y += b.vy * dt
      b.vx *= 0.992

      if (b.x < 0) { b.x = 0; b.vx = Math.abs(b.vx) * 0.78 }
      if (b.x > W) { b.x = W; b.vx = -Math.abs(b.vx) * 0.78 }

      if (b.y < 0) { b.y = 0; b.vy = Math.abs(b.vy) * 0.72 }
      if (b.y > H) { b.y = H; b.vy = -Math.abs(b.vy) * 0.64; b.vx *= 0.86 }
    }

    ui.redBalls = ui.redBalls.filter(b => b.t < b.life)
  }

  function drawRedBalls() {
    for (const b of ui.redBalls) {
      const a = 1 - (b.t / b.life)
      g.globalAlpha = a

      const grad = g.createRadialGradient(b.x, b.y, 1, b.x, b.y, 18)
      grad.addColorStop(0, "rgba(255,60,90,0.22)")
      grad.addColorStop(1, "rgba(0,0,0,0)")
      g.fillStyle = grad
      g.beginPath()
      g.arc(b.x, b.y, 18, 0, Math.PI * 2)
      g.fill()

      g.fillStyle = "rgba(255,60,90,0.92)"
      g.beginPath()
      g.arc(b.x, b.y, b.r, 0, Math.PI * 2)
      g.fill()

      g.globalAlpha = 1
    }
  }

  function updateSparks(dt) {
    for (const s of ui.sparks) {
      s.t += dt
      s.vy += 980 * dt
      s.x += s.vx * dt
      s.y += s.vy * dt
      s.vx *= 0.985
    }
    ui.sparks = ui.sparks.filter(s => s.t < s.life)
  }

  function drawSparks() {
    for (const s of ui.sparks) {
      const a = 1 - (s.t / s.life)
      g.globalAlpha = a

      const rr = s.col[0]
      const gg = s.col[1]
      const bb = s.col[2]

      const grad = g.createRadialGradient(s.x, s.y, 1, s.x, s.y, 18)
      grad.addColorStop(0, `rgba(${rr},${gg},${bb},0.25)`)
      grad.addColorStop(1, "rgba(0,0,0,0)")
      g.fillStyle = grad
      g.beginPath()
      g.arc(s.x, s.y, 18, 0, Math.PI * 2)
      g.fill()

      g.fillStyle = `rgba(${rr},${gg},${bb},0.90)`
      g.beginPath()
      g.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      g.fill()

      g.globalAlpha = 1
    }
  }

  // ============================================================
  // CHARACTER SELECT DATA
  // ============================================================
  const characters = [
    { id: "wam", name: "WAM", colA: [0, 255, 140], colB: [0, 229, 255], speed: 1.08, jump: 0.92, drop: 1.00 },
    { id: "smash", name: "SMASH", colA: [0, 229, 255], colB: [255, 80, 210], speed: 1.00, jump: 1.00, drop: 1.00 },
    { id: "laser", name: "LASER", colA: [255, 210, 60], colB: [0, 229, 255], speed: 0.92, jump: 1.08, drop: 1.00 }
  ]

  // ============================================================
  // STAGE LIST
  // ============================================================
  const stages = [
    { name: "Jungle", theme: "jungle", len: 45, tint: [0, 255, 140], planet: "sun" },
    { name: "STAR", theme: "star", len: 45, tint: [255, 210, 60], planet: "saturn" },
    { name: "MARY", theme: "mary", len: 45, tint: [180, 80, 255], planet: "venus" },
    { name: "SNOWBERRY", theme: "snowberry", len: 45, tint: [255, 90, 190], planet: "moon" },
    { name: "Bonfire", theme: "bonfire", len: 45, tint: [60, 180, 255], planet: "neptune" },
    { name: "The Devil Is Wicked", theme: "devil", len: 120, tint: [255, 70, 40], planet: "jupiter" }
  ]

  // ============================================================
  // POWERUP SETTINGS
  // ============================================================
  const POWERUP_TYPES = ["bubble", "springs", "speed"]
  const POWERUP_HISTORY_MAX = 2

  // ============================================================
  // GLOBAL GAME STATE
  // ============================================================
  const state = {
    dt: 0,
    last: 0,

    rightHeld: false,
    charging: false,
    chargeAt: 0,
    dropArmed: false,
    jumpQueued: false,
    queuedChargeAt: 0,
    queuedCharging: false,
    queuedChargeMs: 0,
    mouseX: -9999,
    mouseY: -9999,
    mouseDown: false,
    startPending: false,
    startDelayT: 0,

    mode: "select",
    running: true,

    lbT: 0,
    totalT: 0,
    stageT: 0,

    baseSpeed: 320,
    difficulty: 0.12,

    score: 0,
    baseScore: 0,

    gems: 0,
    gemMult: 1,

    stageIdx: 0,
    stageCountdown: 0,
    countdownActive: false,

    touchActive: false,
    touchId: null,
    touchStartX: 0,
    touchStartY: 0,
    touchDropFired: false,
    touchJustEnded: false,

    bgA: 0,
    bgB: 0,
    bgC: 0,

    distanceM: 0,

    pendingSave: null,
    leaderboard: [],

    spawnPlan: null,
    planCursor: null,
    powerHist: [],

    speedBoostUntil: 0,
    springsUntil: 0,

    lives: 3,

    completedRun: false,
    completionBonusGranted: false,

    selectedCharIdx: 1,
    selectFlash: 0,
    selectFlashCol: [0, 229, 255],
    cardGlistenT: 0,

    thanksT: 0,
    hintT: 0,
    briefingReady: false,
    briefingLockT: 0,
    deathT: 0,
    deathHold: 5.0,
    dead: false,
    deathX: 0,
    deathY: 0,
    deathPhase: 0
  }

  // ============================================================
  // PLAYER STATE
  // ============================================================
  const player = {
    x: Math.floor(W * 0.22),
    y: lanes.botY,
    w: 78,
    h: 60,

    vy: 0,
    onGround: true,

    lane: "bot",
    landLane: "bot",

    shield: false,
    invuln: 0,

    capePhase: 0,

    dropSpeedMul: 1.0,
    jumpMul: 1.0,
    speedMul: 1.0,

    explodeT: 0
  }

  // ============================================================
  // WORLD ENTITIES
  // ============================================================
  const obstacles = []
  const pickups = []

  // ============================================================
  // STAGE HELPERS
  // ============================================================
  function currentStage() {
    return stages[state.stageIdx % stages.length]
  }

  function stageLen() {
    return currentStage().len
  }

  function stageTimeLeft() {
    return Math.max(0, stageLen() - state.stageT)
  }

  function stageProgress() {
    return clamp(state.stageT / stageLen(), 0, 1)
  }

  // ============================================================
  // CHARACTER HELPERS
  // ============================================================
  function currentChar() {
    return characters[state.selectedCharIdx % characters.length]
  }

  function applyCharacterStats() {
    const c = currentChar()
    player.speedMul = c.speed
    player.jumpMul = c.jump
    player.dropSpeedMul = c.drop
  }

  // ============================================================
  // POWERUP SELECTION
  // ============================================================
  function choosePowerupType() {
    const hist = state.powerHist || []
    const avoid = new Set(hist.slice(-POWERUP_HISTORY_MAX))
    let pool = POWERUP_TYPES.filter(t => !avoid.has(t))
    if (!pool.length) pool = POWERUP_TYPES.slice()
    const k = pool[Math.floor(Math.random() * pool.length)]
    state.powerHist = hist.concat([k]).slice(-POWERUP_HISTORY_MAX)
    return k
  }

  // ============================================================
  // DIFFICULTY CURVE
  // ============================================================
  const DIFFICULTY_CFG = {
    base: 0.08,

    ramp1Start: 18,
    ramp1Dur: 140,
    ramp1Gain: 0.62,

    ramp2Start: 170,
    ramp2Dur: 160,
    ramp2Gain: 0.58,

    ramp3Start: 320,
    ramp3Dur: 180,
    ramp3Gain: 0.35,

    min: 0.08,
    max: 1.35,

    baseSpeed: 360,
    speedGain: 300,

    devilMin: 1.10,
    devilMax: 1.50
  }

  function computeDifficulty() {
    const cfg = DIFFICULTY_CFG
    const secs = state.totalT

    const ramp1 = clamp((secs - cfg.ramp1Start) / cfg.ramp1Dur, 0, 1)
    const ramp2 = clamp((secs - cfg.ramp2Start) / cfg.ramp2Dur, 0, 1)
    const ramp3 = clamp((secs - cfg.ramp3Start) / cfg.ramp3Dur, 0, 1)

    state.difficulty = clamp(
      cfg.base + ramp1 * cfg.ramp1Gain + ramp2 * cfg.ramp2Gain + ramp3 * cfg.ramp3Gain,
      cfg.min,
      cfg.max
    )

    const isDevil = currentStage().theme === "devil"
    if (isDevil) {
      state.difficulty = clamp(Math.max(state.difficulty, cfg.devilMin), cfg.devilMin, cfg.devilMax)
    }

    state.baseSpeed = cfg.baseSpeed + state.difficulty * cfg.speedGain
  }

  // ============================================================
  // WORLD SPEED
  // ============================================================
  function worldSpeed() {
    const boost = performance.now() < state.speedBoostUntil ? 1.8 : 1.0
    return state.baseSpeed * boost * player.speedMul * SPEED_MUL
  }

  // ============================================================
  // COLLISION TEST
  // ============================================================
  function aabb(ax, ay, aw, ah, bx, by, bw, bh) {
    return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by
  }

  // ============================================================
  // SPAWN PLAN BUILDER
  // ============================================================
  function buildSpawnPlan(stageIndex) {
    const st = stages[stageIndex % stages.length]
    const len = st.len
    const rnd = mulberry32(2200 + stageIndex * 97)

    const plan = {
      coins: [],
      obstacles: [],
      powerups: [],
      gemAt: Math.max(4, len - 1.8),
      extra: [],
      gemSpawned: false
    }

    function tooCloseToObstacle(tt) {
      for (const o of plan.obstacles) {
        if (Math.abs(o.t - tt) < 0.85) return true
      }
      return false
    }

    function blocksBothLanes(tt) {
      let topHit = false
      let botHit = false

      for (const o of plan.obstacles) {
        if (Math.abs(o.t - tt) > 0.55) continue
        if (o.lane === "top") topHit = true
        if (o.lane === "bot") botHit = true
        if (topHit && botHit) return true
      }

      return false
    }

    function safeAddObstacle(entry) {
      const tt = entry.t
      if (tooCloseToObstacle(tt)) return false
      if (blocksBothLanes(tt)) return false
      plan.obstacles.push(entry)
      return true
    }

    for (let t = 1.1; t < len; t += 1.25) {
      plan.coins.push({ t, lane: (rnd() < 0.82 ? "bot" : "top") })
    }

    for (let p = 8; p < len; p += 10.0) {
      let tt = p
      let tries = 0
      while (tries < 10 && (tooCloseToObstacle(tt) || blocksBothLanes(tt))) {
        tt += 0.45
        tries += 1
      }
      plan.powerups.push({ t: tt, kind: choosePowerupType() })
    }

    if (st.theme === "snowberry") {
      for (let t = 10; t < len; t += 10) {
        plan.extra.push({ t, kind: "snowball" })
      }
    }

    let t = 2.0
    let lastLane = "bot"

    while (t < len) {
      let lane = rnd() < 0.55 ? "top" : "bot"

      const devil = st.theme === "devil"
      if (devil && lane === lastLane && rnd() < 0.72) {
        lane = lane === "top" ? "bot" : "top"
      }

      let kind = "caterpillar"
      let size = 4

      if (st.theme === "jungle") {
        kind = rnd() < 0.52 ? "caterpillar" : "komodo"
        size = kind === "caterpillar" ? (3 + Math.floor(rnd() * 3)) : (1 + Math.floor(rnd() * 2))
      }

      if (st.theme === "star") {
        kind = rnd() < 0.55 ? "goldShard" : "wireArc"
        size = 1 + Math.floor(rnd() * 2)
      }

      if (st.theme === "mary") {
        kind = rnd() < 0.50 ? "eyeRoll" : "eyeTower"
        size = 1 + Math.floor(rnd() * 2)
      }

      if (st.theme === "snowberry") {
        kind = rnd() < 0.55 ? "strawb" : "candy"
        size = 1 + Math.floor(rnd() * 2)
      }

      if (st.theme === "bonfire") {
        kind = rnd() < 0.55 ? "iceChunk" : "gust"
        size = 1 + Math.floor(rnd() * 2)
      }

      if (st.theme === "devil") {
        kind = rnd() < 0.55 ? "fireball" : "lavaSpire"
        size = 1
      }

      const placed = safeAddObstacle({ t, lane, kind, size })
      if (placed) lastLane = lane

      const p = clamp(t / len, 0, 1)
      let gap = 1.55 - p * 0.65
      if (st.theme === "mary") gap = 1.35 - p * 0.55
      if (st.theme === "devil") {
        gap = 1.35 - p * 0.55
        gap = clamp(gap, 0.92, 1.50)
      }

      t += Math.max(0.78, gap + rnd() * 0.28)
    }

    plan.obstacles.sort((a, b) => a.t - b.t)
    return plan
  }

  // ============================================================
  // SPAWN HELPERS
  // ============================================================
  function spawnObstacle(kind, lane, size) {
    const scale = 1.40

    let w = 50
    let h = 22

    if (kind === "caterpillar") {
      const n = Math.max(3, size || 4)
      w = (n * 10) + 18
      h = 18
    } else if (kind === "komodo") {
      const s = size || 1
      w = 60 + (s * 12)
      h = 18
    } else if (kind === "goldShard") {
      w = 56
      h = 22
    } else if (kind === "wireArc") {
      w = 74
      h = 34
    } else if (kind === "eyeRoll") {
      w = 54
      h = 26
    } else if (kind === "eyeTower") {
      w = 34
      h = 58
    } else if (kind === "strawb") {
      w = 52
      h = 34
    } else if (kind === "candy") {
      w = 62
      h = 30
    } else if (kind === "iceChunk") {
      w = 62
      h = 28
    } else if (kind === "gust") {
      w = 80
      h = 22
    } else if (kind === "fireball") {
      w = 50
      h = 50
    } else if (kind === "lavaSpire") {
      w = 30
      h = 74
    } else if (kind === "snowball") {
      w = 44
      h = 44
      lane = lane || "top"
    }

    obstacles.push({
      x: W + 60,
      y: laneY(lane || "bot"),
      w: Math.floor(w * scale),
      h: Math.floor(h * scale),
      lane: lane || "bot",
      kind,
      size: size || 1,
      vxMul: kind === "snowball" ? 0.45 : 1.0,
      wob: rand(0, 10)
    })
  }

  function spawnCoin(lane) {
    const baseY = laneY(lane)
    pickups.push({
      type: "coin",
      x: W + 60,
      y: baseY - 64,
      r: 14,
      glow: rand(0.7, 1.0),
      lane
    })
  }

  function spawnGem() {
    const lane = "top"
    const baseY = laneY(lane)
    pickups.push({
      type: "gem",
      x: W + 86,
      y: baseY - 78,
      r: 16,
      glow: 1,
      lane
    })
  }

  function spawnPowerup(kind) {
    const lane = "bot"
    const baseY = laneY(lane)
    pickups.push({
      type: "pwr",
      kind,
      x: W + 74,
      y: baseY - 72,
      r: 14,
      glow: 1,
      lane
    })
  }

  // ============================================================
  // PLAN CONSUMPTION
  // ============================================================
  function consumePlan(stageSec) {
    const plan = state.spawnPlan
    const cur = state.planCursor
    if (!plan || !cur) return

    while (cur.coin < plan.coins.length && plan.coins[cur.coin].t <= stageSec) {
      const it = plan.coins[cur.coin++]
      spawnCoin(it.lane)
    }

    while (cur.obs < plan.obstacles.length && plan.obstacles[cur.obs].t <= stageSec) {
      const it = plan.obstacles[cur.obs++]
      spawnObstacle(it.kind, it.lane, it.size)
    }

    while (cur.pwr < plan.powerups.length && plan.powerups[cur.pwr].t <= stageSec) {
      const it = plan.powerups[cur.pwr++]
      spawnPowerup(it.kind)
    }

    while (cur.extra < (plan.extra || []).length && plan.extra[cur.extra].t <= stageSec) {
      const it = plan.extra[cur.extra++]
      spawnObstacle(it.kind, "top", 1)
    }

    if (!plan.gemSpawned && stageSec >= plan.gemAt && state.gems < 6) {
      plan.gemSpawned = true
      spawnGem()
    }
  }

  // ============================================================
  // BACKGROUND PARALLAX STATE
  // ============================================================
  function parallax(dt, speed) {
    state.bgA = (state.bgA + speed * 0.05 * dt) % W
    state.bgB = (state.bgB + speed * 0.12 * dt) % W
    state.bgC = (state.bgC + speed * 0.22 * dt) % W
  }

  // ============================================================
  // DRAW HELPERS
  // ============================================================
  function drawTopFocus() {
    const h = Math.floor(H * 0.22)

    g.save()
    g.globalCompositeOperation = "multiply"

    const grad = g.createLinearGradient(0, 0, 0, h)
    grad.addColorStop(0.00, "rgba(0,0,0,0.85)")
    grad.addColorStop(1.00, "rgba(0,0,0,0)")

    g.fillStyle = grad
    g.fillRect(0, 0, W, h)

    g.restore()
  }

  function drawSky() {
    const st = currentStage()
    const rr = st.tint[0]
    const gg = st.tint[1]
    const bb = st.tint[2]

    const grad = g.createLinearGradient(0, 0, 0, H)
    grad.addColorStop(0.00, "rgba(0,0,0,1)")
    grad.addColorStop(0.20, "rgba(1,6,3,1)")
    grad.addColorStop(1.00, "rgba(0,18,8,1)")
    g.fillStyle = grad
    g.fillRect(0, 0, W, H)

    const fog = g.createRadialGradient(W * 0.55, H * 0.45, 60, W * 0.55, H * 0.55, Math.max(W, H))
    fog.addColorStop(0, `rgba(${rr},${gg},${bb},0.12)`)
    fog.addColorStop(1, "rgba(0,0,0,0.76)")
    g.fillStyle = fog
    g.fillRect(0, 0, W, H)

    if (st.theme === "mary") {
      const jitter = 0.02 + 0.02 * Math.sin(state.totalT * 10)
      g.fillStyle = `rgba(140,80,255,${jitter})`
      g.fillRect(0, 0, W, H)

      g.globalAlpha = 0.14
      g.fillStyle = "rgba(0,0,0,1)"
      for (let i = 0; i < 36; i++) {
        const x = (i * 38 + (state.bgC * 0.6)) % (W + 60) - 40
        const y = 40 + (i % 6) * 58
        g.fillRect(x, y, 2, 26)
      }
      g.globalAlpha = 1
    }

    if (st.theme === "devil") {
      g.globalAlpha = 0.18
      g.fillStyle = "rgba(255,60,40,1)"
      g.fillRect(0, H * 0.78, W, H * 0.22)
      g.globalAlpha = 1
    }
  }

  function drawStarSpotlightStrong() {
    const t = state.totalT
    const x = W * (0.58 + 0.18 * Math.sin(t * 0.55))
    const yTop = -40
    const yBottom = H * 0.90

    g.save()

    g.globalCompositeOperation = "multiply"
    g.fillStyle = "rgba(0,0,0,0.38)"
    g.fillRect(0, 0, W, H)

    g.globalCompositeOperation = "destination-out"
    g.beginPath()
    g.moveTo(x - 90, yTop)
    g.lineTo(x + 90, yTop)
    g.lineTo(x + 360, yBottom)
    g.lineTo(x - 360, yBottom)
    g.closePath()
    g.fill()

    g.globalCompositeOperation = "lighter"
    const coneGlow = g.createRadialGradient(x, H * 0.15, 20, x, H * 0.55, H * 0.95)
    coneGlow.addColorStop(0, "rgba(255,220,80,0.18)")
    coneGlow.addColorStop(0.35, "rgba(255,220,80,0.10)")
    coneGlow.addColorStop(1, "rgba(0,0,0,0)")
    g.fillStyle = coneGlow
    g.beginPath()
    g.moveTo(x - 160, yTop)
    g.lineTo(x + 160, yTop)
    g.lineTo(x + 520, yBottom)
    g.lineTo(x - 520, yBottom)
    g.closePath()
    g.fill()

    g.globalAlpha = 0.55
    g.fillStyle = "rgba(255,220,80,0.30)"
    for (let i = 0; i < 22; i++) {
      const px = x + rand(-220, 220)
      const py = 30 + ((i * 18 + state.bgC * 0.35) % (H * 0.80))
      g.beginPath()
      g.arc(px, py, 1.6 + (i % 3) * 0.6, 0, Math.PI * 2)
      g.fill()
    }

    g.globalAlpha = 1
    g.restore()
  }

  function drawParallax() {
    const st = currentStage()
    const rr = st.tint[0]
    const gg = st.tint[1]
    const bb = st.tint[2]

    g.globalAlpha = 0.30
    g.fillStyle = `rgba(${Math.floor(rr * 0.12)},${Math.floor(gg * 0.32)},${Math.floor(bb * 0.12)},1)`
    for (let i = 0; i < 18; i++) {
      const x = ((i * 140) - state.bgA) % (W + 200) - 120
      const y = 90 + (i % 3) * 18
      g.beginPath()
      g.arc(x, y, 110, 0, Math.PI * 2)
      g.fill()
    }

    g.globalAlpha = 0.38
    g.fillStyle = `rgba(${Math.floor(rr * 0.08)},${Math.floor(gg * 0.22)},${Math.floor(bb * 0.08)},1)`
    for (let i = 0; i < 14; i++) {
      const x = ((i * 180) - state.bgB) % (W + 260) - 160
      const y = 140 + ((i * 17) % 22)
      g.beginPath()
      g.moveTo(x, y)
      g.quadraticCurveTo(x + 90, y - 70, x + 180, y)
      g.quadraticCurveTo(x + 90, y + 40, x, y)
      g.fill()
    }

    g.globalAlpha = 0.26
    g.fillStyle = `rgba(${Math.floor(rr * 0.10)},${Math.floor(gg * 0.38)},${Math.floor(bb * 0.10)},1)`
    for (let i = 0; i < 18; i++) {
      const x = ((i * 120) - state.bgC) % (W + 240) - 120
      const y = 220 + (i % 4) * 20
      g.beginPath()
      g.arc(x, y, 70, 0, Math.PI * 2)
      g.fill()
    }

    g.globalAlpha = 1

    if (st.theme === "star") drawStarSpotlightStrong()
  }

  function drawLanes() {
    const st = currentStage()
    const rr = st.tint[0]
    const gg = st.tint[1]
    const bb = st.tint[2]

    const topY = lanes.topY + 2
    const botY = lanes.botY + 2

    g.fillStyle = "rgba(0,0,0,0.45)"
    g.fillRect(0, lanes.topY + 8, W, 54)
    g.fillRect(0, lanes.botY + 8, W, 54)

    g.save()
    g.globalCompositeOperation = "lighter"

    function glowRail(y) {
      const grad = g.createLinearGradient(0, y - 60, 0, y + 60)
      grad.addColorStop(0.00, "rgba(0,0,0,0)")
      grad.addColorStop(0.30, `rgba(${rr},${gg},${bb},0.22)`)
      grad.addColorStop(0.45, `rgba(${rr},${gg},${bb},0.45)`)
      grad.addColorStop(0.50, `rgba(${rr},${gg},${bb},0.65)`)
      grad.addColorStop(0.55, `rgba(${rr},${gg},${bb},0.45)`)
      grad.addColorStop(0.70, `rgba(${rr},${gg},${bb},0.22)`)
      grad.addColorStop(1.00, "rgba(0,0,0,0)")
      g.fillStyle = grad
      g.fillRect(0, y - 60, W, 120)
    }

    glowRail(topY)
    glowRail(botY)

    g.fillStyle = `rgba(${rr},${gg},${bb},0.85)`
    g.fillRect(0, topY, W, lanes.thickness)
    g.fillRect(0, botY, W, lanes.thickness)

    g.fillStyle = "rgba(255,255,255,0.35)"
    g.fillRect(0, topY + 1, W, 1)
    g.fillRect(0, botY + 1, W, 1)

    g.restore()
  }

  function planetStyle(name) {
    if (name === "sun") return { col: [255, 220, 110], r: 28, ring: 0 }
    if (name === "moon") return { col: [210, 230, 255], r: 22, ring: 0 }
    if (name === "venus") return { col: [255, 160, 210], r: 20, ring: 0 }
    if (name === "saturn") return { col: [255, 220, 160], r: 22, ring: 1 }
    if (name === "jupiter") return { col: [255, 200, 140], r: 26, ring: 0 }
    return { col: [130, 210, 255], r: 20, ring: 0 }
  }

  function drawPlanet() {
    const st = currentStage()
    const p = stageProgress()
    const spec = planetStyle(st.planet || "moon")

    const xMin = W * 0.12
    const xMax = W * 0.88
    const x = xMin + (xMax - xMin) * p

    const yHorizon = H * 0.78
    const yApex = H * 0.18
    const arc = Math.sin(p * Math.PI)
    const y = yHorizon - arc * (yHorizon - yApex)

    const rr = spec.col[0]
    const gg = spec.col[1]
    const bb = spec.col[2]

    g.save()
    g.globalCompositeOperation = "lighter"

    for (let i = 0; i < 3; i++) {
      const r = spec.r * (3.8 + i * 2.0)
      const a = 0.12 - i * 0.025
      const glow = g.createRadialGradient(x, y, 2, x, y, r)
      glow.addColorStop(0, `rgba(${rr},${gg},${bb},${a})`)
      glow.addColorStop(1, "rgba(0,0,0,0)")
      g.fillStyle = glow
      g.beginPath()
      g.arc(x, y, r, 0, Math.PI * 2)
      g.fill()
    }

    g.restore()

    g.fillStyle = `rgba(${rr},${gg},${bb},0.94)`
    g.beginPath()
    g.arc(x, y, spec.r, 0, Math.PI * 2)
    g.fill()

    g.fillStyle = "rgba(255,255,255,0.22)"
    g.beginPath()
    g.arc(x - spec.r * 0.35, y - spec.r * 0.35, spec.r * 0.28, 0, Math.PI * 2)
    g.fill()

    if (spec.ring) {
      g.strokeStyle = `rgba(${rr},${gg},${bb},0.42)`
      g.lineWidth = 3
      g.beginPath()
      g.ellipse(x, y + 2, spec.r * 1.55, spec.r * 0.55, -0.3, 0, Math.PI * 2)
      g.stroke()
    }

    const light = clamp(arc, 0, 1)
    g.fillStyle = `rgba(${rr},${gg},${bb},${0.05 + light * 0.10})`
    g.fillRect(0, 0, W, H)
  }

  function circleGlow(x, y, r, intensity, tint) {
    const col = tint || [0, 255, 140]
    const rr = col[0]
    const gg = col[1]
    const bb = col[2]

    const grad = g.createRadialGradient(x, y, 2, x, y, r * 2.8)
    grad.addColorStop(0, `rgba(${rr},${gg},${bb},${0.9 * intensity})`)
    grad.addColorStop(0.35, `rgba(${rr},${gg},${bb},${0.35 * intensity})`)
    grad.addColorStop(1, `rgba(${rr},${gg},${bb},0)`)
    g.fillStyle = grad
    g.beginPath()
    g.arc(x, y, r * 2.8, 0, Math.PI * 2)
    g.fill()

    g.fillStyle = `rgba(255,255,255,${0.92 * intensity})`
    g.beginPath()
    g.arc(x, y, r, 0, Math.PI * 2)
    g.fill()
  }

  function powerupColor(kind) {
    if (kind === "bubble") return [80, 180, 255]
    if (kind === "speed") return [255, 180, 0]
    if (kind === "springs") return [0, 0, 0]
    return [0, 229, 255]
  }

  function pickupTint(p) {
    if (p.type === "gem") return [0, 255, 140]
    if (p.type === "coin") return [0, 229, 255]
    if (p.type === "pwr") return powerupColor(p.kind)
    return [0, 229, 255]
  }

  function drawSpikyPickup(x, y, innerR, outerR, spikes) {
    const n = Math.max(6, spikes || 10)
    const step = Math.PI / n

    g.save()
    g.translate(x, y)
    g.rotate(state.totalT * 2.5)
    g.translate(-x, -y)

    g.beginPath()
    for (let i = 0; i < n * 2; i++) {
      const r = i % 2 === 0 ? outerR : innerR
      const a = i * step - Math.PI / 2
      const px = x + Math.cos(a) * r
      const py = y + Math.sin(a) * r
      if (i === 0) g.moveTo(px, py)
      else g.lineTo(px, py)
    }
    g.closePath()

    g.fillStyle = "rgba(0,0,0,0.98)"
    g.fill()

    g.strokeStyle = "rgba(255,255,255,0.18)"
    g.lineWidth = 2
    g.stroke()

    g.restore()
  }

  function drawPickups() {
    function drawCoinPickup(p, pulse) {
      const x = p.x
      const y = p.y
      const r = p.r

      g.save()
      g.globalCompositeOperation = "lighter"

      const glow = g.createRadialGradient(x, y, 2, x, y, r * 3.1)
      glow.addColorStop(0, "rgba(255,220,80,0.24)")
      glow.addColorStop(1, "rgba(0,0,0,0)")
      g.fillStyle = glow
      g.beginPath()
      g.arc(x, y, r * 3.1, 0, Math.PI * 2)
      g.fill()

      g.restore()

      g.fillStyle = "rgba(255,220,80,0.96)"
      g.beginPath()
      g.arc(x, y, r, 0, Math.PI * 2)
      g.fill()

      g.strokeStyle = "rgba(0,0,0,0.42)"
      g.lineWidth = 2
      g.beginPath()
      g.arc(x, y, r, 0, Math.PI * 2)
      g.stroke()

      g.strokeStyle = "rgba(255,245,180,0.90)"
      g.lineWidth = 3
      g.beginPath()
      g.arc(x, y, r * 0.56, 0, Math.PI * 2)
      g.stroke()

      g.fillStyle = "rgba(255,255,255,0.34)"
      g.fillRect(x - 2, y - r * 0.62, 4, r * 1.24)

      g.globalAlpha = 0.22 + pulse * 0.18
      g.strokeStyle = "rgba(255,255,255,1)"
      g.lineWidth = 2
      g.beginPath()
      g.arc(x - r * 0.18, y - r * 0.18, r * 0.72, -2.4, -0.2)
      g.stroke()
      g.globalAlpha = 1
    }

    function drawGemPickup(p, pulse) {
      const x = p.x
      const y = p.y

      g.save()
      g.globalCompositeOperation = "lighter"

      const glow = g.createRadialGradient(x, y, 2, x, y, 42)
      glow.addColorStop(0, "rgba(0,255,140,0.24)")
      glow.addColorStop(1, "rgba(0,0,0,0)")
      g.fillStyle = glow
      g.beginPath()
      g.arc(x, y, 42, 0, Math.PI * 2)
      g.fill()

      g.restore()

      g.fillStyle = "rgba(0,255,140,0.96)"
      g.beginPath()
      g.moveTo(x, y - 16)
      g.lineTo(x + 12, y - 2)
      g.lineTo(x, y + 16)
      g.lineTo(x - 12, y - 2)
      g.closePath()
      g.fill()

      g.strokeStyle = "rgba(0,0,0,0.40)"
      g.lineWidth = 2
      g.stroke()

      g.strokeStyle = "rgba(255,255,255,0.34)"
      g.lineWidth = 1.5
      g.beginPath()
      g.moveTo(x, y - 16)
      g.lineTo(x, y + 16)
      g.moveTo(x - 12, y - 2)
      g.lineTo(x + 12, y - 2)
      g.moveTo(x - 12, y - 2)
      g.lineTo(x, y)
      g.lineTo(x + 12, y - 2)
      g.stroke()

      g.globalAlpha = 0.20 + pulse * 0.18
      g.fillStyle = "rgba(255,255,255,1)"
      g.beginPath()
      g.arc(x - 3, y - 6, 2.4, 0, Math.PI * 2)
      g.fill()
      g.globalAlpha = 1
    }

    function drawBubblePickup(p, pulse) {
      const x = p.x
      const y = p.y
      const r = p.r

      circleGlow(x, y, r + 1, pulse, [80, 180, 255])

      g.fillStyle = "rgba(80,180,255,0.20)"
      g.beginPath()
      g.arc(x, y, r + 4, 0, Math.PI * 2)
      g.fill()

      g.strokeStyle = "rgba(255,255,255,0.26)"
      g.lineWidth = 2
      g.beginPath()
      g.arc(x, y, r + 2, 0, Math.PI * 2)
      g.stroke()

      g.fillStyle = "rgba(255,255,255,0.92)"
      g.beginPath()
      g.moveTo(x, y - 9)
      g.lineTo(x + 8, y - 4)
      g.lineTo(x + 6, y + 7)
      g.lineTo(x, y + 11)
      g.lineTo(x - 6, y + 7)
      g.lineTo(x - 8, y - 4)
      g.closePath()
      g.fill()

      g.fillStyle = "rgba(80,180,255,0.65)"
      g.beginPath()
      g.moveTo(x, y - 4)
      g.lineTo(x + 4, y - 1)
      g.lineTo(x + 3, y + 5)
      g.lineTo(x, y + 7)
      g.lineTo(x - 3, y + 5)
      g.lineTo(x - 4, y - 1)
      g.closePath()
      g.fill()
    }

    function drawSpeedPickup(p, pulse) {
      const x = p.x
      const y = p.y

      circleGlow(x, y, p.r + 1, pulse, [255, 180, 0])

      g.fillStyle = "rgba(255,180,0,0.94)"
      g.beginPath()
      g.moveTo(x, y - 14)
      g.lineTo(x + 12, y - 7)
      g.lineTo(x + 12, y + 7)
      g.lineTo(x, y + 14)
      g.lineTo(x - 12, y + 7)
      g.lineTo(x - 12, y - 7)
      g.closePath()
      g.fill()

      g.strokeStyle = "rgba(0,0,0,0.42)"
      g.lineWidth = 2
      g.stroke()

      g.strokeStyle = "rgba(255,255,255,0.34)"
      g.lineWidth = 2
      g.beginPath()
      g.arc(x, y, 6, 0, Math.PI * 2)
      g.stroke()

      g.fillStyle = "rgba(255,255,255,0.92)"
      g.beginPath()
      g.moveTo(x, y)
      g.lineTo(x + 4, y - 3)
      g.lineTo(x + 1, y - 7)
      g.closePath()
      g.fill()
    }

    function drawSpringsPickup(p, pulse) {
      const x = p.x
      const y = p.y

      drawSpikyPickup(x, y, 8, 20, 9)

      g.save()
      g.globalCompositeOperation = "lighter"

      const glow = g.createRadialGradient(x, y, 2, x, y, 34)
      glow.addColorStop(0, "rgba(255,60,90,0.16)")
      glow.addColorStop(1, "rgba(0,0,0,0)")
      g.fillStyle = glow
      g.beginPath()
      g.arc(x, y, 34, 0, Math.PI * 2)
      g.fill()

      g.restore()

      g.fillStyle = "rgba(255,60,90,0.92)"
      g.beginPath()
      g.arc(x, y, 7, 0, Math.PI * 2)
      g.fill()

      g.strokeStyle = "rgba(255,255,255,0.20)"
      g.lineWidth = 2
      g.beginPath()
      g.moveTo(x, y - 11)
      g.lineTo(x, y + 3)
      g.stroke()

      g.fillStyle = "rgba(255,255,255,0.92)"
      g.beginPath()
      g.arc(x, y + 8, 2, 0, Math.PI * 2)
      g.fill()
    }

    for (const p of pickups) {
      const pulse = 0.75 + 0.25 * Math.sin(state.totalT * 6 + p.x * 0.02)

      if (p.type === "coin") {
        drawCoinPickup(p, pulse)
        continue
      }

      if (p.type === "gem") {
        drawGemPickup(p, pulse)
        continue
      }

      if (p.type === "pwr" && p.kind === "bubble") {
        drawBubblePickup(p, pulse)
        continue
      }

      if (p.type === "pwr" && p.kind === "speed") {
        drawSpeedPickup(p, pulse)
        continue
      }

      if (p.type === "pwr" && p.kind === "springs") {
        drawSpringsPickup(p, pulse)
        continue
      }

      circleGlow(p.x, p.y, p.r, pulse, pickupTint(p))
    }
  }

  function drawSmoke() {
    for (const s of ui.smoke) {
      const a = 1 - (s.t / s.life)
      g.globalAlpha = a

      const isRed = s.kind === "red"
      const grad = g.createRadialGradient(s.x, s.y, 2, s.x, s.y, s.r * 2.4)

      if (isRed) {
        grad.addColorStop(0, "rgba(255,60,90,0.26)")
        grad.addColorStop(0.45, "rgba(255,60,90,0.14)")
      } else {
        grad.addColorStop(0, "rgba(0,255,140,0.26)")
        grad.addColorStop(0.45, "rgba(0,255,140,0.14)")
      }

      grad.addColorStop(1, "rgba(0,0,0,0)")
      g.fillStyle = grad

      g.beginPath()
      g.arc(s.x, s.y, s.r * 2.4, 0, Math.PI * 2)
      g.fill()

      g.globalAlpha = 1
    }
  }

  function updateSmoke(dt) {
    for (const s of ui.smoke) {
      s.t += dt
      s.x += s.vx * dt
      s.y += s.vy * dt
      s.vx *= 0.92
      s.vy *= 0.92
    }
    ui.smoke = ui.smoke.filter(s => s.t < s.life)
  }

  function updateFloatTexts(dt) {
    for (const ft of ui.floatTexts) {
      ft.t += dt
      ft.y += ft.vy * dt
    }
    ui.floatTexts = ui.floatTexts.filter(ft => ft.t < ft.life)
  }

  function drawFloatTexts() {
    for (const ft of ui.floatTexts) {
      const a = 1 - (ft.t / ft.life)
      g.globalAlpha = a

      const w = g.measureText(ft.text).width + 18
      const h = 26
      const x = ft.x - w / 2
      const y = ft.y - h / 2

      g.fillStyle = "rgba(255,255,255,0.10)"
      g.beginPath()
      roundRect(x, y, w, h, 12)
      g.fill()

      const col =
        ft.kind === "gold" ? "rgba(255,220,80,0.95)" :
        ft.kind === "blue" ? "rgba(80,180,255,0.95)" :
        ft.kind === "red" ? "rgba(255,60,90,0.95)" :
        "rgba(0,255,140,0.95)"

      g.fillStyle = col
      g.font = "800 13px system-ui, Segoe UI, Arial"
      g.textAlign = "center"
      g.fillText(ft.text, ft.x, ft.y + 5)
      g.textAlign = "left"

      g.globalAlpha = 1
    }
  }

  function updateBankCoins(dt) {
    for (const bc of ui.bankCoins) {
      bc.t += dt
      const p = clamp(bc.t / bc.life, 0, 1)
      bc.x = bc.x + (bc.tx - bc.x) * (0.12 + p * 0.18)
      bc.y = bc.y + (bc.ty - bc.y) * (0.12 + p * 0.18)
    }
    ui.bankCoins = ui.bankCoins.filter(bc => bc.t < bc.life)
  }

  function drawBankCoins() {
    for (const bc of ui.bankCoins) {
      const a = 1 - (bc.t / bc.life)
      g.globalAlpha = a
      circleGlow(bc.x, bc.y, 10, 0.8, bc.tint || [0, 229, 255])
      g.globalAlpha = 1
    }
  }

  function roundRect(x, y, w, h, r) {
    const rr = Math.min(r, w / 2, h / 2)
    g.moveTo(x + rr, y)
    g.arcTo(x + w, y, x + w, y + h, rr)
    g.arcTo(x + w, y + h, x, y + h, rr)
    g.arcTo(x, y + h, x, y, rr)
    g.arcTo(x, y, x + w, y, rr)
    g.closePath()
  }

  // ============================================================
  // DRAW PLAYER
  // ============================================================
  function drawScooterGhost() {
    const x = player.x
    const y = player.y - player.h

    const blink = player.invuln > 0 ? (Math.floor(state.totalT * 12) % 2 === 0) : true
    if (!blink) return

    player.capePhase += state.dt * 7.5

    const c = currentChar()
    const colA = c.colA
    const colB = c.colB

    const ride =
      c.id === "wam" ? "bike" :
      c.id === "laser" ? "board" :
      "scooter"

    const bob = Math.sin(state.totalT * 9) * 1.5
    const lean = player.onGround ? 0 : -3
    const bodyX = x + 36
    const bodyY = y + 22 + bob

    let headR = 13
    if (state.mode === "death" && state.deathPhase === 0) {
      const p = clamp(state.deathT / 0.9, 0, 1)
      const ease = p * p * (3 - 2 * p)
      headR = 13 + ease * 34
    }

    g.save()
    g.globalCompositeOperation = "lighter"
    g.shadowBlur = 14
    g.shadowColor = `rgba(${colB[0]},${colB[1]},${colB[2]},0.24)`

    g.fillStyle = "rgba(255,255,255,0.08)"
    g.beginPath()
    g.ellipse(x + 40, y + 60, 36, 7, 0, 0, Math.PI * 2)
    g.fill()

    const rideGlow = g.createRadialGradient(x + 42, y + 46, 8, x + 42, y + 46, 60)
    rideGlow.addColorStop(0, `rgba(${colB[0]},${colB[1]},${colB[2]},0.20)`)
    rideGlow.addColorStop(1, "rgba(0,0,0,0)")
    g.fillStyle = rideGlow
    g.beginPath()
    g.arc(x + 42, y + 46, 60, 0, Math.PI * 2)
    g.fill()

    function wheel(wx, wy, r) {
      g.fillStyle = "rgba(255,255,255,0.80)"
      g.beginPath()
      g.arc(wx, wy, r, 0, Math.PI * 2)
      g.fill()

      g.fillStyle = "rgba(0,0,0,0.78)"
      g.beginPath()
      g.arc(wx, wy, r * 0.52, 0, Math.PI * 2)
      g.fill()
    }

    if (ride === "scooter") {
      wheel(x + 22, y + 60, 7)
      wheel(x + 61, y + 60, 7)

      g.strokeStyle = "rgba(255,255,255,0.72)"
      g.lineWidth = 3
      g.beginPath()
      g.moveTo(x + 20, y + 60)
      g.lineTo(x + 61, y + 60)
      g.lineTo(x + 57, y + 31)
      g.lineTo(x + 64, y + 24)
      g.stroke()

      g.fillStyle = `rgba(${colA[0]},${colA[1]},${colA[2]},0.28)`
      g.fillRect(x + 17, y + 54, 46, 4)
    }

    if (ride === "board") {
      wheel(x + 24, y + 60, 6)
      wheel(x + 58, y + 60, 6)

      g.strokeStyle = "rgba(255,255,255,0.70)"
      g.lineWidth = 3
      g.beginPath()
      g.moveTo(x + 16, y + 56)
      g.quadraticCurveTo(x + 40, y + 51, x + 64, y + 56)
      g.stroke()

      g.fillStyle = `rgba(${colB[0]},${colB[1]},${colB[2]},0.30)`
      g.beginPath()
      g.moveTo(x + 16, y + 54)
      g.quadraticCurveTo(x + 40, y + 49, x + 64, y + 54)
      g.lineTo(x + 64, y + 57)
      g.quadraticCurveTo(x + 40, y + 52, x + 16, y + 57)
      g.closePath()
      g.fill()
    }

    if (ride === "bike") {
      wheel(x + 18, y + 60, 10)
      wheel(x + 62, y + 60, 10)

      g.strokeStyle = "rgba(255,255,255,0.72)"
      g.lineWidth = 3
      g.beginPath()
      g.moveTo(x + 18, y + 60)
      g.lineTo(x + 37, y + 43)
      g.lineTo(x + 48, y + 60)
      g.lineTo(x + 18, y + 60)
      g.moveTo(x + 37, y + 43)
      g.lineTo(x + 56, y + 37)
      g.lineTo(x + 62, y + 60)
      g.moveTo(x + 52, y + 31)
      g.lineTo(x + 59, y + 31)
      g.moveTo(x + 34, y + 41)
      g.lineTo(x + 30, y + 34)
      g.stroke()
    }

    const tailWave = Math.sin(player.capePhase) * 4
    g.fillStyle = `rgba(${colA[0]},${colA[1]},${colA[2]},0.22)`
    g.beginPath()
    g.moveTo(bodyX - 10, bodyY + 2)
    g.quadraticCurveTo(bodyX - 28, bodyY + 10 + tailWave, bodyX - 14, bodyY + 28)
    g.quadraticCurveTo(bodyX - 2, bodyY + 24, bodyX + 2, bodyY + 12)
    g.closePath()
    g.fill()

    g.fillStyle = `rgba(${colB[0]},${colB[1]},${colB[2]},0.88)`
    g.beginPath()
    g.moveTo(bodyX - 13, bodyY + 2)
    g.quadraticCurveTo(bodyX, bodyY - 8 + lean, bodyX + 13, bodyY + 2)
    g.lineTo(bodyX + 13, bodyY + 21)
    g.quadraticCurveTo(bodyX + 6, bodyY + 26, bodyX + 2, bodyY + 21)
    g.quadraticCurveTo(bodyX, bodyY + 27, bodyX - 2, bodyY + 21)
    g.quadraticCurveTo(bodyX - 7, bodyY + 26, bodyX - 13, bodyY + 21)
    g.closePath()
    g.fill()

    g.strokeStyle = `rgba(${colA[0]},${colA[1]},${colA[2]},0.48)`
    g.lineWidth = 2
    g.stroke()

    g.strokeStyle = "rgba(255,255,255,0.38)"
    g.lineWidth = 2
    g.beginPath()
    if (ride === "board") {
      g.moveTo(bodyX + 2, bodyY + 10)
      g.lineTo(bodyX + 13, bodyY + 16)
    } else {
      g.moveTo(bodyX + 2, bodyY + 10)
      g.lineTo(x + 54, y + 36)
    }
    g.stroke()

    if (!(state.mode === "death" && state.deathPhase >= 1)) {
      g.fillStyle = "rgba(240,250,255,0.96)"
      g.beginPath()
      g.arc(bodyX, y + 12 + bob, headR, 0, Math.PI * 2)
      g.fill()

      g.strokeStyle = `rgba(${colA[0]},${colA[1]},${colA[2]},0.42)`
      g.lineWidth = 2
      g.beginPath()
      g.arc(bodyX, y + 12 + bob, headR, 0, Math.PI * 2)
      g.stroke()

      if (!(state.mode === "death" && state.deathPhase === 0)) {
        g.fillStyle = "rgba(0,0,0,0.68)"
        g.fillRect(bodyX - 6, y + 9 + bob, 3, 3)
        g.fillRect(bodyX + 3, y + 9 + bob, 3, 3)
      }
    }

    g.fillStyle = `rgba(${colA[0]},${colA[1]},${colA[2]},0.92)`
    g.beginPath()
    g.arc(bodyX, y + 8 + bob, 10, Math.PI, Math.PI * 2)
    g.fill()

    g.fillStyle = `rgba(${colA[0]},${colA[1]},${colA[2]},0.92)`
    g.fillRect(bodyX - 10, y + 7 + bob, 20, 3)

    g.beginPath()
    g.moveTo(bodyX + 6, y + 9 + bob)
    g.lineTo(bodyX + 14, y + 11 + bob)
    g.lineTo(bodyX + 6, y + 13 + bob)
    g.closePath()
    g.fill()

    if (player.shield) {
      const shield = g.createRadialGradient(bodyX, bodyY + 2, 8, bodyX, bodyY + 2, 56)
      shield.addColorStop(0, "rgba(80,180,255,0.14)")
      shield.addColorStop(1, "rgba(80,180,255,0)")
      g.fillStyle = shield
      g.beginPath()
      g.arc(bodyX, bodyY + 2, 54, 0, Math.PI * 2)
      g.fill()

      g.strokeStyle = "rgba(180,230,255,0.34)"
      g.lineWidth = 2
      g.beginPath()
      g.arc(bodyX, bodyY + 2, 30, 0, Math.PI * 2)
      g.stroke()
    }

    g.restore()
  }

  // ============================================================
  // OBSTACLE RENDERERS
  // ============================================================
  function drawCaterpillar(o) {
    const x = o.x
    const y = o.y
    const n = Math.max(3, o.size || 4)
    const seg = 14
    const t = state.totalT
    const waveAmp = 2.4
    const waveFreq = 2.6

    for (let i = 0; i < n; i++) {
      const px = x + i * seg
      const py = (y - 11) + Math.sin(t * waveFreq + i * 0.65 + o.wob) * waveAmp

      g.save()
      g.globalCompositeOperation = "lighter"
      const glow = g.createRadialGradient(px, py, 2, px, py, 22)
      glow.addColorStop(0, "rgba(0,255,140,0.18)")
      glow.addColorStop(1, "rgba(0,0,0,0)")
      g.fillStyle = glow
      g.beginPath()
      g.arc(px, py, 22, 0, Math.PI * 2)
      g.fill()
      g.restore()

      const core = g.createRadialGradient(px - 2, py - 3, 2, px, py, 10)
      core.addColorStop(0, "rgba(0,255,140,0.92)")
      core.addColorStop(1, "rgba(0,70,45,0.88)")
      g.fillStyle = core
      g.beginPath()
      g.arc(px, py, 9.2, 0, Math.PI * 2)
      g.fill()

      g.strokeStyle = "rgba(0,0,0,0.22)"
      g.lineWidth = 2
      g.beginPath()
      g.arc(px, py, 9.2, 0, Math.PI * 2)
      g.stroke()

      g.fillStyle = "rgba(255,255,255,0.18)"
      g.beginPath()
      g.arc(px - 3.2, py - 3.4, 3.2, 0, Math.PI * 2)
      g.fill()
    }

    const hx = x - 10
    const hy = (y - 11) + Math.sin(t * waveFreq + o.wob) * (waveAmp + 0.6)

    g.save()
    g.globalCompositeOperation = "lighter"
    const tipGlow = g.createRadialGradient(hx, hy, 2, hx, hy, 42)
    tipGlow.addColorStop(0, "rgba(0,229,255,0.14)")
    tipGlow.addColorStop(0.55, "rgba(0,255,140,0.08)")
    tipGlow.addColorStop(1, "rgba(0,0,0,0)")
    g.fillStyle = tipGlow
    g.beginPath()
    g.arc(hx, hy, 42, 0, Math.PI * 2)
    g.fill()
    g.restore()

    const tipLen = 22
    const tipRad = 10

    g.save()
    g.translate(hx, hy)
    g.rotate(-0.08 + Math.sin(t * 1.2 + o.wob) * 0.03)

    const core = g.createRadialGradient(-6, -4, 2, 0, 0, 18)
    core.addColorStop(0, "rgba(0,229,255,0.88)")
    core.addColorStop(1, "rgba(0,60,90,0.90)")
    g.fillStyle = core

    g.beginPath()
    g.arc(tipLen * 0.35, 0, tipRad, -Math.PI / 2, Math.PI / 2)
    g.quadraticCurveTo(-tipLen * 0.95, 0, tipLen * 0.35, -tipRad)
    g.closePath()
    g.fill()

    g.strokeStyle = "rgba(0,0,0,0.22)"
    g.lineWidth = 2
    g.stroke()

    g.globalAlpha = 0.22
    g.strokeStyle = "rgba(255,255,255,1)"
    g.lineWidth = 2
    g.beginPath()
    g.arc(tipLen * 0.20, -2.2, tipRad * 0.72, -2.7, -0.2)
    g.stroke()
    g.globalAlpha = 1

    g.restore()
  }

  function drawKomodo(o) {
    const x = o.x
    const y = o.y
    const bodyW = o.w
    const bodyH = Math.max(16, o.h - 6)
    const by = y - bodyH

    g.save()
    g.globalCompositeOperation = "lighter"
    const cx = x + bodyW * 0.5
    const cy = by + bodyH * 0.5
    const glow = g.createRadialGradient(cx, cy, 6, cx, cy, 50)
    glow.addColorStop(0, "rgba(0,229,255,0.14)")
    glow.addColorStop(1, "rgba(0,0,0,0)")
    g.fillStyle = glow
    g.beginPath()
    g.arc(cx, cy, 50, 0, Math.PI * 2)
    g.fill()
    g.restore()

    g.fillStyle = "rgba(0,0,0,0.65)"
    g.fillRect(x, by, bodyW, bodyH)

    g.strokeStyle = "rgba(0,229,255,0.45)"
    g.lineWidth = 2
    g.strokeRect(x, by, bodyW, bodyH)

    g.fillStyle = "rgba(0,0,0,0.75)"
    g.beginPath()
    g.moveTo(x + bodyW, by + 2)
    g.lineTo(x + bodyW + 18, by + bodyH * 0.5)
    g.lineTo(x + bodyW, by + bodyH - 2)
    g.closePath()
    g.fill()

    g.strokeStyle = "rgba(0,229,255,0.45)"
    g.stroke()

    g.fillStyle = "rgba(0,255,140,0.75)"
    g.beginPath()
    g.arc(x + bodyW + 9, by + bodyH * 0.4, 3, 0, Math.PI * 2)
    g.fill()
  }

  function drawGoldShard(o) {
    const x = o.x
    const y = o.y - o.h

    g.save()
    g.globalCompositeOperation = "lighter"

    const n = Math.max(3, Math.floor(o.w / 24))
    for (let i = 0; i < n; i++) {
      const fx = x + 10 + i * (o.w / n)
      const fy = y + 10 + (i % 2) * 6

      const grad = g.createRadialGradient(fx, fy, 2, fx, fy, 26)
      grad.addColorStop(0, "rgba(255,220,80,0.24)")
      grad.addColorStop(1, "rgba(0,0,0,0)")
      g.fillStyle = grad
      g.beginPath()
      g.arc(fx, fy, 26, 0, Math.PI * 2)
      g.fill()

      g.fillStyle = "rgba(255,215,70,0.88)"
      g.beginPath()
      g.moveTo(fx, fy - 10)
      g.lineTo(fx + 12, fy)
      g.lineTo(fx, fy + 10)
      g.lineTo(fx - 12, fy)
      g.closePath()
      g.fill()

      g.fillStyle = "rgba(255,255,255,0.24)"
      g.beginPath()
      g.arc(fx - 3, fy - 3, 3, 0, Math.PI * 2)
      g.fill()
    }

    g.globalCompositeOperation = "source-over"
    g.strokeStyle = "rgba(0,255,140,0.55)"
    g.lineWidth = 2
    g.strokeRect(x + 20, y + 18, 32, 34)

    g.strokeStyle = "rgba(0,229,255,0.55)"
    g.beginPath()
    g.arc(x + 36, y + 12, 14, 0, Math.PI * 2)
    g.stroke()

    g.restore()
  }

  function drawWireArc(o) {
    const x = o.x
    const y = o.y

    g.save()
    g.globalCompositeOperation = "lighter"

    g.strokeStyle = "rgba(255,220,80,0.40)"
    g.lineWidth = 4
    g.beginPath()
    g.moveTo(x, y - 10)
    g.quadraticCurveTo(x + o.w * 0.5, y - o.h - 10, x + o.w, y - 10)
    g.stroke()

    g.strokeStyle = "rgba(0,229,255,0.20)"
    g.lineWidth = 2
    g.beginPath()
    g.moveTo(x + 6, y - 8)
    g.quadraticCurveTo(x + o.w * 0.5, y - o.h - 4, x + o.w - 6, y - 8)
    g.stroke()

    g.restore()
  }

  function drawEyeRoll(o) {
    const cx = o.x + o.w * 0.5
    const cy = o.y - o.h * 0.45
    const r = Math.min(o.w, o.h) * 0.35

    g.save()
    g.globalCompositeOperation = "lighter"

    const glow = g.createRadialGradient(cx, cy, 2, cx, cy, r * 3.0)
    glow.addColorStop(0, "rgba(140,80,255,0.22)")
    glow.addColorStop(1, "rgba(0,0,0,0)")
    g.fillStyle = glow
    g.beginPath()
    g.arc(cx, cy, r * 3.0, 0, Math.PI * 2)
    g.fill()

    g.restore()

    g.fillStyle = "rgba(255,255,255,0.84)"
    g.beginPath()
    g.arc(cx, cy, r, 0, Math.PI * 2)
    g.fill()

    g.fillStyle = "rgba(0,0,0,0.65)"
    g.beginPath()
    g.arc(cx + Math.sin(state.totalT * 3 + o.wob) * (r * 0.25), cy, r * 0.35, 0, Math.PI * 2)
    g.fill()

    g.fillStyle = "rgba(255,80,210,0.55)"
    g.beginPath()
    g.arc(cx - r * 0.25, cy - r * 0.25, r * 0.18, 0, Math.PI * 2)
    g.fill()
  }

  function drawEyeTower(o) {
    const x = o.x + o.w * 0.5
    const top = o.y - o.h

    g.fillStyle = "rgba(0,0,0,0.60)"
    g.fillRect(o.x, top, o.w, o.h)

    g.strokeStyle = "rgba(140,80,255,0.50)"
    g.lineWidth = 2
    g.strokeRect(o.x + 1, top + 1, o.w - 2, o.h - 2)

    const r = o.w * 0.55
    const cy = top + r + 6
    g.fillStyle = "rgba(255,255,255,0.84)"
    g.beginPath()
    g.arc(x, cy, r, 0, Math.PI * 2)
    g.fill()

    g.fillStyle = "rgba(0,0,0,0.65)"
    g.beginPath()
    g.arc(x + Math.sin(state.totalT * 4 + o.wob) * (r * 0.18), cy, r * 0.35, 0, Math.PI * 2)
    g.fill()
  }

  function drawStrawb(o) {
    const x = o.x
    const y = o.y - o.h

    g.save()
    g.globalCompositeOperation = "lighter"

    const cx = x + o.w * 0.5
    const cy = y + o.h * 0.55
    const glow = g.createRadialGradient(cx, cy, 4, cx, cy, 90)
    glow.addColorStop(0, "rgba(255,80,210,0.18)")
    glow.addColorStop(1, "rgba(0,0,0,0)")
    g.fillStyle = glow
    g.beginPath()
    g.arc(cx, cy, 90, 0, Math.PI * 2)
    g.fill()

    g.restore()

    g.fillStyle = "rgba(255,80,110,0.86)"
    g.beginPath()
    g.ellipse(cx, cy, o.w * 0.42, o.h * 0.42, 0, 0, Math.PI * 2)
    g.fill()

    g.fillStyle = "rgba(0,255,140,0.60)"
    g.beginPath()
    g.moveTo(cx, y + 10)
    g.lineTo(cx + 14, y + 26)
    g.lineTo(cx, y + 20)
    g.lineTo(cx - 14, y + 26)
    g.closePath()
    g.fill()

    g.fillStyle = "rgba(255,255,255,0.20)"
    for (let i = 0; i < 10; i++) {
      const sx = cx + rand(-o.w * 0.22, o.w * 0.22)
      const sy = cy + rand(-o.h * 0.22, o.h * 0.22)
      g.fillRect(sx, sy, 2, 2)
    }
  }

  function drawCandy(o) {
    const x = o.x
    const y = o.y - o.h

    g.save()
    g.globalCompositeOperation = "lighter"

    const cx = x + o.w * 0.5
    const cy = y + o.h * 0.55

    const glow = g.createRadialGradient(cx, cy, 4, cx, cy, 80)
    glow.addColorStop(0, "rgba(255,80,210,0.16)")
    glow.addColorStop(1, "rgba(0,0,0,0)")
    g.fillStyle = glow
    g.beginPath()
    g.arc(cx, cy, 80, 0, Math.PI * 2)
    g.fill()

    g.restore()

    g.fillStyle = "rgba(255,210,60,0.80)"
    g.fillRect(x + 10, y + 18, o.w - 20, o.h - 36)

    g.fillStyle = "rgba(255,255,255,0.20)"
    g.fillRect(x + 16, y + 22, o.w - 32, 6)

    g.fillStyle = "rgba(0,229,255,0.60)"
    g.beginPath()
    g.arc(x + 10, y + o.h * 0.5, 10, 0, Math.PI * 2)
    g.fill()

    g.beginPath()
    g.arc(x + o.w - 10, y + o.h * 0.5, 10, 0, Math.PI * 2)
    g.fill()
  }

  function drawIceChunk(o) {
    const x = o.x
    const y = o.y - o.h

    g.fillStyle = "rgba(255,255,255,0.16)"
    g.fillRect(x, y, o.w, o.h)

    g.strokeStyle = "rgba(60,180,255,0.35)"
    g.lineWidth = 2
    g.strokeRect(x + 1, y + 1, o.w - 2, o.h - 2)

    g.fillStyle = "rgba(255,255,255,0.10)"
    g.fillRect(x + 6, y + 6, o.w - 12, 8)
  }

  function drawGust(o) {
    const x = o.x
    const y = o.y - o.h * 0.6

    g.save()
    g.globalCompositeOperation = "lighter"

    g.strokeStyle = "rgba(255,255,255,0.22)"
    g.lineWidth = 4
    g.beginPath()
    g.moveTo(x, y)
    g.bezierCurveTo(x + o.w * 0.3, y - 10, x + o.w * 0.6, y + 10, x + o.w, y)
    g.stroke()

    g.strokeStyle = "rgba(60,180,255,0.18)"
    g.lineWidth = 2
    g.beginPath()
    g.moveTo(x + 6, y + 12)
    g.bezierCurveTo(x + o.w * 0.3, y + 2, x + o.w * 0.6, y + 22, x + o.w - 6, y + 12)
    g.stroke()

    g.restore()
  }

  function drawFireball(o) {
    const cx = o.x + o.w * 0.5
    const cy = o.y - o.h * 0.5
    const r = o.w * 0.35

    g.save()
    g.globalCompositeOperation = "lighter"

    const glow = g.createRadialGradient(cx, cy, 3, cx, cy, r * 4.2)
    glow.addColorStop(0, "rgba(255,80,60,0.22)")
    glow.addColorStop(1, "rgba(0,0,0,0)")
    g.fillStyle = glow
    g.beginPath()
    g.arc(cx, cy, r * 4.2, 0, Math.PI * 2)
    g.fill()

    g.restore()

    g.fillStyle = "rgba(255,80,60,0.90)"
    g.beginPath()
    g.arc(cx, cy, r, 0, Math.PI * 2)
    g.fill()

    g.fillStyle = "rgba(255,210,60,0.75)"
    g.beginPath()
    g.arc(cx - r * 0.2, cy - r * 0.2, r * 0.45, 0, Math.PI * 2)
    g.fill()
  }

  function drawLavaSpire(o) {
    const x = o.x
    const y = o.y - o.h

    g.fillStyle = "rgba(0,0,0,0.60)"
    g.fillRect(x, y, o.w, o.h)

    g.save()
    g.globalCompositeOperation = "lighter"

    const grad = g.createLinearGradient(0, y, 0, y + o.h)
    grad.addColorStop(0, "rgba(255,80,60,0.18)")
    grad.addColorStop(1, "rgba(255,210,60,0.10)")
    g.fillStyle = grad
    g.fillRect(x, y, o.w, o.h)

    g.restore()

    g.strokeStyle = "rgba(255,80,60,0.35)"
    g.lineWidth = 2
    g.strokeRect(x + 1, y + 1, o.w - 2, o.h - 2)
  }

  function drawSnowball(o) {
    const cx = o.x + o.w * 0.5
    const cy = o.y - o.h * 0.5
    const r = o.w * 0.35

    g.save()
    g.globalCompositeOperation = "lighter"

    const glow = g.createRadialGradient(cx, cy, 2, cx, cy, r * 3.0)
    glow.addColorStop(0, "rgba(255,255,255,0.18)")
    glow.addColorStop(1, "rgba(0,0,0,0)")
    g.fillStyle = glow
    g.beginPath()
    g.arc(cx, cy, r * 3.0, 0, Math.PI * 2)
    g.fill()

    g.restore()

    g.fillStyle = "rgba(255,255,255,0.86)"
    g.beginPath()
    g.arc(cx, cy, r, 0, Math.PI * 2)
    g.fill()

    g.fillStyle = "rgba(60,180,255,0.22)"
    g.beginPath()
    g.arc(cx - r * 0.25, cy - r * 0.25, r * 0.35, 0, Math.PI * 2)
    g.fill()
  }

  function drawObstacle(o) {
    const st = currentStage()

    if (o.kind === "caterpillar") return drawCaterpillar(o)
    if (o.kind === "komodo") return drawKomodo(o)
    if (o.kind === "goldShard") return drawGoldShard(o)
    if (o.kind === "wireArc") return drawWireArc(o)
    if (o.kind === "eyeRoll") return drawEyeRoll(o)
    if (o.kind === "eyeTower") return drawEyeTower(o)
    if (o.kind === "strawb") return drawStrawb(o)
    if (o.kind === "candy") return drawCandy(o)
    if (o.kind === "iceChunk") return drawIceChunk(o)
    if (o.kind === "gust") return drawGust(o)
    if (o.kind === "fireball") return drawFireball(o)
    if (o.kind === "lavaSpire") return drawLavaSpire(o)
    if (o.kind === "snowball") return drawSnowball(o)

    if (st.theme === "star") return drawGoldShard(o)
  }

  // ============================================================
  // UI
  // ============================================================
  function drawLives() {
    const x0 = W - 60
    const y0 = 62

    for (let i = 0; i < 3; i++) {
      const alive = i < state.lives
      const x = x0 + i * 18

      if (alive) {
        circleGlow(x, y0, 6, 0.9, [0, 229, 255])
      } else {
        g.globalAlpha = 0.25
        circleGlow(x, y0, 6, 0.4, [255, 255, 255])
        g.globalAlpha = 1
      }
    }

    if (ui.flash > 0) {
      const a = clamp(ui.flash / 0.20, 0, 1)
      g.globalAlpha = a
      g.fillStyle = "rgba(255,255,255,0.35)"
      g.fillRect(0, 0, W, H)
      g.globalAlpha = 1
    }
  }

  function drawStageCountdownRight() {
    if (!state.countdownActive) return

    const n = Math.ceil(state.stageCountdown)
    const x = W - 38
    const y = H * 0.45

    g.save()
    g.globalAlpha = 0.85

    g.fillStyle = "rgba(0,0,0,0.24)"
    g.beginPath()
    roundRect(W - 84, y - 84, 70, 118, 16)
    g.fill()

    g.fillStyle = "rgba(255,255,255,0.92)"
    g.font = "900 72px system-ui, Segoe UI, Arial"
    g.textAlign = "center"
    g.fillText(String(n), x, y)

    g.font = "700 12px system-ui, Segoe UI, Arial"
    g.fillStyle = "rgba(255,255,255,0.60)"
    g.fillText("next", x, y + 30)

    g.textAlign = "left"
    g.restore()
  }

  function drawUI() {
    g.fillStyle = "rgba(255,255,255,0.85)"
    g.font = "600 16px system-ui, Segoe UI, Arial"
    g.fillText(`Score ${state.score}`, 16, 26)

    g.fillStyle = "rgba(0,255,140,0.85)"
    g.fillText(`Mult x${state.gemMult}`, 16, 46)

    g.fillStyle = "rgba(255,255,255,0.62)"
    g.fillText(`Gems ${state.gems} / 6`, 16, 66)

    g.fillStyle = "rgba(255,255,255,0.62)"
    g.fillText(`Meters ${Math.floor(state.distanceM)}`, 16, H - 18)

    for (let i = 0; i < state.gems; i++) {
      const x = 122 + i * 18
      const y = 62
      g.fillStyle = "rgba(0,255,140,0.72)"
      g.beginPath()
      g.arc(x, y, 6, 0, Math.PI * 2)
      g.fill()
      g.fillStyle = "rgba(255,255,255,0.6)"
      g.beginPath()
      g.arc(x - 2, y - 2, 2, 0, Math.PI * 2)
      g.fill()
    }

    const st = currentStage()
    g.fillStyle = "rgba(255,255,255,0.65)"
    g.fillText(`Level ${state.stageIdx + 1}  ${st.name}`, W - 320, 26)

    const left = stageTimeLeft()
    g.fillStyle = "rgba(255,255,255,0.45)"
    g.fillText(`${left.toFixed(0)}s`, W - 64, 26)

    if (state.charging && player.onGround) {
      const held = clamp((performance.now() - state.chargeAt) / 420, 0, 1)
      const barW = 160
      const barH = 10
      const x = W - 210
      const y = 44

      g.fillStyle = "rgba(255,255,255,0.10)"
      g.fillRect(x, y, barW, barH)
      g.fillStyle = "rgba(0,229,255,0.55)"
      g.fillRect(x, y, Math.floor(barW * held), barH)

      g.fillStyle = "rgba(255,255,255,0.55)"
      g.font = "600 12px system-ui, Segoe UI, Arial"
      g.fillText(state.dropArmed ? "Drop armed" : "Jump charge", x, y + 26)
    }

    g.fillStyle = "rgba(255,255,255,0.85)"
    g.font = "12px system-ui, Segoe UI, Arial"
    g.textAlign = "center"
    g.fillText("© 2026 wamsmash", W * 0.5, H - 10)
    g.textAlign = "left"

    drawLives()
    drawStageCountdownRight()
  }

  // ============================================================
  // SCREEN DRAWERS
  // ============================================================
  
  function drawSelectGhostPortrait(x, y, c, scale) {
  const colA = c.colA
  const colB = c.colB
  const ride =
    c.id === "wam" ? "bike" :
    c.id === "laser" ? "board" :
    "scooter"

  const r = 58 * scale
  const cx = x
  const cy = y - 16 * scale
  const bob = Math.sin(state.totalT * 3.2) * 1.5 * scale

  g.save()

  const outerGlow = g.createRadialGradient(cx, cy, 8, cx, cy, r * 2.2)
  outerGlow.addColorStop(0, `rgba(${colB[0]},${colB[1]},${colB[2]},0.24)`)
  outerGlow.addColorStop(1, "rgba(0,0,0,0)")
  g.fillStyle = outerGlow
  g.beginPath()
  g.arc(cx, cy, r * 2.2, 0, Math.PI * 2)
  g.fill()

  const disc = g.createRadialGradient(cx - r * 0.25, cy - r * 0.35, 6, cx, cy, r)
  disc.addColorStop(0, `rgba(${colB[0]},${colB[1]},${colB[2]},0.34)`)
  disc.addColorStop(0.62, `rgba(${colA[0]},${colA[1]},${colA[2]},0.18)`)
  disc.addColorStop(1, "rgba(0,0,0,0.50)")
  g.fillStyle = disc
  g.beginPath()
  g.arc(cx, cy, r, 0, Math.PI * 2)
  g.fill()

  g.strokeStyle = "rgba(255,255,255,0.14)"
  g.lineWidth = 2
  g.beginPath()
  g.arc(cx, cy, r, 0, Math.PI * 2)
  g.stroke()

  g.save()
  g.beginPath()
  g.arc(cx, cy, r - 2, 0, Math.PI * 2)
  g.clip()

g.translate(cx, cy + 2 * scale)
g.scale(scale * 1.35, scale * 1.35)

  function wheel(wx, wy, wr) {
    g.fillStyle = "rgba(255,255,255,0.82)"
    g.beginPath()
    g.arc(wx, wy, wr, 0, Math.PI * 2)
    g.fill()

    g.fillStyle = "rgba(0,0,0,0.78)"
    g.beginPath()
    g.arc(wx, wy, wr * 0.52, 0, Math.PI * 2)
    g.fill()
  }

  g.fillStyle = "rgba(255,255,255,0.08)"
  g.beginPath()
  g.ellipse(0, 30, 42, 8, 0, 0, Math.PI * 2)
  g.fill()

  if (ride === "scooter") {
    wheel(-22, 28, 7)
    wheel(18, 28, 7)

    g.strokeStyle = "rgba(255,255,255,0.72)"
    g.lineWidth = 3
    g.beginPath()
    g.moveTo(-24, 28)
    g.lineTo(18, 28)
    g.lineTo(14, -2)
    g.lineTo(21, -10)
    g.stroke()

    g.fillStyle = `rgba(${colA[0]},${colA[1]},${colA[2]},0.28)`
    g.fillRect(-26, 22, 46, 4)
  }

  if (ride === "board") {
    wheel(-20, 28, 6)
    wheel(16, 28, 6)

    g.strokeStyle = "rgba(255,255,255,0.70)"
    g.lineWidth = 3
    g.beginPath()
    g.moveTo(-28, 24)
    g.quadraticCurveTo(-2, 19, 22, 24)
    g.stroke()

    g.fillStyle = `rgba(${colB[0]},${colB[1]},${colB[2]},0.30)`
    g.beginPath()
    g.moveTo(-28, 22)
    g.quadraticCurveTo(-2, 17, 22, 22)
    g.lineTo(22, 25)
    g.quadraticCurveTo(-2, 20, -28, 25)
    g.closePath()
    g.fill()
  }

  if (ride === "bike") {
    wheel(-24, 28, 10)
    wheel(20, 28, 10)

    g.strokeStyle = "rgba(255,255,255,0.72)"
    g.lineWidth = 3
    g.beginPath()
    g.moveTo(-24, 28)
    g.lineTo(-6, 10)
    g.lineTo(6, 28)
    g.lineTo(-24, 28)
    g.moveTo(-6, 10)
    g.lineTo(14, 4)
    g.lineTo(20, 28)
    g.moveTo(10, -2)
    g.lineTo(18, -2)
    g.moveTo(-10, 9)
    g.lineTo(-14, 2)
    g.stroke()
  }

  const tailWave = Math.sin(state.totalT * 4.2) * 3

  g.fillStyle = `rgba(${colA[0]},${colA[1]},${colA[2]},0.24)`
  g.beginPath()
  g.moveTo(-10, 0 + bob)
  g.quadraticCurveTo(-28, 8 + tailWave + bob, -14, 28 + bob)
  g.quadraticCurveTo(-2, 24 + bob, 2, 12 + bob)
  g.closePath()
  g.fill()

  g.fillStyle = `rgba(${colB[0]},${colB[1]},${colB[2]},0.90)`
  g.beginPath()
  g.moveTo(-13, 0 + bob)
  g.quadraticCurveTo(0, -10 + bob, 13, 0 + bob)
  g.lineTo(13, 20 + bob)
  g.quadraticCurveTo(7, 25 + bob, 2, 20 + bob)
  g.quadraticCurveTo(0, 26 + bob, -2, 20 + bob)
  g.quadraticCurveTo(-7, 25 + bob, -13, 20 + bob)
  g.closePath()
  g.fill()

  g.strokeStyle = `rgba(${colA[0]},${colA[1]},${colA[2]},0.48)`
  g.lineWidth = 2
  g.stroke()

  g.strokeStyle = "rgba(255,255,255,0.38)"
  g.lineWidth = 2
  g.beginPath()
  if (ride === "board") {
    g.moveTo(2, 9 + bob)
    g.lineTo(13, 16 + bob)
  } else {
    g.moveTo(2, 9 + bob)
    g.lineTo(15, 2)
  }
  g.stroke()

  g.fillStyle = "rgba(240,250,255,0.97)"
  g.beginPath()
  g.arc(0, -14 + bob, 13, 0, Math.PI * 2)
  g.fill()

  g.strokeStyle = `rgba(${colA[0]},${colA[1]},${colA[2]},0.42)`
  g.lineWidth = 2
  g.beginPath()
  g.arc(0, -14 + bob, 13, 0, Math.PI * 2)
  g.stroke()

  g.fillStyle = "rgba(0,0,0,0.68)"
  g.fillRect(-6, -17 + bob, 3, 3)
  g.fillRect(3, -17 + bob, 3, 3)

  g.fillStyle = `rgba(${colA[0]},${colA[1]},${colA[2]},0.94)`
  g.beginPath()
  g.arc(0, -18 + bob, 10, Math.PI, Math.PI * 2)
  g.fill()

  g.fillRect(-10, -19 + bob, 20, 3)

  g.beginPath()
  g.moveTo(6, -17 + bob)
  g.lineTo(14, -15 + bob)
  g.lineTo(6, -13 + bob)
  g.closePath()
  g.fill()

  g.restore()
  g.restore()
}
  function pointInCircle(px, py, cx, cy, r) {
  const dx = px - cx
  const dy = py - cy
  return dx * dx + dy * dy <= r * r
}

function getSelectTargets() {
  const centerX = W * 0.5
  const centerY = H * 0.42

  const sideScale = 0.72
  const midScale = 0.84

  return {
    left: {
      x: centerX - 260,
      y: centerY + 38 - 20 * sideScale,
      r: 54 * sideScale + 10
    },
    mid: {
      x: centerX,
      y: centerY + 22 - 20 * midScale,
      r: 54 * midScale + 12
    },
    right: {
      x: centerX + 260,
      y: centerY + 38 - 20 * sideScale,
      r: 54 * sideScale + 10
    }
  }
}

function selectRideLabel(c) {
  if (c.id === "wam") return "BMX"
  if (c.id === "laser") return "Skateboard"
  return "Scooter"
}
  
function drawSelectScreen() {
  drawSky()
  drawParallax()
  drawPlanet()
  drawLanes()

  const centerX = W * 0.5
  const centerY = H * 0.42
  const targets = getSelectTargets()

  const idx = state.selectedCharIdx % characters.length
  const leftIdx = (idx + characters.length - 1) % characters.length
  const rightIdx = (idx + 1) % characters.length

  const mid = characters[idx]
  const left = characters[leftIdx]
  const right = characters[rightIdx]

  const hoverLeft = pointInCircle(state.mouseX, state.mouseY, targets.left.x, targets.left.y, targets.left.r)
  const hoverMid = pointInCircle(state.mouseX, state.mouseY, targets.mid.x, targets.mid.y, targets.mid.r)
  const hoverRight = pointInCircle(state.mouseX, state.mouseY, targets.right.x, targets.right.y, targets.right.r)

  g.fillStyle = "rgba(0,0,0,0.42)"
  g.fillRect(0, 0, W, H)

  const spotlight = g.createRadialGradient(centerX, 38, 20, centerX, 96, H * 0.82)
  spotlight.addColorStop(0, "rgba(255,255,255,0.16)")
  spotlight.addColorStop(0.42, "rgba(255,255,255,0.06)")
  spotlight.addColorStop(1, "rgba(0,0,0,0.80)")
  g.fillStyle = spotlight
  g.fillRect(0, 0, W, H)

  g.fillStyle = "rgba(255,255,255,0.94)"
  g.font = "900 36px system-ui, Segoe UI, Arial"
  g.textAlign = "center"
  g.fillText("Pick a ghost", centerX, 64)

  g.fillStyle = "rgba(255,255,255,0.62)"
  g.font = "700 14px system-ui, Segoe UI, Arial"
  g.fillText("Choose your rider", centerX, 90)

  function drawHoverSparkles(cx, cy, radius) {
    const t = state.totalT * 2.6

    g.save()
    g.globalCompositeOperation = "lighter"

    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2 + t
      const rr = radius + 12 + Math.sin(t * 1.6 + i) * 6
      const sx = cx + Math.cos(a) * rr
      const sy = cy + Math.sin(a) * rr * 0.82

      const glow = g.createRadialGradient(sx, sy, 1, sx, sy, 10)
      glow.addColorStop(0, "rgba(255,220,80,0.34)")
      glow.addColorStop(1, "rgba(0,0,0,0)")
      g.fillStyle = glow
      g.beginPath()
      g.arc(sx, sy, 10, 0, Math.PI * 2)
      g.fill()

      g.fillStyle = i % 2 === 0 ? "rgba(255,220,80,0.96)" : "rgba(255,255,255,0.92)"
      g.beginPath()
      g.arc(sx, sy, 1.8 + (i % 3) * 0.35, 0, Math.PI * 2)
      g.fill()
    }

    g.restore()
  }

  function drawSelector(cx, cy, c, scale, alpha, isCenter, isHover) {
    g.save()
    g.globalAlpha = alpha

    const press = isHover && state.mouseDown ? 0.985 : 1
    const hoverScale = isHover ? 1.04 : 1
    const liveScale = scale * hoverScale * press
    const ride = selectRideLabel(c)

    let ringCol = c.colB
    if (isCenter && isHover) ringCol = [255, 220, 80]

    const ringX = cx
    const ringY = cy - 20 * liveScale
    const ringR = 54 * liveScale

    if (isCenter && isHover) {
const halo = g.createRadialGradient(ringX, ringY, 10, ringX, ringY, ringR * 2.1)
halo.addColorStop(0, "rgba(255,220,80,0.18)")
halo.addColorStop(0.55, "rgba(255,220,80,0.05)")
halo.addColorStop(1, "rgba(0,0,0,0)")
      g.fillStyle = halo
      g.beginPath()
      g.arc(ringX, ringY, ringR * 2.5, 0, Math.PI * 2)
      g.fill()

      drawHoverSparkles(ringX, ringY, ringR)
    }

    g.strokeStyle = `rgba(${ringCol[0]},${ringCol[1]},${ringCol[2]},${isHover ? 0.95 : 0.42})`
    g.lineWidth = isCenter ? 4 : 3
    g.beginPath()
    g.arc(ringX, ringY, ringR, 0, Math.PI * 2)
    g.stroke()

    g.globalAlpha = alpha * (isHover ? 0.30 : 0.16)
    g.strokeStyle = "rgba(255,255,255,0.22)"
    g.lineWidth = 2
    g.beginPath()
    g.arc(ringX, ringY, ringR + 8, 0, Math.PI * 2)
    g.stroke()
    g.globalAlpha = alpha

    drawSelectGhostPortrait(cx, cy, c, liveScale)

g.fillStyle = isCenter && isHover ? "rgba(255,220,80,0.96)" : "rgba(255,255,255,0.86)"
g.font = `900 ${18 * liveScale}px system-ui, Segoe UI, Arial`
g.textAlign = "center"
g.fillText(c.name, cx, cy + 56 * liveScale)

if (isCenter) {
  const pillW = 92
  const pillH = 20
  const pillY = cy + 82 * liveScale

      g.fillStyle = isHover ? "rgba(255,220,80,0.18)" : "rgba(255,255,255,0.08)"
      g.beginPath()
      roundRect(cx - pillW / 2, pillY - pillH / 2, pillW, pillH, 999)
      g.fill()

      g.strokeStyle = isHover ? "rgba(255,220,80,0.42)" : "rgba(255,255,255,0.12)"
      g.lineWidth = 1.5
      g.beginPath()
      roundRect(cx - pillW / 2, pillY - pillH / 2, pillW, pillH, 999)
      g.stroke()

      g.fillStyle = isHover ? "rgba(255,220,80,0.98)" : "rgba(255,255,255,0.70)"
      g.font = "800 11px system-ui, Segoe UI, Arial"
      g.fillText(ride, cx, pillY + 4)
    }

    g.restore()
  }

drawSelector(targets.left.x, centerY + 18, left, 0.84, 0.62, false, hoverLeft)
drawSelector(targets.right.x, centerY + 18, right, 0.84, 0.62, false, hoverRight)
drawSelector(targets.mid.x, centerY - 2, mid, 1.00, 1.0, true, hoverMid)

    const panelX = centerX
const panelY = centerY + 132
const panelW = 500
const panelH = 72

    g.fillStyle = "rgba(0,0,0,0.34)"
    g.beginPath()
    roundRect(panelX - panelW / 2, panelY - panelH / 2, panelW, panelH, 18)
    g.fill()

    const panelRim = g.createLinearGradient(
      panelX - panelW / 2,
      panelY - panelH / 2,
      panelX + panelW / 2,
      panelY + panelH / 2
    )
    panelRim.addColorStop(0, "rgba(255,255,255,0.12)")
    panelRim.addColorStop(1, "rgba(0,229,255,0.08)")
    g.strokeStyle = panelRim
    g.lineWidth = 2
    g.beginPath()
    roundRect(panelX - panelW / 2, panelY - panelH / 2, panelW, panelH, 18)
    g.stroke()

    g.globalAlpha = 0.22
    g.strokeStyle = "rgba(255,255,255,0.14)"
    g.beginPath()
    roundRect(panelX - panelW / 2 + 4, panelY - panelH / 2 + 4, panelW - 8, panelH - 8, 15)
    g.stroke()
    g.globalAlpha = 1

    function statBar(label, value, row) {
      const left = panelX - panelW / 2
      const top = panelY - panelH / 2
      const rowGap = 22
      const rowY = top + 14 + row * rowGap

      const labelX = left + 24
      const barX = left + 106
      const barW = 300
      const barH = 10
      const pctX = left + panelW - 22

      g.fillStyle = "rgba(255,255,255,0.74)"
      g.font = "700 12px system-ui, Segoe UI, Arial"
      g.textAlign = "left"
      g.fillText(label, labelX, rowY + 11)

      g.fillStyle = "rgba(255,255,255,0.08)"
      g.beginPath()
      roundRect(barX, rowY + 2, barW, barH, 999)
      g.fill()

      const fillW = Math.floor(barW * clamp(value, 0, 1))
      const grad = g.createLinearGradient(barX, 0, barX + barW, 0)
      grad.addColorStop(0, `rgba(${mid.colB[0]},${mid.colB[1]},${mid.colB[2]},0.55)`)
      grad.addColorStop(1, `rgba(${mid.colA[0]},${mid.colA[1]},${mid.colA[2]},0.45)`)

      g.fillStyle = grad
      g.beginPath()
      roundRect(barX, rowY + 2, fillW, barH, 999)
      g.fill()

      g.globalAlpha = 0.35
      g.fillStyle = "rgba(255,255,255,1)"
      g.fillRect(barX + 8, rowY + 4, Math.max(0, fillW - 16), 1)
      g.globalAlpha = 1

      g.fillStyle = "rgba(255,255,255,0.74)"
      g.textAlign = "right"
      g.fillText(`${Math.round(value * 100)}%`, pctX, rowY + 11)
      g.textAlign = "left"
    }

    statBar("Speed", clamp(mid.speed / 1.20, 0, 1), 0)
    statBar("Jump", clamp(mid.jump / 1.20, 0, 1), 1)
    statBar("Drop", clamp(mid.drop / 1.20, 0, 1), 2)

  g.fillStyle = hoverMid ? "rgba(255,220,80,0.92)" : "rgba(255,255,255,0.70)"
  g.font = "700 13px system-ui, Segoe UI, Arial"
  g.textAlign = "center"
  g.fillText("Rotate on the sides, choose in the centre", centerX, H - 18)
  g.textAlign = "left"

  if (state.selectFlash > 0) {
    const a = clamp(state.selectFlash / 0.25, 0, 1)
    g.globalAlpha = a

    const col = state.selectFlashCol
    const burst = g.createRadialGradient(centerX, centerY - 20, 10, centerX, centerY - 20, 240)
    burst.addColorStop(0, `rgba(${col[0]},${col[1]},${col[2]},0.24)`)
    burst.addColorStop(1, "rgba(0,0,0,0)")
    g.fillStyle = burst
    g.beginPath()
    g.arc(centerX, centerY - 20, 240, 0, Math.PI * 2)
    g.fill()

    g.globalAlpha = 1
  }
}

  function updateModeBriefing(dt) {
    state.totalT += dt
    computeDifficulty()
    parallax(dt, 220)

    if (state.briefingLockT > 0) {
      state.briefingLockT = Math.max(0, state.briefingLockT - dt)
    }

    if (state.briefingLockT <= 0) {
      state.briefingReady = true
    }
  }

  function drawBriefingScreen() {
    drawSky()
    drawParallax()
    drawPlanet()
    drawLanes()

    const pulse = 0.82 + 0.18 * Math.sin(state.totalT * 4.2)

    function panel(x, y, w, h) {
      g.fillStyle = "rgba(0,0,0,0.42)"
      g.beginPath()
      roundRect(x, y, w, h, 22)
      g.fill()

      const rim = g.createLinearGradient(x, y, x + w, y + h)
      rim.addColorStop(0, "rgba(255,255,255,0.14)")
      rim.addColorStop(1, "rgba(0,229,255,0.10)")
      g.strokeStyle = rim
      g.lineWidth = 2
      g.stroke()

      g.globalAlpha = 0.25
      g.strokeStyle = "rgba(255,255,255,0.16)"
      g.beginPath()
      roundRect(x + 4, y + 4, w - 8, h - 8, 18)
      g.stroke()
      g.globalAlpha = 1
    }

    function drawCoinIcon(x, y) {
      circleGlow(x, y, 11, pulse, [255, 220, 80])

      g.fillStyle = "rgba(255,220,80,0.96)"
      g.beginPath()
      g.arc(x, y, 11, 0, Math.PI * 2)
      g.fill()

      g.strokeStyle = "rgba(0,0,0,0.42)"
      g.lineWidth = 2
      g.beginPath()
      g.arc(x, y, 11, 0, Math.PI * 2)
      g.stroke()

      g.strokeStyle = "rgba(255,245,180,0.90)"
      g.lineWidth = 2.5
      g.beginPath()
      g.arc(x, y, 6.2, 0, Math.PI * 2)
      g.stroke()
    }

    function drawGemIcon(x, y) {
      g.save()
      g.globalCompositeOperation = "lighter"

      const glow = g.createRadialGradient(x, y, 2, x, y, 34)
      glow.addColorStop(0, "rgba(0,255,140,0.24)")
      glow.addColorStop(1, "rgba(0,0,0,0)")
      g.fillStyle = glow
      g.beginPath()
      g.arc(x, y, 34, 0, Math.PI * 2)
      g.fill()

      g.restore()

      g.fillStyle = "rgba(0,255,140,0.96)"
      g.beginPath()
      g.moveTo(x, y - 14)
      g.lineTo(x + 10, y - 2)
      g.lineTo(x, y + 14)
      g.lineTo(x - 10, y - 2)
      g.closePath()
      g.fill()

      g.strokeStyle = "rgba(0,0,0,0.40)"
      g.lineWidth = 2
      g.stroke()
    }

    function drawBubbleIcon(x, y) {
      circleGlow(x, y, 12, pulse, [80, 180, 255])

      g.fillStyle = "rgba(80,180,255,0.18)"
      g.beginPath()
      g.arc(x, y, 15, 0, Math.PI * 2)
      g.fill()

      g.strokeStyle = "rgba(255,255,255,0.26)"
      g.lineWidth = 2
      g.beginPath()
      g.arc(x, y, 13, 0, Math.PI * 2)
      g.stroke()

      g.fillStyle = "rgba(255,255,255,0.92)"
      g.beginPath()
      g.moveTo(x, y - 8)
      g.lineTo(x + 7, y - 3)
      g.lineTo(x + 5, y + 6)
      g.lineTo(x, y + 9)
      g.lineTo(x - 5, y + 6)
      g.lineTo(x - 7, y - 3)
      g.closePath()
      g.fill()
    }

    function drawSpeedIcon(x, y) {
      circleGlow(x, y, 12, pulse, [255, 180, 0])

      g.fillStyle = "rgba(255,180,0,0.94)"
      g.beginPath()
      g.moveTo(x, y - 13)
      g.lineTo(x + 11, y - 6)
      g.lineTo(x + 11, y + 6)
      g.lineTo(x, y + 13)
      g.lineTo(x - 11, y + 6)
      g.lineTo(x - 11, y - 6)
      g.closePath()
      g.fill()

      g.strokeStyle = "rgba(0,0,0,0.42)"
      g.lineWidth = 2
      g.stroke()
    }

    function drawSpringsIcon(x, y) {
      drawSpikyPickup(x, y, 8, 18, 9)

      g.save()
      g.globalCompositeOperation = "lighter"
      const glow = g.createRadialGradient(x, y, 2, x, y, 30)
      glow.addColorStop(0, "rgba(255,60,90,0.16)")
      glow.addColorStop(1, "rgba(0,0,0,0)")
      g.fillStyle = glow
      g.beginPath()
      g.arc(x, y, 30, 0, Math.PI * 2)
      g.fill()
      g.restore()

      g.fillStyle = "rgba(255,60,90,0.92)"
      g.beginPath()
      g.arc(x, y, 6, 0, Math.PI * 2)
      g.fill()
    }

    g.fillStyle = "rgba(0,0,0,0.44)"
    g.fillRect(0, 0, W, H)

    g.fillStyle = "rgba(255,255,255,0.94)"
    g.font = "900 38px system-ui, Segoe UI, Arial"
    g.textAlign = "center"
    g.fillText("How to survive", W * 0.5, 64)

    g.fillStyle = "rgba(255,255,255,0.62)"
    g.font = "700 14px system-ui, Segoe UI, Arial"
    g.fillText("Read this once, then click or tap to begin", W * 0.5, 88)

    const panelW = Math.min(420, W * 0.36)
    const panelH = 282
    const gap = 30
    const leftX = W * 0.5 - panelW - gap * 0.5
    const rightX = W * 0.5 + gap * 0.5
    const panelY = 106

    panel(leftX, panelY, panelW, panelH)
    panel(rightX, panelY, panelW, panelH)

    g.textAlign = "left"
    g.fillStyle = "rgba(255,255,255,0.92)"
    g.font = "800 18px system-ui, Segoe UI, Arial"
    g.fillText("Pickups and warnings", leftX + 22, panelY + 30)

    let rowY = panelY + 66

    drawCoinIcon(leftX + 30, rowY)
    g.fillStyle = "rgba(255,255,255,0.88)"
    g.font = "800 14px system-ui, Segoe UI, Arial"
    g.fillText("Coin", leftX + 58, rowY + 5)
    g.fillStyle = "rgba(255,255,255,0.56)"
    g.font = "700 12px system-ui, Segoe UI, Arial"
    g.fillText("Adds score", leftX + 168, rowY + 5)

    rowY += 40
    drawGemIcon(leftX + 30, rowY)
    g.fillStyle = "rgba(255,255,255,0.88)"
    g.font = "800 14px system-ui, Segoe UI, Arial"
    g.fillText("Gem", leftX + 58, rowY + 5)
    g.fillStyle = "rgba(255,255,255,0.56)"
    g.font = "700 12px system-ui, Segoe UI, Arial"
    g.fillText("Raises your multiplier", leftX + 168, rowY + 5)

    rowY += 40
    drawBubbleIcon(leftX + 30, rowY)
    g.fillStyle = "rgba(255,255,255,0.88)"
    g.font = "800 14px system-ui, Segoe UI, Arial"
    g.fillText("Bubble", leftX + 58, rowY + 5)
    g.fillStyle = "rgba(255,255,255,0.56)"
    g.font = "700 12px system-ui, Segoe UI, Arial"
    g.fillText("Shield, saves one hit", leftX + 168, rowY + 5)

    rowY += 40
    drawSpeedIcon(leftX + 30, rowY)
    g.fillStyle = "rgba(255,255,255,0.88)"
    g.font = "800 14px system-ui, Segoe UI, Arial"
    g.fillText("Pocket watch", leftX + 58, rowY + 5)
    g.fillStyle = "rgba(255,255,255,0.56)"
    g.font = "700 12px system-ui, Segoe UI, Arial"
    g.fillText("Temporary speed boost", leftX + 168, rowY + 5)

    rowY += 48
    drawSpringsIcon(leftX + 30, rowY)
    g.fillStyle = "rgba(255,255,255,0.88)"
    g.font = "900 14px system-ui, Segoe UI, Arial"
    g.fillText("Springs", leftX + 58, rowY + 5)
    g.fillStyle = "rgba(255,80,90,0.92)"
    g.font = "900 13px system-ui, Segoe UI, Arial"
    g.fillText("= You're gonna have a bad time", leftX + 168, rowY + 5)

    g.fillStyle = "rgba(255,255,255,0.92)"
    g.font = "800 18px system-ui, Segoe UI, Arial"
    g.fillText("Controls", rightX + 22, panelY + 30)

    g.fillStyle = "rgba(255,255,255,0.72)"
    g.font = "800 13px system-ui, Segoe UI, Arial"
    g.fillText("Mouse", rightX + 22, panelY + 62)

    g.fillStyle = "rgba(255,255,255,0.88)"
    g.font = "800 14px system-ui, Segoe UI, Arial"
    g.fillText("Left click, hold then release", rightX + 22, panelY + 88)
    g.fillStyle = "rgba(255,255,255,0.56)"
    g.font = "700 12px system-ui, Segoe UI, Arial"
    g.fillText("Jump, short or long depending on hold time", rightX + 22, panelY + 106)

    g.fillStyle = "rgba(255,255,255,0.88)"
    g.font = "800 14px system-ui, Segoe UI, Arial"
    g.fillText("Right click", rightX + 22, panelY + 138)
    g.fillStyle = "rgba(255,255,255,0.56)"
    g.font = "700 12px system-ui, Segoe UI, Arial"
    g.fillText("Fast drop to the lower lane", rightX + 22, panelY + 156)

    g.fillStyle = "rgba(255,255,255,0.72)"
    g.font = "800 13px system-ui, Segoe UI, Arial"
    g.fillText("Keyboard", rightX + 22, panelY + 182)
    g.fillStyle = "rgba(255,255,255,0.88)"
    g.font = "800 14px system-ui, Segoe UI, Arial"
    g.fillText("Z = jump", rightX + 22, panelY + 208)
    g.fillText("X = fast drop", rightX + 22, panelY + 232)

    g.fillStyle = "rgba(255,255,255,0.56)"
    g.font = "700 12px system-ui, Segoe UI, Arial"
    g.fillText("Z and X mirror the mouse controls", rightX + 22, panelY + 254)
    g.fillText("Springs are a trap, not a power up", rightX + 22, panelY + 272)

    g.textAlign = "center"
    g.fillStyle = "rgba(255,255,255,0.92)"
    g.font = "800 15px system-ui, Segoe UI, Arial"
    g.fillText(
      state.briefingReady ? "Click, tap, Z or Enter to begin" : "Get ready...",
      W * 0.5,
      H - 28
    )
  }

  function drawIntro() {
    drawSky()
    drawParallax()
    drawPlanet()
    drawLanes()
    drawScooterGhost()
    drawTopFocus()

    ui.introT += state.dt

    const t = ui.introT
    const total = 3
    const remaining = Math.max(0, total - t)
    const count = Math.max(1, Math.ceil(remaining))
    const secT = t % 1
    const pulse = 1 + 0.10 * Math.sin(secT * Math.PI)
    const aIn = clamp(t / 0.18, 0, 1)
    const aOut = clamp((3.05 - t) / 0.20, 0, 1)
    const a = Math.min(aIn, aOut)

    const st = currentStage()
    const c = currentChar()

    const cx = W * 0.5
    const cloudY = H * 0.24

    function puff(x, y, r, alpha) {
      const grad = g.createRadialGradient(x, y, 2, x, y, r)
      grad.addColorStop(0, `rgba(255,255,255,${alpha})`)
      grad.addColorStop(0.55, `rgba(210,240,255,${alpha * 0.55})`)
      grad.addColorStop(1, "rgba(0,0,0,0)")
      g.fillStyle = grad
      g.beginPath()
      g.arc(x, y, r, 0, Math.PI * 2)
      g.fill()
    }

    g.fillStyle = "rgba(0,0,0,0.34)"
    g.fillRect(0, 0, W, H)

    g.save()
    g.globalAlpha = a

    puff(cx - 72, cloudY + 10, 68 * pulse, 0.18)
    puff(cx - 18, cloudY - 8, 76 * pulse, 0.20)
    puff(cx + 48, cloudY + 6, 64 * pulse, 0.18)
    puff(cx + 104, cloudY + 18, 48 * pulse, 0.14)

    g.fillStyle = "rgba(0,0,0,0.26)"
    g.beginPath()
    roundRect(cx - 280, H * 0.42, 560, 148, 24)
    g.fill()

    const rim = g.createLinearGradient(cx - 280, H * 0.42, cx + 280, H * 0.42 + 148)
    rim.addColorStop(0, "rgba(255,255,255,0.14)")
    rim.addColorStop(1, `rgba(${c.colB[0]},${c.colB[1]},${c.colB[2]},0.12)`)
    g.strokeStyle = rim
    g.lineWidth = 2
    g.stroke()

    g.globalAlpha = a * 0.26
    g.strokeStyle = "rgba(255,255,255,0.18)"
    g.beginPath()
    roundRect(cx - 276, H * 0.42 + 4, 552, 140, 20)
    g.stroke()
    g.globalAlpha = a

    g.fillStyle = "rgba(255,255,255,0.92)"
    g.font = "900 24px system-ui, Segoe UI, Arial"
    g.textAlign = "center"
    g.fillText("GET READY", cx, H * 0.39)

    g.save()
    g.translate(cx, cloudY)
    g.scale(pulse, pulse)

    g.lineWidth = 7
    g.strokeStyle = "rgba(0,0,0,0.72)"
    g.fillStyle = "rgba(255,255,255,0.97)"
    g.shadowBlur = 26
    g.shadowColor = `rgba(${c.colB[0]},${c.colB[1]},${c.colB[2]},0.28)`
    g.font = "900 92px system-ui, Segoe UI, Arial"
    g.textAlign = "center"
    g.strokeText(String(count), 0, 42)
    g.fillText(String(count), 0, 42)

    g.restore()

    function pill(x, y, w, label, tint) {
      g.fillStyle = "rgba(255,255,255,0.08)"
      g.beginPath()
      roundRect(x, y, w, 28, 999)
      g.fill()

      g.fillStyle = `rgba(${tint[0]},${tint[1]},${tint[2]},0.92)`
      g.beginPath()
      g.arc(x + 14, y + 14, 5, 0, Math.PI * 2)
      g.fill()

      g.fillStyle = "rgba(255,255,255,0.88)"
      g.font = "800 12px system-ui, Segoe UI, Arial"
      g.textAlign = "left"
      g.fillText(label, x + 28, y + 18)
    }

    const panelX = cx - 280
    const panelY = H * 0.42

    pill(panelX + 22, panelY + 18, 108, c.name, c.colB)
    pill(panelX + 142, panelY + 18, 110, `LEVEL ${state.stageIdx + 1}`, [0, 255, 140])
    pill(panelX + 264, panelY + 18, 214, String(st.name).toUpperCase(), [255, 220, 80])

    g.fillStyle = "rgba(255,255,255,0.90)"
    g.font = "900 18px system-ui, Segoe UI, Arial"
    g.textAlign = "center"
    g.fillText("Left click or Z to jump", cx, panelY + 76)

    g.fillStyle = "rgba(255,255,255,0.64)"
    g.font = "800 15px system-ui, Segoe UI, Arial"
    g.fillText("Right click or X to fast drop", cx, panelY + 102)

    g.fillStyle = "rgba(255,80,90,0.92)"
    g.font = "900 14px system-ui, Segoe UI, Arial"
    g.fillText("Springs are bad", cx, panelY + 128)

    g.restore()

    g.textAlign = "left"
    g.globalAlpha = 1
  }

  function drawCompletionLegend() {
    const t = state.thanksT
    const a = clamp(t / 0.40, 0, 1)

    g.save()
    g.globalAlpha = a

    g.fillStyle = "rgba(0,0,0,0.35)"
    g.fillRect(0, 0, W, H)

    const cx = W * 0.5
    const cy = H * 0.45

    g.save()
    g.globalCompositeOperation = "lighter"

    const crown = g.createRadialGradient(cx, cy - 30, 10, cx, cy - 30, 280)
    crown.addColorStop(0, "rgba(255,220,80,0.20)")
    crown.addColorStop(1, "rgba(0,0,0,0)")
    g.fillStyle = crown
    g.beginPath()
    g.arc(cx, cy - 30, 280, 0, Math.PI * 2)
    g.fill()

    g.restore()

    g.fillStyle = "rgba(255,220,80,0.92)"
    g.font = "900 52px system-ui, Segoe UI, Arial"
    g.textAlign = "center"
    g.fillText("LEGEND", cx, cy - 18)

    g.fillStyle = "rgba(255,255,255,0.78)"
    g.font = "800 16px system-ui, Segoe UI, Arial"
    g.fillText("Completion bonus +5000", cx, cy + 18)

    g.fillStyle = "rgba(255,255,255,0.62)"
    g.font = "700 14px system-ui, Segoe UI, Arial"
    g.fillText("Godliness in the gaming sphere confirmed", cx, cy + 44)

    g.textAlign = "left"
    g.restore()
  }

  // ============================================================
  // LEADERBOARD
  // ============================================================
  async function fetchLeaderboard() {
    const { data, error } = await supabase
      .from("scores")
      .select("name, score, char, completed, created_at")
      .eq("mode", "runner")
      .order("score", { ascending: false })
      .order("created_at", { ascending: true })
      .limit(10)

    if (error) {
      console.log("fetchLeaderboard error", error)
      return null
    }

    return Array.isArray(data) ? data : []
  }

  async function getLeaderboard() {
    const rows = await fetchLeaderboard()

    if (!rows) {
      const local = safeReadJson(LB_KEY, [])
      state.leaderboard = Array.isArray(local) ? local : []
      return state.leaderboard
    }

    const next = rows.map(r => ({
      name: r.name || "---",
      score: Number(r.score) || 0,
      char: r.char || "",
      completed: !!r.completed,
      ts: r.created_at ? new Date(r.created_at).getTime() : Date.now()
    }))

    state.leaderboard = next
    safeWriteJson(LB_KEY, next)
    return next
  }

  async function qualifies(score) {
    if (!state.leaderboard || !state.leaderboard.length) {
      await getLeaderboard()
    }

    const lb = state.leaderboard || []
    if (lb.length < 10) return true
    return score > lb[lb.length - 1].score
  }

  function sanitizeInitials(s) {
    const up = String(s || "").toUpperCase()
    const clean = up.replace(/[^A-Z0-9]/g, "").slice(0, 3)
    return clean || "YOU"
  }

  async function maybePromptForLeaderboard(score) {
    const ok = await qualifies(score)
    if (!ok) return

    state.pendingSave = { score }
    state.lbT = 0
    nameModal.classList.remove("hidden")
    initialsInput.value = ""
    initialsInput.focus()
  }

  async function saveLeaderboardEntry(name, score, char, completed) {
    const payload = {
      name: sanitizeInitials(name),
      score: Number(score) || 0,
      char: char || null,
      completed: !!completed,
      mode: "runner"
    }

    const { error } = await supabase
      .from("scores")
      .insert([payload])

    if (error) {
      console.log("saveLeaderboardEntry error", error)

      const local = safeReadJson(LB_KEY, [])
      const merged = (Array.isArray(local) ? local : []).concat([{
        name: payload.name,
        score: payload.score,
        char: payload.char || "",
        completed: payload.completed,
        ts: Date.now()
      }])

      merged.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score
        return (a.ts || 0) - (b.ts || 0)
      })

      const top10 = merged.slice(0, 10)
      safeWriteJson(LB_KEY, top10)
      state.leaderboard = top10
      return false
    }

    return true
  }

  async function submitLeaderboardEntry() {
    if (!state.pendingSave) return

    const name = sanitizeInitials(initialsInput.value)

    await saveLeaderboardEntry(
      name,
      state.pendingSave.score,
      currentChar().name,
      state.completedRun
    )

    await getLeaderboard()

    state.pendingSave = null
    nameModal.classList.add("hidden")
    state.lbT = 0
  }

  function drawLeaderboard(x, y) {
    const lb = state.leaderboard || []

    const w = 360
    const h = 260
    const pad = 18
    const t = state.lbT || 0

    g.save()
    g.globalAlpha = 0.92

    const bg = g.createLinearGradient(x, y, x, y + h)
    bg.addColorStop(0, "rgba(0,0,0,0.48)")
    bg.addColorStop(1, "rgba(0,0,0,0.264)")
    g.fillStyle = bg
    g.beginPath()
    roundRect(x, y, w, h, 18)
    g.fill()

    const rim = g.createLinearGradient(x, y, x + w, y + h)
    rim.addColorStop(0, "rgba(255,255,255,0.14)")
    rim.addColorStop(1, "rgba(0,229,255,0.08)")
    g.strokeStyle = rim
    g.lineWidth = 2
    g.stroke()

    g.globalAlpha = 0.35
    g.strokeStyle = "rgba(255,255,255,0.20)"
    g.lineWidth = 1
    g.beginPath()
    roundRect(x + 3, y + 3, w - 6, h - 6, 16)
    g.stroke()
    g.globalAlpha = 1

    {
      const p = clamp((t - 0.15) / 1.25, 0, 1)
      const sweep = -0.6 + p * 2.2

      g.save()
      g.globalCompositeOperation = "lighter"
      g.beginPath()
      roundRect(x, y, w, h, 18)
      g.clip()

      g.translate(x + w * 0.5, y + h * 0.5)
      g.rotate(-0.35)
      g.translate(-(x + w * 0.5), -(y + h * 0.5))

      const gx0 = x - w * 1.1 + sweep * w * 1.4
      const grad = g.createLinearGradient(gx0, y - h, gx0 + w * 0.9, y + h)
      grad.addColorStop(0.00, "rgba(255,255,255,0)")
      grad.addColorStop(0.48, "rgba(255,255,255,0.06)")
      grad.addColorStop(0.53, "rgba(255,255,255,0.18)")
      grad.addColorStop(0.60, "rgba(255,255,255,0.06)")
      grad.addColorStop(1.00, "rgba(255,255,255,0)")

      g.fillStyle = grad
      g.fillRect(x - w, y - h, w * 3, h * 3)
      g.restore()
    }

    g.fillStyle = "rgba(255,255,255,0.92)"
    g.font = "900 18px system-ui, Segoe UI, Arial"
    g.textAlign = "left"
    g.fillText("Leaderboard", x + pad, y + 28)

    g.fillStyle = "rgba(255,255,255,0.55)"
    g.font = "700 12px system-ui, Segoe UI, Arial"
    g.fillText("Top 10", x + pad, y + 46)

    const rowY0 = y + 72
    const rowH = 18

    function medalCol(i) {
      if (i === 0) return [255, 220, 80]
      if (i === 1) return [210, 230, 255]
      if (i === 2) return [255, 170, 90]
      return [0, 229, 255]
    }

    for (let i = 0; i < 10; i++) {
      const yy = rowY0 + i * rowH
      const row = lb[i]

      const a = clamp((t - i * 0.06) / 0.22, 0, 1)
      if (a <= 0) continue

      g.save()
      g.globalAlpha = a

      g.globalAlpha = a * 0.35
      g.fillStyle = "rgba(255,255,255,0.10)"
      g.fillRect(x + pad, yy + 10, w - pad * 2, 1)
      g.globalAlpha = a

      if (i < 3) {
        const c = medalCol(i)
        const rr = c[0]
        const gg = c[1]
        const bb = c[2]

        const mx = x + pad + 10
        const my = yy + 2

        const glow = g.createRadialGradient(mx, my, 2, mx, my, 18)
        glow.addColorStop(0, `rgba(${rr},${gg},${bb},0.22)`)
        glow.addColorStop(1, "rgba(0,0,0,0)")
        g.fillStyle = glow
        g.beginPath()
        g.arc(mx, my, 18, 0, Math.PI * 2)
        g.fill()

        g.fillStyle = `rgba(${rr},${gg},${bb},0.92)`
        g.beginPath()
        g.arc(mx, my, 7, 0, Math.PI * 2)
        g.fill()

        g.fillStyle = "rgba(0,0,0,0.55)"
        g.font = "900 10px system-ui, Segoe UI, Arial"
        g.textAlign = "center"
        g.fillText(String(i + 1), mx, my + 3)
        g.textAlign = "left"
      } else {
        g.fillStyle = "rgba(255,255,255,0.55)"
        g.font = "800 12px system-ui, Segoe UI, Arial"
        g.fillText(`${i + 1}.`, x + pad, yy + 6)
      }

      const nameX = x + pad + 34
      const scoreX = x + w - pad - 92
      const charX = x + w - pad

      if (row) {
        const isGold = !!row.completed

        g.fillStyle = isGold ? "rgba(255,220,80,0.92)" : "rgba(255,255,255,0.88)"
        g.font = "900 12px system-ui, Segoe UI, Arial"
        g.fillText(row.name, nameX, yy + 6)

        g.fillStyle = "rgba(255,255,255,0.70)"
        g.font = "800 12px system-ui, Segoe UI, Arial"
        g.textAlign = "right"
        g.fillText(String(row.score), scoreX, yy + 6)

        g.fillStyle = "rgba(255,255,255,0.45)"
        g.font = "700 12px system-ui, Segoe UI, Arial"
        g.fillText(row.char || "", charX, yy + 6)
        g.textAlign = "left"
      } else {
        g.fillStyle = "rgba(255,255,255,0.30)"
        g.font = "800 12px system-ui, Segoe UI, Arial"
        g.fillText("---", nameX, yy + 6)
      }

      g.restore()
    }

    g.restore()
  }

  function drawGameOver() {
    const cx = W * 0.5
    const cy = H * 0.5

    function drawScoreBurst(x, y, score) {
      const pulse = 1 + 0.03 * Math.sin(ui.thankYouBreath * 3.0)
      const outer = 60 * pulse
      const inner = 34 * pulse
      const spikes = 8

      g.save()
      g.translate(x, y)
      g.rotate(-0.14)

      g.beginPath()
      for (let i = 0; i < spikes * 2; i++) {
        const r = i % 2 === 0 ? outer : inner
        const a = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2
        const px = Math.cos(a) * r
        const py = Math.sin(a) * r
        if (i === 0) g.moveTo(px, py)
        else g.lineTo(px, py)
      }
      g.closePath()

      g.fillStyle = "rgba(0,0,0,0.96)"
      g.fill()
      g.lineWidth = 6
      g.strokeStyle = "rgba(0,0,0,1)"
      g.stroke()

      g.fillStyle = "rgba(255,220,40,1)"
      g.fill()

      g.fillStyle = "rgba(255,120,120,0.18)"
      for (let i = 0; i < 14; i++) {
        const dx = -24 + (i % 5) * 12
        const dy = -18 + Math.floor(i / 5) * 12
        g.beginPath()
        g.arc(dx, dy, 2.2, 0, Math.PI * 2)
        g.fill()
      }

      g.fillStyle = "rgba(0,0,0,0.82)"
      g.font = "900 11px system-ui, Segoe UI, Arial"
      g.textAlign = "center"
      g.fillText("SCORE", 0, -14)

      g.lineWidth = 4
      g.strokeStyle = "rgba(0,0,0,1)"
      g.font = "900 30px system-ui, Segoe UI, Arial"
      g.strokeText(String(score), 0, 18)

      g.fillStyle = "rgba(255,40,40,1)"
      g.fillText(String(score), 0, 18)

      g.restore()
    }

    g.fillStyle = "rgba(0,0,0,0.68)"
    g.fillRect(0, 0, W, H)

    g.fillStyle = "rgba(255,255,255,0.94)"
    g.font = "900 64px system-ui, Segoe UI, Arial"
    g.textAlign = "center"
    g.fillText("GAME OVER", cx, cy - 108)

    g.fillStyle = "rgba(255,255,255,0.58)"
    g.font = "700 15px system-ui, Segoe UI, Arial"
    g.fillText("Run summary", cx, cy - 78)

    const panelX = cx + 72
    const panelY = cy - 8
    const panelW = 330
    const panelH = 174

    g.save()

    g.fillStyle = "rgba(0,0,0,0.40)"
    g.beginPath()
    roundRect(panelX - panelW / 2, panelY - panelH / 2, panelW, panelH, 22)
    g.fill()

    const rim = g.createLinearGradient(panelX - panelW / 2, panelY - panelH / 2, panelX + panelW / 2, panelY + panelH / 2)
    rim.addColorStop(0, "rgba(255,255,255,0.14)")
    rim.addColorStop(1, "rgba(0,229,255,0.10)")
    g.strokeStyle = rim
    g.lineWidth = 2
    g.stroke()

    g.globalAlpha = 0.28
    g.strokeStyle = "rgba(255,255,255,0.20)"
    g.beginPath()
    roundRect(panelX - panelW / 2 + 4, panelY - panelH / 2 + 4, panelW - 8, panelH - 8, 18)
    g.stroke()
    g.globalAlpha = 1

    drawScoreBurst(panelX + 96, panelY - 28, state.score)

    g.textAlign = "left"
    g.font = "800 16px system-ui, Segoe UI, Arial"
    g.fillStyle = "rgba(0,255,140,0.92)"
    g.fillText(`Gems ${state.gems} / 6`, panelX - 134, panelY - 10)
    g.fillText(`Mult x${state.gemMult}`, panelX - 134, panelY + 18)
    g.fillText(`Final ${state.score}`, panelX - 134, panelY + 46)

    g.fillStyle = "rgba(255,255,255,0.54)"
    g.font = "700 12px system-ui, Segoe UI, Arial"
    g.fillText("Multiplier rule", panelX - 134, panelY + 80)
    g.fillText("1 gem = x2", panelX - 134, panelY + 100)
    g.fillText("2 gems = x3", panelX - 134, panelY + 118)
    g.fillText("3 gems = x4", panelX - 134, panelY + 136)
    g.fillText("6 gems = x7", panelX - 134, panelY + 154)

    const gemRowX = panelX + 8
    const gemRowY = panelY + 108
    for (let i = 0; i < state.gems; i++) {
      g.fillStyle = "rgba(0,255,140,0.76)"
      g.beginPath()
      g.moveTo(gemRowX + i * 24, gemRowY - 10)
      g.lineTo(gemRowX + 8 + i * 24, gemRowY)
      g.lineTo(gemRowX + i * 24, gemRowY + 10)
      g.lineTo(gemRowX - 8 + i * 24, gemRowY)
      g.closePath()
      g.fill()

      g.fillStyle = "rgba(255,255,255,0.42)"
      g.beginPath()
      g.arc(gemRowX - 2 + i * 24, gemRowY - 4, 2.2, 0, Math.PI * 2)
      g.fill()
    }

    g.restore()

    g.textAlign = "left"
    drawLeaderboard(64, 64)

    ui.thankYouBreath += state.dt
    const swell = 1 + 0.02 * Math.sin(ui.thankYouBreath * 2.2)

  const btnW = 170
  const btnH = 42
  const btnX = W - 230
  const btnY = H - 72

  state.restartBtn = {
    x: btnX,
    y: btnY,
    w: btnW,
    h: btnH
  }

  g.save()
  g.translate(btnX + btnW * 0.5, btnY + btnH * 0.5)
  g.scale(swell, swell)

  g.fillStyle = "rgba(0,0,0,0.42)"
  g.beginPath()
  roundRect(-btnW / 2, -btnH / 2, btnW, btnH, 14)
  g.fill()

  g.strokeStyle = "rgba(255,255,255,0.16)"
  g.lineWidth = 2
  g.beginPath()
  roundRect(-btnW / 2, -btnH / 2, btnW, btnH, 14)
  g.stroke()

  g.fillStyle = "rgba(255,255,255,0.92)"
  g.font = "800 15px system-ui, Segoe UI, Arial"
  g.textAlign = "center"
  g.fillText("Play again", 0, 6)

  g.restore()

  g.fillStyle = "rgba(255,255,255,0.92)"
  g.font = "800 14px system-ui, Segoe UI, Arial"
  g.textAlign = "left"
  g.fillText("Good effort", W - 240, H - 88)
  }

  // ============================================================
  // GAME STATE HELPERS
  // ============================================================
  function resetTransientInputState() {
    state.rightHeld = false
    state.charging = false
    state.dropArmed = false
    state.jumpQueued = false
    state.queuedChargeAt = 0
    state.queuedCharging = false
    state.queuedChargeMs = 0
    state.touchActive = false
    state.touchId = null
    state.touchDropFired = false
    state.touchJustEnded = false
  }

  function resetFxBuffers() {
    ui.floatTexts.length = 0
    ui.bankCoins.length = 0
    ui.smoke.length = 0
    ui.sparks.length = 0
    ui.redBalls.length = 0
    ui.flash = 0
  }

  function loseLife(hitX, hitY) {
    state.lives = Math.max(0, state.lives - 1)
    ui.flash = 0.20

    spawnSparks(hitX, hitY, [255, 255, 255], 24)
    spawnSparks(hitX, hitY, [0, 229, 255], 18)

    if (state.lives <= 0) {
      playGameOverSfx()
      player.explodeT = 1.2
      state.mode = "death"
      state.running = false
      state.deathPhase = 0
      state.deathT = 0
      state.dead = true
      state.deathHold = 5.0
      state.deathX = hitX
      state.deathY = hitY
      return
    }

    player.invuln = 1.0
    player.shield = false

    for (const ob of obstacles) ob.x += worldSpeed() * 1.2
    addFloatText("LIFE LOST", player.x + 36, player.y - 92, "red")
  }

  function startGame() {
    resetTransientInputState()
    resetFxBuffers()

    applyCharacterStats()

    state.mode = "briefing"
    ui.introT = 0
    state.running = true
    state.briefingReady = false
    state.briefingLockT = 0.9

    state.totalT = 0
    state.stageT = 0

    state.baseSpeed = 320
    state.difficulty = 0.12

    state.score = 0
    state.baseScore = 0

    state.gems = 0
    state.gemMult = 1

    state.stageIdx = 0
    state.stageCountdown = 0
    state.countdownActive = false

    state.distanceM = 0

    state.speedBoostUntil = 0
    state.springsUntil = 0

    state.lives = 3

    state.completedRun = false
    state.completionBonusGranted = false

    state.thanksT = 0
    state.hintT = 0
    state.dead = false
    state.deathT = 0
    state.deathX = 0
    state.deathY = 0
    state.deathPhase = 0

    player.lane = "bot"
    player.landLane = "bot"
    player.y = laneY("bot")
    player.vy = 0
    player.onGround = true
    player.shield = false
    player.invuln = 0
    player.capePhase = 0
    player.explodeT = 0

    obstacles.length = 0
    pickups.length = 0

    state.spawnPlan = buildSpawnPlan(0)
    state.planCursor = { coin: 0, obs: 0, pwr: 0, extra: 0 }
  }

  function moveToStage(idx) {
    state.stageIdx = idx
    state.stageT = 0

    state.spawnPlan = buildSpawnPlan(state.stageIdx)
    state.planCursor = { coin: 0, obs: 0, pwr: 0, extra: 0 }

    state.countdownActive = false
    state.stageCountdown = 0

    playLevelSfx()
  }

  function stageAdvance() {
    if (state.stageIdx >= stages.length - 1) {
      if (!state.completionBonusGranted) {
        state.completionBonusGranted = true
        state.completedRun = true
        state.baseScore += 5000
        state.score = Math.floor(state.baseScore * state.gemMult)
        addFloatText("+5000", W * 0.5, H * 0.33, "gold")
      }

      state.thanksT = 0
      state.mode = "legend"
      return
    }

    moveToStage(state.stageIdx + 1)
  }

  function restartToSelect() {
    resetTransientInputState()
    resetFxBuffers()

    nameModal.classList.add("hidden")
    state.pendingSave = null

    state.mode = "select"
    state.running = true
    state.lbT = 0
    state.totalT = 0
    state.stageIdx = 0
    state.stageT = 0
    state.countdownActive = false
    state.stageCountdown = 0

    state.baseScore = 0
    state.score = 0
    state.gems = 0
    state.gemMult = 1
    state.distanceM = 0

    state.lives = 3
    state.completedRun = false
    state.completionBonusGranted = false
    state.hintT = 0
    state.briefingReady = false
    state.briefingLockT = 0

    state.dead = false
    state.deathT = 0
    state.deathX = 0
    state.deathY = 0
    state.deathPhase = 0

    player.lane = "bot"
    player.landLane = "bot"
    player.y = laneY("bot")
    player.vy = 0
    player.onGround = true
    player.shield = false
    player.invuln = 0
    player.capePhase = 0
    player.explodeT = 0

    obstacles.length = 0
    pickups.length = 0

    state.spawnPlan = buildSpawnPlan(0)
    state.planCursor = { coin: 0, obs: 0, pwr: 0, extra: 0 }

    applyCharacterStats()
  }

  // ============================================================
  // INPUT RESOLUTION
  // ============================================================
  function resolveJump(holdMs, dropNow) {
    const ms = clamp(holdMs, 0, 1500)
    const isLong = ms >= 140
    const basePower = isLong ? 900 : 700
    let power = basePower * player.jumpMul
    let land = player.lane

    if (dropNow) {
      land = "bot"
      power = 560
      addFloatText("DROP", player.x + 36, player.y - 70, "green")
    } else {
      if (player.lane === "bot" && isLong) land = "top"
      if (player.lane === "top" && isLong) land = "top"
      if (player.lane === "bot" && !isLong) land = "bot"
      if (player.lane === "top" && !isLong) land = "top"
    }

    player.landLane = land
    player.onGround = false
    player.vy = -power

    const smokeStrength = dropNow ? 0.8 : (isLong ? 1.2 : 1.0)
    spawnSmoke(player.x + 32, player.y + 6, smokeStrength, isLong ? "red" : "green")
  }

  function springBounce() {
    player.landLane = player.lane
    player.onGround = false
    player.vy = -920 * player.jumpMul
    spawnSmoke(player.x + 32, player.y + 6, 1.15, "green")
  }

  // ============================================================
  // UPDATE
  // ============================================================
  function updateTimers(dt) {
    if (ui.flash > 0) ui.flash = Math.max(0, ui.flash - dt)
    if (state.selectFlash > 0) state.selectFlash = Math.max(0, state.selectFlash - dt)
    if (state.cardGlistenT > 0) state.cardGlistenT = Math.max(0, state.cardGlistenT - dt)
  }

  function updateFx(dt) {
    updateFloatTexts(dt)
    updateBankCoins(dt)
    updateSmoke(dt)
    updateSparks(dt)
    updateRedBalls(dt)
  }

  function updateModeSelect(dt) {
    state.totalT += dt
    computeDifficulty()
    parallax(dt, 220)

    if (state.startPending) {
      state.startDelayT -= dt
      if (state.startDelayT <= 0) {
        state.startPending = false
        startGame()
      }
    }
  }

  function updateModeIntro(dt) {
    state.totalT += dt
    computeDifficulty()
    parallax(dt, 240)

    if (ui.introT >= 3.20) {
      playLevelSfx()
      state.mode = "play"
      state.hintT = 8
    }
  }

  function updateModeLegend(dt) {
    state.thanksT += dt
    state.totalT += dt

    if (state.thanksT > 2.0) {
      state.mode = "gameover"
      state.running = false
      maybePromptForLeaderboard(state.score)
    }
  }

  function updateModeGameover(dt) {
    state.lbT += dt

    if (player.explodeT > 0) {
      player.explodeT -= dt
      if (player.explodeT > 0) {
        spawnSparks(player.x + 40, player.y - 30, [255, 80, 60], 10)
        spawnSparks(player.x + 40, player.y - 30, [255, 220, 80], 8)
      }
    }
  }

  function updateModeDeath(dt) {
    state.deathT += dt

    const cx = state.deathX || (player.x + 40)
    const cy = state.deathY || (player.y - 30)

    if (state.deathPhase === 0) {
      spawnSparks(cx, cy, [255, 80, 60], 6)
      spawnSparks(cx, cy, [255, 220, 80], 4)

      if (state.deathT >= 0.9) {
        state.deathPhase = 1
        ui.flash = 0.4

        spawnRedBalls(cx, cy, REDBALLS_BURST)

        for (let i = 0; i < 18; i++) {
          spawnSparks(cx, cy, [255, 255, 255], 26)
          spawnSparks(cx, cy, [255, 80, 60], 22)
          spawnSparks(cx, cy, [255, 220, 80], 18)
          spawnSmoke(cx, cy, 1.3, "red")
        }
      }

      return
    }

    spawnSparks(cx, cy, [255, 80, 60], 10)
    spawnSparks(cx, cy, [255, 220, 80], 8)

    if (state.deathT >= state.deathHold) {
      state.mode = "gameover"
      state.running = false
      maybePromptForLeaderboard(state.score)
    }
  }

  function updateSpawns(stageSec) {
    consumePlan(stageSec)
  }

  function updateWorldObstacles(dt, spd) {
    for (const o of obstacles) {
      const vx = spd * o.vxMul
      o.x -= vx * dt
      if (o.kind === "snowball") {
        o.y += Math.sin(state.totalT * 2.0 + o.wob) * 0.25
      }
    }

    while (obstacles.length && obstacles[0].x < -220) {
      obstacles.shift()
    }
  }

  function updateWorldPickups(dt, spd) {
    for (const p of pickups) {
      p.x -= spd * dt
    }

    while (pickups.length && pickups[0].x < -140) {
      pickups.shift()
    }
  }

  function updateWorld(dt, spd) {
    state.totalT += dt
    state.stageT += dt
    state.distanceM += (spd * dt) / 6.0

    parallax(dt, spd)

    updateSpawns(state.stageT)
    updateWorldObstacles(dt, spd)
    updateWorldPickups(dt, spd)
  }

  function updatePlayer(dt) {
    player.vy += 1800 * dt
    player.y += player.vy * dt

    if (!player.onGround && state.rightHeld) {
      player.landLane = "bot"
      const dropAcc = 3800 * (player.dropSpeedMul || 1)
      if (player.vy < 2200) player.vy += dropAcc * dt
    }

    if (player.vy >= 0) {
      const ground = laneY(player.landLane)

      if (player.y >= ground) {
        player.y = ground
        player.vy = 0
        player.onGround = true
        player.lane = player.landLane

        if (performance.now() < state.springsUntil) {
          springBounce()
        } else if (state.jumpQueued) {
          if (state.queuedCharging) {
            state.charging = true
            state.chargeAt = state.queuedChargeAt || performance.now()
          } else {
            const held = state.queuedChargeMs || 0
            state.charging = false
            resolveJump(held, false)
          }

          state.jumpQueued = false
          state.queuedCharging = false
          state.queuedChargeAt = 0
          state.queuedChargeMs = 0
          state.dropArmed = false
        }
      }
    }

    if (player.y > lanes.botY) {
      player.y = lanes.botY
      player.vy = 0
      player.onGround = true
      player.lane = "bot"
      player.landLane = "bot"
    }
  }

  function updateScoring(dt) {
    state.baseScore += Math.floor(18 * dt * (1 + state.difficulty))
    state.score = Math.floor(state.baseScore * state.gemMult)
  }

  function updateStageTimer(dt) {
    const left = stageTimeLeft()

    if (!state.countdownActive && left <= 5.0 && left > 0.01) {
      state.countdownActive = true
      state.stageCountdown = 5.0
    }

    if (state.countdownActive) {
      state.stageCountdown -= dt
      if (state.stageCountdown <= 0) {
        state.countdownActive = false
        stageAdvance()
      }
    }
  }

  function devilFairnessGuard(spd) {
    if (currentStage().theme !== "devil") return
    if (player.invuln > 0) return

    const px = player.x
    const ahead = 160
    const width = 120

    let top = null
    let bot = null

    for (const o of obstacles) {
      if (o.x < px + ahead) continue
      if (o.x > px + ahead + width) continue

      if (o.lane === "top" && !top) top = o
      if (o.lane === "bot" && !bot) bot = o
      if (top && bot) break
    }

    if (!top || !bot) return

    const push = spd * 0.55
    if (top.x < bot.x) bot.x += push
    else top.x += push
  }

  function updateCollisions(spd) {
    const px = player.x
    const py = player.y - player.h
    const pw = player.w
    const ph = player.h

    for (const o of obstacles) {
      const ox = o.x
      const oy = o.y - o.h

      const hit = aabb(px + 14, py + 8, pw - 28, ph - 10, ox, oy, o.w, o.h)
      if (!hit) continue
      if (player.invuln > 0) continue

      if (player.shield) {
        player.shield = false
        player.invuln = 0.8
        addFloatText("BUBBLE SHIELD", player.x + 36, player.y - 92, "blue")
        for (const ob of obstacles) ob.x += spd * 1.1
        continue
      }

      loseLife(px + 40, py + 26)
      break
    }

    for (let i = pickups.length - 1; i >= 0; i--) {
      const p = pickups[i]
      const hit = aabb(px + 14, py + 8, pw - 28, ph - 10, p.x - p.r, p.y - p.r, p.r * 2, p.r * 2)
      if (!hit) continue

      pickups.splice(i, 1)

      if (p.type === "coin") {
        state.baseScore += Math.floor(60 * (1 + state.difficulty))
        addFloatText("+COIN", p.x, p.y - 10, "green")
        addBankCoin(p.x, p.y, [0, 229, 255])
        playCoinSfx()
        continue
      }

      if (p.type === "gem") {
        state.gems += 1
        state.gemMult = 1 + state.gems
        addFloatText("GEM", p.x, p.y - 10, "green")
        addBankCoin(p.x, p.y, [0, 255, 140])
        playPopSfx()
        continue
      }

      if (p.type === "pwr") {
        addBankCoin(p.x, p.y, powerupColor(p.kind))

        if (p.kind === "bubble") {
          playPopSfx()
          player.shield = true
          addFloatText("BUBBLE SHIELD", p.x, p.y - 10, "blue")
          continue
        }

        if (p.kind === "speed") {
          playPopSfx()
          state.speedBoostUntil = performance.now() + 10000
          addFloatText("POCKET WATCH", p.x, p.y - 10, "gold")
          continue
        }

        if (p.kind === "springs") {
          playBadSfx()
          state.springsUntil = performance.now() + 3000
          addFloatText("SPRINGS", p.x, p.y - 10, "green")
          continue
        }
      }
    }
  }

  function updatePlay(dt) {
    computeDifficulty()

    if (state.hintT > 0) {
      state.hintT = Math.max(0, state.hintT - dt)
    }

    if (player.invuln > 0) {
      player.invuln = Math.max(0, player.invuln - dt)
    }

    const spd = worldSpeed()

    updateWorld(dt, spd)
    devilFairnessGuard(spd)
    updatePlayer(dt)
    updateScoring(dt)
    updateStageTimer(dt)
    updateCollisions(spd)
  }

  function update(dt) {
    state.dt = dt

    updateTimers(dt)
    updateFx(dt)

    if (state.mode === "select") {
      updateModeSelect(dt)
      return
    }

    if (state.mode === "briefing") {
      updateModeBriefing(dt)
      return
    }

    if (state.mode === "intro") {
      updateModeIntro(dt)
      return
    }

    if (state.mode === "legend") {
      updateModeLegend(dt)
      return
    }

    if (state.mode === "gameover") {
      updateModeGameover(dt)
      return
    }

    if (state.mode === "death") {
      updateModeDeath(dt)
      return
    }

    if (state.mode !== "play") return

    updatePlay(dt)
  }

  // ============================================================
  // RENDER
  // ============================================================
function drawEarlyHint() {
  if (state.hintT <= 0) return

  const total = 8
  const seg = total / 3
  const elapsed = total - state.hintT
  const band = Math.min(2, Math.floor(elapsed / seg))
  const localT = elapsed % seg

  const fadeIn = clamp(localT / 0.20, 0, 1)
  const fadeOut = clamp((seg - localT) / 0.28, 0, 1)
  const a = Math.min(fadeIn, fadeOut, clamp(state.hintT / 0.20, 0, 1))

  const msgs = [
    "Hold for higher jump",
    "Right click or X to drop",
    "Springs are bad"
  ]

  const x = W * 0.64
  const y = H * 0.22
  const w = 340
  const h = 42

  g.save()
  g.globalAlpha = a

  const glow = g.createRadialGradient(x, y, 6, x, y, 140)
  glow.addColorStop(0, "rgba(0,229,255,0.12)")
  glow.addColorStop(1, "rgba(0,0,0,0)")
  g.fillStyle = glow
  g.beginPath()
  g.arc(x, y, 140, 0, Math.PI * 2)
  g.fill()

  g.fillStyle = "rgba(0,0,0,0.42)"
  g.beginPath()
  roundRect(x - w / 2, y - h / 2, w, h, 16)
  g.fill()

  g.strokeStyle = "rgba(255,255,255,0.14)"
  g.lineWidth = 2
  g.beginPath()
  roundRect(x - w / 2, y - h / 2, w, h, 16)
  g.stroke()

  g.fillStyle = band === 2 ? "rgba(255,80,90,0.96)" : "rgba(255,255,255,0.92)"
  g.font = "800 18px system-ui, Segoe UI, Arial"
  g.textAlign = "center"
  g.fillText(msgs[band], x, y + 6)

  g.textAlign = "left"
  g.restore()
}

  function drawPlay() {
    drawSky()
    drawParallax()
    drawPlanet()
    drawLanes()
    drawPickups()
    for (const o of obstacles) drawObstacle(o)

    drawSmoke()
    drawSparks()
    drawRedBalls()
    drawScooterGhost()

    drawTopFocus()
    drawBankCoins()
    drawUI()
    drawEarlyHint()
    drawFloatTexts()

    if (state.mode === "legend") drawCompletionLegend()
  }

  function draw() {
    if (state.mode === "select") {
      drawSelectScreen()
      return
    }

    if (state.mode === "briefing") {
      drawBriefingScreen()
      return
    }

    if (state.mode === "intro") {
      drawIntro()
      return
    }

    if (state.mode === "play" || state.mode === "legend" || state.mode === "death") {
      drawPlay()
      if (state.mode === "legend") drawCompletionLegend()
      return
    }

    drawPlay()
    drawGameOver()
  }

  // ============================================================
  // SELECT SCREEN INPUT
  // ============================================================
function clickSelect(mx, my) {
  const targets = getSelectTargets()
  const idx = state.selectedCharIdx % characters.length

  if (pointInCircle(mx, my, targets.mid.x, targets.mid.y, targets.mid.r)) {
    const c = currentChar()
    state.selectFlash = 0.25
    state.selectFlashCol = c.colB
    state.cardGlistenT = 1.0
    spawnSparks(targets.mid.x, targets.mid.y, c.colB, 28)

    sfx.coin.load()
    sfx.pop.load()
    sfx.bad.load()
    sfx.gameover.load()
    state.startPending = true
    state.startDelayT = 2.0
    return
  }

  if (pointInCircle(mx, my, targets.left.x, targets.left.y, targets.left.r)) {
    state.selectedCharIdx = (idx + characters.length - 1) % characters.length
    const c = currentChar()
    state.selectFlash = 0.20
    state.selectFlashCol = c.colA
    state.cardGlistenT = 1.0
    spawnSparks(targets.left.x, targets.left.y, c.colA, 18)
    return
  }

  if (pointInCircle(mx, my, targets.right.x, targets.right.y, targets.right.r)) {
    state.selectedCharIdx = (idx + 1) % characters.length
    const c = currentChar()
    state.selectFlash = 0.20
    state.selectFlashCol = c.colA
    state.cardGlistenT = 1.0
    spawnSparks(targets.right.x, targets.right.y, c.colA, 18)
  }
}

  // ============================================================
  // MAIN LOOP
  // ============================================================
  function tick(t) {
    const dt = state.last ? clamp((t - state.last) / 1000, 0.001, 0.035) : 0.016
    state.last = t

    update(dt)

    g.clearRect(0, 0, W, H)
    draw()

    requestAnimationFrame(tick)
  }

  // ============================================================
  // INPUT
  // ============================================================
  canvas.addEventListener("contextmenu", (e) => e.preventDefault())
canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect()
  state.mouseX = ((e.clientX - rect.left) / rect.width) * W
  state.mouseY = ((e.clientY - rect.top) / rect.height) * H
})

canvas.addEventListener("mouseleave", () => {
  state.mouseX = -9999
  state.mouseY = -9999
  state.mouseDown = false
})
  canvas.addEventListener("mousedown", (e) => {
    const rect = canvas.getBoundingClientRect()
    const mx = ((e.clientX - rect.left) / rect.width) * W
    const my = ((e.clientY - rect.top) / rect.height) * H

    if (e.button === 2) state.rightHeld = true
    if (state.startPending) return
    if (e.button === 0) state.mouseDown = true
    if (state.mode === "select") {
      if (e.button === 0) clickSelect(mx, my)
      return
    }

    if (state.mode === "briefing") {
      if (e.button === 0 && state.briefingReady) {
        ui.introT = 0
        state.mode = "intro"
      }
      return
    }

    if (state.mode === "gameover") return
    if (state.mode === "intro") return
    if (state.mode !== "play") return

    if (e.button === 0) {
      state.dropArmed = false

      if (player.onGround) {
        state.charging = true
        state.jumpQueued = false
        state.queuedChargeAt = 0
        state.queuedCharging = false
        state.queuedChargeMs = 0
        state.chargeAt = performance.now()
        return
      }

      if (!state.jumpQueued) {
        state.jumpQueued = true
        state.queuedCharging = true
        state.queuedChargeAt = performance.now()
        state.queuedChargeMs = 0
      }

      return
    }

    if (e.button === 2) {
      if (state.charging && player.onGround) {
        state.dropArmed = true
        state.charging = false
        resolveJump(120, true)
        state.dropArmed = false
      }
    }
  })

  canvas.addEventListener("mouseup", (e) => {
    if (state.mode !== "play") return
    if (e.button === 2) state.rightHeld = false
    if (e.button === 0) state.mouseDown = false
    if (e.button === 0) {
      if (state.charging && player.onGround) {
        state.charging = false
        const held = performance.now() - state.chargeAt
        resolveJump(held, false)
        state.dropArmed = false
        return
      }

      if (state.jumpQueued && state.queuedCharging) {
        state.queuedCharging = false
        state.queuedChargeMs = performance.now() - state.queuedChargeAt
        return
      }
    }
  })

  document.addEventListener("keydown", (e) => {
    if (e.repeat) return

    const key = e.key.toLowerCase()

    if (key === "x") state.rightHeld = true
    if (state.startPending) return

    if (state.mode === "briefing") {
      if ((key === "z" || key === "enter") && state.briefingReady) {
        ui.introT = 0
        state.mode = "intro"
      }
      return
    }

    if (state.mode === "gameover") return
    if (state.mode === "intro") return
    if (state.mode !== "play") return

    if (key === "x") {
      if (state.charging && player.onGround) {
        state.dropArmed = true
        state.charging = false
        resolveJump(120, true)
        state.dropArmed = false
      }
      return
    }

    if (key === "z") {
      state.dropArmed = false

      if (player.onGround) {
        state.charging = true
        state.jumpQueued = false
        state.queuedChargeAt = 0
        state.queuedCharging = false
        state.queuedChargeMs = 0
        state.chargeAt = performance.now()
        return
      }

      if (!state.jumpQueued) {
        state.jumpQueued = true
        state.queuedCharging = true
        state.queuedChargeAt = performance.now()
        state.queuedChargeMs = 0
      }
    }
  })

  document.addEventListener("keyup", (e) => {
    const key = e.key.toLowerCase()

    if (state.mode !== "play") {
      if (key === "x") state.rightHeld = false
      return
    }

    if (key === "x") {
      state.rightHeld = false
      return
    }

    if (key === "z") {
      if (state.charging && player.onGround) {
        state.charging = false
        const held = performance.now() - state.chargeAt
        resolveJump(held, false)
        state.dropArmed = false
        return
      }

      if (state.jumpQueued && state.queuedCharging) {
        state.queuedCharging = false
        state.queuedChargeMs = performance.now() - state.queuedChargeAt
      }
    }
  })

  canvas.style.touchAction = "none"

  canvas.addEventListener("touchstart", (e) => {
    e.preventDefault()
    if (!e.changedTouches.length) return

    const t = e.changedTouches[0]
    state.touchActive = true
    state.touchId = t.identifier
    state.touchDropFired = false

    const rect = canvas.getBoundingClientRect()
    const mx = ((t.clientX - rect.left) / rect.width) * W
    const my = ((t.clientY - rect.top) / rect.height) * H

    state.touchStartX = mx
    state.touchStartY = my

    if (state.mode === "select") {
      clickSelect(mx, my)
      return
    }

    if (state.mode === "briefing") {
      if (state.briefingReady) {
        ui.introT = 0
        state.mode = "intro"
      }
      return
    }

    if (state.mode === "gameover") return
    if (state.mode === "intro") return
    if (state.mode !== "play") return
    if (!player.onGround) return

    state.charging = true
    state.dropArmed = false
    state.chargeAt = performance.now()
  }, { passive: false })

  canvas.addEventListener("touchmove", (e) => {
    e.preventDefault()
    if (!state.touchActive) return

    let t = null
    for (const tt of e.changedTouches) {
      if (tt.identifier === state.touchId) t = tt
    }
    if (!t) return

    const rect = canvas.getBoundingClientRect()
    const my = ((t.clientY - rect.top) / rect.height) * H
    const dy = my - state.touchStartY
    const swipeDown = dy > 42

    if (swipeDown && !state.touchDropFired) {
      state.touchDropFired = true

      if (state.mode !== "play") return

      if (state.charging && player.onGround) {
        state.charging = false
        resolveJump(120, true)
        state.dropArmed = false
        return
      }

      if (!player.onGround) {
        state.rightHeld = true
      }
    }
  }, { passive: false })

  canvas.addEventListener("touchend", (e) => {
    e.preventDefault()
    if (!state.touchActive) return

    let ended = false
    for (const tt of e.changedTouches) {
      if (tt.identifier === state.touchId) ended = true
    }
    if (!ended) return

    state.touchActive = false
    state.touchId = null
    state.touchJustEnded = true
    setTimeout(() => { state.touchJustEnded = false }, 250)

    if (state.mode !== "play") return

    state.rightHeld = false

    if (state.charging) {
      state.charging = false
      const held = performance.now() - state.chargeAt
      resolveJump(held, false)
      state.dropArmed = false
    }
  }, { passive: false })

  canvas.addEventListener("touchcancel", (e) => {
    e.preventDefault()
    resetTransientInputState()
  }, { passive: false })

canvas.addEventListener("click", (e) => {
  if (state.touchJustEnded) return
  if (state.mode !== "gameover") return
  if (!nameModal.classList.contains("hidden")) return
  if (!state.restartBtn) return

  const rect = canvas.getBoundingClientRect()
  const mx = ((e.clientX - rect.left) / rect.width) * W
  const my = ((e.clientY - rect.top) / rect.height) * H

  const b = state.restartBtn
  const hit =
    mx >= b.x &&
    mx <= b.x + b.w &&
    my >= b.y &&
    my <= b.y + b.h

  if (hit) restartToSelect()
})

  saveBtn.addEventListener("click", submitLeaderboardEntry)

  initialsInput.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      await submitLeaderboardEntry()
    }
  })

  // ============================================================
  // INIT
  // ============================================================
  async function init() {
    applyCharacterStats()
    state.spawnPlan = buildSpawnPlan(0)
    state.planCursor = { coin: 0, obs: 0, pwr: 0, extra: 0 }

    sfx.coin.load()
    sfx.pop.load()
    sfx.bad.load()
    sfx.gameover.load()

    await getLeaderboard()
    requestAnimationFrame(tick)
  }

  init()
})()

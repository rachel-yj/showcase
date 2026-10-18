/* SHOWCASE — Rachel Li's portfolio.
   Player navigation, page transitions, icon desktops, draggable windows and the top window bar.
   Pages are routed by #hash so the whole site is one index.html (works on GitHub Pages as-is). */
(function () {
  "use strict";

  // ---------- content: pages, their desktop icons, and each window's body ----------
  // All copy is placeholder in [brackets], written as notes to myself. Replace each one with real text.

  // Vector desktop icons (temporary: vectors until real photos are ready)
  const ICON = {
    exe: '<rect class="f-cream" x="5" y="9" width="38" height="30" rx="2"/><path class="f-berry" d="M5 11a2 2 0 0 1 2-2h34a2 2 0 0 1 2 2v6H5z"/><rect class="f-pond" x="10" y="22" width="12" height="11"/><path class="f-none" d="M26 24h12M26 29h9"/>',
    txt: '<path class="f-cream" d="M11 5h18l9 9v29H11z"/><path class="f-milk" d="M29 5v9h9"/><path class="f-none" d="M16 21h16M16 27h16M16 33h11"/>',
    pdf: '<path class="f-cream" d="M11 5h18l9 9v29H11z"/><path class="f-milk" d="M29 5v9h9"/><rect class="f-berry" x="7" y="24" width="25" height="10" rx="1"/><path class="f-none s-cream" d="M11 29h17"/><path class="f-none" d="M16 39h16"/>',
    htm: '<rect class="f-cream" x="4" y="8" width="40" height="32" rx="2"/><path class="f-pond" d="M4 10a2 2 0 0 1 2-2h36a2 2 0 0 1 2 2v6H4z"/><circle class="f-berry" cx="9.5" cy="12" r="1.6"/><circle class="f-matcha" cx="15" cy="12" r="1.6"/><path class="f-none" d="M10 23h28M10 29h20M10 35h24"/>',
    ppt: '<rect class="f-milk" x="12" y="6" width="30" height="22" rx="1"/><rect class="f-cream" x="6" y="13" width="30" height="22" rx="1"/><rect class="f-lily" x="11" y="18" width="11" height="9"/><path class="f-none" d="M26 20h6M26 24h6M11 31h20M21 35v6M15 42h12"/>',
    jpg: '<rect class="f-cream" x="5" y="9" width="38" height="30" rx="2"/><rect class="f-pond" x="9" y="13" width="30" height="22"/><circle class="f-cream" cx="31" cy="19" r="3"/><path class="f-lily" d="M9 35l9-11 7 8 4-4 10 7z"/>',
    mp3: '<circle class="f-pond" cx="24" cy="24" r="18"/><circle class="f-none s-cream" cx="24" cy="24" r="12"/><circle class="f-milk" cx="24" cy="24" r="6"/><circle class="f-cream" cx="24" cy="24" r="2"/>',
    dir: '<path class="f-matcha" d="M5 13a2 2 0 0 1 2-2h11l4 4h19a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z"/><path class="f-none" d="M5 19h38"/>'
  };
  const iconSVG = type => `<svg class="ic" viewBox="0 0 48 48" aria-hidden="true" focusable="false">${ICON[type] || ICON.exe}</svg>`;

  const PAGES = [
    { id: "home", name: "home" },
    { id: "about", name: "about" },
    { id: "experience", name: "experience", title: "Experience", note: "EVERYTHING ON MY RESUME", icons: [
      { id: "education", file: "education.exe", type: "exe", body: `<h3>Education</h3><ul class="lines"><li><span class="when">MAY 2027</span><span><b>Rutgers Business School</b>, Rutgers University–New Brunswick<br>B.S. in Marketing, Global Business concentration<br>Minor in DCIM</span></li></ul>` },
      { id: "work", file: "work_history.exe", type: "exe", body: `<h3>Work history</h3><ul class="lines"><li><span class="when">[dates]</span><span>[my job title, company, and what I did there here.]</span></li><li><span class="when">[dates]</span><span>[my job title, company, and what I did there here.]</span></li></ul>` },
      { id: "consulting", file: "consulting.exe", type: "exe", body: `<h3>Consulting</h3><ul class="lines"><li><span class="when">[dates]</span><span>[my consulting role and what I worked on here.]</span></li></ul>` },
      { id: "leadership", file: "leadership.exe", type: "exe", body: `<h3>Leadership</h3><ul class="lines"><li><span class="when">[dates]</span><span>[my leadership role, organization, and what I led here.]</span></li></ul>` },
      { id: "skills", file: "skills.txt", type: "txt", body: `<h3>Skills</h3><div class="tags"><span class="tag">[skill]</span><span class="tag">[skill]</span><span class="tag">[skill]</span><span class="tag">[skill]</span></div><p>[a line about my skills here.]</p>` },
      { id: "awards", file: "awards.txt", type: "txt", body: `<h3>Awards &amp; certificates</h3><ul class="lines"><li><span class="when">[year]</span><span>[an award or certificate here.]</span></li></ul>` },
      { id: "goals", file: "goals.txt", type: "txt", body: `<h3>Goals</h3><p>[my professional development and goals here.]</p>` },
      { id: "resume", file: "resume.pdf", type: "pdf", body: `<h3>Resume</h3><p>[a line about my resume here.]</p><div class="actions"><span class="btn primary" aria-disabled="true">Open resume &#8599;</span></div>` },
      { id: "linkedin", file: "linkedin.exe", type: "exe", body: `<h3>LinkedIn</h3><p>[my LinkedIn embed here.]</p><div class="actions"><span class="btn" aria-disabled="true">View my profile &#8599;</span></div>` }
    ]},
    { id: "interests", name: "interests", title: "Interests", note: "WHO I AM OFF THE CLOCK", icons: [
      { id: "photos", file: "photo_roll.jpg", type: "jpg", body: `<h3>Photo roll</h3><p>[my photos here.]</p>` },
      { id: "hobbies", file: "hobbies.exe", type: "exe", body: `<h3>Hobbies</h3><p>[my hobbies here.]</p>` },
      { id: "clubs", file: "organizations.exe", type: "exe", body: `<h3>Organizations</h3><p>[my clubs and organizations here.]</p>` },
      { id: "volunteer", file: "volunteer.exe", type: "exe", body: `<h3>Volunteer work</h3><p>[my volunteer work here.]</p>` },
      { id: "playlist", file: "on_repeat.mp3", type: "mp3", body: `<h3>On repeat</h3><p>[a line about what I'm listening to here.]</p><ol class="tracklist"><li><span class="no">01</span><span>[song, artist]</span><span class="len">[0:00]</span></li><li><span class="no">02</span><span>[song, artist]</span><span class="len">[0:00]</span></li><li><span class="no">03</span><span>[song, artist]</span><span class="len">[0:00]</span></li></ol>` }
    ]},
    { id: "projects", name: "projects", title: "Projects", note: "CAPSTONE FIRST", icons: [
      { id: "capstone", file: "capstone.htm", type: "htm", featured: true, body: `
        <div class="addr"><span class="k">Address</span><output>[my capstone link here.]</output></div>
        <h3>DCIM Capstone</h3><p>[a few lines about my capstone here.]</p>
        <div class="actions"><span class="btn primary" aria-disabled="true">Open site in new tab &#8599;</span></div>
        <dl class="liner"><dt>COURSE</dt><dd>[course]</dd><dt>SEMESTER</dt><dd>[semester]</dd><dt>ROLE</dt><dd>[my role]</dd><dt>TOOLS</dt><dd>[tools]</dd></dl>` },
      { id: "jukebox", file: "jukebox_blog.htm", type: "htm", body: `
        <div class="addr"><span class="k">Address</span><output>https://rachelyjli.wixsite.com/jukeboxblog</output></div>
        <h3>Jukebox Blog</h3><p>[a few lines about my blog here.]</p>
        <div class="actions"><a class="btn primary" href="https://rachelyjli.wixsite.com/jukeboxblog" target="_blank" rel="noopener">Open site in new tab &#8599;</a></div>
        <dl class="liner"><dt>COURSE</dt><dd>[course]</dd><dt>SEMESTER</dt><dd>[semester]</dd><dt>TOOLS</dt><dd>[tools]</dd></dl>` },
      { id: "deck", file: "presentation.ppt", type: "ppt", body: `<h3>[presentation title]</h3><p>[a line about my presentation here.]</p><div class="actions"><span class="btn" aria-disabled="true">Open deck &#8599;</span></div><dl class="liner"><dt>COURSE</dt><dd>[course]</dd><dt>SEMESTER</dt><dd>[semester]</dd></dl>` },
      { id: "paper", file: "paper.pdf", type: "pdf", body: `<h3>[paper title]</h3><p>[a short summary of my paper here.]</p><div class="actions"><span class="btn" aria-disabled="true">Open PDF &#8599;</span></div><dl class="liner"><dt>COURSE</dt><dd>[course]</dd><dt>SEMESTER</dt><dd>[semester]</dd></dl>` }
    ]},
    { id: "contact", name: "contact", title: "Contact", note: "SAY HI", icons: [
      { id: "contactme", file: "contact.txt", type: "txt", body: `<h3>Contact</h3><p>[a line inviting people to reach out here.]</p><ul class="lines"><li><span class="when">EMAIL</span><span>[my email here.]</span></li></ul>` },
      { id: "li2", file: "linkedin.exe", type: "exe", body: `<h3>LinkedIn</h3><p>[my LinkedIn link here.]</p><div class="actions"><span class="btn" aria-disabled="true">View my profile &#8599;</span></div>` },
      { id: "resume2", file: "resume.pdf", type: "pdf", body: `<h3>Resume</h3><p>[a line about my resume here.]</p><div class="actions"><span class="btn primary" aria-disabled="true">Open resume &#8599;</span></div>` }
    ]}
  ];

  // ---------- helpers ----------
  const SITE = "SHOWCASE";
  const $ = s => document.querySelector(s);
  const pad2 = n => String(n).padStart(2, "0");
  const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const small = () => window.matchMedia("(max-width: 860px)").matches;

  const homeSec = $("[data-home]"), pageSec = $("[data-page]");
  const slotHome = $("[data-slot-home]"), slotSide = $("[data-slot-side]");
  const homeTitle = $("[data-hometitle]"), pageTitle = $("[data-pagetitle]");
  const eyebrow = $("[data-eyebrow]"), pageNote = $("[data-pagenote]"), deskHost = $("[data-deskhost]");
  const homeTrack = $("[data-hometrack]");
  const aboutSec = $("[data-about]"), aboutTrack = $("[data-abouttrack]");
  const winbar = $("[data-winbar]"), barTrack = $("[data-bartrack]");

  let current = null;   // id of the page on screen
  let sel = 0;          // highlighted row on the player screen
  let z = 100;

  // ---------- the player (vector for now; a real MP3-player photo can replace the SVG body later) ----------
  const player = document.createElement("nav");
  player.className = "device-nav";
  player.setAttribute("aria-label", "Site navigation");
  player.innerHTML = `
    <svg class="dev-body" viewBox="0 0 260 440" aria-hidden="true" focusable="false">
      <rect class="dv-body" x="2" y="2" width="256" height="436" rx="36"/>
      <rect class="dv-line" x="10" y="10" width="240" height="420" rx="30"/>
      <text class="dv-brand" x="130" y="23" text-anchor="middle">${SITE}</text>
      <rect class="dv-bezel" x="24" y="30" width="212" height="174" rx="12"/>
      <rect class="dv-display" x="32" y="38" width="196" height="158" rx="6"/>
      <circle class="dv-wheel" cx="130" cy="318" r="92"/>
      <circle class="dv-center" cx="130" cy="318" r="34"/>
    </svg>
    <div class="dev-screen">
      <div class="dev-bar"><span>${SITE}</span><span class="dev-batt" aria-hidden="true"></span></div>
      <ol class="dev-menu">${PAGES.map(p => `<li><button type="button" class="dev-item" data-nav="${p.id}"><span>${p.name}</span><span class="dev-arrow" aria-hidden="true">&gt;</span></button></li>`).join("")}</ol>
    </div>
    <button type="button" class="whl w-menu" data-menu aria-label="Menu: go to home">MENU</button>
    <button type="button" class="whl w-prev" data-move="-1" aria-label="Highlight previous page"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h3v14H4zM20 5L9 12l11 7z"/></svg></button>
    <button type="button" class="whl w-next" data-move="1" aria-label="Highlight next page"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 5h3v14h-3zM4 5l11 7-11 7z"/></svg></button>
    <button type="button" class="whl w-play" data-ok aria-label="Play highlighted page"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M1 5l9 7-9 7zM13 5h3v14h-3zM19 5h3v14h-3z"/></svg></button>
    <button type="button" class="whl w-ok" data-ok aria-label="Open highlighted page"></button>`;
  const items = [...player.querySelectorAll(".dev-item")];

  function paintPlayer() {
    items.forEach((b, i) => {
      b.classList.toggle("sel", i === sel);
      if (PAGES[i].id === current) b.setAttribute("aria-current", "page"); else b.removeAttribute("aria-current");
      b.setAttribute("aria-label", PAGES[i].name + (PAGES[i].id === current ? ", current page" : ""));
    });
    const i = Math.max(0, PAGES.findIndex(p => p.id === current));
    if (barTrack) barTrack.textContent = `TRACK ${pad2(i + 1)} / ${pad2(PAGES.length)}`;
  }
  player.addEventListener("click", e => {
    const nav = e.target.closest("[data-nav]");
    const mv = e.target.closest("[data-move]");
    if (nav) go(nav.dataset.nav);
    else if (mv) { sel = (sel + (+mv.dataset.move) + PAGES.length) % PAGES.length; paintPlayer(); }
    else if (e.target.closest("[data-ok]")) go(PAGES[sel].id);
    else if (e.target.closest("[data-menu]")) go("home");
  });
  player.addEventListener("keydown", e => {
    if (!e.target.classList.contains("dev-item")) return;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      sel = (sel + (e.key === "ArrowDown" ? 1 : -1) + PAGES.length) % PAGES.length;
      paintPlayer(); items[sel].focus();
    }
  });

  // ---------- windows: raise, minimize, maximize, close, drag anywhere on the page ----------
  function raise(w) { w.style.zIndex = ++z; }

  function setTranslate(w, x, y) { w.dataset.tx = x; w.dataset.ty = y; w.style.translate = `${x}px ${y}px`; }

  function wireWin(w, opts = {}) {
    w.addEventListener("pointerdown", () => raise(w));
    w.querySelectorAll(".win-btn[data-act]").forEach(b => b.addEventListener("click", e => {
      e.stopPropagation();
      const a = b.dataset.act;
      if (a === "min") w.classList.toggle("is-min");
      if (a === "max") w.classList.toggle("is-max");
      if (a === "close") {
        w.classList.remove("is-max");
        if (opts.close) opts.close(w);
        else { w.hidden = true; if (opts.onClose) opts.onClose(); }
      }
    }));
    if (w.hasAttribute("data-nodrag")) return;
    const bar = w.querySelector(".titlebar");
    if (!bar) return;
    let sx, sy, bx, by, r, dragging = false;
    bar.addEventListener("pointerdown", e => {
      if (e.button !== 0 || e.target.closest("button") || small() || w.classList.contains("is-max")) return;
      dragging = true; w.classList.add("dragging");
      sx = e.clientX; sy = e.clientY;
      bx = +w.dataset.tx || 0; by = +w.dataset.ty || 0;
      r = w.getBoundingClientRect();
      bar.setPointerCapture(e.pointerId);
      e.preventDefault();
    });
    bar.addEventListener("pointermove", e => {
      if (!dragging) return;
      // keep the whole window on the page: inside the viewport width, below the top bar, above the page bottom
      const W = document.documentElement.clientWidth;
      const topLimit = -window.scrollY + (winbar ? winbar.offsetHeight : 0);
      const bottomLimit = document.documentElement.scrollHeight - window.scrollY;
      const dx = Math.max(-r.left, Math.min(W - r.right, e.clientX - sx));
      const dy = Math.max(topLimit - r.top, Math.min(bottomLimit - r.bottom, e.clientY - sy));
      setTranslate(w, bx + dx, by + dy);
    });
    const end = () => { dragging = false; w.classList.remove("dragging"); };
    bar.addEventListener("pointerup", end);
    bar.addEventListener("pointercancel", end);
  }

  // ---------- trash: closed home/About windows go here and can be restored ----------
  const trashBtn = $("[data-trash]"), trashCount = $("[data-trashcount]");
  const bin = $("#w-bin"), binList = $("[data-binlist]"), binAll = $("[data-binall]");
  const trashed = [];

  function towardTrash(w, reverse) {
    if (reduce() || !trashBtn) return null;
    const r = w.getBoundingClientRect(), t = trashBtn.getBoundingClientRect();
    const dx = (t.left + t.width / 2) - (r.left + r.width / 2), dy = (t.top + t.height / 2) - (r.top + r.height / 2);
    const frames = [{ transform: "none", opacity: 1 }, { transform: `translate(${dx}px, ${dy}px) scale(.08)`, opacity: .2 }];
    return w.animate(reverse ? frames.reverse() : frames, { duration: 420, easing: reverse ? "cubic-bezier(.2,.8,.2,1)" : "cubic-bezier(.55,0,.8,.2)" });
  }
  function trashWin(w) {
    const anim = towardTrash(w);
    const done = () => {
      w.hidden = true;
      if (!trashed.includes(w)) trashed.push(w);
      renderBin();
      if (!reduce()) trashBtn.animate([{ transform: "rotate(0)" }, { transform: "rotate(-10deg)" }, { transform: "rotate(8deg)" }, { transform: "rotate(0)" }], { duration: 360 });
    };
    if (anim) anim.onfinish = done; else done();
  }
  function restoreWin(w) {
    const i = trashed.indexOf(w); if (i > -1) trashed.splice(i, 1);
    w.hidden = false; w.classList.remove("is-min"); raise(w);
    if (!bin.hidden) raise(bin);   // keep the trash window on top while restoring
    towardTrash(w, true);
    renderBin();
  }
  function renderBin() {
    const n = trashed.length;
    trashBtn.classList.toggle("has-items", n > 0);
    trashCount.textContent = n ? `(${n})` : "";
    trashBtn.setAttribute("aria-label", n ? `Trash, ${n} closed window${n > 1 ? "s" : ""}. Open to restore` : "Trash, empty");
    binList.innerHTML = "";
    if (!n) { binList.innerHTML = `<li class="bin-empty">The trash is empty.</li>`; binAll.hidden = true; return; }
    binAll.hidden = false;
    trashed.forEach(w => {
      const name = w.querySelector(".titlebar .title").textContent;
      const li = document.createElement("li");
      li.innerHTML = `${iconSVG(name.endsWith(".mp3") ? "mp3" : name.endsWith(".txt") ? "txt" : "exe")}<span class="bin-name"></span><button type="button" class="btn">Restore</button>`;
      li.querySelector(".bin-name").textContent = name;
      li.querySelector("button").setAttribute("aria-label", `Restore ${name}`);
      li.querySelector("button").addEventListener("click", () => restoreWin(w));
      binList.appendChild(li);
    });
  }
  if (trashBtn) {
    trashBtn.addEventListener("click", () => {
      bin.hidden = !bin.hidden;
      if (!bin.hidden && !bin.dataset.tx) {   // open just below the trash icon
        const ar = aboutSec.getBoundingClientRect(), tr = trashBtn.getBoundingClientRect();
        bin.style.top = Math.round(tr.bottom - ar.top + 12) + "px";
      }
      trashBtn.setAttribute("aria-expanded", String(!bin.hidden));
      if (!bin.hidden) { raise(bin); if (!reduce()) bin.animate([{ opacity: 0, transform: "scale(.96)" }, { opacity: 1, transform: "scale(1)" }], { duration: 160, easing: "ease-out" }); }
    });
    binAll.addEventListener("click", () => [...trashed].forEach(restoreWin));
    renderBin();
  }

  // ---------- routing + transitions ----------
  function go(id) {
    if (location.hash.slice(1) === id) show(id);
    else location.hash = id;
  }
  window.addEventListener("hashchange", () => show(location.hash.slice(1)));

  function flip(el, from, to, opts) {
    if (!from || !to.width || !to.height || reduce()) return;
    const s = opts.byHeight ? from.height / to.height : Math.min(from.width / to.width, from.height / to.height);
    el.animate([
      { transformOrigin: "0 0", transform: `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${s})`, opacity: opts.fade ? 0.25 : 1 },
      { transformOrigin: "0 0", transform: "none", opacity: 1 }
    ], { duration: opts.ms || 700, easing: "cubic-bezier(.2,.75,.15,1)" });
  }

  const homeView = id => id === "home" || id === "about";
  function scrollToAbout(instant) {
    aboutSec.scrollIntoView({ behavior: instant || reduce() ? "auto" : "smooth", block: "start" });
  }

  function show(id, initial) {
    const idx = Math.max(0, PAGES.findIndex(p => p.id === id));
    const page = PAGES[idx];
    if (!initial && page.id === current) { if (page.id === "about") scrollToAbout(); return; }
    const wasHome = current !== null && homeView(current);
    const toHome = homeView(page.id);

    // moving between home and about is just a scroll
    if (!initial && wasHome && toHome) {
      current = page.id; sel = idx; paintPlayer();
      if (page.id === "about") scrollToAbout();
      else window.scrollTo({ top: 0, behavior: reduce() ? "auto" : "smooth" });
      return;
    }

    const fromDev = initial ? null : player.getBoundingClientRect();
    const fromTitle = initial ? null : (wasHome ? homeTitle : pageTitle).getBoundingClientRect();

    current = page.id; sel = idx;
    homeSec.hidden = !toHome;
    pageSec.hidden = toHome;
    (toHome ? slotHome : slotSide).appendChild(player);
    if (!toHome) {
      pageTitle.textContent = page.title;
      eyebrow.textContent = `TRACK ${pad2(idx + 1)} / ${pad2(PAGES.length)}`;
      pageNote.textContent = page.note || "";
      showDesk(page);
    }
    paintPlayer();
    document.title = toHome ? SITE : `${page.title} · ${SITE}`;
    window.scrollTo({ top: 0, behavior: "instant" });
    if (initial || reduce()) { if (page.id === "about") scrollToAbout(true); return; }

    flip(player, fromDev, player.getBoundingClientRect(), {});
    const titleEl = toHome ? homeTitle : pageTitle;
    if (wasHome !== toHome) {
      flip(titleEl, fromTitle, titleEl.getBoundingClientRect(), { byHeight: true, fade: true });
    } else {
      titleEl.animate([{ opacity: 0, transform: "translateY(-14px)" }, { opacity: 1, transform: "none" }], { duration: 300, easing: "ease-out" });
    }
    if (!toHome) {
      const desk = deskHost.querySelector(`[data-for="${page.id}"]`);
      desk.querySelectorAll(".icon").forEach((ic, i) =>
        ic.animate([{ opacity: 0, transform: "translateY(10px)" }, { opacity: 1, transform: "none" }],
          { duration: 280, delay: (wasHome ? 380 : 120) + i * 55, easing: "ease-out", fill: "backwards" }));
    }
    if (page.id === "about") setTimeout(() => scrollToAbout(), 720);
  }

  // on the home view, the player highlight follows the scroll between home and about
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!homeView(current)) return;
        const next = en.isIntersecting ? "about" : "home";
        if (next === current) return;
        current = next; sel = PAGES.findIndex(p => p.id === next); paintPlayer();
        history.replaceState(null, "", "#" + next);
      });
    }, { threshold: 0.3 }).observe(aboutSec);
  }

  // ---------- icon desktops ----------
  function syncEmpty(area) {
    const anyOpen = [...area.querySelectorAll(".win")].some(w => !w.hidden);
    area.querySelector(".empty").hidden = anyOpen;
  }

  function showDesk(page) {
    let desk = deskHost.querySelector(`[data-for="${page.id}"]`);
    if (!desk) desk = buildDesk(page);
    deskHost.querySelectorAll(".desk-page").forEach(d => { d.hidden = d !== desk; });
  }

  function buildDesk(page) {
    const desk = document.createElement("div");
    desk.className = "desk-page";
    desk.dataset.for = page.id;
    desk.innerHTML = `<nav class="desk-icons" aria-label="${page.title} contents"></nav>
      <div class="area"><p class="empty">click an icon to open it</p></div>`;
    const nav = desk.querySelector(".desk-icons");
    const area = desk.querySelector(".area");
    let opened = 0;

    page.icons.forEach(ic => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "icon";
      b.setAttribute("aria-expanded", "false");
      b.setAttribute("aria-controls", `w-${ic.id}`);
      b.innerHTML = `${iconSVG(ic.type)}<span></span>`;
      b.querySelector("span").textContent = (ic.featured ? "* " : "") + ic.file;
      b.addEventListener("click", () => openWin(ic));
      nav.appendChild(b);
      ic._btn = b;
    });

    function openWin(ic) {
      let w = document.getElementById(`w-${ic.id}`);
      const fresh = !w;
      if (!w) {
        w = document.createElement("section");
        w.className = "win"; w.id = `w-${ic.id}`;
        w.setAttribute("aria-labelledby", `t-${ic.id}`);
        const off = Math.min(opened++ * 32, 192);
        w.style.left = off + "px"; w.style.top = off + "px";
        w.innerHTML = `<div class="titlebar"><span class="title" id="t-${ic.id}"></span>
            <div class="win-btns">
              <button class="win-btn" type="button" data-act="min" aria-label="Minimize ${ic.file}">_</button>
              <button class="win-btn" type="button" data-act="max" aria-label="Maximize ${ic.file}">□</button>
              <button class="win-btn" type="button" data-act="close" aria-label="Close ${ic.file}">×</button>
            </div></div>
          <div class="pane w-body">${ic.body}</div>
          <div class="statusbar"><span>Done</span><span>${ic.type.toUpperCase()}</span></div>`;
        w.querySelector(".title").textContent = ic.file;
        area.appendChild(w);
        wireWin(w, { onClose: () => { ic._btn.setAttribute("aria-expanded", "false"); ic._btn.focus(); syncEmpty(area); } });
      }
      w.hidden = false; w.classList.remove("is-min");
      raise(w);
      ic._btn.setAttribute("aria-expanded", "true");
      syncEmpty(area);
      if (!reduce()) w.animate([{ opacity: 0, transform: "scale(.96)" }, { opacity: 1, transform: "none" }], { duration: fresh ? 200 : 140, easing: "ease-out" });
      if (small()) w.scrollIntoView({ block: "start", behavior: reduce() ? "auto" : "smooth" });
    }

    deskHost.appendChild(desk);
    openWin(page.icons[0]);   // the first window starts open so no page looks empty
    return desk;
  }

  // ---------- home + about windows ----------
  homeSec.querySelectorAll(".win").forEach(w => {
    if (w.id === "w-bin") wireWin(w, { onClose: () => trashBtn.setAttribute("aria-expanded", "false") });
    else if (w.hasAttribute("data-closable")) wireWin(w, { close: trashWin });
    else wireWin(w);
  });
  document.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => go(b.dataset.go)));
  if (homeTrack) homeTrack.textContent = `TRACK 01 / ${pad2(PAGES.length)} · HOME`;
  if (aboutTrack) aboutTrack.textContent = `TRACK 02 / ${pad2(PAGES.length)} · ABOUT`;

  // reset dragged positions when the layout switches to the stacked phone view
  window.matchMedia("(max-width: 860px)").addEventListener("change", e => {
    if (e.matches) document.querySelectorAll(".win").forEach(w => { delete w.dataset.tx; delete w.dataset.ty; w.style.translate = ""; });
  });

  show(location.hash.slice(1) || "home", true);
})();

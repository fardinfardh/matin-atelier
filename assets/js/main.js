/* ============================================================
   Matin Atelier — interactions
   - mobile nav
   - gallery render + loupe hover-zoom + reveal-on-scroll
   - lightbox (browse + inquire)
   - inquiry form: populate select, prefill from ?code=, AJAX submit
   ============================================================ */
(function () {
  "use strict";
  const BASE = "assets/images/artworks/";
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const coarse = window.matchMedia("(hover: none)").matches;

  /* -------- mobile nav -------- */
  const toggle = $(".nav-toggle"), links = $(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => links.classList.toggle("open"));
    $$(".nav-links a").forEach(a => a.addEventListener("click", () => links.classList.remove("open")));
  }

  /* ============================================================
     GALLERY
     ============================================================ */
  const grid = $("#masonry");
  if (grid && window.ARTWORKS) {
    ARTWORKS.forEach((a, i) => {
      const fig = document.createElement("figure");
      fig.className = "art";
      fig.style.transitionDelay = (i % 3) * 90 + "ms";
      fig.innerHTML = `
        <div class="frame" data-i="${i}" role="button" tabindex="0"
             aria-label="View ${a.title} (${a.code}) larger">
          <img class="base" src="${BASE}${a.img}S.webp" alt="${a.title} — Persian miniature by Matin" loading="lazy">
          <div class="loupe" data-zoom="${BASE}${a.img}M.webp"></div>
        </div>
        <figcaption>
          <div class="code">${a.code}</div>
          <div class="title">${a.pending ? "Untitled" : a.title}</div>
          <div class="meta">${a.pending ? "Details on request" : a.year + " · " + a.size}</div>
          <div class="caption-rule"></div>
        </figcaption>`;
      grid.appendChild(fig);

      const frame = $(".frame", fig);
      const loupe = $(".loupe", fig);

      /* --- loupe zoom (fine pointers only) --- */
      if (!coarse) {
        let raf = null;
        frame.addEventListener("mouseenter", () => {
          if (!loupe.style.backgroundImage) loupe.style.backgroundImage = `url("${loupe.dataset.zoom}")`;
          fig.classList.add("zoom");
        });
        frame.addEventListener("mousemove", (e) => {
          if (raf) return;
          raf = requestAnimationFrame(() => {
            const r = frame.getBoundingClientRect();
            const x = ((e.clientX - r.left) / r.width) * 100;
            const y = ((e.clientY - r.top) / r.height) * 100;
            loupe.style.backgroundPosition = `${Math.max(0, Math.min(100, x))}% ${Math.max(0, Math.min(100, y))}%`;
            raf = null;
          });
        });
        frame.addEventListener("mouseleave", () => fig.classList.remove("zoom"));
      }

      /* --- open lightbox --- */
      frame.addEventListener("click", () => openLB(i));
      frame.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLB(i); }
      });
    });

    /* reveal on scroll */
    const io = new IntersectionObserver((ents) => {
      ents.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    $$(".art", grid).forEach(el => io.observe(el));
  }

  /* ============================================================
     LIGHTBOX
     ============================================================ */
  const lb = $("#lightbox");
  let cur = 0;
  function openLB(i) {
    if (!lb) return;
    cur = i; renderLB(); lb.classList.add("open"); document.body.style.overflow = "hidden";
  }
  function closeLB() { if (lb) { lb.classList.remove("open"); document.body.style.overflow = ""; } }
  function renderLB() {
    const a = ARTWORKS[cur];
    $("#lb-img").src = BASE + a.img + "M.webp";
    $("#lb-img").alt = a.title + " — Persian miniature by Matin";
    $("#lb-code").textContent = a.code;
    $("#lb-title").textContent = a.pending ? "Untitled" : a.title;
    const rows = [];
    if (a.year) rows.push(["Year", a.year]);
    if (a.size) rows.push(["Artwork", a.size]);
    if (a.mat)  rows.push(["With mount", a.mat]);
    if (a.time) rows.push(["Made in", a.time]);
    $("#lb-dl").innerHTML = rows.map(r => `<dt>${r[0]}</dt><dd>${r[1]}</dd>`).join("");
    $("#lb-desc").textContent = a.desc || "";
    $("#lb-inquire").href = "inquiry.html?code=" + encodeURIComponent(a.code);
  }
  if (lb) {
    $(".lb-close", lb).addEventListener("click", closeLB);
    $(".lb-prev", lb).addEventListener("click", () => { cur = (cur - 1 + ARTWORKS.length) % ARTWORKS.length; renderLB(); });
    $(".lb-next", lb).addEventListener("click", () => { cur = (cur + 1) % ARTWORKS.length; renderLB(); });
    lb.addEventListener("click", (e) => { if (e.target === lb) closeLB(); });
    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") closeLB();
      if (e.key === "ArrowLeft") $(".lb-prev", lb).click();
      if (e.key === "ArrowRight") $(".lb-next", lb).click();
    });
  }

  /* ============================================================
     INQUIRY FORM
     ============================================================ */
  const sel = $("#artwork-select");
  if (sel && window.ARTWORKS) {
    ARTWORKS.forEach(a => {
      const o = document.createElement("option");
      o.value = a.code;
      o.textContent = a.code + (a.pending ? "" : " — " + a.title);
      sel.appendChild(o);
    });
    const q = new URLSearchParams(location.search).get("code");
    if (q) sel.value = q;
  }

  const form = $("#inquiry-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new URLSearchParams(new FormData(form)).toString();
      fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: data })
        .then(() => { form.style.display = "none"; $("#form-success").classList.add("show"); window.scrollTo({ top: form.offsetTop - 120, behavior: "smooth" }); })
        .catch(() => { form.querySelector(".form-note-error")?.classList.add("show"); alert("Something went wrong. Please email hello@matinatelier.art directly."); });
    });
  }
})();

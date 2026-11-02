/* ==========================================================================
   Tastes of Africa
   Features: dark/light toggle, mobile menu, recipe filter, favorites
   (localStorage), ingredient scaler, contact validation, newsletter
   ========================================================================== */
(function () {
  "use strict";

  // Small helpers for selecting elements
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Line icons (same style as the HTML pages)
  const icon = (paths, filled) =>
    '<svg class="ico' + (filled ? " filled" : "") + '" viewBox="0 0 24 24" aria-hidden="true">' + paths + "</svg>";
  const HEART = '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>';
  const SUN = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>';
  const MOON = '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>';
  const MENU = '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>';
  const CLOSE = '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>';

  /* ---------- 1. Dark / light mode (saved in localStorage) ---------- */
  const themeBtn = $("#theme-toggle");
  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("toa-theme", theme); } catch (e) { /* storage blocked */ }
    if (themeBtn) {
      themeBtn.innerHTML = icon(theme === "dark" ? SUN : MOON);
      themeBtn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    }
  }
  if (themeBtn) {
    setTheme(document.documentElement.dataset.theme || "dark");
    themeBtn.addEventListener("click", () => {
      setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
    });
  }

  /* ---------- 2. Mobile menu ---------- */
  const menuBtn = $("#menu-btn");
  const mobileNav = $("#mobile-nav");
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", () => {
      const open = mobileNav.hidden;
      mobileNav.hidden = !open;
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.innerHTML = icon(open ? CLOSE : MENU);
    });
  }

  /* ---------- 3. Favorites (recipe IDs stored in localStorage) ---------- */
  const FAV_KEY = "toa-favs";
  function getFavs() {
    try { return JSON.parse(localStorage.getItem(FAV_KEY)) || []; } catch (e) { return []; }
  }
  function saveFavs(list) {
    try { localStorage.setItem(FAV_KEY, JSON.stringify(list)); } catch (e) { /* storage blocked */ }
  }

  // Redraw every favorite button, counter and the filter after any change
  function renderFavs() {
    const favs = getFavs();
    $$(".fav-btn").forEach((btn) => {
      const on = favs.includes(btn.dataset.id);
      btn.classList.toggle("on", on);
      btn.setAttribute("aria-pressed", String(on));
      btn.innerHTML = icon(HEART, on) + (on ? "Favorited" : "Favorite");
    });
    $$(".fav-count").forEach((el) => (el.textContent = favs.length));
    const favFilter = $('[data-filter="favorites"]');
    if (favFilter) favFilter.textContent = "Favorites (" + favs.length + ")";
    applyFilter();
  }

  // One listener handles every favorite button (event delegation)
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".fav-btn");
    if (!btn) return;
    e.preventDefault();
    const favs = getFavs();
    const i = favs.indexOf(btn.dataset.id);
    if (i === -1) favs.push(btn.dataset.id); else favs.splice(i, 1);
    saveFavs(favs);
    renderFavs();
  });

  /* ---------- 4. Recipe filter (data-region attributes) ---------- */
  let currentFilter = "all";
  const filterButtons = $$(".filter-btn");

  function applyFilter() {
    if (!filterButtons.length) return;
    const favs = getFavs();
    let visible = 0;
    $$("#recipe-grid .rcard").forEach((card) => {
      let show;
      if (currentFilter === "all") show = true;
      else if (currentFilter === "favorites") show = favs.includes(card.dataset.id);
      else show = card.dataset.region === currentFilter;
      card.classList.toggle("hidden", !show);
      if (show) visible++;
    });
    const empty = $("#empty-msg");
    if (empty) empty.hidden = visible > 0;
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentFilter = btn.dataset.filter;
      filterButtons.forEach((b) => b.classList.toggle("active", b === btn));
      applyFilter();
    });
  });

  /* ---------- 5. Ingredient scaler (recipe pages) ---------- */
  const servingsOut = $("#servings");
  // Turn a number into a friendly amount, e.g. 1.5 -> "1½"
  function formatQty(n) {
    if (n >= 20) return String(Math.round(n));
    const whole = Math.floor(n + 1e-9);
    const frac = n - whole;
    const options = [[0, ""], [0.25, "¼"], [0.33, "⅓"], [0.5, "½"], [0.67, "⅔"], [0.75, "¾"], [1, ""]];
    let best = options[0];
    options.forEach((o) => { if (Math.abs(frac - o[0]) < Math.abs(frac - best[0])) best = o; });
    const w = whole + (best[0] === 1 ? 1 : 0);
    return (w || "") + best[1] || "0";
  }
  if (servingsOut) {
    const base = Number(servingsOut.dataset.base);
    let servings = base;
    const update = () => {
      servingsOut.textContent = servings;
      $$(".qty").forEach((el) => {
        el.textContent = formatQty((Number(el.dataset.qty) * servings) / base) + " ";
      });
    };
    $("#serv-minus").addEventListener("click", () => { if (servings > 1) { servings--; update(); } });
    $("#serv-plus").addEventListener("click", () => { if (servings < 24) { servings++; update(); } });
  }

  /* ---------- 6. Contact form validation ---------- */
  const form = $("#contact-form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // stop the browser from submitting automatically
      const name = $("#name").value.trim();
      const message = $("#message").value.trim();
      const error = $("#msg-error");
      if (message.length <= 20) {
        error.textContent = "Your message must be more than 20 characters.";
        $("#message").focus();
        return;
      }
      error.textContent = "";
      form.hidden = true; // hide the form
      $("#ty-heading").textContent = "Thank you, " + name + "!"; // dynamic confirmation using the user's name
      $("#thank-you").hidden = false;
    });
  }

  /* ---------- 7. Newsletter signup (footer) ---------- */
  const news = $("#newsletter");
  if (news) {
    news.addEventListener("submit", (event) => {
      event.preventDefault();
      const done = document.createElement("p");
      done.className = "nl-done";
      done.setAttribute("role", "status");
      done.textContent = "You're on the list — welcome to the table.";
      news.replaceWith(done);
    });
  }

  // Restore saved favorites when the page loads
  renderFavs();
})();
(function () {
  var N = window.NEGOCIOS, MIN = 40000, MAX = 1000000;
  var range = document.getElementById("amt"), out = document.getElementById("out");
  var main = document.getElementById("rec-main"), others = document.getElementById("rec-others");
  var chips = document.querySelectorAll(".chips button");
  var cat = "todos", picked = null, shown = null;

  var T = {
    es: {
      best: "Mejor opción para tu presupuesto", chosen: "Tu selección", also: "También cabe en tu presupuesto",
      loc: "Ubicación", price: "Presupuesto", hours: "Horario", map: "Ver en el mapa", prev: "Foto anterior", next: "Foto siguiente",
      inRange: "Tu presupuesto está dentro del rango de este lugar.", over: "Tu presupuesto cubre este lugar y te deja margen.",
      none: "Con {b} aún no hay opciones de {c} en nuestra lista. La más cercana es {n}, desde {p}.", raise: "Subir presupuesto a {p}",
      cats: { hospedaje: "hospedaje", restaurantes: "restaurantes", bienestar: "bienestar", sitios: "sitios de interés" }
    },
    en: {
      best: "Best match for your budget", chosen: "Your selection", also: "Also within your budget",
      loc: "Location", price: "Budget", hours: "Hours", map: "View on map", prev: "Previous photo", next: "Next photo",
      inRange: "Your budget is within this place's range.", over: "Your budget covers this place with room to spare.",
      none: "With {b} there are no {c} options in our list yet. The closest is {n}, from {p}.", raise: "Raise budget to {p}",
      cats: { hospedaje: "accommodation", restaurantes: "restaurant", bienestar: "wellness", sitios: "places of interest" }
    }
  };
  function lang() { return document.documentElement.lang === "en" ? "en" : "es"; }
  function money(n) { return "$" + n.toLocaleString("es-CO"); }
  function byId(id) { return N.filter(function (x) { return x.id === id; })[0]; }

  function evaluate() {
    var b = +range.value;
    var list = N.filter(function (x) { return cat === "todos" || x.cat === cat; });
    var fits = list.filter(function (x) { return x.min <= b; }).map(function (x) {
      var inr = b <= x.max, mid = (x.min + x.max) / 2;
      return { x: x, inr: inr, s: inr ? Math.abs(b - mid) / mid : 10 + (b - x.max) / b };
    }).sort(function (a, c) { return a.s - c.s; });
    return { b: b, list: list, fits: fits };
  }

  function carousel(b, t) {
    var imgs = "", dots = "";
    for (var i = 1; i <= b.imgs; i++) {
      imgs += '<img src="assets/img/negocios/n' + b.id + "-" + i + '.jpg" alt="' + b.name + " (" + i + "/" + b.imgs + ')" loading="lazy">';
      dots += '<button type="button" aria-label="' + i + '"' + (i === 1 ? ' aria-current="true"' : "") + "></button>";
    }
    return '<div class="carousel" role="group" aria-roledescription="carousel" aria-label="' + b.name + '">' +
      '<div class="track" tabindex="0">' + imgs + "</div>" +
      '<button class="car-btn prev" type="button" aria-label="' + t.prev + '">&#8249;</button>' +
      '<button class="car-btn next" type="button" aria-label="' + t.next + '">&#8250;</button>' +
      '<div class="dots">' + dots + "</div></div>";
  }
  function bindCarousel(root) {
    var track = root.querySelector(".track"), dots = root.querySelectorAll(".dots button"), raf;
    function go(i) { track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" }); }
    function cur() { return Math.round(track.scrollLeft / track.clientWidth); }
    root.querySelector(".prev").addEventListener("click", function () { go(Math.max(0, cur() - 1)); });
    root.querySelector(".next").addEventListener("click", function () { go(Math.min(dots.length - 1, cur() + 1)); });
    dots.forEach(function (d, i) { d.addEventListener("click", function () { go(i); }); });
    track.addEventListener("scroll", function () {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        var c = cur();
        dots.forEach(function (d, i) { if (i === c) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current"); });
      });
    });
    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); go(Math.min(dots.length - 1, cur() + 1)); }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(Math.max(0, cur() - 1)); }
    });
  }

  function info(b, t, l, isTop) {
    var d = b[l];
    return '<div class="rec-info"><p class="rec-kicker">' + (isTop ? t.best : t.chosen) + "</p>" +
      "<h3>" + b.name + '</h3><p class="rec-tag">' + d.tag + "</p><p>" + d.desc + "</p><dl>" +
      "<div><dt>" + t.loc + "</dt><dd>" + d.loc + "</dd></div>" +
      "<div><dt>" + t.price + "</dt><dd>" + d.price + (d.extra ? "<br>" + d.extra : "") + "</dd></div>" +
      (d.hours ? "<div><dt>" + t.hours + "</dt><dd>" + d.hours + "</dd></div>" : "") + "</dl>" +
      '<p class="rec-fit" id="rec-fit"></p>' +
      '<button class="btn" type="button" data-map="' + b.id + '">' + t.map + "</button></div>";
  }

  function render() {
    var l = lang(), t = T[l], e = evaluate();
    out.textContent = money(e.b) + " COP";
    range.style.setProperty("--p", ((e.b - MIN) / (MAX - MIN)) * 100 + "%");
    if (window.STRMap) window.STRMap.setFit(e.fits.map(function (f) { return f.x.id; }));

    if (!e.fits.length) {
      shown = null; others.innerHTML = "";
      var near = e.list.slice().sort(function (a, c) { return a.min - c.min; })[0];
      main.innerHTML = '<p class="rec-none">' + t.none.replace("{b}", money(e.b)).replace("{c}", t.cats[cat] || "").replace("{n}", near.name).replace("{p}", money(near.min)) +
        '</p><button class="btn" type="button" data-raise="' + near.min + '">' + t.raise.replace("{p}", money(near.min)) + "</button>";
      return;
    }
    var top = e.fits[0], sel = top;
    if (picked) { var f = e.fits.filter(function (x) { return x.x.id === picked; })[0]; if (f) sel = f; else picked = null; }
    var key = sel.x.id + l + (sel === top ? "t" : "s");
    if (shown !== key) {
      shown = key;
      main.innerHTML = '<div class="rec-photos">' + carousel(sel.x, t) + "</div>" + info(sel.x, t, l, sel === top);
      bindCarousel(main.querySelector(".carousel"));
    }
    document.getElementById("rec-fit").textContent = sel.inr ? t.inRange : t.over;

    var rest = e.fits.filter(function (x) { return x !== sel; });
    others.innerHTML = rest.length ? "<h3>" + t.also + "</h3><ul>" + rest.map(function (f) {
      return '<li><button type="button" data-pick="' + f.x.id + '"><span>' + f.x.name + "</span><small>" + f.x[l].price + "</small></button></li>";
    }).join("") + "</ul>" : "";
  }

  range.addEventListener("input", render);
  chips.forEach(function (c) {
    c.addEventListener("click", function () {
      cat = c.dataset.cat; picked = null;
      chips.forEach(function (x) { x.setAttribute("aria-pressed", x === c); });
      render();
    });
  });
  document.getElementById("result").addEventListener("click", function (e) {
    var p = e.target.closest("[data-pick]"), m = e.target.closest("[data-map]"), r = e.target.closest("[data-raise]");
    if (p) { picked = +p.dataset.pick; render(); main.scrollIntoView({ behavior: "smooth", block: "nearest" }); }
    if (m && window.STRMap) window.STRMap.focus(+m.dataset.map);
    if (r) { range.value = r.dataset.raise; render(); }
  });
  document.addEventListener("langchange", function () { shown = null; render(); });
  render();
})();

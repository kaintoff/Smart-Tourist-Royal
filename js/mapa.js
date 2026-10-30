(function () {
  var N = window.NEGOCIOS, el = document.getElementById("mapa-canvas"), list = document.getElementById("mapa-list");
  var map, markers = {};
  function lang() { return document.documentElement.lang === "en" ? "en" : "es"; }

  function renderList() {
    list.innerHTML = N.map(function (b) {
      return '<li><button type="button" data-id="' + b.id + '"><span class="pin">' + b.id + '</span><span>' + b.name +
        '<small>' + b[lang()].price + '</small></span></button></li>';
    }).join("");
  }
  function popup(b) {
    var d = b[lang()];
    return "<strong>" + b.name + "</strong><br>" + d.tag + "<br>" + d.loc + "<br>" + d.price;
  }

  if (typeof L === "undefined") {
    el.innerHTML = '<p class="map-fail">No se pudo cargar el mapa. Revisa tu conexión a internet. / The map could not load. Check your internet connection.</p>';
    window.STRMap = { focus: function () {}, setFit: function () {} };
    renderList();
    document.addEventListener("langchange", renderList);
    return;
  }

  map = L.map(el, { scrollWheelZoom: false });
  L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
    maxZoom: 19,
    attribution: "Tiles &copy; Esri &mdash; Esri, HERE, Garmin, OpenStreetMap contributors"
  }).addTo(map);
  N.forEach(function (b) {
    markers[b.id] = L.marker([b.lat, b.lng], {
      title: b.name,
      icon: L.divIcon({ className: "pin-wrap", html: '<span class="pin">' + b.id + "</span>", iconSize: [34, 34], iconAnchor: [17, 17] })
    }).addTo(map).bindPopup(popup(b));
  });
  function overview() { map.fitBounds(N.map(function (b) { return [b.lat, b.lng]; }), { padding: [50, 50] }); }
  overview();
  map.on("click", function () { map.scrollWheelZoom.enable(); });
  map.on("mouseout", function () { map.scrollWheelZoom.disable(); });

  function focus(id) {
    document.getElementById("mapa").scrollIntoView({ behavior: "smooth" });
    var b = N.filter(function (x) { return x.id === id; })[0];
    map.once("moveend", function () { markers[id].openPopup(); });
    map.flyTo([b.lat, b.lng], 16, { duration: 1.2 });
  }
  window.STRMap = {
    focus: focus,
    setFit: function (ids) {
      N.forEach(function (b) {
        var m = markers[b.id].getElement();
        if (m) m.classList.toggle("out", ids.indexOf(b.id) < 0);
      });
    }
  };

  list.addEventListener("click", function (e) {
    var b = e.target.closest("[data-id]");
    if (b) focus(+b.dataset.id);
  });
  document.getElementById("map-reset").addEventListener("click", function () { map.closePopup(); overview(); });
  document.addEventListener("langchange", function () {
    renderList();
    N.forEach(function (b) { markers[b.id].setPopupContent(popup(b)); });
  });
  renderList();
})();

(function () {
  var grid = document.getElementById("sitios-grid");
  var T = {
    es: { loc: "Ubicación", price: "Presupuesto", hours: "Horario", map: "Ver en el mapa" },
    en: { loc: "Location", price: "Budget", hours: "Hours", map: "View on map" }
  };
  function render() {
    var l = document.documentElement.lang === "en" ? "en" : "es", t = T[l];
    grid.innerHTML = window.NEGOCIOS.map(function (b) {
      var d = b[l];
      return '<article class="site">' +
        '<img src="assets/img/negocios/n' + b.id + '-1.jpg" alt="' + b.name + '" loading="lazy">' +
        '<h3>' + b.name + '</h3><p class="site-tag">' + d.tag + '</p><p>' + d.desc + '</p>' +
        '<dl><div><dt>' + t.loc + '</dt><dd>' + d.loc + '</dd></div>' +
        '<div><dt>' + t.price + '</dt><dd>' + d.price + (d.extra ? '<br>' + d.extra : '') + '</dd></div>' +
        (d.hours ? '<div><dt>' + t.hours + '</dt><dd>' + d.hours + '</dd></div>' : '') + '</dl>' +
        '<button class="link" type="button" data-map="' + b.id + '">' + t.map + '</button></article>';
    }).join("");
  }
  grid.addEventListener("click", function (e) {
    var b = e.target.closest("[data-map]");
    if (b && window.STRMap) window.STRMap.focus(+b.dataset.map);
  });
  document.addEventListener("langchange", render);
  render();
})();

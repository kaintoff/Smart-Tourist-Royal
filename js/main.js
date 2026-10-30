(function () {
  var services = {
    es: [
      ["Hospedaje", "Opciones de hospedaje para que el turista encuentre dónde quedarse y planifique su estadía en Barranquilla.", "Private stays: alojamientos privados, cómodos y elegantes."],
      ["Restaurantes", "Restaurantes y propuestas gastronómicas de la ciudad, con ubicación, horarios y descripción de cada establecimiento.", "Información clara para comparar antes de elegir."],
      ["Actividades", "Actividades y experiencias para complementar la visita, organizadas por categorías y características.", "Exclusive experiences: lugares y planes especiales dentro de la ciudad."],
      ["Sitios de interés", "Lugares turísticos y sitios de interés para descubrir lo que ofrece Barranquilla.", "Todo en un solo espacio para planificar la estadía."]
    ],
    en: [
      ["Accommodation", "Accommodation options so tourists can find where to stay and plan their time in Barranquilla.", "Private stays: private, comfortable and elegant lodgings."],
      ["Restaurants", "The city's restaurants and food options, with location, schedules and a description of each establishment.", "Clear information to compare before choosing."],
      ["Activities", "Activities and experiences to complement the visit, organized by categories and characteristics.", "Exclusive experiences: special places and plans across the city."],
      ["Places of interest", "Tourist sites and places of interest to discover what Barranquilla has to offer.", "Everything in one place to plan your stay."]
    ]
  };
  var lang = "es", current = 0;
  try { lang = localStorage.getItem("str-lang") || "es"; } catch (e) {}

  var tabs = document.querySelectorAll('[role="tab"]');
  function renderService() {
    var s = services[lang][current];
    document.getElementById("panel-title").textContent = s[0];
    document.getElementById("panel-text").textContent = s[1];
    document.getElementById("panel-note").textContent = s[2];
  }
  tabs.forEach(function (t) {
    t.addEventListener("click", function () {
      current = +t.dataset.i;
      tabs.forEach(function (x) { x.setAttribute("aria-selected", x === t); });
      renderService();
    });
  });

  function setLang(l) {
    lang = l;
    document.documentElement.lang = l;
    document.querySelectorAll("[data-en]").forEach(function (el) {
      if (!el.dataset.es) el.dataset.es = el.innerHTML;
      el.innerHTML = l === "en" ? el.dataset.en : el.dataset.es;
    });
    var spans = document.querySelectorAll("#lang span");
    spans[0].className = l === "es" ? "on" : "";
    spans[1].className = l === "en" ? "on" : "";
    renderService();
    document.dispatchEvent(new CustomEvent("langchange", { detail: l }));
    try { localStorage.setItem("str-lang", l); } catch (e) {}
  }
  document.getElementById("lang").addEventListener("click", function () {
    setLang(lang === "es" ? "en" : "es");
  });
  setLang(lang);

  var burger = document.getElementById("burger"), menu = document.getElementById("menu");
  burger.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });
  menu.addEventListener("click", function () {
    menu.classList.remove("open");
    burger.setAttribute("aria-expanded", false);
  });
})();

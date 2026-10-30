/* Datos de los negocios. min/max están en pesos colombianos (COP).
   Las coordenadas (lat, lng) son aproximadas: ajústalas aquí si necesitas más precisión. */
window.NEGOCIOS = [
  {
    id: 1, name: "Don Ernesto Château", cat: "restaurantes", lat: 10.9932, lng: -74.8052, min: 40000, max: 100000, imgs: 6,
    es: { tag: "Restaurante de estilo francés", loc: "Carrera 52 #76-183, Alto Prado, Barranquilla", price: "$40.000 – $100.000 COP",
      desc: "Restaurante de estilo francés en Alto Prado, reconocido por su arquitectura elegante y su decoración inspirada en los clásicos châteaux europeos. Su propuesta incluye carnes a la parrilla, cortes especiales, pastas, desayuno y brunch. Ideal para una comida especial en uno de los espacios más llamativos de Barranquilla." },
    en: { tag: "French-style restaurant", loc: "Carrera 52 #76-183, Alto Prado, Barranquilla", price: "$40,000 – $100,000 COP",
      desc: "French-style restaurant in Alto Prado, known for its elegant architecture and décor inspired by classic European châteaux. Its menu includes grilled meats, special cuts, pasta, breakfast and brunch. A great choice for a special meal in one of Barranquilla's most eye-catching venues." }
  },
  {
    id: 2, name: "Hotel Windsor Barranquilla", cat: "hospedaje", lat: 11.0005, lng: -74.8005, min: 200000, max: 300000, imgs: 6,
    es: { tag: "Hotel con torre de reloj", loc: "Calle 84 #46-07, Granadillo, Barranquilla", price: "$200.000 – $300.000 COP por noche",
      desc: "Hotel en el norte de la ciudad, con arquitectura de estilo europeo y su reconocida torre de reloj. Ofrece habitaciones estándar, superiores, deluxe y suites, además de piscina, gimnasio, spa, sauna, baño turco y el restaurante Rey Arturo, con carnes, pastas y pescados. Para quienes buscan descanso, comodidad y servicios completos." },
    en: { tag: "Hotel with a clock tower", loc: "Calle 84 #46-07, Granadillo, Barranquilla", price: "$200,000 – $300,000 COP per night",
      desc: "Hotel in the north of the city with European-style architecture and its well-known clock tower. It offers standard, superior and deluxe rooms and suites, plus a pool, gym, spa, sauna, Turkish bath and the Rey Arturo restaurant, serving meats, pasta and fish. For travelers who want rest, comfort and full services." }
  },
  {
    id: 3, name: "Noa Sushi & Robata", cat: "restaurantes", lat: 10.9927, lng: -74.806, min: 80000, max: 200000, imgs: 6,
    es: { tag: "Gastronomía · Cocina japonesa y fusión asiática", loc: "Carrera 52 #76-208, Barranquilla", price: "$80.000 – $200.000 COP por persona",
      desc: "Restaurante de cocina japonesa y fusión asiática contemporánea. Combina sushi, preparaciones a la robata (parrilla japonesa), mariscos, platos de autor y coctelería. Su ambiente elegante lo hace una buena opción para cenas especiales." },
    en: { tag: "Dining · Japanese and Asian fusion", loc: "Carrera 52 #76-208, Barranquilla", price: "$80,000 – $200,000 COP per person",
      desc: "Japanese and contemporary Asian fusion restaurant. It combines sushi, robata (Japanese grill) dishes, seafood, signature plates and cocktails. Its elegant atmosphere makes it a good choice for special dinners." }
  },
  {
    id: 4, name: "Kúa Spa – Hotel Movich Buró 51", cat: "bienestar", lat: 11.0095, lng: -74.8045, min: 250000, max: 250000, imgs: 4,
    es: { tag: "Spa y bienestar", loc: "Calle 94 #51B-57, Riomar, Barranquilla", price: "$250.000 COP por persona",
      desc: "Espacio dedicado al bienestar y la relajación dentro del Hotel Movich Buró 51. Ofrece masajes, tratamientos faciales y corporales, aromaterapia, hidroterapia y acceso a zonas húmedas como sauna y baño turco, en un ambiente tranquilo y exclusivo." },
    en: { tag: "Spa and wellness", loc: "Calle 94 #51B-57, Riomar, Barranquilla", price: "$250,000 COP per person",
      desc: "A space for wellness and relaxation inside the Hotel Movich Buró 51. It offers massages, facial and body treatments, aromatherapy, hydrotherapy and access to wet areas such as sauna and Turkish bath, in a calm and exclusive setting." }
  },
  {
    id: 5, name: "Muncher Social Bar", cat: "restaurantes", lat: 11.0005, lng: -74.817, min: 50000, max: 100000, imgs: 2,
    es: { tag: "Social bar · Comida americana", loc: "Le Meridiem II, Calle 84 #64-29, locales 14 y 15, Riomar", price: "$50.000 – $100.000 COP aprox.",
      extra: "Platos y hamburguesas: $40.000 – $60.000 COP.",
      desc: "Restaurante de estilo social bar en Riomar, especializado en hamburguesas, carnes a la parrilla y comida americana. Combina gastronomía y entretenimiento en un ambiente moderno para compartir con amigos o familia y ver encuentros deportivos. Tiene opciones para compartir y servicio a domicilio." },
    en: { tag: "Social bar · American food", loc: "Le Meridiem II, Calle 84 #64-29, locales 14 and 15, Riomar", price: "$50,000 – $100,000 COP approx.",
      extra: "Dishes and burgers: $40,000 – $60,000 COP.",
      desc: "Social bar-style restaurant in Riomar, specializing in burgers, grilled meats and American food. It blends dining and entertainment in a modern setting to share with friends or family and watch sports. It offers sharing plates and delivery." }
  },
  {
    id: 6, name: "Zoológico de Barranquilla", cat: "sitios", lat: 10.994, lng: -74.821, min: 42900, max: 42900, imgs: 7,
    es: { tag: "Atractivo turístico y recreativo", loc: "Calle 77 #68-40, Barranquilla", price: "Adultos: $42.900 COP",
      hours: "Lunes a viernes de 9:00 a. m. a 4:00 p. m.; sábados y domingos hasta las 4:30 p. m.",
      extra: "Niños (80 a 150 cm): $36.900 COP. Menores de 80 cm: entrada gratuita en grupos familiares. No incluye gastos adicionales.",
      desc: "Uno de los principales atractivos de la ciudad, administrado por la Fundación Botánica y Zoológica de Barranquilla. Alberga más de 430 animales y ofrece observación de fauna, pericario, granja interactiva y actividades de educación ambiental. Ideal para disfrutar en familia y aprender sobre la naturaleza." },
    en: { tag: "Tourist and recreational attraction", loc: "Calle 77 #68-40, Barranquilla", price: "Adults: $42,900 COP",
      hours: "Monday to Friday 9:00 a.m. to 4:00 p.m.; Saturday and Sunday until 4:30 p.m.",
      extra: "Children (80 to 150 cm): $36,900 COP. Under 80 cm: free entry in family groups. Extra expenses not included.",
      desc: "One of the city's main attractions, run by the Fundación Botánica y Zoológica de Barranquilla. It is home to more than 430 animals and offers wildlife viewing, an aviary, an interactive farm and environmental education activities. Ideal for a family day and learning about nature." }
  }
];

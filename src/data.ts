import { Vehicle, Inquiry, ServiceAppointment } from './types';

export const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: 'renault-oroch-zen-0km',
    brand: 'Renault',
    model: 'Duster Oroch 1.6 Zen 16V',
    year: 2025,
    price: 21990,
    category: 'Pick Up Doble Cabina',
    engine: '1.6L SCe 16V 4 Cilindros',
    power: '115 HP',
    acceleration: '11.5 Sec',
    drive: 'FWD Delantera',
    transmission: 'Manual',
    transmissionDetail: 'Manual de 5 Velocidades',
    fuelType: 'Petrol',
    mileage: 0,
    color: 'Blanco Glaciar',
    status: 'Active',
    daysOnLot: 1,
    stockId: 'CS-ORO-0KM',
    vin: '93YORC25PM910248',
    description: 'Renault Duster Oroch versión Zen 1.6 16v 0 KM a estrenar. Doble cabina con gran espacio interior para 5 adultos y caja de carga muy amplia. Equipada con dirección electrohidráulica, aire acondicionado, pantalla táctil Media Evolution con conectividad para smartphones, frenos ABS y control de estabilidad (ESP). Lista para entrega inmediata en Car Seller Paysandú.',
    features: [
      'Unidad 0 KM a estrenar con garantía oficial de fábrica.',
      'Caja de carga con capacidad de 650 kg y 683 litros.',
      'Pantalla multimedia táctil con Apple CarPlay y Android Auto.',
      'Control de estabilidad (ESP) y asistente de arranque en pendientes (HSA).',
      'Financiación hasta el 100% en Car Seller Paysandú.'
    ],
    image: '/cars/ig_DY7OSjRlbpA.jpg',
    gallery: [
      '/cars/ig_DY7OSjRlbpA.jpg'
    ]
  },
  {
    id: 'fiat-strada-endurance-2022',
    brand: 'Fiat',
    model: 'Strada Endurance 1.4 Cabina Plus',
    year: 2022,
    price: 15900,
    category: 'Pick Up Utilitario',
    engine: '1.4L Fire EVO 8V',
    power: '85 HP',
    acceleration: '12.3 Sec',
    drive: 'FWD con TC+ E-Locker',
    transmission: 'Manual',
    transmissionDetail: 'Manual de 5 Velocidades',
    fuelType: 'Petrol',
    mileage: 42000,
    color: 'Blanco Banchisa',
    status: 'Active',
    daysOnLot: 2,
    stockId: 'CS-STR-2022',
    vin: '9BD28148N0E192847',
    description: 'Fiat Strada Endurance año 2022 con 42.000 km. Excelente estado de conservación general, utilizada únicamente para uso personal. Motor Fire 1.4 sumamente noble y económico. Equipada con control de tracción avanzado TC+, aire acondicionado, dirección asistida, protector de caja, lona marítima y frenos ABS.',
    features: [
      'Motor 1.4 Fire de mínimo mantenimiento y repuestos súper accesibles.',
      'Control de tracción avanzado TC+ para caminos difíciles y arena.',
      'Excelente capacidad de carga de 720 kg.',
      'Protector de caja y lona marítima incluidos.',
      'Financiación en pesos uruguayos o dólares.'
    ],
    image: '/cars/ig_Dd1aK8HFt2E.jpg',
    gallery: [
      '/cars/ig_Dd1aK8HFt2E.jpg',
      '/cars/fiat-strada-rear.jpg',
      '/cars/fiat-strada-interior.jpg'
    ]
  },
  {
    id: 'volkswagen-saveiro-extreme-2025',
    brand: 'Volkswagen',
    model: 'Saveiro Extreme Doble Cabina 1.6 16V',
    year: 2025,
    price: 18900,
    category: 'Pick Up Doble Cabina',
    engine: '1.6L MSI 16V Nafta',
    power: '110 HP',
    acceleration: '10.2 Sec',
    drive: 'FWD Delantera',
    transmission: 'Manual',
    transmissionDetail: 'Manual de 5 Velocidades',
    fuelType: 'Petrol',
    mileage: 5200,
    color: 'Gris Oliver Metalizado',
    status: 'Active',
    daysOnLot: 2,
    stockId: 'CS-SAV-EXT25',
    vin: '9BWDB45U2SP019283',
    description: 'Volkswagen Saveiro Extreme Doble Cabina año 2025 con solo 5.200 km reales. Versión tope de gama con diseño renovado. Equipada con llantas diamantadas de 15 pulgadas, cámara de visión trasera, tapizados exclusivos Extreme en cuero ecológico, pantalla táctil Composition Touch con App-Connect, volante multifunción en cuero y sensores de estacionamiento.',
    features: [
      'Solo 5.200 km en garantía oficial de Volkswagen.',
      'Versión Extreme con tapizados en cuero y estética deportiva.',
      'Cámara de estacionamiento trasera y sensores acústicos.',
      'Pantalla multimedia táctil con Android Auto y Apple CarPlay.',
      'Barra de San Antonio exclusiva y lona marítima original.'
    ],
    image: '/cars/ig_DdobhEpFmJA.jpg',
    gallery: [
      '/cars/ig_DdobhEpFmJA.jpg',
      '/cars/vw-saveiro-front.jpg',
      '/cars/vw-saveiro-rear.jpg'
    ]
  },
  {
    id: 'volkswagen-tiguan-highline-2020',
    brand: 'Volkswagen',
    model: 'Tiguan Allspace Highline 1.4 TSI 7 Plazas',
    year: 2020,
    price: 27900,
    category: 'SUV Familiar 7 Plazas',
    engine: '1.4L TSI Turbo 16V',
    power: '150 HP',
    acceleration: '9.3 Sec',
    drive: 'FWD Delantera',
    transmission: 'Automatic',
    transmissionDetail: 'Automática Secuencial DSG 6 Velocidades',
    fuelType: 'Petrol',
    mileage: 68000,
    color: 'Blanco Puro Perlado',
    status: 'Active',
    daysOnLot: 3,
    stockId: 'CS-TIG-2020',
    vin: '3VW5T7AX7LM092841',
    description: 'Volkswagen Tiguan Allspace versión Highline año 2020 con 68.000 km. Capacidad para 7 pasajeros con 3 filas de asientos. Máximo nivel de confort y seguridad: techo solar panorámico corredizo eléctrico, tapizados en cuero Vienna con butacas calefaccionadas y memoria eléctrica, climatizador digital tri-zona, faros LED adaptativos y baúl con apertura eléctrica.',
    features: [
      'Configuración de 7 plazas para toda la familia.',
      'Techo solar panorámico corredizo eléctrico con cortina.',
      'Motor 1.4 TSI Turbo de 150 HP potente y eficiente.',
      'Caja automática DSG de doble embrague de respuesta inmediata.',
      'Tapizado en cuero premium, asientos eléctricos con memoria.'
    ],
    image: '/cars/ig_DdZiZmpl_M0.jpg',
    gallery: [
      '/cars/ig_DdZiZmpl_M0.jpg',
      '/cars/vw-tiguan-front.jpg',
      '/cars/vw-tiguan-interior.jpg',
      '/cars/vw-tiguan-rear.jpg'
    ]
  },
  {
    id: 'renault-kwid-life-2020',
    brand: 'Renault',
    model: 'Kwid Life 1.0 SCe',
    year: 2020,
    price: 9800,
    category: 'City Car Económico',
    engine: '1.0L SCe 3 Cilindros 12V',
    power: '66 HP',
    acceleration: '14.1 Sec',
    drive: 'FWD Delantera',
    transmission: 'Manual',
    transmissionDetail: 'Manual de 5 Velocidades',
    fuelType: 'Petrol',
    mileage: 54000,
    color: 'Blanco Glaciar',
    status: 'Active',
    daysOnLot: 3,
    stockId: 'CS-KWD-2020',
    vin: '93YBB0801LL102948',
    description: 'Renault Kwid versión Life año 2020 con 54.000 km. Destacado por su agilidad urbana, despeje del suelo tipo SUV y mínimo consumo (más de 18 km/litro). Equipado con 4 airbags de fábrica (frontales y laterales), frenos ABS, aire acondicionado y dirección asistida eléctrica. Documentación 100% al día.',
    features: [
      '4 airbags de serie para máxima seguridad en el segmento.',
      'Excelente altura libre al suelo de 18 cm.',
      'Consumo promedio sobresaliente: 18 a 20 km/litro.',
      'Patente anual y seguro muy económicos.',
      'Financiación hasta el 100% en Car Seller Paysandú.'
    ],
    image: '/cars/ig_Dd1_i_GIBUS.jpg',
    gallery: [
      '/cars/ig_Dd1_i_GIBUS.jpg',
      '/cars/renault-kwid-front.jpg',
      '/cars/renault-kwid-rear.jpg'
    ]
  },
  {
    id: 'suzuki-alto-800-2018',
    brand: 'Suzuki',
    model: 'Alto 800 GA',
    year: 2018,
    price: 7900,
    category: 'City Car Económico',
    engine: '0.8L F8D 3 Cilindros',
    power: '48 HP',
    acceleration: '15.5 Sec',
    drive: 'FWD Delantera',
    transmission: 'Manual',
    transmissionDetail: 'Manual de 5 Velocidades',
    fuelType: 'Petrol',
    mileage: 62000,
    color: 'Gris Plata Metalizado',
    status: 'Active',
    daysOnLot: 4,
    stockId: 'CS-ALT-2018',
    vin: 'MA3EAA11S00891024',
    description: 'Suzuki Alto 800 GA año 2018 con 62.000 km. Confiabilidad mecánica japonesa inigualable. El vehículo más rendidor y económico de mantener del mercado uruguayo, superando los 20 km/litro en ruta. Equipado con aire acondicionado, doble airbag frontal y frenos ABS.',
    features: [
      'Consumo récord superior a 20 km/litro.',
      'Mantenimiento y repuestos de costo mínimo.',
      'Aire acondicionado funcionando en perfecto estado.',
      'Doble airbag frontal y sistema de frenos ABS.',
      'Ideal para primer auto o movilidad diaria de bajo costo.'
    ],
    image: '/cars/ig_DdluPkaljOa.jpg',
    gallery: [
      '/cars/ig_DdluPkaljOa.jpg',
      '/cars/suzuki-alto-front.jpg',
      '/cars/suzuki-alto-rear.jpg'
    ]
  },
  {
    id: 'geely-lc-13-2013',
    brand: 'Geely',
    model: 'LC 1.3 GL Full',
    year: 2013,
    price: 6900,
    category: 'City Car',
    engine: '1.3L 4 Cilindros 16V',
    power: '86 HP',
    acceleration: '13.2 Sec',
    drive: 'FWD Delantera',
    transmission: 'Manual',
    transmissionDetail: 'Manual de 5 Velocidades',
    fuelType: 'Petrol',
    mileage: 95000,
    color: 'Rojo Carmín',
    status: 'Active',
    daysOnLot: 5,
    stockId: 'CS-GLC-2013',
    vin: 'LB3713512DA092184',
    description: 'Geely LC 1.3 GL Full año 2013 con 95.000 km. Excelente precio y completo equipamiento de confort: aire acondicionado, dirección hidráulica, vidrios eléctricos en las 4 puertas, espejos eléctricos, llantas de aleación originales, faros antiniebla, doble airbag y frenos ABS con EBD. Títulos prontos para transferir.',
    features: [
      'Precio de oportunidad muy accesible: US$ 6.900.',
      'Equipamiento Full: 4 vidrios eléctricos y llantas de aleación.',
      'Aire acondicionado y dirección hidráulica.',
      'Motor 1.3 de 86 HP ágil y de repuestos económicos.',
      'Financiación ágil en Car Seller Paysandú.'
    ],
    image: '/cars/ig_DdrJ5-2loql.jpg',
    gallery: [
      '/cars/ig_DdrJ5-2loql.jpg'
    ]
  },
  {
    id: 'fiat-strada-volcano-2025',
    brand: 'Fiat',
    model: 'Strada Volcano 1.3 Automática CVT',
    year: 2025,
    price: 21900,
    category: 'Pick Up Doble Cabina',
    engine: '1.3L Firefly 8V Nafta',
    power: '99 HP',
    acceleration: '11.8 Sec',
    drive: 'FWD con TC+ Avanzado',
    transmission: 'Automatic',
    transmissionDetail: 'Automática CVT de 7 Marchas Preprogramadas',
    fuelType: 'Petrol',
    mileage: 8700,
    color: 'Gris Silverstone Metalizado',
    status: 'Active',
    daysOnLot: 2,
    stockId: 'CS-STR-2025',
    vin: '9BD28148P0E102938',
    description: 'Fiat Strada Volcano modelo 2025 con caja automática CVT de 7 velocidades y solo 8.700 km reales. Estado igual a 0 km. Máximo nivel de equipamiento: faros delanteros Full LED, tapizados mixtos en cuero y tela, pantalla multimedia táctil de 7 pulgadas con conectividad inalámbrica Apple CarPlay y Android Auto, cámara de marcha atrás y climatizador digital.',
    features: [
      'Caja automática CVT de 7 marchas con levas al volante.',
      'Faros Full LED de excelente poder lumínico.',
      'Pantalla multimedia táctil con conexión inalámbrica para smartphones.',
      'Solo 8.700 km con garantía oficial vigente.',
      'Financiación en pesos o dólares hasta 60 cuotas.'
    ],
    image: '/cars/fiat-strada-front.jpg',
    gallery: [
      '/cars/fiat-strada-front.jpg',
      '/cars/fiat-strada-rear.jpg',
      '/cars/fiat-strada-interior.jpg'
    ]
  },
  {
    id: 'hyundai-hb20-comfort-2025',
    brand: 'Hyundai',
    model: 'HB20 1.0 Comfort Plus',
    year: 2025,
    price: 14990,
    category: 'Hatchback Moderno',
    engine: '1.0L Kappa 12V 3 Cilindros',
    power: '80 HP',
    acceleration: '12.5 Sec',
    drive: 'FWD Delantera',
    transmission: 'Manual',
    transmissionDetail: 'Manual de 5 Velocidades',
    fuelType: 'Petrol',
    mileage: 26000,
    color: 'Blanco Polar',
    status: 'Active',
    daysOnLot: 3,
    stockId: 'CS-HB20-2025',
    vin: '9BHBH51BALP019284',
    description: 'Hyundai HB20 Comfort año 2025 con 26.000 km. Línea moderna con 6 airbags de serie, control electrónico de estabilidad (ESP), control de tracción y asistente en pendientes. Pantalla multimedia táctil de 8 pulgadas compatible con Android Auto y Apple CarPlay, volante multifunción y computadora de a bordo.',
    features: [
      'Seguridad líder: 6 airbags de fábrica y control de estabilidad (ESP).',
      'Garantía oficial de 5 años o 100.000 km transferible.',
      'Motor 1.0 Kappa de bajísimo consumo (17 km/lt en uso mixto).',
      'Pantalla multimedia táctil con conectividad Android Auto y Apple CarPlay.',
      'Financiación ágil en pesos o dólares en Car Seller.'
    ],
    image: '/cars/hyundai-hb20-front.jpg',
    gallery: [
      '/cars/hyundai-hb20-front.jpg',
      '/cars/hyundai-hb20-rear.jpg',
      '/cars/hyundai-hb20-interior.jpg'
    ]
  },
  {
    id: 'citroen-c3-feel-2024',
    brand: 'Citroën',
    model: 'C3 1.2 PureTech Feel',
    year: 2024,
    price: 14900,
    category: 'Crossover Urbano',
    engine: '1.2L PureTech 3 Cilindros',
    power: '82 HP',
    acceleration: '12.8 Sec',
    drive: 'FWD Delantera',
    transmission: 'Manual',
    transmissionDetail: 'Manual de 5 Velocidades',
    fuelType: 'Petrol',
    mileage: 30500,
    color: 'Azul Spring con Techo Blanco',
    status: 'Active',
    daysOnLot: 4,
    stockId: 'CS-C3F-2024',
    vin: '93YCC8E24PM394812',
    description: 'Citroën C3 versión Feel año 2024 con 30.500 km. Diseño moderno con excelente despeje del suelo tipo SUV, pantalla táctil gigante de 10 pulgadas con Android Auto y Apple CarPlay inalámbricos. Muy económico y ágil.',
    features: [
      'Pantalla táctil de 10 pulgadas con conexión inalámbrica para smartphones.',
      'Excelente altura libre al suelo de 18 cm, ideal para calles y caminos.',
      'Luces diurnas LED y llantas de aleación diamantadas.',
      'Aire acondicionado digital y dirección eléctrica progresiva.',
      'Financiación hasta el 100% en hasta 60 cuotas.'
    ],
    image: '/cars/citroen-c3-front.jpg',
    gallery: [
      '/cars/citroen-c3-front.jpg',
      '/cars/citroen-c3-rear.jpg'
    ]
  },
  {
    id: 'chevrolet-onix-joy-2023',
    brand: 'Chevrolet',
    model: 'Onix Joy Black 1.0',
    year: 2023,
    price: 12500,
    category: 'Hatchback Confiable',
    engine: '1.0L 4 Cilindros SPE/4',
    power: '78 HP',
    acceleration: '13.0 Sec',
    drive: 'FWD Delantera',
    transmission: 'Manual',
    transmissionDetail: 'Manual de 6 Velocidades',
    fuelType: 'Petrol',
    mileage: 30490,
    color: 'Negro Oro Negro Metalizado',
    status: 'Active',
    daysOnLot: 5,
    stockId: 'CS-ONX-2023',
    vin: '9BGKD48U0PG481029',
    description: 'Chevrolet Onix Joy año 2023 con 30.490 km reales. Única dueña, todos los servicios oficiales realizados rigurosamente en concesionario. Caja manual de 6 marchas que brinda un consumo extraordinario en ruta. Aire acondicionado, dirección eléctrica y frenos ABS.',
    features: [
      'Única dueña con historial de servicios oficiales al día.',
      'Caja manual de 6 velocidades para máxima economía de combustible.',
      'Solo 30.490 kilómetros verificables.',
      'Dirección asistida eléctricamente y aire acondicionado.',
      'Patente anual y seguro muy convenientes.'
    ],
    image: '/cars/chevrolet-onix-front.jpg',
    gallery: [
      '/cars/chevrolet-onix-front.jpg',
      '/cars/chevrolet-onix-rear.jpg',
      '/cars/chevrolet-onix-interior.jpg'
    ]
  },
  {
    id: 'suzuki-celerio-gl-2021',
    brand: 'Suzuki',
    model: 'Celerio 1.0 GL',
    year: 2021,
    price: 10900,
    category: 'Hatchback Compacto',
    engine: '1.0L K10B 3 Cilindros',
    power: '68 HP',
    acceleration: '13.5 Sec',
    drive: 'FWD Delantera',
    transmission: 'Manual',
    transmissionDetail: 'Manual de 5 Velocidades',
    fuelType: 'Petrol',
    mileage: 48000,
    color: 'Gris Plata Metalizado',
    status: 'Active',
    daysOnLot: 6,
    stockId: 'CS-CEL-2021',
    vin: 'MA3FHB11S00918274',
    description: 'Suzuki Celerio GL año 2021. Reconocido por su legendaria fiabilidad japonesa y mínimo consumo (más de 19 km/lt promedio). Excelente estado de conservación interior y exterior. Aire acondicionado, doble airbag, ABS y vidrios eléctricos.',
    features: [
      'Consumo medio récord superior a 19 km/litro.',
      'Motor 1.0 súper confiable y económico de mantener.',
      'Doble airbag frontal y frenos ABS con EBD.',
      'Vidrios eléctricos y cierre centralizado con comando a distancia.',
      'Financiable 100% en Car Seller Paysandú.'
    ],
    image: '/cars/suzuki-celerio-front.jpg',
    gallery: [
      '/cars/suzuki-celerio-front.jpg',
      '/cars/suzuki-celerio-rear.jpg'
    ]
  }
];

export const DEFAULT_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-1',
    vehicleId: 'renault-oroch-zen-0km',
    vehicleName: 'Renault Duster Oroch 1.6 Zen 16V 0KM',
    fullName: 'Gonzalo Silva',
    email: 'gonzalo.silva@ruralpaysandu.com.uy',
    message: 'Buenas tardes, me interesa la Duster Oroch 0KM. ¿Aceptan permuta por una camioneta 2020 y qué opciones de financiación tienen en Paysandú?',
    date: 'Hace 15 min',
    status: 'New'
  },
  {
    id: 'inq-2',
    vehicleId: 'volkswagen-saveiro-extreme-2025',
    vehicleName: 'Volkswagen Saveiro Extreme Doble Cabina 1.6 16V',
    fullName: 'Esteban Martínez',
    email: 'esteban.martinez@agro.uy',
    message: 'Hola, consulto por la Saveiro Extreme 2025 con 5.200 km si se puede ir a ver a Florida 1615 esta tarde.',
    date: 'Hace 1 hora',
    status: 'New'
  },
  {
    id: 'inq-3',
    vehicleId: 'renault-kwid-life-2020',
    vehicleName: 'Renault Kwid Life 1.0 SCe 2020',
    fullName: 'Mariana Rossi',
    email: 'mrossi@gmail.com',
    message: 'Hola, quería consultar qué entrega mínima piden por el Kwid 2020 de US$ 9.800 y cuotas en pesos.',
    date: 'Hace 3 horas',
    status: 'New'
  }
];

export const UPCOMING_SERVICES: ServiceAppointment[] = [
  {
    id: 'ser-1',
    vehicleName: 'Renault Duster Oroch 1.6 Zen 16V',
    type: 'Alistamiento de Entrega 0KM y Detallado',
    dateTime: 'Mañana, 09:30 AM',
    icon: 'wrench'
  },
  {
    id: 'ser-2',
    vehicleName: 'Volkswagen Saveiro Extreme 1.6 16V',
    type: 'Revisión Oficial Pre-Entrega',
    dateTime: 'Viernes, 14:00 PM',
    icon: 'palette'
  }
];

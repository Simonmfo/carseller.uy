import { Vehicle, Inquiry, ServiceAppointment } from './types';

export const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: 'fiat-strada-volcano-2025',
    brand: 'Fiat',
    model: 'Strada Volcano 1.3 Automática CVT',
    year: 2025,
    price: 21900,
    category: 'Pick-up Doble Cabina',
    engine: '1.3L Firefly 8V Nafta',
    power: '99 HP',
    acceleration: '12.0 Sec',
    drive: 'FWD con TC+ Bloqueo Electrónico',
    transmission: 'Automatic',
    transmissionDetail: 'Automática CVT de 7 Velocidades',
    fuelType: 'Petrol',
    mileage: 8700,
    color: 'Rojo Passione',
    status: 'Active',
    daysOnLot: 1,
    stockId: 'CS-STR-2025',
    vin: '9BD2814F2RP109283',
    description: 'Fiat Strada Volcano año 2025 con caja automática CVT de 7 marchas y solo 8.700 km reales. Estado igual a 0 km. Tapizado combinado con cuero, pantalla Uconnect de 7 pulgadas inalámbrica, faros LED y capota marítima. Garantía de fábrica vigente. Financiación hasta el 100% en Car Seller.',
    features: [
      'Caja automática CVT de 7 velocidades y modo Sport.',
      'Solo 8.700 kilómetros en garantía oficial.',
      'Pantalla multimedia de 7" con Android Auto y Apple CarPlay sin cables.',
      'Control de estabilidad, 4 airbags y control de tracción avanzado TC+.',
      'Cámara de retroceso y sensores de estacionamiento traseros.',
      'Financiación hasta el 100% en hasta 60 cuotas en Car Seller.'
    ],
    image: '/cars/fiat-strada-front.jpg',
    gallery: [
      '/cars/fiat-strada-front.jpg',
      '/cars/fiat-strada-rear.jpg',
      '/cars/fiat-strada-interior.jpg'
    ]
  },
  {
    id: 'volkswagen-saveiro-doble-cabina-2025',
    brand: 'Volkswagen',
    model: 'Saveiro Doble Cabina 1.6 16V',
    year: 2025,
    price: 17900,
    category: 'Pick-up Doble Cabina',
    engine: '1.6L MSI 16V Nafta',
    power: '110 HP',
    acceleration: '10.8 Sec',
    drive: 'FWD Delantera',
    transmission: 'Manual',
    transmissionDetail: 'Manual de 5 Velocidades',
    fuelType: 'Petrol',
    mileage: 4300,
    color: 'Blanco Cristal',
    status: 'Active',
    daysOnLot: 2,
    stockId: 'CS-SAV-2025',
    vin: '9BWKB45U6RP293810',
    description: 'Volkswagen Saveiro Doble Cabina modelo 2025 con tan solo 4.300 km recorridos. Prácticamente a estrenar y con garantía de fábrica vigente. Equipada con control de estabilidad (ESP), asistente de arranque en pendientes y excelente capacidad de carga. Descuenta IVA.',
    features: [
      'Solo 4.300 km recorridos con garantía de fábrica vigente.',
      'Control de estabilidad (ESP) y frenos ABS con función Off-Road.',
      'Capacidad para 5 pasajeros con doble cabina de fábrica.',
      'Descuenta IVA (ideal empresas y productores rurales).',
      'Financiación 100% hasta en 60 meses en Car Seller.'
    ],
    image: '/cars/vw-saveiro-front.jpg',
    gallery: [
      '/cars/vw-saveiro-front.jpg',
      '/cars/vw-saveiro-side.jpg',
      '/cars/vw-saveiro-rear.jpg'
    ]
  },
  {
    id: 'hyundai-hb20-comfort-2025',
    brand: 'Hyundai',
    model: 'HB20 1.0 Comfort Plus',
    year: 2025,
    price: 14990,
    category: 'Hatchback Moderno',
    engine: '1.0L 12V DOHC Kappa',
    power: '80 HP',
    acceleration: '12.4 Sec',
    drive: 'FWD Delantera',
    transmission: 'Manual',
    transmissionDetail: 'Manual de 5 Velocidades',
    fuelType: 'Petrol',
    mileage: 26000,
    color: 'Gris Grafito Metalizado',
    status: 'Active',
    daysOnLot: 3,
    stockId: 'CS-HB2-2025',
    vin: '9BHBH51E3RP481920',
    description: 'Hyundai HB20 Comfort modelo 2025 con 26.000 km. Equipamiento completísimo en seguridad con 6 airbags de serie y control de estabilidad. Servicios oficiales en fecha y garantía transferible de 5 años.',
    features: [
      '6 airbags (frontales, laterales y de cortina) y control de estabilidad ESC.',
      'Garantía de fábrica vigente por 5 años sin límite de kilometraje.',
      'Consumo medio promedio de 18 km/litro en uso mixto.',
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
  },
  {
    id: 'volkswagen-gol-sedan-2019',
    brand: 'Volkswagen',
    model: 'Gol Sedan Power 1.6',
    year: 2019,
    price: 10800,
    category: 'Sedán Familiar',
    engine: '1.6L MSI 8V Nafta',
    power: '101 HP',
    acceleration: '10.5 Sec',
    drive: 'FWD Delantera',
    transmission: 'Manual',
    transmissionDetail: 'Manual de 5 Velocidades',
    fuelType: 'Petrol',
    mileage: 76700,
    color: 'Plata Sirius',
    status: 'Active',
    daysOnLot: 7,
    stockId: 'CS-GOL-2019',
    vin: '9BWDB45U2KP102948',
    description: 'Volkswagen Gol Sedan Power año 2019 con motor 1.6 de 101 caballos y 76.700 km. Gran baúl de 480 litros, motor robusto y repuestos súper accesibles. Aire acondicionado, dirección hidráulica, vidrios eléctricos y alarma.',
    features: [
      'Motor 1.6 MSI de 101 HP confiable y potente.',
      'Baúl amplio de 480 litros, ideal para familias y viajes.',
      '76.700 km comprobables con mantenimiento al día.',
      'Computadora de a bordo y sistema de audio con Bluetooth.',
      'Financiación hasta en 60 meses en pesos o dólares.'
    ],
    image: '/cars/vw-gol-front.jpg',
    gallery: [
      '/cars/vw-gol-front.jpg',
      '/cars/vw-gol-rear.jpg'
    ]
  },
  {
    id: 'byd-f0-full-2012',
    brand: 'BYD',
    model: 'F0 1.0 GL-i Full',
    year: 2012,
    price: 7500,
    category: 'City Car',
    engine: '1.0L 3 Cilindros BYD371QA',
    power: '67 HP',
    acceleration: '14.0 Sec',
    drive: 'FWD Delantera',
    transmission: 'Manual',
    transmissionDetail: 'Manual de 5 Velocidades',
    fuelType: 'Petrol',
    mileage: 110000,
    color: 'Rojo Burdeos',
    status: 'Active',
    daysOnLot: 8,
    stockId: 'CS-BYD-2012',
    vin: 'LGXCF11D6B0091823',
    description: 'BYD F0 1.0 Full año 2012. Excelente opción accesible, ágil para estacionar y con consumo súper reducido. Equipado con aire acondicionado, dirección hidráulica, vidrios eléctricos y bloqueo central. Título y libreta al día para transferir inmediatamente.',
    features: [
      'Excelente precio de entrada al mercado: US$ 7.500.',
      'Aire acondicionado funcionando impecable.',
      'Dirección asistida y vidrios eléctricos.',
      'Consumo muy bajo (19 km/lt en carretera).',
      'Listo para transferir y empadronar.'
    ],
    image: '/cars/byd-f0-front.jpg',
    gallery: [
      '/cars/byd-f0-front.jpg',
      '/cars/byd-f0-rear.jpg'
    ]
  }
];

export const DEFAULT_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-1',
    vehicleId: 'fiat-strada-volcano-2025',
    vehicleName: 'Fiat Strada Volcano 1.3 Automática CVT',
    fullName: 'Gonzalo Silva',
    email: 'gonzalo.silva@ruralpaysandu.com.uy',
    message: 'Buenas tardes, me interesa la Strada Volcano 2025. ¿Aceptan permuta por una Strada 2020 y qué opciones de financiación tienen?',
    date: 'Hace 20 min',
    status: 'New'
  },
  {
    id: 'inq-2',
    vehicleId: 'volkswagen-saveiro-doble-cabina-2025',
    vehicleName: 'Volkswagen Saveiro Doble Cabina 1.6 16V',
    fullName: 'Esteban Martínez',
    email: 'esteban.martinez@agro.uy',
    message: 'Hola, consulto por la Saveiro 2025 si descuenta IVA y si se puede ir a ver a Florida 1615 esta tarde.',
    date: 'Hace 2 horas',
    status: 'New'
  }
];

export const UPCOMING_SERVICES: ServiceAppointment[] = [
  {
    id: 'ser-1',
    vehicleName: 'Fiat Strada Volcano 1.3 Automática CVT',
    type: 'Inspección de Entrega VIP y Detallado',
    dateTime: 'Mañana, 09:30 AM',
    icon: 'wrench'
  },
  {
    id: 'ser-2',
    vehicleName: 'Volkswagen Saveiro Doble Cabina 1.6 16V',
    type: 'Revisión Oficial Pre-Entrega',
    dateTime: 'Viernes, 14:00 PM',
    icon: 'palette'
  }
];

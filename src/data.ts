import { Vehicle, Inquiry, ServiceAppointment } from './types';

export const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: 'ford-maverick-lariat-2024',
    brand: 'Ford',
    model: 'Maverick Lariat 4x4',
    year: 2024,
    price: 36900,
    category: 'Pick-up Compacta',
    engine: '2.0L EcoBoost Turbo',
    power: '253 HP',
    acceleration: '7.2 Sec',
    drive: 'AWD Tracción Integral',
    transmission: 'Automatic',
    transmissionDetail: 'Automática de 8 Velocidades',
    fuelType: 'Petrol',
    mileage: 27000,
    color: 'Azul Velocity Metalizado',
    status: 'Active',
    daysOnLot: 3,
    stockId: 'CS-MAV-2024',
    vin: '3FTTW8F94PRA88210',
    description: 'Ford Maverick Lariat 4x4 año 2024 en impecable estado frente a nuestro local. Único dueño, todos los servicios oficiales al día y varios extras colocados (lona marítima, enganche, llantas oscurecidas y paquete FX4 Off-Road). Descuenta IVA para empresas o productores. Financiación hasta el 100% en 60 cuotas.',
    features: [
      'Único dueño con ficha completa de servicios oficiales.',
      'Paquete FX4 Off-Road y tracción 4x4 AWD.',
      'Descuenta IVA (ideal para empresas o productores agropecuarios).',
      'Motor EcoBoost 2.0 Turbo con 253 caballos y caja automática de 8 marchas.',
      'Equipamiento Lariat con lona marítima y terminaciones prémium.',
      'Patente anual: $ 60.229.'
    ],
    image: '/cars/ford-maverick-front.jpg',
    gallery: [
      '/cars/ford-maverick-front.jpg',
      '/cars/ford-maverick-rear.jpg',
      '/cars/ford-maverick-profile.jpg',
      '/cars/ford-maverick-side.jpg'
    ]
  },
  {
    id: 'ford-ranger-ltd-v6-2025',
    brand: 'Ford',
    model: 'Ranger LTD+ 4WD V6',
    year: 2025,
    price: 76990,
    category: 'Pick-up 4x4',
    engine: '3.0L V6 Turbo Diésel',
    power: '250 HP',
    acceleration: '8.4 Sec',
    drive: '4WD Inteligente con Reductora',
    transmission: 'Automatic',
    transmissionDetail: 'Automática de 10 Velocidades',
    fuelType: 'Diesel',
    mileage: 0,
    color: 'Plata Metalizado',
    status: 'Active',
    daysOnLot: 2,
    stockId: 'CS-RNG-2025',
    vin: '8AFFA22L8RJ102934',
    description: 'Ford Ranger LTD+ 4WD 0 KM 2025 con precio bonificado. Motor 3.0 V6 Turbo Diésel de última generación y caja automática de 10 velocidades. Incluye garantía de fábrica por 5 años o 150.000 km. Financiación 100% hasta en 60 cuotas.',
    features: [
      'Garantía oficial Ford por 5 años o 150.000 KM.',
      'Transmisión automática de 10 marchas con selector electrónico E-Shifter.',
      'Tracción 4WD con bloqueo electrónico de diferencial trasero.',
      'Pantalla multitáctil vertical de 12 pulgadas con SYNC 4 y conectividad inalámbrica.',
      'Paquete Ford Co-Pilot 360 con control crucero adaptativo y mantenimiento de carril.',
      'Financiación hasta el 100% en hasta 60 cuotas en Car Seller.'
    ],
    image: '/cars/ford-ranger-front.jpg',
    gallery: [
      '/cars/ford-ranger-front.jpg',
      '/cars/ford-ranger-rear.jpg',
      '/cars/ford-ranger-interior.jpg'
    ]
  },
  {
    id: 'mercedes-glc-300e-2020',
    brand: 'Mercedes-Benz',
    model: 'GLC 300e 4Matic',
    year: 2020,
    price: 46900,
    category: 'SUV Premium Híbrido',
    engine: '2.0L Turbo Nafta + Híbrido Enchufable',
    power: '320 HP Combinados',
    acceleration: '5.7 Sec',
    drive: '4Matic Tracción Integral',
    transmission: 'Automatic',
    transmissionDetail: '9G-TRONIC de 9 Velocidades',
    fuelType: 'Hybrid',
    mileage: 116000,
    color: 'Blanco Polar',
    status: 'Active',
    daysOnLot: 1,
    stockId: 'CS-GLC-300E',
    vin: 'WDC2539531F894120',
    description: 'Mercedes-Benz GLC 300e 4Matic año 2020 híbrido enchufable. Excelente balance entre sofisticación, potencia y un rendimiento excepcional con consumo medio de 24 km/lt. Financiación 100% hasta en 72 cuotas.',
    features: [
      'Tecnología Híbrida Plug-in con autonomía eléctrica para ciudad.',
      'Consumo medio homologado de 24 km/litro.',
      'Tracción total permanente 4MATIC y suspensión de confort.',
      'Faros LED High Performance y techo panorámico corredizo.',
      'Sistema multimedia MBUX con panel táctil y comandos de voz naturales.',
      'Patente anual aproximada: $ 100.000.'
    ],
    image: '/cars/mercedes-glc-front.jpg',
    gallery: [
      '/cars/mercedes-glc-front.jpg',
      '/cars/mercedes-glc-rear.jpg',
      '/cars/mercedes-glc-angle-front.jpg',
      '/cars/mercedes-glc-angle-rear.jpg'
    ]
  },
  {
    id: 'suzuki-swift-glx-hybrid-2026',
    brand: 'Suzuki',
    model: 'Swift GLX Hybrid',
    year: 2026,
    price: 21900,
    category: 'Hatchback Híbrido',
    engine: '1.2L Nafta Dualjet + Microhíbrido SHVS',
    power: '83 HP',
    acceleration: '11.8 Sec',
    drive: 'FWD Delantera',
    transmission: 'Manual',
    transmissionDetail: 'Manual de 5 Velocidades',
    fuelType: 'Hybrid',
    mileage: 1400,
    color: 'Plata Metalizado',
    status: 'Active',
    daysOnLot: 4,
    stockId: 'CS-SWF-2026',
    vin: 'JSAAZC83S00918234',
    description: 'Suzuki Swift GLX Hybrid nuevo modelo 2026. Prácticamente 0 km con solo 1.400 km recorridos. Única dueña, servicios oficiales y garantía vigente de 3 años o 100.000 km. Patente 2026 paga todo el año. Consumo promedio récord de 23 km/lt.',
    features: [
      'Garantía vigente oficial por 3 años o 100.000 km.',
      'Patente anual 2026 ya totalmente abonada ($ 31.527).',
      'Consumo medio extraordinario de 23 km/litro.',
      'Tecnología microhíbrida SHVS para máxima eficiencia.',
      'Pantalla multimedia con Apple CarPlay y Android Auto.',
      'Financiación hasta en 72 cuotas en Car Seller.'
    ],
    image: '/cars/suzuki-swift-front.jpg',
    gallery: [
      '/cars/suzuki-swift-front.jpg',
      '/cars/suzuki-swift-angle.jpg',
      '/cars/suzuki-swift-rear.jpg'
    ]
  },
  {
    id: 'suzuki-fronx-glx-hybrid-2024',
    brand: 'Suzuki',
    model: 'Fronx GLX Hybrid',
    year: 2024,
    price: 21900,
    category: 'Crossover SUV',
    engine: '1.5L K15C Dualjet + SHVS Híbrido',
    power: '103 HP',
    acceleration: '11.2 Sec',
    drive: 'FWD Delantera',
    transmission: 'Manual',
    transmissionDetail: 'Manual de 5 Velocidades',
    fuelType: 'Hybrid',
    mileage: 33500,
    color: 'Gris Grafito Metalizado',
    status: 'Active',
    daysOnLot: 5,
    stockId: 'CS-FRX-2024',
    vin: 'MBHEWB42S00781290',
    description: 'Suzuki Fronx GLX Hybrid año 2024. Crossover moderno, ágil y espacioso. Única dueña, servicios oficiales rigurosos y patente año corriente ya abonada. Consumo medio de 17 km/lt. Financiación 100% en hasta 72 cuotas.',
    features: [
      'Única dueña con historial verificado en service oficial.',
      'Patente anual ya paga en su totalidad ($ 34.933).',
      'Cámara de visión 360 grados y Head-Up Display frontal.',
      'Cargador inductivo para smartphones y climatizador automático.',
      'Excelente altura libre al suelo y confort de marcha.',
      'Financiable 100% hasta en 72 meses.'
    ],
    image: '/cars/suzuki-fronx-front.jpg',
    gallery: [
      '/cars/suzuki-fronx-front.jpg',
      '/cars/suzuki-fronx-rear.jpg',
      '/cars/suzuki-fronx-interior.jpg'
    ]
  },
  {
    id: 'chevrolet-onix-rs-2023',
    brand: 'Chevrolet',
    model: 'Onix RS Turbo',
    year: 2023,
    price: 17500,
    category: 'Hatchback Deportivo',
    engine: '1.0L Turbo 3 Cilindros',
    power: '116 HP',
    acceleration: '9.8 Sec',
    drive: 'FWD Delantera',
    transmission: 'Manual',
    transmissionDetail: 'Manual de 5 Velocidades',
    fuelType: 'Petrol',
    mileage: 30000,
    color: 'Rojo Carmín RS',
    status: 'Active',
    daysOnLot: 6,
    stockId: 'CS-ONX-2023',
    vin: '9BGKD48U0PG119024',
    description: 'Chevrolet Onix RS 1.0 Turbo año 2023. Diseño deportivo con alerón, faldones y parrilla en negro piano. Única dueña con 30.000 km reales. Rendimiento enérgico y consumo medio de 17 km/lt. Financiación 100% hasta en 60 cuotas.',
    features: [
      'Paquete estético exclusivo RS con llantas negras y detalles deportivos.',
      'Motor 1.0 Turbo ágil y económico (17 km/lt promedio).',
      'Única dueña, con 30.000 kilómetros comprobables.',
      'Sistema MyLink con pantalla de 8 pulgadas y Wi-Fi nativo.',
      'Patente anual: $ 28.157.',
      'Financiable hasta en 60 cuotas fijas en pesos o dólares.'
    ],
    image: '/cars/chevrolet-onix-front.jpg',
    gallery: [
      '/cars/chevrolet-onix-front.jpg',
      '/cars/chevrolet-onix-rear.jpg',
      '/cars/chevrolet-onix-interior.jpg'
    ]
  }
];

export const DEFAULT_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-1',
    vehicleId: 'ford-ranger-ltd-v6-2025',
    vehicleName: 'Ford Ranger LTD+ 4WD V6',
    fullName: 'Gonzalo Silva',
    email: 'gonzalo.silva@ruralpaysandu.com.uy',
    message: 'Buenas tardes, me interesa la Ranger V6 0km. ¿Aceptan permuta por una Hilux 2021 y qué opciones de financiación con Santander tienen?',
    date: 'Hace 20 min',
    status: 'New'
  },
  {
    id: 'inq-2',
    vehicleId: 'ford-maverick-lariat-2024',
    vehicleName: 'Ford Maverick Lariat 4x4',
    fullName: 'Esteban Martínez',
    email: 'esteban.martinez@agro.uy',
    message: 'Hola, consulto si la Maverick descuenta IVA y si se puede ir a ver a Florida 1615 esta tarde.',
    date: 'Hace 2 horas',
    status: 'New'
  }
];

export const UPCOMING_SERVICES: ServiceAppointment[] = [
  {
    id: 'ser-1',
    vehicleName: 'Ford Ranger LTD+ 4WD V6',
    type: 'Inspección de Entrega y Polarizado',
    dateTime: 'Mañana, 09:30 AM',
    icon: 'wrench'
  },
  {
    id: 'ser-2',
    vehicleName: 'Suzuki Swift GLX Hybrid',
    type: 'Revisión Oficial Pre-Entrega',
    dateTime: 'Viernes, 14:00 PM',
    icon: 'palette'
  }
];

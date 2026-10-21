import { Vehicle, Inquiry, ServiceAppointment } from './types';

export const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: 'volkswagen-tiguan-allspace-2020',
    brand: 'Volkswagen',
    model: 'Tiguan Allspace 1.4 TSI Highline AT',
    year: 2020,
    price: 28900,
    category: 'SUV Familiar 7 Plazas',
    engine: '1.4L TSI Turbo Nafta',
    power: '150 HP',
    acceleration: '9.3 Sec',
    drive: 'FWD Delantera',
    transmission: 'Automatic',
    transmissionDetail: 'Automática DSG de 6 Velocidades',
    fuelType: 'Petrol',
    mileage: 61200,
    color: 'Gris Platino Metalizado',
    status: 'Active',
    daysOnLot: 2,
    stockId: 'CS-TIG-2020',
    vin: '3VW227AX8LM129845',
    description: 'Volkswagen Tiguan Allspace Highline año 2020 con 3 filas de asientos (7 pasajeros). Motor 1.4 TSI Turbo con caja automática DSG. Excelente confort de marcha, techo solar panorámico corredizo, climatizador tri-zona y tapizado en cuero. Servicios al día. Financiación hasta el 100% en Car Seller.',
    features: [
      'Capacidad real para 7 pasajeros (3 filas de asientos).',
      'Techo solar panorámico eléctrico y tapizado de cuero de fábrica.',
      'Tablero digital Active Info Display y pantalla táctil de 8 pulgadas con App-Connect.',
      'Climatizador automático Climatronic de 3 zonas.',
      'Financiación bancaria y particular hasta en 60 meses en Car Seller.',
      'Patente anual: $ 46.850.'
    ],
    image: '/cars/vw-tiguan-front.jpg',
    gallery: [
      '/cars/vw-tiguan-front.jpg',
      '/cars/vw-tiguan-interior.jpg',
      '/cars/vw-tiguan-rear.jpg'
    ]
  },
  {
    id: 'chevrolet-montana-premier-2024',
    brand: 'Chevrolet',
    model: 'Montana Premier 1.2 Turbo AT',
    year: 2024,
    price: 21500,
    category: 'Pick-up Compacta',
    engine: '1.2L Turbo 3 Cilindros',
    power: '132 HP',
    acceleration: '10.1 Sec',
    drive: 'FWD Delantera',
    transmission: 'Automatic',
    transmissionDetail: 'Automática de 6 Velocidades',
    fuelType: 'Petrol',
    mileage: 24800,
    color: 'Rojo Carmín Metalizado',
    status: 'Active',
    daysOnLot: 3,
    stockId: 'CS-MON-2024',
    vin: '9BG149TK0PG293810',
    description: 'Chevrolet Montana Premier año 2024 en estado impecable. Motor 1.2 Turbo de 132 CV y transmisión automática. Versión tope de gama con alerta de punto ciego, cargador inalámbrico, faros Full LED y capota marítima hermética Multi-Flex. Único dueño con ficha oficial en concesionario.',
    features: [
      'Versión Premier tope de gama con alerta de punto ciego y faros Full LED.',
      'Caja de carga con sistema hermético impermeable Multi-Flex.',
      'Motor 1.2 Turbo ágil con consumo promedio de 15 km/litro.',
      'Conectividad OnStar y Wi-Fi nativo de alta velocidad.',
      'Financiación hasta el 100% en 60 cuotas fijas en Car Seller.'
    ],
    image: '/cars/chevrolet-montana-front.jpg',
    gallery: [
      '/cars/chevrolet-montana-front.jpg',
      '/cars/chevrolet-montana-side.jpg',
      '/cars/chevrolet-montana-rear.jpg'
    ]
  },
  {
    id: 'volkswagen-saveiro-extreme-2024',
    brand: 'Volkswagen',
    model: 'Saveiro Extreme 1.6 Cabina Doble',
    year: 2024,
    price: 18800,
    category: 'Pick-up Doble Cabina',
    engine: '1.6L MSI 16V Nafta',
    power: '110 HP',
    acceleration: '10.8 Sec',
    drive: 'FWD Delantera',
    transmission: 'Manual',
    transmissionDetail: 'Manual de 5 Velocidades',
    fuelType: 'Petrol',
    mileage: 0,
    color: 'Blanco Cristal',
    status: 'Active',
    daysOnLot: 1,
    stockId: 'CS-SAV-2024',
    vin: '9BWKB45U4RP092834',
    description: 'Volkswagen Saveiro Extreme Doble Cabina 0 KM 2024. Nueva línea con diseño renovado, llantas diamantadas de 15 pulgadas, tapizado de cuero sintético y control de estabilidad (ESP) de serie. Lista para entrega inmediata en Car Seller Paysandú.',
    features: [
      'Unidad 0 KM a estrenar con garantía oficial por 3 años o 100.000 KM.',
      'Control de estabilidad (ESP) y asistente de arranque en pendientes (Hill Hold).',
      'Llantas de aleación diamantadas de 15 pulgadas y diseño Extreme exclusivo.',
      'Descuenta IVA para productores rurales y empresas.',
      'Tomamos tu usado como parte de pago y financiamos la diferencia.'
    ],
    image: '/cars/vw-saveiro-front.jpg',
    gallery: [
      '/cars/vw-saveiro-front.jpg',
      '/cars/vw-saveiro-side.jpg',
      '/cars/vw-saveiro-rear.jpg'
    ]
  },
  {
    id: 'hyundai-hb20-comfort-2024',
    brand: 'Hyundai',
    model: 'HB20 1.0 Comfort',
    year: 2024,
    price: 14800,
    category: 'Hatchback Moderno',
    engine: '1.0L 12V Kappa Nafta',
    power: '80 HP',
    acceleration: '12.4 Sec',
    drive: 'FWD Delantera',
    transmission: 'Manual',
    transmissionDetail: 'Manual de 5 Velocidades',
    fuelType: 'Petrol',
    mileage: 24000,
    color: 'Gris Grafito Metalizado',
    status: 'Active',
    daysOnLot: 4,
    stockId: 'CS-HB2-2024',
    vin: '9BHBH51E2RP481920',
    description: 'Hyundai HB20 Comfort 1.0 año 2024. Gran rendimiento de combustible (18 km/lt en promedio), seguridad con 6 airbags de serie y control de tracción/estabilidad. Ficha oficial con garantía vigente de fábrica por 5 años sin límite de kilometraje.',
    features: [
      '6 airbags de serie y control electrónico de estabilidad (ESC).',
      'Garantía oficial vigente por 5 años sin límite de kilometraje.',
      'Pantalla táctil con conectividad inalámbrica Apple CarPlay y Android Auto.',
      'Consumo medio comprobado de 18 km/litro.',
      'Financiación hasta el 100% en cuotas fijas en Car Seller.'
    ],
    image: '/cars/hyundai-hb20-front.jpg',
    gallery: [
      '/cars/hyundai-hb20-front.jpg',
      '/cars/hyundai-hb20-rear.jpg',
      '/cars/hyundai-hb20-interior.jpg'
    ]
  },
  {
    id: 'suzuki-alto-800-ga-2020',
    brand: 'Suzuki',
    model: 'Alto 800 GA',
    year: 2020,
    price: 10500,
    category: 'Hatchback Urbano',
    engine: '0.8L 3 Cilindros F8D',
    power: '48 HP',
    acceleration: '14.5 Sec',
    drive: 'FWD Delantera',
    transmission: 'Manual',
    transmissionDetail: 'Manual de 5 Velocidades',
    fuelType: 'Petrol',
    mileage: 33300,
    color: 'Blanco Polar',
    status: 'Active',
    daysOnLot: 5,
    stockId: 'CS-ALT-2020',
    vin: 'MA3EGA11S00847291',
    description: 'Suzuki Alto 800 GA año 2020. Solo 33.300 km reales. El auto más económico del mercado uruguayo, con un consumo promedio superior a 20 km/litro. Aire acondicionado, dirección asistida, frenos ABS y airbags frontales. Patente y seguro sumamente accesibles.',
    features: [
      'Bajísimo kilometraje comprobable: solo 33.300 km.',
      'Rendimiento sobresaliente superior a 20 km/litro.',
      'Patente y costos de mantenimiento mínimos.',
      'Aire acondicionado y dirección asistida de serie.',
      'Financiación en pesos o dólares hasta en 60 meses.'
    ],
    image: '/cars/suzuki-alto-front.jpg',
    gallery: [
      '/cars/suzuki-alto-front.jpg',
      '/cars/suzuki-alto-rear.jpg'
    ]
  },
  {
    id: 'fiat-uno-attractive-2017',
    brand: 'Fiat',
    model: 'Uno 1.4 Attractive EVO',
    year: 2017,
    price: 10500,
    category: 'Hatchback Confiable',
    engine: '1.4L 8V Fire EVO',
    power: '85 HP',
    acceleration: '11.8 Sec',
    drive: 'FWD Delantera',
    transmission: 'Manual',
    transmissionDetail: 'Manual de 5 Velocidades',
    fuelType: 'Petrol',
    mileage: 97000,
    color: 'Plata Bari Metalizado',
    status: 'Active',
    daysOnLot: 6,
    stockId: 'CS-UNO-2017',
    vin: '9BD195048H8192847',
    description: 'Fiat Uno 1.4 Attractive EVO año 2017. Motor Fire confiable, repuestos económicos y gran habitabilidad interior. Computadora de a bordo, vidrios eléctricos delanteros, faros antiniebla y cierre centralizado.',
    features: [
      'Motor 1.4 Fire EVO ultra probado, ágil y económico.',
      'Computadora de a bordo y faros antiniebla delanteros.',
      'Costos de mantenimiento y repuestos súper accesibles en todo el país.',
      'Financiación particular y bancaria en Car Seller.',
      'Tomamos permuta por menor o mayor valor.'
    ],
    image: '/cars/fiat-uno-front.jpg',
    gallery: [
      '/cars/fiat-uno-front.jpg',
      '/cars/fiat-uno-rear.jpg'
    ]
  },
  {
    id: 'renault-kwid-life-2020',
    brand: 'Renault',
    model: 'Kwid Life 1.0 SCe',
    year: 2020,
    price: 9990,
    category: 'Hatchback Compacto',
    engine: '1.0L 3 Cilindros SCe',
    power: '66 HP',
    acceleration: '13.2 Sec',
    drive: 'FWD Delantera',
    transmission: 'Manual',
    transmissionDetail: 'Manual de 5 Velocidades',
    fuelType: 'Petrol',
    mileage: 45000,
    color: 'Naranja Ocre',
    status: 'Active',
    daysOnLot: 7,
    stockId: 'CS-KWD-2020',
    vin: '93YBB8E24LM294812',
    description: 'Renault Kwid Life 1.0 año 2020 en excelente estado general. Destacada altura libre del suelo, bajo consumo y 4 airbags de serie. Ideal primer auto o vehículo diario para la ciudad. Financiación 100% en Car Seller.',
    features: [
      'Excelente despeje del suelo tipo SUV compacto.',
      '4 airbags (frontales y laterales) y frenos ABS.',
      'Bajo consumo de combustible: 18.5 km/litro.',
      'Documentación completa y lista para transferir.',
      'Financiación inmediata y permutas.'
    ],
    image: '/cars/renault-kwid-front.jpg',
    gallery: [
      '/cars/renault-kwid-front.jpg',
      '/cars/renault-kwid-rear.jpg'
    ]
  }
];

export const DEFAULT_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-1',
    vehicleId: 'volkswagen-tiguan-allspace-2020',
    vehicleName: 'Volkswagen Tiguan Allspace 1.4 TSI Highline AT',
    fullName: 'Matías Baccaro',
    email: 'matias.baccaro@gmail.com',
    message: 'Buenas tardes, me interesa la Tiguan Allspace de 7 plazas. ¿Tienen opción de financiación con Banco Santander y aceptan permuta por una Duster 2019?',
    date: 'Hace 25 min',
    status: 'New'
  },
  {
    id: 'inq-2',
    vehicleId: 'chevrolet-montana-premier-2024',
    vehicleName: 'Chevrolet Montana Premier 1.2 Turbo AT',
    fullName: 'Carlos Bentancur',
    email: 'carlos.bentancur@agro.com.uy',
    message: 'Hola, consulto por la Montana 2024 si descuenta IVA y si se puede coordinar para verla en Florida 1615 esta tarde.',
    date: 'Hace 2 horas',
    status: 'New'
  }
];

export const UPCOMING_SERVICES: ServiceAppointment[] = [
  {
    id: 'ser-1',
    vehicleName: 'Volkswagen Tiguan Allspace 1.4 TSI Highline AT',
    type: 'Inspección de Entrega VIP y Detallado',
    dateTime: 'Mañana, 09:30 AM',
    icon: 'wrench'
  },
  {
    id: 'ser-2',
    vehicleName: 'Chevrolet Montana Premier 1.2 Turbo AT',
    type: 'Revisión Oficial Pre-Entrega',
    dateTime: 'Viernes, 14:00 PM',
    icon: 'palette'
  }
];

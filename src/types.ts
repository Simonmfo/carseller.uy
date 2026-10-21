export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  category: string;
  engine: string;
  power: string;
  acceleration: string;
  drive: string;
  transmission: 'Automatic' | 'Manual';
  transmissionDetail: string;
  fuelType: 'Petrol' | 'Electric' | 'Hybrid' | 'Diesel';
  mileage: number;
  color: string;
  status: 'Active' | 'Reserved' | 'Sold' | 'Hidden';
  daysOnLot: number;
  stockId: string;
  vin: string;
  description: string;
  features: string[];
  image: string;
  gallery: string[];
}

export interface Inquiry {
  id: string;
  vehicleId: string;
  vehicleName: string;
  fullName: string;
  email: string;
  message: string;
  date: string;
  status: 'New' | 'Replied' | 'Archived';
}

export interface ServiceAppointment {
  id: string;
  vehicleName: string;
  type: string;
  dateTime: string;
  icon: string;
}

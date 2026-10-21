import { useState, FormEvent, DragEvent } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  UploadCloud, 
  Check, 
  Sparkles,
  Car,
  Image as ImageIcon,
  DollarSign,
  Fuel,
  Cog,
  Calendar,
  Gauge
} from 'lucide-react';
import { Vehicle } from '../types';

interface AddVehicleViewProps {
  onAddVehicle: (vehicle: Vehicle) => void;
  setView: (view: 'showroom' | 'inventory' | 'admin' | 'add-vehicle' | 'login') => void;
}

export default function AddVehicleView({ onAddVehicle, setView }: AddVehicleViewProps) {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price: '',
    category: 'Hatchback',
    engine: '1.0L Nafta',
    transmission: 'Manual' as 'Automatic' | 'Manual',
    transmissionDetail: 'Manual de 5 Velocidades',
    fuelType: 'Petrol' as Vehicle['fuelType'],
    mileage: '',
    color: 'Blanco',
    description: '',
    featuresInput: '',
    image: '',
    galleryInput: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.brand || !formData.model || !formData.price) {
      alert('Por favor complete los campos obligatorios: Marca, Modelo y Precio.');
      return;
    }

    const finalImage = formData.image.trim() || 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=1200';

    const parsedFeatures = formData.featuresInput
      ? formData.featuresInput.split('\n').filter(f => f.trim() !== '')
      : [
          'Documentación completa y al día para transferir.',
          'Revisión mecánica integral y garantía oficial.',
          'Financiación hasta el 100% en Car Seller Paysandú.'
        ];

    const parsedGallery = formData.galleryInput
      ? formData.galleryInput.split('\n').filter(g => g.trim() !== '')
      : [finalImage];

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const mockStock = `CS-${formData.brand.substring(0, 3).toUpperCase()}-${formData.year}`;

    const newVehicle: Vehicle = {
      id: `${formData.brand.toLowerCase()}-${formData.model.toLowerCase()}-${Date.now()}`.replace(/\s+/g, '-'),
      brand: formData.brand,
      model: formData.model,
      year: Number(formData.year),
      price: Number(formData.price),
      category: formData.category,
      engine: formData.engine,
      power: '90 HP',
      acceleration: '11.5 Sec',
      drive: 'FWD Delantera',
      transmission: formData.transmission,
      transmissionDetail: formData.transmissionDetail,
      fuelType: formData.fuelType,
      mileage: Number(formData.mileage) || 0,
      color: formData.color,
      status: 'Active',
      daysOnLot: 0,
      stockId: mockStock,
      vin: `9BD${Math.random().toString(36).substring(2, 8).toUpperCase()}${randomNum}`,
      description: formData.description || `${formData.brand} ${formData.model} año ${formData.year} en excelente estado general en Car Seller Paysandú. Financiación hasta el 100%.`,
      features: parsedFeatures,
      image: finalImage,
      gallery: parsedGallery
    };

    onAddVehicle(newVehicle);
    setFormSubmitted(true);
    setTimeout(() => {
      setView('inventory');
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-slate-50 min-h-screen py-10 px-4 sm:px-6 md:px-12"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <button
            onClick={() => setView('admin')}
            className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Panel
          </button>
          <span className="text-xs text-slate-500 font-semibold">Car Seller · Nueva Publicación</span>
        </div>

        {formSubmitted ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm space-y-4">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <Check className="w-8 h-8" />
            </div>
            <h2 className="font-display font-extrabold text-2xl text-slate-900">
              ¡Vehículo Publicado con Éxito!
            </h2>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              La unidad ya está disponible en el catálogo web y en el panel de administración.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
            <div>
              <h1 className="font-display font-extrabold text-2xl text-slate-900">
                Publicar Nuevo Vehículo
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Ingresá los datos del vehículo para sumarlo al stock de Car Seller.
              </p>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Marca *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Fiat, Volkswagen, Chevrolet..."
                  value={formData.brand}
                  onChange={(e) => setFormData(p => ({ ...p, brand: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Modelo y Versión *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Strada Volcano 1.3 CVT"
                  value={formData.model}
                  onChange={(e) => setFormData(p => ({ ...p, model: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Año *</label>
                <input
                  type="number"
                  required
                  min={1990}
                  max={2027}
                  value={formData.year}
                  onChange={(e) => setFormData(p => ({ ...p, year: Number(e.target.value) }))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Precio en Dólares (US$) *</label>
                <input
                  type="number"
                  required
                  min={100}
                  placeholder="Ej. 18900"
                  value={formData.price}
                  onChange={(e) => setFormData(p => ({ ...p, price: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Kilometraje (km)</label>
                <input
                  type="number"
                  placeholder="0 si es 0 km"
                  value={formData.mileage}
                  onChange={(e) => setFormData(p => ({ ...p, mileage: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Tipo de Carrocería</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(p => ({ ...p, category: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="Pick-up">Pick-up / Utilitario</option>
                  <option value="Hatchback">Hatchback / Compacto</option>
                  <option value="Sedán">Sedán Familiar</option>
                  <option value="SUV">SUV / Crossover</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Transmisión</label>
                <select
                  value={formData.transmission}
                  onChange={(e) => setFormData(p => ({ 
                    ...p, 
                    transmission: e.target.value as any,
                    transmissionDetail: e.target.value === 'Automatic' ? 'Automática' : 'Manual de 5 Velocidades'
                  }))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automática</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Motorización</label>
                <input
                  type="text"
                  placeholder="Ej. 1.3L Firefly Nafta"
                  value={formData.engine}
                  onChange={(e) => setFormData(p => ({ ...p, engine: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Color</label>
                <input
                  type="text"
                  placeholder="Ej. Blanco Cristal, Rojo, Gris..."
                  value={formData.color}
                  onChange={(e) => setFormData(p => ({ ...p, color: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            {/* Media & URL */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-700 block">
                Foto Principal (URL o archivo local)
              </label>
              <input
                type="text"
                placeholder="https://... o /cars/mi-auto.jpg"
                value={formData.image}
                onChange={(e) => setFormData(p => ({ ...p, image: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <p className="text-[11px] text-slate-400">
                Podés pegar un enlace directo a una imagen en internet o una ruta local.
              </p>
            </div>

            {/* Features input */}
            <div className="space-y-1.5 pt-3 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-700 block">
                Equipamiento y Puntos Destacados (uno por línea)
              </label>
              <textarea
                rows={3}
                placeholder="Ej.&#10;Garantía oficial vigente&#10;Pantalla multimedia con Apple CarPlay&#10;Control de estabilidad y 4 airbags&#10;Descuenta IVA"
                value={formData.featuresInput}
                onChange={(e) => setFormData(p => ({ ...p, featuresInput: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none font-sans"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Descripción Completa
              </label>
              <textarea
                rows={3}
                placeholder="Detalles sobre estado, servicios oficiales, opciones de permuta o financiación..."
                value={formData.description}
                onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none font-sans"
              />
            </div>

            {/* Submit */}
            <div className="pt-4 flex gap-4">
              <button
                type="button"
                onClick={() => setView('admin')}
                className="px-6 py-3 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-50 text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl shadow transition-colors cursor-pointer"
              >
                Guardar y Publicar en la Web
              </button>
            </div>
          </form>
        )}

      </div>
    </motion.div>
  );
}

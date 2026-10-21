import { useState, DragEvent, FormEvent } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  UploadCloud, 
  Sparkles, 
  Save,
  Trash2
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
    category: 'Supercar',
    engine: '',
    power: '',
    acceleration: '',
    drive: '',
    transmission: 'Automatic' as 'Automatic' | 'Manual',
    transmissionDetail: '',
    fuelType: 'Petrol' as Vehicle['fuelType'],
    mileage: '',
    color: '',
    description: '',
    featuresInput: '',
    image: '',
    stockId: '',
    vin: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Automatically generate clean stock ID and VIN for ease of use
  const handleAutoFillCodes = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const mockVIN = `1N4AL${Math.random().toString(36).substring(2, 7).toUpperCase()}AP${randomNum}NC${randomNum}`;
    const mockStock = `CS-${formData.brand ? formData.brand.substring(0, 3).toUpperCase() : 'CAR'}-${randomNum}`;
    setFormData(prev => ({
      ...prev,
      stockId: mockStock,
      vin: mockVIN
    }));
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Simulator drop: assign a beautiful sportscar image
    const sportscars = [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&q=80&w=1200'
    ];
    const pickedImage = sportscars[Math.floor(Math.random() * sportscars.length)];
    setFormData(prev => ({ ...prev, image: pickedImage }));
    alert('¡Simulación de Archivo Cargada! Se ha asignado un vehículo de muestra premium.');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.brand || !formData.model || !formData.price) {
      alert('Por favor, complete los campos obligatorios (*).');
      return;
    }

    // Default image if empty
    const finalImage = formData.image.trim() || 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200';

    // Parse features
    const parsedFeatures = formData.featuresInput
      ? formData.featuresInput.split('\n').filter(f => f.trim() !== '')
      : [
          'Sistema de frenos deportivos cerámicos de alto rendimiento.',
          'Interior de alcántara con pespuntes contrastantes.',
          'Paquete aerodinámico de fibra de carbono completo.',
          'Garantía oficial y financiación hasta el 100% en Car Seller.'
        ];

    const newVehicle: Vehicle = {
      id: `${formData.brand.toLowerCase()}-${formData.model.toLowerCase()}-${Date.now()}`.replace(/\s+/g, '-'),
      brand: formData.brand,
      model: formData.model,
      year: Number(formData.year),
      price: Number(formData.price),
      category: formData.category,
      engine: formData.engine || 'V8 Twin-Turbo',
      power: formData.power ? `${formData.power} HP` : '500 HP',
      acceleration: formData.acceleration ? `${formData.acceleration} Sec` : '3.5 Sec',
      drive: formData.drive || 'RWD',
      transmission: formData.transmission,
      transmissionDetail: formData.transmissionDetail || (formData.transmission === 'Automatic' ? 'Dual-Clutch' : '6-Speed Manual'),
      fuelType: formData.fuelType,
      mileage: formData.mileage ? Number(formData.mileage) : 0,
      color: formData.color || 'Plata Cromo',
      status: 'Active',
      daysOnLot: 1,
      stockId: formData.stockId || `LA-STOCK-${Math.floor(1000 + Math.random() * 9000)}`,
      vin: formData.vin || '1N4AL1AP5NC' + Math.floor(100000 + Math.random() * 900000),
      description: formData.description || 'Una obra de ingeniería deslumbrante que combina el lujo supremo con una dinámica de circuito visceral, diseñada para el conductor más exigente.',
      features: parsedFeatures,
      image: finalImage,
      gallery: [finalImage]
    };

    onAddVehicle(newVehicle);
    setFormSubmitted(true);
    setTimeout(() => {
      setView('admin');
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full pt-28 px-6 md:px-12 pb-16 max-w-5xl mx-auto space-y-8"
    >
      {/* Top Breadcrumb bar */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setView('admin')}
          className="p-2 border border-outline-variant hover:border-secondary hover:text-secondary rounded text-on-surface-variant transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <span className="text-[10px] font-label-caps tracking-widest text-on-surface-variant block uppercase font-bold">ADMINISTRACIÓN</span>
          <h1 className="font-display text-xl md:text-2xl font-black uppercase text-white tracking-tight">Publicar Nuevo Automóvil</h1>
        </div>
      </div>

      {formSubmitted ? (
        <motion.div 
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="bg-surface-container rounded-xl border border-secondary/20 p-12 text-center max-w-md mx-auto space-y-5"
        >
          <div className="w-16 h-16 bg-secondary/10 border border-secondary text-secondary rounded-full flex items-center justify-center mx-auto">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="font-display text-lg font-bold text-on-surface uppercase">¡Vehículo Publicado Exitosamente!</h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            La obra maestra ha sido incorporada al stock. Redirigiendo al listado de administración...
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Bento Block 1: Basic specifications */}
            <div className="bg-surface-container p-6 rounded-xl border border-outline-variant space-y-4">
              <h3 className="font-display text-xs font-bold text-white uppercase tracking-wider border-b border-outline-variant pb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                Especificaciones Básicas
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-label-caps text-[9px] text-on-surface-variant tracking-widest block uppercase font-bold mb-1">Marca *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData(p => ({ ...p, brand: e.target.value }))}
                    className="w-full bg-surface border border-outline-variant rounded p-2.5 text-xs text-on-surface focus:border-secondary outline-none transition-all"
                    placeholder="Ej. Porsche, Nissan"
                  />
                </div>
                <div>
                  <label className="font-label-caps text-[9px] text-on-surface-variant tracking-widest block uppercase font-bold mb-1">Modelo *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.model}
                    onChange={(e) => setFormData(p => ({ ...p, model: e.target.value }))}
                    className="w-full bg-surface border border-outline-variant rounded p-2.5 text-xs text-on-surface focus:border-secondary outline-none transition-all"
                    placeholder="Ej. 911 GT3, GT-R"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-label-caps text-[9px] text-on-surface-variant tracking-widest block uppercase font-bold mb-1">Año *</label>
                  <input 
                    type="number" 
                    required
                    value={formData.year}
                    onChange={(e) => setFormData(p => ({ ...p, year: Number(e.target.value) }))}
                    className="w-full bg-surface border border-outline-variant rounded p-2.5 text-xs text-on-surface focus:border-secondary outline-none transition-all"
                    placeholder="2024"
                  />
                </div>
                <div>
                  <label className="font-label-caps text-[9px] text-on-surface-variant tracking-widest block uppercase font-bold mb-1">Categoría</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(p => ({ ...p, category: e.target.value }))}
                    className="w-full bg-surface border border-outline-variant rounded p-2.5 text-xs text-on-surface focus:border-secondary outline-none transition-all"
                  >
                    <option value="Supercar">Superdeportivo</option>
                    <option value="Performance Coupe">Coupe Deportivo</option>
                    <option value="Luxury Sedan">Sedán de Lujo</option>
                    <option value="Convertible">Convertible</option>
                    <option value="Ultra-Luxury SUV">SUV de Ultra-Lujo</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-label-caps text-[9px] text-on-surface-variant tracking-widest block uppercase font-bold mb-1">Precio MSRP (USD) *</label>
                  <input 
                    type="number" 
                    required
                    value={formData.price}
                    onChange={(e) => setFormData(p => ({ ...p, price: e.target.value }))}
                    className="w-full bg-surface border border-outline-variant rounded p-2.5 text-xs text-on-surface focus:border-secondary outline-none transition-all font-sans font-semibold"
                    placeholder="180000"
                  />
                </div>
                <div>
                  <label className="font-label-caps text-[9px] text-on-surface-variant tracking-widest block uppercase font-bold mb-1">Kilometraje (mi)</label>
                  <input 
                    type="number" 
                    value={formData.mileage}
                    onChange={(e) => setFormData(p => ({ ...p, mileage: e.target.value }))}
                    className="w-full bg-surface border border-outline-variant rounded p-2.5 text-xs text-on-surface focus:border-secondary outline-none transition-all"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="font-label-caps text-[9px] text-on-surface-variant tracking-widest block uppercase font-bold mb-1">Color Exterior</label>
                <input 
                  type="text" 
                  value={formData.color}
                  onChange={(e) => setFormData(p => ({ ...p, color: e.target.value }))}
                  className="w-full bg-surface border border-outline-variant rounded p-2.5 text-xs text-on-surface focus:border-secondary outline-none transition-all"
                  placeholder="Ej. Guards Red, Speed Yellow"
                />
              </div>

            </div>

            {/* Bento Block 2: Technical Specs */}
            <div className="bg-surface-container p-6 rounded-xl border border-outline-variant space-y-4">
              <h3 className="font-display text-xs font-bold text-white uppercase tracking-wider border-b border-outline-variant pb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                Rendimiento y Técnica
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-label-caps text-[9px] text-on-surface-variant tracking-widest block uppercase font-bold mb-1">Especificación de Motor</label>
                  <input 
                    type="text" 
                    value={formData.engine}
                    onChange={(e) => setFormData(p => ({ ...p, engine: e.target.value }))}
                    className="w-full bg-surface border border-outline-variant rounded p-2.5 text-xs text-on-surface focus:border-secondary outline-none transition-all"
                    placeholder="Ej. V6 Twin-Turbo, 4.0L V8"
                  />
                </div>
                <div>
                  <label className="font-label-caps text-[9px] text-on-surface-variant tracking-widest block uppercase font-bold mb-1">Potencia (HP)</label>
                  <input 
                    type="number" 
                    value={formData.power}
                    onChange={(e) => setFormData(p => ({ ...p, power: e.target.value }))}
                    className="w-full bg-surface border border-outline-variant rounded p-2.5 text-xs text-on-surface focus:border-secondary outline-none transition-all"
                    placeholder="600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-label-caps text-[9px] text-on-surface-variant tracking-widest block uppercase font-bold mb-1">Aceleración 0-60 MPH</label>
                  <input 
                    type="text" 
                    value={formData.acceleration}
                    onChange={(e) => setFormData(p => ({ ...p, acceleration: e.target.value }))}
                    className="w-full bg-surface border border-outline-variant rounded p-2.5 text-xs text-on-surface focus:border-secondary outline-none transition-all"
                    placeholder="Ej. 2.7 Sec"
                  />
                </div>
                <div>
                  <label className="font-label-caps text-[9px] text-on-surface-variant tracking-widest block uppercase font-bold mb-1">Distribución / Tracción</label>
                  <input 
                    type="text" 
                    value={formData.drive}
                    onChange={(e) => setFormData(p => ({ ...p, drive: e.target.value }))}
                    className="w-full bg-surface border border-outline-variant rounded p-2.5 text-xs text-on-surface focus:border-secondary outline-none transition-all"
                    placeholder="Ej. AWD, RWD"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-label-caps text-[9px] text-on-surface-variant tracking-widest block uppercase font-bold mb-1">Transmisión</label>
                  <select
                    value={formData.transmission}
                    onChange={(e) => setFormData(p => ({ ...p, transmission: e.target.value as 'Automatic' | 'Manual' }))}
                    className="w-full bg-surface border border-outline-variant rounded p-2.5 text-xs text-on-surface focus:border-secondary outline-none transition-all"
                  >
                    <option value="Automatic">Automática</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
                <div>
                  <label className="font-label-caps text-[9px] text-on-surface-variant tracking-widest block uppercase font-bold mb-1">Detalle de Caja</label>
                  <input 
                    type="text" 
                    value={formData.transmissionDetail}
                    onChange={(e) => setFormData(p => ({ ...p, transmissionDetail: e.target.value }))}
                    className="w-full bg-surface border border-outline-variant rounded p-2.5 text-xs text-on-surface focus:border-secondary outline-none transition-all"
                    placeholder="Ej. PDK, ZF 8-Speed"
                  />
                </div>
              </div>

              <div>
                <label className="font-label-caps text-[9px] text-on-surface-variant tracking-widest block uppercase font-bold mb-1">Combustible</label>
                <div className="flex gap-2">
                  {(['Petrol', 'Electric', 'Hybrid', 'Diesel'] as const).map((fuel) => (
                    <button
                      key={fuel}
                      type="button"
                      onClick={() => setFormData(p => ({ ...p, fuelType: fuel }))}
                      className={`flex-1 py-2 text-[10px] font-label-caps tracking-widest rounded border transition-all cursor-pointer ${
                        formData.fuelType === fuel
                          ? 'border-secondary bg-secondary/10 text-secondary font-bold'
                          : 'border-outline-variant text-on-surface-variant hover:border-secondary'
                      }`}
                    >
                      {fuel === 'Petrol' ? 'BENCINA' : fuel === 'Electric' ? 'EV' : fuel === 'Hybrid' ? 'HÍBRIDO' : 'DIÉSEL'}
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Bento Block 3: Narrative & Features list */}
            <div className="bg-surface-container p-6 rounded-xl border border-outline-variant space-y-4 md:col-span-8">
              <h3 className="font-display text-xs font-bold text-white uppercase tracking-wider border-b border-outline-variant pb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                Narrativa del Catálogo e Identificadores
              </h3>

              <div className="flex justify-between items-end gap-4 bg-background/50 p-4 rounded border border-outline-variant/60">
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-label-caps text-[9px] text-on-surface-variant tracking-widest block uppercase font-bold mb-1">Número de Stock (SKU)</label>
                    <input 
                      type="text" 
                      value={formData.stockId}
                      onChange={(e) => setFormData(p => ({ ...p, stockId: e.target.value }))}
                      className="w-full bg-surface border border-outline-variant rounded p-2 text-xs text-on-surface font-mono"
                      placeholder="LA-GTR-88"
                    />
                  </div>
                  <div>
                    <label className="font-label-caps text-[9px] text-on-surface-variant tracking-widest block uppercase font-bold mb-1">Código VIN de Chasis</label>
                    <input 
                      type="text" 
                      value={formData.vin}
                      onChange={(e) => setFormData(p => ({ ...p, vin: e.target.value }))}
                      className="w-full bg-surface border border-outline-variant rounded p-2 text-xs text-on-surface font-mono"
                      placeholder="1N4AL1AP5NC..."
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAutoFillCodes}
                  className="bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant text-on-surface text-xs font-semibold px-4 py-2 rounded shrink-0 cursor-pointer font-sans h-10"
                >
                  Generar Códigos
                </button>
              </div>

              <div>
                <label className="font-label-caps text-[9px] text-on-surface-variant tracking-widest block uppercase font-bold mb-1">Descripción de ingeniería / Narrativa</label>
                <textarea 
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))}
                  className="w-full bg-surface border border-outline-variant rounded p-3 text-xs text-on-surface focus:border-secondary outline-none transition-all resize-none font-sans leading-relaxed"
                  placeholder="Describe la maestría artesanal del motor, historia o legado..."
                />
              </div>

              <div>
                <label className="font-label-caps text-[9px] text-on-surface-variant tracking-widest block uppercase font-bold mb-1">
                  Características Premium (Una por línea, máx. 4)
                </label>
                <textarea 
                  rows={4}
                  value={formData.featuresInput}
                  onChange={(e) => setFormData(p => ({ ...p, featuresInput: e.target.value }))}
                  className="w-full bg-surface border border-outline-variant rounded p-3 text-xs text-on-surface focus:border-secondary outline-none transition-all resize-none font-sans"
                  placeholder="Ej. Paquete Clubsport con jaula trasera&#10;Frenos cerámicos compuestos de alto rendimiento&#10;Interior de cuero Nappa cosido a mano"
                />
              </div>
            </div>

            {/* Bento Block 4: Drag & Drop Media Upload Simulator */}
            <div className="bg-surface-container p-6 rounded-xl border border-outline-variant space-y-4 md:col-span-4 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="font-display text-xs font-bold text-white uppercase tracking-wider border-b border-outline-variant pb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  Medios e Imágenes
                </h3>

                <div 
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`w-full py-8 border-2 border-dashed rounded-lg text-center transition-all flex flex-col items-center justify-center gap-2 ${
                    isDragging 
                      ? 'border-secondary bg-secondary/5' 
                      : 'border-outline-variant hover:border-secondary bg-surface-container-high/30'
                  }`}
                >
                  <UploadCloud className="w-10 h-10 text-on-surface-variant" />
                  <p className="font-display text-[10px] tracking-wider font-bold uppercase text-on-surface mt-1">Arrastra o selecciona fotos</p>
                  <p className="text-[9px] text-on-surface-variant max-w-xs px-4">Soporta formatos JPG, PNG de alta resolución.</p>
                </div>

                <div className="space-y-1.5 bg-background/30 p-4 rounded border border-outline-variant/60">
                  <label className="font-label-caps text-[9px] text-on-surface-variant tracking-widest block uppercase font-bold">O pega enlace directo a imagen (Recomendado)</label>
                  <input 
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData(p => ({ ...p, image: e.target.value }))}
                    placeholder="https://ejemplo.com/mi-auto.jpg"
                    className="w-full bg-surface border border-outline-variant rounded p-2 text-xs text-on-surface font-sans"
                  />
                  <p className="text-[10px] text-on-surface-variant">
                    Puedes pegar un enlace directo para probar inmediatamente tu automóvil en el showroom.
                  </p>
                </div>
              </div>

              {formData.image && (
                <div className="mt-4 rounded-lg overflow-hidden border border-outline-variant relative group h-24 bg-surface">
                  <img src={formData.image} alt="Vista previa de carga" className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => setFormData(p => ({ ...p, image: '' }))}
                    className="absolute top-2 right-2 p-1.5 bg-background/80 rounded-full text-red-400 border border-outline-variant hover:bg-red-500 hover:text-white cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Form Trigger Buttons */}
          <div className="flex gap-4 justify-end border-t border-outline-variant pt-6">
            <button
              type="button"
              onClick={() => setView('admin')}
              className="px-6 py-3 border border-outline-variant text-on-surface-variant hover:text-on-surface hover:border-on-surface text-xs font-bold tracking-wider font-label-caps rounded transition-all cursor-pointer uppercase font-display"
            >
              Descartar Cambios
            </button>
            <button
              type="submit"
              className="bg-secondary text-background font-black font-display text-xs tracking-wider px-8 py-3 rounded hover:brightness-110 active:scale-95 duration-100 transition-all cursor-pointer uppercase flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Publicar Obra Maestra
            </button>
          </div>

        </form>
      )}

    </motion.div>
  );
}

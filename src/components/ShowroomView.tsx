import { useState, useMemo, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Car, 
  ShieldCheck, 
  CreditCard, 
  RefreshCw, 
  FileCheck2, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Calendar, 
  Gauge, 
  Cog, 
  Fuel, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Send,
  Calculator,
  ChevronRight,
  Search,
  Filter,
  Clock
} from 'lucide-react';
import { Vehicle, Inquiry } from '../types';

interface ShowroomViewProps {
  vehicle: Vehicle;
  allVehicles: Vehicle[];
  onSelectVehicle: (vehicle: Vehicle) => void;
  onAddInquiry: (inquiry: Inquiry) => void;
  setView: (view: 'showroom' | 'inventory' | 'admin' | 'add-vehicle' | 'login') => void;
}

export default function ShowroomView({
  vehicle,
  allVehicles,
  onSelectVehicle,
  onAddInquiry,
  setView
}: ShowroomViewProps) {
  // Gallery active image index
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Quick Hero Filter States
  const [selectedBrand, setSelectedBrand] = useState('Todas');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedPriceMax, setSelectedPriceMax] = useState('Todos');

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Financing Simulator state
  const [simPrice, setSimPrice] = useState(vehicle.price || 15000);
  const [simDownPaymentPercent, setSimDownPaymentPercent] = useState(30);
  const [simMonths, setSimMonths] = useState(48);

  const images = vehicle.gallery && vehicle.gallery.length > 0 
    ? vehicle.gallery 
    : [vehicle.image];

  // Simulator math
  const downPaymentAmount = Math.round((simPrice * simDownPaymentPercent) / 100);
  const loanAmount = simPrice - downPaymentAmount;
  // Estimated monthly interest ~8.5% annual
  const monthlyRate = 0.085 / 12;
  const estimatedMonthly = Math.round(
    loanAmount > 0 
      ? (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -simMonths))
      : 0
  );

  // Filtered vehicles for the showroom grid
  const displayedVehicles = useMemo(() => {
    return allVehicles.filter(v => {
      if (v.status === 'Hidden') return false;
      const matchBrand = selectedBrand === 'Todas' || v.brand === selectedBrand;
      const matchCat = selectedCategory === 'Todas' || v.category.toLowerCase().includes(selectedCategory.toLowerCase());
      let matchPrice = true;
      if (selectedPriceMax === '12000') matchPrice = v.price <= 12000;
      if (selectedPriceMax === '18000') matchPrice = v.price > 12000 && v.price <= 18000;
      if (selectedPriceMax === '18001') matchPrice = v.price > 18000;
      return matchBrand && matchCat && matchPrice;
    });
  }, [allVehicles, selectedBrand, selectedCategory, selectedPriceMax]);

  const uniqueBrands = useMemo(() => {
    const available = allVehicles.filter(v => v.status !== 'Hidden');
    return ['Todas', ...Array.from(new Set(available.map(v => v.brand)))];
  }, [allVehicles]);

  const handleSubmitInquiry = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    onAddInquiry({
      id: `inq-${Date.now()}`,
      vehicleId: vehicle.id,
      vehicleName: `${vehicle.brand} ${vehicle.model} (${vehicle.year})`,
      fullName: formData.name,
      email: formData.email,
      message: formData.message || `Consulta desde la web por ${vehicle.brand} ${vehicle.model}. Teléfono: ${formData.phone}`,
      date: 'Recién',
      status: 'New'
    });

    setFormSubmitted(true);
  };

  const handleQuickWhatsApp = (v: Vehicle) => {
    const text = encodeURIComponent(
      `Hola Car Seller, me interesa el ${v.brand} ${v.model} año ${v.year} (US$ ${v.price.toLocaleString()}) que vi publicado en la web. ¿Sigue disponible?`
    );
    window.open(`https://wa.me/59892614225?text=${text}`, '_blank');
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      
      {/* 1. HERO SECTION - CLEAN, PROFESSIONAL AUTOMOTIVE BANNER */}
      <section className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white pt-14 pb-20 px-4 sm:px-6 md:px-12 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl space-y-5 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-600/20 border border-brand-500/30 text-brand-400 text-xs font-semibold">
              <MapPin className="w-3.5 h-3.5 text-brand-500" />
              <span>Concesionaria en Paysandú · Florida 1615</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Encontrá tu próximo auto con <span className="text-brand-500">total tranquilidad</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Venta de vehículos seleccionados y 0 km. Tomamos tu usado en permuta y financiamos hasta el 100% en hasta 60 cuotas en UI, pesos o dólares.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
              <button
                onClick={() => setView('inventory')}
                className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <Car className="w-4 h-4" />
                Explorar Catálogo ({allVehicles.filter(v => v.status !== "Sold").length} unidades)
              </button>

              <a
                href="https://wa.me/59892614225?text=Hola%20Car%20Seller,%20quiero%20hacer%20una%20consulta%20por%20un%20veh%C3%ADculo"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm px-6 py-3.5 rounded-xl transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                Hablar con un Asesor
              </a>
            </div>
          </div>

          {/* Quick Search Card in Hero */}
          <div className="mt-12 bg-white rounded-2xl p-5 md:p-6 shadow-2xl border border-slate-100 text-slate-800">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Filter className="w-4 h-4 text-brand-600" />
              Buscador Rápido de Vehículos
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1.5">Marca</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {uniqueBrands.map(b => (
                    <option key={b} value={b}>{b === 'Todas' ? 'Todas las marcas' : b}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1.5">Tipo de Vehículo</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="Todas">Todos los tipos</option>
                  <option value="Pick-up">Pick-ups y Utilitarios</option>
                  <option value="Hatchback">Hatchbacks y Compactos</option>
                  <option value="Sedán">Sedanes Familiares</option>
                  <option value="SUV">SUVs</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1.5">Rango de Precio</label>
                <select
                  value={selectedPriceMax}
                  onChange={(e) => setSelectedPriceMax(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="Todos">Cualquier precio</option>
                  <option value="12000">Hasta US$ 12.000</option>
                  <option value="18000">US$ 12.000 a US$ 18.000</option>
                  <option value="18001">Más de US$ 18.000</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => setView('inventory')}
                  className="w-full bg-slate-900 hover:bg-brand-600 text-white font-bold text-sm py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  Ver {displayedVehicles.length} Resultados
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST PILLARS BAR */}
      <section className="bg-white border-b border-slate-200 py-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
            <ShieldCheck className="w-8 h-8 text-brand-600 shrink-0" />
            <div>
              <h4 className="font-display font-bold text-slate-900 text-sm">Garantía Mecánica</h4>
              <p className="text-xs text-slate-500 mt-0.5">Vehículos revisados punto por punto.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
            <CreditCard className="w-8 h-8 text-brand-600 shrink-0" />
            <div>
              <h4 className="font-display font-bold text-slate-900 text-sm">Financiación 100%</h4>
              <p className="text-xs text-slate-500 mt-0.5">Hasta 60 cuotas en Santander, BROU o propia.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
            <RefreshCw className="w-8 h-8 text-brand-600 shrink-0" />
            <div>
              <h4 className="font-display font-bold text-slate-900 text-sm">Tomamos Permutas</h4>
              <p className="text-xs text-slate-500 mt-0.5">Tasación seria y justa en el día.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
            <FileCheck2 className="w-8 h-8 text-brand-600 shrink-0" />
            <div>
              <h4 className="font-display font-bold text-slate-900 text-sm">Gestoría Ágil</h4>
              <p className="text-xs text-slate-500 mt-0.5">Títulos y transferencias inmediatas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED VEHICLE SPOTLIGHT (FICHA DESTACADA LIMPIA) */}
      <section className="max-w-7xl mx-auto py-14 px-4 sm:px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200 gap-4">
          <div>
            <span className="text-xs font-bold text-brand-600 uppercase tracking-widest block mb-1">
              Unidad Destacada de la Semana
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900">
              {vehicle.brand} {vehicle.model}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500 font-medium">Otros modelos disponibles:</span>
            <button
              onClick={() => setView('inventory')}
              className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 cursor-pointer"
            >
              Ver Catálogo Completo <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Image Gallery & Thumbnails */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-4 md:p-6 border border-slate-200 shadow-sm">
            <div className="relative w-full aspect-[16/10] bg-slate-100 rounded-xl overflow-hidden mb-4">
              <img
                src={images[activeImageIndex]}
                alt={`${vehicle.brand} ${vehicle.model}`}
                className={`w-full h-full object-cover transition-all duration-300 ${
                  vehicle.status === 'Sold' ? 'grayscale-[25%]': ''
                }`}
              />

              <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10">
                {vehicle.status === 'Active' ? 'Disponible' : vehicle.status === 'Sold' ? 'Vendido' : vehicle.status === 'Reserved' ? 'Reservado' : vehicle.status}
              </span>

              {vehicle.status === 'Active' && (
                <span className="absolute top-3 right-3 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10">
                  Año {vehicle.year}
                </span>
              )}

              {/* Diagonal Ribbon on Hero Showcase */}
              {vehicle.status === 'Sold' && (
                <div className="absolute top-0 right-0 w-36 h-36 overflow-hidden z-20 pointer-events-none">
                  <div className="absolute top-[28px] -right-[46px] w-[180px] transform rotate-45 bg-red-600 text-white font-black text-xs tracking-widest uppercase text-center py-1.5 shadow-2xl border-y-2 border-white">
                    VENDIDO
                  </div>
                </div>
              )}

              {vehicle.status === 'Reserved' && (
                <div className="absolute top-0 right-0 w-36 h-36 overflow-hidden z-20 pointer-events-none">
                  <div className="absolute top-[28px] -right-[46px] w-[180px] transform rotate-45 bg-amber-500 text-slate-950 font-black text-xs tracking-widest uppercase text-center py-1.5 shadow-2xl border-y-2 border-white">
                    RESERVADO
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx 
                        ? 'border-brand-600 scale-95 shadow-sm' 
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Miniatura" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Pricing, Specs and Immediate Actions */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
              {/* Status Notice Banner in Hero */}
              {vehicle.status === 'Sold' && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl font-bold text-xs flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse shrink-0" />
                  <div>
                    <span className="font-extrabold uppercase tracking-wide block text-xs">Vehículo Vendido</span>
                    <span className="text-xs font-medium text-slate-600">Esta unidad ya fue comercializada. ¡Consultanos por modelos similares disponibles!</span>
                  </div>
                </div>
              )}

              {vehicle.status === 'Reserved' && (
                <div className="bg-amber-50 border border-amber-200 text-amber-900 px-4 py-3 rounded-xl font-bold text-xs flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <span className="font-extrabold uppercase tracking-wide block text-xs text-amber-800">Vehículo Reservado</span>
                    <span className="text-xs font-medium text-slate-600">Esta unidad se encuentra señada en proceso de entrega.</span>
                  </div>
                </div>
              )}
              <div>
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Precio al Contado</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="font-display text-3xl md:text-4xl font-extrabold text-slate-900">
                    US$ {vehicle.price.toLocaleString()}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    IVA Incl. o Descuenta
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  O financiado desde <strong>US$ {Math.round(vehicle.price / 48)} / mes</strong> (Santander / Propia)
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                    <Calendar className="w-3.5 h-3.5 text-brand-600" />
                    <span>Año</span>
                  </div>
                  <span className="font-bold text-sm text-slate-900">{vehicle.year}</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                    <Gauge className="w-3.5 h-3.5 text-brand-600" />
                    <span>Kilometraje</span>
                  </div>
                  <span className="font-bold text-sm text-slate-900">{vehicle.mileage.toLocaleString()} km</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                    <Cog className="w-3.5 h-3.5 text-brand-600" />
                    <span>Transmisión</span>
                  </div>
                  <span className="font-bold text-sm text-slate-900">{vehicle.transmissionDetail || vehicle.transmission}</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                    <Fuel className="w-3.5 h-3.5 text-brand-600" />
                    <span>Combustible</span>
                  </div>
                  <span className="font-bold text-sm text-slate-900">{vehicle.engine || 'Nafta'}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => handleQuickWhatsApp(vehicle)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3.5 px-4 rounded-xl shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                  Consultar este Auto por WhatsApp
                </button>

                <a
                  href="tel:47232483"
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-600" />
                  Llamar a Concesionaria (472 32483)
                </a>
              </div>
            </div>

            {/* Features summary checklist */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h4 className="font-display font-bold text-sm text-slate-900 mb-3">
                Puntos destacados de esta unidad
              </h4>
              <ul className="space-y-2">
                {vehicle.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-600 leading-snug">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 4. RECENT STOCK CARDS (CATÁLOGO RÁPIDO Y PROLIJO) */}
      <section className="bg-slate-100/70 border-t border-b border-slate-200 py-16 px-4 sm:px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-brand-600 uppercase tracking-widest block mb-1">
                Stock Seleccionado
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900">
                Vehículos Disponibles en Local
              </h3>
            </div>
            <button
              onClick={() => setView('inventory')}
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700 cursor-pointer"
            >
              Ver todos los filtros <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedVehicles.slice(0, 8).map((v) => (
              <div
                key={v.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  {/* Card Image */}
                  <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                    <img
                      src={v.image}
                      alt={`${v.brand} ${v.model}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                      Año {v.year}
                    </span>
                    <span className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {v.mileage === 0 ? '0 KM' : `${v.mileage.toLocaleString()} km`}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 space-y-2.5">
                    <div>
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        {v.brand}
                      </span>
                      <h4 className="font-display font-bold text-base text-slate-900 leading-snug line-clamp-1 group-hover:text-brand-600 transition-colors">
                        {v.model}
                      </h4>
                    </div>

                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-500 font-medium">
                      <span className="bg-slate-100 px-2 py-0.5 rounded">
                        {v.transmission}
                      </span>
                      <span className="bg-slate-100 px-2 py-0.5 rounded">
                        {v.engine}
                      </span>
                      <span className="bg-slate-100 px-2 py-0.5 rounded">
                        {v.color}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Precio</span>
                        <span className="font-display font-extrabold text-lg text-slate-900">
                          US$ {v.price.toLocaleString()}
                        </span>
                      </div>
                      {v.status === 'Sold' ? (
                        <span className="text-[11px] text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded border border-red-200">
                          Vendido
                        </span>
                      ) : v.status === 'Reserved' ? (
                        <span className="text-[11px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          Reservado
                        </span>
                      ) : (
                        <span className="text-[11px] text-emerald-600 font-bold">
                          Financiable
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      onSelectVehicle(v);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full text-center py-2 px-3 border border-slate-200 hover:border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Ver Ficha
                  </button>
                  <button
                    onClick={() => handleQuickWhatsApp(v)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white text-emerald-600" />
                    Consultar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => setView('inventory')}
              className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-sm py-3 px-8 rounded-xl shadow-sm hover:shadow transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              Ver Catálogo Completo y Filtros Avanzados
              <ArrowRight className="w-4 h-4 text-brand-600" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. FINANCING SIMULATOR & URUGUAYAN BANKS */}
      <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-widest block">
              Financiación a tu Medida
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
              Facilidades de pago en pesos, UI o dólares
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Trabajamos con las principales entidades bancarias de Uruguay y además contamos con líneas de financiación propia flexible. Te asesoramos sin costo para encontrar la cuota más cómoda.
            </p>

            {/* Bank Pills */}
            <div className="pt-2">
              <span className="text-xs font-bold text-slate-500 uppercase block mb-3">Líneas de crédito disponibles con:</span>
              <div className="flex flex-wrap gap-2.5">
                {['Santander', 'BROU', 'Itaú', 'BBVA', 'Scotiabank', 'Financiación Propia'].map(b => (
                  <span key={b} className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-lg shadow-2xs">
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Aprobación rápida con cédula y constancia de ingresos.</span>
            </div>
          </div>

          {/* Interactive Calculator Box */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-md">
            <div className="flex items-center gap-2 font-display font-bold text-base text-slate-900 mb-6">
              <Calculator className="w-5 h-5 text-brand-600" />
              <span>Simulador de Cuota Estimada</span>
            </div>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1.5">
                  <span>Valor del Vehículo</span>
                  <span className="font-bold text-slate-900">US$ {simPrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={5000}
                  max={45000}
                  step={500}
                  value={simPrice}
                  onChange={(e) => setSimPrice(Number(e.target.value))}
                  className="w-full accent-brand-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1.5">
                  <span>Entrega Inicial ({simDownPaymentPercent}%)</span>
                  <span className="font-bold text-slate-900">US$ {downPaymentAmount.toLocaleString()}</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[0, 20, 30, 50].map(pct => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setSimDownPaymentPercent(pct)}
                      className={`text-xs py-1.5 rounded-lg font-bold border transition-colors cursor-pointer ${
                        simDownPaymentPercent === pct 
                          ? 'bg-brand-600 text-white border-brand-600' 
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {pct === 0 ? 'Sin entrega' : `${pct}%`}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1.5">
                  <span>Plazo de Financiación</span>
                  <span className="font-bold text-slate-900">{simMonths} cuotas</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[12, 24, 36, 48, 60].map(m => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setSimMonths(m)}
                      className={`text-xs py-1.5 rounded-lg font-bold border transition-colors cursor-pointer ${
                        simMonths === m 
                          ? 'bg-brand-600 text-white border-brand-600' 
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {m} meses
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculated Result Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
                <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Cuota Mensual Estimada</span>
                <div className="font-display text-3xl font-black text-brand-600 my-1">
                  US$ {estimatedMonthly} <span className="text-xs text-slate-500 font-normal">/ mes</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Calculado sobre saldo a financiar de US$ {loanAmount.toLocaleString()}. Sujeto a aprobación crediticia.
                </p>
              </div>

              <a
                href={`https://wa.me/59892614225?text=${encodeURIComponent(
                  `Hola Car Seller, hice una simulación de financiación en la web:\n- Auto de US$ ${simPrice.toLocaleString()}\n- Entrega: US$ ${downPaymentAmount.toLocaleString()} (${simDownPaymentPercent}%)\n- Plazo: ${simMonths} cuotas de aprox. US$ ${estimatedMonthly}\n¿Me podrían asesorar con los requisitos?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                Consultar esta Financiación por WhatsApp
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 6. CONTACT FORM & LOCATION MAP SECTION */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold text-brand-500 uppercase tracking-widest block">
              Atención Personalizada
            </span>
            <h3 className="font-display text-3xl font-extrabold text-white">
              Estamos en Paysandú para ayudarte
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Acercate a nuestro local en Florida 1615 para ver los autos en persona, realizar un test drive o coordinar la tasación de tu vehículo usado.
            </p>

            <div className="space-y-4 pt-2 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Dirección:</strong>
                  <span>Florida 1615, Ciudad de Paysandú, Uruguay</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Teléfonos:</strong>
                  <span>Fijo: 472 32483 · Celular / WhatsApp: 092 614 225</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Horario de Salón:</strong>
                  <span>Lunes a Viernes de 8:00 a 18:00 hs</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-2xl p-6 md:p-8 text-slate-800 shadow-xl">
            <h4 className="font-display font-bold text-lg text-slate-900 mb-1">
              Envianos tu consulta
            </h4>
            <p className="text-xs text-slate-500 mb-6">
              Completá el formulario y un asesor se comunicará a la brevedad.
            </p>

            {formSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h5 className="font-bold text-base text-slate-900">¡Mensaje Enviado con Éxito!</h5>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Gracias por comunicarte. Uno de nuestros asesores de Car Seller te responderá pronto.
                </p>
                <button
                  type="button"
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs font-bold text-brand-600 hover:underline pt-2 cursor-pointer"
                >
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Nombre y Apellido *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                      placeholder="Ej. Juan Pérez"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Teléfono / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                      placeholder="Ej. 099 123 456"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Correo Electrónico *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                    placeholder="ejemplo@correo.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Mensaje o Vehículo de Interés</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                    placeholder="Contanos qué auto estás buscando, si tenés un vehículo para entregar en permuta o tus dudas sobre financiación..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none font-sans"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm py-3 px-4 rounded-xl shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Enviar Consulta
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}

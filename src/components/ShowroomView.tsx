import { useState, useEffect, FormEvent, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Phone, 
  ArrowRight, 
  Bolt, 
  Gauge, 
  Compass, 
  Send,
  Sparkles,
  Calendar,
  Layers,
  Landmark,
  ShieldCheck,
  Star
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
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Parallax Refs
  const section1Ref = useRef<HTMLElement>(null);
  const section2Ref = useRef<HTMLElement>(null);
  const bg1Ref = useRef<HTMLDivElement>(null);
  const bg2Ref = useRef<HTMLDivElement>(null);

  // Ultra-high performance scroll listener for zero-jitter parallax on mobile
  useEffect(() => {
    let animationFrameId: number;
    
    const updateParallax = () => {
      const h = window.innerHeight;
      
      if (section1Ref.current && bg1Ref.current) {
        const rect = section1Ref.current.getBoundingClientRect();
        const topClip = Math.max(0, rect.top);
        const bottomClip = Math.max(0, h - rect.bottom);
        bg1Ref.current.style.clipPath = `inset(${topClip}px 0px ${bottomClip}px 0px)`;
      }
      
      if (section2Ref.current && bg2Ref.current) {
        const rect = section2Ref.current.getBoundingClientRect();
        const topClip = Math.max(0, rect.top);
        const bottomClip = Math.max(0, h - rect.bottom);
        bg2Ref.current.style.clipPath = `inset(${topClip}px 0px ${bottomClip}px 0px)`;
      }
      
      animationFrameId = requestAnimationFrame(updateParallax);
    };

    updateParallax(); // Start loop

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Scroll to top on vehicle changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveImageIndex(0);
    setFormSubmitted(false);
    setFormData({ 
      name: '', 
      email: '', 
      message: `Hola, estoy interesado en el ${vehicle.brand} ${vehicle.model} (${vehicle.year}). Me gustaría recibir más información.` 
    });
  }, [vehicle]);

  // Combine vehicle main image and gallery images for a full cycle slider
  const images = [vehicle.image, ...(vehicle.gallery || [])].filter(Boolean);

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const newInquiry: Inquiry = {
      id: Math.random().toString(36).substr(2, 9),
      vehicleId: vehicle.id,
      vehicleName: `${vehicle.brand} ${vehicle.model}`,
      fullName: formData.name,
      email: formData.email,
      message: formData.message,
      date: 'Recién',
      status: 'New'
    };

    onAddInquiry(newInquiry);
    setFormSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  // Find 3 similar masterpieces
  const similarVehicles = allVehicles
    .filter(v => v.id !== vehicle.id)
    .slice(0, 3);

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(vehicle.price);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      {/* Dealership Presentation Section */}
      <section 
        ref={section1Ref}
        className="relative w-full min-h-screen px-6 md:px-12 flex flex-col items-center justify-center text-center border-b border-outline-variant"
      >
        {/* Zero-Jitter Fixed Background Layer using Clip-Path */}
        <div 
          ref={bg1Ref}
          className="fixed top-0 left-0 w-full h-[100vh] z-0 pointer-events-none"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=1920')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            willChange: 'clip-path'
          }}
        >
          <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="flex justify-center gap-2 mb-6">
            <Star className="w-5 h-5 text-secondary fill-secondary" />
            <Star className="w-5 h-5 text-secondary fill-secondary" />
            <Star className="w-5 h-5 text-secondary fill-secondary" />
            <Star className="w-5 h-5 text-secondary fill-secondary" />
            <Star className="w-5 h-5 text-secondary fill-secondary" />
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight text-white drop-shadow-md">
            CAR SELLER
          </h1>
          <p className="font-display text-lg md:text-2xl text-secondary uppercase tracking-widest font-bold drop-shadow-md">
            Paysandú · Uruguay
          </p>
          <p className="text-sm md:text-base text-on-surface-variant max-w-2xl mx-auto leading-relaxed font-sans drop-shadow-md font-medium">
            Tu automotora de confianza en Paysandú. Venta, permuta y consignación de vehículos 0 km y seleccionados.
            Financiación a tu medida en pesos o dólares. Venta, permuta y consignaciones. Te esperamos en Florida 1615.
          </p>
        </div>
      </section>

      {/* Financing Section */}
      <section 
        ref={section2Ref}
        className="relative w-full min-h-screen px-6 md:px-12 flex flex-col items-center justify-center border-b border-outline-variant"
      >
        {/* Zero-Jitter Fixed Background Layer using Clip-Path */}
        <div 
          ref={bg2Ref}
          className="fixed top-0 left-0 w-full h-[100vh] z-0 pointer-events-none"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=1920')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            willChange: 'clip-path'
          }}
        >
          <div className="absolute inset-0 bg-background/85 backdrop-blur-sm"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl font-extrabold uppercase tracking-tight flex items-center justify-center gap-3 text-white drop-shadow-md">
              <Landmark className="w-8 h-8 text-secondary" />
              FINANCIACIÓN EXCLUSIVA
            </h2>
            <p className="text-sm text-on-surface-variant max-w-2xl mx-auto font-medium drop-shadow-md">
              Trabajamos con las principales entidades financieras de Uruguay para ofrecerle planes a medida, 
              tasas preferenciales y agilidad en la aprobación de su crédito automotor.
            </p>
          </div>

          {/* Uruguayan Banks */}
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-80 hover:opacity-100 transition-opacity duration-500">
            <div className="font-display text-xl md:text-2xl font-bold tracking-widest text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">BROU</div>
            <div className="font-display text-xl md:text-2xl font-bold tracking-widest text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">ITAÚ</div>
            <div className="font-display text-xl md:text-2xl font-bold tracking-widest text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">SANTANDER</div>
            <div className="font-display text-xl md:text-2xl font-bold tracking-widest text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">SCOTIABANK</div>
            <div className="font-display text-xl md:text-2xl font-bold tracking-widest text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">BBVA</div>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs font-bold text-secondary mt-4 drop-shadow-md">
            <ShieldCheck className="w-4 h-4" />
            <span className="uppercase tracking-widest">Operaciones 100% seguras y confidenciales</span>
          </div>
        </div>
      </section>

      {/* Hero Gallery Section (Featured Car) */}
      <section className="relative w-full min-h-[72vh] md:min-h-[85vh] overflow-hidden group flex flex-col justify-between pt-8 pb-12 px-6 md:px-12 bg-surface-container-lowest border-b border-outline-variant">
        {/* Soft Ambient Blurred Backdrop */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center filter blur-3xl opacity-20 scale-110 pointer-events-none transition-all duration-700"
          style={{ backgroundImage: `url('${images[activeImageIndex]}')` }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-transparent to-black/30 pointer-events-none"></div>

        {/* Center Main Car Image with full containment - shown from a distance, completely visible! */}
        <div className="relative z-10 w-full flex-grow flex items-center justify-center py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImageIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-5xl h-[42vh] md:h-[58vh] flex items-center justify-center p-2 md:p-4"
            >
              <img
                src={images[activeImageIndex]}
                alt={`${vehicle.brand} ${vehicle.model}`}
                className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)] rounded-2xl"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Floating Details and Thumbnail Strip */}
        <div className="relative z-20 flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-7xl mx-auto w-full">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-secondary-container text-on-secondary-container px-3 py-1 font-label-caps text-[10px] rounded font-bold uppercase tracking-wider">
                {vehicle.status === 'Active' ? 'DISPONIBLE' : vehicle.status.toUpperCase()}
              </span>
              <span className="bg-surface-container-high text-on-surface-variant px-3 py-1 font-label-caps text-[10px] rounded font-bold uppercase tracking-wider border border-outline-variant">
                GARANTÍA & PERMUTA
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-black mb-1 uppercase tracking-tight text-white drop-shadow-lg">
              {vehicle.model}
            </h2>
            <p className="font-display text-base md:text-lg text-on-surface-variant drop-shadow-md">
              {vehicle.year} {vehicle.brand} • {vehicle.category}
            </p>
          </div>

          {/* Gallery Slider Navigation & Dots */}
          <div className="flex items-center gap-4">
            <div className="flex gap-2 mr-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeImageIndex === idx ? 'w-8 bg-secondary' : 'w-2 bg-outline-variant hover:bg-on-surface-variant'
                  }`}
                  aria-label={`Foto ${idx + 1}`}
                />
              ))}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                <button 
                  onClick={prevImage}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant bg-surface-container/60 backdrop-blur hover:bg-secondary-container hover:text-white transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={nextImage}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant bg-surface-container/60 backdrop-blur hover:bg-secondary-container hover:text-white transition-all cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Layout Grid */}
      <section className="px-6 md:px-12 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Side: Technical Specifications & Features */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Mobile-Only Pricing Card (shows on top for mobile screens) */}
            <div className="lg:hidden bg-surface-container p-6 rounded-lg border border-outline-variant">
              <p className="font-label-caps text-[10px] text-on-surface-variant uppercase mb-1">MSRP DESDE</p>
              <h2 className="font-display text-3xl font-extrabold text-secondary">{formattedPrice}</h2>
              <p className="text-xs text-on-surface-variant mt-2">Disponibilidad inmediata para importación y entrega directa.</p>
            </div>

            {/* Technical Specifications Bento Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-surface-container p-6 rounded-lg border border-outline-variant flex flex-col items-center text-center group hover:border-secondary transition-all duration-300">
                <Layers className="w-6 h-6 text-secondary mb-3 transition-transform group-hover:scale-110" />
                <span className="font-label-caps text-[9px] text-on-surface-variant uppercase tracking-wider mb-1">Motor</span>
                <span className="font-display text-sm md:text-base font-bold text-on-surface line-clamp-1">{vehicle.engine}</span>
              </div>
              <div className="bg-surface-container p-6 rounded-lg border border-outline-variant flex flex-col items-center text-center group hover:border-secondary transition-all duration-300">
                <Bolt className="w-6 h-6 text-secondary mb-3 transition-transform group-hover:scale-110" />
                <span className="font-label-caps text-[9px] text-on-surface-variant uppercase tracking-wider mb-1">Potencia</span>
                <span className="font-display text-sm md:text-base font-bold text-on-surface">{vehicle.power}</span>
              </div>
              <div className="bg-surface-container p-6 rounded-lg border border-outline-variant flex flex-col items-center text-center group hover:border-secondary transition-all duration-300">
                <Gauge className="w-6 h-6 text-secondary mb-3 transition-transform group-hover:scale-110" />
                <span className="font-label-caps text-[9px] text-on-surface-variant uppercase tracking-wider mb-1">Aceleración</span>
                <span className="font-display text-sm md:text-base font-bold text-on-surface">{vehicle.acceleration}</span>
              </div>
              <div className="bg-surface-container p-6 rounded-lg border border-outline-variant flex flex-col items-center text-center group hover:border-secondary transition-all duration-300">
                <Compass className="w-6 h-6 text-secondary mb-3 transition-transform group-hover:scale-110" />
                <span className="font-label-caps text-[9px] text-on-surface-variant uppercase tracking-wider mb-1">Tracción</span>
                <span className="font-display text-sm md:text-base font-bold text-on-surface line-clamp-1">{vehicle.drive}</span>
              </div>
            </div>

            {/* Premium Features Checklist */}
            <div>
              <h3 className="font-display text-lg font-bold mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-secondary rounded-full"></span>
                CARACTERÍSTICAS PREMIUM
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                {vehicle.features.map((feature, idx) => {
                  const [title, desc] = feature.split(' — ');
                  const cleanTitle = desc ? title : feature;
                  const cleanDesc = desc || 'Equipamiento original de alta calidad diseñado para un máximo confort.';
                  
                  return (
                    <div key={idx} className="flex items-start gap-4 py-3 border-b border-outline-variant">
                      <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-display text-sm font-semibold text-on-surface">{cleanTitle}</p>
                        <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{cleanDesc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* The Engineering Marvel - Dynamic Narration */}
            <div className="space-y-6">
              <h3 className="font-display text-lg font-bold flex items-center gap-3">
                <span className="w-8 h-1 bg-secondary rounded-full"></span>
                MARAVILLA DE INGENIERÍA
              </h3>
              <p className="text-base text-on-surface-variant leading-relaxed text-justify font-sans">
                {vehicle.description}
              </p>
            </div>

            {/* Gallery Grid: Multiple Photos of the Vehicle */}
            {images && images.length > 0 && (
              <div className="pt-6 space-y-3">
                <h4 className="font-display text-sm font-bold uppercase tracking-wider text-on-surface flex items-center justify-between">
                  <span>Galería Completa ({images.length} fotos)</span>
                  <span className="text-[11px] text-secondary font-normal font-sans">Toca cualquier foto para ampliarla arriba</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {images.map((imgUrl, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveImageIndex(index);
                        // Scroll smoothly to hero car display if scrolled down
                        window.scrollTo({ top: window.innerHeight * 1.5, behavior: 'smooth' });
                      }}
                      className={`relative aspect-[4/3] rounded-lg overflow-hidden border p-1 bg-surface-container-high transition-all cursor-pointer group ${
                        activeImageIndex === index 
                          ? 'border-secondary ring-2 ring-secondary/50 scale-[1.02]' 
                          : 'border-outline-variant hover:border-secondary/60'
                      }`}
                    >
                      <img 
                        src={imgUrl} 
                        alt={`Vista ${index + 1}`} 
                        className="w-full h-full object-contain rounded group-hover:scale-105 transition-transform duration-300"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Side: Sticky Pricing, Actions & Lead Generation Inquiry Form */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              
              {/* Desktop Only Pricing Box */}
              <div className="hidden lg:block bg-surface-container p-8 rounded-lg border border-outline-variant">
                <p className="font-label-caps text-xs text-on-surface-variant tracking-widest uppercase mb-1">MSRP DESDE</p>
                <h2 className="font-display text-4xl font-black text-secondary">{formattedPrice}</h2>
                <p className="text-xs text-on-surface-variant mt-3 leading-relaxed">
                  Disponible para entrega inmediata o pedido de importación exclusivo. Soporte logístico global completo.
                </p>
                
                <div className="mt-6 flex flex-col gap-3">
                  <button 
                    onClick={() => {
                      const el = document.getElementById('inquiry-form');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    className="w-full bg-secondary-container text-on-secondary-container py-3.5 font-label-caps text-xs tracking-wider rounded font-bold hover:brightness-110 transition-all cursor-pointer uppercase font-display"
                  >
                    Apartar este Vehículo
                  </button>
                  <button 
                    onClick={() => alert(`Financiamiento estimado para ${vehicle.brand} ${vehicle.model}: Cuotas mensuales desde ${(vehicle.price * 0.015).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })} con pie del 30%.`)}
                    className="w-full border border-outline-variant text-on-surface py-3.5 font-label-caps text-xs tracking-wider rounded hover:bg-surface-container-high transition-all cursor-pointer uppercase font-display"
                  >
                    Calcular Financiamiento
                  </button>
                </div>
              </div>

              {/* Inquiry Form */}
              <div id="inquiry-form" className="bg-surface-container-high p-6 md:p-8 rounded-lg border border-secondary/20 shadow-xl transition-all duration-300">
                <h3 className="font-display text-lg font-bold mb-1">¿TE INTERESA?</h3>
                <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">
                  Contacta a nuestro equipo de ventas para agendar un test drive o una demostración privada.
                </p>

                {formSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 space-y-4"
                  >
                    <div className="w-16 h-16 bg-secondary/10 border border-secondary text-secondary rounded-full flex items-center justify-center mx-auto">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <h4 className="font-display text-base font-bold text-on-surface">¡Solicitud Enviada!</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Uno de nuestros asesores de Car Seller se comunicará contigo a la brevedad.
                    </p>
                    <button 
                      onClick={() => setFormSubmitted(false)}
                      className="text-xs text-secondary hover:underline font-semibold mt-4 cursor-pointer"
                    >
                      Enviar otro mensaje
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="font-label-caps text-[9px] tracking-widest text-on-surface-variant block mb-1">NOMBRE COMPLETO</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-surface border border-outline-variant rounded p-3 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label className="font-label-caps text-[9px] tracking-widest text-on-surface-variant block mb-1">CORREO ELECTRÓNICO</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-surface border border-outline-variant rounded p-3 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="font-label-caps text-[9px] tracking-widest text-on-surface-variant block mb-1">MENSAJE</label>
                      <textarea 
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        className="w-full bg-surface border border-outline-variant rounded p-3 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all resize-none font-sans"
                        placeholder="Escribe tu mensaje aquí..."
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-on-surface text-background py-3.5 font-label-caps text-xs tracking-wider rounded font-bold hover:bg-secondary hover:text-on-secondary transition-all cursor-pointer uppercase flex items-center justify-center gap-2 font-display"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Enviar Consulta
                    </button>
                  </form>
                )}

                <div className="mt-6 pt-6 border-t border-outline-variant flex flex-col items-center justify-center gap-1.5 text-on-surface-variant hover:text-on-surface transition-colors">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-secondary" />
                    <span className="font-sans text-xs font-semibold">092 614 225 · Tel: 472 32483</span>
                  </div>
                  <span className="font-sans text-[11px] text-on-surface-variant">Florida 1615 · Paysandú, Uruguay</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Related Vehicles Section (Screenshot 1: Similar Masterpieces) */}
      <section className="bg-surface-container-low py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-on-surface mb-2 uppercase tracking-tight">
                OBRAS MAESTRAS SIMILARES
              </h2>
              <p className="text-xs md:text-sm text-on-surface-variant">
                Explora otros vehículos exclusivos disponibles en nuestra colección de alto rendimiento.
              </p>
            </div>
            
            <button 
              onClick={() => setView('inventory')}
              className="hidden md:flex items-center gap-2 font-label-caps text-xs tracking-widest font-bold text-secondary hover:underline cursor-pointer"
            >
              VER TODO EL INVENTARIO 
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarVehicles.map((similar, idx) => (
              <div 
                key={similar.id}
                onClick={() => onSelectVehicle(similar)}
                className="group bg-surface-container rounded-lg overflow-hidden border border-outline-variant hover:border-secondary transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-[16/10] overflow-hidden bg-surface-container-highest relative flex items-center justify-center p-2">
                  <img 
                    src={similar.image} 
                    alt="" 
                    className="absolute inset-0 w-full h-full object-cover filter blur-lg opacity-25 scale-110 pointer-events-none"
                  />
                  <img 
                    src={similar.image} 
                    alt={`${similar.brand} ${similar.model}`}
                    className="relative z-10 w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 z-20 px-2 py-1 bg-background/80 backdrop-blur rounded text-[10px] font-bold font-display uppercase tracking-widest text-on-surface border border-outline-variant">
                    {similar.year}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-display text-base font-bold text-on-surface uppercase group-hover:text-secondary transition-colors line-clamp-1">
                        {similar.model}
                      </h4>
                      <p className="text-xs text-on-surface-variant mt-1">{similar.brand} • {similar.engine}</p>
                    </div>
                    <span className="font-sans text-sm font-bold text-secondary whitespace-nowrap">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(similar.price)}
                    </span>
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-outline-variant">
                    <div className="flex items-center gap-1 text-[10px] font-label-caps text-on-surface-variant font-semibold">
                      <Gauge className="w-3.5 h-3.5 text-secondary" /> {similar.acceleration}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-label-caps text-on-surface-variant font-semibold">
                      <Bolt className="w-3.5 h-3.5 text-secondary" /> {similar.power}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-label-caps text-on-surface-variant font-semibold">
                      <Layers className="w-3.5 h-3.5 text-secondary" /> {similar.transmissionDetail}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center md:hidden">
            <button 
              onClick={() => setView('inventory')}
              className="flex items-center gap-2 font-label-caps text-xs tracking-widest font-bold text-secondary hover:underline cursor-pointer"
            >
              VER TODO EL INVENTARIO 
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

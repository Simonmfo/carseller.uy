import { Phone, MapPin, Instagram, Clock, MessageCircle, ShieldCheck, CreditCard, RefreshCw } from 'lucide-react';

interface FooterProps {
  setView: (view: 'showroom' | 'inventory' | 'admin' | 'add-vehicle' | 'login') => void;
}

export default function Footer({ setView }: FooterProps) {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto">
      {/* Upper Features Strip */}
      <div className="border-b border-slate-800 bg-slate-950/50 py-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 p-2">
            <div className="w-12 h-12 rounded-xl bg-brand-600/10 border border-brand-600/20 flex items-center justify-center text-brand-500 shrink-0">
              <ShieldCheck className="w-6 h-6 text-brand-500" />
            </div>
            <div>
              <h4 className="font-display font-bold text-white text-sm">Vehículos Seleccionados</h4>
              <p className="text-xs text-slate-400 mt-0.5">Mecánica revisada y documentación 100% al día para transferir.</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4 p-2">
            <div className="w-12 h-12 rounded-xl bg-brand-600/10 border border-brand-600/20 flex items-center justify-center text-brand-500 shrink-0">
              <CreditCard className="w-6 h-6 text-brand-500" />
            </div>
            <div>
              <h4 className="font-display font-bold text-white text-sm">Financiación Flexible</h4>
              <p className="text-xs text-slate-400 mt-0.5">Planes bancarios y financiación propia hasta en 60 cuotas en UI o dólares.</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4 p-2">
            <div className="w-12 h-12 rounded-xl bg-brand-600/10 border border-brand-600/20 flex items-center justify-center text-brand-500 shrink-0">
              <RefreshCw className="w-6 h-6 text-brand-500" />
            </div>
            <div>
              <h4 className="font-display font-bold text-white text-sm">Tomamos tu Usado</h4>
              <p className="text-xs text-slate-400 mt-0.5">Tasación ágil y justa de tu auto actual como parte de pago.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main 4-Column Footer */}
      <div className="max-w-7xl mx-auto py-14 px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Col 1: Identity & About */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img 
              src="/carseller-logo.png" 
              alt="Car Seller Logo" 
              className="w-10 h-10 rounded-full object-cover border border-slate-700 shadow" 
            />
            <div>
              <div className="font-display text-lg font-black text-white tracking-tight">
                CAR <span className="text-brand-500">SELLER</span>
              </div>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                Automóviles · Paysandú
              </p>
            </div>
          </div>
          
          <p className="text-xs leading-relaxed text-slate-400">
            Concesionaria líder en compra, venta, permuta y consignación de vehículos 0 km y seminuevos garantizados en el litoral del país.
          </p>

          <div className="pt-2 flex items-center gap-3">
            <a 
              href="https://wa.me/59892614225?text=Hola%20Car%20Seller,%20me%20comunico%20desde%20la%20web" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-9 h-9 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-colors"
              title="WhatsApp 092 614 225"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
            </a>
            <a 
              href="https://www.instagram.com/carseller.uy/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-9 h-9 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center hover:opacity-90 transition-opacity"
              title="Instagram @carseller.uy"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a 
              href="tel:47232483" 
              className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors border border-slate-700"
              title="Llamar al 472 32483"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div>
          <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-brand-600 pl-2.5">
            Navegación
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li>
              <button 
                onClick={() => setView('showroom')} 
                className="hover:text-white transition-colors cursor-pointer"
              >
                Inicio y Destacados
              </button>
            </li>
            <li>
              <button 
                onClick={() => setView('inventory')} 
                className="hover:text-white transition-colors cursor-pointer"
              >
                Catálogo de Vehículos
              </button>
            </li>
            <li>
              <button 
                onClick={() => setView('inventory')} 
                className="hover:text-white transition-colors cursor-pointer"
              >
                Pick-ups & Utilitarios
              </button>
            </li>
            <li>
              <button 
                onClick={() => setView('inventory')} 
                className="hover:text-white transition-colors cursor-pointer"
              >
                Hatchbacks & Compactos
              </button>
            </li>
            <li>
              <button 
                onClick={() => setView('inventory')} 
                className="hover:text-white transition-colors cursor-pointer"
              >
                SUVs y Familiares
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Services & Financing */}
        <div>
          <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-brand-600 pl-2.5">
            Servicios
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
              Financiación hasta 100% bancaria
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
              Tomamos tu vehículo en permuta
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
              Gestión de ventas en consignación
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
              Gestoría de títulos y transferencias
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
              Convenios con Santander, BROU, Itaú
            </li>
          </ul>
        </div>

        {/* Col 4: Contact & Location */}
        <div>
          <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-brand-600 pl-2.5">
            Visítanos
          </h3>
          <div className="space-y-3 text-xs text-slate-400">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
              <span>Florida 1615, Paysandú, Uruguay</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
              <span>Tel: (+598) 472 32483</span>
            </div>
            <div className="flex items-start gap-2.5">
              <MessageCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <a 
                href="https://wa.me/59892614225?text=Hola%20Car%20Seller,%20me%20comunico%20desde%20la%20web" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                WhatsApp: 092 614 225
              </a>
            </div>
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
              <span>Lunes a Viernes: 8:00 a 18:00 hs</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 py-6 px-6 md:px-12 bg-slate-950 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} Car Seller Automóviles (carseller.uy). Florida 1615, Paysandú, Uruguay.
          </p>
          <div className="flex items-center gap-6">
            <a 
              href="https://www.instagram.com/carseller.uy/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              Instagram @carseller.uy
            </a>
            <button 
              onClick={() => setView('login')} 
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Acceso Interno
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

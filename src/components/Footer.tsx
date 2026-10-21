import { Phone, MapPin, Instagram, Clock } from 'lucide-react';

interface FooterProps {
  setView: (view: 'showroom' | 'inventory' | 'admin' | 'add-vehicle' | 'login') => void;
}

export default function Footer({ setView }: FooterProps) {
  return (
    <footer className="w-full py-12 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8 bg-surface-container-lowest border-t border-outline-variant mt-auto">
      <div className="flex flex-col items-center md:items-start gap-3">
        <div className="flex items-center gap-3">
          <img 
            src="/carseller-logo.svg" 
            alt="Car Seller" 
            className="w-9 h-9 rounded-full object-cover border border-secondary/40" 
          />
          <div className="font-display text-lg font-black text-on-surface uppercase tracking-tight">
            CAR <span className="text-secondary">SELLER</span>
          </div>
        </div>
        <p className="font-sans text-xs md:text-sm text-on-surface-variant max-w-sm text-center md:text-left leading-relaxed">
          Compra, venta, permuta y consignación de vehículos 0 km y seleccionados. Financiación hasta el 100% en hasta 60 y 72 cuotas.
        </p>
        <div className="flex flex-col gap-1 text-xs text-on-surface-variant font-sans">
          <span className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-secondary" />
            Florida 1615, Paysandú, Uruguay
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-secondary" />
            Lunes a Viernes de 8:00 a 18:00 hs
          </span>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-6 md:gap-8 my-2 md:my-0">
        <button onClick={() => setView('inventory')} className="text-xs font-semibold tracking-wider text-on-surface-variant hover:text-secondary transition-colors cursor-pointer uppercase">Catálogo</button>
        <button onClick={() => setView('showroom')} className="text-xs font-semibold tracking-wider text-on-surface-variant hover:text-secondary transition-colors cursor-pointer uppercase">Destacados</button>
        <a 
          href="https://www.instagram.com/carseller.uy/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-xs font-semibold tracking-wider text-on-surface-variant hover:text-secondary transition-colors cursor-pointer uppercase flex items-center gap-1.5"
        >
          <Instagram className="w-3.5 h-3.5 text-secondary" />
          @carseller.uy
        </a>
      </div>

      <div className="flex flex-col items-center md:items-end gap-3">
        <div className="flex gap-4">
          <a 
            href="https://wa.me/59892614225" 
            target="_blank" 
            rel="noopener noreferrer" 
            title="WhatsApp 092 614 225"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant hover:border-secondary hover:text-secondary transition-all cursor-pointer"
          >
            <Phone className="w-4 h-4" />
          </a>
          <a 
            href="https://www.instagram.com/carseller.uy/" 
            target="_blank" 
            rel="noopener noreferrer" 
            title="Instagram @carseller.uy"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant hover:border-secondary hover:text-secondary transition-all cursor-pointer"
          >
            <Instagram className="w-4 h-4" />
          </a>
        </div>
        <p className="font-sans text-[11px] text-on-surface-variant text-center md:text-right">
          &copy; {new Date().getFullYear()} Car Seller Paysandú. Tel: 472 32483 / 092 614 225.
        </p>
      </div>
    </footer>
  );
}

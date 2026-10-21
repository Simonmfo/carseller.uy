import { useState } from 'react';
import { Car, LayoutDashboard, PlusCircle, LogIn, LogOut, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentView: 'showroom' | 'inventory' | 'admin' | 'add-vehicle' | 'login';
  setView: (view: 'showroom' | 'inventory' | 'admin' | 'add-vehicle' | 'login') => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export default function Header({ currentView, setView, isAuthenticated, setIsAuthenticated }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (view: 'showroom' | 'inventory' | 'admin' | 'add-vehicle' | 'login') => {
    setView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 h-20 bg-background/95 backdrop-blur-md border-b border-outline-variant transition-all duration-300">
      <div className="flex items-center gap-8">
        <button 
          onClick={() => setView('showroom')} 
          className="flex items-center gap-3 font-display text-base md:text-xl font-black text-on-surface tracking-tighter uppercase focus:outline-none cursor-pointer group"
        >
          <img 
            src="/carseller-logo.svg" 
            alt="Car Seller Logo" 
            className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover border border-secondary/40 shadow-sm group-hover:scale-105 transition-transform" 
          />
          <div className="flex flex-col text-left">
            <span className="leading-none text-sm md:text-lg font-black tracking-tight">
              CAR <span className="text-secondary group-hover:text-secondary-container transition-colors">SELLER</span>
            </span>
            <span className="text-[10px] text-on-surface-variant tracking-widest font-normal font-sans">
              CARSELLER.UY · PAYSANDÚ
            </span>
          </div>
        </button>
        
        <nav className="hidden md:flex gap-6 items-center">
          <button
            onClick={() => setView('showroom')}
            className={`font-label-caps text-xs tracking-wider font-semibold py-2 transition-colors cursor-pointer ${
              currentView === 'showroom' 
                ? 'text-secondary border-b-2 border-secondary pb-1' 
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => setView('inventory')}
            className={`font-label-caps text-xs tracking-wider font-semibold py-2 transition-colors cursor-pointer ${
              currentView === 'inventory' 
                ? 'text-secondary border-b-2 border-secondary pb-1' 
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Catalogo
          </button>
          {isAuthenticated && (
            <button
              onClick={() => setView('admin')}
              className={`font-label-caps text-xs tracking-wider font-semibold py-2 transition-colors cursor-pointer ${
                currentView === 'admin' || currentView === 'add-vehicle'
                  ? 'text-secondary border-b-2 border-secondary pb-1' 
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Panel de Admin
            </button>
          )}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {/* Hamburger Menu Toggle (Mobile) */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-on-surface p-2 hover:bg-surface-container rounded-full transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
          <>
            <button
              onClick={() => {
                const nextMode = currentView === 'admin' || currentView === 'add-vehicle' ? 'showroom' : 'admin';
                setView(nextMode);
              }}
              className="hidden sm:flex items-center gap-2 px-4 py-2 border border-outline-variant hover:border-secondary rounded text-xs tracking-wider font-bold uppercase transition-all duration-200 cursor-pointer text-on-surface-variant hover:text-on-surface"
            >
              {currentView === 'admin' || currentView === 'add-vehicle' ? (
                <>
                  <Car className="w-4 h-4 text-secondary" />
                  Ver Tienda
                </>
              ) : (
                <>
                  <LayoutDashboard className="w-4 h-4 text-secondary" />
                  Gestionar Inventario
                </>
              )}
            </button>

            <button 
              onClick={() => setView('add-vehicle')}
              className="bg-secondary-container text-on-secondary-container hover:brightness-110 active:scale-95 duration-100 px-4 md:px-6 py-2.5 rounded text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 font-display"
            >
              <PlusCircle className="w-4 h-4" />
              Publicar Auto
            </button>
            <button
              onClick={() => {
                setIsAuthenticated(false);
                setView('showroom');
              }}
              className="text-on-surface-variant hover:text-error transition-colors p-2"
              title="Cerrar Sesión"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </>
        ) : (
          <button 
            onClick={() => setView('login')}
            className="border border-outline-variant hover:border-secondary text-on-surface-variant hover:text-secondary px-4 py-2 rounded text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 font-display"
          >
            <LogIn className="w-4 h-4" />
            Acceso Admin
          </button>
        )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-surface border-b border-outline-variant shadow-xl md:hidden flex flex-col p-4 gap-4 animate-in slide-in-from-top-4">
          <button
            onClick={() => handleNavClick('showroom')}
            className={`text-left font-label-caps text-sm tracking-wider font-semibold py-3 px-4 rounded transition-colors ${
              currentView === 'showroom' ? 'bg-secondary/10 text-secondary' : 'text-on-surface-variant'
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => handleNavClick('inventory')}
            className={`text-left font-label-caps text-sm tracking-wider font-semibold py-3 px-4 rounded transition-colors ${
              currentView === 'inventory' ? 'bg-secondary/10 text-secondary' : 'text-on-surface-variant'
            }`}
          >
            Catálogo
          </button>
          
          {isAuthenticated && (
            <button
              onClick={() => handleNavClick('admin')}
              className={`text-left font-label-caps text-sm tracking-wider font-semibold py-3 px-4 rounded transition-colors ${
                currentView === 'admin' ? 'bg-secondary/10 text-secondary' : 'text-on-surface-variant'
              }`}
            >
              Panel de Admin
            </button>
          )}

          <div className="h-px w-full bg-outline-variant my-2"></div>

          {isAuthenticated ? (
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  const nextMode = currentView === 'admin' || currentView === 'add-vehicle' ? 'showroom' : 'admin';
                  handleNavClick(nextMode);
                }}
                className="flex items-center gap-3 px-4 py-3 border border-outline-variant rounded text-sm font-bold uppercase text-on-surface"
              >
                {currentView === 'admin' || currentView === 'add-vehicle' ? (
                  <><Car className="w-5 h-5 text-secondary" /> Ver Tienda</>
                ) : (
                  <><LayoutDashboard className="w-5 h-5 text-secondary" /> Gestionar Inventario</>
                )}
              </button>
              <button 
                onClick={() => handleNavClick('add-vehicle')}
                className="bg-secondary-container text-on-secondary-container py-3 px-4 rounded text-sm font-bold uppercase flex items-center gap-3"
              >
                <PlusCircle className="w-5 h-5" /> Publicar Auto
              </button>
              <button
                onClick={() => {
                  setIsAuthenticated(false);
                  handleNavClick('showroom');
                }}
                className="text-error py-3 px-4 flex items-center gap-3 font-bold text-sm uppercase"
              >
                <LogOut className="w-5 h-5" /> Cerrar Sesión
              </button>
            </div>
          ) : (
            <button 
              onClick={() => handleNavClick('login')}
              className="border border-outline-variant py-3 px-4 rounded text-sm font-bold uppercase flex items-center gap-3 text-on-surface"
            >
              <LogIn className="w-5 h-5" /> Acceso Admin
            </button>
          )}
        </div>
      )}
    </header>
  );
}

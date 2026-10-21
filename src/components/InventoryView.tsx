import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  SlidersHorizontal, 
  Search, 
  ArrowRight, 
  Calendar, 
  Gauge, 
  Settings2, 
  Lock, 
  ChevronLeft, 
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { Vehicle } from '../types';

interface InventoryViewProps {
  vehicles: Vehicle[];
  onSelectVehicle: (vehicle: Vehicle) => void;
  setView: (view: 'showroom' | 'inventory' | 'admin' | 'add-vehicle' | 'login') => void;
}

export default function InventoryView({ vehicles, onSelectVehicle, setView }: InventoryViewProps) {
  // Filter States
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [searchModel, setSearchModel] = useState('');
  const [priceRange, setPriceRange] = useState(500000); // Max Slider
  const [selectedTransmission, setSelectedTransmission] = useState<'All' | 'Automatic' | 'Manual'>('All');
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('Newest First');
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Extract unique brands for dropdown list
  const brandsList = useMemo(() => {
    const brands = new Set(vehicles.map(v => v.brand));
    return ['All Brands', ...Array.from(brands)];
  }, [vehicles]);

  const handleFuelToggle = (type: string) => {
    setSelectedFuelTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSelectedBrand('All Brands');
    setSearchModel('');
    setPriceRange(500000);
    setSelectedTransmission('All');
    setSelectedFuelTypes([]);
    setSortBy('Newest First');
    setCurrentPage(1);
  };

  // Filter and Sort Vehicles
  const filteredAndSortedVehicles = useMemo(() => {
    let result = [...vehicles];

    // Brand filter
    if (selectedBrand !== 'All Brands') {
      result = result.filter(v => v.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

    // Model text search
    if (searchModel.trim() !== '') {
      const keyword = searchModel.toLowerCase();
      result = result.filter(v => 
        v.model.toLowerCase().includes(keyword) || 
        v.brand.toLowerCase().includes(keyword)
      );
    }

    // Price range slider (up to $500k+)
    if (priceRange < 500000) {
      result = result.filter(v => v.price <= priceRange);
    }

    // Transmission type
    if (selectedTransmission !== 'All') {
      result = result.filter(v => v.transmission === selectedTransmission);
    }

    // Fuel Type selection
    if (selectedFuelTypes.length > 0) {
      result = result.filter(v => selectedFuelTypes.includes(v.fuelType));
    }

    // Sorting
    if (sortBy === 'Newest First') {
      result.sort((a, b) => b.year - a.year);
    } else if (sortBy === 'Price: Low to High') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'Mileage: Low to High') {
      result.sort((a, b) => a.mileage - b.mileage);
    }

    return result;
  }, [vehicles, selectedBrand, searchModel, priceRange, selectedTransmission, selectedFuelTypes, sortBy]);

  // Pagination Math (6 items per page)
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredAndSortedVehicles.length / itemsPerPage) || 1;
  const paginatedVehicles = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedVehicles.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedVehicles, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row pt-20">
      
      {/* Sidebar Filters (Screenshot 2: Left Sticky Sidebar) */}
      <aside className="w-full md:w-[320px] md:shrink-0 bg-surface-container border-b md:border-b-0 md:border-r border-outline-variant p-6 space-y-8 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-on-surface flex items-center gap-2 uppercase tracking-wide">
              <SlidersHorizontal className="w-4 h-4 text-secondary" />
              Filtros
            </h2>
            <div className="flex items-center gap-4">
              <button 
                onClick={handleResetFilters}
                className="text-[10px] font-label-caps tracking-widest text-secondary hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Limpiar
              </button>
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="md:hidden text-xs font-bold font-label-caps tracking-widest text-on-surface-variant p-1 uppercase"
              >
                {showMobileFilters ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
          </div>

          <div className={`space-y-5 ${showMobileFilters ? 'block' : 'hidden md:block'}`}>
            {/* Brand/Make Select */}
            <div className="space-y-1.5">
              <label className="font-label-caps text-[9px] text-on-surface-variant uppercase tracking-widest block font-bold">Marca</label>
              <select 
                value={selectedBrand}
                onChange={(e) => { setSelectedBrand(e.target.value); setCurrentPage(1); }}
                className="w-full bg-surface border border-outline-variant rounded p-3 text-sm text-on-surface focus:ring-1 focus:ring-secondary outline-none transition-all"
              >
                {brandsList.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            {/* Model keyword search */}
            <div className="space-y-1.5">
              <label className="font-label-caps text-[9px] text-on-surface-variant uppercase tracking-widest block font-bold">Modelo / Palabra clave</label>
              <div className="relative">
                <Search className="w-4 h-4 text-on-surface-variant absolute left-3 top-3.5" />
                <input 
                  type="text"
                  value={searchModel}
                  onChange={(e) => { setSearchModel(e.target.value); setCurrentPage(1); }}
                  placeholder="Ej. GT3, Plaid, V8..."
                  className="w-full bg-surface border border-outline-variant rounded p-3 pl-9 text-sm text-on-surface focus:ring-1 focus:ring-secondary outline-none transition-all placeholder:text-outline-variant"
                />
              </div>
            </div>

            {/* Price Range range slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-label-caps text-[9px] text-on-surface-variant uppercase tracking-widest block font-bold">Rango de Precio</label>
                <span className="text-xs text-secondary font-bold font-sans">
                  {priceRange >= 500000 ? 'Cualquier precio' : `Max $${(priceRange / 1000).toFixed(0)}k`}
                </span>
              </div>
              <input 
                type="range"
                min={10000}
                max={500000}
                step={5000}
                value={priceRange}
                onChange={(e) => { setPriceRange(Number(e.target.value)); setCurrentPage(1); }}
                className="w-full h-1 bg-outline-variant rounded-lg appearance-none cursor-pointer accent-secondary focus:outline-none"
              />
              <div className="flex justify-between text-[10px] text-on-surface-variant font-medium font-sans">
                <span>$10,000</span>
                <span>$500,000+</span>
              </div>
            </div>

            {/* Transmission Buttons group */}
            <div className="space-y-2">
              <label className="font-label-caps text-[9px] text-on-surface-variant uppercase tracking-widest block font-bold">Transmisión</label>
              <div className="flex gap-2">
                {(['All', 'Automatic', 'Manual'] as const).map((trans) => (
                  <button
                    key={trans}
                    onClick={() => { setSelectedTransmission(trans); setCurrentPage(1); }}
                    className={`flex-1 py-2 text-[10px] font-label-caps tracking-widest rounded border transition-all cursor-pointer ${
                      selectedTransmission === trans
                        ? 'border-secondary bg-secondary/10 text-secondary font-bold'
                        : 'border-outline-variant text-on-surface-variant hover:border-secondary'
                    }`}
                  >
                    {trans === 'All' ? 'TODAS' : trans === 'Automatic' ? 'AUTOMÁTICA' : 'MANUAL'}
                  </button>
                ))}
              </div>
            </div>

            {/* Fuel checklist */}
            <div className="space-y-2">
              <label className="font-label-caps text-[9px] text-on-surface-variant uppercase tracking-widest block font-bold font-sans">Combustible</label>
              <div className="space-y-2.5">
                {['Petrol', 'Electric', 'Hybrid', 'Diesel'].map((fuel) => (
                  <label key={fuel} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox"
                      checked={selectedFuelTypes.includes(fuel)}
                      onChange={() => handleFuelToggle(fuel)}
                      className="w-4 h-4 rounded border-outline-variant bg-surface text-secondary focus:ring-secondary cursor-pointer"
                    />
                    <span className="text-xs text-on-surface group-hover:text-secondary transition-colors font-sans">
                      {fuel === 'Petrol' ? 'Gasolina / Bencina' : fuel === 'Electric' ? 'Eléctrico' : fuel === 'Hybrid' ? 'Híbrido' : 'Diésel'}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={handleResetFilters}
          className={`w-full mt-6 py-3 border border-outline-variant text-on-surface hover:bg-surface-container-high text-xs tracking-wider font-label-caps rounded transition-all cursor-pointer uppercase font-semibold font-display ${showMobileFilters ? 'block' : 'hidden md:block'}`}
        >
          Reiniciar Filtros
        </button>
      </aside>

      {/* Main Content Catalog Area */}
      <section className="flex-1 p-6 md:p-10 space-y-8 overflow-x-hidden">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-outline-variant pb-6">
            <div>
              <h1 className="font-display text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-white">
                INVENTARIO DISPONIBLE
              </h1>
              <p className="text-xs md:text-sm text-on-surface-variant mt-1">
                Exhibiendo {filteredAndSortedVehicles.length} obras de ingeniería de clase mundial.
              </p>
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-2 self-end text-xs font-semibold text-on-surface-variant font-sans">
              <span>Ordenar por:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none text-secondary focus:ring-0 font-bold outline-none cursor-pointer text-xs uppercase tracking-wider"
              >
                <option value="Newest First">Más Reciente</option>
                <option value="Price: Low to High">Precio: Menor a Mayor</option>
                <option value="Price: High to Low">Precio: Mayor a Menor</option>
                <option value="Mileage: Low to High">Menor Kilometraje</option>
              </select>
            </div>
          </div>

          {/* Catalog Vehicles Grid (Bento style card layouts) */}
          {paginatedVehicles.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-outline-variant rounded-xl bg-surface-container/30">
              <SlidersHorizontal className="w-12 h-12 text-on-surface-variant mx-auto mb-4 opacity-50" />
              <h3 className="font-display text-base font-bold text-on-surface">No se encontraron vehículos</h3>
              <p className="text-xs text-on-surface-variant mt-1 max-w-sm mx-auto">
                No hay automóviles que coincidan con los criterios de búsqueda establecidos. Intenta reducir los filtros aplicados.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-6 px-6 py-2 bg-secondary-container text-on-secondary-container rounded text-xs font-bold font-label-caps tracking-widest uppercase cursor-pointer hover:brightness-110"
              >
                Limpiar Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="wait">
                {paginatedVehicles.map((car) => (
                  <motion.div
                    key={car.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="bg-surface-container/70 backdrop-blur-md rounded-xl overflow-hidden border border-outline-variant/60 hover:border-secondary hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                    onClick={() => {
                      onSelectVehicle(car);
                      setView('showroom');
                    }}
                  >
                    {/* Vehicle Image Container */}
                    <div className="relative h-64 w-full bg-surface-container-highest overflow-hidden flex items-center justify-center p-3">
                      {/* Ambient soft glow backdrop */}
                      <img 
                        src={car.image} 
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover filter blur-xl opacity-25 scale-110 pointer-events-none"
                      />
                      <img 
                        src={car.image} 
                        alt={`${car.brand} ${car.model}`}
                        className="relative z-10 w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500 drop-shadow-md"
                      />
                      
                      {/* Photo count indicator */}
                      {car.gallery && car.gallery.length > 1 && (
                        <div className="absolute bottom-3 right-3 z-20 px-2 py-0.5 bg-black/70 backdrop-blur rounded text-[10px] font-sans font-medium text-white/90 border border-white/10 flex items-center gap-1">
                          <span>📷 {car.gallery.length} fotos</span>
                        </div>
                      )}

                      {/* Floating status label */}
                      <div className="absolute top-4 left-4 z-20 flex gap-2">
                        {car.year >= 2024 && (
                          <span className="px-2 py-1 bg-secondary text-on-secondary text-[9px] font-bold font-display uppercase tracking-widest rounded shadow">
                            NUEVO
                          </span>
                        )}
                        {car.status === 'Reserved' && (
                          <span className="px-2 py-1 bg-surface-container-high border border-outline-variant text-on-surface text-[9px] font-bold font-display uppercase tracking-widest rounded flex items-center gap-1 shadow">
                            <Lock className="w-2.5 h-2.5 text-secondary" /> RESERVADO
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-4 left-4 px-2 py-1 bg-background/80 backdrop-blur rounded text-[10px] font-bold font-display uppercase tracking-widest text-on-surface">
                        {car.category}
                      </div>
                    </div>

                    {/* Card Description Elements */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <h3 className="font-display text-base font-extrabold text-on-surface uppercase group-hover:text-secondary transition-colors line-clamp-1">
                            {car.model}
                          </h3>
                          <span className="font-sans text-sm font-bold text-secondary">
                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(car.price)}
                          </span>
                        </div>
                        <p className="text-xs text-on-surface-variant font-medium line-clamp-1">{car.brand} • {car.color}</p>
                      </div>

                      {/* Specification grid icons */}
                      <div className="grid grid-cols-3 gap-2 border-y border-outline-variant/60 py-3.5 my-2">
                        <div className="text-center space-y-0.5">
                          <Calendar className="w-4 h-4 text-outline mx-auto mb-1" />
                          <span className="font-sans text-[10px] font-semibold text-on-surface-variant block uppercase">Año</span>
                          <span className="font-sans text-[11px] font-bold text-on-surface">{car.year}</span>
                        </div>
                        <div className="text-center border-x border-outline-variant/60 space-y-0.5">
                          <Gauge className="w-4 h-4 text-outline mx-auto mb-1" />
                          <span className="font-sans text-[10px] font-semibold text-on-surface-variant block uppercase">Uso</span>
                          <span className="font-sans text-[11px] font-bold text-on-surface">
                            {car.mileage === 0 ? 'Nuevo' : `${car.mileage.toLocaleString()} mi`}
                          </span>
                        </div>
                        <div className="text-center space-y-0.5">
                          <Settings2 className="w-4 h-4 text-outline mx-auto mb-1" />
                          <span className="font-sans text-[10px] font-semibold text-on-surface-variant block uppercase">Caja</span>
                          <span className="font-sans text-[11px] font-bold text-on-surface line-clamp-1">{car.transmissionDetail}</span>
                        </div>
                      </div>

                      {/* Action trigger button */}
                      <button 
                        className="w-full py-3 bg-on-surface text-background font-label-caps text-[10px] tracking-widest font-bold rounded flex items-center justify-center gap-2 hover:bg-secondary hover:text-on-secondary transition-all cursor-pointer uppercase font-display"
                      >
                        Ver Ficha Técnica
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Pagination Controls (Screenshot 2: Pagination suite) */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2 md:gap-3">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-outline-variant rounded-lg text-on-surface-variant hover:border-secondary hover:text-secondary disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg font-bold text-xs md:text-sm cursor-pointer transition-all ${
                      currentPage === pageNum
                        ? 'bg-secondary text-on-secondary shadow-lg'
                        : 'border border-outline-variant text-on-surface-variant hover:border-secondary hover:text-secondary'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-outline-variant rounded-lg text-on-surface-variant hover:border-secondary hover:text-secondary disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}

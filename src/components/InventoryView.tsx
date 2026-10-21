import { useState, useMemo } from 'react';
import { Clock, 
  SlidersHorizontal, 
  Search, 
  ArrowRight, 
  Calendar, 
  Gauge, 
  Cog, 
  Fuel, 
  RotateCcw,
  MessageCircle,
  Car,
  Filter,
  Check,
  ChevronRight
} from 'lucide-react';
import { Vehicle } from '../types';

interface InventoryViewProps {
  vehicles: Vehicle[];
  onSelectVehicle: (vehicle: Vehicle) => void;
  setView: (view: 'showroom' | 'inventory' | 'admin' | 'add-vehicle' | 'login') => void;
}

export default function InventoryView({ vehicles, onSelectVehicle, setView }: InventoryViewProps) {
  // Filter States
  const [selectedBrand, setSelectedBrand] = useState('Todas');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [searchModel, setSearchModel] = useState('');
  const [priceMax, setPriceMax] = useState(35000);
  const [selectedTransmission, setSelectedTransmission] = useState<'All' | 'Automatic' | 'Manual'>('All');
  const [sortBy, setSortBy] = useState('newest');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Extract unique brands
  const brandsList = useMemo(() => {
    const visible = vehicles.filter(v => v.status !== 'Hidden');
    const brands = new Set(visible.map(v => v.brand));
    return ['Todas', ...Array.from(brands)];
  }, [vehicles]);

  // Extract unique categories
  const categoriesList = useMemo(() => {
    return ['Todas', 'Pick-up', 'Hatchback', 'Sedán', 'SUV'];
  }, []);

  const handleResetFilters = () => {
    setSelectedBrand('Todas');
    setSelectedCategory('Todas');
    setSearchModel('');
    setPriceMax(35000);
    setSelectedTransmission('All');
    setSortBy('newest');
  };

  // Filter and Sort Vehicles
  const filteredVehicles = useMemo(() => {
    return vehicles.filter(v => {
      // Exclude vehicles marked as Hidden/Disabled from the public catalog
      if (v.status === 'Hidden') return false;

      const matchBrand = selectedBrand === 'Todas' || v.brand === selectedBrand;
      const matchCategory = selectedCategory === 'Todas' || v.category.toLowerCase().includes(selectedCategory.toLowerCase());
      const matchSearch = searchModel === '' || 
        `${v.brand} ${v.model} ${v.year} ${v.category}`.toLowerCase().includes(searchModel.toLowerCase().trim());
      const matchPrice = v.price <= priceMax;
      const matchTrans = selectedTransmission === 'All' || v.transmission === selectedTransmission;

      return matchBrand && matchCategory && matchSearch && matchPrice && matchTrans;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'year-desc') return b.year - a.year;
      if (sortBy === 'km-asc') return a.mileage - b.mileage;
      return 0; // default newest on lot
    });
  }, [vehicles, selectedBrand, selectedCategory, searchModel, priceMax, selectedTransmission, sortBy]);

  const handleQuickWhatsApp = (v: Vehicle) => {
    const text = encodeURIComponent(
      `Hola Car Seller, me interesa el ${v.brand} ${v.model} año ${v.year} (US$ ${v.price.toLocaleString()}) que vi en el catálogo. ¿Sigue disponible?`
    );
    window.open(`https://wa.me/59892614225?text=${text}`, '_blank');
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen py-10 px-4 sm:px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Breadcrumb & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
              <button onClick={() => setView('showroom')} className="hover:text-brand-600 transition-colors">Inicio</button>
              <span>/</span>
              <span className="text-slate-800">Catálogo de Vehículos</span>
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900">
              Catálogo de Vehículos en Stock
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-semibold bg-white px-3 py-1.5 rounded-lg border border-slate-200">
              {filteredVehicles.length} de {vehicles.filter(v => v.status !== "Hidden").length} unidades en catálogo
            </span>

            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden bg-slate-900 text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer"
            >
              <Filter className="w-4 h-4" />
              Filtros
            </button>
          </div>
        </div>

        {/* Search & Sort Bar */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchModel}
              onChange={(e) => setSearchModel(e.target.value)}
              placeholder="Buscar por marca, modelo o palabra clave..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-800"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <span className="text-xs font-semibold text-slate-500 shrink-0">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="newest">Publicaciones recientes</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="year-desc">Año: Más nuevo primero</option>
              <option value="km-asc">Menor kilometraje</option>
            </select>
          </div>
        </div>

        {/* Main Grid: Sidebar Filters + Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Filters */}
          <aside className={`lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-6 ${
            showMobileFilters ? 'block' : 'hidden lg:block'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-display font-bold text-sm text-slate-900 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-brand-600" />
                Filtrar Resultados
              </span>
              <button
                onClick={handleResetFilters}
                className="text-xs text-brand-600 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Limpiar
              </button>
            </div>

            {/* Filter by Brand */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Marca</label>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                {brandsList.map(b => (
                  <button
                    key={b}
                    onClick={() => setSelectedBrand(b)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex justify-between items-center cursor-pointer ${
                      selectedBrand === b 
                        ? 'bg-red-50 text-brand-600 font-bold' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{b === 'Todas' ? 'Todas las marcas' : b}</span>
                    {selectedBrand === b && <Check className="w-3.5 h-3.5 text-brand-600" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter by Category */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Carrocería</label>
              <div className="space-y-1">
                {categoriesList.map(c => (
                  <button
                    key={c}
                    onClick={() => setSelectedCategory(c)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex justify-between items-center cursor-pointer ${
                      selectedCategory === c 
                        ? 'bg-red-50 text-brand-600 font-bold' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{c === 'Todas' ? 'Todos los tipos' : c}</span>
                    {selectedCategory === c && <Check className="w-3.5 h-3.5 text-brand-600" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter by Transmission */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Transmisión</label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'All', label: 'Todas' },
                  { id: 'Manual', label: 'Manual' },
                  { id: 'Automatic', label: 'Auto' }
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTransmission(t.id as any)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold border transition-colors cursor-pointer text-center ${
                      selectedTransmission === t.id 
                        ? 'bg-brand-600 text-white border-brand-600' 
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Max Slider */}
            <div>
              <div className="flex justify-between items-center mb-1 text-xs font-bold text-slate-700">
                <span>Precio Máximo</span>
                <span className="text-brand-600 font-display">US$ {priceMax.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={7000}
                max={30000}
                step={500}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-brand-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>US$ 7.000</span>
                <span>US$ 30.000+</span>
              </div>
            </div>

            {/* Assistance banner in sidebar */}
            <div className="bg-slate-900 text-white p-4 rounded-xl text-xs space-y-2">
              <strong className="block text-white font-bold">¿Buscás otro modelo?</strong>
              <p className="text-slate-300 leading-snug">
                Si no encontrás el auto que querés, te lo buscamos por encargo o te avisamos al ingresar.
              </p>
              <a
                href="https://wa.me/59892614225?text=Hola%20Car%20Seller,%20estoy%20buscando%20un%20veh%C3%ADculo%20espec%C3%ADfico"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-emerald-400 font-bold hover:underline pt-1"
              >
                Consultar por WhatsApp &rarr;
              </a>
            </div>
          </aside>

          {/* Vehicles Grid */}
          <div className="lg:col-span-9">
            {filteredVehicles.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm space-y-4">
                <Car className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="font-display font-bold text-lg text-slate-800">
                  No se encontraron vehículos con esos filtros
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Probá ajustando el rango de precio o seleccionando "Todas" en las marcas.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs py-2 px-4 rounded-lg transition-colors cursor-pointer"
                >
                  Restablecer Filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVehicles.map(v => (
                  <div
                    key={v.id}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                        <img
                          src={v.image}
                          alt={`${v.brand} ${v.model}`}
                          className={`w-full h-full object-cover transition-transform duration-300 ${
                            v.status === 'Sold' ? 'grayscale-[35%] group-hover:scale-100' : 'group-hover:scale-105'
                          }`}
                        />
                        <span className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase z-10">
                          Año {v.year}
                        </span>
                        
                        {/* Status Badges */}
                        {v.status === 'Sold' ? (
                          <span className="absolute top-2.5 right-2.5 bg-red-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-lg z-10 flex items-center gap-1 border border-white/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            Vendido
                          </span>
                        ) : v.status === 'Reserved' ? (
                          <span className="absolute top-2.5 right-2.5 bg-amber-500 text-slate-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-lg z-10 flex items-center gap-1 border border-white/20">
                            <Clock className="w-3 h-3 text-slate-950" />
                            Reservado
                          </span>
                        ) : (
                          <span className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
                            {v.mileage === 0 ? '0 KM' : `${v.mileage.toLocaleString()} km`}
                          </span>
                        )}

                        {/* Sold overlay watermark */}
                        {v.status === 'Sold' && (
                          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px] flex items-center justify-center pointer-events-none">
                            <span className="bg-red-600 text-white text-xs font-black uppercase px-4 py-1.5 rounded-full shadow-2xl tracking-wider border-2 border-white flex items-center gap-1.5 transform -rotate-3">
                              VENDIDO
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Info Body */}
                      <div className="p-4 space-y-2.5">
                        <div>
                          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                            {v.brand}
                          </span>
                          <h3 className="font-display font-bold text-base text-slate-900 leading-snug line-clamp-1 group-hover:text-brand-600 transition-colors">
                            {v.model}
                          </h3>
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
                            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Precio Contado</span>
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

                    {/* Actions */}
                    <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          onSelectVehicle(v);
                          setView('showroom');
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
                        WhatsApp
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

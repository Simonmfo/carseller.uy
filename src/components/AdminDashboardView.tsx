import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  TrendingUp, 
  Clock, 
  MessageSquare, 
  DollarSign, 
  Wrench, 
  Palette, 
  Calendar,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { Vehicle, Inquiry, ServiceAppointment } from '../types';

interface AdminDashboardViewProps {
  vehicles: Vehicle[];
  inquiries: Inquiry[];
  serviceAppointments: ServiceAppointment[];
  onDeleteVehicle: (id: string) => void;
  onChangeVehicleStatus: (id: string, status: Vehicle['status']) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  setView: (view: 'showroom' | 'inventory' | 'admin' | 'add-vehicle' | 'login') => void;
}

export default function AdminDashboardView({
  vehicles,
  inquiries,
  serviceAppointments,
  onDeleteVehicle,
  onChangeVehicleStatus,
  onSelectVehicle,
  setView
}: AdminDashboardViewProps) {
  const [statusFilter, setStatusFilter] = useState<'All' | Vehicle['status']>('All');

  // Math metrics for KPI Cards
  const metrics = useMemo(() => {
    const activeListingsCount = vehicles.filter(v => v.status === 'Active').length;
    const totalPortfolioValue = vehicles.reduce((sum, v) => sum + (v.status !== 'Sold' ? v.price : 0), 0);
    const avgDaysOnLot = vehicles.length 
      ? Math.round(vehicles.reduce((sum, v) => sum + v.daysOnLot, 0) / vehicles.length) 
      : 0;

    return {
      activeCount: activeListingsCount,
      totalCount: vehicles.length,
      value: totalPortfolioValue,
      avgDays: avgDaysOnLot,
      pendingInquiries: inquiries.filter(i => i.status === 'New').length
    };
  }, [vehicles, inquiries]);

  // Filter listings based on status button selector
  const filteredVehicles = useMemo(() => {
    if (statusFilter === 'All') return vehicles;
    return vehicles.filter(v => v.status === statusFilter);
  }, [vehicles, statusFilter]);

  // Lead Velocity Mock Data for custom SVG Bar Chart (Last 7 Days)
  const leadData = [
    { day: 'Lun', count: 12 },
    { day: 'Mar', count: 18 },
    { day: 'Mié', count: 24 },
    { day: 'Jue', count: 15 },
    { day: 'Vie', count: 32 },
    { day: 'Sáb', count: 45 },
    { day: 'Dom', count: 28 },
  ];

  const maxLeadCount = Math.max(...leadData.map(d => d.count));

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full pt-28 px-6 md:px-12 pb-16 space-y-8 max-w-7xl mx-auto"
    >
      {/* Top Welcome & Quick Action row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
            Panel de Administración
          </h1>
          <p className="text-xs md:text-sm text-on-surface-variant">
            Supervisa las métricas, gestiona el inventario de alta gama y atiende consultas de clientes.
          </p>
        </div>

        <button
          onClick={() => setView('add-vehicle')}
          className="bg-secondary-container text-on-secondary-container px-6 py-3 rounded font-bold font-label-caps text-xs tracking-wider uppercase hover:brightness-110 active:scale-95 duration-100 cursor-pointer flex items-center gap-2 font-display"
        >
          <Plus className="w-4 h-4" />
          Añadir Vehículo
        </button>
      </div>

      {/* KPI Cards Bento Grid (Screenshot 3: Top metrics) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Active Listings */}
        <div className="bg-surface-container p-6 rounded-xl border border-outline-variant flex justify-between items-start">
          <div className="space-y-2">
            <span className="font-label-caps text-[10px] text-on-surface-variant tracking-widest block uppercase font-bold">Autos Activos</span>
            <span className="font-display text-2xl font-extrabold text-on-surface">
              {metrics.activeCount} <span className="text-xs text-on-surface-variant font-medium">/ {metrics.totalCount} tot</span>
            </span>
            <span className="text-[10px] text-secondary font-semibold block">+1 esta semana</span>
          </div>
          <div className="p-3 rounded bg-secondary/10 text-secondary">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        {/* Portfolio Value */}
        <div className="bg-surface-container p-6 rounded-xl border border-outline-variant flex justify-between items-start">
          <div className="space-y-2">
            <span className="font-label-caps text-[10px] text-on-surface-variant tracking-widest block uppercase font-bold">Valor de Portafolio</span>
            <span className="font-display text-2xl font-extrabold text-on-surface">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(metrics.value)}
            </span>
            <span className="text-[10px] text-on-surface-variant block">Promedio ${(metrics.value / (metrics.activeCount || 1) / 1000).toFixed(0)}k / auto</span>
          </div>
          <div className="p-3 rounded bg-secondary/10 text-secondary">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        {/* Pending Inquiries */}
        <div className="bg-surface-container p-6 rounded-xl border border-outline-variant flex justify-between items-start">
          <div className="space-y-2">
            <span className="font-label-caps text-[10px] text-on-surface-variant tracking-widest block uppercase font-bold">Consultas Pendientes</span>
            <span className="font-display text-2xl font-extrabold text-on-surface">
              {metrics.pendingInquiries} <span className="text-xs text-on-surface-variant font-medium">Nuevas</span>
            </span>
            <span className="text-[10px] text-secondary font-semibold block">Tasa de resp: 94%</span>
          </div>
          <div className="p-3 rounded bg-secondary/10 text-secondary">
            <MessageSquare className="w-5 h-5" />
          </div>
        </div>

        {/* Days On Lot */}
        <div className="bg-surface-container p-6 rounded-xl border border-outline-variant flex justify-between items-start">
          <div className="space-y-2">
            <span className="font-label-caps text-[10px] text-on-surface-variant tracking-widest block uppercase font-bold">Estadía en Lote (Prom)</span>
            <span className="font-display text-2xl font-extrabold text-on-surface">
              {metrics.avgDays} <span className="text-xs text-on-surface-variant font-medium">Días</span>
            </span>
            <span className="text-[10px] text-on-surface-variant block">Rotación saludable de stock</span>
          </div>
          <div className="p-3 rounded bg-secondary/10 text-secondary">
            <Clock className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Main Row: Datatable with listings */}
      <div className="bg-surface-container rounded-xl border border-outline-variant p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-outline-variant pb-5">
          <div className="flex flex-wrap gap-2">
            {(['All', 'Active', 'Reserved', 'Sold'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 text-[10px] font-label-caps tracking-widest rounded-lg font-bold border transition-all cursor-pointer ${
                  statusFilter === status
                    ? 'border-secondary bg-secondary/10 text-secondary'
                    : 'border-outline-variant text-on-surface-variant hover:border-secondary'
                }`}
              >
                {status === 'All' ? 'TODOS' : status === 'Active' ? 'DISPONIBLES' : status === 'Reserved' ? 'RESERVADOS' : 'VENDIDOS'}
              </button>
            ))}
          </div>

          <p className="text-xs text-on-surface-variant font-medium">
            Listando <span className="text-on-surface font-bold">{filteredVehicles.length}</span> automóviles
          </p>
        </div>

        {/* Table representation */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-outline-variant/60 text-[10px] font-label-caps tracking-wider text-on-surface-variant font-bold">
                <th className="py-3 px-4">VEHÍCULO</th>
                <th className="py-3 px-4 text-right">PRECIO (USD)</th>
                <th className="py-3 px-4 text-center">ESTADO</th>
                <th className="py-3 px-4 text-center">DÍAS EN LOTE</th>
                <th className="py-3 px-4 text-center">NRO STOCK</th>
                <th className="py-3 px-4 text-center">ACCIONES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/40">
              <AnimatePresence mode="popLayout">
                {filteredVehicles.map((car) => (
                  <motion.tr 
                    key={car.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-surface-container-high/40 transition-colors group"
                  >
                    {/* Thumbnail & title */}
                    <td className="py-4 px-4 flex items-center gap-4">
                      <div className="w-16 h-10 rounded overflow-hidden bg-surface-container-highest shrink-0 border border-outline-variant">
                        <img src={car.image} alt={car.model} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span 
                          onClick={() => { onSelectVehicle(car); setView('showroom'); }}
                          className="font-display text-sm font-bold text-on-surface hover:text-secondary hover:underline cursor-pointer flex items-center gap-1.5 uppercase tracking-wide"
                        >
                          {car.model}
                          <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </span>
                        <span className="text-[11px] text-on-surface-variant block">{car.brand} • {car.year} • {car.category}</span>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-4 px-4 text-right font-sans font-semibold text-sm text-on-surface">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(car.price)}
                    </td>

                    {/* Status Pill Switcher */}
                    <td className="py-4 px-4 text-center">
                      <select
                        value={car.status}
                        onChange={(e) => onChangeVehicleStatus(car.id, e.target.value as Vehicle['status'])}
                        className={`mx-auto block text-[10px] font-bold font-display uppercase tracking-widest px-3 py-1.5 rounded-full border outline-none cursor-pointer transition-colors ${
                          car.status === 'Active'
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                            : car.status === 'Reserved'
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                            : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                        }`}
                      >
                        <option value="Active" className="bg-surface text-on-surface">Disponible</option>
                        <option value="Reserved" className="bg-surface text-on-surface">Reservado</option>
                        <option value="Sold" className="bg-surface text-on-surface">Vendido</option>
                      </select>
                    </td>

                    {/* Days On Lot */}
                    <td className="py-4 px-4 text-center font-sans text-sm text-on-surface-variant">
                      {car.daysOnLot} días
                    </td>

                    {/* Stock ID */}
                    <td className="py-4 px-4 text-center font-mono text-xs font-semibold text-on-surface">
                      {car.stockId}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-center">
                      <div className="flex justify-center gap-2.5">
                        <button
                          onClick={() => { onSelectVehicle(car); setView('showroom'); }}
                          title="Ver Ficha"
                          className="p-1.5 rounded border border-outline-variant text-on-surface-variant hover:text-on-surface hover:border-on-surface cursor-pointer"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`¿Estás seguro de que deseas eliminar el vehículo ${car.brand} ${car.model}?`)) {
                              onDeleteVehicle(car.id);
                            }
                          }}
                          title="Eliminar Auto"
                          className="p-1.5 rounded border border-outline-variant hover:border-red-500/50 hover:text-red-400 text-on-surface-variant cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Grid: Charts & Operations side-by-side */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Custom Lead Velocity Bar Chart (Screenshot 3: Bottom Left) */}
        <div className="lg:col-span-7 bg-surface-container rounded-xl border border-outline-variant p-6 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">Velocidad de Prospectos (Semanal)</h3>
              <p className="text-xs text-on-surface-variant">Volumen de solicitudes y cotizaciones registradas por día.</p>
            </div>
            <div className="flex items-center gap-1.5 text-secondary text-xs font-bold uppercase">
              <TrendingUp className="w-4 h-4" />
              +24% esta semana
            </div>
          </div>

          {/* SVG Custom Bar Chart representation */}
          <div className="h-60 flex flex-col justify-between pt-4">
            <div className="flex-1 flex items-end gap-3 md:gap-4 px-2">
              {leadData.map((d, index) => {
                const heightPercentage = `${(d.count / maxLeadCount) * 100}%`;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer h-full justify-end">
                    {/* Tooltip value */}
                    <span className="text-[10px] font-sans font-bold text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {d.count}
                    </span>
                    
                    {/* Colored bar */}
                    <div className="w-full relative rounded-t-sm overflow-hidden bg-outline-variant/30 h-full flex items-end">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: heightPercentage }}
                        transition={{ delay: index * 0.05, duration: 0.5 }}
                        className="w-full bg-gradient-to-t from-secondary-container to-secondary rounded-t-sm"
                      />
                    </div>
                    
                    <span className="font-sans text-[11px] font-semibold text-on-surface-variant group-hover:text-on-surface transition-colors mt-1">
                      {d.day}
                    </span>
                  </div>
                );
              })}
            </div>
            
            {/* Grid baseline */}
            <div className="border-t border-outline-variant/60 w-full mt-2" />
          </div>
        </div>

        {/* Upcoming Services panel (Screenshot 3: Bottom Right) */}
        <div className="lg:col-span-5 bg-surface-container rounded-xl border border-outline-variant p-6 space-y-6">
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">Servicios & Entregas Programadas</h3>
            <p className="text-xs text-on-surface-variant">Próximos mantenimientos técnicos premium y entregas VIP.</p>
          </div>

          <div className="space-y-4">
            {serviceAppointments.map((serv) => (
              <div 
                key={serv.id}
                className="flex items-center gap-4 p-4 rounded-lg bg-surface border border-outline-variant hover:border-secondary transition-all duration-300"
              >
                <div className="p-2.5 rounded bg-secondary/10 text-secondary">
                  {serv.icon === 'wrench' ? (
                    <Wrench className="w-4 h-4" />
                  ) : (
                    <Palette className="w-4 h-4" />
                  )}
                </div>

                <div className="flex-1">
                  <h4 className="font-display text-xs font-bold text-on-surface uppercase tracking-wide">
                    {serv.vehicleName}
                  </h4>
                  <p className="text-[11px] text-on-surface-variant font-medium mt-0.5">{serv.type}</p>
                </div>

                <div className="text-right">
                  <span className="font-sans text-[11px] font-bold text-secondary flex items-center gap-1 justify-end">
                    <Calendar className="w-3 h-3" />
                    {serv.dateTime.split(',')[0]}
                  </span>
                  <span className="text-[9px] text-on-surface-variant block mt-0.5">{serv.dateTime.split(',')[1] || ''}</span>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => alert('La agenda de servicios premium ha sido sincronizada con el calendario corporativo de Luxe Auto.')}
            className="w-full py-3 border border-outline-variant text-on-surface hover:bg-surface-container-high text-xs tracking-wider font-label-caps rounded transition-all cursor-pointer uppercase font-bold text-center block font-display"
          >
            Sincronizar Calendario
          </button>
        </div>

      </div>

    </motion.div>
  );
}

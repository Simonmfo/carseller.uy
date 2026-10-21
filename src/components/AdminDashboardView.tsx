import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  TrendingUp, 
  Clock, 
  MessageSquare, 
  DollarSign, 
  Car,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  AlertCircle
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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full bg-slate-50 min-h-screen py-10 px-4 sm:px-6 md:px-12 space-y-8 max-w-7xl mx-auto"
    >
      {/* Top Welcome & Quick Action row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-slate-200 gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900">
            Panel de Gestión de Car Seller
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Control de inventario, estado de publicación y consultas recibidas.
          </p>
        </div>

        <button
          onClick={() => setView('add-vehicle')}
          className="bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow transition-all cursor-pointer flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Publicar Nuevo Auto
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Active Listings */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Autos Activos</span>
            <span className="font-display text-2xl font-extrabold text-slate-900">
              {metrics.activeCount} <span className="text-xs text-slate-400 font-normal">/ {metrics.totalCount} total</span>
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold block">Publicados en catálogo</span>
          </div>
          <div className="p-3 rounded-xl bg-red-50 text-brand-600 border border-red-100">
            <Car className="w-5 h-5" />
          </div>
        </div>

        {/* Portfolio Value */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Valor de Stock</span>
            <span className="font-display text-2xl font-extrabold text-slate-900">
              US$ {metrics.value.toLocaleString()}
            </span>
            <span className="text-[11px] text-slate-500 block">
              Promedio US$ {Math.round(metrics.value / (metrics.activeCount || 1)).toLocaleString()} / auto
            </span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        {/* Pending Inquiries */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Consultas Web</span>
            <span className="font-display text-2xl font-extrabold text-slate-900">
              {metrics.pendingInquiries} <span className="text-xs text-slate-400 font-normal">Nuevas</span>
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold block">Respuestas al día</span>
          </div>
          <div className="p-3 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
            <MessageSquare className="w-5 h-5" />
          </div>
        </div>

        {/* Avg Days */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Rotación</span>
            <span className="font-display text-2xl font-extrabold text-slate-900">
              {metrics.avgDays} <span className="text-xs text-slate-400 font-normal">días prom.</span>
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold block">Buena rotación de stock</span>
          </div>
          <div className="p-3 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
            <Clock className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Vehicles Management Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="font-display font-bold text-base text-slate-900">
              Inventario de Vehículos
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Administrá los estados, visualizá la ficha o eliminá publicaciones.
            </p>
          </div>

          {/* Status Filters */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'All', label: 'Todos' },
              { id: 'Active', label: 'Disponible' },
              { id: 'Reserved', label: 'Reservado' },
              { id: 'Sold', label: 'Vendido' }
            ].map(st => (
              <button
                key={st.id}
                onClick={() => setStatusFilter(st.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer border ${
                  statusFilter === st.id 
                    ? 'bg-slate-900 text-white border-slate-900' 
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Vehículo</th>
                <th className="py-3.5 px-4">Año / KM</th>
                <th className="py-3.5 px-4">Precio</th>
                <th className="py-3.5 px-4">Estado</th>
                <th className="py-3.5 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredVehicles.map(v => (
                <tr key={v.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={v.image} 
                        alt="" 
                        className="w-12 h-9 rounded-lg object-cover border border-slate-200" 
                      />
                      <div>
                        <strong className="text-slate-900 font-bold block text-sm">{v.brand} {v.model}</strong>
                        <span className="text-slate-400 text-[11px]">{v.category} · {v.transmission}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-slate-700">
                    <span className="font-semibold block">{v.year}</span>
                    <span className="text-slate-400">{v.mileage === 0 ? '0 km' : `${v.mileage.toLocaleString()} km`}</span>
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-display font-extrabold text-sm text-slate-900">
                      US$ {v.price.toLocaleString()}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <select
                      value={v.status}
                      onChange={(e) => onChangeVehicleStatus(v.id, e.target.value as any)}
                      className={`text-xs font-bold py-1 px-2.5 rounded-lg border cursor-pointer focus:outline-none ${
                        v.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        v.status === 'Reserved' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      <option value="Active">Disponible</option>
                      <option value="Reserved">Reservado</option>
                      <option value="Sold">Vendido</option>
                    </select>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          onSelectVehicle(v);
                          setView('showroom');
                        }}
                        className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        title="Ver ficha en la web"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`¿Eliminar ${v.brand} ${v.model}?`)) {
                            onDeleteVehicle(v.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Eliminar vehículo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiries Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
        <h3 className="font-display font-bold text-base text-slate-900">
          Últimas Consultas de Clientes
        </h3>

        <div className="divide-y divide-slate-100">
          {inquiries.map(inq => (
            <div key={inq.id} className="py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <strong className="text-slate-900 font-bold text-xs">{inq.fullName}</strong>
                  <span className="text-[11px] text-slate-400">({inq.email})</span>
                  <span className="bg-red-50 text-brand-600 text-[10px] font-bold px-2 py-0.5 rounded">
                    {inq.vehicleName}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-snug">{inq.message}</p>
              </div>
              <span className="text-[11px] text-slate-400 shrink-0">{inq.date}</span>
            </div>
          ))}
        </div>
      </div>

    </motion.div>
  );
}

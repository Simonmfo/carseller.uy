import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Header from './components/Header';
import Footer from './components/Footer';
import ShowroomView from './components/ShowroomView';
import InventoryView from './components/InventoryView';
import AdminDashboardView from './components/AdminDashboardView';
import AddVehicleView from './components/AddVehicleView';
import LoginView from './components/LoginView';

import { Vehicle, Inquiry, ServiceAppointment } from './types';
import { INITIAL_VEHICLES, DEFAULT_INQUIRIES, UPCOMING_SERVICES } from './data';
import { supabase } from './lib/supabase';

export default function App() {
  // Global State Engine
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(INITIAL_VEHICLES[0]);
  const [inquiries, setInquiries] = useState<Inquiry[]>(DEFAULT_INQUIRIES);
  const [serviceAppointments, setServiceAppointments] = useState<ServiceAppointment[]>(UPCOMING_SERVICES);
  
  // Navigation Routing States
  const [currentView, setCurrentView] = useState<'showroom' | 'inventory' | 'admin' | 'add-vehicle' | 'login'>('showroom');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Sync state with Supabase cloud database
  useEffect(() => {
    async function fetchSupabaseData() {
      try {
        const { data: dbVehicles, error: vError } = await supabase
          .from('vehicles')
          .select('*')
          .order('created_at', { ascending: false });

        if (!vError && dbVehicles && dbVehicles.length > 0) {
          setVehicles(dbVehicles as Vehicle[]);
          setSelectedVehicle(dbVehicles[0] as Vehicle);
        }

        const { data: dbInquiries, error: iError } = await supabase
          .from('inquiries')
          .select('*')
          .order('created_at', { ascending: false });

        if (!iError && dbInquiries && dbInquiries.length > 0) {
          setInquiries(dbInquiries as Inquiry[]);
        }
      } catch (err) {
        console.warn('Supabase initial fetch fallback to local data:', err);
      }
    }

    fetchSupabaseData();
  }, []);

  // Operations handlers
  const handleSelectVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleAddVehicle = async (newVehicle: Vehicle) => {
    setVehicles(prev => [newVehicle, ...prev]);
    setSelectedVehicle(newVehicle);
    try {
      await supabase.from('vehicles').insert([newVehicle]);
    } catch (e) {
      console.error('Error inserting vehicle into Supabase:', e);
    }
  };

  const handleDeleteVehicle = async (id: string) => {
    setVehicles(prev => {
      const updated = prev.filter(v => v.id !== id);
      if (selectedVehicle.id === id && updated.length > 0) {
        setSelectedVehicle(updated[0]);
      }
      return updated;
    });
    try {
      await supabase.from('vehicles').delete().eq('id', id);
    } catch (e) {
      console.error('Error deleting vehicle from Supabase:', e);
    }
  };

  const handleChangeVehicleStatus = async (id: string, status: Vehicle['status']) => {
    setVehicles(prev => prev.map(v => v.id === id ? { ...v, status } : v));
    if (selectedVehicle.id === id) {
      setSelectedVehicle(prev => ({ ...prev, status }));
    }
    try {
      await supabase.from('vehicles').update({ status }).eq('id', id);
    } catch (e) {
      console.error('Error updating vehicle status in Supabase:', e);
    }
  };

  const handleAddInquiry = async (newInquiry: Inquiry) => {
    setInquiries(prev => [newInquiry, ...prev]);
    try {
      await supabase.from('inquiries').insert([newInquiry]);
    } catch (e) {
      console.error('Error saving inquiry into Supabase:', e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-brand-600 selection:text-white font-sans overflow-x-hidden antialiased">
      
      {/* Universal Top Header */}
      <Header 
        currentView={currentView} 
        setView={setCurrentView} 
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        totalVehicles={vehicles.length}
      />

      {/* Interactive Main Workspace Content Area */}
      <main className="flex-grow w-full">
        <AnimatePresence mode="wait">
          {currentView === 'showroom' && (
            <motion.div 
              key="showroom"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ShowroomView 
                vehicle={selectedVehicle}
                allVehicles={vehicles}
                onSelectVehicle={handleSelectVehicle}
                onAddInquiry={handleAddInquiry}
                setView={setCurrentView}
              />
            </motion.div>
          )}

          {currentView === 'inventory' && (
            <motion.div 
              key="inventory"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <InventoryView 
                vehicles={vehicles}
                onSelectVehicle={handleSelectVehicle}
                setView={setCurrentView}
              />
            </motion.div>
          )}

          {currentView === 'admin' && isAuthenticated && (
            <motion.div 
              key="admin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <AdminDashboardView 
                vehicles={vehicles}
                inquiries={inquiries}
                serviceAppointments={serviceAppointments}
                onDeleteVehicle={handleDeleteVehicle}
                onChangeVehicleStatus={handleChangeVehicleStatus}
                onSelectVehicle={handleSelectVehicle}
                setView={setCurrentView}
              />
            </motion.div>
          )}

          {currentView === 'add-vehicle' && isAuthenticated && (
            <motion.div 
              key="add-vehicle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <AddVehicleView 
                onAddVehicle={handleAddVehicle}
                setView={setCurrentView}
              />
            </motion.div>
          )}

          {currentView === 'login' && !isAuthenticated && (
            <motion.div 
              key="login"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <LoginView
                onLogin={() => {
                  setIsAuthenticated(true);
                  setCurrentView('admin');
                }}
                setView={setCurrentView}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Universal Footer */}
      <Footer setView={setCurrentView} />

    </div>
  );
}

import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Footer from './components/Footer';
import ShowroomView from './components/ShowroomView';
import InventoryView from './components/InventoryView';
import AdminDashboardView from './components/AdminDashboardView';
import AddVehicleView from './components/AddVehicleView';
import LoginView from './components/LoginView';

import { Vehicle, Inquiry, ServiceAppointment } from './types';
import { INITIAL_VEHICLES, DEFAULT_INQUIRIES, UPCOMING_SERVICES } from './data';

export default function App() {
  // Global State Engine
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(INITIAL_VEHICLES[0]);
  const [inquiries, setInquiries] = useState<Inquiry[]>(DEFAULT_INQUIRIES);
  const [serviceAppointments, setServiceAppointments] = useState<ServiceAppointment[]>(UPCOMING_SERVICES);
  
  // Navigation Routing States
  const [currentView, setCurrentView] = useState<'showroom' | 'inventory' | 'admin' | 'add-vehicle' | 'login'>('showroom');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Operations handlers
  const handleSelectVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleAddVehicle = (newVehicle: Vehicle) => {
    setVehicles(prev => [newVehicle, ...prev]);
    setSelectedVehicle(newVehicle);
  };

  const handleDeleteVehicle = (id: string) => {
    setVehicles(prev => {
      const updated = prev.filter(v => v.id !== id);
      if (selectedVehicle.id === id && updated.length > 0) {
        setSelectedVehicle(updated[0]);
      }
      return updated;
    });
  };

  const handleChangeVehicleStatus = (id: string, status: Vehicle['status']) => {
    setVehicles(prev => prev.map(v => v.id === id ? { ...v, status } : v));
    if (selectedVehicle.id === id) {
      setSelectedVehicle(prev => ({ ...prev, status }));
    }
  };

  const handleAddInquiry = (newInquiry: Inquiry) => {
    setInquiries(prev => [newInquiry, ...prev]);
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
            <ShowroomView 
              key="showroom"
              vehicle={selectedVehicle}
              allVehicles={vehicles}
              onSelectVehicle={handleSelectVehicle}
              onAddInquiry={handleAddInquiry}
              setView={setCurrentView}
            />
          )}

          {currentView === 'inventory' && (
            <InventoryView 
              key="inventory"
              vehicles={vehicles}
              onSelectVehicle={handleSelectVehicle}
              setView={setCurrentView}
            />
          )}

          {currentView === 'admin' && isAuthenticated && (
            <AdminDashboardView 
              key="admin"
              vehicles={vehicles}
              inquiries={inquiries}
              serviceAppointments={serviceAppointments}
              onDeleteVehicle={handleDeleteVehicle}
              onChangeVehicleStatus={handleChangeVehicleStatus}
              onSelectVehicle={handleSelectVehicle}
              setView={setCurrentView}
            />
          )}

          {currentView === 'add-vehicle' && isAuthenticated && (
            <AddVehicleView 
              key="add-vehicle"
              onAddVehicle={handleAddVehicle}
              setView={setCurrentView}
            />
          )}

          {currentView === 'login' && !isAuthenticated && (
            <LoginView
              key="login"
              onLogin={() => {
                setIsAuthenticated(true);
                setCurrentView('admin');
              }}
              setView={setCurrentView}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Universal Footer */}
      <Footer setView={setCurrentView} />

    </div>
  );
}

import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Lock, User, ArrowRight } from 'lucide-react';

interface LoginViewProps {
  onLogin: () => void;
  setView: (view: 'showroom' | 'inventory' | 'admin' | 'add-vehicle' | 'login') => void;
}

export default function LoginView({ onLogin, setView }: LoginViewProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simple mock authentication
    if (username === 'admin' && password === 'admin') {
      onLogin();
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-[80vh] flex items-center justify-center px-4"
    >
      <div className="w-full max-w-md bg-surface border border-outline-variant rounded-xl p-8 shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-secondary-container" />
        
        <h2 className="text-3xl font-display font-black text-on-surface mb-2 tracking-tight">
          ACCESO <span className="text-secondary">PRIVADO</span>
        </h2>
        <p className="text-on-surface-variant text-sm mb-8">
          Ingrese sus credenciales para administrar la plataforma.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-label-caps tracking-widest text-on-surface-variant block">
              Usuario
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-background border border-outline-variant rounded p-3 pl-10 text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none"
                placeholder="admin"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-label-caps tracking-widest text-on-surface-variant block">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-background border border-outline-variant rounded p-3 pl-10 text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none"
                placeholder="admin"
              />
            </div>
          </div>

          {error && (
            <p className="text-error text-xs font-medium">{error}</p>
          )}

          <div className="pt-2 flex gap-4">
            <button
              type="button"
              onClick={() => setView('showroom')}
              className="flex-1 px-4 py-3 border border-outline-variant rounded text-on-surface-variant hover:text-on-surface transition-colors text-sm font-bold tracking-wide uppercase"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-secondary text-background hover:bg-secondary-container px-4 py-3 rounded transition-colors text-sm font-bold tracking-wide uppercase flex items-center justify-center gap-2 group"
            >
              Entrar
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

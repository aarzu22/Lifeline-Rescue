import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Button } from './ui/Shared';
import { Menu, X, Bell, MapPin, LifeBuoy } from 'lucide-react';
import { useState } from 'react';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-forest-600 p-1.5 rounded-lg">
                <LifeBuoy className="text-white w-6 h-6" />
              </div>
              <span className="font-bold text-xl tracking-tight text-forest-900 hidden sm:block">LifeLine Rescue</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link to="/map" className="text-slate-600 hover:text-forest-600 font-medium text-sm">Rescue Map</Link>
              <Link to="/animals" className="text-slate-600 hover:text-forest-600 font-medium text-sm">Animals</Link>
              <Link to="/stories" className="text-slate-600 hover:text-forest-600 font-medium text-sm">Success Stories</Link>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full border-2 border-white"></span>
                </button>
                <Link to="/dashboard" className="flex items-center gap-2 pl-2 border-l border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-forest-100 flex items-center justify-center text-forest-700 font-bold text-xs uppercase">
                    {user?.fullName.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-slate-700">{user?.fullName.split(' ')[0]}</span>
                </Link>
                <Button variant="secondary" onClick={logout} className="text-xs py-1.5">Sign Out</Button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-forest-600">Login</Link>
                <Button onClick={() => navigate('/report-emergency')} className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4" /> Report Emergency
                </Button>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-600">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 py-4 px-4 space-y-4">
          <Link to="/map" className="block text-slate-600 font-medium">Rescue Map</Link>
          <Link to="/animals" className="block text-slate-600 font-medium">Animals</Link>
          <Link to="/stories" className="block text-slate-600 font-medium">Stories</Link>
          <hr />
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="block text-slate-600 font-medium">Dashboard</Link>
              <button onClick={logout} className="block text-rose-600 font-medium">Sign Out</button>
            </>
          ) : (
            <div className="space-y-2">
              <Link to="/login" className="block text-slate-600 font-medium">Login</Link>
              <Button onClick={() => navigate('/report-emergency')} className="w-full">Report Emergency</Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

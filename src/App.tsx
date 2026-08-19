import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { RescueMap } from './pages/RescueMap';
import { AnimalListing } from './pages/AnimalListing';
import { AnimalProfile } from './pages/AnimalProfile';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard';
import { ReportEmergency } from './pages/ReportEmergency';
import { useAuthStore } from './store/useAuthStore';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/map" element={<RescueMap />} />
            <Route path="/animals" element={<AnimalListing />} />
            <Route path="/animals/:id" element={<AnimalProfile />} />
            <Route path="/report-emergency" element={<ReportEmergency />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        <footer className="bg-white border-t border-slate-200 py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-xl font-bold text-forest-900 mb-4">LifeLine Rescue Network</h3>
                <p className="text-slate-500 max-w-sm mb-6">
                  Empowering communities to coordinate rescue operations and provide every animal with a path to recovery and adoption.
                </p>
                <div className="flex gap-4">
                  {/* Social icons placeholder */}
                  {[1, 2, 3, 4].map(i => <div key={i} className="w-8 h-8 rounded-full bg-slate-100"></div>)}
                </div>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-4">Network</h4>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li><a href="#" className="hover:text-forest-600">Rescue Centers</a></li>
                  <li><a href="#" className="hover:text-forest-600">Volunteer Map</a></li>
                  <li><a href="#" className="hover:text-forest-600">Foster Program</a></li>
                  <li><a href="#" className="hover:text-forest-600">Success Stories</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-4">Organization</h4>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li><a href="#" className="hover:text-forest-600">About Us</a></li>
                  <li><a href="#" className="hover:text-forest-600">Partners</a></li>
                  <li><a href="#" className="hover:text-forest-600">Legal & Privacy</a></li>
                  <li><a href="#" className="hover:text-forest-600">Contact</a></li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <div>© 2024 LifeLine Rescue Network. All rights reserved.</div>
              <div className="flex gap-6">
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
                <a href="#">Security</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}


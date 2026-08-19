import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Button, Card } from '../components/ui/Shared';
import { LifeBuoy, Shield, Users, Heart, School, Home } from 'lucide-react';
import { Role } from '../types';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('');

  const handleLogin = (role: Role) => {
    login(email || 'demo@lifeline.org', role);
    navigate('/dashboard');
  };

  const roles: { role: Role; label: string; icon: any; color: string; desc: string }[] = [
    { role: 'PUBLIC', label: 'Citizen Reporter', icon: LifeBuoy, color: 'text-sky-600', desc: 'Report animals in distress and track incidents.' },
    { role: 'RESCUER', label: 'Field Rescuer', icon: Shield, color: 'text-rose-600', desc: 'Respond to alerts and coordinate field rescues.' },
    { role: 'SHELTER', label: 'Shelter Operator', icon: School, color: 'text-forest-600', desc: 'Manage animal recovery and medical records.' },
    { role: 'FOSTER', label: 'Foster Volunteer', icon: Home, color: 'text-amber-600', desc: 'Provide temporary homes for recovering animals.' },
    { role: 'ADOPTER', label: 'Verified Adopter', icon: Heart, color: 'text-pink-600', desc: 'Find and apply for animal adoption.' },
    { role: 'ADMIN', label: 'System Admin', icon: Shield, color: 'text-slate-800', desc: 'Full platform oversight and verification.' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-forest-600 rounded-2xl mb-4">
            <LifeBuoy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Welcome to LifeLine</h1>
          <p className="text-slate-600">Choose your role to access the rescue network dashboard.</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 mb-8">
          <div className="mb-8">
            <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-forest-500 outline-none"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((item) => (
              <button
                key={item.role}
                onClick={() => handleLogin(item.role)}
                className="group p-6 rounded-2xl border-2 border-slate-100 hover:border-forest-500 hover:bg-forest-50 transition-all text-left flex flex-col items-start"
              >
                <div className={`${item.color} mb-4 p-2 bg-white rounded-lg group-hover:bg-transparent shadow-sm border border-slate-100`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 group-hover:text-forest-800 mb-1">{item.label}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </button>
            ))}
          </div>
        </div>
        
        <p className="text-center text-slate-400 text-sm">
          Secured by LifeLine Identity Verification System. 
          <a href="#" className="text-forest-600 font-bold ml-1 hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

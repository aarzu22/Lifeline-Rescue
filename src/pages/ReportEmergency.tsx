import { useState } from 'react';
import { Card, Button, StatusBadge } from '../components/ui/Shared';
import { Camera, MapPin, AlertCircle, Info, Send, CheckCircle2 } from 'lucide-react';
import { useRescueStore } from '../store/useRescueStore';
import { useNavigate } from 'react-router-dom';

export const ReportEmergency = () => {
  const { addCase } = useRescueStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    details: '',
    urgency: 'medium' as 'low' | 'medium' | 'high' | 'critical',
    location: 'Current Location',
  });

  const handleSubmit = () => {
    addCase({
      reporterId: 'guest',
      coordinates: [40.7128, -74.006], // Mock current location
      situationDetails: formData.details,
      images: ['https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800'],
      dangerLevel: formData.urgency,
    });
    setStep(3);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      {step < 3 && (
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Emergency Report</h1>
          <p className="text-slate-600">Please provide accurate information to help our rescue teams respond quickly.</p>
          
          <div className="flex gap-2 mt-6">
            <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-forest-600' : 'bg-slate-200'}`}></div>
            <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-forest-600' : 'bg-slate-200'}`}></div>
          </div>
        </div>
      )}

      {step === 1 && (
        <Card className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4">
          <div className="space-y-4">
            <label className="block text-sm font-bold text-slate-700">What happened? Describe the situation</label>
            <textarea 
              className="w-full h-32 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-forest-500 outline-none resize-none"
              placeholder="e.g. Injured stray dog on 5th Avenue, seems to have a broken leg..."
              value={formData.details}
              onChange={(e) => setFormData({...formData, details: e.target.value})}
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-bold text-slate-700">How urgent is this?</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(['low', 'medium', 'high', 'critical'] as const).map(u => (
                <button
                  key={u}
                  onClick={() => setFormData({...formData, urgency: u})}
                  className={`py-3 rounded-xl text-sm font-bold capitalize transition-all border-2 ${
                    formData.urgency === u 
                    ? 'border-forest-600 bg-forest-50 text-forest-700 shadow-sm' 
                    : 'border-slate-100 text-slate-500 hover:border-slate-200'
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 bg-amber-50 rounded-2xl flex gap-3">
            <Info className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <p className="text-xs text-amber-800 leading-relaxed">
              Your safety is first. Do not approach the animal if it seems aggressive or if the situation is dangerous.
            </p>
          </div>

          <Button 
            disabled={!formData.details}
            onClick={() => setStep(2)} 
            className="w-full h-14 text-lg font-bold"
          >
            Next: Evidence & Location
          </Button>
        </Card>
      )}

      {step === 2 && (
        <Card className="p-8 space-y-8 animate-in fade-in slide-in-from-right-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-forest-400 hover:bg-forest-50 transition-all">
              <Camera className="w-8 h-8 text-slate-400" />
              <span className="text-sm font-bold text-slate-500">Add Photo</span>
            </div>
            <div className="aspect-square bg-slate-100 rounded-3xl relative overflow-hidden flex items-center justify-center">
               <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400" className="w-full h-full object-cover" alt="Preview" />
               <div className="absolute inset-0 bg-black/20"></div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-bold text-slate-700">Incident Location</label>
            <div className="flex gap-2">
              <div className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2 text-slate-600">
                <MapPin className="w-4 h-4" /> 
                <span className="text-sm font-medium">{formData.location}</span>
              </div>
              <Button variant="secondary">Change</Button>
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <Button variant="secondary" onClick={() => setStep(1)} className="flex-1 h-12">Back</Button>
            <Button onClick={handleSubmit} className="flex-[2] h-12 bg-rose-600 hover:bg-rose-700 flex items-center justify-center gap-2">
              <Send className="w-4 h-4" /> Submit Report
            </Button>
          </div>
        </Card>
      )}

      {step === 3 && (
        <Card className="p-12 text-center space-y-6 animate-in zoom-in-95 duration-500">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Report Received</h2>
          <p className="text-slate-600 leading-relaxed max-w-sm mx-auto">
            Thank you for being a hero! Our rescue teams have been alerted and will review the situation immediately.
          </p>
          <div className="pt-8 space-y-3">
            <Button onClick={() => navigate('/map')} className="w-full h-12">Track on Map</Button>
            <Button variant="secondary" onClick={() => navigate('/')} className="w-full h-12">Return Home</Button>
          </div>
          <div className="pt-4">
            <p className="text-xs text-slate-400">Reference ID: #RE-{Math.floor(100000 + Math.random() * 900000)}</p>
          </div>
        </Card>
      )}

      <div className="mt-8 flex items-center justify-center gap-8 text-slate-400">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Fast Response</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Secure Data</span>
        </div>
      </div>
    </div>
  );
};

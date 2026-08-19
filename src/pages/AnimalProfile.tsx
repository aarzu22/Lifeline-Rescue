import { useParams, useNavigate } from 'react-router-dom';
import { useRescueStore } from '../store/useRescueStore';
import { Card, Button, StatusBadge } from '../components/ui/Shared';
import { Heart, MapPin, Calendar, Activity, ChevronLeft, ShieldCheck, Share2, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export const AnimalProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { animals } = useRescueStore();
  const animal = animals.find(a => a.id === id);

  if (!animal) return <div className="p-20 text-center font-bold">Animal not found</div>;

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-600 font-bold hover:text-forest-600">
            <ChevronLeft className="w-5 h-5" /> Back to Search
          </button>
          <div className="flex gap-3">
            <button className="p-2 text-slate-400 hover:text-rose-500 transition-colors"><Heart className="w-5 h-5" /></button>
            <button className="p-2 text-slate-400 hover:text-forest-600 transition-colors"><Share2 className="w-5 h-5" /></button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="p-0 border-none shadow-xl">
              <div className="aspect-video relative">
                <img src={animal.photos[0]} className="w-full h-full object-cover" alt={animal.tagName} />
                <div className="absolute bottom-6 left-6">
                  <div className="flex items-center gap-3">
                    <h1 className="text-4xl font-bold text-white drop-shadow-lg">{animal.tagName}</h1>
                    <StatusBadge variant={animal.readyForAdoption ? 'success' : 'info'} className="bg-white/20 backdrop-blur-md text-white border-white/30 px-4 py-1.5 text-sm uppercase font-bold">
                      {animal.recoveryStatus.replace('_', ' ')}
                    </StatusBadge>
                  </div>
                </div>
              </div>
              <div className="p-8 grid sm:grid-cols-4 gap-6 border-b border-slate-100">
                {[
                  { label: 'Species', value: animal.species, icon: Activity },
                  { label: 'Breed', value: animal.breedGuess, icon: ShieldCheck },
                  { label: 'Age', value: animal.estimatedAge, icon: Calendar },
                  { label: 'Gender', value: animal.gender, icon: Heart },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
                      <stat.icon className="w-3 h-3" /> {stat.label}
                    </div>
                    <div className="font-bold text-slate-900 capitalize">{stat.value}</div>
                  </div>
                ))}
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Rescue Journey</h3>
                <p className="text-slate-600 leading-relaxed mb-8">
                  {animal.tagName} was found at <span className="font-bold">Manhattan South</span> after a community report. 
                  She was initially in {animal.healthCondition} condition but has shown incredible resilience throughout her treatment.
                </p>

                <h3 className="text-xl font-bold text-slate-900 mb-4">Medical Timeline</h3>
                <div className="space-y-6">
                  {animal.treatmentRecords.length > 0 ? animal.treatmentRecords.map((record, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-forest-500 rounded-full"></div>
                        <div className="flex-1 w-px bg-slate-200 my-1"></div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-400 uppercase">{new Date(record.date).toLocaleDateString()}</div>
                        <div className="font-bold text-slate-900">{record.description}</div>
                        <div className="text-sm text-slate-500">Performed by {record.veterinarian}</div>
                      </div>
                    </div>
                  )) : (
                    <div className="p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-center text-slate-400 font-medium">
                      Initial intake complete. Detailed medical logs will be added as treatment progresses.
                    </div>
                  )}
                </div>
              </div>
            </Card>

            <div className="grid sm:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Temperament</h3>
                <div className="flex flex-wrap gap-2">
                  {animal.temperamentNotes.map(note => (
                    <span key={note} className="px-4 py-2 bg-amber-50 text-amber-700 rounded-xl font-bold text-sm">
                      {note}
                    </span>
                  ))}
                </div>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Rescue Location</h3>
                <div className="flex items-center gap-3 text-slate-600 text-sm">
                  <MapPin className="w-5 h-5 text-forest-600" />
                  <span>Manhattan South, NYC</span>
                </div>
                <div className="mt-4 h-32 bg-slate-100 rounded-xl overflow-hidden relative">
                   <div className="absolute inset-0 flex items-center justify-center font-bold text-slate-300 text-xs">MAP PREVIEW</div>
                </div>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-8 border-none shadow-xl bg-forest-900 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to help {animal.tagName}?</h3>
              <p className="text-forest-200 text-sm mb-8 leading-relaxed">
                {animal.readyForAdoption 
                  ? "This animal is now ready for a forever home. Applications are being reviewed on a first-come basis."
                  : "Currently under medical care. You can apply to be a temporary foster home once stabilized."}
              </p>
              
              <div className="space-y-3">
                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold h-12">
                  Apply for {animal.readyForAdoption ? 'Adoption' : 'Foster'}
                </Button>
                <Button variant="secondary" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 h-12 flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4" /> Ask a Question
                </Button>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-forest-300 uppercase tracking-widest">Shelter Verified</div>
                  <div className="font-bold">Happy Paws Center</div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-slate-900 mb-4">Support her recovery</h3>
              <p className="text-sm text-slate-500 mb-6">Contribute directly to her medical bills and daily nutrition.</p>
              <div className="grid grid-cols-3 gap-2 mb-6">
                {['$10', '$25', '$50'].map(amt => (
                  <button key={amt} className="py-2 border border-slate-200 rounded-lg font-bold text-slate-600 hover:border-forest-500 hover:text-forest-600 transition-colors">
                    {amt}
                  </button>
                ))}
              </div>
              <Button variant="secondary" className="w-full">Custom Amount</Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

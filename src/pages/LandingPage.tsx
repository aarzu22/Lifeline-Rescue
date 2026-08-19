import { useNavigate } from 'react-router-dom';
import { Button, Card, StatusBadge } from '../components/ui/Shared';
import { Shield, Heart, MapPin, Users, Activity, ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRescueStore } from '../store/useRescueStore';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { cases, animals } = useRescueStore();

  const stats = [
    { label: 'Lives Saved', value: '1,284', icon: Heart, color: 'text-rose-500' },
    { label: 'Active Rescuers', value: '342', icon: Shield, color: 'text-sky-500' },
    { label: 'Rescue Centers', value: '56', icon: MapPin, color: 'text-forest-600' },
    { label: 'Foster Homes', value: '189', icon: Users, color: 'text-amber-500' },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1600&q=80" 
            className="w-full h-full object-cover brightness-[0.4]"
            alt="Hero"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-white max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <StatusBadge variant="success" className="mb-4 bg-emerald-500/20 text-emerald-100 border-emerald-500/30">
              Community-Driven Rescue Network
            </StatusBadge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Every Life Deserves <span className="text-amber-400">a Second Chance.</span>
            </h1>
            <p className="text-xl text-slate-200 mb-8 max-w-2xl leading-relaxed">
              Connect with rescuers, shelters, and foster volunteers in real-time to save animals in distress. Our mission is to build a safer world for every species.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => navigate('/report-emergency')}
                className="bg-rose-600 hover:bg-rose-700 h-14 px-8 text-lg"
              >
                Report Emergency Now
              </Button>
              <Button 
                onClick={() => navigate('/map')}
                variant="secondary"
                className="bg-white/10 border-white/20 text-white backdrop-blur hover:bg-white/20 h-14 px-8 text-lg"
              >
                View Rescue Map
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="p-6 text-center hover:shadow-md transition-shadow">
                <stat.icon className={`w-8 h-8 mx-auto mb-4 ${stat.color}`} />
                <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent Alerts */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Live Rescue Alerts</h2>
            <p className="text-slate-600">Immediate incidents requiring attention in your area.</p>
          </div>
          <Button variant="ghost" onClick={() => navigate('/map')} className="hidden sm:flex items-center gap-2">
            View All Alerts <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.slice(0, 3).map((item) => (
            <Card key={item.id} className="group cursor-pointer" onClick={() => navigate(`/cases/${item.id}`)}>
              <div className="aspect-video relative overflow-hidden">
                <img src={item.images[0]} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="Case" />
                <div className="absolute top-4 left-4">
                  <StatusBadge variant={item.dangerLevel === 'critical' || item.dangerLevel === 'high' ? 'error' : 'warning'}>
                    {item.dangerLevel.toUpperCase()} URGENCY
                  </StatusBadge>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>New York, NY</span>
                  <span>•</span>
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">{item.situationDetails}</h3>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-forest-600" />
                    <span className="text-sm font-semibold text-forest-600 uppercase">{item.status}</span>
                  </div>
                  <Button variant="secondary" className="text-xs">Details</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Ready for Adoption */}
      <section className="bg-forest-900 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4">Rehabilitated & Ready</h2>
            <p className="text-forest-200 text-lg">
              These brave souls have finished their medical treatment and are now looking for their forever homes or temporary foster care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {animals.filter(a => a.readyForAdoption).slice(0, 4).map((animal) => (
              <Card key={animal.id} className="bg-white/5 border-white/10 text-white">
                <div className="aspect-square relative overflow-hidden">
                  <img src={animal.photos[0]} className="w-full h-full object-cover" alt={animal.tagName} />
                  <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur rounded-full hover:bg-white/30 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-xl font-bold">{animal.tagName}</h3>
                    <span className="text-amber-400 font-bold">{animal.estimatedAge}</span>
                  </div>
                  <p className="text-forest-200 text-sm mb-4">{animal.breedGuess}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {animal.temperamentNotes.slice(0, 2).map(note => (
                      <span key={note} className="text-[10px] px-2 py-1 bg-forest-800 rounded-md border border-forest-700">
                        {note}
                      </span>
                    ))}
                  </div>
                  <Button onClick={() => navigate(`/animals/${animal.id}`)} className="w-full bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold">
                    Meet {animal.tagName}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="secondary" onClick={() => navigate('/animals')} className="bg-transparent border-white/30 text-white hover:bg-white/10">
              View All Rescued Animals
            </Button>
          </div>
        </div>
      </section>

      {/* Trust & Reviews */}
      <section className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Transparency & Trust at our Core</h2>
            <div className="space-y-6">
              {[
                { title: 'Verified Organizations', desc: 'All rescue centers and shelters undergo a rigorous identity and license verification process.' },
                { title: 'Trackable Impact', desc: 'Follow the journey of a rescued animal from the moment it is reported to the day it is adopted.' },
                { title: 'Community Reviews', desc: 'A multi-layered reputation system ensuring accountability for rescuers, fosters, and adopters.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="bg-amber-100 p-2 rounded-lg h-fit">
                    <Star className="w-6 h-6 text-amber-600" fill="currentColor" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    <p className="text-slate-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1594493012516-20e5ad3219e7?w=800&q=80" 
              className="rounded-3xl shadow-2xl"
              alt="Rescue team"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 max-w-xs">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-forest-100 rounded-full flex items-center justify-center font-bold text-forest-700">SR</div>
                <div>
                  <div className="font-bold">Sarah Roberts</div>
                  <div className="text-xs text-slate-500">Verified Rescuer</div>
                </div>
              </div>
              <p className="text-sm italic text-slate-600">
                "LifeLine has revolutionized how we coordinate our field operations. The real-time mapping is a game changer."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

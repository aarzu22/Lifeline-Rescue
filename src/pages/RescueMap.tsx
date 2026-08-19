import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useRescueStore } from '../store/useRescueStore';
import { Card, Button, StatusBadge } from '../components/ui/Shared';
import { AlertCircle, MapPin, Clock, Filter, Layers, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Use a simple data URI or CDN for marker icons to avoid build issues
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const RecenterButton = ({ coords }: { coords: [number, number] }) => {
  const map = useMap();
  return (
    <button 
      onClick={() => map.setView(coords, 14)}
      className="absolute bottom-6 right-6 z-[1000] bg-white p-3 rounded-full shadow-lg hover:bg-slate-50 border border-slate-200"
    >
      <Navigation className="w-5 h-5 text-forest-600" />
    </button>
  );
};

export const RescueMap = () => {
  const { cases } = useRescueStore();
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const filteredCases = filter === 'all' 
    ? cases 
    : cases.filter(c => c.dangerLevel === filter);

  const center: [number, number] = [40.7128, -74.006];

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar Controls */}
      <div className="w-full md:w-96 bg-white border-r border-slate-200 flex flex-col z-20">
        <div className="p-4 border-b border-slate-100 space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-slate-900">Rescue Alerts</h1>
            <Button variant="ghost" className="p-2"><Filter className="w-4 h-4" /></Button>
          </div>
          <div className="flex gap-2">
            {(['all', 'high', 'medium', 'low'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors ${
                  filter === f 
                  ? 'bg-forest-600 text-white' 
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredCases.map((c) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                layout
              >
                <Card 
                  className={`p-4 cursor-pointer border-2 transition-all ${selectedCase?.id === c.id ? 'border-forest-500 bg-forest-50' : 'border-transparent'}`}
                  onClick={() => setSelectedCase(c)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <StatusBadge variant={c.dangerLevel === 'critical' || c.dangerLevel === 'high' ? 'error' : 'warning'}>
                      {c.dangerLevel.toUpperCase()}
                    </StatusBadge>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">#{c.id}</span>
                  </div>
                  <p className="text-sm font-medium text-slate-800 line-clamp-2 mb-3">{c.situationDetails}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>Manhattan, NY</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        <div className="p-4 bg-slate-50 border-t border-slate-200">
          <Button className="w-full bg-rose-600 hover:bg-rose-700">
            Report New Incident
          </Button>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative bg-slate-100">
        <MapContainer center={center} zoom={13} zoomControl={false} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredCases.map(c => (
            <Marker 
              key={c.id} 
              position={c.coordinates}
              eventHandlers={{
                click: () => setSelectedCase(c)
              }}
            >
              <Popup>
                <div className="p-1">
                  <h4 className="font-bold text-sm mb-1">Rescue Alert</h4>
                  <p className="text-xs text-slate-600 line-clamp-2">{c.situationDetails}</p>
                </div>
              </Popup>
            </Marker>
          ))}
          <RecenterButton coords={selectedCase?.coordinates || center} />
        </MapContainer>

        {/* Selected Case Overlay */}
        <AnimatePresence>
          {selectedCase && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="absolute bottom-6 left-6 right-6 md:left-auto md:w-[400px] z-[1000]"
            >
              <Card className="p-0 shadow-2xl border-none overflow-hidden">
                <div className="aspect-video relative">
                  <img src={selectedCase.images[0]} className="w-full h-full object-cover" alt="Case" />
                  <button 
                    onClick={() => setSelectedCase(null)}
                    className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
                  >
                    <Layers className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex gap-2 mb-3">
                    <StatusBadge variant="info">{selectedCase.status.toUpperCase()}</StatusBadge>
                    <StatusBadge variant={selectedCase.dangerLevel === 'critical' ? 'error' : 'warning'}>
                      {selectedCase.dangerLevel.toUpperCase()} PRIORITY
                    </StatusBadge>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Situation Overview</h3>
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                    {selectedCase.situationDetails}
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <AlertCircle className="w-4 h-4" />
                      <span>Reported by Verified Citizen</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1">Respond to Case</Button>
                    <Button variant="secondary" className="px-3">
                      <Layers className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

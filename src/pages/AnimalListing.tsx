import { useState } from 'react';
import { useRescueStore } from '../store/useRescueStore';
import { Card, Button, StatusBadge } from '../components/ui/Shared';
import { Search, Filter, PawPrint, Heart, ChevronRight, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AnimalListing = () => {
  const { animals } = useRescueStore();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredAnimals = animals.filter(a => {
    const matchesSearch = a.tagName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          a.breedGuess.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || a.species === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Rescued Animals</h1>
          <p className="text-slate-600">Discover animals currently under care and those ready for their forever homes.</p>
        </div>
        <div className="flex w-full md:w-auto gap-4">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name or breed..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-forest-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="secondary" className="flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filters
          </Button>
        </div>
      </div>

      <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {['all', 'dog', 'cat', 'bird', 'other'].map(type => (
          <button
            key={type}
            onClick={() => setActiveFilter(type)}
            className={`px-6 py-2 rounded-full font-bold text-sm capitalize transition-all whitespace-nowrap ${
              activeFilter === type 
              ? 'bg-forest-600 text-white shadow-md' 
              : 'bg-white text-slate-600 border border-slate-200 hover:border-forest-300'
            }`}
          >
            {type}s
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredAnimals.map((animal) => (
          <Card key={animal.id} className="group hover:shadow-xl transition-all duration-300 border-none shadow-md overflow-hidden flex flex-col">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img 
                src={animal.photos[0]} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                alt={animal.tagName} 
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <StatusBadge variant={animal.readyForAdoption ? 'success' : 'info'}>
                  {animal.readyForAdoption ? 'Ready' : 'In Recovery'}
                </StatusBadge>
              </div>
              <button className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur rounded-full text-slate-400 hover:text-rose-500 transition-colors shadow-lg">
                <Heart className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-bold text-slate-900">{animal.tagName}</h3>
                <span className="text-sm font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-tighter">
                  {animal.gender}
                </span>
              </div>
              
              <p className="text-slate-500 font-medium mb-4 flex items-center gap-1.5">
                <PawPrint className="w-4 h-4" /> {animal.breedGuess}
              </p>

              <div className="space-y-3 mb-6 flex-1">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Age</span>
                  <span className="font-semibold">{animal.estimatedAge}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Health</span>
                  <StatusBadge variant={animal.healthCondition === 'healthy' ? 'success' : 'warning'} className="text-[10px]">
                    {animal.healthCondition}
                  </StatusBadge>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={() => navigate(`/animals/${animal.id}`)}
                  className="flex-1 bg-forest-600 hover:bg-forest-700"
                >
                  View Profile
                </Button>
                <Button variant="secondary" className="px-3">
                  <Info className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredAnimals.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
          <PawPrint className="w-16 h-16 text-slate-200 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-900 mb-2">No animals found</h3>
          <p className="text-slate-500">Try adjusting your search or filters to find more results.</p>
        </div>
      )}
    </div>
  );
};

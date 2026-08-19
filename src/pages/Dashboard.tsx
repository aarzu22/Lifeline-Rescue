import { useAuthStore } from '../store/useAuthStore';
import { useRescueStore } from '../store/useRescueStore';
import { Card, Button, StatusBadge } from '../components/ui/Shared';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Shield, Clock, CheckCircle, AlertTriangle, Users, Heart, MapPin, Search, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const { user } = useAuthStore();
  const { cases, animals } = useRescueStore();

  const mockStats = [
    { name: 'Jan', rescues: 45, success: 38 },
    { name: 'Feb', rescues: 52, success: 42 },
    { name: 'Mar', rescues: 38, success: 35 },
    { name: 'Apr', rescues: 65, success: 58 },
    { name: 'May', rescues: 48, success: 44 },
    { name: 'Jun', rescues: 70, success: 65 },
  ];

  const MetricTile = ({ title, value, sub, icon: Icon, color }: any) => (
    <Card className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
          <p className="text-xs text-slate-400 mt-2">{sub}</p>
        </div>
        <div className={`p-3 rounded-2xl ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user?.fullName}</h1>
            <StatusBadge variant="success">Verified {user?.role}</StatusBadge>
          </div>
          <p className="text-slate-600">Here's an overview of the LifeLine network activity today.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary">Download Report</Button>
          <Button>New Action</Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <MetricTile 
          title="Active Missions" 
          value={cases.filter(c => c.status !== 'closed').length} 
          sub="+2 since yesterday"
          icon={Shield} 
          color="bg-rose-500"
        />
        <MetricTile 
          title="Animals in Recovery" 
          value={animals.length} 
          sub="85% capacity reached"
          icon={Heart} 
          color="bg-forest-600"
        />
        <MetricTile 
          title="Average Response" 
          value="14m" 
          sub="-3m improvement"
          icon={Clock} 
          color="bg-sky-500"
        />
        <MetricTile 
          title="Volunteers Online" 
          value="124" 
          sub="Peak activity period"
          icon={Users} 
          color="bg-amber-500"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-10">
        {/* Charts */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-slate-900 font-display">Rescue Performance</h3>
            <div className="flex gap-2">
              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <span className="w-2 h-2 rounded-full bg-forest-600"></span> Rescues
              </span>
              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span> Success
              </span>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockStats}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} 
                />
                <Bar dataKey="rescues" fill="#386b4f" radius={[4, 4, 0, 0]} barSize={32} />
                <Bar dataKey="success" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Notifications */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Activities</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-4">
                <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${i % 2 === 0 ? 'bg-amber-50 text-amber-600' : 'bg-forest-50 text-forest-600'}`}>
                  {i % 2 === 0 ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">
                    {i % 2 === 0 ? 'High Urgency Alert' : 'Medical Record Updated'}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {i % 2 === 0 ? 'Stray dog spotted in Sector 7' : 'Luna finished her treatment'}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-wider">2h ago</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-6 text-sm text-forest-600 font-bold">View All Activities</Button>
        </Card>
      </div>

      {/* Role Specific Board */}
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900 font-display">Priority Rescue Cases</h3>
            <Link to="/map" className="text-sm text-forest-600 font-bold hover:underline">View Map</Link>
          </div>
          <div className="space-y-4">
            {cases.map((c) => (
              <div key={c.id} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-forest-200 transition-colors">
                <img src={c.images[0]} className="w-16 h-16 rounded-xl object-cover" alt="Case" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <StatusBadge variant={c.dangerLevel === 'critical' ? 'error' : 'warning'}>{c.dangerLevel}</StatusBadge>
                    <span className="text-xs text-slate-400">#{c.id}</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900 truncate">{c.situationDetails}</p>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Manhattan Core
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300" />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900 font-display">Recovery Status</h3>
            <Link to="/animals" className="text-sm text-forest-600 font-bold hover:underline">Manage All</Link>
          </div>
          <div className="space-y-4">
            {animals.map((a) => (
              <div key={a.id} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-amber-200 transition-colors">
                <img src={a.photos[0]} className="w-16 h-16 rounded-xl object-cover" alt="Animal" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-slate-900">{a.tagName}</h4>
                    <StatusBadge variant={a.recoveryStatus === 'ready_for_adoption' ? 'success' : 'info'}>{a.recoveryStatus.replace('_', ' ')}</StatusBadge>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">{a.breedGuess}</p>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-forest-600 h-full transition-all" 
                      style={{ width: a.readyForAdoption ? '100%' : '65%' }}
                    ></div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

import { create } from 'zustand';
import { RescueCase, RescueAnimal, CareRequest } from '../types';

interface RescueState {
  cases: RescueCase[];
  animals: RescueAnimal[];
  requests: CareRequest[];
  addCase: (newCase: Omit<RescueCase, 'id' | 'status' | 'timelineLogs' | 'createdAt'>) => void;
  updateCaseStatus: (caseId: string, status: RescueCase['status'], log: string) => void;
  addAnimal: (animal: Omit<RescueAnimal, 'id'>) => void;
  updateAnimal: (id: string, updates: Partial<RescueAnimal>) => void;
  submitCareRequest: (request: Omit<CareRequest, 'id' | 'status' | 'submittedAt'>) => void;
  updateRequestStatus: (requestId: string, status: CareRequest['status']) => void;
}

export const useRescueStore = create<RescueState>((set) => ({
  cases: [
    {
      id: 'c1',
      reporterId: 'u1',
      coordinates: [40.7128, -74.006],
      situationDetails: 'Injured dog spotted near central park entrance. Looks like a golden retriever.',
      images: ['https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=500&h=300&fit=crop'],
      dangerLevel: 'high',
      status: 'reported',
      timelineLogs: [{ id: 'l1', timestamp: new Date().toISOString(), action: 'Incident reported', performedBy: 'John Public' }],
      createdAt: new Date().toISOString(),
    },
    {
      id: 'c2',
      reporterId: 'u1',
      coordinates: [40.7306, -73.9352],
      situationDetails: 'Cat stuck on a high ledge, looks dehydrated.',
      images: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&h=300&fit=crop'],
      dangerLevel: 'medium',
      status: 'responding',
      timelineLogs: [
        { id: 'l2', timestamp: new Date().toISOString(), action: 'Incident reported', performedBy: 'John Public' },
        { id: 'l3', timestamp: new Date().toISOString(), action: 'Team dispatched', performedBy: 'System' }
      ],
      createdAt: new Date().toISOString(),
    }
  ],
  animals: [
    {
      id: 'a1',
      tagName: 'Luna',
      species: 'dog',
      breedGuess: 'Golden Retriever Mix',
      estimatedAge: '2 years',
      sizeClass: 'large',
      gender: 'female',
      healthCondition: 'stable',
      treatmentRecords: [
        { id: 't1', date: '2023-10-01', description: 'Initial checkup & wound cleaning', veterinarian: 'Dr. Smith' }
      ],
      photos: ['https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&fit=crop'],
      rescueLocation: [40.7128, -74.006],
      recoveryStatus: 'under_treatment',
      temperamentNotes: ['Friendly', 'Good with kids'],
      readyForAdoption: false,
    },
    {
      id: 'a2',
      tagName: 'Oliver',
      species: 'cat',
      breedGuess: 'Domestic Shorthair',
      estimatedAge: '6 months',
      sizeClass: 'small',
      gender: 'male',
      healthCondition: 'healthy',
      treatmentRecords: [],
      photos: ['https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800&fit=crop'],
      rescueLocation: [40.7306, -73.9352],
      recoveryStatus: 'ready_for_adoption',
      temperamentNotes: ['Playful', 'Shy at first'],
      readyForAdoption: true,
    }
  ],
  requests: [],
  addCase: (newCase) => set((state) => ({
    cases: [
      {
        ...newCase,
        id: Math.random().toString(36).substr(2, 9),
        status: 'reported',
        timelineLogs: [{ id: 'l' + Date.now(), timestamp: new Date().toISOString(), action: 'Case reported', performedBy: 'User' }],
        createdAt: new Date().toISOString(),
      },
      ...state.cases
    ]
  })),
  updateCaseStatus: (caseId, status, log) => set((state) => ({
    cases: state.cases.map(c => c.id === caseId ? {
      ...c,
      status,
      timelineLogs: [...c.timelineLogs, { id: 'l' + Date.now(), timestamp: new Date().toISOString(), action: log, performedBy: 'System' }]
    } : c)
  })),
  addAnimal: (animal) => set((state) => ({
    animals: [{ ...animal, id: Math.random().toString(36).substr(2, 9) }, ...state.animals]
  })),
  updateAnimal: (id, updates) => set((state) => ({
    animals: state.animals.map(a => a.id === id ? { ...a, ...updates } : a)
  })),
  submitCareRequest: (request) => set((state) => ({
    requests: [
      {
        ...request,
        id: Math.random().toString(36).substr(2, 9),
        status: 'pending',
        submittedAt: new Date().toISOString()
      },
      ...state.requests
    ]
  })),
  updateRequestStatus: (requestId, status) => set((state) => ({
    requests: state.requests.map(r => r.id === requestId ? { ...r, status } : r)
  }))
}));

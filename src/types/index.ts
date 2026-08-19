export type Role = 'PUBLIC' | 'RESCUER' | 'SHELTER' | 'FOSTER' | 'ADOPTER' | 'ADMIN';

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: Role;
  location?: [number, number];
  phone?: string;
  identityVerified: boolean;
  avatar?: string;
  bio?: string;
  organizationName?: string;
}

export interface RescueAnimal {
  id: string;
  tagName: string;
  species: 'dog' | 'cat' | 'bird' | 'other';
  breedGuess: string;
  estimatedAge: string;
  sizeClass: 'small' | 'medium' | 'large';
  gender: 'male' | 'female' | 'unknown';
  healthCondition: 'critical' | 'injured' | 'stable' | 'healthy';
  treatmentRecords: TreatmentRecord[];
  photos: string[];
  rescueLocation: [number, number];
  assignedShelterId?: string;
  recoveryStatus: 'rescued' | 'under_treatment' | 'rehabilitating' | 'ready_for_adoption' | 'adopted' | 'fostered';
  temperamentNotes: string[];
  readyForAdoption: boolean;
  assignedFosterId?: string;
}

export interface TreatmentRecord {
  id: string;
  date: string;
  description: string;
  veterinarian: string;
  medications?: string[];
}

export interface RescueCase {
  id: string;
  reporterId: string;
  coordinates: [number, number];
  situationDetails: string;
  images: string[];
  dangerLevel: 'low' | 'medium' | 'high' | 'critical';
  assignedTeamId?: string;
  status: 'reported' | 'responding' | 'arrived' | 'rescued' | 'closed';
  timelineLogs: TimelineLog[];
  createdAt: string;
}

export interface TimelineLog {
  id: string;
  timestamp: string;
  action: string;
  performedBy: string;
}

export interface CareRequest {
  id: string;
  applicantId: string;
  animalId: string;
  type: 'foster' | 'adoption';
  status: 'pending' | 'screening' | 'interview' | 'approved' | 'rejected';
  screeningAnswers: Record<string, any>;
  submittedAt: string;
}

export interface Donation {
  id: string;
  contributorId: string;
  amount: number;
  targetCenterId: string;
  usageType: 'medical' | 'food' | 'facility' | 'general';
  timestamp: string;
  receiptId: string;
}

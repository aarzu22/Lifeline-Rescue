import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Role } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, role: Role) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

// Mock initial users for development
const MOCK_USERS: Record<Role, User> = {
  PUBLIC: { id: 'u1', fullName: 'John Public', email: 'john@example.com', role: 'PUBLIC', identityVerified: false },
  RESCUER: { id: 'u2', fullName: 'Sarah Rescuer', email: 'sarah@rescue.org', role: 'RESCUER', identityVerified: true, organizationName: 'City Rescue' },
  SHELTER: { id: 'u3', fullName: 'Mike Shelter', email: 'mike@shelter.org', role: 'SHELTER', identityVerified: true, organizationName: 'Happy Paws Shelter' },
  FOSTER: { id: 'u4', fullName: 'Jane Foster', email: 'jane@foster.com', role: 'FOSTER', identityVerified: true },
  ADOPTER: { id: 'u5', fullName: 'Alice Adopter', email: 'alice@adopter.com', role: 'ADOPTER', identityVerified: true },
  ADMIN: { id: 'u6', fullName: 'Super Admin', email: 'admin@lifeline.org', role: 'ADMIN', identityVerified: true },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email, role) => {
        // Simple mock login
        const mockUser = { ...MOCK_USERS[role], email };
        set({ user: mockUser, isAuthenticated: true });
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      updateProfile: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null
      })),
    }),
    {
      name: 'lifeline-auth-storage',
    }
  )
);

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {User, UserRole} from "@/types/types.ts";

interface UserStore {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
    updateUser: (updates: Partial<User>) => void;
}

interface RoleStore {
    role: UserRole | null;
    setRole: (user: UserRole) => void;
    clearRole: () => void;
    updateRole: (updates: Partial<UserRole>) => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,

            setUser: (user: User) => set({ user }),
            clearUser: () => set({ user: null }),
            updateUser: (updates: Partial<User>) =>
                set((state) => ({
                    user: state.user ? { ...state.user, ...updates } : null
                })),
        }),
        {
            name: 'user-storage',
        }
    )
);

export const roleStore = create<RoleStore>()(
    persist(
        (set) => ({
            role: null,
            setRole: (role: UserRole) => set({ role }),
            clearRole: () => set({ role: null }),
            updateRole: (updates: Partial<UserRole>) =>
                set((state) => ({
                    role: state.role ? { ...state.role, ...updates } : null
                })),
        }),
        {
            name: 'user-storage',
        }
    )
);
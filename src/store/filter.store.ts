import { create } from 'zustand';

// Define the store state and actions types
interface DrawerState {
  isOpen: boolean;
  setOpenDrawer: (open: boolean) => void;
  setCloseDrawer: (open: boolean) => void;
}

// Create the Zustand store
export const useFilterStore = create<DrawerState>((set) => ({
  isOpen: false, // Initial state
  setOpenDrawer: () => set((state) => ({ isOpen: !state.isOpen })),
  setCloseDrawer: (open: boolean) => set({ isOpen: open }),
}));

import { create } from 'zustand';

interface StoreState {
  favorites: number[];
  addFavorite: (id: number) => void;
  deleteFavorite: (id: number) => void;
  resetFavorites: () => void;
  isFavorite: (id: number) => boolean;
}

const useFavoritesStore = create<StoreState>((set, get) => ({
  favorites: [],

  addFavorite: (id: number) =>
    set((state) => ({
      favorites: [...state.favorites, id],
    })),

  deleteFavorite: (id: number) =>
    set((state) => ({
      favorites: state.favorites.filter((favId) => favId !== id),
    })),

  resetFavorites: () => set({ favorites: [] }),

  isFavorite: (id: number) => get().favorites.includes(id),
}));

export default useFavoritesStore;

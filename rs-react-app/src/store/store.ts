import { create } from 'zustand';

interface FavoriteItem {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}
interface StoreState {
  favorites: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  deleteFavorite: (id: number) => void;
  resetFavorites: () => void;
  isFavorite: (id: number) => boolean;
}

const useFavoritesStore = create<StoreState>((set, get) => ({
  favorites: [],

  addFavorite: (item: FavoriteItem) => {
    const { favorites } = get();
    const alreadyExists = favorites.some((fav) => fav.id === item.id);
    if (alreadyExists) return;

    set({ favorites: [...favorites, item] });
  },

  deleteFavorite: (id: number) =>
    set((state) => ({
      favorites: state.favorites.filter((fav) => fav.id !== id),
    })),

  resetFavorites: () => set({ favorites: [] }),

  isFavorite: (id: number) => get().favorites.some((fav) => fav.id === id),
}));

export default useFavoritesStore;

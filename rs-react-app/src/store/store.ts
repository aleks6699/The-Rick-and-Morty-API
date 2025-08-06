import { create } from 'zustand';

export interface FavoriteItem {
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
  favorites: [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      image: 'https://example.com/image.jpg',
    },
    {
      id: 2,
      name: 'Morty Smith',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      image: 'https://example.com/image.jpg',
    },
  ],
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

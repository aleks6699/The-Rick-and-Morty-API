import useFavoritesStore from '../../store/store';
import type { Card } from '../../types/types';

export function FavoriteToggle(props: Readonly<Card>) {
  const isChecked = useFavoritesStore((state) => state.isFavorite(props.id));
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const deleteFavorite = useFavoritesStore((state) => state.deleteFavorite);

  const toggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (isChecked) {
      deleteFavorite(props.id);
    } else {
      addFavorite({ ...props });
    }
  };

  return (
    <label className="relative inline-block w-[1.7em] h-[1.7em]">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={toggle}
        className="absolute opacity-0 w-0 h-0 peer"
      />
      <div
        className={`
          w-full h-full rounded-full transition-all duration-200
          bg-white/70 peer-checked:bg-[linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)]
          flex items-center justify-center
          border border-white/80 shadow-md
        `}
      >
        <span
          className={`
            block w-[0.25em] h-[0.5em] border-white border-r-[0.15em] border-b-[0.15em]
            rotate-45 transition-opacity duration-200
            ${isChecked ? 'opacity-100' : 'opacity-0'}
          `}
        />
      </div>
    </label>
  );
}

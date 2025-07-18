import { Link, useLocation } from 'react-router';
import type { Card } from '../../types/types';
import { handleErorrImage } from '../../utils/handleErrorImage';
import { FavoriteToggle } from '../FavoriteToggle/FavoriteToggle';

export function CardItem(props: Readonly<Card>) {
  const locationUrl = useLocation();
  const searchParams = new URLSearchParams(locationUrl.search);
  const { image, name, species, status, location, gender, id } = props;

  searchParams.set('id', String(id));

  return (
    <li
      className="bg-gradient-to-br from-gray-800 to-gray-700 light:from-white light:to-gray-100 
    rounded-xl overflow-hidden shadow-lg border border-gray-700 light:border-gray-200 
    transition-all duration-300 hover:shadow-2xl animate-fadeIn group h-[400px] flex flex-col"
    >
      <div className="relative h-[250px] overflow-hidden shrink-0">
        <Link
          to={`/?${searchParams}`}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="block w-full h-full"
        >
          <img
            src={image}
            alt={name}
            loading="lazy"
            onError={handleErorrImage}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent light:from-white/70 light:to-transparent p-4">
            <h2 className="text-xl font-bold text-white light:text-gray-900 truncate">
              {name}
            </h2>
          </div>
        </Link>

        <div className="absolute top-4 right-4 z-5 cursor-pointer">
          <FavoriteToggle {...props} />
        </div>
      </div>

      <div className="p-4 space-y-2 flex-1 overflow-hidden">
        <p className="text-blue-300 light:text-blue-700 truncate">
          <span className="text-gray-400 light:text-gray-600">Species:</span>{' '}
          {species}
        </p>
        <p
          className={`${
            status === 'Alive'
              ? 'text-green-400 light:text-green-600'
              : 'text-red-400 light:text-red-600'
          } truncate`}
        >
          <span className="text-gray-400 light:text-gray-600">Status:</span>{' '}
          {status}
        </p>
        <p className="text-purple-300 light:text-purple-700 truncate">
          <span className="text-gray-400 light:text-gray-600">Gender:</span>{' '}
          {gender}
        </p>
        <p className="text-yellow-300 light:text-yellow-600 truncate">
          <span className="text-gray-400 light:text-gray-600">Location:</span>{' '}
          {location?.name}
        </p>
      </div>
    </li>
  );
}

import { Link, useLocation } from 'react-router';
import type { Card } from '../../types/types';
import { handleErorrImage } from '../../utils/handleErrorImage';

export function CardItem(props: Card) {
  const locationUrl = useLocation();
  const searchParams = new URLSearchParams(locationUrl.search);

  const { image, name, species, status, location, gender, id } = props;
  searchParams.set('id', String(id));

  const onClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <Link to={`/?${searchParams}`} className="pointer" onClick={onClick}>
      <li className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl overflow-hidden shadow-lg border border-gray-700 transition-all duration-300 hover:shadow-2xl animate-fadeIn group">
        <div className="relative h-70 overflow-hidden">
          <img
            src={image}
            alt={name}
            loading="lazy"
            onError={handleErorrImage}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h2 className="text-xl font-bold text-white">{name}</h2>
          </div>
        </div>
        <div className="p-4 space-y-2">
          <p className="text-blue-300">
            <span className="text-gray-400">Species:</span> {species}
          </p>
          <p className={status === 'Alive' ? 'text-green-400' : 'text-red-400'}>
            <span className="text-gray-400">Status:</span> {status}
          </p>
          <p className="text-purple-300">
            <span className="text-gray-400">Gender:</span> {gender}
          </p>
          <p className="text-yellow-300">
            <span className="text-gray-400">Location:</span> {location?.name}
          </p>
        </div>
      </li>
    </Link>
  );
}

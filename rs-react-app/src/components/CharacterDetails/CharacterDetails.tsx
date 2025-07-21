import { useSearchParams, useNavigate } from 'react-router';
import { handleErorrImage } from '../../utils/handleErrorImage';
import { useQuery } from '@tanstack/react-query';
import { rickAndMortyApi } from '../../api/RickAndMortyApi';

export function CharacterDetails() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const {
    data: character,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['character', id],
    queryFn: ({ signal }) =>
      rickAndMortyApi.fetchCharacterById(Number(id), signal),
  });

  function getStatusCharacter(status: string) {
    switch (status) {
      case 'Alive':
        return 'bg-green-500';
      case 'Dead':
        return 'bg-red-500';
      case 'unknown':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  }
  const handleClose = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('id');
    navigate(`/?${newSearchParams.toString()}`);
  };

  if (loading) {
    return (
      <div
        data-testid="loader"
        className="flex justify-center items-center h-full"
      >
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-red-50 to-white light:from-gray-500 light:to-gray-800 rounded-2xl shadow-xl p-4 relative h-full max-w-2xl mx-auto">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center bg-white light:bg-gray-700 rounded-full shadow-md text-gray-500 light:text-gray-300 hover:text-red-500 hover:bg-red-50 light:hover:bg-red-900 transition-all duration-300"
        >
          <span className="text-lg font-bold">×</span>
        </button>
        <h2 className="text-lg font-bold text-red-600 light:text-red-400 mb-2">
          Error
        </h2>
        <p className="text-sm text-gray-700 light:text-gray-300">
          {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="  bg-gradient-to-br from-blue-50 to-indigo-50 light:from-gray-800 light:to-gray-900 rounded-2xl shadow-2xl overflow-hidden h-full max-w-full md:max-w-4xl mx-auto relative animate-fadeInRight">
      <button
        onClick={handleClose}
        data-testid="close-button"
        className="  absolute top-3 right-3 z-20 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-white light:bg-gray-700 rounded-full shadow-md text-gray-500 light:text-gray-300 hover:text-red-500 hover:bg-red-50 light:hover:bg-red-900 transition-all duration-300"
      >
        <span className=" cursor-pointer text-lg font-bold translate-y-[-1.5px]">
          ×
        </span>
      </button>

      {character ? (
        <div className="flex flex-col h-full">
          <div className="relative w-full h-[300px] overflow-hidden">
            <img
              src={character.image}
              alt={character.name}
              className="absolute inset-0 w-full h-full object-cover object-center"
              onError={handleErorrImage}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent light:from-gray-900/90 light:to-transparent z-10" />
            <div className="absolute bottom-3 left-3 z-20">
              <div
                className={`flex items-center px-3 py-1.5 rounded-full text-white font-bold text-xs sm:text-sm ${getStatusCharacter(
                  character.status
                )} shadow-md`}
              >
                {character.status}
              </div>
              <h1 className="text-white mt-1 text-lg sm:text-xl md:text-2xl font-bold drop-shadow-lg">
                {character.name}
              </h1>
            </div>
          </div>

          <div className="p-3 sm:p-4 flex-grow bg-white light:bg-gray-800 overflow-y-auto max-h-[calc(100vh-350px)]">
            <div className="grid grid-cols-1 gap-2 sm:gap-3">
              <DetailCard title="Species" value={character.species} />
              <DetailCard title="Gender" value={character.gender} />
              <DetailCard title="Type" value={character.type || 'Unknown'} />
              <DetailCard title="Location" value={character.location?.name} />
              <DetailCard title="Origin" value={character.origin?.name} />

              <div className="bg-gray-50 light:bg-gray-700 rounded-lg p-2 sm:p-3 mt-1">
                <p className="text-xs sm:text-sm text-gray-700 light:text-gray-300">
                  <span className="font-medium">Created:</span>{' '}
                  {character.created
                    ? new Date(character.created).toLocaleDateString()
                    : 'Unknown'}
                </p>
              </div>

              {character.url && (
                <div className="mt-2">
                  <a
                    href={character.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full text-center bg-gray-400 light:bg-gray-600 hover:bg-gray-500 light:hover:bg-gray-500 text-gray-800 light:text-gray-200 font-medium py-1.5 px-4 rounded-lg transition-colors text-xs sm:text-sm"
                  >
                    View API details
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 text-center text-gray-500 light:text-gray-400 h-full flex items-center justify-center">
          <div>
            <p className="text-base sm:text-lg">No character data available</p>
            <button
              onClick={handleClose}
              className="mt-3 bg-blue-500 hover:bg-blue-600 light:bg-blue-600 light:hover:bg-blue-700 text-white py-1.5 px-5 rounded-full transition-colors text-xs sm:text-sm"
            >
              Go Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const DetailCard = ({
  title,
  value,
}: {
  title: string;
  value?: string | null;
}) => {
  if (!value) return null;

  return (
    <div className="bg-gradient-to-r from-white to-gray-50 light:from-gray-700 light:to-gray-600 rounded-lg p-2 sm:p-3 shadow-sm border border-gray-100 light:border-gray-600">
      <span className="text-xs font-medium text-gray-500 light:text-gray-400">
        {title}
      </span>
      <p className="text-sm font-semibold text-gray-800 light:text-gray-200 mt-0.5 break-words">
        {value}
      </p>
    </div>
  );
};

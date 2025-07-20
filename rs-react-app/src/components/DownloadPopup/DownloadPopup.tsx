import { createPortal } from 'react-dom';
import { Download, X } from 'lucide-react';
import { assertIsHTMLElement } from '../../utils/asserts/domAsserts';
import useFavoritesStore from '../../store/store';
import { convertToCSV } from '../../utils/convertCsv';
const portalElement = document.getElementById('download-portal');
assertIsHTMLElement(portalElement);

export const DownloadPopup = () => {
  const { favorites, resetFavorites } = useFavoritesStore();

  if (favorites.length === 0) return null;

  return createPortal(
    <div
      className="fixed bottom-22 left-0 right-0 bg-gray-900/30 light:bg-white/30 border-t-4 border-blue-400
        shadow-xl px-4 py-2 z-50 backdrop-blur-md"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-900 light:bg-blue-100 p-2 rounded-full">
            <Download className="w-5 h-5 text-blue-300 light:text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-100 light:text-gray-800 text-[clamp(0.9rem,2vw,1.125rem)]">
              Selected {favorites.length}{' '}
              {favorites.length === 1 ? 'item' : 'items'}
            </h3>
            <p className="text-[clamp(0.75rem,1.8vw,0.95rem)] text-gray-300 light:text-gray-600">
              Ready to download
            </p>
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={resetFavorites}
            className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 
              text-sm sm:text-base bg-gray-700 light:bg-gray-200 hover:bg-gray-600 light:hover:bg-gray-300 
              text-gray-200 light:text-gray-700 rounded-lg transition-colors duration-200"
          >
            <X className="w-4 h-4" />
            <span className="font-medium">Clear All</span>
          </button>

          <a
            href={convertToCSV(favorites)}
            download={`${favorites.length}_items.csv`}
            className="flex items-center space-x-1 sm:space-x-2 px-4 sm:px-6 py-1.5 sm:py-2 
              text-sm sm:text-base bg-blue-600 hover:bg-blue-500 light:bg-blue-500 light:hover:bg-blue-600 
              text-white light:text-white rounded-lg transition-colors duration-200 font-medium shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </a>
        </div>
      </div>
    </div>,
    portalElement
  );
};

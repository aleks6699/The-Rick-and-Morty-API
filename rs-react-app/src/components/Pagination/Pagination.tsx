import type { PaginationProps } from '../../types/types';

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 light:bg-gray-300 rounded-lg">
      <div className="text-sm text-gray-400 light:text-gray-600">
        Page {currentPage} of {totalPages}
      </div>

      <div className="flex gap-1">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={`
            px-3 py-1 rounded-md transition-colors
            ${
              currentPage === 1
                ? 'bg-gray-800 light:bg-gray-200 text-gray-500 light:text-gray-400 cursor-not-allowed'
                : 'bg-gray-700 light:bg-gray-100 text-gray-300 light:text-gray-700 hover:bg-gray-600 light:hover:bg-gray-200 cursor-pointer'
            }
          `}
          aria-label="First page"
        >
          «
        </button>

        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`
            px-3 py-1 rounded-md transition-colors
            ${
              currentPage === 1
                ? 'bg-gray-800 light:bg-gray-200 text-gray-500 light:text-gray-400 cursor-not-allowed'
                : 'bg-gray-700 light:bg-gray-100 text-gray-300 light:text-gray-700 hover:bg-gray-600 light:hover:bg-gray-200 cursor-pointer'
            }
          `}
          aria-label="Previous page"
        >
          ‹
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              px-3 py-1 rounded-md transition-colors
              ${
                currentPage === page
                  ? 'bg-blue-500 light:bg-blue-600 text-white cursor-default'
                  : 'bg-gray-700 light:bg-gray-100 text-gray-300 light:text-gray-700 hover:bg-gray-600 light:hover:bg-gray-200 cursor-pointer'
              }
            `}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`
            px-3 py-1 rounded-md transition-colors
            ${
              currentPage === totalPages
                ? 'bg-gray-800 light:bg-gray-200 text-gray-500 light:text-gray-400 cursor-not-allowed'
                : 'bg-gray-700 light:bg-gray-100 text-gray-300 light:text-gray-700 hover:bg-gray-600 light:hover:bg-gray-200 cursor-pointer'
            }
          `}
          aria-label="Next page"
        >
          ›
        </button>

        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`
            px-3 py-1 rounded-md transition-colors
            ${
              currentPage === totalPages
                ? 'bg-gray-800 light:bg-gray-200 text-gray-500 light:text-gray-400 cursor-not-allowed'
                : 'bg-gray-700 light:bg-gray-100 text-gray-300 light:text-gray-700 hover:bg-gray-600 light:hover:bg-gray-200 cursor-pointer'
            }
          `}
          aria-label="Last page"
        >
          »
        </button>
      </div>
    </div>
  );
};

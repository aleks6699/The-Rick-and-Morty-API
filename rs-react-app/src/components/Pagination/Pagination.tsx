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
    <div className="flex justify-between items-center">
      <div className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div>

      <div className="flex gap-1">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={`
            px-3 py-1 rounded-md
            ${
              currentPage === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 hover:bg-gray-200 cursor-pointer'
            }
            transition-colors
          `}
          aria-label="First page"
        >
          «
        </button>

        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`
            px-3 py-1 rounded-md
            ${
              currentPage === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 hover:bg-gray-200 cursor-pointer'
            }
            transition-colors
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
              px-3 py-1 rounded-md
              ${
                currentPage === page
                  ? 'bg-blue-500 text-white cursor-default'
                  : 'bg-gray-100 hover:bg-gray-200 cursor-pointer'
              }
              transition-colors
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
            px-3 py-1 rounded-md
            ${
              currentPage === totalPages
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 hover:bg-gray-200 cursor-pointer'
            }
            transition-colors
          `}
          aria-label="Next page"
        >
          ›
        </button>

        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`
            px-3 py-1 rounded-md
            ${
              currentPage === totalPages
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 hover:bg-gray-200 cursor-pointer'
            }
            transition-colors
          `}
          aria-label="Last page"
        >
          »
        </button>
      </div>
    </div>
  );
};

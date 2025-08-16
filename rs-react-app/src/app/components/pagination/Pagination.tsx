import { Link } from '@/i18n/navigation';
import { cn } from '@/utils/class-names';
import { useTranslations } from 'next-intl';

export function Pagination({
  currentPage,
  search,
  pagesAll,
}: Readonly<{
  currentPage: number;
  search: string;
  pagesAll?: number;
}>) {
  const t = useTranslations('pagination');
  const totalPages = pagesAll ?? 1;

  if (totalPages < 2) return null;

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

  const makeHref = (page: number) => ({
    pathname: `/`,
    query: { search, page },
  });

  const navButtons = [
    { label: '«', page: 1 },
    { label: '‹', page: Math.max(1, currentPage - 1) },
    ...pages.map((p) => ({ label: p.toString(), page: p })),
    { label: '›', page: Math.min(totalPages, currentPage + 1) },
    { label: '»', page: totalPages },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-700 shadow-lg border-t border-gray-200 py-3 z-10 light:bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="text-sm text-gray-400 light:text-gray-600">
          {t('page')} {currentPage} of {totalPages}
        </div>

        <div className="flex gap-1">
          {navButtons.map(({ label, page }) => {
            const isArrow = isNaN(Number(label));
            const isCurrent = page === currentPage && !isArrow;
            const isDisabled = page === currentPage && isArrow;

            return (
              <Link
                key={label + page}
                href={makeHref(page)}
                className={cn(
                  'px-3 py-1 rounded-md transition-colors',
                  isCurrent && 'bg-blue-500 text-white cursor-default',
                  isDisabled && 'bg-gray-800 text-gray-500 cursor-not-allowed',
                  !isCurrent &&
                    !isDisabled &&
                    'bg-gray-700 text-gray-300 hover:bg-gray-600'
                )}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

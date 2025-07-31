import { useQueryClient } from '@tanstack/react-query';
import { RefreshCw } from 'lucide-react';

type AllowedQueryKeys = ['characters', number, string] | ['character', number];

type RefreshButtonProps<TQueryKey extends AllowedQueryKeys> = {
  queryKey: TQueryKey;
  refetch: () => void;
  isFetching: boolean;
};

export function RefreshButton<TQueryKey extends AllowedQueryKeys>({
  queryKey,
  refetch,
  isFetching,
}: Readonly<RefreshButtonProps<TQueryKey>>) {
  const queryClient = useQueryClient();

  const handleInvalidateCache = async () => {
    await queryClient.invalidateQueries({ queryKey, exact: true });
    refetch();
  };

  return (
    <button
      onClick={handleInvalidateCache}
      disabled={isFetching}
      className="mb-2 flex  cursor-pointer items-center gap-2 px-4 py-2  bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200 font-medium min-w-[120px] justify-center"
      title="Refresh data and clear cache"
    >
      <RefreshCw
        className={`w-3 h-4 flex-shrink-0 ${isFetching ? 'animate-spin' : ''}`}
      />
      <span className="whitespace-nowrap">Refresh</span>
    </button>
  );
}

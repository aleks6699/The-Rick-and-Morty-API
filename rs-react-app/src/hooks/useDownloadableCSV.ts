import { useBlobUrl } from './useBlobUrl';
import { convertToCSVBlob } from '@/utils/convertToCSVBlob';
import type { FavoriteItem } from '@/store/store';

export function useDownloadableCSV(items: FavoriteItem[]) {
  const blob = items.length ? convertToCSVBlob(items) : null;

  const url = useBlobUrl(blob);

  return {
    url,
    fileName: `${items.length}_items.csv`,
    isReady: !!url,
  };
}

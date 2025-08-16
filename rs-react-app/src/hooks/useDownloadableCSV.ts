'use client';
import { useBlobUrl } from './useBlobUrl';
import { convertToCSVString } from '@/app/[locale]/actions';
import type { FavoriteItem } from '@/store/store';
import { useState, useEffect } from 'react';

export function useDownloadableCSV(items: FavoriteItem[]) {
  const [csvString, setCsvString] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!items.length) {
      setCsvString('');
      return;
    }

    setLoading(true);
    convertToCSVString(items)
      .then((str) => str !== null && setCsvString(str))
      .finally(() => setLoading(false));
  }, [items]);

  const blob = csvString
    ? new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
    : null;
  const url = useBlobUrl(blob);

  return {
    url,
    fileName: `${items.length}_items.csv`,
    isReady: !!url && !loading,
    loading,
  };
}

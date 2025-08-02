import { useEffect, useRef, useMemo } from 'react';

export function useBlobUrl(blob: Blob | null): string | null {
  const previousUrlRef = useRef<string | null>(null);

  const url = useMemo(() => {
    if (!blob) {
      if (previousUrlRef.current) {
        URL.revokeObjectURL(previousUrlRef.current);
        previousUrlRef.current = null;
      }
      return null;
    }

    if (previousUrlRef.current) {
      URL.revokeObjectURL(previousUrlRef.current);
    }

    const newUrl = URL.createObjectURL(blob);
    previousUrlRef.current = newUrl;
    return newUrl;
  }, [blob]);

  useEffect(() => {
    return () => {
      if (previousUrlRef.current) {
        URL.revokeObjectURL(previousUrlRef.current);
        previousUrlRef.current = null;
      }
    };
  }, []);

  return url;
}

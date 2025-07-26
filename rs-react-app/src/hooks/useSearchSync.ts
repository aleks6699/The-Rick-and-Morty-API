import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

export function useSearchSync() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get('search');
  const localSearch = localStorage.getItem('searchTerm') || '';

  const [value, setValue] = useState('');

  useEffect(() => {
    if (searchParam) {
      setValue(searchParam);
    } else if (localSearch) {
      setSearchParams({ search: localSearch });
      setValue(localSearch);
    }
  }, [searchParam, localSearch, setSearchParams]);

  return { value, setValue };
}

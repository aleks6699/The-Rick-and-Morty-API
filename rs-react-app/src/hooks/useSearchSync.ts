import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

export function useSearchSync() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchParam = searchParams.get('search');
  const localSearch = localStorage.getItem('searchTerm') || '';

  const initial = searchParam || localSearch;
  const [value, setValue] = useState(initial);

  useEffect(() => {
    if (searchParam !== null) {
      setValue(searchParam);
    } else if (localSearch) {
      setSearchParams({ search: localSearch, page: '1' });
      setValue(localSearch);
    }
  }, [searchParam, localSearch, setSearchParams]);

  return { value, setValue };
}

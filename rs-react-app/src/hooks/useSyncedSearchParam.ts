import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

export function useSyncedSearchParam() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchParam = searchParams.get('search');
  const localSearch = localStorage.getItem('searchTerm') || '';

  const initial = searchParam || localSearch;
  const [value, setValue] = useState(initial);

  function handleClick(value: string) {
    setSearchParams({ search: value, page: '1' });
    localStorage.setItem('searchTerm', value);
    setValue(value);
  }

  useEffect(() => {
    if (searchParam !== null) {
      setValue(searchParam);
    } else if (localSearch) {
      setSearchParams({ search: localSearch, page: '1' });
      setValue(localSearch);
    }
  }, [searchParam, localSearch, setSearchParams]);

  return { value, handleClick };
}

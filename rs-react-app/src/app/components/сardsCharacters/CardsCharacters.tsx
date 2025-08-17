'use client';
import { useState, useEffect } from 'react';
import { ResponseCharacter, Card } from '@/types/types';
import { CardItem } from '../cardItem/CardItem';
import { Loading } from '../loading/Loading';

export function CardsCharacters({
  charactersPromise,
}: Readonly<{
  charactersPromise: Promise<ResponseCharacter>;
}>) {
  const [data, setData] = useState<ResponseCharacter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await charactersPromise;
        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : 'Failed to load characters'
          );
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [charactersPromise]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <p className="text-red-400 text-center text-xl mb-8 animate-fadeIn">
        {error}
      </p>
    );
  }

  if (!data?.results?.length) {
    return (
      <p className="text-red-400 text-center text-xl mb-8 animate-fadeIn">
        Characters not found
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-7">
      {data.results.map((character: Card) => (
        <CardItem key={character.id} {...character} />
      ))}
    </ul>
  );
}

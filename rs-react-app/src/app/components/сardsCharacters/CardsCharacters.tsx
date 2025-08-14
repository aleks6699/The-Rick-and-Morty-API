import { ResponseCharacter, Card } from '@/types/types';
import { use } from 'react';
import { CardItem } from '../CardItem/CardItem';

export function CardsCharacters({
  charactersPromise,
}: Readonly<{
  charactersPromise: Promise<ResponseCharacter>;
}>) {
  const data = use(charactersPromise);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.results.map((character: Card) => (
        <CardItem key={character.id} {...character} />
      ))}
    </div>
  );
}

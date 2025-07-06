import { InputSearch } from '../InputSearch/InputSearch';
import { Button } from '../Button/Button';

export function Header({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}) {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const onClick = () => {
    setSearchTerm(searchTerm);
  };

  return (
    <header className="container flex flex-col mx-auto md:flex-row gap-4 mb-8">
      <InputSearch onChange={onChange} value={searchTerm} />
      <Button onClick={onClick} />
    </header>
  );
}

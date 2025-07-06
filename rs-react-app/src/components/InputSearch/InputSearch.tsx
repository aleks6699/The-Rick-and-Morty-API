export function InputSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type="text"
      className="bg-gray-700 text-white border-0 rounded-lg p-4 text-lg w-full focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder-gray-400 transition-all duration-300 shadow-lg"
      placeholder="Search character..."
      value={value}
      onChange={onChange}
    />
  );
}

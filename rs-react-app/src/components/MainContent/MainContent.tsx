import { CardItem, type Card } from '../CardItem/CardItem';
import { useCharactersQuery } from '../../hooks/useCharactersQuery';
import { Outlet } from 'react-router';

export type Cards = Card[];

export type MainContentState = {
  results: Cards;
  loading: boolean;
  error: string;
};
export function MainContent({ value }: { value: string }) {
  const { results, loading, error } = useCharactersQuery(value);

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {loading && (
        <div className="flex justify-center mb-8 animate-pulse">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {error && (
        <p className="text-red-400 text-center text-xl mb-8 animate-fadeIn">
          {error}
        </p>
      )}

      {!loading && !error && results.length === 0 && (
        <p className="text-gray-400 text-center text-xl mb-8 animate-fadeIn">
          {value
            ? 'No characters found'
            : 'Enter a search term to find characters'}
        </p>
      )}

      <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
        {results.map((item) => (
          <CardItem key={item.id} {...item} />
        ))}
      </ul>
      <Outlet />
    </main>
  );
}

// export class MainContent extends Component<{ searchTerm: string }> {
//   state: MainContentState = {
//     results: [],
//     loading: false,
//     error: '',
//   };

//   componentDidMount() {
//     this.fetchData(this.props.searchTerm, API_BASE_URL);
//   }

//   componentDidUpdate(prevProps: { searchTerm: string }) {
//     if (prevProps.searchTerm !== this.props.searchTerm) {
//       this.fetchData(this.props.searchTerm, API_BASE_URL);
//     }
//   }

//   fetchData = async (term: string, url: string) => {
//     this.setState({ loading: true, error: '', results: [] });

//     try {
//       const response = await fetch(`${url}?name=${term}&page=1`);

//       if (!response.ok) {
//         throw new Error('Character not found');
//       }

//       const data = await response.json();

//       if (data.error || !data.results) {
//         throw new Error('Character not found');
//       }

//       this.setState({ results: data.results });
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         this.setState({ error: error.message || 'Character not found' });
//       }
//     } finally {
//       this.setState({ loading: false });
//     }
//   };

//   render() {
//     const { results, loading, error } = this.state;

//     return (
//       <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {loading && (
//           <div className="flex justify-center mb-8 animate-pulse">
//             <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//           </div>
//         )}

//         {error && (
//           <p className="text-red-400 text-center text-xl mb-8 animate-fadeIn">
//             {error}
//           </p>
//         )}

//         {!loading && !error && results.length === 0 && (
//           <p className="text-gray-400 text-center text-xl mb-8 animate-fadeIn">
//             {this.props.searchTerm
//               ? 'No characters found'
//               : 'Enter a search term to find characters'}
//           </p>
//         )}

//         <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
//           {results.map((item) => (
//             <CardItem key={item.id} {...item} />
//           ))}
//         </ul>
//       </main>
//     );
//   }
// }

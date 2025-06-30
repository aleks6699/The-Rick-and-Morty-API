import { Component } from 'react';

export interface Card {
  id: number;
  name: string;
  species: string;
  status: string;
  gender: string;
  image: string;
  location: {
    name: string;
    url: string;
  };
}

export class CardItem extends Component<Card> {
  render() {
    const { image, name, species, status, gender, location } = this.props;

    return (
      <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl overflow-hidden shadow-lg border border-gray-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl animate-fadeIn">
        <div className="relative h-70 overflow-hidden group">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h2 className="text-xl font-bold text-white">{name}</h2>
          </div>
        </div>

        <div className="p-4 space-y-2">
          <p className="text-blue-300">
            <span className="text-gray-400">Species:</span> {species}
          </p>
          <p className={status === 'Alive' ? 'text-green-400' : 'text-red-400'}>
            <span className="text-gray-400">Status:</span> {status}
          </p>
          <p className="text-purple-300">
            <span className="text-gray-400">Gender:</span> {gender}
          </p>
          <p className="text-yellow-300">
            <span className="text-gray-400">Location:</span> {location.name}
          </p>
        </div>
      </div>
    );
  }
}

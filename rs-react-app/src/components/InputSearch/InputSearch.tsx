import { Component } from 'react';

export class InputSearch extends Component<{
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> {
  render() {
    return (
      <input
        type="text"
        className="bg-gray-700 text-white border-0 rounded-lg p-4 text-lg w-full focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder-gray-400 transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] shadow-lg"
        placeholder="Search character..."
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

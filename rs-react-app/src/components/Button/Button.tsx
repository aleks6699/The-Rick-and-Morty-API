import { Component } from 'react';

export class Button extends Component<{ onClick: () => void }> {
  render() {
    return (
      <button
        onClick={this.props.onClick}
        className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
      >
        Search
      </button>
    );
  }
}

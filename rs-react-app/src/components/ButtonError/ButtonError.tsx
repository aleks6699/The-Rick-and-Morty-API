import { Component } from 'react';

type ButtonErrorState = {
  forceError: boolean;
};

export class ButtonError extends Component<ButtonErrorState> {
  state = { forceError: false };

  handleClick = () => {
    this.setState({ forceError: true });
  };

  render() {
    if (this.state.forceError) {
      throw new Error('Simulated error triggered by ButtonError component');
    }
    return (
      <button
        onClick={this.handleClick}
        className="fixed bottom-4 right-4 bg-red-500 text-white p-3 rounded-full shadow-lg z-50"
        title="Simulate error"
      >
        💥
      </button>
    );
  }
}

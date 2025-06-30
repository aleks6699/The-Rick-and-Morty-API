import { Component } from 'react';
import { InputSearch } from '../InputSearch/InputSearch';
import { Button } from '../Button/Button';

export class Header extends Component<{
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}> {
  state = {
    inputValue: this.props.searchTerm,
  };

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: event.target.value });
  };

  onClick = () => {
    this.props.setSearchTerm(this.state.inputValue);
  };

  render() {
    return (
      <header className="flex flex-col md:flex-row gap-4 mb-8">
        <InputSearch onChange={this.onChange} value={this.state.inputValue} />
        <Button onClick={this.onClick} />
      </header>
    );
  }
}

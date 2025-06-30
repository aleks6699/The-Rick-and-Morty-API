import { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <MainContent />
      </div>
    );
  }
}
class Header extends Component {
  render() {
    return (
      <header>
        <InputSearch />
        <Button />
      </header>
    );
  }
}
class InputSearch extends Component {
  render() {
    return (
      <div>
        <h2>Search Component</h2>
      </div>
    );
  }
}
class Button extends Component {
  render() {
    return <button>Click Me</button>;
  }
}

class MainContent extends Component {
  render() {
    return (
      <main>
        <ul>
          {[1, 2, 3, 4, 5].map((item) => (
            <CardItem key={item} item={item} />
          ))}
        </ul>
      </main>
    );
  }
}
interface CardsProps {
  item: number;
}

class CardItem extends Component<CardsProps> {
  render() {
    return (
      <li>
        <h3>Card {this.props.item}</h3>
        <p>Details about card {this.props.item}</p>
      </li>
    );
  }
}

export default App;

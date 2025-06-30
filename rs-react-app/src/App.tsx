import { Component } from 'react';
import { MainContent } from './components/MainContent/MainContent';
import { Header } from './components/Header/Header';
import { ErrorBoundary } from './ErrorBoundary';
import { ButtonError } from './components/ButtonError/ButtonError';

class App extends Component {
  state = {
    searchTerm: localStorage.getItem('searchTerm') || '',
  };

  setSearchTerm = (term: string) => {
    localStorage.setItem('searchTerm', term);
    this.setState({ searchTerm: term });
  };

  render() {
    return (
      <ErrorBoundary>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-8 transition-colors duration-300">
          <Header
            searchTerm={this.state.searchTerm}
            setSearchTerm={this.setSearchTerm}
          />

          <MainContent searchTerm={this.state.searchTerm} />
          <ButtonError forceError={false} />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;

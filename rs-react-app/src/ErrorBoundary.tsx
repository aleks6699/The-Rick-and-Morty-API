import { Component, type ErrorInfo } from 'react';

export class ErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Error caught by boundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4 z-50 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-500/10 via-transparent to-transparent animate-pulse"></div>
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-400/5 rounded-full mix-blend-screen filter blur-3xl animate-float"></div>
            <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-500/5 rounded-full mix-blend-screen filter blur-3xl"></div>
          </div>

          <div className="relative bg-gradient-to-br from-red-700/40 via-red-900/30 to-red-800/20 border border-red-200/50 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full shadow-2xl shadow-red-900/30 overflow-hidden">
            <div className="absolute -inset-1 bg-red-500/10 rounded-2xl filter blur-md"></div>

            <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/5 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-400/5 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>

            <div className="relative z-10">
              <div className="text-6xl mb-4 animate-bounce">⚠️</div>
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-200 to-red-400 mb-3">
                Quantum Flux Detected
              </h2>
              <p className="text-red-200/80 mb-6 text-lg">
                Reality corruption level: 99.9%
                <br />
                Attempting to stabilize...
              </p>
              <button
                onClick={() => this.setState({ hasError: false })}
                className="relative cursor-pointer bg-gradient-to-r from-red-600 to-amber-700 hover:from-red-500 hover:to-amber-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span className="relative z-10">Restart Reality</span>
                <span className="absolute inset-0 bg-white/10 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

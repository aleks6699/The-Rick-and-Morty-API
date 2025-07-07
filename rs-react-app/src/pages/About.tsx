export function About() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">About This App</h1>
        <p className="mb-4">
          This application is a simple React app that uses the Rick and Morty
          API to display characters from the show.
        </p>
        <p>
          It features a search functionality, error handling, and a responsive
          design.
        </p>
      </div>
    </div>
  );
}

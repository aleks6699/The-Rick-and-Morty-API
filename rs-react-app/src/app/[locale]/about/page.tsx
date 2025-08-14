import { Link } from '@/i18n/navigation';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl p-8 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            About the App
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-8"></div>
        </div>

        <div className="space-y-6 text-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-2xl font-bold">A</span>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Author</h2>
              <p>
                Hello! I&apos;m{' '}
                <span className="font-bold text-blue-400">
                  Oleksandr Tsurkan
                </span>
                , a frontend developer specializing in:
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                  Next.js
                </span>
                <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                  React
                </span>
                <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                  TypeScript
                </span>
                <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                  Tailwind CSS
                </span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-700">
            <h2 className="text-2xl font-semibold mb-4">About the Project</h2>
            <p>
              This application uses the Rick and Morty API to demonstrate modern
              frontend development skills.
            </p>
          </div>

          <div className="pt-6 border-t border-gray-700">
            <h2 className="text-2xl font-semibold mb-4">Education</h2>
            <p>
              The <span className="font-bold">React course</span> at RS School
              helped me deepen my development knowledge:
            </p>
            <Link
              href="https://rs.school/courses/reactjs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              RS School React Course
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-700 flex justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors duration-300 flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Characters
          </Link>
        </div>
      </div>
    </div>
  );
}

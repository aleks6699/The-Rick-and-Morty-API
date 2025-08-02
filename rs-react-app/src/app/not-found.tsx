import Image from 'next/image';
import ImageNotFound from '../assets/Rick.png';
export default function NotFound() {
  return (
    <div className="flex items-center flex-col  justify-center   min-h-screen bg-gray-900 text-white">
      <Image src={ImageNotFound} alt="Not Found" className="w-64 h-64 mb-4" />
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4">The page you are looking for does not exist.</p>
    </div>
  );
}

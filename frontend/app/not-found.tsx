import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/tasks">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              View All Tasks
            </button>
          </Link>
          <Link href="/">
            <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors">
              Go Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

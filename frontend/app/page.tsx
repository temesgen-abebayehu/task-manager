import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-8rem)] bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-6 shadow-lg">
          <span className="text-white text-4xl font-bold">✓</span>
        </div>
        
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
          Welcome to TaskFlow
        </h1>
        
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Your personal productivity companion. Organize tasks, track progress, and achieve your goals with ease.
        </p>
        
        <Link href="/tasks">
          <button className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg">
            Get Started →
          </button>
        </Link>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl mb-3">📋</div>
            <h3 className="font-semibold text-gray-900 mb-2">Organize</h3>
            <p className="text-sm text-gray-600">Keep all your tasks in one place</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">✨</div>
            <h3 className="font-semibold text-gray-900 mb-2">Prioritize</h3>
            <p className="text-sm text-gray-600">Focus on what matters most</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-semibold text-gray-900 mb-2">Achieve</h3>
            <p className="text-sm text-gray-600">Track and complete your goals</p>
          </div>
        </div>
      </div>
    </div>
  );
}



import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Task Manager
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Manage your tasks efficiently and stay organized
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/tasks">
            <button className="px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-lg">
              View All Tasks
            </button>
          </Link>
          <Link href="/tasks/new">
            <button className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors text-lg">
              Create New Task
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}


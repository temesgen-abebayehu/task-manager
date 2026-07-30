import Link from 'next/link';
import TaskForm from '@/components/TaskForm';

export default function NewTaskPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/tasks"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4"
          >
            <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M15 19l-7-7 7-7"></path>
            </svg>
            Back to Tasks
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Create New Task
          </h1>
          <p className="text-lg text-gray-600">
            Fill in the details to add a new task to your list
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <TaskForm mode="create" />
        </div>
      </div>
    </div>
  );
}

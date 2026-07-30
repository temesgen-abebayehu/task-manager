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
            className="text-blue-600 hover:text-blue-700 font-medium mb-4 inline-block"
          >
            ← Back to Tasks
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create New Task
          </h1>
          <p className="text-gray-600">
            Fill in the details below to create a new task
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <TaskForm mode="create" />
        </div>
      </div>
    </div>
  );
}

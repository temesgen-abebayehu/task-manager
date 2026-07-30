'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Task } from '@/lib/types';
import { fetchTaskById } from '@/lib/api';
import TaskForm from '@/components/TaskForm';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function EditTaskPage() {
  const params = useParams();
  const taskId = params.id as string;

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTask();
  }, [taskId]);

  const loadTask = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTaskById(taskId);
      setTask(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load task');
      console.error('Error loading task:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            <p className="font-medium">Error</p>
            <p>{error || 'Task not found'}</p>
            <Link
              href="/tasks"
              className="mt-2 inline-block text-sm underline hover:no-underline"
            >
              Back to Tasks
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/tasks/${taskId}`}
            className="text-blue-600 hover:text-blue-700 font-medium mb-4 inline-block"
          >
            ← Back to Task Details
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Task</h1>
          <p className="text-gray-600">Update the task details below</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <TaskForm
            mode="edit"
            initialValues={{
              id: task.id,
              title: task.title,
              description: task.description || '',
              status: task.status,
              dueDate: task.dueDate,
            }}
          />
        </div>
      </div>
    </div>
  );
}

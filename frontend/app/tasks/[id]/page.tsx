'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Task, TaskStatus } from '@/lib/types';
import { fetchTaskById, deleteTask, toggleTaskComplete } from '@/lib/api';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const taskId = params.id as string;

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

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

  const handleDelete = async () => {
    if (!task) return;
    
    if (!confirm(`Are you sure you want to delete "${task.title}"?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteTask(taskId);
      router.push('/tasks');
    } catch (err: any) {
      alert(err.message || 'Failed to delete task');
      setIsDeleting(false);
    }
  };

  const handleToggleComplete = async () => {
    if (!task) return;

    setIsToggling(true);
    try {
      const updatedTask = await toggleTaskComplete(taskId);
      setTask(updatedTask);
    } catch (err: any) {
      alert(err.message || 'Failed to update task');
    } finally {
      setIsToggling(false);
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.TO_DO:
        return 'bg-gray-100 text-gray-800';
      case TaskStatus.IN_PROGRESS:
        return 'bg-blue-100 text-blue-800';
      case TaskStatus.DONE:
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.TO_DO:
        return 'To Do';
      case TaskStatus.IN_PROGRESS:
        return 'In Progress';
      case TaskStatus.DONE:
        return 'Done';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No due date';
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/tasks"
            className="text-blue-600 hover:text-blue-700 font-medium mb-4 inline-block"
          >
            ← Back to Tasks
          </Link>
        </div>

        {/* Task Details Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-8 text-white">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl font-bold">{task.title}</h1>
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                  task.status
                )}`}
              >
                {getStatusLabel(task.status)}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="px-6 py-8">
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Description
              </h2>
              {task.description ? (
                <p className="text-gray-700 whitespace-pre-wrap">
                  {task.description}
                </p>
              ) : (
                <p className="text-gray-400 italic">No description provided</p>
              )}
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Due Date
                </h3>
                <p className="text-lg text-gray-900">
                  {formatDate(task.dueDate)}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Status
                </h3>
                <p className="text-lg text-gray-900">
                  {getStatusLabel(task.status)}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Created At
                </h3>
                <p className="text-gray-700">{formatDateTime(task.createdAt)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Last Updated
                </h3>
                <p className="text-gray-700">{formatDateTime(task.updatedAt)}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200">
              <button
                onClick={handleToggleComplete}
                disabled={isToggling}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  task.status === TaskStatus.DONE
                    ? 'bg-gray-600 text-white hover:bg-gray-700'
                    : 'bg-green-600 text-white hover:bg-green-700'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isToggling
                  ? 'Updating...'
                  : task.status === TaskStatus.DONE
                  ? 'Mark Incomplete'
                  : 'Mark Complete'}
              </button>

              <Link href={`/tasks/${taskId}/edit`}>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Edit Task
                </button>
              </Link>

              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? 'Deleting...' : 'Delete Task'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

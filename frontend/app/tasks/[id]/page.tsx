'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Task, TaskStatus } from '@/lib/types';
import { fetchTaskById, deleteTask, updateTask } from '@/lib/api';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const taskId = params.id as string;

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

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

  const handleStatusChange = async (newStatus: TaskStatus) => {
    if (!task || task.status === newStatus) return;

    setIsUpdatingStatus(true);
    try {
      const updatedTask = await updateTask(taskId, { status: newStatus });
      setTask(updatedTask);
    } catch (err: any) {
      alert(err.message || 'Failed to update task status');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const getStatusConfig = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.TO_DO:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          dot: 'bg-gray-400',
          label: 'To Do',
          gradient: 'from-gray-500 to-gray-600'
        };
      case TaskStatus.IN_PROGRESS:
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-800',
          dot: 'bg-blue-500',
          label: 'In Progress',
          gradient: 'from-blue-500 to-blue-600'
        };
      case TaskStatus.DONE:
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          dot: 'bg-green-500',
          label: 'Done',
          gradient: 'from-green-500 to-green-600'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          dot: 'bg-gray-400',
          label: status,
          gradient: 'from-gray-500 to-gray-600'
        };
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

  const statusConfig = getStatusConfig(task.status);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/tasks"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M15 19l-7-7 7-7"></path>
            </svg>
            Back to Tasks
          </Link>
        </div>

        {/* Task Details Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className={`bg-gradient-to-r ${statusConfig.gradient} px-8 py-10 text-white`}>
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-3xl font-bold flex-1">{task.title}</h1>
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                <span className={`w-2 h-2 rounded-full ${statusConfig.dot}`}></span>
                {statusConfig.label}
              </span>
            </div>
            {task.dueDate && (
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                Due: {formatDate(task.dueDate)}
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="px-8 py-8">
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M4 6h16M4 12h16M4 18h7"></path>
                </svg>
                Description
              </h2>
              {task.description ? (
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed pl-7">
                  {task.description}
                </p>
              ) : (
                <p className="text-gray-400 italic pl-7">No description provided</p>
              )}
            </div>

            {/* Status Change Section */}
            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Change Status</h3>
              <div className="flex gap-2">
                {[TaskStatus.TO_DO, TaskStatus.IN_PROGRESS, TaskStatus.DONE].map((status) => {
                  const config = getStatusConfig(status);
                  return (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(status)}
                      disabled={isUpdatingStatus || task.status === status}
                      className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all ${
                        task.status === status
                          ? `${config.bg} ${config.text} ring-2 ring-offset-2 ${config.dot.replace('bg-', 'ring-')}`
                          : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {config.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-6 bg-gray-50 rounded-lg">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Created At
                </h3>
                <p className="text-gray-900">{formatDateTime(task.createdAt)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  Last Updated
                </h3>
                <p className="text-gray-900">{formatDateTime(task.updatedAt)}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200">
              <Link href={`/tasks/${taskId}/edit`} className="flex-1 min-w-[200px]">
                <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                  Edit Task
                </button>
              </Link>

              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                {isDeleting ? 'Deleting...' : 'Delete Task'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

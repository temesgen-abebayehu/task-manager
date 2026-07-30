'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Task, TaskStatus } from '@/lib/types';
import { fetchTasks } from '@/lib/api';
import TaskCard from '@/components/TaskCard';
import StatusFilter from '@/components/StatusFilter';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const status =
        selectedStatus === 'ALL' ? undefined : (selectedStatus as TaskStatus);
      const data = await fetchTasks(status);
      setTasks(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load tasks');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [selectedStatus]);

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Task Manager
          </h1>
          <p className="text-gray-600">
            Manage your tasks efficiently and stay organized
          </p>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <StatusFilter
            selectedStatus={selectedStatus}
            onStatusChange={handleStatusChange}
          />

          <Link href="/tasks/new">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              + Create New Task
            </button>
          </Link>
        </div>

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            <p className="font-medium">Error</p>
            <p>{error}</p>
            <button
              onClick={loadTasks}
              className="mt-2 text-sm underline hover:no-underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Tasks Grid */}
        {!loading && !error && (
          <>
            {tasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📝</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No tasks found
                </h3>
                <p className="text-gray-600 mb-6">
                  {selectedStatus === 'ALL'
                    ? "Get started by creating your first task"
                    : `No tasks with status "${selectedStatus}"`}
                </p>
                <Link href="/tasks/new">
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Create Your First Task
                  </button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onTaskChange={loadTasks}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Task Count */}
        {!loading && !error && tasks.length > 0 && (
          <div className="mt-6 text-center text-gray-600">
            Showing {tasks.length} task{tasks.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  );
}

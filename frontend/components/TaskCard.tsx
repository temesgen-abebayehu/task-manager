'use client';

import Link from 'next/link';
import { Task, TaskStatus } from '@/lib/types';
import { deleteTask, toggleTaskComplete } from '@/lib/api';
import { useState } from 'react';

interface TaskCardProps {
  task: Task;
  onTaskChange: () => void;
}

export default function TaskCard({ task, onTaskChange }: TaskCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

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

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${task.title}"?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteTask(task.id);
      onTaskChange();
    } catch (error) {
      console.error('Failed to delete task:', error);
      alert('Failed to delete task. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleComplete = async () => {
    setIsToggling(true);
    try {
      await toggleTaskComplete(task.id);
      onTaskChange();
    } catch (error) {
      console.error('Failed to toggle task:', error);
      alert('Failed to update task. Please try again.');
    } finally {
      setIsToggling(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No due date';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <Link href={`/tasks/${task.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
            {task.title}
          </h3>
        </Link>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
            task.status
          )}`}
        >
          {getStatusLabel(task.status)}
        </span>
      </div>

      {task.description && (
        <p className="text-gray-600 mb-4 line-clamp-2">{task.description}</p>
      )}

      <div className="text-sm text-gray-500 mb-4">
        Due: {formatDate(task.dueDate)}
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={handleToggleComplete}
          disabled={isToggling}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            task.status === TaskStatus.DONE
              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              : 'bg-green-600 text-white hover:bg-green-700'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isToggling
            ? '...'
            : task.status === TaskStatus.DONE
            ? 'Mark Incomplete'
            : 'Mark Complete'}
        </button>

        <Link href={`/tasks/${task.id}`}>
          <button className="px-3 py-1 rounded text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            View Details
          </button>
        </Link>

        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="px-3 py-1 rounded text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
}
